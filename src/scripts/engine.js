const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"), 
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        life: document.querySelector("#life"),


    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        live: 3,
    },
    actions: {
        //timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
        
    }

}

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        endTime()
        //alert("Game Over! Sua pontuação foi de: " + state.values.result)
        //location.reload()
    }
}


function playSound(audioName){
    let audio = new Audio(`../src/audios/${audioName}.m4a`)
    audio.volume = 0.0009;
    audio.play();
}

let array = [];

function getRandomNumber() {
    let randomNumber;
    do {
        randomNumber = Math.floor(Math.random() * 9);
    } while (randomNumber == array[array.length - 1]);
    array.push(randomNumber);
   return randomNumber;
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let nextNumb;
    let randomSquare;

    nextNumb = getRandomNumber();
    randomSquare = state.view.squares[nextNumb];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

// let array = [];
// array.push(Math.floor(Math.random() * 9));

// function randomSquare(){
//     state.view.squares.forEach((square) => {
//         square.classList.remove("enemy")
//     })

//     let randomNumber = array[array.length - 1];
//     let randomSquare = state.view.squares[randomNumber];
    

//     let nextNumb = Math.floor(Math.random() * 9);
//         if (randomNumber != nextNumb) {
//             array.push(nextNumb);
//             randomSquare.classList.add("enemy");
//             state.values.hitPosition = randomSquare.id;
            
//         } else if (randomNumber == nextNumb && randomNumber < 8) {
//             nextNumb++
//             array.push(nextNumb);
//             randomSquare.classList.add("enemy");
//             state.values.hitPosition = randomSquare.id;

//         } else if (randomNumber == nextNumb && randomNumber == 8) {
//             nextNumb--
//             array.push(nextNumb);
//             randomSquare.classList.add("enemy");
//             state.values.hitPosition = randomSquare.id;
//         }
// }

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition){
                state.values.result++
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                randomSquare()
                playSound("hit");
            } else if (state.view.life.textContent > "1") {
                state.view.life.textContent--
                if(square.id !== state.values.hitPosition){
                    state.values.hitPosition = null;
                    square.classList.add("squareError"); 
                    square.textContent = "X"
                    setTimeout(() => {
                        square.classList.remove("squareError")
                        square.textContent = ""
                    }, 500);
                    randomSquare()
                }   
            } else if (state.view.life.textContent = "0") {
                square.classList.add("squareError");
                square.textContent = "X"
                gameOver();
                //alert("Game Over! Sua pontuação foi de: " + state.values.result)
                //location.reload()
            }
                
        });
    });
}

function gameOver(){
    const imageUrl='./src/images/game over.png'
    swal({
      title: 'Que pena, você perdeu!',
      text: 'O seu resultado foi: ' + state.values.result,
      icon: imageUrl
    })
    .then(()=>{
        window.location.reload();
    })
  }
  function endTime(){
    const imageUrl='./src/images/time.png'
    swal({
      title: 'Oops, acabou o tempo!',
      text: 'O seu resultado foi: ' + state.values.result,
      icon: imageUrl
    })
    .then(()=>{
        window.location.reload();
    })
  }

function initialize(){
    // moveEnemy();
    randomSquare();
    addListenerHitBox();
    countDown()
}

initialize();