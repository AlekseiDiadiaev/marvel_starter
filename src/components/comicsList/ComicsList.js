import './comicsList.scss';
import useMarvelService from '../../services/MarvelService';
import { useState, useEffect} from "react";
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import ComicCard from '../comicCard/ComicCadr';

const ComicsList = () => {

    const [comics, setComics] = useState([]),
          [loadingMore, setLoadingMore] = useState(false),
          [endChars, setEndChars] = useState(false);

    const {getAllComics, loading, error, clearError} = useMarvelService();
     
    useEffect(() => {
        loadComics();
    },[])


    function loadComics() {
        getAllComics()
        .then(res => {

            if (res.length < 8) {
                setEndChars(true)
            }

            setComics(comics => [...comics, ...res])
            setLoadingMore(false);
        })
        .catch((err) => {
            console.log(err);
            clearError();
            setLoadingMore(false); 
        })
    }

    function onLoadMore() {
        setLoadingMore(true);
        loadComics();
    }

 

    const cards = [];
    if(comics.length > 0) {
        comics.map((item, i) => {
            cards.push(
                <ComicCard 
                    homepage={item.homepage} 
                    thumbnail={item.thumbnail}  
                    title={item.title} 
                    price={item.price} 
                    idElement={i}
                    key={i}
                    id={item.id}
                    />
            )
        })
    }
    
    const errorMassage = error ? <ErrorMessage/> : null;
    const spinner = loading && !loadingMore ? <Spinner className='spinner'/> : null;

    return (
        <div className="comics__list">
                {errorMassage}
                {spinner}
            <ul className="comics__grid"> 
                {cards}
            </ul>
            <button 
                className="button button__main button__long" 
                onClick={onLoadMore}
                disabled={loadingMore}
                style={{display: endChars ? 'none': 'block'}}
                >
                    
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;