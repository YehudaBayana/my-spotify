// ErrorMessage.tsx
import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div style={styles.errorContainer}>
      <p style={styles.errorMessage}>{message}</p>
    </div>
  );
};

const styles = {
  errorContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f8d7da',  // Light red background
    padding: '20px',
    borderRadius: '5px',
  },
  errorMessage: {
    color: '#721c24',  // Dark red text
    fontSize: '18px',
    fontWeight: 'bold',
    textAlign: 'center' as 'center', // Explicit type assertion
  } as React.CSSProperties, // Explicitly typing the styles as React.CSSProperties
};

export default ErrorMessage;
