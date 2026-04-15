import { useState, useContext, useEffect } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext";
import { useFormValidation } from "../../../../hooks/useFormValidation";

export default function EditProfile() {
  const userContext = useContext(CurrentUserContext);
  const { currentUser, handleUpdateUser } = userContext;

  const { values, handleChange, errors, isValid, resetForm } =
    useFormValidation();

  useEffect(() => {
    resetForm({ name: currentUser.name, about: currentUser.about });
  }, [currentUser, resetForm]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isValid) {
      handleUpdateUser({ name: values.name, about: values.about });
    }
  };

  return (
    <form
      className="form popup__form_profile"
      name="profile-form"
      id="edit-profile-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <input
        id="profile-name-input"
        className="form__input"
        type="text"
        minLength="2"
        maxLength="40"
        required
        name="name"
        placeholder="Name"
        value={values.name || ""}
        onChange={handleChange}
      />
      <span className="form__input-error_active profile-name-input-error">
        {errors.name}
      </span>
      <input
        id="profile-about-input"
        className="form__input"
        type="text"
        minLength="2"
        maxLength="200"
        required
        name="about"
        placeholder="About me"
        value={values.about || ""}
        onChange={handleChange}
      />
      <span className="form__input-error_active profile-about-input-error">
        {errors.about}
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
