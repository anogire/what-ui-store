import { EventBus } from '../pub-sub.js';

export default class ViewPagination {
  constructor() {
    this.paginationSelector = document.querySelector('.nav-pag');
    this.curPage = 1;
    this.pages = 1;
    this.prevItem;
    this.nextItem;
  }

  // инициализация пагинации
  init(pages) {
    this.pages = pages;
    this.paginationSelector.innerHTML = '';
    if (!pages) return;

    const list = document.createElement('ul');
    list.setAttribute('class', 'pagination justify-content-center');

    const prev = document.createElement('li');
    prev.innerHTML = '<button id="pagPrev" type="button" class="pagination-arr icon arr-left" disabled aria-label="Previous"></button>';
    prev.addEventListener('click', e => this.changePage(this.curPage - 1));
    list.append(prev);

    for (let i = 1; i <= pages; i++) {
      const el = document.createElement('li');
      if (this.curPage == i) {
        el.innerHTML = `<button type="button" id="pag${i}" class="pagination-page pagination-page--active" disabled aria-label="${i} page">${i}</button>`;
      } else {
        el.innerHTML = `<button type="button" id="pag${i}" class="pagination-page" aria-label="go to ${i} page">${i}</button>`;
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

    this.paginationSelector.append(list);
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
    if (this.curPage == this.pages) {
      this.nextItem.setAttribute('disabled', 'true');
    } else {
      this.nextItem.removeAttribute('disabled');
    }
  }
}