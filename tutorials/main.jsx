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