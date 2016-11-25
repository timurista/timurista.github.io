
 /** MAIN.JSX **/ 
class Main extends React.Component {
  render() {
    const {props, state} = this;
    console.log(window);
    const ex = <Example />;
    return (
      <div>
        <h2>Pay It Forward</h2>      
        <div>
          <p>TODO: this app </p>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <Main />,
  document.getElementById('main')
)
