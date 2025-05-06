import { useNavigate } from 'react-router-dom';

const CreditButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/credit', { replace: true });
  }
  return (
    <div className="creditButton">
      <button id="creditButton" onClick={handleClick}>
        Credit
      </button>
    </div>
  );
}

export default CreditButton;