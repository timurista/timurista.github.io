class Main extends React.Component {
  constructor(props) {
    super(props);
    this.renderedMathEqs = [
      {name:'permuations', el:<Permutations />}, 
      {name:'combinations', el:<Combinations />} 
    ];
    this.state = {
      mathEquation: this.renderedMathEqs[0].el,
    }
    this.handleMathEqChange = this.handleMathEqChange.bind(this);
  }
  handleMathEqChange(event) {
    var index = this.renderedMathEqs.map(function(o) { return o.name; }).indexOf(event.target.value);

    this.setState({mathEquation: this.renderedMathEqs[index].el });
  }

  render() {
    const {props, state} = this;
    // radio button switches which to render
    return (
      <div className='container'>
        <div className='row' >        
          <div className='col-md-8 col-md-offset-2 centered'>
            <h2 className='jumbotron'>Math Formulas</h2>
            <p> The two programs will calculate various mathematical formuals with steps for each one </p>

              <select className='form-control' name='mathEq' onChange={this.handleMathEqChange}>
                <option value='' disabled selected>Select the math equation/formula...</option>
                {this.renderedMathEqs.map( x => <option>{x.name}</option>)}
              </select>
            <div className='row'>
              <div className='col-sm-8 col-sm-offset-2'>
                {state.mathEquation}
              </div>
            </div>
          </div>
        </div>
        </div>
    );
  }
}

ReactDOM.render(
  <Main />,
  document.getElementById('main')
);