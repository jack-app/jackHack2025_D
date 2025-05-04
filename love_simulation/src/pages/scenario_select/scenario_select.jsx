import { useEffect, useState } from "react";
import ScenarioCard from "./components/scenario_card";

const ScenarioSelect = () => {
    const [scenarios, setScenarios] = useState([]);

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

    return (
        <div style={{display:'flex', gap:'10%', height:'100vh',  margin: '0',  justifyContent: 'center', alignItems: 'center'}}>
            {scenarios.map((scenario, index) => (
                <ScenarioCard
                    key={index}
                    title={scenario.title}
                    imagePath={scenario.image}
                    difficulty={scenario.difficulty}
                    description={scenario.description}
                />
            ))}
        </div>
    );
    
};

export default ScenarioSelect;
