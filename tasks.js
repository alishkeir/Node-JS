
/**
 * Starts the application
 * This is the function that is run when the app starts
 * 
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *  
 * @param  {string} name the name of the app
 * @returns {void}
 */
function startApp(name) {
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log(`Welcome to ${name}'s application!`)
  console.log("--------------------")
}


/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 * 
 * For example, if the user entered 
 * ```
 * node tasks.js batata
 * ```
 * 
 * The text received would be "batata"
 * This function  then directs to other functions
 * 
 * @param  {string} text data typed by the user
 * @returns {void}
 */
function onDataReceived(text) {
  text = text.replace(/(\r\n|\n|\r)/gm, "").trim().split(" ");
  if (text[0] === 'quit' || text[0] === 'exit') {
    quit();
  }
  else if (text[0] === 'hello') {
    hello(text[1]);
  }
  else if (text[0] === 'help') {
    help();
  }
  else if (text[0] === "list") {
    list();
  }
  else if (text[0] === "add") {
    text.shift();
    add(text.join(" "));
  }

  else if (text[0] === "remove") {
    remove(text[1]);
  }

  else if (text[0] === "edit") {
    edit(text.slice(1, 2).join(' '), text.slice(2).join(' '));
  }

  else {
    unknownCommand(text[0]);
  }
}


/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c) {
  console.log('unknown command: "' + c.trim() + '"')
}


/**
 * Says hello
 *
 * @returns {void}
 */
function hello(text) {
  if (text) {
    console.log('hello ' + text + '!');

  }
  else
    console.log('hello!');


}


/**
 * Exits the application
 *
 * @returns {void}
 */
function quit() {
  console.log('Quitting now, goodbye!')
  process.exit();
}

/**
 * prints "Help" 
* this function is supposed to help the user of what functions are available (what to write in the app)
 */
function help() {
  console.log("here are some functions to do: \nhello for greetings, you can add your name after hello \nexit or quit to exit the application \nadd to add tasks \nremove to remove tasks");
}
var tasks = ["Task 1", "Task 2"];

function list() {
  for (var i = 0; i < tasks.length; i++) {
    console.log(i + 1 + " - " + tasks[i]);
  }
}


function add(task) {

  if (task === '') {
    console.log("Task undefined");
  } else {
    tasks.push(task);
    for (var i = 0; i < tasks.length; i++) {
      console.log(i + 1 + " - " + tasks[i]);
    }
  }
}

function remove(text) {
  if (text < 1 || text > tasks.length) {
    console.log("Task not found, select a proper task number:")
  }

  if (text) {

    tasks.splice(text - 1, 1)
  }
  else {
    tasks.splice(tasks.length - 1, 1)
  }
  for (var j = 0; j < tasks.length; j++) {
    console.log(j + 1 + " - " + tasks[j]);
  }
}

function edit(text, editText) {

  if (text === '' && editText === '') {
    console.log("please enter a task number:")
  }

  else if (isNaN(text)) {
    tasks[tasks.length - 1] = text + ' ' + editText
  }
  else {
    tasks[text - 1] = editText;
  }
  for (var k = 0; k < tasks.length; k++) {
    console.log(k + 1 + " - " + tasks[k]);
  }
}




// The following line starts the application
startApp("Ali Shkeir")
