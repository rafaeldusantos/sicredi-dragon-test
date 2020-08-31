export class Pagination {

  totalPages: number;
  currentPage: number;
  pages: Array<number>;
  perPage: number;

  constructor(perPage: number) {
    this.perPage = perPage;
    this.currentPage = 1;
  }
}
