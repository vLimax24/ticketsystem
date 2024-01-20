import { createContext, useContext, useState, useEffect } from 'react';

const StatusContext = createContext();

export const useStatusContext = () => {
  return useContext(StatusContext);
};

export const StatusProvider = ({ children }) => {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    // Connect to WebSocket server and handle status updates
    const socket = new WebSocket('ws://your-websocket-server');
    
    socket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      setStatus(data.status);
    });

    // Cleanup on unmount
    return () => {
      socket.close();
    };
  }, []);

  return (
    <StatusContext.Provider value={{ status, setStatus }}>
      {children}
    </StatusContext.Provider>
  );
};