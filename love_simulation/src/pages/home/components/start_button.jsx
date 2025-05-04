import React from 'react';
import { useNavigate } from 'react-router-dom';

const StartButton = () => {
    const navigate = useNavigate();

    const handleClick = () => {
      navigate('/scenario_select', { replace: true });
    };

  return (
    <div className="startButton">
      <button onClick={handleClick} id="startButton">tap to start</button>
    </div>
  );
};

export default StartButton;