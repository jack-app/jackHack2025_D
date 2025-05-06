import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./credit.css";

const Credit = () => {
    const navigate = useNavigate();

    const handleClose = () => {
        navigate("/"); // 戻るボタンを押したときの処理
    }

    return (
        <div className="credit">
            <h1>Credit</h1>
            <p>Developed by:ちご, ノセ, ピスラ, ビタミン21, ポッチャマ, kotama, yke</p>
            <p>Story Telling by:ちご, ノセ, ビタミン21, ポッチャマ, yke</p>
            <p>Senior 恋愛 engineer:ピスラ</p>
            <p>Super 恋愛 adviser:ピスラ</p>
            <p>General 恋愛 Director:ピスラ</p>
            <p>Cheif 恋愛 Officer:ピスラ</p>
            <p>Special thanks to: ChatGPT</p>
            <p>Version: 1.0.0</p>
            <p>Copyright © 2025 All rights reserved.</p>
            <button onClick={handleClose}>閉じる</button>
            <p>このゲームは半分くらいフィクションです。実在の人物、団体、事件などとはそこまで関係ありません。</p>
        </div>
    );
    }   

export default Credit;