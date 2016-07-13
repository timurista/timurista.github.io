var Glyphicon = React.createClass({
	render: function() {
		var c = "glyphicon glyphicon-"+this.props.name;
		return (
			<span className={c}></span>
			);
	}
});

var WorkoutShuffler = React.createClass({
	handleShuffle: function() {
		var c = confirm('Start a new workout?');

		if (c) {
			alert('Workout shuffled and restarted');			
		}
	},
	render: function() {
		return (
			<button 
			onClick={this.handleShuffle}
			className="btn btn-warning btn-xlarge">
				<Glyphicon name="plus-sign" /> 
			</button>
		)
	}

})


var LagTimer = React.createClass({
	stop: function() {
		clearInterval(this.state.timer);
		this.setState({
			timer: null,
		})
	},
	handleFinish: function() {
		this.stop();
		this.props.endPause()
	},
	getInitialState: function() {
		return {
			timer: null,
			time: this.props.time || 5,
			tick: 1,
		};
	},
	componentDidMount: function() {
		this.setState({
			timer: setInterval(this.tick, 1000)
		})
	},
	tick: function() {
		this.setState({
			time: this.state.time - this.state.tick,
		})
		if ( this.state.time <= 0 ) this.handleFinish();
	},
	componentWillUnmount: function() {
		this.stop();
	},
	render: function() {
		return (
			<div className="row timer">
				Get Ready...
				<h1 className="timer-text">
				{this.state.time}
				</h1>
			</div>
		)
	},
})

var Main = React.createClass({
	getDefaultProps: function() {
		var excercises = Excercises;

		console.log(excercises)
		var totalTime = excercises
			   .map( x => x.time )
			   .reduce( (x,y) => x+y, 0);
		
		return {
			excercises: excercises,
			totalTime: totalTime,
		}
	},
	endPause: function() {
		this.setState({paused:false})
		this.nowNextWorkout()
	},
	nowNextWorkout: function(number) {
		var n = number || 1
		var idx = this.state.currentId+n;

		console.log('IDX',idx)

		if (idx>this.props.excercises.length) {
			this.setState({ showWorkouts: false});
			alert('dont show!')
		}
		else {
			var next = this.props.excercises[idx+1] || null;
			var current = this.props.excercises[idx] || null;
			// console.log('my excercise',next)

			// TODO do small 5 second timeout

			this.setState(
			{
				currentId: this.state.currentId+1,
				current:this.props.excercises[idx],
				next:next,
			})
		}
	},

	changeTimeLeft: function(number) {

		if (this.state.timeLeft-number>0) 
			this.setState({timeLeft:this.state.timeLeft-number});
	},
	resetExcercises: function() {
		alert('workouts restarted!')

		this.setState({
			currentId: 0,
			current: this.props.excercises[0],
			next: this.props.excercises[1],
			showWorkouts: true,
			timeLeft: this.props.totalTime,
		});
	},

	getInitialState: function() {
		return {
			currentId: -1,
			current: this.props.excercises[0],
			next: this.props.excercises[1],
			showWorkouts: true,
			timeLeft: this.props.totalTime,
			paused: true,			
		}

	},
	onNextWorkout: function() {
		// TODO: go back in time
		this.setState({paused:true})
	},

	render: function() {
		var display;
		if (this.state.paused) {
			display = (
				<LagTimer time={5} endPause={this.endPause}/>
			);
		}
		else if (this.state.current)
			display = (
			<Workout 
				current={this.state.current} 
				next={this.state.next} 
				onNextWorkout={this.onNextWorkout}
				timeLeft={this.state.timeLeft}
				changeTimeLeft={this.changeTimeLeft} />
			);
		else {
			display = <ResetWorkouts reset={this.resetExcercises} />
		}

				
		//console.log('Time Left', this.state.timeLeft)
		
		//console.log(this.props.excercises[this.state.currentId])
		return (
		<div>

			<div className="row title">
				<h1 class="text-center">
				Ab <Glyphicon name="heart"/> Workout  
				</h1>
			</div>

			{ display }
		

		</div>
		);
	}
});

var ResetWorkouts = React.createClass({
	render: function() {
		return (
			<div>
			Congrats! You have completed the ab challenge!
			  <button className="btn btn-primary"
			     onClick={this.props.reset}>
			  Reset my Workout
			  </button>
			</div>
			);
	}

})


var Workout = React.createClass({

	getInitialState: function() {
		return { showImage: false }
	},
	toggleImage: function() {
		this.setState({showImage:!this.state.showImage});
	},
	render: function() {
		//console.log(this.props.current, this.props.next);
		return (
		<div>
			<div className="row">
				<button
				  className="btn btn-row btn-large" 
				  onClick={this.toggleImage}>

				  	<div className="col-sm-4">
						<TotalTimer time={this.props.timeLeft} />
					</div>

				  	<div className="col-sm-8 text-right">
					  	<h2>Show {this.props.current.name}</h2>
					</div>

				 </button>
			
			{ this.state.showImage ? 
				<ExcerciseDemo 
				  ex={this.props.current} />
				: ''
			}
			</div>

			<Timer 
			  time={this.props.current.time}
			  current = {this.props.current}
			  next = {this.props.next}
			  timeLeft = {this.props.timeLeft}
			  onNextWorkout={this.props.onNextWorkout}
			  changeTimeLeft={this.props.changeTimeLeft} />
			
		</div>
		);
	}
});


