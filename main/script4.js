// start function and link to first keypress

const apiUrl = "http://api.quotable.io/random?minLength=200";
const textShow = document.getElementById("textShow");
const textInput = document.getElementById("textInput");

let time = 30;
let quote = "";
let timer = "";
chars = mistakes = 0;

const processQuote = async () => {
    const response = await fetch(apiUrl);
    let data = await response.json();
    quote = data.content;
    let arr = quote.split("").map(value => {
        return "<span class='quote-chars'>" + value + "</span>";
    });
    textShow.innerHTML += arr.join("");
};

// NEW

const start = () => {
    chars = mistakes = 0;
    timer = "";
}

// NEW

var lastentry = "";

$('#textInput').one("keyup",function(event) {
    if($('#textInput').val() != lastentry) {
        start();
    }
    lastentry = $('#textInput').val()
});

window.onload = () => {
    textInput.value = "";
    processQuote();
}
