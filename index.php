<!DOCTYPE html>
<html lang="en">
<head>
    <title>Typing Test</title> <!-- Sets text shown in the browser's title bar -->

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script> 

    <link rel="stylesheet" href="styles.css"> <!-- links external style sheet file -->
    <script src="script.js" defer></script> <!-- links external script file -->

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap" rel="stylesheet">

</head>
<body>

    <div class="navbar">
        <button class="register" href="">Register</button>
        <button class="login" href="">Log in</button>
    </div>

    <div class="container">
        <div class="showQuote" id="showQuote"></div> <!-- creates element which displays the quote -->
        <textarea class="inputQuote" id="inputQuote"></textarea> <!-- creates area where quote can be typed out -->
    </div>

    <div class="results">
        <div class="timer" id="timer">15</div> <!-- creates timer element -->
        <div class="wpm" id="wpm"></div> <!-- creates typing speed element -->
    </div>

</body>
</html>







