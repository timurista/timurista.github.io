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

class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {props, state} = this;
    return (
      <div>
        <button onClick={() => this.setState({show: !this.state.show})}>Show {props.name}</button>
        <JsBin show={this.state.show} />
      </div>
    );
  }
}