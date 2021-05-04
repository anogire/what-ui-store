export default class ModelProducts {
  url = 'https://6013f25bb5389800175688b1.mockapi.io/contacts';

  async load() {
    try {
      const data = await fetch(this.url)
        .then(res => res.json());
      return data;
    } catch (err) {
      console.log(err);
    }
  }
}