let correctButton = document.getElementsByClassName('correct')
let flashCards = document.getElementsByClassName('flashCards')
let scoreDisplay = document.getElementById('totalScore')


let score = 0
let total = flashCards.length

console.log('total', total);
console.log('score',score);


for (var i = 0; i < correctButton.length; i++) {
  correctButton[i].addEventListener('click', function() {
      score++
      console.log(correctButton.length);
      console.log(score);
      scoreDisplay.innerHTML = `Your Score: ${score}/${total}`
  if(score === total) {
    console.log('Gameover');

  }
 })
}
