var numbers = [];
var variants;
var currentScore;
var totalScore;
var size;
var chanceof2;
var sum;
//localStorage.setItem('Total', 0);
document.addEventListener("DOMContentLoaded", function () {
   newGame();
   document.getElementById('button').onclick = newGame;
});

// getting size of game board
function askSize() {
   size = +prompt('Input size of game board from 2 till 6', '');
   if (!isFinite(size) || size < 2 || size > 6) {
      askSize();
   }
   let boardWidth = size * 100 + size * 20;
   let boardHeight = size * 100 + size * 20;
   document.getElementById('board').style.width = boardWidth + 'px';
   document.getElementById('board').style.height = boardHeight + 'px';
}



// creation of game board
function newGame() {
   askSize();
   currentScore = 0;
   document.getElementById('currentScore').innerText = 0;
   document.getElementById('totalScore').innerText = localStorage.getItem('Total') || 0;
   numbers = [];
   document.getElementById('board').innerHTML = '';
   for (let i = 1; i <= size * size; i++) {
      let number = document.createElement('div');
      number.className = 'number';
      number.innerText = 0;
      document.getElementById('board').appendChild(number);
      numbers.push(number);
   }
   randomTwo();
   randomTwo();
   document.addEventListener('keydown', keyButtons);
   //numbers[0].innerText = 1024;
   //numbers[1].innerText = 1024;
}

//establishment for Best score
function totalScore2() {
   var totalScore = localStorage.getItem('Total') || 0;
   if (currentScore >= +totalScore) {
      localStorage.setItem('Total', currentScore);
      totalScore = +localStorage.getItem('Total');
      document.getElementById('totalScore').innerText = totalScore;
   };
   document.getElementById('currentScore').innerText = currentScore;
}

// generate  10% variety of appearing 4
function variety10() {
   let chance = Math.trunc(Math.random() * 10);
   console.log(chance)
   if (chance == 2) {
      chanceof2 = 4;
   } else {
      chanceof2 = 2;
   }
}

// random 2 or 4 in game
function randomTwo() {
   variety10();
   let doubleSize = size * size;
   var number2 = Math.trunc(Math.random() * doubleSize);
   if (numbers[number2].innerText == 0) {
      numbers[number2].innerText = chanceof2;
   } else {
      randomTwo();
   };
   colorNumbers();

}

// functions for summing of numbers between boundaries--------------------------------------------------------------------

function sumBetweenRight(a, b) {
   sum = 0;
   if (Math.abs(a - b) != 1) {
      for (let i = b + 1; i < a; i++) {
         sum = sum + Number(numbers[i].innerText);
      }
   }
}
function sumBetweenLeft(a, b) {
   sum = 0;
   if (Math.abs(a - b) != 1) {
      for (let i = a + 1; i < b; i++) {
         sum = sum + Number(numbers[i].innerText);
      }
   }
}
function sumBetweenUp(a, b) {
   sum = 0;
   if (Math.abs(a - b) != 1) {
      for (let i = a + size; i < b; i = i + size) {
         sum = sum + Number(numbers[i].innerText);
      }
   }
}
function sumBetweenDown(a, b) {
   sum = 0;
   if (Math.abs(a - b) != 1) {
      for (let i = b + size; i < a; i = i + size) {
         sum = sum + Number(numbers[i].innerText);
      }
   }
}
//-------------------------------------------------------------------------------------------------------------------------

function compareRight() {
   let ceil = size * (size - 1);
   for (let k = size - 1; k > 0; k--) {
      for (let i = 0 + k; i <= ceil + k; i = i + size) {
         for (let j = i - 1; j >= i - k; j--) {
            sumBetweenRight(i, j);
            if (numbers[i].innerText == numbers[j].innerText && sum == 0) {
               numbers[i].innerText = Number(numbers[i].innerText) * 2;
               currentScore = currentScore + Number(numbers[i].innerText);
               numbers[j].innerText = 0;
            };
            totalScore2();
         }
         //totalScore2();
      };
   }
}

function sliderRight() {
   let ceil = size * (size - 1);
   let k = size - 1;
   do {
      for (let i = 0 + k; i <= ceil + k; i = i + size) {
         let j = i - 1;
         for (let j = i - 1; j >= i - k; j--) {
            if (numbers[i].innerText == 0) {
               numbers[i].innerText = numbers[j].innerText;
               numbers[j].innerText = 0;
            }
         }
      }
      k--;
   } while (k > 0);
}

function compareLeft() {
   let ceil = size * (size - 1);
   for (let k = 0; k < size - 1; k++) {
      for (let i = 0 + k; i <= ceil + k; i = i + size) {
         for (let j = i + 1; j <= i + size - k - 1; j++) {
            sumBetweenLeft(i, j);
            if (numbers[i].innerText == numbers[j].innerText && sum == 0) {
               numbers[i].innerText = Number(numbers[i].innerText) * 2;
               currentScore = currentScore + Number(numbers[i].innerText);
               numbers[j].innerText = 0;
            };
            totalScore2();
         }
         //totalScore2();
      }
   }
}

function sliderLeft() {
   let ceil = size * (size - 1);
   let k = 0;
   do {
      for (let i = 0 + k; i <= ceil + k; i = i + size) {
         for (let j = i + 1; j <= i + size - k - 1; j++) {
            if (numbers[i].innerText == 0) {
               numbers[i].innerText = numbers[j].innerText;
               numbers[j].innerText = 0;
            }
         }
      }
      k++;
   } while (k < size - 1);
}

