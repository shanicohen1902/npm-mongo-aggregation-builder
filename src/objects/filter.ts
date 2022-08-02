export class Filter {
  constructor(input: string, as: string, condition: any) {
    this['$filter'] = {
      input: input,
      as: as,
      cond: condition,
    };
  }

  first():any {
    return { $first: this };
  }
}
