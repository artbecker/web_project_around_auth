import Popup from "../../Popup.jsx";

export default function ImagePopup(props) {
  const { card, onClose } = props;

  return (
    <div className="popup__image-container">
      <img className="popup__image" src={card.link} alt={card.name} />
      <h2 className="popup__image-title">{card.name}</h2>
    </div>
  );
}
