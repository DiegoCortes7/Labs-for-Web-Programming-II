const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

function doTask(taskName) {
  console.log(`Starting task: ${taskName}`);
  setTimeout(() => {
    console.log(`Completed task: ${taskName}`);
    eventEmitter.emit('taskCompleted', taskName);
  }, 1000);
}

// Listener
eventEmitter.on('taskCompleted', (taskName) => {
  console.log(`Listener: ${taskName} has been completed.`);
});

// Run tasks
doTask('Task 1');
doTask('Task 2');