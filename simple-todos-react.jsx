// Define a collection to hold our tasks
Tasks =  new Mongo.Collection("tasks");

if (Meteor.isClient) {
  // This code is executed on the client side only
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });

  Meteor.startup(function() {
    // Use Meteor.startup to render the component after the page is ready
    React.render(<App />, document.getElementById("render-target"));
  });
}

Meteor.methods({
  addTask(text) {
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    Tasks.insert({ // saves data from client side to server side
      text: text,
      createdAt: new Date(),            // current time
      owner: Meteor.userId(),           // _id of logged in user
      username: Meteor.user().username  // username of logged in user
    });
  },

  removeTask(taskId) {
    Tasks.remove(taskId);
  },

  serChecked(taskId: setChecked) {
    Tasks.update(taskId, { $set: { checked: setChecked} });
  }
});
