'use strict';

// CONSTRUCTOR FUNCTIONS
// * Difference between a constructor function and a REGULAR function is that we CALL a  CONSTRUCTOR FUNCTION using the  new  OPERATOR.
// ** Constructor functions should start with a CAPITAL letter
// *** Only function DECLARATONS or function EXPRESSIONS when we have a CONSTRUCTOR Function. We need ' this ' keyword and that doesn't work if you create an arrow function

const Person = function (firstName, birthYear) {
  //Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Never DO THIS! Never create a method inside a constructor function!
  // this.calcAge = function () {
  //   console.log(2023 - this.birthYear);
  // };
};

const cosmin = new Person('Cosmin', 1995);
console.log(cosmin);
Person.hey = function () {
  console.log('Hey there');
};
Person.hey();

// After calling a function using new operator
// 1. new {} -  New empty object is created
// 2.function is called, this = {}, this keyword is this new empty object
// 3.  The newly created object - {} is  linked to prototype
// 4.function automatically returns the object from the beginning

const fratele = new Person('Fratele', 2004);
const mother = new Person('Felicia', 1972);
console.log(fratele, mother);

console.log(cosmin instanceof Person);

// Prototypes

Person.prototype.calcAge = function () {
  console.log(2023 - this.birthYear);
};

cosmin.calcAge();
fratele.calcAge();
mother.calcAge();
console.log(Person.prototype);
// console.log(cosmin.__proto__);
console.log(cosmin.__proto__ === Person.prototype);

console.log(Person.prototype.isPrototypeOf(cosmin));

Person.prototype.species = 'Homo Sapiens';
console.log(cosmin.species, fratele.species);

//Object.prototype(top of the prototype chain)
console.log(cosmin.__proto__.__proto__);
console.log(cosmin.__proto__.__proto__.__proto__);

console.dir(Person.prototype.constructor);

const arr = [3, 5, 6, 3, 3, 3];
console.log(arr.__proto__ === Array.prototype);

Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique());

const h1 = document.querySelector('h1');
//Challenge 1
const Car = function (make, speed) {
  this.speed = speed;
  this.make = make;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} goes with ${this.speed} km/h`);
};
Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} slows down with ${this.speed} km/h`);
};

const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);
const dacia = new Car('Dacia', 50);
const hyundai = new Car('Hyundai', 60);
// bmw.accelerate();
// mercedes.accelerate();
// bmw.brake();
// mercedes.brake();
// dacia.accelerate();
// dacia.accelerate();
// hyundai.accelerate();
// dacia.brake();
// hyundai.brake();
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// ES6 CLASSES

//class expression
// const PersonCl = class {};
//class declaration
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  //Methods will be added to .prototype property
  //Inside of the class Object but outside of the constructor function!

  //INSTANCE METHODS !
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}`);
  }
  get age() {
    return 2037 - this.birthYear;
  }

  //Set a property that already exists
  set fullName(name) {
    console.log(name);
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  //Static Method
  static hey() {
    console.log('Hey there');
    console.log(this);
  }
}

const darius = new PersonCl('Darius Sas', 1995);
console.log(darius);
darius.calcAge();
console.log(darius.age);

PersonCl.prototype.greet = function () {
  console.log(`Hey ${this.fullName}`);
};
darius.greet();

// 1. Classes are NOT HOISTED
// 2. Classes are first-class citizens, meaning: That we can pass them into functions and also return them from functions
// 3. Classes are executed in strict mode
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SETTERS AND GETTERS

const walter = new PersonCl('Walter White', 1956);

const account = {
  owner: 'Cosmin',
  movements: [200, 500, 120, 300],

  get latestMovement() {
    return this.movements.slice(-1).pop();
  },
  set latestMovement(mov) {
    this.movements.push(mov);
  },
};
console.log(account.latestMovement);
account.latestMovement = 50;
console.log(account.movements);

//Static method call
Person.hey = function () {
  console.log('Hey there');
};

Person.hey();
PersonCl.hey();
////////////////////////////////////////////////////////////////////////////////////////////////////

// Object.create() function

const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  initName(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const claudel = Object.create(PersonProto);
console.log(claudel);
claudel.name = 'Claudel';
claudel.birthYear = 2004;
claudel.calcAge();

const sarah = Object.create(PersonProto);
sarah.initName('Sarah', 1999);
sarah.calcAge();
//Challenge 2

class CarCl {
  constructor(model, speed) {
    this.model = model;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.model} is going at ${this.speed} km/h`);
  }
  brake() {
    this.speed -= 5;
    console.log(`${this.model} is going at ${this.speed} km/h`);
  }
  get speedUS() {
    return `${this.model} is going with ${this.speed / 1.6} mi/h`;
  }
  // On SET method we always need to take exactly one ARGUMENT!
  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}
