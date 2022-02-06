const quoteApiUrl = "https://api.quotable.io/random?minLength=80&maxLength=100";
const quoteSection = document.getElementById("textShow")
const userInput = document.getElementById("textInput")

let quote = "";
let time = 10;
let timer = "";
let mistakes = 0;

const renderNewQuote = async () => {
    const response = await fetch(quoteApiUrl);
    let data = await response.json();
    quote = data.content;
    
    let arr = quote.split("").map(value => {
        return "<span class='quote-chars'>" + value +"</span>";
    });
    quoteSection.innerHTML += arr.join("");
    console.log(arr);
};

userInput.addEventListener("input", () => {
    let quoteChars = document.querySelectorAll(".quote-chars");
    quoteChars = Array.from(quoteChars);
    
    let userInputChars = userInput.value.split("");
    quoteChars.forEach((char,index) => {

        if(char.innerText == userInputChars[index]){
            char.classList.add("success");
            console.log(correct);
        }

        else if(userInputChars[index] == null){
            if(char.classList.contains("success")){
                char.classList.remove("success");
            }
            else{
                char.classList.remove("fail");
            }      
        }
        else{
            if(!char.classList.contains("fail")){
                mistakes+=1;
                char.classList.add("fail");
            }
        }
        let check = quoteChars.every(element=>{
            return element.classList.contains("success");
        });
        if(check){
            console.log("test")
            displayResult();
        }

    });
});

function updateTimer(){
    if(time == 0){
        displayResult();
    } else{
      document.getElementById("timer").innerText = --time;
    }
}

const timeReduce = () => {
    time = 10;
    timer = setInterval(updateTimer, 1000);
};

const displayResult = () => {
    document.getElementById("result").style.display = "block";
    clearInterval(timer);
    userInput.disabled = true;
    let timeTaken = 1;
    if(time != 0){
        timeTaken = (10 - time)/100;
    }
    document.getElementById("wpm").innerText = (userInput.value.length / 5 / timeTaken).toFixed(2) + "WPM";
};

const startTest = () => {
    mistakes = 0;
    timer = "";
    userInput.disabled=false;
    timeReduce();
};

var lastentry = "";

$('#textInput').one("keyup",function(event) {
   if($('#textInput').val() != lastentry) {
        console.log("this should only output once")
        startTest();
   }
   lastentry = $('#textInput').val()
});


window.onload = () => {
    userInput.value = "";
    renderNewQuote();
}

const retry = () => {
    console.log("retry")
    timer="";
};
