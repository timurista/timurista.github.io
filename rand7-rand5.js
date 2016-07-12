function rand7() {
	return Math.floor(Math.random()*7) + 1;
}

function rand5() {
	var roll = rand7();
	return roll <= 5 ? roll : rand5();
}

console.log(rand5())