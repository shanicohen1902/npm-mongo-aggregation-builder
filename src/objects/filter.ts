export class Filter {
  constructor(input: string, as: string, condition: any) {
    this['$filter'] = {
      input: input,
      as: as,
      cond: condition,
    };
  }

  first() {
    return { $first: this };
  }
}
