import './index.css'

const GameButton = props => {
  const {itemDetails, onClickChoice} = props
  const {id, imageUrl} = itemDetails

  const onClickButton = () => {
    onClickChoice(itemDetails)
  }

  return (
    <button
      type="button"
      className="choice-button"
      onClick={onClickButton}
      data-testid={`${id.toLowerCase()}Button`}
    >
      <img src={imageUrl} alt={id} className="choice-image" />
    </button>
  )
}

export default GameButton
