// TODO fix require is not defined

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			urls: [
				{url: 'ab_workout/ab_workout.html', name:'Ultimate Ab Workout App'},
        {url: 'library/', name:'Open Library Project'},
				{url: 'tutorials/', name:'React and JS Tutorials'},
				// {url: 'payforward/', name:'Pay it Forward App'},
				// {url: 'maths/', name:'Math Functions'},

			]
		}
	}

  render() {
  	const urls = this.state.urls.map( (obj) => {
  		const { url, name } = obj;
  		return <li key={name}><a href={url}>{name}</a></li>;
  	})
    return (
      <div className='commentBox'>
        <ul>
        	{urls}
        </ul>
      </div>
    );
  }
}

// var App = React.createClass();
ReactDOM.render(
  <App />,
  document.getElementById('app')
);