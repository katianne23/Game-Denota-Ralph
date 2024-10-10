const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#lives"),
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        lives: 3,
        isGameStarted: false,
    },
    actions: {
        timerId: null,
        countDownTimerId: null,
    },
};

function countDown() {
    if (state.values.isGameStarted) {
        state.values.currentTime--;
        state.view.timeLeft.textContent = state.values.currentTime;

        if (state.values.result >= 40 && state.values.currentTime <= 0) {
            clearInterval(state.actions.countDownTimerId);
            clearInterval(state.actions.timerId);
            alert("Vitória! Você conseguiu 40 acertos em 1 minuto!");
        } else if (state.values.currentTime <= 0) {
            clearInterval(state.actions.countDownTimerId);
            clearInterval(state.actions.timerId);
            alert("Game Over! O seu resultado foi: " + state.values.result);
        }
    }
}

function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.1;
    audio.play();
}

function randomSquare() {
    if (state.values.isGameStarted) {
        state.view.squares.forEach((square) => {
            square.classList.remove("enemy");
        });

        let randomNumber = Math.floor(Math.random() * 9);
        let randomSquare = state.view.squares[randomNumber];
        randomSquare.classList.add("enemy");
        state.values.hitPosition = randomSquare.id;
    }
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        const handleHit = () => {
            if (state.values.isGameStarted) {
                if (square.id === state.values.hitPosition) {
                    state.values.result++;
                    state.view.score.textContent = state.values.result;
                    state.values.hitPosition = null;
                    playSound("hit");
                } else {
                    state.values.lives--;
                    state.view.lives.textContent = `x${state.values.lives}`;

                    if (state.values.lives <= 0) {
                        clearInterval(state.actions.countDownTimerId);
                        clearInterval(state.actions.timerId);
                        alert("Game Over! Suas vidas acabaram.");
                    }
                }
            }
        };

        square.addEventListener("mousedown", handleHit);
        square.addEventListener("touchstart", (e) => {
            e.preventDefault(); 
            handleHit();
        });
    });
}

function startGame() {
    state.values.isGameStarted = true;
    state.actions.timerId = setInterval(randomSquare, 1000);
    state.actions.countDownTimerId = setInterval(countDown, 1000);
}

function initialize() {
    addListenerHitBox();
}


initialize();


