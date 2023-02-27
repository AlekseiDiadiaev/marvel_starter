import './charInfo.scss';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import { Component } from 'react';
import PropTypes from 'prop-types';


class CharInfo extends Component {
    state = {
        char: null,
        loading: false,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.selectedChar !== this.props.selectedChar){
            this.updateChar();  
        }
    }

    onCharLoaded = (char) => {
        this.setState({
            char: char, 
            loading: false
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    updateChar = () => { 
        if (!this.props.selectedChar) {
            return;
        }
        const id = this.props.selectedChar;
        this.setState({
            loading: true,
            char: null
        })
        this.marvelService
            .getCharacter(id)
            .then(this.onCharLoaded) 
            .catch(this.onError);
    }   


    render() {
        
        const {char, loading, error} = this.state;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = char ? <View char={char}/> : null;
        const skeleton = !loading && !error && !char ? <Skeleton/> : null;

        return (
            <div className="char__info">
                {errorMessage}
                {spinner}
                {content}
                {skeleton}
            </div>
        )
    }
}

const View = ({char}) => {
    const {name, thumbnail, homepage, wiki, descriprion, comics} = char;
    
    let comicsList;
    if (comics.length === 0) {
        comicsList =  <span> Not found...</span>
    } else {
        comicsList =  comics.map((item, i) => {
            if (i > 9) {
                return false;
            }
            return (
                <a href={item.resourceURI} key={i}>
                    <li className="char__comics-item">
                        {item.name}
                    </li>
                </a>
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