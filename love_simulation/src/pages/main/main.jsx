import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import LoveMeter from "./components/love_meter";

const Main = () => {
    const [scenario, setScenario] = useState({});
    const [scenarioId, setScenarioId] = useState(null);
    const [error, setError] = useState(null);

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
            <LoveMeter love={50} />
        </div>
    );
};

export default Main;