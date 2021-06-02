window.onload=()=>{
    showName()
    displayCartInPage()
}

//show the name of user in nav bar
function showName(){
    var name = document.getElementById("name");
    name.innerHTML =`<i class="fa fa-user" aria-hidden="true" style="font-size: 15px;"> `+ localStorage.getItem("name");
}


//increase/decrease the cart value
var cartNumbr = document.getElementById("cart")
let no =0;
JSON.parse(localStorage.getItem("value")).map(data=>{
  no += data.no;
});
cartNumbr.innerHTML = '( '+no+' )';


//display cart in page
function displayCartInPage(){
var details = document.getElementById("details");
var view = document.getElementById("total")
var total=0;
if(JSON.parse(localStorage.getItem("value")) === null){
    details.innerHTML = 'Cart is Empty';
    view.innerHTML = '₹0.00 INR'
}else{
    JSON.parse(localStorage.getItem("value")).map(data=>{
        data.price= data.price*72.91;
        details.innerHTML += `<div id="product-name" class="p-name">${data.name}</div>
                              <div id="product-price" class="abc">x${data.no}</div> 
                              <div id="product-quantity">₹${(data.price*data.no).toFixed(2)} INR</div>
                              <div><button class="button" onclick = 'addMore(${data.id})'>+</button></div>
                              <div><button class="button" onclick = 'deleteMore(${data.id})'>-</button></div>
                              <div><button id="button" onclick = "deleteItems(${data.id})">Remove</button></div>`   


                              //display total amount
                              total += data.price*data.no;
                              view.innerHTML = '₹'+total.toFixed(2);                    
        });
    }
}
//remove button
function deleteItems(id){
    var items = JSON.parse(localStorage.getItem("value"));
    var newItem = items.filter((item)=>item.id !=id)
    localStorage.setItem("value",JSON.stringify(newItem))
    window.location.reload();
}

//remove all button
function removeAll(){
    var cartNumbr = document.getElementById("cart")
    localStorage.removeItem("value");
    cartNumbr.innerHTML = '('+' '+ ')';
    window.location.reload()
}

//continue shopping button
function continueShopping(){
    window.location = "shopping.html";
}
//plus button
function addMore(id){
    var item = []
    var values = JSON.parse(localStorage.getItem("value")) ;
    console.log(values)
    values.map(data=>{
        if(id == data.id){
            data.no+=1;
            
        }
        item.push(data);
    });
    localStorage.setItem("value",JSON.stringify(item))
    window.location.reload();
}
//minus button
function deleteMore(id){
    var item = []
    var values = JSON.parse(localStorage.getItem("value")) ;
    console.log(values)
    values.map(data=>{
        if(id == data.id){
            data.no<1?data.no = 1:'';
            data.no--;
            }
        item.push(data);
    });
    localStorage.setItem("value",JSON.stringify(item))
    window.location.reload();
}
//profile dropdown
//show acc list
function showList(){
    var list = document.querySelector(".list")
    var arrow = document.querySelector(".arrow-up")
    if(list.style.display == 'none' && arrow.style.display == 'none'){
      arrow.style.display = 'flex';
      list.style.display = 'flex';
    }else{
      arrow.style.display = 'none';
      list.style.display = 'none';
    }
  }
  //Delete acc
function deleteAcc(){
    var id = JSON.parse(localStorage.getItem("id"))
    var value = JSON.parse(localStorage.getItem("items"));
      var newItem = value.filter((item)=>item.id !=id)
      localStorage.setItem("items",JSON.stringify(newItem))
      alert('Account Deleated Successfully');
      window.location = 'index.html';
  }

//function popup close
function popupClose2(){
    var closeTab = document.querySelector(".address");
    closeTab.style.display = 'none';
}
//FUNCTION POPUP OPEN
function popup2(){
    var button = document.querySelector(".address");
    button.style.display = 'flex';
}

