class Combinations extends React.Component {

  constructor(props) {
    super(props);
    this.state = { answer: <div></div> };
    this.calcPerms = this.calcPerms.bind(this);
  }

  factorial(num) {
    let rval=1;
    for (let i = 2; i <= num; i++)
        rval = rval * i;
    return rval;
  }

  calcPerms() {
    const r = this.r.value || 0;
    const n = this.n.value || 1;
    const n_fac = this.factorial(n);
    const nr_fac = this.factorial(n-r);
    const r_fac = this.factorial(r);
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
    console.log('render')
    const {props, state} = this;
    return (<div>
        <h3>Calculate Combinations</h3>
        <div>
        <em>formula: P = n! / r!(n-r)!</em>
        </div>
        <span>
        <label>n (objects)</label>
        <input type='number' defaultValue={1} ref={(n) => this.n = n} />
        <label>r (sample)</label>
        <input type='number' defaultValue={1} ref={(r) => this.r = r} />
        </span>
        <button 
          key='calculate' 
          onClick={this.calcPerms}>
          Calculate
        </button>
        {state.answer}
        
      </div>)
  }
}