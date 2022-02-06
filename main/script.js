// stop test and display result

// const apiUrl = "http://api.quotable.io/random?minLength=70?maxLength=100?";
const apiUrl = "http://api.quotable.io/random?minLength=100";
const textShow = document.getElementById("textShow");
const textInput = document.getElementById("textInput");

let time = 30;
let quote = "";
let timer = "";
mistakes = 0;
let index=0;

const processQuote = async () => {
    const response = await fetch(apiUrl);
    let data = await response.json();
    quote = data.content;
    let arr = quote.split("").map(value => {
        return "<span class='quote-chars'>" + value + "</span>";
    });
    textShow.innerHTML += arr.join("");
};

textInput.addEventListener("input", () => {
    let quoteChars = document.querySelectorAll(".quote-chars");
    quoteChars = Array.from(quoteChars);
    let inputChar = textInput.value.split('');
    quoteChars.forEach((char, index) => {
        if(char.innerText == inputChar[index]){
            char.classList.add('correct');
        }
        else if(inputChar[index] == null){
            if(char.classList.contains('correct')){
                char.classList.remove('correct');
            }
            else{
                char.classList.remove('incorrect');
            }
        }
        else{
            if(!char.classList.contains('incorrect')){
                mistakes +=1 ;
                char.classList.add('incorrect');
            }
        }
        let check = quoteChars.every(element=>{
            return element.classList.contains('correct');
        });
        if(check){
            showResult();
        }
    });
});

function updateTimer() {
    if(time==0){
        showResult();
    }
    else{
        document.getElementById("timer").innerText = --time;
    }
}

const decreaseTime = () => {
    time = 30;
    timer = setInterval(updateTimer, 1000);

};


const showResult = () => {
    clearInterval(timer);
    let timeTaken = 1;
    if(time!=0){
        timeTaken = 30-time;
    }
    document.getElementById('wpm').innerText = (textInput.value.length / 5 * 60 /timeTaken);
};

var lastentry = "";


$('#textInput').one("keyup",function(event) {
    if($('#textInput').val() != lastentry) {
        timer="";
        decreaseTime();
    }
    lastentry = $('#textInput').val()
});

window.onload = () => {
    textInput.value = "";
    processQuote();
}
