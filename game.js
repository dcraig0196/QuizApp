const question = document.querySelector('#question')
const choices = Array.from(document.querySelectorAll('.choice-text'))
const progressText = document.querySelector('#progressText')
const scoreText = document.querySelector('#score')
const progressBarFull = document.querySelector('#progressBarFull')

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'What is the diameter of Earth?',
        choice1: '8,100 Miles',
        choice2: '8,000 Miles',
        choice3: '7,900 Miles',
        choice4: '7,950 Miles',
        answer: 2,
    },
    {
        question: 'What is the largest freshwater lake in the world?',
        choice1: 'Lake Michigan-Huron',
        choice2: 'Lake Tahoe',
        choice3: 'Lake Tanganyika',
        choice4: 'Lake Superior',
        answer: 4,
    },
    {
        question: 'What is the seventh planet from the sun?',
        choice1: 'Mercury',
        choice2: 'Jupiter',
        choice3: 'Uranus',
        choice4: 'Saturn',
        answer: 3,
    },
    {
        question: 'What is the worlds biggest island?',
        choice1: 'New Guinea',
        choice2: 'Greenland',
        choice3: 'Madagascar',
        choice4: 'Baffin Island',
        answer: 2,
    },
    {
        question: 'What is the worlds largest ocean?',
        choice1: 'Indian',
        choice2: 'Atlantic',
        choice3: 'Pacific',
        choice4: 'Arctic',
        answer: 3,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()