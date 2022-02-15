<?php
header("Content-type: text/css");
?>

* {
    margin: 0; /* page cannot be vertically scrolled */
    box-sizing: border-box; 
    font-family: JetBrains Mono; /* sets all font families to JetBrains Mono */
}

body {
    display: flex;
    align-items: center; /* aligns items towards the center */
    justify-content: center;
    background-color: #D3D3D3; /* sets background colour */
    min-height: 80vh; /* moves elements downwards towards center */
}

.container{
    background-color: #FFFFFF; /* sets background colour of box */
    padding: 1rem; /* creates padding around box */
    border-radius: 0.3rem; /* curves edges of box */
    width: 800px; /* sets box width */
    max-width: 90%; /* sets maximum width of box */
    box-shadow: 0 10px 20px rgba(0,0,0,.13) /* creates shadow around box */
}

.showQuote{
    margin-bottom: 1rem;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    font-size: 18px;
}

.inputQuote{
    resize: none;
    border: 1px solid #D3D3D3;
    outline: none;
    width: 100%;
    height: 6rem;
    margin: auto;
    padding: .5rem .5rem;
    border-radius: 0.3rem;
    font-size: 18px;
}

.correct{
    background-color: #84f087;
}

.incorrect{
    background-color: #F77777;
}

.navbar{
    position: static;
    padding-bottom: 50rem;
}


.parent{
    width: 1000px;
    padding: 1rem;
}


.timer{
    padding-top: 2rem;
    font-size: 28px;
}


/* custom login and register page styling */
.container2{
    background-color: #FFFFFF; /* sets background colour of box */
            padding: 2rem; /* creates padding around box */
            border-radius: 0.3rem; /* curves edges of box */
            width: 400px; /* sets box width */
            max-width: 90%; /* sets maximum width of box */
            box-shadow: 0 10px 20px rgba(0,0,0,.13); /* creates shadow around box */
}

a{
    font-size:14px; /* sets hyperlink font size */
}
