// import { URL } from '../consts.js';

// export default class ModelProducts {
//   async load() {
//     try {
//       const data = await fetch(URL)
//         .then(res => res.json());
//       return data;
//     } catch (err) {
//       console.log(err);
//     }
//   }
// }

export default class ModelProducts {
  #apiUrl = 'https://spreadsheets.google.com/feeds/cells/1PXorfz2O2NqH-FcW0nA-HhmtZMmSSwgHheifWc0e1tU/1/public/full?alt=json';
  #data = [];

  constructor() {

  }

  load() {
    return fetch(this.#apiUrl)
      .then(r => r.json())
      .then(d => {
        const dataArr = d.feed.entry;
        const columnCount = 8;
        let fieldTitles = [];
        let products = [];
        let k = 0;

        for (let i = 0; i <= columnCount; i++) {
          fieldTitles.push(dataArr[i].content.$t);
        }

        for (let i = columnCount + 1; i < dataArr.length;) {
          products[k] = {};

          for (let j = 0; j <= columnCount; j++) {
            products[k][fieldTitles[j]] = dataArr[i].content.$t;
            i++;
          }
          k++;
        }
        this.#data = products;
        return this.#data;
      });
  }
}