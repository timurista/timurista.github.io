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