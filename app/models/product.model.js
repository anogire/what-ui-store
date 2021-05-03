import { EventBus } from '../pub-sub.js';

export default class Model {
  url = 'https://6013f25bb5389800175688b1.mockapi.io/contacts';

  async load() {
    try {
      const result = await fetch(this.url)
        .then(res => res.json())
        .then(data => {
          EventBus.publish('load', {
            products: data,
            quantity: data.length
          });
          return data;
        });
      return result;
    } catch (err) {
      console.log(err);
    }
  }
}