const store = {
  // 5 or more questions are required
  questions: [
    {
      question: `How many "Earth"s would fit inside of Jupiter?`,
      answers: [
        '9',
        '16',
        '367',
        '1300'
      ],
      correctAnswer: `1300 "Earth"s could fit inside of Jupiter!`,
      imgSrc: './images/jupiter-on-its-side.jpg'
    },
    {
      question: `What does space sound like?`,
      answers: [
        'White noise',
        'Nothing',
        'Windy',
        'Static'
      ],
      correctAnswer: 'The sound of space? Nothing!',
      imgSrc: './images/sound-of-space.jpeg'
    },
    {
      question: `Is the Earth's rotation changing?`,
      answers: [
        'Yes, it\'s slowing down',
        'Yes, it\'s speeding up',
        'No',
        'The Earth doesn\'t rotate'
      ],
      correctAnswer: 'Yes, it\'s slowing down.. slowly..',
      imgSrc: './images/earth-rotating.jpg'
    },
    {
      question: `At night, which star is closest to us?`,
      answers: [
        'The North Star',
        'The Sun',
        'Orion',
        'Sirius'
      ],
      correctAnswer: 'Trick question! The Sun is ALWAYS the closest star!',
      imgSrc: './images/stars-in-space.jpg'
    },
    {
      question: `One day on Venus is equal to how many Earth days?`,
      answers: [
        '1 day',
        '12 days',
        '87 days',
        '243 days'
      ],
      correctAnswer: '243 days on Earth is 1 day on Venus.',
      imgSrc: './images/venus.jpg'
    },
    {
      question: `How many moons does Jupiter have?`,
      answers: [
        '2 moons',
        '79 moons',
        '16 moons',
        '7 moons'
      ],
      correctAnswer: 'Jupiter has 79 moons!',
      imgSrc: './images/jupiters-moons.jpg'
    }
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0
};

/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material, consult your instructor, and reference the slides for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates

const grabStart = () => {
  return ` <h2>Test your space knowledge!</h2>
  <div class="block">
    <h3>Ready for blastoff?</h3>
    <button id="beginQuiz">
      <span>Click here!</span>
      <img src="./images/flying-rocket.png" width="400"><br />
    </button>
    <p class="tally">${store.questions.length} questions total!</p>
  </div>`
}

const grabQuestion = (i) => {
  store.questionNumber++
  let option = store.questions[i].answers
  return `<h2>${store.questions[i].question}</h2>
          <div class="block questions">
            <h3>Question ${store.questionNumber}</h3>
            <form id="questionForm">                
              <input type="radio" id="A" value="${option[0]}" name="spaceqs"></input>
              <label for="A">${option[0]}</label>
              <input type="radio" id="B" value="${option[1]}" name="spaceqs"></input>
              <label for="B">${option[1]}</label>
              <input type="radio" id="C" value="${option[2]}" name="spaceqs"></input>
              <label for="C">${option[2]}</label>
              <input type="radio" id="D" value="${option[3]}" name="spaceqs"></input>
              <label for="D">${option[3]}</label>
              <input type="submit" value="submit">
            </form>
            <p class="tally">Correct: ${store.score}, Incorrect: ${i - store.score}</p>
          </div>`
}

const grabAnswer = (results, i) => {
  return `<h2>Answered View</h2>
  <div class="block">
    <h3>${results === "correct" ? "You got it!" : "Sorry..."}</h3>
    <img src="${store.questions[i].imgSrc}">
<p>${store.questions[i].correctAnswer}</p>
    <button id="nextQuestion">Next Question</button>
    <p class="tally">Correct: ${store.score}, Incorrect: ${store.questionNumber - store.score}</p>
  </div>`
}

const grabResults = () => {
  return `<h2>Final Screen</h2>
          <div class="block">
            <h3>Voyage complete!</h3>
            <p>You answered ${store.score} out of ${store.questions.length} questions correctly!</p>
            <button id="restartQuiz">Try again</button>
            <p></p>
            <p><i>"Across the sea of space, the stars are other suns."</i></p>
            <p>- Carl Sagan</p>
          </div>`
}

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store
const renderQuiz = (callback) => {
  if (store.quizStarted === false) {
    $('main').html(grabStart());
  }
  if (store.quizStarted === true) {
    $('main').html(callback);
  }
}

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

let index = 0;

const tally = () => {

  $('main').on('submit', event => {
    event.preventDefault()
    let correct = store.questions[index].correctAnswer
    let checked = $('input[name="spaceqs"]:checked').val()
    if (correct.includes(checked)) {
      store.score++
      renderQuiz(grabAnswer("correct", index))
      console.log("Yay!")
    } else {
      renderQuiz(grabAnswer("incorrect", index))
      console.log("lame...")
    }
    index++;
  })
}

const nextQuestion = () => {
  $('main').on('click', '#nextQuestion', event => {
    if (store.questionNumber === store.questions.length) {
      renderQuiz(grabResults())
    }
    else { renderQuiz(grabQuestion(index)) }
  }
  )
}

const beginQuiz = () => {
  $('main').on('click', '#beginQuiz', event => {
    store.quizStarted = true;
    $('main').html(grabQuestion(0))
  })
}

const restartQuiz = () => {
  $('main').on('click', '#restartQuiz', event => {
    index = 0;
    store.quizStarted = false;
    store.score = 0;
    store.questionNumber = 0;
    renderQuiz(grabStart());
  })
}

const main = () => {
  renderQuiz();
  beginQuiz();
  tally();
  nextQuestion();
  restartQuiz();
}

$(main);