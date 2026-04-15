import { useContext } from "react";
import ImagePopup from "../Popup/components/ImagePopup/ImagePopup.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

export default function Card(props) {
  const { currentUser } = useContext(CurrentUserContext);
  const { name, link, isLiked } = props.card;
  const { onImageClick, onCardLike, onDeleteClick, onOpenConfirmDelete } =
    props;
  const cardLikeButtonClassName = `like-button ${isLiked ? "like-button_active" : ""}`;

  function handleImageClick() {
    const imageComponent = {
      title: null,
      children: <ImagePopup card={props.card} />,
    };
    onImageClick(imageComponent);
  }

  function handleLikeClick() {
    onCardLike(props.card);
  }

  function handleDeleteClick() {
    onDeleteClick(props.card);
    onOpenConfirmDelete();
  }

  return (
    <li className="card">
      <img
        className="card__image"
        src={link}
        alt={name}
        onClick={handleImageClick}
      />
      <div className="card__footer">
        <h2 className="card__title">{name}</h2>
        <button
          aria-label="Like card"
          className={cardLikeButtonClassName}
          type="button"
          onClick={handleLikeClick}
        />
      </div>
      <button
        aria-label="Delete card"
        className="delete-button"
        type="button"
        onClick={handleDeleteClick}
      />
    </li>
  );
}
