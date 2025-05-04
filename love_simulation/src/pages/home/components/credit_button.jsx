import { useNavigate } from 'react-router-dom';

const CreditButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/credit', { replace: true });
  }
  return (
    <button className="credit-button" onClick={handleClick}>
      Credit
    </button>
  );
}

export default CreditButton;