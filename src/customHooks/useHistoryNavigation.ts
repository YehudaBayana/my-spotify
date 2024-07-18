import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const useHistoryNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log("location ", location);
  
  const [historyStack, setHistoryStack] = useState([location.pathname]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Update history stack and current index when location changes
    if (location.pathname !== historyStack[currentIndex]) {
      const newStack = [...historyStack.slice(0, currentIndex + 1), location.pathname];
      setHistoryStack(newStack);
      setCurrentIndex(newStack.length - 1);
    }
  }, [location.pathname, currentIndex, historyStack]);

  const goBack = () => {
    if (currentIndex > 0) {
      navigate(-1);
    }
  };

  const goForward = () => {
    if (currentIndex < historyStack.length - 1) {
      navigate(1);
    }
  };

  return {
    canGoBack: currentIndex > 0,
    canGoForward: currentIndex < historyStack.length - 1,
    goBack,
    goForward,
  };
};

export default useHistoryNavigation;
