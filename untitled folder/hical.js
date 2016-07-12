//Your company built 
//an in-house calendar 
//tool called HiCal. 
//You want to add a feature 
//to see the times in a day 
//when everyone is available.

// number of blocks past 9

function condenseMeetingTimes(arr) {

	arr = arr.sort( (x,y) => x.startTime - y.startTime)

	console.log(arr)

	var times = []
	var start = arr[0].startTime
	var end = arr[0].endTime

    arr.forEach( function(obj) {
		
		// check end time
		if (obj.startTime >= start 
			&& obj.startTime<= end) {
			if (obj.endTime > end) {
				end = obj.endTime
			}

		}
		else if (obj.endTime <= end 
			&& obj.endTime >= start) {
			if (obj.startTime < start) {
				start = obj.startTime
			}
		} else {
			console.log(start, end, obj)
			times.push({start:(start), end:(end)})
			start = obj.startTime
			end = obj.endTime
		}


    })
    times.push({start:(start), end:(end)})
    // console.log(arr)

	return times;
}
var meetings = [
    {startTime: 0,  endTime: 1},
    {startTime: 3,  endTime: 5},
    {startTime: 4,  endTime: 8},
    {startTime: 10, endTime: 12},
    {startTime: 9,  endTime: 10},
]
console.log(
	condenseMeetingTimes(  
		meetings))

console.log(
`[
    {startTime: 0, endTime: 1},
    {startTime: 3, endTime: 8},
    {startTime: 9, endTime: 12},
]`
	)

console.log('condensed',condenseMeetingTimes(
	  [
    {startTime: 1, endTime: 10},
    {startTime: 2, endTime: 6},
    {startTime: 3, endTime: 5},
    {startTime: 7, endTime: 9},
]))