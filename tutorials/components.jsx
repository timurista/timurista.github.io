// class 
class JsBin extends React.Component {
  render() {
    const {props, state} = this;
    // return empty div is you should not show
    if (!props.show) return <div></div>;
    return (
      <div>
        <iframe 
          width="100%" 
          height="300" 
          src="//jsbin.com/cuneha/1/embed?html,js,output" 
          allowfullscreen="allowfullscreen" 
          frameborder="0">        
        </iframe>
        </div>
      );
  }
}

class CodePen extends React.Component {
  render() {
    if (!this.props.show) return <div></div>;
    return (
      <iframe height='265' scrolling='no' title='React Template' 
      src='//codepen.io/timurista/embed/pNwPjG/?height=265&theme-id=light&default-tab=js,result&embed-version=2' 
      frameborder='no' allowtransparency='true' allowfullscreen='true' 
      style={{width: '100%'}}>See the Pen <a href='https://codepen.io/timurista/pen/pNwPjG/'>React Template</a> by tim urista (<a href='http://codepen.io/timurista'>@timurista</a>) on <a href='http://codepen.io'>CodePen</a>.
</iframe>
      )
  }
}

class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {props, state} = this;
    const msg = (state.show) ? 'show' : 'hide';
    return (
      <div>
        <button onClick={() => this.setState({show: !this.state.show})}>
        {msg} {props.name}</button>
        <CodePen show={this.state.show} />
      </div>
    );
  }
}