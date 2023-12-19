<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles.css">
    <title>Typing Game</title>
</head>
<body>
    <hr class="sky">
    <div class="game-container">
	<button id="pauseButton" aria-label="Pause">
		<span id="pauseIcon" alt="Pause"/>
	</button>
        <div class="score">Score: <span id="score">0</span></div>
        <div class="word-rain"></div>

        <textarea id="user-input" placeholder="Type here..."></textarea>
    </div>
    <hr class="ground">
    <script src="script.js"></script>
</body>
</html>
