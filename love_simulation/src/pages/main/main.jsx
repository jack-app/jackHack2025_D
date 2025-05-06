import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoveMeter from "./components/love_meter";
import CancelButton from "./components/cancel_button";
import LineBox  from "./components/line_box";
import ChoiceButton from "./components/choice_button";
import IsBackInfo from "./components/isBack_info";
import QuestionBox from "./components/question_window";
import "./main.css"

const Main = () => {
    const [sceneId, setSceneId] = useState(null);
    const [likeability, setLikeability] = useState(50);
    const [choices, setChoices] = useState([]);
    const [lines, setLines] = useState([]);
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [speaker, setSpeaker] = useState("");
    const [nextId, setNextId] = useState(null);
    const [isChoice, setIsChoice] = useState(false);
    const [isShowTitleInfo, setisShowTitleInfo] = useState(false);
    const [continueId, setContinueId] = useState(null);
    const [history, setHistory] = useState([]);
    const [isGameOver, setIsGameOver] = useState(false);
    const [branch, setBranch] = useState([]);
    const [isTextComplete, setIsTextComplete] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
  
    useEffect(() => {
        if (likeability <= 0) {
          setIsGameOver(true);
          setLines(["好感度が0になりました…デートを強制終了します",]);
          setCurrentLineIndex(0);
          setIsChoice(false);
        }
    }, [likeability]);

    //遷移後の初期値設定
    useEffect(() => {
        const fetchScenario = async () => {
            try {
                const res = await fetch(`/scenarios/scenario${location.state.Id}.json`);
                if (!res.ok) throw new Error("failed");
                const data = await res.json();

                setSceneId(location.state?.sceneId ?? null);
                setLikeability(location.state?.Likeability ?? 0);

                if (location.state?.sceneId != null && data.scenes) {
                    const scene = data.scenes.find(s => s.sceneId === location.state.sceneId);
                    if (!scene) return;

                    // テキスト・選択肢
                    setLines(scene.text.split("\n"));
                    setChoices(scene.choices);
                    setSpeaker(scene.speaker);
                    setCurrentLineIndex(0);

                    // nextId／continue をセット
                    setNextId(scene.nextId ?? null);
                    setContinueId(scene.continue ?? null);
                    setBranch(scene.branch ?? null);
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchScenario();
    }, [location.state]);
    
    useEffect(() => {
        setHistory([{
          sceneId: location.state?.sceneId,
          likeability: location.state?.Likeability
        }]);
    }, []);

    //ブラウザの戻る検知
    useEffect(() => {
        const handlePopState = (event) => {
            event.preventDefault();
            navigate("/");
        };

        window.addEventListener("popstate", handlePopState);

        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, [navigate]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Enter") {
                nextLine();
            }
        };
    
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [choices, likeability, navigate, nextId, lines, currentLineIndex]);

    const nextLine = () => {
        if (!isTextComplete) return;

        if (isGameOver) {
            navigate("/end", { state: { id: location.state.Id, Likeability: likeability, cancel_num: location.state?.cancel_num } });
            return;
        }
        if (currentLineIndex < lines.length - 1) {
            setCurrentLineIndex((prevIndex) => prevIndex + 1);
            return;
        }
        if (continueId != null){
            setIsChoice(false);
            navigate("/main", {
                state: {
                    Id: location.state.Id,
                    sceneId: continueId,
                    Likeability: likeability,
                    cancel_num: location.state.cancel_num,
                    bgimagePath:location.state?.bgimagePath,
                }
            });
        }else if (branch != null){
            setIsChoice(false);
            if (likeability > branch.likeability){
                navigate("/main", {
                    state: {
                        Id: location.state?.Id,
                        sceneId: branch.upperId,
                        Likeability: likeability,
                        cancel_num: location.state.cancel_num
                    },
                });
            }else{
                navigate("/main", {
                    state: {
                        Id: location.state?.Id,
                        sceneId: branch.lowerId,
                        Likeability: likeability,
                        cancel_num: location.state.cancel_num
                    },
                });
            }
        }else if (choices.length === 0) {
            navigate("/end", {
                state: {
                    id: location.state.Id,
                    Likeability: likeability,
                    cancel_num: location.state?.cancel_num
                },
            });
            return;
        }else if (nextId) {
            setIsChoice(false);
            navigate("/main", {
                state: {
                    Id: location.state?.Id,
                    sceneId: nextId,
                    Likeability: likeability,
                },
            });
        } else {
            setIsChoice(true);
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

    const choiceClick = (item) => {
        setIsChoice(false);
        setHistory((prev) => [
            ...prev,
            { sceneId, likeability },
        ]);
        navigate(`/main`, 
          {state: { 
            Id:location.state?.Id,
            sceneId:item.nextId,
            Likeability: likeability + item.likeability,
            cancel_num: location.state?.cancel_num,
            bgimagePath:location.state?.bgimagePath,
        }});
      };

    return (
        <div style={{ width: window.innerWidth, height: window.innerHeight, userSelect:"none"}}>
            <div className="game-display">
                <CancelButton 
                    id={location.state?.Id}
                    history={history}
                    setHistory={setHistory}
                    setSceneId={setSceneId}
                    setLikeability={setLikeability}
                    cancel_num={location.state?.cancel_num}
                    setIsChoice={setIsChoice}
                />
                {isShowTitleInfo && <IsBackInfo func={titleBackFalse} />}
                <button onClick={titleBackButton} className="menuButton">MENU</button>
                <div className="scene-section" style={{ backgroundImage: `url(${location.state?.bgimagePath})` }}>
                    <LoveMeter love={likeability} />
                </div>  
                {isChoice ? (
                    <div style={{ position: "absolute", width: "100%", height: "40%", bottom: 0 }}>
                        <QuestionBox line={lines[currentLineIndex]} />
                        <div
                          style={{
                              zIndex: 1,
                              position: "absolute",
                              width: "100%",
                              height: "75%",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              bottom: 0,
                          }}
                        >
                            <div
                                style={{
                                    backgroundColor: "rgba(218, 214, 214, 0.7)",
                                    display: "grid",
                                    gridTemplateColumns: "1fr 1fr",
                                    gridTemplateRows: "1fr 1fr", 
                                    width: "100%",
                                    height: "100%",
                                    borderTop: "3px solid black",
                                    borderLeft: "3px solid black",
                                }}
                            >
                                {choices.map((item, index) => (
                                    <ChoiceButton
                                        key={index}
                                        isChoice={isChoice}
                                        choice={[item]}
                                        handleClick={() => choiceClick(item)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div onClick={nextLine}>
                        <LineBox 
                            line={lines[currentLineIndex]} 
                            speaker={speaker} 
                            onComplete={setIsTextComplete} 
                        />
                    </div>
                )}
            </div>
        </div>
    );
  };

  export default Main;