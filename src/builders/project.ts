export class ProjectBuilder {
  includeField(fieldName) {
    this[fieldName] = 1;
    return this;
  }

  excludeField(fieldName) {
    this[fieldName] = 0;
    return this;
  }

  addField(fieldName, spec) {
    this[fieldName] = spec;
    return this;
  }
}
