if(localStorage.getItem("count_timer")){
    var count_timer = localStorage.getItem("count_timer");
} else {
    timer=document.querySelector(".time").innerHTML;
    count_timer=timer.slice(0,2)*60;
}
var minutes = parseInt(count_timer/60);
var seconds = parseInt(count_timer%60);
function countDownTimer(){
    if(seconds < 10){
        seconds= "0"+ seconds ;
    }if(minutes < 10){
        minutes= "0"+ minutes ;
    }
    if(seconds<=120 && seconds>0){
        document.querySelector(".container").style.display="flex";
    }else if(seconds<=0){
        window.location = "http://localhost:3000/"
    }
    document.querySelector(".time").innerHTML =minutes+":"+seconds;
    if(count_timer <= 0){
         localStorage.clear("count_timer");
    } else {
        count_timer = count_timer -1 ;
        minutes = parseInt(count_timer/60);
        seconds = parseInt(count_timer%60);
        localStorage.setItem("count_timer",count_timer);
        setTimeout("countDownTimer()",1000);
    }
}
setTimeout("countDownTimer()",1000);