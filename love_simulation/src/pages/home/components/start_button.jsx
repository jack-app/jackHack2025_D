import { useNavigate } from 'react-router-dom';

const StartButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/scenario_select', { replace: true });
  };

  return (
    <button className="start-button" onClick={handleClick}>
      Start Game
    </button>
  );
}

export default StartButton;