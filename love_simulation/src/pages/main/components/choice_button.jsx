import { useNavigate } from "react-router-dom";

const ChoiceButton = ({ isChoice, choice, handleClick}) => {
    if (!isChoice) {
        console.log("isChoice is false, rendering empty div"); 
        return <div></div>;
    }

    return (
        <div className="choice-button">
            {choice.map((item, index) => (
                <button
                    key={index}
                    className="choice-button-item"
                    onClick={handleClick}
                >
                    {item.text || "No Text"}
                </button>
            ))}
        </div>
    );
};

export default ChoiceButton;