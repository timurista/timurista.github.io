
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
    const result = n_fac / (r_fac*nr_fac);
    steps.push(`n! = ${n}!, r! =${r}! and (n-r)! = (${n} -${r})! = ${n-r}!`);
    steps.push(`${n}! = (${top.join(' * ')}) = ${n_fac}`);
    steps.push(`${n-r}! = (${bottom.join(' * ') }) = ${nr_fac}`);
    steps.push(`${r}! = (${bottom.join(' * ') }) = ${r_fac}`);
    steps.push(`n! = ${n_fac}, r! = ${r_fac} and (n-r)! = ${nr_fac}`);
    steps.push(`${n_fac} / (${r_fac} * ${nr_fac}) = ${result}`);
    steps.push(`So n!/r!(n-r)! is equal to ${result}`);
    console.log(steps)
    const renderedSteps = steps.map( (step,i) => 
      <li key={i}>{step}</li>
      )
    this.setState({answer:<div>
      <h3>The Answer for C({n}, {r}) = {result}</h3>
      <ol>
        {renderedSteps}
      </ol>
      </div>
    })
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
    this.state = { answer: <div></div>, show:true };
  }
  render() {
  	const {props, state} = this;
    const answer = (state.show) ? state.answer : <div></div>;    
    const renderFormula = props.latexFormula || props.formula;

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
          onClick={props.calcFunction.bind(this)}>
          Calculate
        </button>
        <button key='showHide' onClick={() => this.setState({show: !state.show })}>
        Show/Hide
        </button>
        {answer}

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
    let steps = []
    const result = n_fac / nr_fac;
    steps.push(`n! = ${n}! and (n-r)! = (${n} -${r})! = ${n-r}!`);
    steps.push(`${n}! = (${top.join(' * ')}) = ${n_fac}`);
    steps.push(`${n-r}! = (${bottom.join(' * ') }) = ${nr_fac}`);
    steps.push(`n! = ${n_fac} and (n-r)! = ${nr_fac}`);
    steps.push(`${n_fac} / ${nr_fac} = ${result}`);
    steps.push(`So n!/(n-r)! is equal to ${result}`);
    console.log(steps)
    const renderedSteps = steps.map( (step,i) => 
      <li key={i}>{step}</li>
      )
    this.setState({answer:<div>
      <h3>The Answer for P({n}, {r}) = {result}</h3>
      <ol>
        {renderedSteps}
      </ol>
      </div>
    })
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
