
 /** COMBINATIONS.JSX **/ 
class Combinations extends React.Component {

  calcCombos() {
    const r = this.r.value || 0;
    const n = this.n.value || 1;
    const n_fac = this.factorial(n);
    const nr_fac = this.factorial(n-r);
    const r_fac = this.factorial(r);
    let top =[]
    let bottom=[]
    let bottomr=[]
    for (let i=n; i>=1; i--) {
      top.push(i);
    }
    for (let j=n-r; j>=1; j--) {
      bottom.push(j);
    }
    for (let k=r; k>=1; k--) {
      bottomr.push(k);
    }

    top = this.shortenArray(top);
    bottom = this.shortenArray(bottom);
    bottomr = this.shortenArray(bottomr);
    let steps = []
    const result = n_fac / (r_fac * nr_fac);

    const displayN_Fac = this.formatNumber(n_fac);
    const displayR_Fac = this.formatNumber(r_fac);
    const displayNR_Fac = this.formatNumber(nr_fac);
    const displayResult = this.formatNumber(result);
    steps.push(`n!/r!(n-r)! = ${n}!/${r}!((${n} -${r})! = ${n-r}!))`);
    steps.push(`${n}! = (${top.join(' * ')}) = ${displayN_Fac}`);
    steps.push(`${n-r}! = (${bottom.join(' * ') }) = ${displayNR_Fac}`);
    steps.push(`${r}! = (${bottom.join(' * ') }) = ${displayR_Fac}`);
    steps.push(`n!/r!(n-r)! = ${displayN_Fac}/${displayR_Fac} * (${displayNR_Fac})`);
    steps.push(`${displayN_Fac} / (${displayR_Fac} * ${displayNR_Fac}) = ${displayResult}`);
    steps.push(`Therefore n!/r!(n-r)! = ${displayResult}`);

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
  /** Common math equations **/
  factorial (num) {
    let rval=1;
    for (let i = 2; i <= num; i++)
        rval = rval * i;
    return rval;
  }

  shortenArray(array) {
    let arr = array.slice();
    if (arr.length <6) {
      return arr;
    }    
    let newArray =[];
    console.log(arr, arr.length)
    if (arr.length>=6) {
      newArray.push(arr[0]);
      newArray.push(arr[1]);
      newArray.push('...');
      newArray.push(arr[arr.length-2]);
      newArray.push(arr[arr.length-1]);
    }
    return newArray;
  }

  formatNumber(x) {
    if (x<=10000000) {
      return this.numberWithCommas(this.toFixed(Math.round(x)))
    }
    else {
      // to do exponential
      return x.toExponential(2).toString().replace('e+',' * 10^');
    }
  }

  toFixed(x) {
  if (Math.abs(x) < 1.0) {
    var e = parseInt(x.toString().split('e-')[1]);
    if (e) {
        x *= Math.pow(10,e-1);
        x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
    }
  } else {
    var e = parseInt(x.toString().split('+')[1]);
    if (e > 20) {
        e -= 20;
        x /= Math.pow(10,e);
        x += (new Array(e+1)).join('0');
    }
  }
  return x;
}


  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  /** To handle example render methods and properties **/

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
    	<li>{`${step}`}</li>
    	));
    const solution = (
    	<div>
    	<h3>Answer: {this.formatNumber(state.answer)}</h3>
        <ul>
        {steps}
        </ul>
      </div>
      );

    const renderedSolution = (state.show && state.answer) ? solution : <div></div>;
    window.MathJax.Hub.Update();
    // update mathjax
    // Update();

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
    const r = this.r.value || 0;
    const n = this.n.value || 1;
    const n_fac = this.factorial(n);
    const nr_fac = this.factorial(n-r);
    let top =[]
    let bottom=[]
    for (let i=n; i>=1; i--) {
      top.push(i);
    }
    for (let j=n-r; j>=1; j--) {
      bottom.push(j);
    }

    top = this.shortenArray(top);
    bottom = this.shortenArray(bottom);

    let steps = [];
    const result = n_fac / nr_fac;

    const displayN_Fac = this.formatNumber(n_fac);
    const displayNR_Fac = this.formatNumber(nr_fac);
    const displayResult = this.formatNumber(result);

    steps.push(`n!/(n-r)! = ${n}! / ((${n} -${r})! = ${n-r}!))`);
    steps.push(`${n}! = (${top.join(' * ')}) = ${displayN_Fac}`);
    steps.push(`${n-r}! = (${bottom.join(' * ') }) = ${displayNR_Fac}`);
    steps.push(`n! = ${displayN_Fac}`);
    steps.push(`(n-r)! = ${displayNR_Fac}`);
    steps.push(`${displayN_Fac} / ${displayNR_Fac} = ${displayResult}`);
    steps.push(`Therefore, n!/(n-r)! = ${displayResult}`);

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
