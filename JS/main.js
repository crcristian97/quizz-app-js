const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: '¿Qué método utilizas para agregar un elemento al final de un array en JavaScript?',
    answers: [
      { text: '.push()', correct: true },
      { text: '.pop()', correct: false },
      { text: '.shift()', correct: false },
      { text: '.unshift()', correct: false }
    ]
  },
  {
    question: '¿Cuál de las siguientes es una etiqueta semántica en HTML?',
    answers: [
      { text: '<div>', correct: false },
      { text: '<article>', correct: true },
      { text: '<span>', correct: false },
      { text: '<b>', correct: false }
    ]
  },
  {
    question: '¿Cómo puedes declarar un estado en un componente funcional de React?',
    answers: [
      { text: 'const [state, setState] = useState()', correct: true },
      { text: 'this.state = {}', correct: false },
      { text: 'useEffect(() => {}, [])', correct: false },
      { text: 'setState({})', correct: false }
    ]
  },
  {
    question: '¿Qué propiedad en CSS se utiliza para cambiar el color de fondo de un elemento?',
    answers: [
      { text: 'color', correct: false },
      { text: 'background-color', correct: true },
      { text: 'border-color', correct: false },
      { text: 'background-image', correct: false }
    ]
  },
  {
    question: '¿Cuál es el hook utilizado para efectos secundarios en React?',
    answers: [
      { text: 'useEffect', correct: true },
      { text: 'useState', correct: false },
      { text: 'useMemo', correct: false },
      { text: 'useContext', correct: false }
    ]
  },
  {
    question: '¿Cómo accedes al contenido de un input en JavaScript?',
    answers: [
      { text: 'document.getElementById("input").value', correct: true },
      { text: 'document.querySelector("input").text', correct: false },
      { text: 'input.innerHTML', correct: false },
      { text: 'input.value()', correct: false }
    ]
  },
  {
    question: '¿Qué significa JSX en React?',
    answers: [
      { text: 'JavaScript eXtended', correct: false },
      { text: 'JavaScript XML', correct: true },
      { text: 'JavaScript eXpression', correct: false },
      { text: 'Java eXtension', correct: false }
    ]
  },
  {
    question: '¿Cuál es la forma correcta de importar un componente en React?',
    answers: [
      { text: 'import { Component } from "./Component"', correct: true },
      { text: 'include Component from "./Component"', correct: false },
      { text: 'require(Component)', correct: false },
      { text: 'import "./Component"', correct: false }
    ]
  },
  {
    question: '¿Cómo puedes escuchar eventos en un botón en React?',
    answers: [
      { text: '<button onClick={handleClick}>', correct: true },
      { text: '<button click={handleClick}>', correct: false },
      { text: '<button onClick="handleClick()">', correct: false },
      { text: '<button onHandler={handleClick}>', correct: false }
    ]
  }
];