

const testString = "/gif: blablabha";

var regexp = /\/gif:\s\S*/;
// var regexp = /\S*\.(jpg|png|gif)/ ;
console.log(testString.match(regexp));

// console.log(testString);

