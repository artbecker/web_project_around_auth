import { useContext } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext";
import { useFormValidation } from "../../../../hooks/useFormValidation";

export default function NewCard() {
  const { handleAddPictureSubmit } = useContext(CurrentUserContext);

  const { values, handleChange, errors, isValid } = useFormValidation();

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("values:", values);

    handleAddPictureSubmit({
      name: values.name || "",
      link: values.link || "",
    });
  };

  return (
    <form
      className="form popup__form_picture"
      onSubmit={handleSubmit}
      noValidate
    >
      <input
        id="picture-title-input"
        className="form__input"
        type="text"
        minLength="2"
        maxLength="30"
        required
        name="name"
        placeholder="Title"
        value={values.name || ""}
        onChange={handleChange}
      />
      <span className="form__input-error_active picture-title-input-error">
        {errors.name || ""}
      </span>
      <input
        id="picture-url-input"
        className="form__input"
        required
        type="url"
        name="link"
        placeholder="Image URL"
        value={values.link || ""}
        onChange={handleChange}
      />
      <span className="form__input-error_active picture-url-input-error">
        {errors.link || ""}
      </span>
      <button
        className={`form__submit ${!isValid ? "form__submit_disabled" : ""}`}
        disabled={!isValid}
      >
        Add
      </button>
    </form>
  );
}
