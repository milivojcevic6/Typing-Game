document.addEventListener('DOMContentLoaded', function () {

    const wordRain = document.querySelector('.word-rain');
    const userInput = document.getElementById('user-input');
    const scoreElement = document.getElementById('score');
    const pauseButton = document.getElementById('pauseButton');
    const pauseIcon = document.getElementById('pauseIcon');

    // Game state variables
    let isPaused = false;
    let score = 0;
    let frozenWords = 0;
    let wordSpeed = 2;
    let wordFrequency = 1000;

    // Event listeners
    pauseButton.addEventListener('click', togglePause);
    userInput.addEventListener('input', checkInput);

    // Initial game setup
    startGame();

    function startGame() {
        setInterval(createWord, wordFrequency);
        setInterval(updateGameParameters, 5000);
    }

    function createWord() {
        if (isPaused) return;

        const word = document.createElement('div');
        word.className = 'word';
        word.style.left = Math.random() * 60 + 'vw';
	word.style.top = '6%';
        word.innerText = generateRandomWord();
        wordRain.appendChild(word);

        const animationDuration = 50;
        word.style.animation = `fall linear ${animationDuration}s`;

    function checkPosition() {
        const wordRect = word.getBoundingClientRect();
        const isWordAtBottom = wordRect.bottom >= window.innerHeight * 0.83;

        //console.log('Current location of the word:', wordRect.bottom, window.innerHeight);
        if (isWordAtBottom && !word.classList.contains('frozen')) {
            freezeWord(word);
            frozenWords++;
            if (frozenWords >= 3) {
            	endGame();
            }
        } else {
            requestAnimationFrame(checkPosition);
        }
    }

    requestAnimationFrame(checkPosition);
    }

    function togglePause() {
        isPaused = !isPaused;
        updatePauseButtonIcon();
        
        const existingWords = document.querySelectorAll('.word');
        existingWords.forEach(word => {
            word.style.animation = isPaused ? 'none' : 'fall linear infinite';
        });
    }

    function updatePauseButtonIcon() {
    	const iconUrl = isPaused ? 'url("play.png")' : 'url("pause.png")';
    	pauseButton.style.backgroundImage = iconUrl;
    }

    function updateGameParameters() {
        wordSpeed += 0.1;
        wordFrequency -= 100;
    }

    function generateRandomWord() {
        const words = ['apple', 'banana', 'orange', 'grape', 'kiwi'];
        return words[Math.floor(Math.random() * words.length)];
    }

    function checkInput() {
        const input = userInput.value.trim().toLowerCase();
        const currentWords = document.querySelectorAll('.word');

    	for (let i = 0; i < currentWords.length; i++) {
        	const word = currentWords[i];
        	const wordText = word.innerText.toLowerCase();

        	if (wordText === input) {
            		word.remove();
            		userInput.value = '';
            		updateScore(10); // You can adjust the score based on the difficulty
            		break; // Stop iterating after removing the first matching word
        	}
    	}
    }


function freezeWord(word) {
    word.classList.add('frozen');
    word.style.animation = 'none'; // Stop the falling animation

    // Get the latest position of the falling word
    const wordRect = word.getBoundingClientRect();

    // Pause the animation for the frozen word
    word.style.animationPlayState = 'paused';
}


    function updateScore(points) {
        score += points;
        scoreElement.textContent = score;
    }

    function endGame() {
	isPaused = true;
        alert('Game Over! Your score: ' + score);
    }
});
