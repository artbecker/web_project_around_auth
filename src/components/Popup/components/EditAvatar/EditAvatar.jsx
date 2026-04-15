import { useContext } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext";
import { useFormValidation } from "../../../../hooks/useFormValidation";

export default function EditAvatar() {
  const { handleUpdateAvatar } = useContext(CurrentUserContext);

  const { values, handleChange, errors, isValid } = useFormValidation();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isValid) {
      handleUpdateAvatar({ avatar: values.avatar });
    }
  };

  return (
    <form
      className="form popup__form_avatar"
      onSubmit={handleSubmit}
      noValidate
    >
      <input
        id="avatar-url-input"
        className="form__input"
        required
        type="url"
        name="avatar"
        placeholder="Image URL"
        value={values.avatar || ""}
        onChange={handleChange}
      />
      <span className="form__input-error_active picture-url-input-error">
        {errors.avatar}
      </span>
      <button
        className={`form__submit ${!isValid ? "form__submit_disabled" : ""}`}
        disabled={!isValid}
      >
        Save
      </button>
    </form>
  );
}