function compareUp() {
   let ceil = size * (size - 1) - 1;
   for (let i = 0; i <= ceil; i++) {
      for (let j = i + size; j < numbers.length; j = j + size) {
         sumBetweenUp(i, j);
         if (numbers[i].innerText == numbers[j].innerText && sum == 0) {
            numbers[i].innerText = Number(numbers[i].innerText) * 2;
            currentScore = currentScore + Number(numbers[i].innerText);
            numbers[j].innerText = 0;
         }
         totalScore2();
      }
   };
}

function sliderUp() {
   let i = 0;
   do {
      for (let k = size; k < numbers.length; k++) {
         if (numbers[k - size].innerText == 0) {
            numbers[k - size].innerText = numbers[k].innerText;
            numbers[k].innerText = 0;
         }
      }
      i++;
   } while (i <= size);
}

function compareDown() {
   for (let i = numbers.length - 1; i >= size; i--) {
      for (let j = i - size; j >= 0; j = j - size) {
         sumBetweenDown(i, j);
         if (numbers[i].innerText == numbers[j].innerText && sum == 0) {
            numbers[i].innerText = Number(numbers[i].innerText) * 2;
            currentScore = currentScore + Number(numbers[i].innerText);
            numbers[j].innerText = 0;
         };
         totalScore2();
      };
   };
}

function sliderDown() {
   let i = 0;
   do {
      for (let k = numbers.length - 1; k >= size; k--) {
         if (numbers[k].innerText == 0) {
            numbers[k].innerText = numbers[k - size].innerText;
            numbers[k - size].innerText = 0;
         }
      }
      i++;
   } while (i <= size);
}

function keyButtons(event) {
   switch (event.key) {
      case "ArrowLeft":
         compareLeft();
         sliderLeft();
         randomTwo();
         loseWin();
         break;
      case "ArrowRight":
         compareRight();
         sliderRight();
         randomTwo();
         loseWin();
         break;
      case "ArrowUp":
         compareUp();
         sliderUp();
         randomTwo();
         loseWin();
         break;
      case "ArrowDown":
         compareDown();
         sliderDown();
         randomTwo();
         loseWin();
         break;
   };
}

//variants of ending game
function loseWin() {
   compareEach();
   let empty = 0;
   for (let i = 0; i < numbers.length; i++) {
      if (numbers[i].innerText == 2048) {
         alert('Win!');
         document.removeEventListener('keydown', keyButtons);
      } else if (numbers[i].innerText == 0) {
         empty++;
      }
   }
   if (empty == 0 && variants == 0) {
      alert('Game over. Lets try one more time');
      document.removeEventListener('keydown', keyButtons);
   }
}
// // supporting function for variants of ending game______________________________________________________________________________________________________________
function compareEach() {
   variants = 0;
   for (let i = 0; i < numbers.length - size; i++) {
      if ((i + 1) % size != 0) {
         if (numbers[i].innerText == numbers[i + 1].innerText || numbers[i].innerText == numbers[i + size].innerText) {
            variants++;
         };
      } else {
         if (numbers[i].innerText == numbers[i + size].innerText) {
            variants++;
         };
      };
   }
   for (let i = numbers.length - size; i < numbers.length - 1; i++) {
      if (numbers[i].innerText == numbers[i + 1].innerText) {
         variants++;
      };
   }
}

// design part

function colorNumbers() {
   for (let i = 0; i < numbers.length; i++) {
      if (numbers[i].innerText == 0) {
         numbers[i].style.backgroundColor = "#D8BFD8";
         numbers[i].style.color = "#D8BFD8";
      };
      if (numbers[i].innerText == 2) {
         numbers[i].style.backgroundColor = "#DDA0DD";
         numbers[i].style.color = "#52227B";
         numbers[i].style.fontSize = "80px";
      };
      if (numbers[i].innerText == 4) {
         numbers[i].style.backgroundColor = "#EE82EE";
         numbers[i].style.color = "#52227B";
      };
      if (numbers[i].innerText == 8) {
         numbers[i].style.backgroundColor = "#DA70D6";
         numbers[i].style.color = "#52227B";
      };
      if (numbers[i].innerText == 16) {
         numbers[i].style.backgroundColor = "#BA55D3";
         numbers[i].style.color = "#52227B";
      };
      if (numbers[i].innerText == 32) {
         numbers[i].style.backgroundColor = "#8A2BE2";
         numbers[i].style.color = "#52227B";
      };
      if (numbers[i].innerText == 64) {
         numbers[i].style.backgroundColor = "#9400D3";
         numbers[i].style.color = "#52227B";
      };
      if (numbers[i].innerText == 128) {
         numbers[i].style.backgroundColor = "#9932CC";
         numbers[i].style.color = "#52227B";
      };
      if (numbers[i].innerText == 256) {
         numbers[i].style.backgroundColor = "#8B008B";
         numbers[i].style.color = "#DDA0DD";
      };
      if (numbers[i].innerText == 512) {
         numbers[i].style.backgroundColor = "#800080";
         numbers[i].style.color = "#DDA0DD";
      };
      if (numbers[i].innerText == 1024) {
         numbers[i].style.backgroundColor = "#483D8B";
         numbers[i].style.color = "D8BFD8";

      };
      if (numbers[i].innerText == 2048) {
         numbers[i].style.backgroundColor = "#4B0082";
         numbers[i].style.color = "white";
      };
   };
}