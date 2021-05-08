import { URL } from '../consts.js';

export default class ModelProducts {
  async load() {
    try {
      const data = await fetch(URL)
        .then(res => res.json());
      return data;
    } catch (err) {
      console.log(err);
    }
  }
}