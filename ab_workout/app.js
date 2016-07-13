var Glyphicon = React.createClass({
	render: function() {
		var c = "glyphicon glyphicon-"+this.props.name;
		return (
			<span className={c}></span>
			);
	}
});

var Main = React.createClass({
	getDefaultProps: function() {
		var excercises = Excercises.splice(0,5);
		var timeLeft = excercises
			   .map( x => x.time )
			   .reduce( (x,y) => x+y, 0);
		return {
			excercises: excercises,
			timeLeft: timeLeft,
		}
	},

	resetExcercises: function() {
		alert('workouts reset')
		this.setState({
			currentId: 0,
			current: this.props.excercises[0],
			next: this.props.excercises[1],
			showWorkouts: true,
		});
	},

	getInitialState: function() {
		return {
			currentId: 0,
			current: this.props.excercises[0],
			next: this.props.excercises[1],
			showWorkouts: true,			
		}

	},


	onNextWorkout: function() {
		// console.log
		alert("next workout!");
		var idx = this.state.currentId+1;

		console.log('IDX',idx)

		if (idx>this.props.excercises.length) {
			this.setState({ showWorkouts: false});
			alert('dont show!')
		}
		else {
			var next = this.props.excercises[idx+1] || null;
			var current = this.props.excercises[idx] || null;
			// console.log('my excercise',next)
			this.setState(
			{
				currentId: this.state.currentId+1,
				current:this.props.excercises[idx],
				next:next,
			})
		}


		
	},
	render: function() {
		console.log('Time Left', this.props.timeLeft)
		
		console.log(this.props.excercises[this.state.currentId])
		return (
		<div>

			<div className="jumbotron">
				<h1>
				Ab Workout <Glyphicon name="heart"/> 
				</h1>
			</div>
		{ this.state.showWorkouts 
			&& this.state.current ?
		<Workout 
			current={this.state.current} 
			next={this.state.next} 
			onNextWorkout={this.onNextWorkout}
			timeLeft={this.props.timeLeft}/>
		
		: <ResetWorkouts reset={this.resetExcercises} /> }

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
		console.log(this.props.current, this.props.next);
		return (
		<div>
			<div className="row">
				<button
				  className="btn-row btn btn-primary" 
				  onClick={this.toggleImage}>
				  Show Picture for {this.props.current.name}
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
			  onNextWorkout={this.props.onNextWorkout}/>
			
			<p>SHUFFLE</p>
			<p>EQUIPMENT</p>
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
			timeLeft: parseInt(this.props.timeLeft),
			timer: null,
			finished: false,
		}
	},
	nextWorkout: function() {
		this.props.onNextWorkout();
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
		if (!this.state.finished) {
			if (now <= 30) {
				this.refs.timerText.style.color='darkred';
			}
			else if (now <= 10) {
				this.refs.timerText.style.color='red';
			} else {
				console.log(this.state.finished)
				this.refs.timerText.style.color='';
			}
		}

	},
	handleFinished: function() {
		// pull workout data from queue
		if (this.state.time <= 0) {
			this.stop();
			this.nextWorkout();
			this.reset();
			this.start();
			this.setState({finished: true});
		}

	},
	update: function() { 
		// hacky way to solve need t finish
		if (this.state.timer) {
			var now = this.state.time-this.state.tick;
			var timeLeft = this.state.timeLeft-this.state.tick;
			this.setState(
				{
					time: (now > 0) ? now : 0,
					timeLeft: (timeLeft > 0) ? timeLeft: 0,
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
		this.setState({
			time:this.props.time,
			timeLeft:this.props.timeLeft
		})
	},
	setToZero: function() {
		this.setState({time:0});
	},
	render: function() {

		var resetBtn = 
		  (this.state.timer === null) ? 
		  <button 
		    className='btn btn-danger btn-xlarge'
		    onClick={this.reset} >
		    Reset
		  </button>: null;

		 var currentDiv = <div className="col-xs-6 strong">{
		 	   (this.props.current) ? 
			 	"now: "+this.props.current.name 
			 	: "Nothing" }</div>

		 var nextDiv = <div className="col-xs-6 strong">{
		 	    (this.props.next) ? 
			 	"next: "+this.props.next.name
			 	: "Nothing" }</div>

		return (

		<div className="row">
			<h2>Time Left: {this.state.timeLeft}</h2>
			<div className="timer col-md-12 col-sm-12 col-lg-12"
			 ref="timer">
			    
			    <div className="row">			 
					 { currentDiv }
					 { nextDiv }
				</div>
			
				<h1 className="timer-text"
				ref='timerText'>
				{this.state.time}</h1>
				
			
			<div className="btn-group" role="group">
				<button className="btn btn-primary btn-xlarge"
				  onClick={ this.state.timer ? 
				  	this.stop : this.start}> 
				  

				  { this.state.timer ? 		  	
				  	<Glyphicon name="pause" />
				  	: 
				  	<Glyphicon name="play" />
				  }
				  </button>
			  </div>

			 { resetBtn }

			 
			 </div>


			 <button className="btn-row btn btn-primary"
			 onClick={this.setToZero}>End the current Time</button>

		</div>
		);
	}

});




ReactDOM.render( 
	<Main />,
	document.getElementById('content')
	)