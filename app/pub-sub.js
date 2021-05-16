export default class Publisher {

  constructor() {
    if (Publisher._instance) {
      return Publisher._instance;
    }
    Publisher._instance = this;

    this._channels = {};
  }

  _subscribe(channelName, listener) {
    if (!this._channels[channelName]) {
      this._channels[channelName] = [];
    }
    this._channels[channelName].push(listener);
  }
  get subscribe() {
    return this._subscribe;
  }

  _unsubscribe(channelName, listener) {
    if (!this._channels[channelName]) {
      this._channels[channelName] = [];
    }

    this._channels[channelName] = this._channels[channelName].filter(func => func != listener);
  }
  get unsubscribe() {
    return this._unsubscribe;
  }

  _publish(channelName, data) {
    const channel = this._channels[channelName]
    if (!channel || !channel.length) {
      return;
    }

    channel.forEach(listener => listener(data));
  }
  get publish() {
    return this._publish;
  }
}