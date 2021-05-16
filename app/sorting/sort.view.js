export default class ViewSort {

  constructor(handlerActions) {
    this.sortDirection = document.querySelector('#sortByPrice');
    this.sortDirection.addEventListener('change', handlerActions);
  }
}