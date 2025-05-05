import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import LoveMeter from "./components/love_meter";
import CancelButton from "./components/cancel_button";
import MenuButton from "./components/menu_button";
import LineBox  from "./components/line_box";
import Character from "./components/character"
import ChoiceButton from "./components/choice_button";
import IsBackInfo from "./components/isBack_info";
import "./main.css"

let num = "hello";

const Main = () => {
    const [scenario, setScenario] = useState({});
    const [error, setError] = useState(null);
    const [line, setNextLine] = useState(null);
    const [character, setCharacter] = useState(null);
    const [textList, setTextList] = useState([]);
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [choice, setChoice] = useState([]);
    const [isChoices, setIsChoices] = useState(false);
    const [scenarioId, setScenarioId] = useState(null);
    const [likeability, setLikeability] = useState(0);
    const [scenarioTitle, setScenarioTitle] = useState("");
    const [isShowTitleInfo, setisShowTitleInfo] = useState(false);

    const location = useLocation();
  
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
            setChoice(choice);
    
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

    const nextLine = () => {
        setNextLine(num); // テスト用
        console.log(num);
    };

    const nextCharacter = () => {
        setCharacter();
    };

    const titleBackButton = () => {
        if(isShowTitleInfo === false){
            setisShowTitleInfo(true);
        }
    };

    const titleBackFalse = () => {
        if(isShowTitleInfo === true){
            setisShowTitleInfo(false)
        }
    };

    return (
        <div style={{ width: window.innerWidth, height: window.innerHeight }}>
            <div className="game-display">
                {isShowTitleInfo && <IsBackInfo func={titleBackFalse} />}
                <button className="cancelButton"/>
                <button onClick={titleBackButton} className="menuButton" />
                <div className="scene-section">
                    <LoveMeter love={10}/>
                </div>  
                <div onClick={nextLine}>
                    <Character character={String(character)}/>
                    <LineBox line={String(line)}/>
                </div>
                <ChoiceButton isChoice={isChoices} choice={choice} likeability={likeability} title={scenarioTitle} />
            </div>
        </div>
    );
  };

  export default Main;