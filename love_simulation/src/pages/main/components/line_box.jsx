import { useState, useEffect } from 'react';
import Character from './character';

const LineBox = ({ line, speaker }) => {
    const [displayLine, setDisplayLine] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        // line prop が変更されたら、表示とインデックスをリセット
        setDisplayLine('');
        setCurrentIndex(0);

        // line が "null" または空の場合は何もしない
        if (line === "null" || !line) {
            return; // タイマーを設定せずに終了
        }

        // 新しい line でタイピングアニメーションを開始
        const timer = setInterval(() => {
            // currentIndex を state の更新関数内で参照・更新する
            setCurrentIndex(prevIndex => {
                if (prevIndex < line.length) {
                    // 表示する文字を更新
                    // prevIndex を使って line から文字を取得
                    setDisplayLine(prevDisplay => prevDisplay + line[prevIndex]);
                    // 次のインデックスへ
                    return prevIndex + 1;
                } else {
                    // 全ての文字を表示し終えたらタイマーを停止
                    clearInterval(timer);
                    return prevIndex; // インデックスは変更しない
                }
            });
        }, 45);

        // クリーンアップ関数:
        // コンポーネントがアンマウントされる時、または
        // `line` が変更されて useEffect が再実行される前にタイマーをクリアする
        return () => clearInterval(timer);

    }, [line]); // 依存配列を `line` のみに変更

    return (
        <div className="lineBox">
            <Character speaker={speaker}/>
            <div className="line">
                {displayLine}
            </div>
        </div>
    );
};

export default LineBox;