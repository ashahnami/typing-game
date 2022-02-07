const apiUrl = "https://api.quotable.io/random?minLength=70&maxLength=110"; // link to the random quote API
const showQuote = document.getElementById('showQuote'); // holds HTML element which displays the quote

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

processQuote()
















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
