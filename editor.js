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
ReactDOM.render(
  <CommentBox />,
  document.getElementById('text')
);