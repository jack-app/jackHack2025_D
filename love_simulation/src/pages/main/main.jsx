import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoveMeter from "./components/love_meter";
import CancelButton from "./components/cancel_button";
import MenuButton from "./components/menu_button";
import LineBox  from "./components/line_box";
import Character from "./components/character"
import ChoiceButton from "./components/choice_button";
import IsBackInfo from "./components/isBack_info";
import "./main.css"

const Main = () => {
    const [scenario, setScenario] = useState({});
    const [error, setError] = useState(null);
    const [line, setNextLine] = useState(null);
    const [speaker, setSpeaker] = useState(null);
    const [choice, setChoice] = useState([]);
    const [nextId, setNextId] = useState(null);
    const [isChoices, setIsChoices] = useState(false);
    const [scenarioId, setScenarioId] = useState(null);
    const [likeability, setLikeability] = useState(0);
    const [scenarioTitle, setScenarioTitle] = useState("");
    const [history, setHistory] = useState({ likeability: [], scenarioId: [] });
    const [cancel_num, setCancelNum] = useState(0);
    const [isShowTitleInfo, setisShowTitleInfo] = useState(false);

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
        setHistory(location.state?.history || null);
        setCancelNum(location.state?.cancel_num || 0);
        console.log(history);
        if ((scenarioId != history.scenarioId[history.scenarioId.length - 1]) && scenarioId != null) {
            history.likeability.push(likeability);
            history.scenarioId.push(scenarioId);
        }
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
            const speaker = scenario.scenarios[index].scenes[scenarioIndex].speaker;
            setChoice(choice);
            setNextLine(text);
            setSpeaker(speaker)
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
            setIsChoices(false);
            navigate("/main", {state: 
                { 
                    scenarioId: nextId, 
                    Likeability: likeability, 
                    scenarioTitle: scenarioTitle,
                    history: history,
                    cancel_num: cancel_num,
            }});
        }
        else{
            setIsChoices(true);
        }
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

    const handleChoiceClick = (item) => {
        setIsChoices(false);
        navigate("/main", {
            state: {
                scenarioId: item.nextId,
                Likeability: likeability + item.likeability,
                scenarioTitle: scenarioTitle,
            },
        });
    };

    return (
        <div style={{ width: window.innerWidth, height: window.innerHeight }}>
            <div className="game-display">
                <CancelButton 
                    scenarioId={scenarioId} 
                    scenarioTitle={scenarioTitle}
                    history={history}         
                    cancel_num={cancel_num}
                />
                <MenuButton className="menuButton" />
                {isShowTitleInfo && <IsBackInfo func={titleBackFalse} />}
                <button className="cancelButton"/>
                <button onClick={titleBackButton} className="menuButton" />
                <div className="scene-section">
                    <LoveMeter love={likeability} />
                    <ChoiceButton 
                        isChoice={isChoices} 
                        choice={choice} 
                        likeability={likeability} 
                        title={scenarioTitle}
                        history={history}
                        cancel_num={cancel_num}
                    />
                </div>  
                <div onClick={nextLine}>
                    <Character speaker={String(speaker)}/>
                    <LineBox line={String(line)}/>
                </div>
                {isChoices ? (
                   <div
                   style={{
                       zIndex: 10,
                       position: "absolute", 
                       backgroundColor: "rgba(255, 255, 255, 0.8)",
                       width: "100%",
                       height: "30%",
                       display: "flex",
                       justifyContent: "center",
                       alignItems: "center",
                       bottom: 0,
                   }}
               >
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
               </div>
                ) : (
                    <div onClick={nextLine}>
                        <Character character={String(character)} />
                        <LineBox line={String(line)} />
                    </div>
                )}
            </div>
        </div>
    );
  };

  export default Main;