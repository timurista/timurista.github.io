class MathExample extends React.Component {
	 constructor(props) {
    super(props);
    this.state = { steps:[], answer:null, show:true };
  }
  toggleVisible() {
  	this.setState({show: !this.state.show});
  }
  render() {
  	const {props, state} = this;  
    const renderFormula = props.latexFormula || props.formula;
    const steps = state.steps.map( (step) => (
    	<li><math xmlns="http://www.w3.org/1998/Math/MathML">{step}</math></li>
    	))
    const solution = (
    	<div>
    	<h3>Answer: {state.answer}</h3>
        <ul>
        {steps}
        </ul>
      </div>
      );

    const renderedSolution = (state.show && state.answer) ? solution : <div></div>;  

    return (<div>
        <h3>{props.name}</h3>
        <div className='lead'>
	        <em>{ `$$ ${renderFormula} $$`}</em>
        </div>
        <div>
	        <label>n (objects)</label>
	        <input type='number' defaultValue={1} ref={(n) => this.n = n} />
	      </div>
        <div>
	        <label>r (sample)</label>
	        <input type='number' defaultValue={1} ref={(r) => this.r = r} />
        </div>
        <button 
          key='calculate' 
          onClick={() => {this.setState({show: true}); props.calcFunction.apply(this)}}>
          Calculate
        </button>
        <button key='showHide' onClick={this.toggleVisible.bind(this)}>
        Show/Hide
        </button>
        {renderedSolution}
      </div>)
  }
}
