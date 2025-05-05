import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import LoveMeter from "./components/love_meter";
import CancelButton from "./components/cancel_button";
import MenuButton from "./components/menu_button";
import LineBox  from "./components/line_box";
import Character from "./components/character"
import "./main.css"

let num = "hello";

const Main = () => {
    const [scenario, setScenario] = useState({});
    const [scenarioId, setScenarioId] = useState(null);
    const [error, setError] = useState(null);
    const [line, setNextLine] = useState(null);
    const [character, setCharacter] = useState(null);

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
            console.log("Scenario:", scenario.scenarios[scenarioId]);
        }
    }, [scenarioId, scenario]);

    const nextLine = () => {
        setNextLine(num); // テスト用
        console.log(num);
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
                    <LoveMeter love={10}/>
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