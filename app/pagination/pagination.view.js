export default class ViewPagination {

  constructor(handlerActions) {
    this.paginationSelector = document.querySelector('.nav-pag');
    this.handlerActions = handlerActions;
  }

  render(curPage, quantityPages, range) {
    if (!curPage) {
      this.paginationSelector.innerHTML = '';
      return;
    }
    this.paginationSelector.innerHTML = `
    <ul class="pagination justify-content-center flex-wrap">
      ${this.renderPrevPage(curPage)}
      ${this.renderPageNumber(curPage, range)}
      ${this.renderNextPage(curPage, quantityPages)}
    </ul>`;

    this.paginationSelector.addEventListener('click', this.handlerActions);
  }

  renderPageNumber(curPage, [minimum, maximum]) {
    let listPages = '';
    for (let i = minimum; i <= maximum; i++) {
      if (curPage == i) {
        listPages += `
          <li>
            <button type="button" data-id="${i}" data-action="change_page" class="pagination-page-active" disabled aria-label="${i} page">
              ${i}
            </button>
          </li>`;
      } else {
        listPages += `
          <li>
            <button type="button" data-id="${i}" data-action="change_page" class="pagination-page" aria-label="go to ${i} page">
              ${i}
            </button>
          </li>`;
      };
    }
    return listPages;
  }

  renderPrevPage(curPage) {
    const prevPage = (curPage == 1) ?
      `<li>
        <button id="pagPrev" type="button" class="pagination-arr-disabled icon arr-left" disabled aria-label="Previous">
        </button>
      </li>` :
      `<li>
        <button id="pagPrev" type="button" data-id="${+curPage - 1}" data-action="change_page" 
          class="pagination-arr icon arr-left" aria-label="Previous">
        </button>
      </li>`;
    return prevPage;
  }

  renderNextPage(curPage, quantityPages) {
    const nextPage = (quantityPages == 1 || curPage == quantityPages) ?
      `<li>
        <button id="pagNext" type="button" class="pagination-arr-disabled icon arr-right" disabled aria-label="Next">
        </button>
      </li>` :
      `<li>
        <button id="pagNext" type="button" data-id="${+curPage + 1}" data-action="change_page" 
          class="pagination-arr icon arr-right" aria-label="Next">
        </button>
      </li>`;
    return nextPage;
  }
}