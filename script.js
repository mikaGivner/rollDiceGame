//הגדרות קטעי קול
let mySound = new Audio("./assets/Ikson - New Day (Official).mp3");
let dubbleDice = new Audio("./assets/Rolling Dice.mp3");
let winning = new Audio("./assets/wow.mp3");

mySound.volume = "0.1";
dubbleDice.volume = "1";
winning.volume = "1";

//הגדרת המערך ששומר את הקוביות
let arr = [
  '<img src="./assets/img/dice-1.png" alt="">',
  '<img src="./assets/img/dice-2.png" alt="">',
  '<img src="./assets/img/dice-3.png" alt="">',
  '<img src="./assets/img/dice-4.png" alt="">',
  '<img src="./assets/img/dice-5.png" alt="">',
  '<img src="./assets/img/dice-6.png" alt="">',
];

//יצירת משתנים וקישורם לאלמנטים
let val = document.querySelector(".fa-solid.fa-volume-high");
let unSound = document.querySelector(".fa-solid.fa-slash");
let opn = document.getElementsByName("opn");
//יוצר מערך עם 2 הבחירות opn[0].checked will be true if we select the first
let win1 = document.querySelector(".win1");
let win2 = document.querySelector(".win2");
let target = document.querySelector("#target");
//מה שלמעלה אלו משתנים חדשים שהוספתי בשישי

let topModal = document.querySelector(".topModal");
let st2 = document.querySelector(".s1"); //האם זה הפוך?
let st1 = document.querySelector(".s2");
let game = document.querySelector(".game");
let imgUp = document.querySelector(".imgUp");
let imgDown = document.querySelector(".imgDown");
let nG = document.querySelector(".btn1");
let roll = document.querySelector(".btn2");
let hold = document.querySelector(".btn3");
let littleNumLeft = document.querySelector(".leftSide");
let littleNumRight = document.querySelector(".rightSide");
let numLeft = document.querySelector(".leftNum");
let numRight = document.querySelector(".rightNum");
let breakPoint = document.querySelector(".number");
let mySide = document.querySelector(".mySide");
let hisSide = document.querySelector(".hisSide");
let p1 = document.querySelector("#playerName1");
let p2 = document.querySelector("#playerName2");

// הגדרת משתנים שסוכמים נתונים/מחשבים באיזה צד המשחק
let computerLost = 0;
let howManyWins1 = 0; //סוכם מספר ניצחונות
let howManyWins2 = 0;
let sounOn = false; //אם הסאונד מופעל או לא
// מה שלמעלה הוספתי בשישיץ רק המשתנה הראשון קשור ליריב מחשב

let leftScore = 0; //סוכם סכום נק כולל של השחקן באותו תור
let rightScore = 0;
let counterMySide = 0; //סוכם את הנקודות באותו תור

hold.disabled = false; //הפתור ניתן ללחיצה
roll.disabled = false;
let firstSide = true; // משתנה שמחשב באיזה צד אני.בלחיצה על אולד מתעדכן לשקר

//הגדרות עיצוב/נראות
unSound.style.display = "block";
win1.style.visibility = "hidden";
win2.style.visibility = "hidden";
// מה שלמעלה הוספתי בשישי
st2.style.display = "none";
st1.style.display = "none";
mySide.style.background = "linear-gradient(180deg,#a72470 30%, #b47299 70%)";
hisSide.style.background = "linear-gradient(180deg,#b47299 30%, #a72470 70%)";

//הגדרות תוכן דיפולטיביות למשתנים
win1.innerText = "wins: 0";
win2.innerText = "wins: 0";
// מה שלמעלה הוספתי בשישי
numLeft.innerText = "0";
numRight.innerText = "0";
imgUp.innerHTML = '<img src="./assets/img/dice-1.png" alt="">';
imgDown.innerHTML = '<img src="./assets/img/dice-3.png" alt="">';

/*מודללל */
// Get the modal
var modal = document.querySelector("#myModal");
modal.style.display = "block";
// Get the button that opens the modal

// Get the <span> element that closes the modal
let button = document.querySelector(".close");

