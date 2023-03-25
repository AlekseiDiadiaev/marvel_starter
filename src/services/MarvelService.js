import { useHttp } from "../hooks/http.hook";
import { useState } from "react";
const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=3c7c31cef87cac500e9dbbf0bba78e77'
    const _offsetChar = 250;
    const [offsetComic, setOffsetComic] = useState(1500);
    

    const getAllCharacters = async (offset = _offsetChar) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);

        return res.data.results.map(char => {
            return _transformCharacter(char);
        })

    }


    const getAllComics = async () => {
        let got = 0,
            need = 8,
            view = [],
            res = [],
            less = 0,
            tempOffset;

        async function getRecur () {
            tempOffset = offsetComic + got + less;
            
            const require = await request(`${_apiBase}comics?orderBy=-title&limit=${need}&offset=${tempOffset}&${_apiKey}`);

            if (require.data.results.length < need) {
                let tempRes = require.data.results.map(comic => {
                    if (comic){
                        return _transformComic(comic);
                    }
                    return false
                }).filter(item => {
                    if (item) {
                        got++
                    } else {
                        less++
                    }
                    return item;
                })
                view =[...tempRes]
                return
            }

            let tempRes = require.data.results.map(comic => {
                    if (comic){
                        return _transformComic(comic);
                    }
                    return false
                }).filter(item => {
                    if (item) {
                        got++
                    } else {
                        less++
                    }
                    return item;
                })
                
            res = [...res, ...tempRes]

            if (res.length < 8) {
                need = 8 - got;
                await getRecur(); 

            } else {
                got = 0;
                need = 8;
                view = [...view, ...res];
                setOffsetComic(offsetComic + 8 + less);
                less = 0;
                res = [];
            }
        }

        await getRecur();
        return view;
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getComic= async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComic(res.data.results[0]);
    }

    const getComicsListOfChar = async (id) => {
        const res = await request(`${_apiBase}characters/${id}/comics?limit=9&${_apiKey}`);
        return res.data.results.map(item => {
            return {id: item.digitalId, title: item.title}
        })
    } 
    
    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            descriprion: char.descriprion,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url ,
            comics: char.comics.items 
        }
    }

    const _transformComic = (comic) => {
        try{
            return {
                id: comic.id,
                title: comic.title,
                description: comic.description,
                thumbnail: comic.thumbnail.path + '.' + comic.thumbnail.extension,
                homepage: comic.urls[0].url,
                price: comic.prices[0].price,
                pageCount: comic.pageCount,
                language: comic.textObjects[0].language
            }
        } catch {
            return false;
        }
    }
 

    return {loading, error, getAllCharacters, getCharacter, clearError, _offsetChar, getAllComics, getComic, getComicsListOfChar}
}

export default useMarvelService;