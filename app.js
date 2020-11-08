
const STORE = {

  quizStarted: false,
  currentQuestion: 0,
  score: 0,
  view: "home",

  questions: [
    {
      question: 'Which one of these players is Dutch and has played for FC Bayern Munich?',
      answers: [
        'Michael Ballack',
        'Arjen Robben',
        'Robin Van Persie',
        'Nani'
      ],
      correctAnswer: 'Arjen Robben'
    },
    {
      question: 'Which player is known as Fenomeno?',
      answers: [
        'Ronaldinho',
        'Zidane',
        'Ronaldo (Brazil)',
        'Ronaldo (Portugal)'
      ],
      correctAnswer: 'Ronaldo (Brazil)'
    },
    {
      question: 'Select the player that won the 1998 World Cup',
      answers: [
        'David Beckham',
        'Messi',
        'Zidane',
        'Luis Figo'
      ],
      correctAnswer: 'Zidane'
    },
    {
      question: 'Which player has played for Juventus, AC Milan, and Inter?',
      answers: [
        'Ronaldo (Brazil)',
        'Francesco Totti',
        'Andrea Pirlo',
        'Zambrotta'
      ],
      correctAnswer: 'Andrea Pirlo'
    },
    {
      question: 'Select the player that currently plays for Liverpool (2020)?',
      answers: [
        'Sadio Mane',
        'Hakim Ziyech',
        'Heung Ming Son',
        'James Rodriguez',
      ],
      correctAnswer: 'Sadio Mane'
    },
    {
      question: 'This player was the captain for England and also played in Real Madrid, he is:',
      answers: [
        'Harry Kane',
        'Paul Scholes',
        'David Beckham',
        'Steven Gerrard'
      ],
      correctAnswer: 'David Beckham'
    },
    {
      question: 'Which player has won the Champions League with 2 different clubs?',
      answers: [
        'Messi',
        'Cristiano Ronaldo',
        'Francesco Totti',
        'Zidane'
      ],
      correctAnswer: 'Cristiano Ronaldo'
    }

  ],

};

/**
 *
 * Technical requirements:
 *
 * Your app should include a render() function, that regenerates the view each time the store is updated.
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇

 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates

//generates the start screen of the quiz

function generateStartScreenHtml() {
  return `
  <div class="start-screen">
    <p>Welcome! This quiz will test your knowledge to reveal if you are a true soccer fan or a bandwagon champion.</p>
    <button type="button" id="start">Start Quiz</button>
  </div>
  `;
}

// generates the current question number and the current score

function generateQuestionNumberAndScore() {
  return `
  <ul class="question-and-score">
    <li id= "question-number"> Question Number: ${STORE.currentQuestion + 1}/${STORE.questions.length}</li>
    <li id="score"> Score = ${STORE.score}/${STORE.questions.length}</li>
  </ul>
    `;
}

// generates the answers options template 
function generateAnswersHtml() {
  const answersArray = STORE.questions[STORE.currentQuestion].answers;
  let answersHtml = '';
  let i = 0;

  answersArray.forEach(answer => {
    answersHtml += `
      <div class= "option-containers" id="option-container-${i}">
      <input type="radio" name="options" id="option${i + 1}" value="${answer}" required>
      <label for="options${i + 1}">${answer}</label>
      </div>
      `;
    i++
  });

  return answersHtml;
}
// generates the html for the current question
function generateQuestionHtml() {
  let currentQuestion = STORE.questions[STORE.currentQuestion];


  return `
      <form id="question-form" class="question-form">
        <fieldset>
          <div class="question">
            <legend>${currentQuestion.question}</legend>
          </div>
          <div class="options">
          <div class="answers">
            ${generateAnswersHtml()}
          </div>
          </div>
        <button id="next-question-button">Next</button>
        <button id="submit-button">Submit</button>
        </fieldset>
      <form>
      `;

}

// generates the results page with the score and the option to restart the quiz
function generateResultsPage() {
  return `
    <div class="results">
      <form id="js-restart-quiz" class="restart-quiz">
        <fieldset>
          <div>
            <legend> Your score is: ${STORE.score}/${STORE.questions.length}</legend>
          </div>
        
          </div>

          <div class="restart-quiz-button">
           <button id="restart">Restart Quiz</button>
          </div>
        </fielset>
      </form>
  `;
}

// generates the feedback based on if answered correctly or incorrectly
function generateFeedbackHtml(answerStatus) {
  let correctAnswer = STORE.questions[STORE.currentQuestion].correctAnswer;
  let html = '';

  if (answerStatus === 'correct') {
    html = `
      <div class="right-answer">You answered correct!</div>`
  }

  else if (answerStatus === 'incorrect') {
    html = `
    <div class="wrong-answer">You did not answer correctly. The right answer is ${correctAnswer}.</div>`
  };
  return html;
}



//********** RENDER FUNCTION(S) **********

// This function conditionally replaces the contents of the <main> tag based on the state of the store


function render() {
  let html = '';

  if (STORE.quizStarted === false) {
    $('main').html(generateStartScreenHtml);
    return;
  }
  else if (STORE.currentQuestion >= 0 && STORE.currentQuestion < STORE.questions.length) {
    html = generateQuestionNumberAndScore();
    html += generateQuestionHtml();
    $('main').html(html);
  }

  else {
    $('main').html(generateResultsPage());
  }
}


/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

function handleStartClick() {
  $('main').on('click', '#start', function (event) {
    STORE.quizStarted = true;
    render();
  });

}

function handleNextQuestion() {
  $('body').on('click', '#next-question-button', (event) => {
    render();
  });
}


function handleQuestionFormSubmission() {

  $('main').on('submit', '#question-form', function (event) {
    event.preventDefault();
    const currentQuestion = STORE.questions[STORE.currentQuestion];

    let selectedOption = $('input[name=options]:checked').val()

    let optionContainerId = `#option-container-${currentQuestion.answers.findIndex(i => i === selectedOption)}`;
    if (selectedOption === currentQuestion.correctAnswer) {
      STORE.score++;
      $(optionContainerId).append(generateFeedbackHtml('correct'))

    }
  
    else {
      $(optionContainerId).append(generateFeedbackHtml('incorrect'))
    }

    STORE.currentQuestion++

    $('#submit-button').hide();
    $('input[type=radio]').each(() => {
      $('input[type=radio]').attr('disabled', true);
    });

    $('#next-question-button').show();

  });
}


function restartQuiz() {
  STORE.quizStarted===false;
  STORE.currentQuestion=0;
  STORE.score=0;
 }
function handleRestartButtonClick() { 
  $('main').on('click', '#restart', e=> {
    restartQuiz();
    render();
  })
}

function mainQuizApp() {
  render();
  handleStartClick();
  handleNextQuestion();
  handleQuestionFormSubmission();
  handleRestartButtonClick();

}

$(mainQuizApp);