// When the user clicks on <span> (x), close the modal
button.addEventListener("click", () => {
  if (
    breakPoint.value.length === 0 ||
    breakPoint.value <= 0 ||
    breakPoint.value > 1000 ||
    (!opn[0].checked && !opn[1].checked)
  ) {
    breakPoint.value = "";
    alert(
      "please for continue select a target score! it has to be bigger than zero and not above 1000. and you have to select opponent"
    );
  } else {
    modal.style.display = "none";
    win1.style.visibility = "visible";
    win2.style.visibility = "visible";
    target.style.position = "block";
    target.innerText = `your target score: ${breakPoint.value}`;
    rightScore = 0;
    leftScore = 0;
    numRight.innerText = `${rightScore.toString()}`;
    numLeft.innerText = `${leftScore.toString()}`;
    counterMySide = 0;
    littleNumRight.textContent = `${counterMySide}`;
    littleNumLeft.textContent = `${counterMySide}`;
  }
});

nG.addEventListener("click", () => {
  computerLost = 0;
  modal.style.display = "block";
  win1.style.visibility = "hidden";
  win2.style.visibility = "hidden";
  breakPoint.value = "";
  target.innerText = "";
  topModal.style.display = "none";
  mySide.style.background = "linear-gradient(180deg,#a72470 30%, #b47299 70%)";
  hisSide.style.background = "linear-gradient(180deg,#b47299 30%, #a72470 70%)";
  p1.style.color = "rgb(66, 64, 64)";
  p2.style.color = "rgb(66, 64, 64)";
  hold.disabled = false;
  roll.disabled = false;
  st1.innerText = "";
  st2.innerText = "";
  firstSide = true; //ברירת מחדל שתמיד יתחיל משחק חדש בשמאל
});

//בעת לחיצה על רמקול הצליל עוצר/מתחיל
val.addEventListener("click", () => {
  if (sounOn) {
    mySound.pause();
    sounOn = false;
    unSound.style.display = "block";
  } else {
    mySound.play();
    sounOn = true;
    unSound.style.display = "none";
  }
});

//פונקציונליות שעובדת במשחק עם שני יריבים

hold.addEventListener("click", () => {
  if (opn[0].checked) {
    if (firstSide) {
      leftScore += counterMySide;
      numLeft.innerText = `${leftScore.toString()}`;
      littleNumLeft.textContent = "0";
      firstSide = false;
      hisSide.style.background =
        "linear-gradient(180deg,#a72470  30%, #b47299 70%)";

      mySide.style.background =
        "linear-gradient(180deg, #b47299  30%, #a72470 70%)";
    } else if (!firstSide) {
      rightScore += counterMySide;
      numRight.innerText = `${rightScore.toString()}`;
      littleNumRight.textContent = "0";
      firstSide = true;
      mySide.style.background =
        "linear-gradient(180deg,#a72470  30%, #b47299 70%)";

      hisSide.style.background =
        "linear-gradient(180deg, #b47299  30%, #a72470 70%)";
    }

    counterMySide = 0;

    console.log(counterMySide);
  }
  if (opn[1].checked) {
    if (firstSide) {
      leftScore += counterMySide;
      numLeft.innerText = `${leftScore.toString()}`;
      littleNumLeft.textContent = "0";
      counterMySide = 0;
      roll.disabled = true;
      hold.disabled = true;
      hisSide.style.background =
        "linear-gradient(180deg,#a72470  30%, #b47299 70%)";
      mySide.style.background =
        "linear-gradient(180deg, #b47299  30%, #a72470 70%)";
      //להגריל מספר תורות
      //לעשות כמספר התורות את ההטלת קוביה, שינוי התמונות וחישוב המספר הקטן והצגתו
      //בסוף הפעולה- עדכון המספר הגדול ואיפוס המחשב תור. שני הלחצנים לחיצים

      let countCurrent = 5; //לשנות להגרלת מספר במקום 5 דיפולט

      const intervalRepet = setInterval(function () {
        //הגרלת הקוביותת שינוי התמונה וחישוב
        let randomUp = Math.floor(Math.random() * 6);
        let randomDown = Math.floor(Math.random() * 6);
        imgUp.innerHTML = `${arr[randomUp]}`;
        imgDown.innerHTML = `${arr[randomDown]}`;
        counterMySide += randomUp + randomDown + 2;

        littleNumRight.textContent = `${counterMySide}`;
        //בדיקת פעולות ניצחון במחשב
        if (rightScore + counterMySide > Number(breakPoint.value)) {
          computerLost = 1;
        }
        if (rightScore + counterMySide === Number(breakPoint.value)) {
          computerLost = 2;
        }
        //סיום בדיקת פעולות ניצחון במחשב

        countCurrent--;
        if (countCurrent === 0) {
          if (computerLost === 0) {
            clearInterval(intervalRepet);
            roll.disabled = false;
            hold.disabled = false;
            rightScore += counterMySide;
            counterMySide = 0;
            // numRight.innerText = `${rightScore.toString()}`;
            // littleNumRight.textContent = "0";
            // firstSide = true;
          } else if (computerLost === 1) {
            //במצב שהמחשב מפסיד
            clearInterval(intervalRepet);
            mySide.style.background = "#2f2e30";
            p1.style.color = "rgb(160, 28, 52)";
            st1.style.display = "block";
            st2.style.display = "block";
            st2.innerText = "YOU WIN!";
            st1.innerText = "YOU LOSE!";
            roll.disabled = true;
            hold.disabled = true;
            numRight.innerText = `${(rightScore + counterMySide).toString()}`;
            counterMySide = 0;
            littleNumLeft.textContent = `${counterMySide}`;
            //איפוס הפרמטרים כדי להתחיל משחק חדש מאופ
            howManyWins1++;
            win1.innerText = `wins: ${howManyWins1}`;
            winning.play();
          } else if (computerLost === 2) {
            hisSide.style.background = "#2f2e30";
            p2.style.color = "rgb(160, 28, 52)";
            st1.style.display = "block";
            st2.style.display = "block";
            st1.innerText = "YOU WIN!";
            st2.innerText = "YOU LOSE!";
            roll.disabled = true;
            hold.disabled = true;
            numRight.innerText = `${(rightScore + counterMySide).toString()}`;
            counterMySide = 0;
            littleNumRight.textContent = `${counterMySide}`;
            howManyWins2++;
            win2.innerText = `wins: ${howManyWins2.toString()}`;
            winning.play();
          }
        }
      }, 2000);
    }
  }
});

