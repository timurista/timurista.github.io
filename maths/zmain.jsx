class Main extends React.Component {
  render() {
    const {props, state} = this;
    console.log(window);
    return (
      <div>
        <h2>Calculates permutations and combinations</h2>
        <p> The two programs will calculate permutations
        And lis the steps required to complete them </p>      
        <Permutations />        
        <Combinations />        
      </div>
    );
  }
}

ReactDOM.render(
  <Main />,
  document.getElementById('main')
);