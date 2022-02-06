// compare input with shown text

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





// NEW


const start = () => {
    chars = mistakes = 0;
    timer = "";
}

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
