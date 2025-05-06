import { useNavigate } from "react-router-dom";


const CancelButton = ({ history,setHistory,id,setSceneId,setLikeability,cancel_num,setIsChoice }) => {

  const navigate = useNavigate();

  const handleCancel = () => {
    if (history.length <= 1 || cancel_num == 0) {
      return;
    }
    const last = history[history.length - 1];
    setHistory((prev) => prev.slice(0, -1));
    setIsChoice(false);
    navigate(`/main`, 
      {state: { 
        Id:id,
        sceneId:last.sceneId,
        Likeability: last.likeability,
        cancel_num: cancel_num - 1
    }});
  };

  return (
    <div className="cancelBox">
      <p className="cancel_num">残りキャンセル可能回数<br/>{cancel_num}回</p>
      <button className="cancelButton" onClick={handleCancel}>
          Cancel
      </button>
    </div>
  );
};

export default CancelButton;