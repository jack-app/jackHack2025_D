import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import LoveMeter from "./components/love_meter";

const Main = () => {
    const [scenario, setScenario] = useState({});
    const [error, setError] = useState(null);
    const [textList, setTextList] = useState([]);
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [choicesText, setChoicesText] = useState([]);
    const [isChoices, setIsChoices] = useState(false);
    const [scenarioId, setScenarioId] = useState(null);
    const [likeability, setLikeability] = useState(0);
    const [scenarioTitle, setScenarioTitle] = useState("");

    const location = useLocation();
  
    useEffect(() => {
      fetch("/scenario.json")
        .then(res => {
          if (!res.ok) throw new Error("Failed to fetch scenario.json");
          return res.json();
        })
        .then(setScenario)
        .catch(err => setError(err.message));
    }, []);

    useEffect(() => {
        setScenarioId(location.state?.scenarioId || null);
        setLikeability(location.state?.Likeability || 0);
        setScenarioTitle(location.state?.scenarioTitle || "");
        if (scenarioId && scenario.scenarios) {
            const index = scenario.scenarios.findIndex(scenarioItem => scenarioItem.title === scenarioTitle);
            const scenarioIndex = scenario.scenarios[index].scenes.findIndex(scenarioItem => scenarioItem.sceneId === scenarioId);
            const text = scenario.scenarios[index].scenes[scenarioIndex].text;
            const contents = scenario.scenarios[index].scenes[scenarioIndex];
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
            <LoveMeter love={likeability} />
        </div>
    );
  };

  export default Main;