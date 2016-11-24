// tutorial1.js
var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
       Check out my projects!
      </div>
    );
  }
});

var App = React.createClass()
ReactDOM.render(
  <CommentBox />,
  document.getElementById('app')
);