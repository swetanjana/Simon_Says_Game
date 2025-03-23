let gameseq=[];
let userseq=[];
let started=false;
let lvl=0;
let best=0;
let h3=document.querySelector("h3");
let h2=document.querySelector("h2");
let h4=document.querySelector("h4");
let startbutton=document.querySelector("#startbutton");
let btns=["yellow","red","green","blue"];
const soundMap = {
    red: new Audio("button-305770.mp3"),
    yellow: new Audio("mixkit-negative-tone-interface-tap-2569.wav"),
    green: new Audio("mixkit-quick-win-video-game-notification-269.wav"),
    blue: new Audio("mixkit-select-click-1109.wav"),
    wrong: new Audio("wrong-buzzer-6268.mp3")
};
startbutton.addEventListener("click",function(){
    if(started==false){
        console.log("game started");
        started=true;
        setTimeout(function() {
            h4.innerText = "User's turn"; 
        },600);
        levelup();
    }
})
function levelup(){
    userseq=[];
    lvl++;
    h2.innerText=`level is ${lvl}`;
    let randomIndex=Math.floor(Math.random()*4);
    let randomcolor=btns[randomIndex];
    gameseq.push(randomcolor);
    console.log(gameseq);
    let randombutton=document.querySelector(`.${randomcolor}`);
   userflashUp(randombutton); 
}
function userflashUp(btn){
    let userColor = btn.getAttribute("id");
    if (soundMap[userColor]) {
        soundMap[userColor].play();
    }
    btn.classList.add("userflash");
    setTimeout(function(){
     btn.classList.remove("userflash")
    },250);
 }
 function checkans(idx){
    if(userseq[idx]===gameseq[idx]){
        console.log("same value");
        if(userseq.length==gameseq.length){
            setTimeout( flash_from_start,600);
        }
    }
    else{
        h2.innerText=`Game Over! and your score was ${lvl} press start button to start again`;
        wrongbuttonsound();
        flashwrong();
        highestscore();
        reset();
    }
 }
 function flash_from_start() {
    h4.innerText="computer's turn";
    for (let i = 0; i < gameseq.length; i++) {
        let current = gameseq[i];
        let randombutton = document.querySelector(`.${current}`);
        setTimeout(function() {
            userflashUp(randombutton);
        }, i * 600); 
    }
    setTimeout(function() {
        h4.innerText = "User's turn"; 
    }, gameseq.length * 800);
    setTimeout(levelup, gameseq.length * 600); 
}
function btnpress(){
    let btn=this;
    userflashUp(btn);
    userColor=btn.getAttribute("id");
    console.log(userColor);
    userseq.push(userColor);
    checkans(userseq.length-1);
}
let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnpress);
}
function highestscore(){
    if(lvl>best){
        best=lvl;
      h3.innerText=`Highest score : ${best} `;
    }
}
function reset(){
    h4.innerText="";
    started=false;
    gameseq=[];
    userseq=[];
    lvl=0;
}
function wrongbuttonsound(){
    soundMap["wrong"].play();
}
function flashwrong(){
    startbutton.classList.remove("flash-wrong");
    void startbutton.offsetWidth;
    startbutton.classList.add("flash-wrong");
        setTimeout(function(){
        startbuttton.classList.remove("flash-wrong")
        },250);
}
