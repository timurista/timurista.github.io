class Main extends React.Component {
  render() {
    const {props, state} = this;

    const renderedMathEqs = [ <Permutations />, 
    <Combinations /> ];

    // radio button switches which to render

    return (
      <div>
        <h2>Calculates permutations and combinations</h2>
        <p> The two programs will calculate permutations
        And lis the steps required to complete them </p>
        <div className="row">
        {renderedMathEqs.map( (eq) => <div className="col-sm-6">{eq}</div>)}    
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Main />,
  document.getElementById('main')
);