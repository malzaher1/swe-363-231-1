// Import the readline and socket.io-client modules
const readline = require('readline');
const io = require('socket.io-client');

// Create a readline interface to read user input from the console
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const socket = io('http://127.0.0.1:8080');

// Define a set of questions and answers for the chatbot to use
const questions = [
  'What is your name?',
  'How are you?',
  'What is your favorite color?',
  'What is the meaning of life?',
  'Do you like pizza?',
];

const answers = [
  'My name is Mohammed, nice to meet you.',
  'I am fine, thank you for asking.',
  'My favorite color is blue, like the sky.',
  'The meaning of life is nice',
  'Yes, I like pizza.',
];

const getRandomAnswer = () => {
  return answers[Math.floor(Math.random() * answers.length)];
};

const getSpecificAnswer = (question) => {
  // Find the index of the question in the questions array
  const index = questions.indexOf(question);

  // If the question is found, return the corresponding answer
  if (index !== -1) {
    return answers[index];
  }

  return 'I am sorry, I do not understand your question.';
};

const prompt = () => {
  rl.question('You: ', (input) => {
    // Send the user input to the server
    socket.emit('message', input);
  });
};

socket.on('connect', () => {
  console.log('Connected to the server.');
  // Prompt the user for input
  prompt();
});

socket.on('message', (message) => {
  // Print the message from the server
  console.log('Chatbot: ' + message);
  // Prompt the user for input
  prompt();
});

socket.on('disconnect', () => {
  console.log('Disconnected from the server.');
  // Close the readline interface
  rl.close();
});

process.on('SIGINT', () => {
  // Send a goodbye message to the server
  socket.emit('message', 'Goodbye');
  // Close the socket connection
  socket.close();
});
