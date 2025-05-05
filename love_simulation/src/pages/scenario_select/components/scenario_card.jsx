import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom';
import "./scenario_card.css";

const ScenarioCard = ({ title, imagePath, difficulty, description }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/main`, 
      {state: { 
        scenarioTitle:title, 
        scenarioId:1,
        Likeability: 50,
    }});
  };
  const difficultyFeature = "⭐️".repeat(difficulty) + "・".repeat(5 - difficulty);
  return (
    
    <div className="scenario-card" onClick={handleClick}>
      <p className="card-text">シナリオタイトル：<br/>{title}</p>
      {imagePath && (
        <img
          src={imagePath}
          alt={`${title} thumbnail`}
          className="scenario-image"
          style={{ border:"1px solid black", borderRadius: "10px" }}
        />
      )}
      <p className="card-text">難易度：{difficultyFeature}</p>
      <p className="description-text">説明：{description}</p>
    </div>
  );
};

ScenarioCard.propTypes = {
  title: PropTypes.string.isRequired,
  imagePath: PropTypes.string,
  difficulty: PropTypes.number,
  description: PropTypes.string,
};

export default ScenarioCard;
