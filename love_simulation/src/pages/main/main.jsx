import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Main = () => {
    const [scenario, setScenario] = useState({});
    const [scenarioId, setScenarioId] = useState(null);
    const [scenarioTitle, setScenarioTitle] = useState(null);
    const [error, setError] = useState(null);

    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const id = params.get("scenarioId");
        const title = params.get("scenarioTitle");
        setScenarioId(id);
        setScenarioTitle(title);

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
        <div>
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
        </div>
    );
};

export default Main;