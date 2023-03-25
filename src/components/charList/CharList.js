import './charList.scss';

import { useState, useEffect } from 'react';
import CharCard from '../charCard/CharCard'
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import PropTypes from 'prop-types';

const CharList = (props) => {

    const [chars,setChars] = useState([]),      
          [loadingMore, setLoadingMore] = useState(false),
          [offset, setOffset] = useState(0),
          [endChars, setEndChars] = useState(false),
          [activeCard, setActiveCard] = useState(0);

    const {loading, error, getAllCharacters, _offsetChar} = useMarvelService();
    
    useEffect(() => {
        console.log('start')
        setOffset(_offsetChar)
        onLoadCharacters();
    }, [])
    

    function onLoadCharacters () {
        setOffset(offset => offset + 9)
        getAllCharacters(offset)
            .then(res => {

                if (res.length < 9) {
                    setEndChars(true)
                }

                setChars((chars) => [...chars,...res])
                setLoadingMore(false)
            })
            .catch((err) => {
                console.log(err);
                })
    }
    
    function onLoadMore () {
        setLoadingMore(true)
        onLoadCharacters()       
    }

    function activateCard (id) {
        setActiveCard(id)
    }
   
    const errorMassage = error ? <ErrorMessage/> : null;
    const spinner = loading && !loadingMore ? <Spinner/> : null;
     
    const cards = [];
    chars.forEach(char => {
        cards.push(<CharCard 
                        char={char} 
                        key={char.id} 
                        onSelectedChar={props.onSelectedChar}
                        activateCard={activateCard}
                        active={char.id === activeCard ? true : false}
                    />)
    })

    const cardsList = (
        <ul className="char__grid">               
            {cards}
        </ul>
    );

    return (
        <div className="char__list">
            {errorMassage}
            {spinner}
            {cardsList}
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

CharList.propTypes = {
    onSelectedChar: PropTypes.func
}

export default CharList;