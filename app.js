window.onload=()=>{
    weather();
    timeleft();
}

//Menu Bar
pointer=()=>{
    var toggle = document.getElementById("menu");
    if(toggle.style.display == 'block'){
        toggle.style.display = 'none';
    }
    else{
        toggle.style.display =  'block';
    }
}

//Timer
var clock = document.getElementById("timer");
 function timeleft(){
    
    var h = 24;
    var m = 60;
    var s = 60;
    var stopTime = true;

    if(stopTime == true){
        stopTime = false;
        timerCycle();
    }
    
    function timerCycle(){
        if(stopTime == false){
        h= parseInt(h);
        m = parseInt(m);
        s = parseInt(s);
        s--;

        if(s == 0){
            m--;
            s = 60;
        }
        if(m == 0){
            h--;
            m = 60;
            s = 60;
        }
        if(h == 0){

            return;
        }

        if(h < 10|| h == 0){
            h = '0'+h;
        }
        if(m < 10|| m == 0){
            m = '0'+m;
        }
        if(s < 10|| s == 0){
            s = '0'+s;
        }
        
        clock.innerHTML = h + ':' + m + ':' + s;

        setTimeout(timerCycle,1000);
    }
 }
}

//Home page Weather & Date Forcast
let weather = ()=>{

var date = document.getElementById("msg1");
var temp = document.getElementById("msg2");
var months = ['January','Febuary','March','April','May','June','July','August','September','October','November','December'];
var city = 'West Bengal';
var aip = 'b4b2e0f7ca15eafbe4c8c3a160a41f18'

axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${aip}`)
.then(res=>{
    var data = res.data;
    console.log(data);
    data.main.temp -= 273;
    temp.innerHTML = Math.round(data.main.temp) + '°C';

    var currdate = new Date();
    var cdate = currdate.getDate();
    var cmonth = currdate.getMonth();
    var currmonth = months[cmonth];
    date.innerHTML = cdate + 'th '+ currmonth;
})
.catch(err=>{
    console.log(err);
})
}