roll.addEventListener("click", () => {
  if (opn[0].checked) {
    // בדיקת המנצח

    let randomUp = Math.floor(Math.random() * 6);
    let randomDown = Math.floor(Math.random() * 6);
    imgUp.innerHTML = `${arr[randomUp]}`;
    imgDown.innerHTML = `${arr[randomDown]}`;

    counterMySide += randomUp + randomDown + 2;

    if (firstSide) {
      if (randomUp === 0 && randomDown === 0) {
        dubbleDice.play();
        counterMySide = 0;
      }
      if (randomUp === 5 && randomDown === 5) {
        dubbleDice.play();
        counterMySide = 0;
        firstSide = false;
      }
      littleNumLeft.textContent = `${counterMySide}`;

      if (leftScore + counterMySide > Number(breakPoint.value)) {
        hisSide.style.background = "#2f2e30";
        p2.style.color = "rgb(160, 28, 52)";
        st1.style.display = "block";
        st2.style.display = "block";
        st1.innerText = "YOU WIN!";
        st2.innerText = "YOU LOSE!";
        roll.disabled = true;
        hold.disabled = true;
        numLeft.innerText = `${(leftScore + counterMySide).toString()}`;
        counterMySide = 0;
        littleNumLeft.textContent = `${counterMySide}`;

        //איפוס הפרמטרים כדי להתחיל משחק חדש מאופס
        howManyWins2++;
        win2.innerText = `wins: ${howManyWins2.toString()}`;
        winning.play();
      }
      if (leftScore + counterMySide === Number(breakPoint.value)) {
        mySide.style.background = "#2f2e30";
        p1.style.color = "rgb(160, 28, 52)";
        st1.style.display = "block";
        st2.style.display = "block";
        st2.innerText = "YOU WIN!";
        st1.innerText = "YOU LOSE!";
        roll.disabled = true;
        hold.disabled = true;
        numLeft.innerText = `${(leftScore + counterMySide).toString()}`;
        counterMySide = 0;
        littleNumRight.textContent = `${counterMySide}`;
        //איפוס הפרמטרים כדי להתחיל משחק חדש מאופ
        howManyWins1++;
        win1.innerText = `wins: ${howManyWins1}`;
        winning.play();
      }
    } else {
      if (randomUp === 0 && randomDown === 0) {
        dubbleDice.play();
        counterMySide = 0;
      }
      if (randomUp === 5 && randomDown === 5) {
        dubbleDice.play();
        counterMySide = 0;
        firstSide = true;
      }
      littleNumRight.textContent = `${counterMySide}`;
      if (rightScore + counterMySide > Number(breakPoint.value)) {
        mySide.style.background = "#2f2e30";
        p1.style.color = "rgb(160, 28, 52)";
        st1.style.display = "block";
        st2.style.display = "block";
        st2.innerText = "YOU WIN!";
        st1.innerText = "YOU LOSE!";
        roll.disabled = true;
        hold.disabled = true;
        numRight.innerText = `${(rightScore + counterMySide).toString()}`;
        counterMySide = 0;
        littleNumLeft.textContent = `${counterMySide}`;
        //איפוס הפרמטרים כדי להתחיל משחק חדש מאופ
        howManyWins1++;
        win1.innerText = `wins: ${howManyWins1}`;
        winning.play();
      }
      if (rightScore + counterMySide === Number(breakPoint.value)) {
        hisSide.style.background = "#2f2e30";
        p2.style.color = "rgb(160, 28, 52)";
        st1.style.display = "block";
        st2.style.display = "block";
        st1.innerText = "YOU WIN!";
        st2.innerText = "YOU LOSE!";
        roll.disabled = true;
        hold.disabled = true;
        numRight.innerText = `${(rightScore + counterMySide).toString()}`;
        counterMySide = 0;
        littleNumRight.textContent = `${counterMySide}`;
        howManyWins2++;
        win2.innerText = `wins: ${howManyWins2.toString()}`;
        winning.play();
      }
    }
  } else if (opn[1].checked) {
    // במשחק מול המחשב
    if (firstSide) {
      numRight.innerText = `${rightScore.toString()}`;
      littleNumRight.textContent = "0";
      let randomUp = Math.floor(Math.random() * 6);
      let randomDown = Math.floor(Math.random() * 6);
      imgUp.innerHTML = `${arr[randomUp]}`;
      imgDown.innerHTML = `${arr[randomDown]}`;

      counterMySide += randomUp + randomDown + 2;

      if (randomUp === 0 && randomDown === 0) {
        dubbleDice.play();
        counterMySide = 0;
      }
      if (randomUp === 5 && randomDown === 5) {
        //מה קורה במשחק מול מחשב שיש 66 וזה עובר למחשב
        dubbleDice.play();
        counterMySide = 0;
        roll.disabled = true;
      }
      littleNumLeft.textContent = `${counterMySide}`;

      if (leftScore + counterMySide > Number(breakPoint.value)) {
        hisSide.style.background = "#2f2e30";
        p2.style.color = "rgb(160, 28, 52)";
        st1.style.display = "block";
        st2.style.display = "block";
        st1.innerText = "YOU WIN!";
        st2.innerText = "YOU LOSE!";
        roll.disabled = true;
        hold.disabled = true;
        numLeft.innerText = `${(leftScore + counterMySide).toString()}`;
        counterMySide = 0;
        littleNumLeft.textContent = `${counterMySide}`;

        //איפוס הפרמטרים כדי להתחיל משחק חדש מאופס
        howManyWins2++;
        win2.innerText = `wins: ${howManyWins2.toString()}`;
        winning.play();
      }
      if (leftScore + counterMySide === Number(breakPoint.value)) {
        mySide.style.background = "#2f2e30";
        p1.style.color = "rgb(160, 28, 52)";
        st1.style.display = "block";
        st2.style.display = "block";
        st2.innerText = "YOU WIN!";
        st1.innerText = "YOU LOSE!";
        roll.disabled = true;
        hold.disabled = true;
        numLeft.innerText = `${(leftScore + counterMySide).toString()}`;
        counterMySide = 0;
        littleNumRight.textContent = `${counterMySide}`;
        //איפוס הפרמטרים כדי להתחיל משחק חדש מאופ
        howManyWins1++;
        win1.innerText = `wins: ${howManyWins1}`;
        winning.play();
      }
    }
  }
});

// קוד של גיטאב ראשון לפני הוספת יריב מחשב וצליל
