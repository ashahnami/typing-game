const apiUrl = "https://api.quotable.io/random?minLength=150&maxLength=200"; // link to the random quote API
const showQuote = document.getElementById('showQuote'); // holds HTML element which displays the quote
const inputQuote = document.getElementById('inputQuote');
let quote="";
let i=0;
let index = mistakes=0;

function getQuote(){
    return fetch(apiUrl) // makes HTTP request to the API URL
    .then(response=>response.json()) // returns response object and converts it into a .json
    .then(data=>data.content) // returns data content
}

async function processQuote(){
    const quote = await getQuote() // calls for getQuote() and awaits for its completion before continuing

    let arr=quote.split('').map((value) => {
        return "<span class='quoteCharacters'>"+ value + "</span>";}); // creates array of the characters and wraps each character in a span tag

    showQuote.innerHTML+=arr.join(''); // joins the array elements together to form the quote
}

inputQuote.addEventListener('input', () => {
    let characters = document.querySelectorAll('.quoteCharacters');
    let typedChar = inputQuote.value.split('')[index];
    if(typedChar==null){
        if(index > 0){
            index--;
        }
        if(characters[index].classList.contains('incorrect')){
            mistakes--;
        }
        characters[index].classList.remove('correct', 'incorrect');
    } else {
        if(characters[index].innerText == typedChar) {
            characters[index].classList.add("correct");
        } else {
            mistakes++;
            characters[index].classList.add("incorrect");
        }
        index++;
    }
});



var lastentry = "";

$('#inputQuote').one("keyup",function(event) { // detects key input only once
    if($('#inputQuote').val() != lastentry) { // checks whether value of input box has changed
        decreaseTime();
    }
    lastentry = $('#inputQuote').val();
});




const decreaseTime = () => {
    time = 15; // set starting time
    timer = setInterval(() => {
        if(time==0){
            showResult(); // show score if time remaining = 0
        }else{
            document.getElementById('timer').innerText = --time; // decrement time remaining by 1
        }
    }, 1000);
}


const showResult = () => {
    document.querySelector(".wpm").style.display="block"; // displays score element
    inputQuote.disabled = true; // disabled the input box
    clearInterval(timer) // stop the time from decreasing
    var wpm = ((index-mistakes)/5*4).toFixed(2);
    document.getElementById('wpm').innerText = wpm + "wpm"; // calculate wpm and display score on screen
    

    // NEW CODE
    const xhr = new XMLHttpRequest(); // creates XML HTTP request object

    xhr.onload = function(){ // states what happens when the request is successful
        console.log('successful');
    };

    xhr.open("POST", "highscore.php"); // opens HTTP request
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("wpm="+wpm); // sends the typing speed

}


window.onload = () => {
    processQuote() // displays quote when window is loaded
    inputQuote.disabled = false;
    inputQuote.value="";
    document.querySelector(".wpm").style.display="none"; // hides wpm when page is loaded
}
