
 /** COMBINATIONS.JSX **/ 
class Combinations extends React.Component {

  calcCombos() {
    const factorial = (num) => {
      let rval=1;
      for (let i = 2; i <= num; i++)
          rval = rval * i;
      return rval;
    }
    const r = this.r.value || 0;
    const n = this.n.value || 1;
    const n_fac = factorial(n);
    const nr_fac = factorial(n-r);
    const r_fac = factorial(r);
    const top =[]
    const bottom=[]
    const bottomr=[]
    for (let i=n; i>=1; i--) {
      top.push(i);
    }
    for (let j=n-r; j>=1; j--) {
      bottom.push(j);
    }
    for (let k=r; k>=1; k--) {
      bottomr.push(k);
    }
    let steps = []
    const result = n_fac / (r_fac * nr_fac);
    steps.push(`n!/r!(n-r)! = ${n}!/${r}!((${n} -${r})! = ${n-r}!))`);
    steps.push(`${n}! = (${top.join(' * ')}) = ${n_fac}`);
    steps.push(`${n-r}! = (${bottom.join(' * ') }) = ${nr_fac}`);
    steps.push(`${r}! = (${bottom.join(' * ') }) = ${r_fac}`);
    steps.push(`n!/r!(n-r)! = ${n_fac}/${r_fac}(${nr_fac})`);
    steps.push(`${n_fac} / (${r_fac} * ${nr_fac}) = ${result}`);
    steps.push(`Therefore n!/r!(n-r)! = ${result}`);

    this.setState({answer:result, steps:steps});
  }

  render() {
    return <MathExample 
      name="Combinations" 
      formula="C(n,r) = n! / r!(n-r)!"
      latexFormula = "C(n,r) = \frac {n!} {r!(n-r)!}"
      calcFunction={this.calcCombos} />
  }
}
 /** MATHEXAMPLE.JSX **/ 
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

 /** PERMUTATIONS.JSX **/ 
class Permutations extends React.Component {

  calcPerms() {
    const factorial = (num) => {
      let rval=1;
      for (let i = 2; i <= num; i++)
          rval = rval * i;
      return rval;
    }

    const r = this.r.value || 0;
    const n = this.n.value || 1;
    const n_fac = factorial(n);
    const nr_fac = factorial(n-r);
    const top =[]
    const bottom=[]
    for (let i=n; i>=1; i--) {
      top.push(i);
    }
    for (let j=n-r; j>=1; j--) {
      bottom.push(j);
    }
    let steps = [];
    const result = n_fac / nr_fac;
    steps.push(`n!/(n-r)! = ${n}! / ((${n} -${r})! = ${n-r}!))`);
    steps.push(`${n}! = (${top.join(' * ')}) = ${n_fac}`);
    steps.push(`${n-r}! = (${bottom.join(' * ') }) = ${nr_fac}`);
    steps.push(`n! = ${n_fac}`);
    steps.push(`(n-r)! = ${nr_fac}`);
    steps.push(`${n_fac} / ${nr_fac} = ${result}`);
    steps.push(`Therefore, n!/(n-r)! = ${result}`);

    this.setState({answer:result, steps:steps});
  }

  render() {
    return <MathExample 
      name="Permuations" 
      calcFunction={this.calcPerms}
      formula="P(n,r) = !n / (n-r)!"
      latexFormula='P(n,r) = \frac {n!} {(n-r)!}' />
  }
}
 /** ZMAIN.JSX **/ 
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
            <p> This program will calculate various mathematical formuals with steps for each one </p>

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
