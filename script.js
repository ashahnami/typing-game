const apiUrl = "https://api.quotable.io/random?minLength=70&maxLength=110"; // link to the random quote API
const showQuote = document.getElementById('showQuote'); // holds HTML element which displays the quote
const inputQuote = document.getElementById('inputQuote');
let quote="";
let i=0;

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



inputQuote.addEventListener('input', () => { // detects if key is pressed inside the input box
    let quoteChars = document.querySelectorAll('.quoteCharacters');
    quoteChars=Array.from(quoteChars);
    let userInputChars = inputQuote.value.split(''); // creates an array of the inputted characters

    quoteChars.forEach((char,i) => {
        if(char.innerText == userInputChars[i]){char.classList.add('correct');} // if user enters the correct character
        else if(userInputChars[i]==null){ // if user has not entered anything
            if(char.classList.contains('correct')){char.classList.remove('correct')} // adds green colour to character
            else{char.classList.remove('incorrect')}
        }
        else{ // if user enters the incorrect character
            if(!char.classList.contains('incorrect')){ 
                char.classList.add('incorrect') // adds red colour if the character is wrong and not already coloured
            }
        }
    });
});




processQuote()














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
