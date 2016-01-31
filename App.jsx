// App component - represents the whole App
App = React.createClass({

  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],

  // Loads items from the Tasks collection and puts them on this.data.tasks
  getMeteorData() {
    return {
      tasks: Tasks.find({}, {createdAt: -1}).fetch()
    }
  },

  renderTasks() {
    // Get tasks from this.data.
    return this.data.tasks.map((task) => {
      return <Task key={task._id} task={task} />;
    });
  },

  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    var text = React.findDOMNode(this.refs.textInput).value.trim();

    Tasks.insert({
      text: text,
      createdAt: new Date() // current time
    });

    // Clear form after submitting
    React.findDOMNode(this.refs.textInput).value = "";
  },

  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List</h1>

{/* This is how you add comments to JSX code...
    This is the form to add new tasks */}
          <form className="new-task" onSubmit={this.handleSubmit} >
            <input type="text"
              ref="textInput"
              placeholder="Type to add new tasks" />
          </form>
        </header>

        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    );
  }
});
