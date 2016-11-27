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