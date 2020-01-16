const crypto = require("crypto");

module.exports = class Block {
  constructor(index, previousHash, timestamp, data) {
    this.index = index;
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.data = data;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    const data = this.index + this.previousHash + this.timestamp + JSON.stringify(this.data);
    return crypto
      .createHash("sha256")
      .update(data)
      .toString("hex");
  }
};
