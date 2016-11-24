// for holding text info 
class Text extends React.Component {
  render() {
    const {props, state} = this;
    // return empty div is you should not show
    return <div><h1>{props.title}</h1><p>{props.description}</p></div>;
  }
}
