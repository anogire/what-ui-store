import { TELEGRAM_BOT_TOKEN, CHAT_ID } from '../consts.js';

export default class ModelTelegramBot {

  async sendOrder(data) {
    const { customer: { name, phone, email }, order: { totalSum } } = data;

    const text = `
    <b>New order</b>!!
      <i>Customer:</i>!
        name: ${name}!
        phone: ${phone}!
        email:  ${email}!!
      <i>TotalSum:</i> ${totalSum}`;

    const textFormat = text.replace(/[!\s]/g, mark => (mark == '!') ? '%0A' : '+');

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&parse_mode=html&text=${textFormat}`;
    try {
      await fetch(url);
    } catch (err) {
      console.log(err);
    }
  }
}