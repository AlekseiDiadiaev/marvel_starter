import { useImgError } from '../../hooks/imgError.hook';
import { Link } from 'react-router-dom';
import './comicsCard.scss';

const ComicCard = ({homepage, thumbnail, title, price, idElement, id}) => {
    const { onImgError, imgErrorUrl, isImgError } = useImgError();

   

    return (
        <li className="comics-card" key={idElement}>
            <Link to={`/comics/${id}`} state={{ "URL": window.location.origin}}>
                <img src={isImgError ? imgErrorUrl : thumbnail} 
                    alt="comic" 
                    className="comics-card__img" 
                    onError={onImgError}/>
                <div className="comics-card__name">{title}</div>
                <div className="comics-card__price">{price}</div>
            </Link>
        </li>
    )
}

export default ComicCard;