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
		return {
			excercises:[
			{
				name:'ab crunch',
				img: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQ2pQ-9NDT97iPdhMVxk9d_HdjVhlgqGdJM3hzTR7A9NN0CrG1JkWe013IX',
				gif:'http://i.giphy.com/45wEmqKPFvz7a.gif',
				time: 60,

			},
			{
				name:'plank',
				img: 'http://www.sterling-wellness.com/wp-content/uploads/2016/02/power-of-the-plank.jpg',
				gif: 'http://i.giphy.com/9jgZ23cJ8WKA0.gif',
				time: 30,
			},
			{
				name:'break',
				time: 30,
			}
			]
		}
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

		if (idx>=this.props.excercises.length) {
			this.setState({ showWorkouts: false});
			alert('dont show!')
		}

		else {
			this.setState(
			{
				currentId: this.state.currentId+1,
				current:this.props.excercises[idx],
				next:this.props.excercises[idx+1],
			})
		}


		
	},
	render: function() {
		
		console.log(this.props.excercises[this.state.currentId])
		return (
		<div>

			<div className="jumbotron">
				<h1>
				Ab Workout <Glyphicon name="heart"/> 
				</h1>
			</div>
		{ this.state.showWorkouts ?
		<Workout 
			current={this.state.current} 
			next={this.state.next} 
			onNextWorkout={this.onNextWorkout}/>
		
		: '' }

		</div>
		);
	}
});


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
			<p>{this.props.current.name}
				<button 
				  onClick={this.toggleImage}>
				  Show Picture</button>
			</p>
			{ this.state.showImage ? 
				<ExcerciseDemo 
				  ex={this.props.current} />
				: ''
			}

			<Timer 
			  time={this.props.current.time}
			  current = {this.props.current.name}
			  next = {this.props.next.name}
			  onNextWorkout={this.props.onNextWorkout}/>
			
			<p> {this.props.next ? this.props.next.name: 'None'} </p>
			<p>SHUFFLE</p>
			<p>EQUIPMENT</p>
		</div>
		);
	}
});


var ExcerciseDemo = React.createClass({
	render: function() {
		console.log(this.props.ex)
		
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
			this.setState({time: (now > 0) ? now : 0})
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
		this.setState({time:this.props.time})
	},
	setToZero: function() {
		this.setState({time:0});
	},
	render: function() {

		var resetBtn = 
		  (this.state.timer === null) ? 
		  <button 
		    className='btn btn-secondary btn-lg'
		    onClick={this.reset} >
		    Reset
		  </button>: '';

		return (

		<div className="row">
			<div className="timer col-md-8 col-md-offset-2"
			 ref="timer">
				 <h4>now: {this.props.current} </h4>
			
				<h1 className="timer-text"
				ref='timerText'>
				{this.state.time}</h1>
				
			
			
			<button className="btn btn-primary btn-lg"
			  onClick={ this.state.timer ? 
			  	this.stop : this.start}> 
			  

			  { this.state.timer ? 		  	
			  	<Glyphicon name="pause" />
			  	: 
			  	<Glyphicon name="play" />
			  }
			  </button>

			 { resetBtn }
			 <h4>next: {this.props.next}</h4>
			 </div>

			 <button onClick={this.setToZero}>End the current Time</button>

		</div>
		);
	}

});




ReactDOM.render( 
	<Main />,
	document.getElementById('content')
	)