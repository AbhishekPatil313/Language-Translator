const selectTag = document.querySelectorAll("select");
const fromText = document.querySelector(".from-text");
const toText = document.querySelector(".to-text");
exchangeIcon = document.querySelector(".exchange");
const icons  = document.querySelectorAll(".icons");
// let ele = [2,3,4,3,3,4];
// ele.forEach((ele,index)=>{
//     console.log(ele + " " + index);
// })
let translateBtn = document.querySelector("button");
selectTag.forEach((tag,id)=>{

    for(const code in country){
        let option = document.createElement("option");
        option.value=code;
        option.innerText=country[code];
        if(id==0 && code=="en-GB"){
            option.defaultSelected=country[code];
        }
        else if((id==1 && code=="hi-IN")){
            option.defaultSelected=country[code];
        }
     
        // let option = `<option value="${code}">${country[code]}</option>`;
        tag.append(option);
    }
});
exchangeIcon.addEventListener("click",()=>{
    let temp = fromText.value;
    let lang = selectTag[0].value;
    selectTag[0].value=selectTag[1].value;
    selectTag[1].value=lang;
    fromText.value=toText.value;
    toText.value=temp;

});
icons.forEach(icon=>{
    icon.addEventListener("click",function (event){
        let utter;
        if(event.target.classList.contains("from-copy")){
            navigator.clipboard.writeText(fromText.value);

        }
        else if (event.target.classList.contains("to-copy")){
            console.log("to copy clicked !!!")
            navigator.clipboard.writeText(toText.value);
        }
      
        else if (event.target.classList.contains("from-volume")){
           utter= new SpeechSynthesisUtterance(fromText.value);
           utter.lang = selectTag[0].value;
           speechSynthesis.speak(utter);
        }
        else if (event.target.classList.contains("to-volume")){
            utter= new SpeechSynthesisUtterance(toText.value);
            utter.lang = selectTag[1].value;
            speechSynthesis.speak(utter);
        }
        

    })
})


translateBtn.addEventListener("click",()=>{
    let from= fromText.value;
    //console.log(from);
    
    let translateFrom = selectTag[0].value;
    let translateTo = selectTag[1].value;
    console.log( translateFrom,translateTo);
    let apiUri = `https://api.mymemory.translated.net/get?q=${from}&langpair=${translateFrom}|${translateTo}`;
    fetch(apiUri).then(res => res.json()).then(data=>{
       // console.log(data);
        toText.value=data.responseData.translatedText;
    })

})
