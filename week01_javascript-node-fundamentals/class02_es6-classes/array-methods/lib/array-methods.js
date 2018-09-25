module.exports = class List {
  constructor(items) {
    this.items = items;
  }

  some(callback) {
    for (let index = 0; index < this.items.length; index++) {
      const item = this.items[index];
      if (callback(item)) {
        return true;
      }
    }
    return false;
  }
}
