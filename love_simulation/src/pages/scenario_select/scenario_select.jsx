import { useEffect, useState } from "react";
import ScenarioCard from "./components/scenario_card";
import { useNavigate } from 'react-router-dom';
import "./scenario_select.css";

const ScenarioSelect = () => {
    const [scenarios, setScenarios] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("/scenarios/scenarioList.json")
            .then(res => {
                if (!res.ok) throw new Error("Failed to fetch scenario.json");
                return res.json();
            })
            .then(json => setScenarios(json.scenarios || []))
            .catch(err => console.error(err));
        console.log(scenarios);
    }, []);

    if (scenarios.length === 0) {
        return <p>読み込み中...</p>;
    }

    const handleLeftClick = () => {
        setCurrentIndex((prevIndex) => Math.max(prevIndex - 3, 0));
    };

    const handleRightClick = () => {
        setCurrentIndex((prevIndex) => Math.min(prevIndex + 3, scenarios.length - 3));
    };

    const isLeftDisabled = currentIndex === 0;
    const isRightDisabled = currentIndex >= scenarios.length - 3;

    return (
        <div style={{ width: window.innerWidth, height: window.innerHeight, userSelect: "none" }}>
            <div className="header">
                <div className="backButton" onClick={() => navigate(`/`)} />
                <p className="select_title"> 遊びたいシナリオを選択してください </p>
                <div className="dummy" />
            </div>
            <div className="scenario_select">
                <span
                    className="dli-chevron-round-left"
                    style={{
                        cursor: isLeftDisabled ? "not-allowed" : "pointer",
                    }}
                    onClick={!isLeftDisabled ? handleLeftClick : undefined}
                />

                {scenarios.slice(currentIndex, currentIndex + 3).map((scenario, index) => (
                    <ScenarioCard
                        key={index}
                        title={scenario.title}
                        imagePath={scenario.image}
                        difficulty={scenario.difficulty}
                        description={scenario.description}
                        id={scenario.id}
                        cancel_num={scenario.cancel_num}
                    />
                ))}

                <span
                    className="dli-chevron-round-right"
                    style={{
                        cursor: isRightDisabled ? "not-allowed" : "pointer",
                    }}
                    onClick={!isRightDisabled ? handleRightClick : undefined}                    
                />
            </div>
        </div>
    );
};

export default ScenarioSelect;