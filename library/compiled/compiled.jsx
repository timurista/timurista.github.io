
 /** LIBRARY.JSX **/ 
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

  specialClick() {
    let text="";
    $.ajax({
      type: "POST",
      url: "./pythonEx.py",
      data: { param: text}
    }).done(function( o ) {
       // do something
       console.log(o);
    });
  }
  render() {
    const {props, state} = this;
    return (
      <div>
        <button onClick={this.getBooks.bind(this)}>Get books</button>
        <h2>Results</h2>
        <button onClick={this.specialClick}>special click</button>    
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
