// make repeatify


String.prototype.repeatify = function(n) {
  return this.repeat(n);	
} 

String.prototype.repeatify2 = function(n) {
	s = '';
	while (n) {
		s += this;
		n--;
	}
	return s;
}

console.log('hello'.repeatify2(3));


// Hoisting
function test() {
   console.log(a);
   console.log(foo());
   
   var a = 1;
   function foo() {
      return 2;
   }
}

test();

// answer is undefined
// a is set to initial value of undefined
// because of hoisting, execution context stack
// foo is set to execution context when test is run

var fullname = 'John Doe';
var obj = {
   fullname: 'Colin Ihrig',
   prop: {
      fullname: 'Aurelio De Rosa',
      getFullname: function() {
         return this.fullname;
      }
   }
};

console.log(obj.prop.getFullname());

var test = obj.prop.getFullname;

console.log(test());
// Aurelio De Rosa and John Doe are printed


