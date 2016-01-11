function sum() {
  var totalSum = 0;
  var args = Array.prototype.slice.call(arguments);
  args.forEach(function (i) {
    totalSum += i;
  });
  return totalSum;
}
// Test
// console.log(sum(1,2,3));
// console.log(sum());


Function.prototype.myBind = function (toBind) {
  var theFunction = this;
  var oldArgs = Array.prototype.slice.call(arguments);
  oldArgs = oldArgs.slice(1);
  return function () {
    console.log(oldArgs);
    var newArgs = Array.prototype.slice.call(arguments);
    console.log(newArgs);
    var args = oldArgs.concat(newArgs);
    console.log(args);
    theFunction.apply(toBind, args);
  };
};

// Test
//
// var Dog = function () { this.name = "fido"; };
//
// var dog = new Dog();
// var say = function (times, whatToSay) {
//   for(var i = 0; i < times; i++) {
//     console.log(this.name + " says " + whatToSay);
//   }
// };
//
// say.myBind(dog)(3, "hi");
// say.myBind(dog, 3)("hi");
// say.myBind(dog, 3, "hi")();



function curriedSum(numArgs) {
  var numbers = [];
  return function _curriedSum(num) {
    var numArray = numbers.push(num);
    if (numbers.length === numArgs) {
      return numbers.reduce(function(a, b) {
        return a + b;
      }, 0);
    } else {
      return _curriedSum;
    }
  };
}

// var sum = curriedSum(3);
// console.log(sum(1)(2)(3));

Function.prototype.curry = function(numArgs) {
  var args = [];
  var func = this;
  return function _curry(arg) {
    args.push(arg);
    if (args.length === numArgs) {
      return func.apply(this, args);
    } else {
      return _curry;
    }
  };
}

// var newSum = sum.curry(3);
// console.log(newSum(1)(2)(3));
