import { useNavigate } from "react-router-dom";



const ChoiceButton = ({ isChoice, choice, likeability, title, cancel_num, history, SetChoice}) => {

    const navigate = useNavigate();

    const handleChoiceClick = (item) => {
        SetChoice(false);
        navigate("/main", {
            state: {
                scenarioId: item.nextId,
                Likeability: likeability + item.likeability,
                scenarioTitle: title,
                history: history,
                cancel_num: cancel_num,
            },
        });
    };

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
                    onClick={() => handleChoiceClick(item)}
                >
                    {item.text || "No Text"}
                </button>
            ))}
        </div>
    );
};

export default ChoiceButton;