//Shhipping popup submit button
function shipping(){
    var sname = document.getElementById("s_name").value;
    var sadd = document.getElementById("s_add").value;
    var sphn = document.getElementById("s_phn").value;
    
    //name
    if(sname.length < 4){
        return alert('Name is too small');
    }
    else{
        sname.innerHTML = '';
        localStorage.setItem('Sname',sname);
    }

    //address section
    if(sadd.length < 10){
        return alert('Address too small');
    }
    else{
        sadd.innerHTML = '';
        localStorage.setItem('Sadd',sadd)
    }

    //Contact section
    if(sphn.length < 10 && sphn.length >10){
        return alert('Incorrect Contact Number');
    }
    else{
        sphn.innerHTML = '';
        localStorage.setItem('Sphn',sphn)
    }
    window.location = 'bill.html'
}

//function popup close
function popupClose(){
    var closeTab = document.getElementById("abc");
    closeTab.style.display = 'none';
  }
  //function popup close
function popupClose1(){
    var closeTab = document.getElementById("add");
    closeTab.style.display = 'none';
  }
  //popup function display
  function popup(){
    var forgetPass = document.getElementById("abc");
    forgetPass.style.display = 'flex';
  }
  //popup function display
  function popup1(){
    var forgetPass = document.getElementById("add");
    forgetPass.style.display = 'flex';
  }
  
  //Change Password Button
  function changePassword(){
    var username = document.getElementById("New-Username").value;
    var newPass = document.getElementById("New-pass");
    var chngPass = document.getElementById("New-cpassword")
    var err = document.getElementById('error') 
   
  
    //password field is empty or length is less than 7
    if(newPass.value == '' && chngPass.value == ''){
        return alert("Enter Password");
    }
    else if(newPass.value.length < 7 && chngPass.value.length < 7){
        newPass.value = '';
        chngPass.value = '';
        return alert("Password too small");
    }
    else if(/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()])/.test(newPass.value)){
    }
    else{
        return alert("Password must contain uppercase lowercase and special character");
    }
  
    //newpass = confirm password or not
    if(newPass.value != chngPass.value){
       return alert("Password donot match");
    }
     //check the username
     var name = localStorage.getItem("name");
     var arr = JSON.parse(localStorage.getItem("items"))
     var arr1 = arr.filter(item=>{
         if(item.fullname == name){
             console.log(item)
             return item;
         }
     });
       arr1.map(data=>{
         if(data.UserName == username){
             data.Password = newPass.value;
             err.innerHTML = '';
             alert('Password Changed Successfully');
             window.location.reload()
         }else{
             err.innerHTML = 'Wrong Username'; 
         } 
     });
    
    localStorage.setItem('items',JSON.stringify(arr)); 
  }
  

  //Change Address Button
  function changeAddress(){
    var username = document.getElementById("Username").value;
    var newAdd = document.getElementById("New-add");
    var chngAdd = document.getElementById("New-cadd")
    var err = document.getElementById('error1') 
   
  
    //Address field is empty or length is less than 10
    if(newAdd.value == '' && chngAdd.value == ''){
        return alert("Enter Address");
    }
    else if(newAdd.value.length < 10 && chngAdd.value.length < 10){
        newAdd.value = '';
        chngAdd.value = '';
        return alert("Address too small");
    }
    else{
        newAdd.innerHTML =''
    }
  
    //newpass = confirm password or not
    if(newAdd.value != chngAdd.value){
       return alert("Address donot match");
    }
     //check the username
     var name = localStorage.getItem("name");
     var arr = JSON.parse(localStorage.getItem("items"))
     var arr1 = arr.filter(item=>{
         if(item.fullname == name){
             console.log(item)
             return item;
         }
        });
       arr1.map(data=>{
         if(data.UserName == username){
             data.Address = newAdd.value;
             err.innerHTML = '';
             alert('Address Changed Successfully');
             window.location.reload()
         }else{
             err.innerHTML = 'Wrong Username'; 
         } 
     });
    
    localStorage.setItem('items',JSON.stringify(arr)); 
  }
  