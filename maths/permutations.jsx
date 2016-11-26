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