import { useContext } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext";

export default function ConfirmDelete() {
  const { handleCardDelete, cardToDelete } = useContext(CurrentUserContext);

  function handleConfirmDelete() {
    if (cardToDelete) {
      handleCardDelete(cardToDelete);
    }
  }

  return (
    <>
      <p className="popup__text">Picture deletion is permanent</p>
      <button
        className="popup__confirm-button"
        type="button"
        onClick={handleConfirmDelete}
      >
        Yes
      </button>
    </>
  );
}
