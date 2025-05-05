import { useNavigate } from "react-router-dom";


const ChoiceButton = ({ isChoice, choice, likeability, title, cancel_num, history}) => {

    const navigate = useNavigate();
    const handleChoiceClick = (item) => {
        navigate("/main", {
            state: {
                scenarioId: item.nextId,
                Likeability:  likeability + item.likeability,
                scenarioTitle: title,
                history: history,
                cancel_num: cancel_num,
            },
        });
    }

    if (!isChoice) {
        return (
            <div className="choice-button">
            </div>
        );
    }
    return (
        <div className="choice-button">
            {choice.map((item, index) => (
                <button key={index} className="choice-button-item" onClick={() => handleChoiceClick(item)}>
                    {item.text}
                </button>
            ))}
        </div>
    );

}

export default ChoiceButton;