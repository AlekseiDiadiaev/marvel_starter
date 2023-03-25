import './charInfo.scss';

import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const CharInfo = (props) =>{
    const [char, setChar] = useState(null);
    const [comics, setComics] = useState(null);

    const {loading, error, getCharacter, clearError, getComicsListOfChar} = useMarvelService();

    useEffect(() => {
        updateChar(); 
    },[props.selectedChar]) 

    function onCharLoaded(char) {
        setChar(char);
    }

    function updateChar() { 
        clearError();
        if (!props.selectedChar) {
            return;
        }

        const id = props.selectedChar;
            setChar(null);
            setComics(null);
        getCharacter(id)
            .then(onCharLoaded) 
            .catch(err => console.log(err));

        getComicsListOfChar(id)
            .then(res => {
                setComics(res)
            }) 
            .catch(err => console.log(err));    
    }   

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = char && comics ? <View char={char} comics={comics}/> : null;
    const skeleton = !loading && !error && !char && !comics? <Skeleton/> : null;

    return (
        <div className="char__info">
            {errorMessage}
            {spinner}
            {content}
            {skeleton}
        </div>
    )   
}

const View = ({char, comics}) => {
    const {name, thumbnail, homepage, wiki, descriprion} = char;
    console.log(comics)
    let comicsList;
    if (comics.length === 0) {
        comicsList =  <span> Not found...</span>
    } else {
        comicsList =  comics.map((item, i) => {
            return (
                <Link to={item.id !== 0 ? `/comics/${item.id}` : '*'}>
                    <li className="char__comics-item">
                        {item.title}
                    </li>
                </Link>
            ) 
        })
    
    }
        

    const additionalStyle = thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? {objectFit: 'contain'} : null;

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={additionalStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {descriprion}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comicsList}
            </ul>
        </>       
    )
}

CharInfo.propTypes = {
    selectedChar: PropTypes.number
}

export default CharInfo;