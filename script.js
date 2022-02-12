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
        console.log('this should only output once')
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

}



window.onload = () => {
    processQuote() // displays quote when window is loaded
    inputQuote.disabled = false;
    inputQuote.value="";
    document.querySelector(".wpm").style.display="none"; // hides wpm when page is loaded
}





















// inputQuote.addEventListener('input', () => { // detects if key is pressed inside the input box
//     let quoteChars = document.querySelectorAll('.quoteCharacters');
//     quoteChars=Array.from(quoteChars);
//     let userInputChars = inputQuote.value.split(''); // creates an array of the inputted characters

//     quoteChars.forEach((char,i) => { // iterates through each character in the quote
//         if(char.innerText == userInputChars[i])  // if user enters the correct character
//         {
//             char.classList.add('correct');
//         }
//         else if(userInputChars[i]==null)  // if user has not entered anything
//         {
//             if(char.classList.contains('correct'))
//             {
//                 char.classList.remove('correct')
//             } // adds green colour to character
//             else
//             {
//                 char.classList.remove('incorrect')
//             }
//         }
//         else{ // if user enters the incorrect character
//             if(!char.classList.contains('incorrect')){ 
//                 char.classList.add('incorrect') // adds red colour if the character is wrong and not already coloured
//             }
//         }
//     });
// });




// const processQuote = async () => {
//     const response = await fetch(apiUrl);
//     let data = await response.json();
//     quote=data.content;
//     let arr=quote.split('').map(value => {
//         return "<span class='quoteCharacters'>"+ value + "</span>";
//     });
//     showQuote.innerHTML+=arr.join('');
// };




// BACKUP QUOTE RENDERER
// const processQuote = async () => {
//     const response = await fetch(apiUrl);
//     let data = await response.json();
//     quote=data.content;
//     let arr=quote.split('').map(value => {
//         return "<span class='quote-chars'>"+ value + "</span>";
//     });
//     quoteSection.innerHTML+=arr.join('');
// };
