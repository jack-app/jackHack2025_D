import React from 'react';

const StartButton = () => {
  const styles = {
    body: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh', // viewport height for vertical centering
      width: '100%',
      margin: 0,
    },
    button: {
      backgroundColor: 'rgb(236, 141, 222)',
      height: '10%',
      border: '6px solid #E8B3E5',
      borderRadius: '70%',
      width: '9%',
      fontFamily: `'Times New Roman', Times, serif`,
      fontSize: 'large',
      color: 'rgb(255, 255, 255)',
    },
  };
  return (
    <div style={styles.body}>
      <button style={styles.button}>tap to start</button>
    </div>
  );
};

export default StartButton;