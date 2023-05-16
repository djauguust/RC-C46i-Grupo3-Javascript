export class Product {
  constructor(code, name, category, description, tag, price, url) {
    this.code = code;
    this.description = description;
    this.category = category;
    this.url = url;
    this.price = price;
    this.name = name;
    this.tag = tag;
  }

  set setCode(code) {
    this.code = code;
  }

  set setDescription(description) {
    this.description = description;
  }

  set setCategory(category) {
    this.category = category;
  }

  set setURL(url) {
    this.url = url;
  }

  set setPrice(price) {
    this.price = price;
  }

  set setName(name) {
    this.name = name;
  }

  set setTag(tag) {
    this.tag = tag;
  }

  get getCode() {
    return this.code;
  }

  get getDescription() {
    return this.description;
  }

  get getCategory() {
    return this.category;
  }

  get getURL() {
    return this.url;
  }

  get getPrice() {
    return this.price;
  }

  get getName() {
    return this.name;
  }

  get getTag() {
    return this.tag;
  }
}