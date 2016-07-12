/**

You are a renowned thief who has recently switched 
from stealing precious metals to stealing cakes 
because of the insane profit margins. 
You end up hitting the jackpot, breaking into 
the world's largest privately owned stock of 
cakes—the vault of the Queen of England.
While Queen Elizabeth has a limited number 
of types of cake, she has an unlimited supply 
of each type.

Each type of cake has a weight and a value, 
stored in an object with two properties:

weight: the weight of the cake in kilograms
value: the monetary value of the cake in British pounds
For example:

  // weighs 7 kilograms and has a value of 160 pounds
{weight: 7, value: 160}

// weighs 3 kilograms and has a value of 90 pounds
{weight: 3, value: 90}

You brought a duffel bag that can hold limited weight, 
and you want to make off with the most valuable haul 
possible.

Write a function maxDuffelBagValue() that 
takes an array of cake type objects and a 
weight capacity, and returns the 
maximum monetary value the duffel bag 
can hold.

For example:

  var cakeTypes = [
    {weight: 7, value: 160},
    {weight: 3, value: 90},
    {weight: 2, value: 15},
];

var capacity = 20;

maxDuffelBagValue(cakeTypes, capacity);
// returns 555 (6 of the middle type of cake 
and 1 of the last type of cake)

Weights and values may be any non-negative integer. 
Yes, it's weird to think about cakes that weigh nothing 
or duffel bags that can't hold anything.
But we're not just super mastermind criminals—we're 
also meticulous about keeping our algorithms flexible 
and comprehensive.
**/

function maxDuffelBagValue(cakeTypes, capacity) {
	var maxMoney = 0
	var highest = 0;

	for (var i =0; i<cakeTypes.length; i++ ) {
		for (var j = 0; j<cakeTypes.length; j++) {
			// watch out for 0 weight
			if (cakeTypes[i].weight === 0 || 
				cakeTypes[j].weight === 0) continue;

			var c1 = cakeTypes[i];
			var c2 = cakeTypes[j];

			var w1 = Math.floor(capacity / c1.weight)
			var w2 = Math.floor(capacity / c2.weight)

			// console.log(w1, w2)
			// console.log(highest)

			if (w1* c1.value > w2*c2.value) {
				capacity %= w1
				highest = w1* c1.value
				maxMoney += highest 
			} else if (w1* c1.value < w2*c2.value) {
				capacity %= w2
				highest = w2* c2.value
				maxMoney += highest 
			} else if ( capacity === 0) {
				return maxMoney;
			}



			
		}		
	}
	

	return maxMoney;
}

function maxDuffelBagValue(cakeTypes, capacity) {
	var maxMoney = 0
	var highest = 0;

	var c1 = cakeTypes[0];

	for (var i = 1; i<cakeTypes.length; i++) {
		// watch out for 0 weight
		if (cakeTypes[i].weight === 0 || 
			c1.weight === 0) continue;

		// current cake to compare
		var c2 = cakeTypes[i];

		// space taken up
		var w1 = Math.floor(capacity / c1.weight)
		var w2 = Math.floor(capacity / c2.weight)

		console.log(w1, c1.value, w2,  c2.value)

		if (w1* c1.value > w2*c2.value) {
			capacity %= w1
			highest = w1* c1.value
			maxMoney += highest 
		} else if (w1* c1.value < w2*c2.value) {
			capacity %= w2
			highest = w2* c2.value
			maxMoney += highest 
		} else if ( capacity === 0) {
			return maxMoney;
		}
		c1 = cakeTypes[i];
	}
	

	return maxMoney;
}

function maxDuffelBagValue(types, capacity) {
	var maxT = [0, 0];
	var max;

	for (i in types) {
		var o = types[i]
		var cap = Math.floor(capacity / o.weight)
		if ( cap>0 && cap*o.value > maxT[0]) 
			maxT = [cap*o.value, cap]  
	}

	var maxVal = maxT[0]
	capacity %= maxT[1]
	var maxLeft = 0

	for (i in types) {
		var o = types[i]
		var cap = Math.floor(capacity / o.weight)
		if ( cap>0 && cap*o.value > maxLeft) {
			maxLeft += cap*o.value;
			capacity %= cap;
			maxT.push(cap*o.value, cap)
		} else if (capacity==0) break;
	}
	console.log(maxT)
	return maxLeft + maxVal;
}



var cakeTypes = [
    {weight: 7, value: 160},
    {weight: 2, value: 40},
    {weight: 3, value: 90},
    {weight: 1, value: 15},
    
];

// var cakeTypes = [
//     {weight: 10, value: 160},
//     {weight: 6, value: 90},
//     {weight: 2, value: 15},
//     {weight: 1, value: 5},
//     {weight: 5, value: 15},
//     {weight: 2, value: 6},
//     {weight: 3, value: 15},
//     {weight: 4, value: 7},
// ];

var capacity = 20;

console.log(maxDuffelBagValue(cakeTypes, capacity));