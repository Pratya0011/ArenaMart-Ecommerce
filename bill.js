history.pushState(null,null,location.href);
window.onpopstate = function (){
  history.go(1);
};


var shadd = document.getElementById("shipping");
var biadd = document.getElementById("billing");
var Iname = document.getElementById("item_name");
var Iqunt = document.getElementById("item_quantity");
var Iprice = document.getElementById("item_price");
var Iamt = document.getElementById("item_amount");
var Itotal = document.getElementById("item_total");


shadd.innerHTML = localStorage.getItem('Sname') + `<br>`+ localStorage.getItem('Sadd')+`<br>`+localStorage.getItem('Sphn');

var id = JSON.parse(localStorage.getItem("id"))
console.log(id)

var local = JSON.parse(localStorage.getItem("items"));

var data1 =local.filter(data=>{
    if(data.id == id){
        return data;
    }
});
console.log(data1)

biadd.innerHTML = data1[0].fullname+`<br>`+data1[0].Address;
var total =0;
JSON.parse(localStorage.getItem("value")).map(data=>{
    data.price= data.price*72.91;
    total += data.price*data.no;
    Iname.innerHTML += `<div id="product-name" class="p-name">${data.name}</div>`;
    Iqunt.innerHTML += `<div id="product-name" class="p-name">${data.no}</div>`
    Iprice.innerHTML += `<div id="product-name" class="p-name">${(data.price).toFixed(2)} INR</div>`
    Iamt.innerHTML += `<div id="product-name" class="p-name">${(data.price*data.no).toFixed(2)} INR</div>`
    Itotal.innerHTML = total.toFixed(2)+' INR';
});