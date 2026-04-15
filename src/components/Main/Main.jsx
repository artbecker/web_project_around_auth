import { useState, useEffect, useContext } from "react";
import Popup from "../Popup/Popup.jsx";
import EditAvatar from "../Popup/components/EditAvatar/EditAvatar.jsx";
import EditProfile from "../Popup/components/EditProfile/EditProfile.jsx";
import NewCard from "../Popup/components/NewCard/NewCard.jsx";
import Card from "../Card/Card.jsx";
import ConfirmDelete from "../Popup/components/ConfirmDelete/ConfirmDelete.jsx";
import api from "../../utils/api.js";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

export default function Main(props) {
  const { onOpenPopup, onClosePopup, popup, cards, onCardLike, onDeleteClick } =
    props;
  const { currentUser } = useContext(CurrentUserContext);

  const editAvatarPopup = {
    title: "Update Profile Picture",
    children: <EditAvatar />,
  };

  const editProfilePopup = {
    title: "Edit Profile",
    children: <EditProfile />,
  };

  const addPicturePopup = {
    title: "Add Picture",
    children: <NewCard />,
  };

  const confirmDeletePopup = {
    title: "Are you sure?",
    children: <ConfirmDelete />,
  };

  return (
    <main className="content">
      <section className="profile">
        <div
          className="profile__pic"
          onClick={() => onOpenPopup(editAvatarPopup)}
        >
          <img
            className="profile__pic-image"
            src={currentUser.avatar}
            alt="profile picture"
          />
        </div>
        <div className="profile__data">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            aria-label="Edit profile"
            className="edit-button profile__edit-button"
            type="button"
            onClick={() => onOpenPopup(editProfilePopup)}
          />
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button
          aria-label="Add picture"
          className="add-button profile__add-button"
          type="button"
          onClick={() => onOpenPopup(addPicturePopup)}
        />
      </section>
      <ul className="gallery">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onImageClick={onOpenPopup}
            onCardLike={onCardLike}
            onDeleteClick={onDeleteClick}
            onOpenConfirmDelete={() => onOpenPopup(confirmDeletePopup)}
          />
        ))}
      </ul>
      {popup && (
        <Popup onClose={onClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
    </main>
  );
}
