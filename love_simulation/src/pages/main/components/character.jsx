const Character = ({ speaker }) => {

    return (
        <div className="character" style={{fontSize: "30px", color: "white" }}>
            {speaker}
        </div>
    );
};

export default Character;