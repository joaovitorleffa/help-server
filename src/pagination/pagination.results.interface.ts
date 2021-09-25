export interface PaginationResult<Entity> {
  results: Entity[];
  total: number;
  current_page: number;
}
