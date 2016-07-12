function wordCloud(s) {
  words = s
  	.toLowerCase()
  	.split(" ")
  	.map( v => v.replace(/([,:.?!;]+)/g,""))

  words = words.map( 
  	v => 
	  	[v, words.reduce( 
	  		(total, x) => 
	  		x==v ? total+1: total, 0 )
	  	]
  	)

  return words
}

function wordCloud(s) {
	var alphabet = 'abcdefghijklmnopqrstuvwxyz';
	var words = s.split(" ")
	for (i in words) {
		var count = 0;
		
	}

	return words;
}

console.log(
	wordCloud('After beating the eggs, Dana read the next step:')
	)

// 'Add milk and eggs, then add flour and sugar.')
