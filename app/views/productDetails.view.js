export default class ViewProductDetails {

  constructor() {
    this.selectorProduct = document.querySelector('#modalDetails');
  }

  showDetails({ name, price, category }) {
    this.selectorProduct.innerHTML = `
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalLabelDetails">${name}</h5>
          <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>${category}</p>
          <p>${price}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>`;
  }
}