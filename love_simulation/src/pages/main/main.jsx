import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import LoveMeter from "./components/love_meter";

const Main = () => {
    const [scenario, setScenario] = useState({});
    const [scenarioId, setScenarioId] = useState(null);
    const [error, setError] = useState(null);
    const [textList, setTextList] = useState([]);
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [choicesText, setChoicesText] = useState([]);
    const [isChoices, setIsChoices] = useState(false);

    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const id = params.get("scenarioId");
        setScenarioId(id);

        fetch("/scenario.json")
            .then(res => {
                if (!res.ok) {
                    throw new Error("Failed to fetch scenario.json");
                }
                return res.json();
            })
            .then(json => setScenario(json))
            .catch(err => setError(err.message));
    }, [location.search]);

    useEffect(() => {
        if (scenarioId && scenario.scenarios) {
            const text = scenario.scenarios[scenarioId].scenes[0].contents[0].text;
            const contents = scenario.scenarios[scenarioId].scenes[0].contents[0];
            const choices = contents.choices || [];
    
            const extractedChoices = choices.slice(0, 3).map(choice => choice.text);
            setChoicesText(extractedChoices);
    
            const splitText = text.split("\n");
            setTextList(splitText);
        }
    }, [scenarioId, scenario]);
    
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Enter") {
                if (currentTextIndex === textList.length - 1) {
                    setIsChoices(true);
                    return;
                }
                setCurrentTextIndex((prevIndex) => {
                    return prevIndex < textList.length - 1 ? prevIndex + 1 : prevIndex;
                });
            }
        };
    
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [textList, currentTextIndex]);

    return (
        <div style={{ width: window.innerWidth, height: window.innerHeight }}>
            <h1>Main Page</h1>
            <p>Welcome to the main page of the Love Simulation game!</p>
            {error && <p style={{ color: "red" }}>Error: {error}</p>}
            {scenarioId && <p>Scenario ID: {scenarioId}</p>}
            {scenarioId && scenario[scenarioId] && (
                <div>
                    <h2>Scenario Details</h2>
                    <p>{scenario[scenarioId]}</p>
                </div>
            )}
            <div>
                {isChoices ? (
                    <div>
                        {choicesText.map((choice, index) => (
                            <button key={index} >{choice}</button>
                        ))}
                    </div>
                ) : (
                    <p>{textList[currentTextIndex]}</p>
                )}
            </div>
            <LoveMeter love={10} />
        </div>
    );
};

export default Main;