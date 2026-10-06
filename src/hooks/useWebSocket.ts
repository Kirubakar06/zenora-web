import { useEffect, useState } from 'react';
import { wsClient } from '../lib/websocket/mockSocket';

export function useWebSocket() {
  const [status, setStatus] = useState<'connected' | 'disconnected'>('connected');

  useEffect(() => {
    wsClient.connect();

    const unbindConnect = wsClient.on('connected', () => setStatus('connected'));
    const unbindDisconnect = wsClient.on('disconnected', () => setStatus('disconnected'));

    return () => {
      unbindConnect();
      unbindDisconnect();
    };
  }, []);

  return {
    status,
    isConnected: status === 'connected',
    client: wsClient,
  };
}
