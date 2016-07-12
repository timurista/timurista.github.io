// apply calls function with params
// apply(this, [params]) <- binds to current object
// call calls function with params as values
// bind <- makes new copy of function with default values

function bindMe(fn, name) {
	return fn(name)
}

logme = bindMe.bind(this, console.log)
logme("Tim")

// console.log([1,2,3,4].find(3))

// classical vs prototypal inheritance

//way of sharing methods and objects