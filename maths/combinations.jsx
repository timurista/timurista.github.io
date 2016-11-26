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