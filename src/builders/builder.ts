export class Builder {
  constructor(private list: any[] = []) {}

  build() {
    return this.list;
  }

  pipe(stage) {
    this.list.push(stage);
    return this;
  }

  match(stage) {
    this.list.push({
      $match: stage,
    });
    return this;
  }

  facet(stage) {
    this.list.push({
      $facet: stage,
    });
    return this;
  }

  unset(list) {
    this.list.push({
      $unset: list,
    });
    return this;
  }

  addFields(stage) {
    this.list.push({
      $addFields: stage,
    });
    return this;
  }

  project(stage) {
    this.list.push({
      $project: stage,
    });
    return this;
  }

  group(stage) {
    this.list.push({
      $group: stage,
    });
    return this;
  }
}
