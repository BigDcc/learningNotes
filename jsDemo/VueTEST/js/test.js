"use strict"

function Dog(name, age, gender) {
    this.name = name;
    this.age = age;
    this.gender = gender;
};

Dog.prototype.talk = function () { // 给原型添加属性和方法，在构造函数被使用之前
    return this.name + " wang!wang!";
};

var dog1 = new Dog("achui", 18, "man");
var dog2 = new Dog("bigchui", 18, "man");

dog2.talk = function () { // 重写原型
    return this.name + " wow!wow!";
};

console.log(dog1.talk()); // res -> achui wang!wang!
console.log(dog2.talk()); // res -> bigchui wow!wow!

Dog.prototype.run = function () { // 原型是动态的
    return this.name + " run!run!";
};

console.log(dog1.run()); // res -> achui run!run!
console.log(dog2.run()); // res -> bigchui run!run!
console.log(dog2.prototype);

console.log(Dog.prototype.hasOwnProperty("talk"));