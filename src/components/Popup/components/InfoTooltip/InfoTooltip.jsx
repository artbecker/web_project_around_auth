import successMark from '../../../../images/success-mark.png';
import errorMark from '../../../../images/error-mark.png';

export default function InfoTooltip({ message, isSuccess }) {
  return (
    <div className='popup__tooltip'>
      <img
        className='popup__mark'
        src={isSuccess ? successMark : errorMark}
        alt={isSuccess ? 'Success' : 'Error'}
      />
      <p className='popup__text'>{message}</p>;
    </div>
  );
}
