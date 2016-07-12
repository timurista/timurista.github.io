function getProductsOfAllIntsExceptAtIndex(arr) {

	var sum = arr.reduce( (p,f) => p*f )	
	return arr.map( (v) => sum / v || 0)
} 

v = getProductsOfAllIntsExceptAtIndex([1, 7, 3, 4, -2])

console.log(v)