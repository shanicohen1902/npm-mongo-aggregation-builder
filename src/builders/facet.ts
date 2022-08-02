export class FacetBuilder {
  addFacet(facetName, piplineList) {
    this[facetName] = piplineList;
    return this;
  }
}
