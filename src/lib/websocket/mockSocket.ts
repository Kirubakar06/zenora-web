import { EventEmitter } from './eventEmitter';
import { Message } from '../../types/message';

class MockWebSocketClient extends EventEmitter {
  private isConnected: boolean = false;
  private reconnectInterval: any = null;

  connect() {
    if (this.isConnected) return;
    this.isConnected = true;
    this.emit('connected', { status: 'connected', timestamp: new Date().toISOString() });

    // Optional simulated inbound events
    console.log('[WebSocket] Connected to Nexora AI Realtime Gateway');
  }

  disconnect() {
    this.isConnected = false;
    if (this.reconnectInterval) clearInterval(this.reconnectInterval);
    this.emit('disconnected');
  }

  send(event: string, payload: any) {
    if (!this.isConnected) {
      console.warn('[WebSocket] Not connected, queueing payload', payload);
      return;
    }
    this.emit(event, payload);
  }

  simulateIncomingMessage(message: Message) {
    this.emit('new_message', message);
  }

  simulateAiTyping(conversationId: string, isTyping: boolean) {
    this.emit('typing_status', { conversationId, isTyping });
  }

  getStatus() {
    return this.isConnected ? 'connected' : 'disconnected';
  }
}

export const wsClient = new MockWebSocketClient();
