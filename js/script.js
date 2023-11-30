const randomurl = "https://api.adviceslip.com/advice";
const SearchButton = document.querySelector("#SearchAdvice");
const searchtext = document.querySelector("#seatchText");
const searchContend = [];
const queryContend = document.querySelector(".container");
const randtext = document.querySelector("#randomtext");
var maxTextIndex ;

console.log(queryContend);

SearchButton.addEventListener("click", ()=> {
    if(searchtext.value != "")
    {
        queryContend.innerHTML = "";
        const searchByurl = `https://api.adviceslip.com/advice/search/${searchtext.value}`;
        randContend(searchByurl).then((data) => {
            data.slips.map((element, index) =>{
                queryContend.innerHTML += `
                <div class="card cart-margin">
                <div class="card-header">
                    Life Advice ${index+1}
                </div>
                <div class="card-body">
                    <blockquote class="blockquote mb-0">
                        <p>${element.advice}</p>
                        <footer class="blockquote-footer">Quotes from API </footer>
                </blockquote>
                </div>
                </div>`;            
            });
        }).catch((error)=>alert("Search Query Quote Not Available!.."));
    }
    else
    {alert("Enter the Search Quote")}
});



const randContend = async(url)=>{
    const res = await fetch(url);
    const contend = await res.json(); 
    return contend;
}

const getBannerContend = ()=>{
    randContend(randomurl).then((data) => {
        const bannerCont = data.slip.advice;
        //console.log(bannerCont);
        maxTextIndex = bannerCont.length;
        typing(textIndex , bannerCont);
    });
}

window.onload = getBannerContend();
const tableValue = [];

const getTableContend = (turl)=>{
    randContend(turl).then((data) => {
        const bannerCont = data.slip.advice;
        queryContend.innerHTML += `
                <div class="card cart-margin">
                <div class="card-header">
                Life Advice
                </div>
                <div class="card-body">
                    <blockquote class="blockquote mb-0">
                        <p>${data.slip.advice}</p>
                        <footer class="blockquote-footer">Quotes from API </footer>
                </blockquote>
                </div>
                </div>`;            
            });
}
window.onload = ()=>{
    for(let i = 0; i < 5; i++)
    {
        getTableContend(`https://api.adviceslip.com/advice/${i}`);
    }
};


var sPerChar = 0.15; 
var sBetweenWord = 1.5;
var textIndex = 0; 


function typing(textIndex, text) {
    var charIndex = 0; 
    var maxCharIndex = text.length - 1; 
    const typeInterval = setInterval(()=> {
        randtext.innerHTML += text[charIndex]; 
        if (charIndex == maxCharIndex) {
            clearInterval(typeInterval);
            setTimeout(function() { deleting(textIndex, text) }, sBetweenWord * 1000); 
            
        } else {
            charIndex += 1; 
        }
    }, sPerChar * 1000); 
}
function deleting(textIndex, text) {
    var minCharIndex = 0; 
    var charIndex = text.length - 1; 

    var typeInterval = setInterval(function () {
        randtext.innerHTML = text.substr(0, charIndex); 
        if (charIndex == minCharIndex) {
            clearInterval(typeInterval);
            textIndex + 1 == maxTextIndex ? textIndex = 0 : textIndex += 1; 
            getBannerContend();
            //setTimeout(function() { typing(textIndex, textArr[textIndex]) }, sBetweenWord * 1000); 
        } else {
            charIndex -= 1; 
        }
    }, sPerChar * 1000);
}