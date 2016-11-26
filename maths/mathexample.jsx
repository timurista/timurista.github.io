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
