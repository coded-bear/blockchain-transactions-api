const crypto = require("crypto");

module.exports = class Block {
  constructor(index, previousHash, timestamp, data) {
    this.index = index;
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.data = data;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() {
    const data = this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce;
    return crypto
      .createHash("sha256")
      .update(data)
      .toString("hex");
  }

  mineBlock(difficulty) {
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
  }
};
