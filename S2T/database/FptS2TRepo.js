const mongoose = require('mongoose');
const BaseRepo = require("./BaseRepo");
const fptS2TSchema = require("./fptS2TSchema");

class FptS2TRepo extends BaseRepo {
  constructor() {
    super();
    this.collection = mongoose.model("FptS2T", fptS2TSchema);
  }
}

module.exports = new FptS2TRepo();
