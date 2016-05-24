function MyConstructor() {}
var myobject = new MyConstructor();

console.log('1' + (myobject.constructor == MyConstructor));

function MyConstructor() {}
MyConstructor.prototype = {};
var myobject = new MyConstructor();

console.log('2' + (myobject.constructor == MyConstructor));

// Delegated to the object prototype
console.log('3' + (myobject.constructor == Object));

// Instanceof knows this
console.log('4' + (myobject instanceof MyConstructor));
console.log('5' + (myobject instanceof Object));