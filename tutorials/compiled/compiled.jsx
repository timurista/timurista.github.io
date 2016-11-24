
// class 
class JsBin extends React.Component {
  render() {
    const {props, state} = this;
    // return empty div is you should not show
    if (!props.show) return <div></div>;
    return (
      <div>
        <iframe 
          width="100%" 
          height="300" 
          src="//jsbin.com/cuneha/1/embed?html,js,output" 
          allowfullscreen="allowfullscreen" 
          frameborder="0">        
        </iframe>
        </div>
      );
  }
}

class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {props, state} = this;
    return (
      <div>
        <button onClick={() => this.setState({show: !this.state.show})}>Show {props.name}</button>
        <JsBin show={this.state.show} />
      </div>
    );
  }
}
// for holding text info 
class Text extends React.Component {
  render() {
    const {props, state} = this;
    // return empty div is you should not show
    return <div><h1>{props.title}</h1><p>{props.description}</p></div>;
  }
}

class Main extends React.Component {
  render() {
    const {props, state} = this;
    console.log(window);
    const ex = <Example />;
    return (
      <div>
        <h2>Tutorials</h2>      
        <div>
        <Text 
          title="Hello World" 
          description="Basic hello world with React and jsbin support" />
        <Example name="Hello World w/ React" />
        </div>
      </div>
    )
  }
}

(ReactDOM.render(
  <Main />,
  document.getElementById('main')
))();
