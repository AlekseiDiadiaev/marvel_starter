import './singleComicPage.scss';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService'
import { useState, useEffect } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const SingleComicPage = () => {
    const {comicId} = useParams();
    const {getComic, loading, error, clearError}  = useMarvelService();
    const [comic, setComic] = useState(null);
    
    useEffect(()=> {
        getComic(comicId)
            .then(res => {
                clearError();
                setComic(res);
            })
            .catch()
    }, [comicId])
 
    const errorMassage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner className='spinner'/> : null;
    const view = !error && !loading && comic? <View comic={comic}/> : null;

    return (
        <>
            {errorMassage}
            {spinner}
            {view}
        </>
        
    )
}

const View = ({comic}) => {
    const {title, pageCount, price, language, thumbnail, homepage, description} = comic;
   
    const navigate = useNavigate();
    const location = useLocation()
    console.log(location.state ? location.state.URL: '')
   
    function handleGoBack() {
        const previousPage =location.state ? location.state.URL: '';
        const isExternal = previousPage.indexOf(window.location.origin) === -1;
        
        console.log(isExternal)
        
        if (isExternal) {
          navigate('/');
        } else {
          navigate(-1);
        }
      }
    
    return  (
        <div className="single-comic">
            <a href={homepage}>
                <img src={thumbnail} alt={title} className="single-comic__img"/>
            </a>

            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount} pages</p>
                <p className="single-comic__descr">Language:{language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <button className="single-comic__back" onClick={handleGoBack}>Back to all</button>
        </div>
    )
}
export default SingleComicPage;