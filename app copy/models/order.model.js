import { URL } from '../consts.js';

export default class ModelProducts {

  async send(order) {
    try {
      const data = await fetch(URL, {
        method: 'POST',
        body: JSON.stringify(order.inner),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      });
      return data;
    } catch (err) {
      console.log(err);
    }
  }
}