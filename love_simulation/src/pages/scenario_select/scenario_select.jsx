import { useEffect, useState } from "react";
import ScenarioCard from "./components/scenario_card";
import "./scenario_select.css";

const ScenarioSelect = () => {
    const [scenarios, setScenarios] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        fetch("/scenario.json")
            .then(res => {
                if (!res.ok) throw new Error("Failed to fetch scenario.json");
                return res.json();
            })
            .then(json => setScenarios(json.scenarios || []))
            .catch(err => console.error(err));
    }, []);

    if (scenarios.length === 0) {
        return <p>読み込み中...</p>;
    }

    const handleLeftClick = () => {
        setCurrentIndex((prevIndex) => prevIndex - 3);
    };

    const handleRightClick = () => {
        setCurrentIndex((prevIndex) => prevIndex + 3);
    };

    const isLeftDisabled = currentIndex === 0;
    const isRightDisabled = currentIndex >= scenarios.length - 3;

    return (
        <div className="scenario_select">
            {/* 左ボタン */}
            <div
                style={{
                    width: "50px",
                    height: "50px",
                    backgroundColor: isLeftDisabled ? "#ccc" : "#aaa",
                    position: "absolute",
                    left: "5%",
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
                />
            ))}

            <div
                style={{
                    width: "50px",
                    height: "50px",
                    backgroundColor: isRightDisabled ? "#ccc" : "#aaa",
                    position: "absolute",
                    right: "5%",
                    cursor: isRightDisabled ? "not-allowed" : "pointer",
                }}
                onClick={!isRightDisabled ? handleRightClick : undefined}
            />
        </div>
    );
};

export default ScenarioSelect;