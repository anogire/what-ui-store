import ModelTelegramBot from './telegram-bot.model.js';
import Publisher from '../pub-sub.js';

export default class ControllerTelegramBot {
  constructor() {
    this.publisher = new Publisher();
    this.model = new ModelTelegramBot();
    this.publisher.subscribe('confirmOrder', data => this.model.sendOrder(data));
  }
}