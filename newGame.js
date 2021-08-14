var numbers = [];
var variants;
var currentScore;
var totalScore;
//localStorage.setItem('Total', 0);
document.addEventListener("DOMContentLoaded", function () {
   newGame();
});

// creation of game board
function newGame() {
   currentScore = 0;
   document.getElementById('currentScore').innerText = 0;
   document.getElementById('totalScore').innerText = localStorage.getItem('Total') || 0;
   numbers = [];
   document.getElementById('board').innerHTML = '';
   for (let i = 1; i <= 16; i++) {
      let number = document.createElement('div');
      number.className = 'number';
      number.innerText = 0;
      document.getElementById('board').appendChild(number);
      numbers.push(number);
   }
   randomTwo();
   randomTwo();
   colorNumbers();
   document.addEventListener('keydown', keyButtons);
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



// random 2 in game
function randomTwo() {
   var number2 = Math.trunc(Math.random() * 16);
   if (numbers[number2].innerText == 0) {
      numbers[number2].innerText = 2;
   } else {
      randomTwo();
   };
   colorNumbers();
   //numbers[0].innerText = 1024;
   //numbers[1].innerText = 1024;
}

// common comparison and changing for all variants of moving
function commonChanging(a, b, c, d) {
   if (+numbers[a].innerText == +numbers[b].innerText) {
      numbers[a].innerText = Number(numbers[a].innerText) * 2;
      currentScore = currentScore + Number(numbers[a].innerText);
      delElem(b);
   }
   else if (+numbers[a].innerText == +numbers[c].innerText && numbers[b].innerText == 0) {
      numbers[a].innerText = Number(numbers[a].innerText) * 2;
      currentScore = currentScore + Number(numbers[a].innerText);
      delElem(b, c);
   }
   else if (+numbers[a].innerText == +numbers[d].innerText && numbers[c].innerText == 0 && numbers[b].innerText == 0) {
      numbers[a].innerText = Number(numbers[a].innerText) * 2;
      currentScore = currentScore + Number(numbers[a].innerText);
      delElem(b, c, d);
   };
   if (+numbers[b].innerText == +numbers[c].innerText) {
      numbers[b].innerText = Number(numbers[b].innerText) * 2;
      currentScore = currentScore + Number(numbers[b].innerText);
      delElem(c);
   }
   else if (+numbers[b].innerText == +numbers[d].innerText && numbers[c].innerText == 0) {
      numbers[b].innerText = Number(numbers[b].innerText) * 2;
      currentScore = currentScore + Number(numbers[b].innerText);
      delElem(c, d);
   }
   if (Number(numbers[c].innerText) == Number(numbers[d].innerText)) {
      numbers[c].innerText = Number(numbers[c].innerText) * 2;
      currentScore = currentScore + Number(numbers[c].innerText);
      delElem(d);
   }
}

// supporting functions for common comparison______________________________________________________________________________________________________________
// delete elements after comparison
function delElem(x, y = x, z = x) {
   numbers[x].innerText = 0;
   numbers[y].innerText = 0;
   numbers[z].innerText = 0;
}

// slide elements after changing

function slideElem(p, x, y, z) {
   let forSort = [];
   forSort.push(+numbers[p].innerText, +numbers[x].innerText, +numbers[y].innerText, +numbers[z].innerText);
   let filtered = forSort.filter(item => item > 0);
   numbers[p].innerText = filtered[0] || 0;
   numbers[x].innerText = filtered[1] || 0;
   numbers[y].innerText = filtered[2] || 0;
   numbers[z].innerText = filtered[3] || 0;
}
// supporting functions for common comparison______________________________________________________________________________________________________________

// game process - function up + slide
function up() {
   for (let i = 0; i <= 3; i++) {
      commonChanging(i, i + 4, i + 8, i + 12);
      slideElem(i, i + 4, i + 8, i + 12);
      colorNumbers();
   };
   randomTwo();
   totalScore2();
}

function down() {
   for (let i = 15; i >= 12; i--) {
      commonChanging(i, i - 4, i - 8, i - 12);
      slideElem(i, i - 4, i - 8, i - 12);
      colorNumbers();
   };
   randomTwo();
   totalScore2();
}

function right() {
   for (let i = 15; i >= 3; i = i - 4) {
      commonChanging(i, i - 1, i - 2, i - 3);
      slideElem(i, i - 1, i - 2, i - 3);
      colorNumbers();
   };
   randomTwo();
   totalScore2();
}

function left() {
   for (let i = 0; i <= 12; i = i + 4) {
      commonChanging(i, i + 1, i + 2, i + 3);
      slideElem(i, i + 1, i + 2, i + 3);
      colorNumbers();
   };
   randomTwo();
   totalScore2();
}

function keyButtons(event) {
   switch (event.key) {
      case "ArrowLeft":
         left()
         loseWin();
         break;
      case "ArrowRight":
         right()
         loseWin();
         break;
      case "ArrowUp":
         up()
         loseWin();
         break;
      case "ArrowDown":
         down()
         loseWin();
         break;
   };
}

// variants of ending game
function loseWin() {
   compareEach();
   let empty = 0;
   for (let i = 0; i <= 15; i++) {
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
// supporting function for variants of ending game______________________________________________________________________________________________________________
function compareEach() {
   variants = 0;
   for (let i = 0; i <= 11; i++) {
      if (i != 3 && i != 7 && i != 11) {
         if (numbers[i].innerText == numbers[i + 1].innerText || numbers[i].innerText == numbers[i + 4].innerText) {
            variants++;
         };
      } else {
         if (numbers[i].innerText == numbers[i + 4].innerText) {
            variants++;
         };
      };
   }
   if (numbers[12].innerText == numbers[13].innerText || numbers[13].innerText == numbers[14].innerText || numbers[14].innerText == numbers[15].innerText) {
      variants++;
   };
}

// design part

function colorNumbers() {
   for (let i = 0; i <= 15; i++) {
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