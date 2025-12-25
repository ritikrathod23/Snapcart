// utils/apiFeatures.js
module.exports = class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludeFields = ['page', 'sort', 'limit', 'fields', 'category'];
    excludeFields.forEach(el => delete queryObj[el]);

    if (queryObj.pSize) {
      queryObj.pSize = { $in: queryObj.pSize.split(',') };
    }
    if (queryObj.pPrice) {
      queryObj.pPrice = { $lt : Number(queryObj.pPrice.split(',')) };
    }
    if (queryObj.pColor) {
      queryObj.pColor = { $in: queryObj.pColor.split(',') };
    }
    if (queryObj.pBrand) {
      queryObj.pBrand = { $in: queryObj.pBrand.split(',') };
    }

    this.query = this.query.find(queryObj);
    return this;
  }
}
