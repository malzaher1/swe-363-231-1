// Fetch the questions from the API

fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple")
  .then(response => response.json()) // Parse the response as JSON
  .then(data => {
    if (data.response_code === 0) {
      let gameEnded = false;
      let questions = data.results;
      for (let i = 0; i < questions.length; i++) {
        let question = questions[i];
        let questionDiv = document.createElement("div");
        questionDiv.className = "question";

        let questionText = document.createElement("h3");
        questionText.textContent = question.question;
        questionDiv.appendChild(questionText);

        let choicesList = document.createElement("ul");
        choicesList.className = "choices";


        let correctAnswer = question.correct_answer;
        let incorrectAnswers = question.incorrect_answers;
        let choices = [correctAnswer, ...incorrectAnswers];
        // Shuffle the choices array using the Fisher-Yates algorithm
        for (let j = choices.length - 1; j > 0; j--) {
          // Generate a random index between 0 and j
          let k = Math.floor(Math.random() * (j + 1));
          // Swap the elements at j and k
          let temp = choices[j];
          choices[j] = choices[k];
          choices[k] = temp;
        }
        // Loop through the choices array
        for (let choice of choices) {
          // Create a li element for each choice
          let choiceItem = document.createElement("li");
          choiceItem.className = "choice";

          choiceItem.textContent = choice;

          choicesList.appendChild(choiceItem);
          choiceItem.addEventListener("click", function() {
            // Check if the game is over
            if (gameEnded) {
              // Do nothing
              return;
            }
            // Check if the choice is correct
            if (choice === correctAnswer) {

                choiceItem.classList.add("correct");
              // Increment the score by one
              score++;
            } else {

                choiceItem.classList.add("wrong");

              let correctChoiceItem = choicesList.querySelector(`li:contains("${correctAnswer}")`);
              correctChoiceItem.classList.add("correct");
            }
            // Disable the choices list
            choicesList.classList.add("disabled");

            questionIndex++;

            if (questionIndex === questions.length) {
              // Set the gameEnded flag to true
              gameEnded = true;

              alert(`The quiz is over. Your score is ${score} out of ${questions.length}.`);
            }
          });
        }
        // Append the choices list to the question div
        questionDiv.appendChild(choicesList);
        // Append the question div to the body element
        document.body.appendChild(questionDiv);
      }
      let score = 0;
      let questionIndex = 0;
    } else {
      // If the response code is not 0, show an error message
      alert("Sorry, something went wrong. Please try again later.");
    }
  })
  .catch(error => {
    // If there is an error, show an error message
    alert("Sorry, something went wrong. Please try again later.");
  });
