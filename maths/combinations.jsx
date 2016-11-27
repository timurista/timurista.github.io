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