const ford = new CarCl('Ford', 120);
ford.accelerate();
ford.accelerate();
ford.brake();
console.log(ford.speedUS);
ford.speedUS = 50;
console.log(ford);

console.log(ford);

// INHERITANCE BETWEEN "CLASSES" : CONSTRUCTOR FUNCTIONS

const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);
  this.course = course;
};

// Linking prototypes
Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};
// HOW we can call a function and in the same time set the THIS keyword inside that function?
// by using  'call' method like above

const strula = new Student('Strula', 2000, 'IT');
console.log(strula);
strula.introduce();
strula.calcAge();

console.log(strula.__proto__);
console.log(strula.__proto__.__proto__);

Student.prototype.constructor = Student;

// CHALLENGE 3

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

//Link the prototypes
EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};
EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge -= 1;
  console.log(
    `${this.make} going at ${this.speed} km/h , with a charge of ${this.charge} % `
  );
};
const tesla = new EV('Tesla', 120, 90);
tesla.accelerate();
tesla.accelerate();
tesla.accelerate();
tesla.accelerate();
tesla.brake();
tesla.chargeBattery(90);

console.log(EV.prototype);

// INHERITANCE BETWEEN CLASSES /// ES6 Classes
class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    // Always needs to happen first!
    //Othwerwise we wouldn't be able to access the 'this' keyword.
    super(fullName, birthYear);
    this.course = course;
  }
  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }
  calcAge() {
    console.log(
      `I'm ${
        2023 - this.birthYear
      } years old, but as a student I feel more like ${
        2023 - this.birthYear + 10
      } `
    );
  }
}

const martha = new StudentCl('Martha Jones', 1995, 'Computer Science');
martha.introduce();
martha.calcAge();
martha.greet();

// ** When we implement the inheritance between the ES6 classes  we link the prototype by using the 'extends' keyword , we still need a constructor function with same arguments like in the parent class but with some additional ones as well
// *** When using the ES6 classes we don't need to call the function by using the call method like in the constructor functions.
// *** What we do instead in ES6 classes we call the 'super' function. super is the constructor function of the parent class

// INHERITANCE BETWEEN CLASSES USING
// Object.create()

//Creating a prototype using Object.create method
// const PersonProto = {
//   calcAge() {
//     console.log(2037 - this.birthYear);
//   },

//   initName(firstName, birthYear) {
//     this.firstName = firstName;
//     this.birthYear = birthYear;
//   },
// };

// const claudel = Object.create(PersonProto);
// console.log(claudel);

const StudentProto = Object.create(PersonProto);
StudentProto.initName = function (firstName, birthYear, course) {
  PersonProto.initName.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};
const jay = Object.create(StudentProto);
jay.initName('Jay', 2002, 'Computer Science');
jay.introduce();
jay.calcAge();

// Another Class Example

class Account {
  // this is how we define
  // 1) Public fields(instances)
  locale = navigator.language;

  // 2)  Private fields(instances)
  // '#' symbol makes a field or an instance PRIVATE or unaccesible
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;
    //Protected property
    this.#movements = [];
    this.locale = navigator.language;

    console.log(`Thanks for opening an account, ${owner}`);
  }

  // 3) Public methods

  //PUBLIC INTERFACE of our Objects also called API

  getMovements() {
    return this.#movements;
  }
  deposit(val) {
    this.#movements.push(val);
    return this;
  }
  withdrawal(val) {
    this.deposit(-val);
    return this;
  }

  requestLoan(val) {
    if (this._approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan approved`);
      return this;
    }
  }

  // 4) Private methods
  _approveLoan(val) {
    return true;
  }
}
const acc1 = new Account('Cosmin', '??', 1111);
console.log(acc1);
acc1.deposit(250);
acc1.withdrawal(140);
acc1.requestLoan(100);

console.log(acc1);

// console.log(acc1.#pin);
// console.log(acc1.#approveLoan(100));

//Chaining methods
acc1
  .deposit(300)
  .deposit(500)
  .withdrawal(35)
  .requestLoan(2500)
  .withdrawal(4000);
console.log(acc1.getMovements());

//Challenge 4

class EVCl extends CarCl {
  #charge;
  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }
  accelerate() {
    this.speed += 10;
    this.#charge--;
    console.log(
      `${this.model} is going at ${this.speed} km/h with a battery charge of ${
        this.#charge
      } %`
    );
    return this;
  }
  brake() {
    this.speed -= 5;
    console.log(`${this.model} is going at ${this.speed} km/h with a battery`);
    return this;
  }
}
const rivian = new EVCl('Rivian', 120, 23);

rivian.accelerate().accelerate().brake().accelerate().accelerate();

// class StudentCl extends PersonCl {
//   constructor(fullName, birthYear, course) {
//     // Always needs to happen first!
//     //Othwerwise we wouldn't be able to access the 'this' keyword.
//     super(fullName, birthYear);
//     this.course = course;
//   }
