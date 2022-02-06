// showing random quote

const apiUrl = "http://api.quotable.io/random?minLength=200";
const textShow = document.getElementById("textShow");
const textInput = document.getElementById("textInput");

let time = 30;
let quote = "";
let timer = "";
chars = mistakes = 0;


// new

const processQuote = async () => {
    const response = await fetch(apiUrl);
    let data = await response.json();
    quote = data.content;
    let arr = quote.split("").map((value) => {
        return "<span class='quote-chars'>" + value + "</span>";
    });
    textShow.innerHTML += arr.join("");
};


window.onload = () => {
    textInput.value = "";
    processQuote();
}

// new


