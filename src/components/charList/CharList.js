import './charList.scss';
import CharCard from '../charCard/CharCard'
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import { Component } from 'react';
import PropTypes from 'prop-types';

class CharList extends Component {

    state = {
        chars: [],
        loading: true,
        error: false,
        loadingMore: false,
        offset: 0,
        endChars: false,
        activeCard: 0
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.setState({offset: this.marvelService._offsetChar})
        this.onLoadCharacters();
    }

    
    onLoadCharacters = (offset) => {
        this.setState(({offset}) => ({offset: offset + 9}))
        
        this.marvelService
            .getAllCharacters(offset)
            .then(res => {
                if(res.length < 9) {
                    this.setState({endChars: true})
                }

                this.setState({
                    chars: [...this.state.chars,...res],
                    loading: false,
                    loadingMore: false
                })
            })

            .catch(() => {
                this.setState({
                    error: true,
                    loading: false
                })
            })
    }
    
    onLoadMore = () => {
        this.setState({
            loadingMore: true
        })
        this.onLoadCharacters(this.state.offset)
        
    }

    activateCard = ( id) => {
        this.setState({activeCard: id})
    }


    render() {
        const {error, loading, chars, loadingMore, endChars, activeCard} = this.state
        const errorMassage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        
        

        const cards = [];
        chars.forEach(char => {
            cards.push(<CharCard 
                            char={char} 
                            key={char.id} 
                            onSelectedChar={this.props.onSelectedChar}
                            activateCard={this.activateCard}
                            active={char.id === activeCard ? true : false}
                        />)
        })

        const cardsList = loading || error ? null : (
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
                    onClick={this.onLoadMore}
                    disabled={loadingMore}
                    style={{display: endChars ? 'none': 'block'}}
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

CharList.propTypes = {
    onSelectedChar: PropTypes.func
}

export default CharList;