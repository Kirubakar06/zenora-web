type Callback = (data: any) => void;

export class EventEmitter {
  private events: Map<string, Callback[]> = new Map();

  on(event: string, callback: Callback) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event)?.push(callback);
    return () => this.off(event, callback);
  }

  off(event: string, callback: Callback) {
    const callbacks = this.events.get(event);
    if (!callbacks) return;
    this.events.set(
      event,
      callbacks.filter((cb) => cb !== callback)
    );
  }

  emit(event: string, data?: any) {
    const callbacks = this.events.get(event);
    if (callbacks) {
      callbacks.forEach((cb) => {
        try {
          cb(data);
        } catch (e) {
          console.error(`Error in event callback for ${event}:`, e);
        }
      });
    }
  }
}
