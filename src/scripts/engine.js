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
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
        
    }

}

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert("Game Over! Sua pontuação foi de: " + state.values.result)
        location.reload()
    }
}


function playSound(audioName){
    let audio = new Audio(`../src/audios/${audioName}.m4a`)
    audio.volume = 0.0009;
    audio.play();
}

function randomSquare(){
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy")
    })

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

// function moveEnemy(){
//     state.values.timerId = setInterval(randomSquare, state.values.gameVelocity)
// }

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("click", () => {
            if(square.id === state.values.hitPosition){
                state.values.result++
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
            } else if (state.view.life.textContent > "1") {
                state.view.life.textContent--
            } else if (state.view.life.textContent = "0") {
                alert("Game Over! Sua pontuação foi de: " + state.values.result)
                location.reload()
            }
                
        });
    });
}

function initialize(){
    // moveEnemy();
    addListenerHitBox();
    countDown()
}

initialize();