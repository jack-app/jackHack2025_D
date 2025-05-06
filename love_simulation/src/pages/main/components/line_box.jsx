import { useState, useEffect, useRef } from 'react';
import Character from './character';

const LineBox = ({ line, speaker, onComplete }) => {
    const [displayLine, setDisplayLine] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);
    const timerRef = useRef(null);

    useEffect(() => {
        setDisplayLine('');
        setCurrentIndex(0);
        setIsCompleted(false);
        onComplete(false);

        if (line === "null" || !line) {
            return;
        }

        timerRef.current = setInterval(() => {
            setCurrentIndex(prevIndex => {
                if (prevIndex < line.length) {
                    setDisplayLine(prevDisplay => prevDisplay + line[prevIndex]);
                    return prevIndex + 1;
                } else {
                    clearInterval(timerRef.current);
                    setIsCompleted(true);
                    onComplete(true);
                    return prevIndex;
                }
            });
        }, 45);

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [line, onComplete]);

    const handleClick = () => {
        if (!isCompleted) {
            clearInterval(timerRef.current);
            setDisplayLine(line);
            setCurrentIndex(line.length);
            setIsCompleted(true);
            onComplete(true);
        }
    };

    return (
        <div className="lineBox" onClick={handleClick}>
            <Character speaker={speaker}/>
            <div className="line">
                {displayLine}
            </div>
        </div>
    );
};

export default LineBox;