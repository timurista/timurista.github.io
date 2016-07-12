// Given an arrayOfInts, 
// find the highestProduct 
// you can get from three 
// of the integers.
// The input arrayOfInts 
// will always have at least 
// three integers.

function arrayOfInts(arr) {
	if (arr.length === 3) 
		return arr.reduce( (p,v) => p*v )

	// keep track of highest and lowest of 2
	var highestProductOf3 = arr[0] * arr[1] * arr[2]
	var highestProductOf2 = arr[0] * arr[1]
	var highest = Math.max(arr[0], arr[1])
	var lowestProductOf2 = arr[0] * arr[1]
	var lowest = Math.max(arr[0], arr[1])

	// keep track or highest so far
	for (var i = 0; i < arr.length; i++) {

		c = arr[i]

		highestProductOf3 = Math.max(
			highestProductOf3,
			c*highestProductOf2,
			c*lowestProductOf2 
		);

		// check new lowest of 2
		lowestProductOf2 = Math.min(
            lowestProductOf2,
            c * highest,
            c * lowest
        );

        // check new highest of 2
		highestProductOf2 = Math.max(
            highestProductOf2,
            c * highest,
            c * lowest
        );

        // new higher
        highest = Math.max(highest, c);

        // new lower
        lowest = Math.min(lowest, c);

	};

	return highestProductOf3;
		
}



// push random
r = []
for (var i=0;i<100000;i++) {
	max = 10
	min = -12
	r.push(
		Math.floor(Math.random() * (max - min + 1) + min)
		)
}

console.log(arrayOfInts(r))