var ExcerciseDemo = React.createClass({
	render: function() {		
		
		var gif = this.props.ex.gif ? <img 
			  className="img-responsive"
			  src={this.props.ex.gif} 
			  alt={this.props.ex.name}/> : null;

		var img =  !gif && this.props.ex.img ? 
		<img className="img-responsive"
		src={this.props.ex.img} 
			  alt={this.props.ex.name}/> : null;
		return (

			<div>
			  {img}
			  {gif}
			</div>
		)
	}
});


var Timer = React.createClass({
	getInitialState: function() {
		return {
			time: parseInt(this.props.time) || 60,
			tick: 1,
			timer: null,
			finished: false,
		}
	},
	nextWorkout: function() {
		this.props.onNextWorkout();
		this.setState({
			finished: true});
		this.reset();
		this.start();
	},
	goToNext: function() {
		// set delta to current time difference
		// you will subtract this from overall time
		var delta = this.state.time;
		// update workout
		this.nextWorkout();
		// modify global time
		this.props.changeTimeLeft(delta);
	},
	start: function() {
		// console.log(this.state.timer)
		if (!this.state.timer)
		this.setState({
			timer:setInterval(this.update, 1000)});
	},
	stop: function() {
		// console.log('stopped');
		clearInterval(this.state.timer);
		this.setState({timer: null})
		
	},
	handleWarnings: function(now) {
		if (this.state.timer) {
			// TODO save auido clips before hand
			var snd = new Audio("a-tone.wav");
			// console.log(this.props.time)
			if (now == 30 && this.props.time>30) {
				this.refs.timerText.style.color = 'red';
				snd.play();
				// this.setState({message: '30 seconds left!'})
			}
			else if (now == 10) {
				this.refs.timerText.style.color = 'red';
				snd.play();
			}
			else {
				this.refs.timerText.style.color = '';
			}
			
		}
	},
	handleFinished: function() {
		// pull workout data from queue
		if (this.state.time <= 0) {
			this.stop();
			this.nextWorkout();
		}

	},
	update: function() {
		if (this.state.timer) {
		var now = this.state.time-this.state.tick;

		this.props.changeTimeLeft(this.state.tick)
		this.setState(
			{
				time: (now > 0) ? now : 0,
			});
		this.handleFinished();
		this.handleWarnings(this.state.time);
		}
	},
	componentDidMount: function(){
		this.start();
	},
	componentWillUnmount: function() {
		this.stop();
	},
	reset: function() {
		this.props.changeTimeLeft(this.state.time - this.props.time)
		this.setState({
			time:this.props.time,
		});		
	},
	setToZero: function() {
		this.setState({time:0});
	},
	render: function() {

		var resetBtn = 
		  <button 
		    className='btn btn-danger btn-xlarge'
		    onClick={this.reset} >
		    <Glyphicon name="repeat" />
		  </button>

		var currentDiv = <div className="col-xs-6 highlighted">{
		 	   (this.props.current) ? 
			 	"now: "+this.props.current.name 
			 	: "Nothing" }</div>

		var nextDiv = <div className="col-xs-6">{
		 	    (this.props.next) ? 
			 	"next: "+this.props.next.name
			 	: "Nothing" }</div>

		return (

		<div className="row">
			


			<div className="timer col-md-12 col-sm-12 col-lg-12"
			 ref="timer">

			    <div className="row">			 
					 { currentDiv }
					 { nextDiv }
				</div>
			
				<h1 className="timer-text"
				ref='timerText'>
				{this.state.time}</h1>
				
			
			<div className="">
				<button className="btn btn-play btn-xlarge"
				  onClick={ this.state.timer ? 
				  	this.stop : this.start}> 
				  

				  { this.state.timer ? 		  	
				  	<Glyphicon name="pause" />
				  	: 
				  	<Glyphicon name="play" />
				  }
				  </button>
			  </div>


			 
			 </div>


			 <button className="btn-row btn"
			 onClick={this.goToNext}>Next Excercise</button>

			 <div className="btn-group">
				 { resetBtn }
				 <WorkoutShuffler />
			 </div>
		</div>
		);
	}

});

var TotalTimer = React.createClass({
	getFormattedTime: function() {
		var t = this.props.time;
		// console.log( t / 60)
		var minutes = Math.floor(t / 60);
		var seconds = t % 60;

		seconds = seconds<10 ? "0"+seconds : seconds;
		minutes = minutes<10 ? "0"+minutes : minutes;

		return minutes+":"+seconds;
	},
	render: function() {
		var time = this.getFormattedTime()
		return (
			<div>
			<h2>Time Left: {time}</h2>
			</div>
		);
	}
});




ReactDOM.render( 
	<Main />,
	document.getElementById('content')
	)