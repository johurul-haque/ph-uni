type QueryObject = {
  $or: {
    [x: string]: {
      $regex: {};
      $options: string;
    };
  }[];
  email?: string;
};

export type QueryType = {
  q?: string;
  email?: string;
  sort?: string;
  limit?: string;
  page?: string;
};

export class QueryBuilder {
  private queryObject: QueryObject = { $or: [] };
  private queryParams = { sort: 'userId', limit: 5, skip: 0 };

  constructor(query: QueryType, searchFields: string[]) {
    this.buildQueryObject(query, searchFields);
    this.buildQueryParams(query);
  }

  private buildQueryObject(query: QueryType, fields: string[]): void {
    const searchFields = fields.map((field) => ({
      [field]: { $regex: query.q ?? '', $options: 'i' },
    }));
    this.queryObject.$or = searchFields;

    if (query.email) {
      this.queryObject.email = query.email;
    }
  }

  private buildQueryParams(query: QueryType): void {
    if (query.sort) {
      this.queryParams.sort = query.sort;
    }

    if (query.limit) {
      this.queryParams.limit = Number(query.limit) || this.queryParams.limit;
    }

    if (query.page) {
      const page = Number(query.page) || 1;
      this.queryParams.skip = (page - 1) * this.queryParams.limit;
    }
  }

  getQueryObject() {
    return this.queryObject;
  }

  getQueryParams() {
    return this.queryParams;
  }
}
