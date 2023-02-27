import './charCard.scss';
import { Component } from 'react';



class CharList extends Component {

    render () {
        const {name, thumbnail, id} = this.props.char;
        const additionalStyle = thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? {objectFit: 'fill'} : null;
        
        let clazz = "char-card"
        if(this.props.active) {
            clazz = "char-card char-card_selected"
        }

        return (
            <li className={clazz}>
                <button onClick={() => {
                    this.props.onSelectedChar(id)
                    this.props.activateCard(id)
                }} >
                    <img src={thumbnail} alt={name} style={additionalStyle}/>
                    <div className="char-card__name">{name}</div>
                </button>
            </li>
        )
    }
}

export default CharList;