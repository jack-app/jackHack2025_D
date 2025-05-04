import { useNavigate } from "react-router-dom";

const TitleButton = () => {
    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate("/home", { replace: true });
    };
    
    return (
        <button className="title-button" onClick={handleClick}>
        Titleへ戻る
        </button>
    );
}

export default TitleButton;