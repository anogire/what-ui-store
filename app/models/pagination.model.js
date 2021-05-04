export default class ModelPagination {
  constructor(itemsPerPage) {
    this.collectionLength = 0;
    this.itemsPerPage = itemsPerPage;
  }

  changeCollectionLength = (quantity) => this.collectionLength = quantity;

  pageCount = () => Math.ceil(this.collectionLength / this.itemsPerPage);
}