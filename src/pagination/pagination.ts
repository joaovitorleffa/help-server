import { PaginationResult } from './pagination.results.interface';

export class Pagination<Entity> {
  public results: Entity[];
  public page_total: number;
  public total: number;
  public current_page: number;

  constructor(paginationResults: PaginationResult<Entity>) {
    this.results = paginationResults.results;
    this.page_total = paginationResults.results.length;
    this.total = paginationResults.total;
    this.current_page = paginationResults.current_page;
  }
}
