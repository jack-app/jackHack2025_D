const Character = ({ character }) => {

    return (
        <div className="character" style={{fontSize: "40px", color: "white" }}>
            {character}
        </div>
    );
};

export default Character;