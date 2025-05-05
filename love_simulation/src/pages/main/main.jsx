import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoveMeter from "./components/love_meter";
import CancelButton from "./components/cancel_button";
import MenuButton from "./components/menu_button";
import LineBox  from "./components/line_box";
import Character from "./components/character"
import ChoiceButton from "./components/choice_button";
import "./main.css"

const Main = () => {
    const [scenario, setScenario] = useState({});
    const [error, setError] = useState(null);
    const [line, setNextLine] = useState(null);
    const [character, setCharacter] = useState(null);
    const [choice, setChoice] = useState([]);
    const [nextId, setNextId] = useState(null);
    const [isChoices, setIsChoices] = useState(false);
    const [scenarioId, setScenarioId] = useState(null);
    const [likeability, setLikeability] = useState(0);
    const [scenarioTitle, setScenarioTitle] = useState("");

    const location = useLocation();
    const navigate = useNavigate();
  
    useEffect(() => {
      fetch("/scenario.json")
        .then(res => {
          if (!res.ok) throw new Error("Failed to fetch scenario.json");
          return res.json();
        })
        .then(setScenario)
        .catch(err => setError(err.message));
    }, [location.state]);

    useEffect(() => {
        setScenarioId(location.state?.scenarioId || null);
        setLikeability(location.state?.Likeability || 0);
        setScenarioTitle(location.state?.scenarioTitle || "");
        if (scenarioId && scenario.scenarios) {
            const index = scenario.scenarios.findIndex(scenarioItem => scenarioItem.title === scenarioTitle);
            if (index === -1) {
                setError("Scenario not found");
                return;
            }
            const scenarioIndex = scenario.scenarios[index].scenes.findIndex(scenarioItem => scenarioItem.sceneId === scenarioId);

            if (scenarioIndex === -1) {
                setError("Scene not found");
                return;
            }

            const text = scenario.scenarios[index].scenes[scenarioIndex].text;
            const contents = scenario.scenarios[index].scenes[scenarioIndex];
            const choice = contents.choices || [];
            const nextId = contents.nextId || null;
            setChoice(choice);
            setNextLine(text)
            setNextId(nextId);
        }
    }, [scenarioId, scenario]);
    
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Enter") {
                if (choice.length === 0) { 
                    navigate("/end", {
                        state: {
                            Likeability: likeability,
                        },
                    });
                    return;
                }
                nextLine();
            }
        };
    
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [choice, likeability, navigate]);

    const nextLine = () => {
        if(nextId){
            navigate("/main", {state: 
                { 
                    scenarioId: nextId, 
                    Likeability: likeability, 
                    scenarioTitle: scenarioTitle 
            }});
        }
        else{
            setIsChoices(true);
        }
    };

    const nextCharacter = () => {
        setCharacter();
    };

    return (
        <div style={{ width: window.innerWidth, height: window.innerHeight }}>
            <div className="game-display">
                <CancelButton className="cancelButton"/>
                <MenuButton className="menuButton" />
                <div className="scene-section">
                    <LoveMeter love={likeability} />
                    <ChoiceButton isChoice={isChoices} choice={choice} likeability={likeability} title={scenarioTitle} />
                </div>  
                <div onClick={nextLine}>
                    <Character character={String(character)}/>
                    <LineBox line={String(line)}/>
                </div>
            </div>
        </div>
    );
  };

  export default Main;