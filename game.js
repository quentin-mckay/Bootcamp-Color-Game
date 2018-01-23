// ====== hook up to DOM ======
let $squares = document.querySelectorAll('.square')
let $colorDisplay = document.getElementById('colorDisplay')
let $messageDisplay = document.querySelector('#message')
let $h1 = document.querySelector('h1')
let $resetButton = document.querySelector('#reset')
let $modeButtons = document.querySelectorAll('.mode')
// let $easyBtn = document.querySelector('#easyBtn')
// let $hardBtn = document.querySelector('#hardBtn')


// declare state data
let colors = []
let numSquares = 6
let pickedColor = ''

init()

function init() {
  setupModeButtons()
  setupSquares()
  reset()
}

function setupModeButtons() {
  // ====== setup mode button event listeners ======
  $modeButtons.forEach(button => {
    button.addEventListener('click', function() {
      // remove .selected class from all mode buttons
      $modeButtons.forEach(button => { button.classList.remove('selected') })
      // add .selected class to this mode button clicked on
      this.classList.add('selected')

      if (this.textContent === "Easy") {
        numSquares = 3
      }
      else if (this.textContent === "Hard") {
        numSquares = 6
      }
      reset()
    })
  })
}

function setupSquares() {
  // ====== Squares Setup ======
  $squares.forEach((square, i) => {
    // set click listeners
    square.addEventListener('click', function() {
      let clickedColor = this.style.background

      // guessed right!
      if (clickedColor === pickedColor) {
        // update message
        $messageDisplay.textContent = 'Correct!'
        // change all colors to correct color
        changeAllToColor($squares, pickedColor)
        // change h1 background to correct colors
        $h1.style.background = pickedColor
        // change reset button text
        $resetButton.textContent = 'Play Again?'
      }
      // guessed wrong
      else {
        // set color of clicked square to body background color ("hiding" it)
        this.style.background = 'slategray'
        // update message
        $messageDisplay.textContent = 'Try Again'
      }
    })
  })
}

function reset() {
  // ====== GENERATE DATA ======
  // generate all new colors
  colors = generateRandomColors(numSquares)
  // pick new correct "goal" color
  pickedColor = pickColor()

  // ====== UPDATE UI ======
  // change h1 color display to match picked colors
  $colorDisplay.textContent = pickedColor
  // update squares state (colors)
  $squares.forEach((square, i) => {
    if (colors[i]) {
      square.style.display = 'block'
      square.style.background = colors[i]
    }
    else {
      square.style.display = 'none'
    }
  })
  // reset button text
  $resetButton.textContent = 'New Colors'
  // reset h1 color`
  $h1.style.background = 'steelblue'
  // reset message
  $messageDisplay.textContent = ''
}

// ====== Reset (New Colors) Button ======
$resetButton.addEventListener('click', function() {
  reset()
})



// ====== Utility Functions ======

// not great b/c has SIDE EFFECTS! ($squares) so not reusable
// function changeAllToColor(color) {
//   $squares.forEach(square => {
//     square.style.background = color
//   })
// }
function changeAllToColor(arr, color) {
  arr.forEach((square) => {
    square.style.background = color
  })
}


function pickColor() {
  let randomNum = Math.floor(Math.random() * colors.length)
  return colors[randomNum]
}


function random(max) {
  return Math.floor(Math.random() * max)
}

function createRandomColor() {
  let r = random(256)
  let g = random(256)
  let b = random(256)

  return `rgb(${r}, ${g}, ${b})`
}

function generateRandomColors(num) {
  let array = []

  for (let i = 0; i < num; i++) {
    let randomColor = createRandomColor()
    array.push(randomColor)
  }

  return array
}



/*
// ====== Easy Button ======  old way (noy scalable, too much duplicate code)
$easyBtn.addEventListener('click', function() {
  this.classList.add('selected')
  $hardBtn.classList.remove('selected')

  numSquares = 3 // set game state numSquares
  colors = generateRandomColors(numSquares)

  pickedColor = pickColor()
  colorDisplay.textContent = pickedColor
  $squares.forEach((square, i) => {
    if (colors[i]) {
      square.style.background = colors[i]
    }
    else {
      square.style.display = 'none'
    }
  })
})

// ====== Hard Button ======  old way (noy scalable, too much duplicate code)
$hardBtn.addEventListener('click', function() {
  this.classList.add('selected')
  $easyBtn.classList.remove('selected')


  numSquares = 6 // set game state numSquares
  colors = generateRandomColors(numSquares)

  pickedColor = pickColor()
  colorDisplay.textContent = pickedColor
  $squares.forEach((square, i) => {
    square.style.background = colors[i]
    square.style.display = 'block'
  })
})
*/
