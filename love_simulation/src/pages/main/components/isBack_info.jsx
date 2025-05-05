import { useNavigate } from 'react-router-dom';


const IsBackInfo = ({func}) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/', { replace: true });
    };
  

    return (
        <div className="isbackTitle">
            <div className="message">
                シナリオ選択画面に<br />戻りますか？
                <div className="button-container">
                    <button onClick={func}>いいえ</button>
                    <button onClick={handleClick}>はい</button>
                </div>
            </div>
        </div>
    );
};

export default IsBackInfo;