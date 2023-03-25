import './charCard.scss';




const CharList = (props) => {
    const {name, thumbnail, id} = props.char;
    const additionalStyle = thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? {objectFit: 'fill'} : null;
    
    let clazz = "char-card"
    if(props.active) {
        clazz = "char-card char-card_selected"
    }

    return (
        <li className={clazz}>
            <button onClick={() => {
                props.onSelectedChar(id)
                props.activateCard(id)
            }} >
                <img src={thumbnail} alt={name} style={additionalStyle}/>
                <div className="char-card__name">{name}</div>
            </button>
        </li>
    )
}

export default CharList;