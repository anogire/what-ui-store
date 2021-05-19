import { TELEGRAM_BOT_TOKEN, CHAT_ID } from '../consts.js';
import Publisher from '../pub-sub.js';

export default class ControllerTelegramBot {
  constructor() {
    this.publisher = new Publisher();

    this.publisher.subscribe('confirmOrder', data => this.sendMessage(data));
  }

  async sendMessage(data) {
    const txt = `New order. From: ${data.customer.name}, totalSum: ${data.order.totalSum}`;
    try {
      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&parse_mode=html&text=${txt}`);
    } catch (err) {
      console.log(err);
    }
  }
}