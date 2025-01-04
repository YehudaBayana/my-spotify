// Spinner.tsx
import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div style={styles.spinnerContainer}>
      <div style={styles.spinner}></div>
    </div>
  );
};

const styles = {
  spinnerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',  // You can adjust the height as needed
  },
  spinner: {
    border: '4px solid #f3f3f3', /* Light grey */
    borderTop: '4px solid #3498db', /* Blue */
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    animation: 'spin 2s linear infinite',
  },
};

export default Spinner;
