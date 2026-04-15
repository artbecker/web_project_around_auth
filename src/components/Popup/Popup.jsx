export default function Popup(props) {
  const { onClose, title, children } = props;

  return (
    <div className="popup">
      <div className={!title ? "popup__image-container" : "popup__container"}>
        {title && <h2 className="popup__title">{title}</h2>}
        {children}
        <button
          aria-label="Close modal"
          className="close-button popup__close-button"
          type="button"
          onClick={onClose}
        />
      </div>
    </div>
  );
}
