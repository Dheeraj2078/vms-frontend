// function createUser(username, score) {
//   this.username = username;
//   this.score = score;
// }

// console.log(createUser);

// createUser.prototype.increment = function () {
//   this.score++;
// };

// createUser.prototype.printMe = function () {
//   console.log(`price is ${this.score}`);
// };

// const chai = new createUser("chai", 25);
// chai.increment();
// chai.increment();
// chai.printMe();
// const coffee = new createUser("coffee", 250);
// coffee.increment();
// coffee.printMe();

let myName = "hitesh     ";

Object.prototype.trueLength = function () {
  console.log(`${this.trim().length}`);
};

// console.log(myName.prototype);
console.log(myName.trueLength());
