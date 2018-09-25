class Hi {
  constructor(sentence) {
    this.sentence = sentence;
  }

  say() {
    console.log(this.sentence);
  }
}

const hi = new Hi('Hi THere');
hi.say();

let newArr =  [];
let arr = [1, 2, 3]
arr.forEach((item, index) => {
  newArr.push(item)
})
