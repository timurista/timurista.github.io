var all = workouts.excercises

function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}

var makeWorkouts = {};

makeWorkouts.make = function () {
	var workout = []

	shuffle(all);

	// 3 hard
	workout.concat(all
		.filter( x => x.difficulty<=5)
		.splice(0,5))

	// break
	workout.concat({name:'break', time:30})

	workout.concat(all
		.filter( x => difficulty<=3)
		.splice(0,5))
	return workout;
}