class Library extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: [],
    }
  }
  getBooks() {
    const url = 'http://openlibrary.org/authors/OL1A.json';
    $.ajax({
      url:url,
    }).then( (data) => {
      console.log(data);
      this.setState({result: data});
    });
  }
  render() {
    const {props, state} = this;
    return (
      <div>
        <button onClick={this.getBooks.bind(this)}>Get books</button>
        <h2>Results</h2>      
        <div>
          {state.result.name}
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <Library />,
  document.getElementById('library')
);