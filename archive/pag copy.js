import { EventBus } from '../app/pub-sub.js';

export default class Pagination {
  constructor(collectionLength, itemsPerPage) {
    this.collectionLength = collectionLength;
    this.itemsPerPage = itemsPerPage;
    this.curPage = 1;
    this.prevItem;
    this.nextItem;

    EventBus.subscribe('load', this.changeCollectionLength);
  }

  changeCollectionLength = (quantity) => this.collectionLength = quantity;

  pageCount = () => Math.ceil(this.collectionLength / this.itemsPerPage);

  // инициализация пагинации
  init() {
    const count = this.pageCount();
    const paginationSelector = document.querySelector('.nav-pag');

    const list = document.createElement('ul');
    list.setAttribute('class', 'pagination justify-content-center');

    const prev = document.createElement('li');
    prev.innerHTML = '<button id="pagPrev" type="button" class="pagination-arr icon arr-left" disabled aria-label="Previous"></button>';
    prev.addEventListener('click', e => this.changePage(this.curPage - 1));
    list.append(prev);

    for (let i = 1; i <= count; i++) {
      const el = document.createElement('li');
      if (this.curPage == i) {
        el.innerHTML = `<button id="pag${i}" type="button" class="pagination-page pagination-page--active" disabled aria-label="${i} page">${i}</button>`;
      } else {
        el.innerHTML = `<button id="pag${i}" type="button" class="pagination-page" aria-label="go to ${i} page">${i}</button>`;
      }
      el.addEventListener('click', e => this.changePage(i));
      list.append(el);
    }

    const next = document.createElement('li');
    if (count == 1) {
      next.innerHTML = '<button id="pagNext" type="button" class="pagination-arr icon arr-right" disabled aria-label="Next"></button>';
    } else {
      next.innerHTML = '<button id="pagNext" type="button" class="pagination-arr icon arr-right" aria-label="Next"></button>';
    }
    next.addEventListener('click', e => this.changePage(this.curPage + 1));

    list.append(next);

    paginationSelector.append(list);
    this.prevItem = document.querySelector('#pagPrev');
    this.nextItem = document.querySelector('#pagNext');
  }

  // сменить страницу
  changePage(nextInd) {
    this.changeViewPrevPage();
    this.changeViewNextPage(nextInd);
    this.curPage = nextInd;
    this.checkPrevArrow();
    this.checkNextArrow();
  }

  // внешний вид новой кнопки пагинации
  changeViewNextPage(nextInd) {
    const nextEl = document.querySelector(`#pag${nextInd}`);
    nextEl.setAttribute('class', 'pagination-page pagination-page--active');
    nextEl.setAttribute('disabled', 'true');
    nextEl.setAttribute('aria-label', `${nextInd} page`);
  }

  // внешний вид предыдущей кнопки пагинации
  changeViewPrevPage() {
    const prevEl = document.querySelector(`#pag${this.curPage}`);
    prevEl.setAttribute('class', 'pagination-page');
    prevEl.removeAttribute('disabled');
    prevEl.setAttribute('aria-label', `go to ${this.curPage} page`);
  }

  // проверка перехода по стрелке к предыдущей странице
  checkPrevArrow() {
    if (this.curPage == 1) {
      this.prevItem.setAttribute('disabled', 'true');
    } else {
      this.prevItem.removeAttribute('disabled');
    }
  }

  // проверка перехода по стрелке к предыдущей странице
  checkNextArrow() {
    if (this.curPage == this.pageCount()) {
      this.nextItem.setAttribute('disabled', 'true');
    } else {
      this.nextItem.removeAttribute('disabled');
    }
  }
}



import { EventBus } from '../app/pub-sub.js';

export default class Pagination {
  constructor(itemsPerPage) {
    this.collectionLength = 0;
    this.itemsPerPage = itemsPerPage;
    this.curPage = 1;
    this.prevItem;
    this.nextItem;
  }

  changeCollectionLength = (quantity) => this.collectionLength = quantity;

  pageCount = () => Math.ceil(this.collectionLength / this.itemsPerPage);

  // инициализация пагинации
  init(params) {
    this.changeCollectionLength(params.quantity);
    const pages = this.pageCount();
    const paginationSelector = document.querySelector('.nav-pag');
    paginationSelector.innerHTML = '';

    const list = document.createElement('ul');
    list.setAttribute('class', 'pagination justify-content-center');

    const prev = document.createElement('li');
    prev.innerHTML = '<button id="pagPrev" type="button" class="pagination-arr icon arr-left" disabled aria-label="Previous"></button>';
    prev.addEventListener('click', e => this.changePage(this.curPage - 1));
    list.append(prev);

    for (let i = 1; i <= pages; i++) {
      const el = document.createElement('li');
      if (this.curPage == i) {
        el.innerHTML = `<button id="pag${i}" type="button" class="pagination-page pagination-page--active" disabled aria-label="${i} page">${i}</button>`;
      } else {
        el.innerHTML = `<button id="pag${i}" type="button" class="pagination-page" aria-label="go to ${i} page">${i}</button>`;
      }
      el.addEventListener('click', e => this.changePage(i));
      list.append(el);
    }

    const next = document.createElement('li');
    if (pages == 1) {
      next.innerHTML = '<button id="pagNext" type="button" class="pagination-arr icon arr-right" disabled aria-label="Next"></button>';
    } else {
      next.innerHTML = '<button id="pagNext" type="button" class="pagination-arr icon arr-right" aria-label="Next"></button>';
    }
    next.addEventListener('click', e => this.changePage(this.curPage + 1));

    list.append(next);

    paginationSelector.append(list);
    this.prevItem = document.querySelector('#pagPrev');
    this.nextItem = document.querySelector('#pagNext');
  }

  // сменить страницу
  changePage(nextInd) {
    this.changeViewPrevPage();
    this.changeViewNextPage(nextInd);
    this.curPage = nextInd;
    this.checkPrevArrow();
    this.checkNextArrow();
    EventBus.publish('changePage', {
      curPage: this.curPage,
    });
  }

  // внешний вид новой кнопки пагинации
  changeViewNextPage(nextInd) {
    const nextEl = document.querySelector(`#pag${nextInd}`);
    nextEl.setAttribute('class', 'pagination-page pagination-page--active');
    nextEl.setAttribute('disabled', 'true');
    nextEl.setAttribute('aria-label', `${nextInd} page`);
  }

  // внешний вид предыдущей кнопки пагинации
  changeViewPrevPage() {
    const prevEl = document.querySelector(`#pag${this.curPage}`);
    prevEl.setAttribute('class', 'pagination-page');
    prevEl.removeAttribute('disabled');
    prevEl.setAttribute('aria-label', `go to ${this.curPage} page`);
  }

  // проверка перехода по стрелке к предыдущей странице
  checkPrevArrow() {
    if (this.curPage == 1) {
      this.prevItem.setAttribute('disabled', 'true');
    } else {
      this.prevItem.removeAttribute('disabled');
    }
  }

  // проверка перехода по стрелке к предыдущей странице
  checkNextArrow() {
    if (this.curPage == this.pageCount()) {
      this.nextItem.setAttribute('disabled', 'true');
    } else {
      this.nextItem.removeAttribute('disabled');
    }
  }
}