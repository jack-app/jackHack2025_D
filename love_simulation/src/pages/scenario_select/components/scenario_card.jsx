import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom';
import "./scenario_card.css";

const ScenarioCard = ({ title, imagePath, bgimagePath, difficulty, description, id, cancel_num }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/main`, 
      {state: { 
        Id:id, 
        sceneId:1,
        Likeability: 50,
        bgimagePath:bgimagePath,
        cancel_num: cancel_num
    }});
  };
  const difficultyFeature = "⭐️".repeat(difficulty) + "・".repeat(5 - difficulty);
  return (
    
    <div className="scenario-card" onClick={handleClick}>
      <p className="title-text">{title}</p>
      <p className="difficulty-text">難易度：{difficultyFeature}</p>
      {imagePath && (
        <img
          src={imagePath}
          alt={`${title} thumbnail`}
          className="scenario-image"
          style={{ border:"1px solid black", borderRadius: "10px" }}
        />
      )}
      <p className="description-text">{description}</p>
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
