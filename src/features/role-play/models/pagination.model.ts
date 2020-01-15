import { FilterModel } from "./filter.model";

export class PaginationModel {
  constructor(
    public page = 1,
    public size = 3,
    public total: number,
    public listItems: Array<any>,
    public filter: FilterModel
  ) {}

  next: number = this.page + 1;

  prev: number = this.page - 1;

  totalPages = (this.total / this.size).toFixed(0);
}
