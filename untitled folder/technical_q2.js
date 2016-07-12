// Question: How could you find all prime factors of a number?

function primeFactors(n){
  var factors = [], 
      divisor = 2;
  
  while(n>2){
    if(n % divisor == 0){
       factors.push(divisor); 
       n= n/ divisor;
    }
    else{
      divisor++;
    }     
  }
  return factors;
}

var factors = (n) => {
	var div = 2; var f = [];

	while(n>2) {
		if (n % div === 0) {
			f.push(div)
			// console.log(n)
			n = n / div
		} else {
			div++
		}

	}
	return f;
}

var myfactors = factors(69)
// could do equality check, or just use
// string equivalents
console.assert( myfactors+"" === [ 3, 23 ]+"")


