import { useNavigate } from "react-router-dom";


const CancelButton = ({scenarioTitle, history, cancel_num}) => {

  const navigate = useNavigate();

  const handleClick = () => {
    // Cancel button clicked, navigate to the main page with the provided state
    // and increment the cancel_num by 1
    if (cancel_num == 0) {
      alert("これ以上キャンセルできません。");
      return;
    }
    const new_cancel_num = cancel_num - 1;
    history.likeability.pop();
    history.scenarioId.pop();
    navigate("/main", {
      state: {
        scenarioId: history.scenarioId[history.scenarioId.length - 1],
        Likeability: history.likeability[history.likeability.length - 1],
        scenarioTitle: scenarioTitle,
        history: history,
        cancel_num: new_cancel_num,
      }});
  }

  return (
      <div className="cancelButton" onClick={handleClick}>
          Cancel
      </div>
  );
};

export default CancelButton;