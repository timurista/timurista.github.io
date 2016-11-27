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
    let newArray =[];
    if (arr.length>=5) {
      newArray.push(arr.slice(0,2));
      newArray.push('...');
      newArray.push(arr.slice(arr.length-2));
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
