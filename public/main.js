let correctButton = document.getElementsByClassName('correct')
let incorrectButton = document.getElementsByClassName('incorrect')
let flashCards = document.getElementsByClassName('flashCards')
let scoreDisplay = document.getElementById('totalScore')


let score = 0
let attempt = 0
let total = flashCards.length

console.log('total', total);
console.log('score',score);


for (var i = 0; i < correctButton.length; i++) {
  correctButton[i].addEventListener('click', function() {
      score++
      attempt++
      console.log(correctButton.length);
      console.log(score);
      scoreDisplay.innerHTML = `Your Score: ${score}/${total}`
        if(attempt === total) {
          console.log('Gameover');
          window.location.href = "/quizOver/";
  }
 })
}

for (var i = 0; i < incorrectButton.length; i++) {
  incorrectButton[i].addEventListener('click', function() {
    attempt++
    scoreDisplay.innerHTML = `Your Score: ${score}/${total}`
    console.log('attempt', attempt);
        if(attempt === total) {
          console.log('Gameover');
          window.location.href = "/quizOver/";
    }
  })
}
