import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Main = () => {
    const [scenario, setScenario] = useState({});
    const [scenarioId, setScenarioId] = useState(null);
    console.log("1")
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
            console.log("id: ", scenarioId)
            console.log("Scenario:", scenario["scenarios"][parseInt(scenarioId)]["title "]);
            console.log("type: ", typeof (scenarioId))
        }
    }, [scenarioId, scenario]);

    return (
        <div>
            <h1>Main Page</h1>
            <p>Welcome to the main page of the Love Simulation game!</p>
            {error && <p style={{ color: "red" }}>Error: {error}</p>}
            {scenarioId && <p>Scenario ID: {scenarioId}</p>}
            {scenarioId && scenario.scenarios && scenario.scenarios.length > 0 && scenario.scenarios[0].title && (
                <div>
                    <h2>Scenario Details</h2>
                    <p>{scenario.scenarios[0].title}</p>
                </div>
            )}
        </div>
    );
};

export default Main;