
history.pushState(null,null,location.href);
window.onpopstate = function (){
  history.go(1);
};


window.onload = ()=>{
    showName();
    covid19updates();
    //firstPage();
}
//show the name of user in nav bar
function showName(){
    var name = document.getElementById("name");
    name.innerHTML =`<i class="fa fa-user" aria-hidden="true" style="font-size: 15px;"> `+ localStorage.getItem("name");
}


//To Search The Products
function searchProducts(){
        var msg = document.getElementById("message")
        var searchbar = document.getElementById("input").value;
        const options = {
        method: 'GET',
        url: 'https://apidojo-forever21-v1.p.rapidapi.com/products/search',
        params: {query: searchbar, rows: '60', start: '0'},
       headers: {
        'x-rapidapi-key': 'e0dc19835cmshd90bb8669a276fep139f16jsn98f072bea061',
        'x-rapidapi-host': 'apidojo-forever21-v1.p.rapidapi.com'             
        }
      };
     
      axios.request(options).then(function (response) {
          var data = response.data;
          console.log(data);
          var products = '<h2></h2>';
        data.response.docs.forEach(item => {   
              products += `<div class="grid">
                            <div><img src="${item.thumb_image}"height="200px"width="200px"></div> 
                            <div class = "strength">${item.title}</div>
                            <div class = "strength2">Price: ₹${(item.price*72.91).toFixed(2)} INR</div>
                            <div class="division"><button class="click">Add to Cart</button></div>
                            </div>`
       });
          msg.innerHTML = products

          var item = [];
          var carts = document.querySelectorAll('.click');
          for(let i=0;i<carts.length;i++){
              carts[i].addEventListener('click',(e)=>{
               let items = {
                  id:i+1,
                  name:data.response.docs[i].title,
                  price: data.response.docs[i].price,
                  no:1
                }
                if(JSON.parse(localStorage.getItem("value"))===null){
                  item.push(items);
                  localStorage.setItem("value",JSON.stringify(item))
                  alert("Added to Cart Successfully");
                  window.location.reload()
                }else{
                  var localitem = JSON.parse(localStorage.getItem("value"));
                  localitem.map(data=>{
                    if(items.id == data.id){
                      alert('Item already in cart quantity increased')
                      items.no = data.no +1;
                    }else{
                      item.push(data)
                    }
                  });
                  item.push(items);
                  localStorage.setItem("value",JSON.stringify(item))
                  alert("Added to Cart Successfully");
                  window.location.reload()
                }
              })
      }
        }).catch(function (error) {
          console.error(error);
          msg.innerHTML = 'No results found';
      });
}

//covid19 live updates
function covid19updates(){
    var covid = document.getElementById("covid-Play1");
    const options = {
       method: 'GET',
       url: 'https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/total',
       params: {country: 'India'},
       headers: {
         'x-rapidapi-key': '0902ef57d9mshac1a6c5a8e7cc69p1c1041jsne96022e1dc03',
         'x-rapidapi-host': 'covid-19-coronavirus-statistics.p.rapidapi.com'
       }
     };
     
     axios.request(options).then(function (response) {
         var data = response.data;
         console.log(data);

         covid.innerHTML = 'Confirmed: '+data.data.confirmed +'\xa0 \xa0 \xa0'+'Recovered: '+data.data.recovered+' \xa0 \xa0 \xa0  '+'Deaths: '+data.data.deaths;
     }).catch(function (error) {
         console.error(error);
     });
}

//sort dropown
 function sortProducts(){
    var msg = document.getElementById("message") 
    var searchbar = document.getElementById("input").value;
    var one = document.getElementById("sort1").value;
    var two = document.getElementById("sort2").value;
     const options = {
         method: 'GET',
         url: 'https://apidojo-forever21-v1.p.rapidapi.com/products/search',
         params: {query: searchbar, rows: '60', start: '0',sort: one ,color_groups: two},
         headers: {
          'x-rapidapi-key': 'e0dc19835cmshd90bb8669a276fep139f16jsn98f072bea061',
          'x-rapidapi-host': 'apidojo-forever21-v1.p.rapidapi.com' 
         }
      };
        
       axios.request(options).then(function (response) {
           var data = response.data;
           console.log(data);
           var products = '<h2></h2>';
         data.response.docs.forEach(item => {   
               products += `<div class="grid">
                            <div><img src="${item.thumb_image}"height="200px"width="200px"></div> 
                             <div class = "strength">${item.title}</div>
                            <div class = "strength2">Price: ₹${(item.price*72.91).toFixed(2)} INR</div>
                            <div><button class="click">Add to Cart</button></div>
                            </div>`
        });
          msg.innerHTML = products


          var item = [];
          var carts = document.querySelectorAll('.click');
          for(let i=0;i<carts.length;i++){
              carts[i].addEventListener('click',(e)=>{
               let items = {
                  id:i+1,
                  name:data.response.docs[i].title,
                  price: data.response.docs[i].price,
                  no:1
                }
                if(JSON.parse(localStorage.getItem("value"))===null){
                  item.push(items);
                  localStorage.setItem("value",JSON.stringify(item))
                  alert("Added to Cart Successfully");
                  window.location.reload()
                }else{
                  var localitem = JSON.parse(localStorage.getItem("value"));
                  localitem.map(data=>{
                    if(items.id == data.id){
                      alert('Item already in cart quantity increased')
                      items.no = data.no +1;
                    }else{
                      item.push(data)
                    }
                  });
                  item.push(items);
                  localStorage.setItem("value",JSON.stringify(item))
                  alert("Added to Cart Successfully");
                  window.location.reload()
                }
              })


      }
        }).catch(function (error) {
          console.error(error);
          msg.innerHTML = 'No results found';
      });
}

//color dropdown
function sortByColor(){
    var msg = document.getElementById("message") 
    var searchbar = document.getElementById("input").value;
    var one = document.getElementById("sort1").value;
    var two = document.getElementById("sort2").value;

    const options = {
        method: 'GET',
        url: 'https://apidojo-forever21-v1.p.rapidapi.com/products/search',
        params: {query: searchbar, rows: '60', start: '0',sort: one, color_groups: two},
        headers: {
          'x-rapidapi-key': 'e0dc19835cmshd90bb8669a276fep139f16jsn98f072bea061',
          'x-rapidapi-host': 'apidojo-forever21-v1.p.rapidapi.com' 
        }
       };
                
         axios.request(options).then(function (response) {
           var data = response.data;
           console.log(data);
           var products = '<h2></h2>';
           data.response.docs.forEach(item => {   
           products += `<div class="grid">
                         <div><img src="${item.thumb_image}"height="200px"width="200px"></div> 
                         <div class = "strength">${item.title}</div>
                         <div class = "strength2">Price: ₹${(item.price*72.91).toFixed(2)} INR</div>
                         <div><button class="click">Add to Cart</button></div>
                         </div>`
             });
            msg.innerHTML = products
            var item = [];
          var carts = document.querySelectorAll('.click');
          for(let i=0;i<carts.length;i++){
              carts[i].addEventListener('click',(e)=>{
               let items = {
                  id:i+1,
                  name:data.response.docs[i].title,
                  price: data.response.docs[i].price,
                  no:1
                }
                if(JSON.parse(localStorage.getItem("value"))===null){
                  item.push(items);
                  localStorage.setItem("value",JSON.stringify(item))
                  alert("Added to Cart Successfully");
                  window.location.reload()
                }else{
                  var localitem = JSON.parse(localStorage.getItem("value"));
                  localitem.map(data=>{
                    if(items.id == data.id){
                      alert('Item already in cart quantity increased')
                      items.no = data.no +1;
                    }else{
                      item.push(data)
                    }
                  });
                  item.push(items);
                  localStorage.setItem("value",JSON.stringify(item))
                  alert("Added to Cart Successfully");
                  window.location.reload()
                }
              })
      }
        }).catch(function (error) {
          console.error(error);
          msg.innerHTML = 'No results found';
      });
}

//when the page loads
function firstPage(){
    var msg = document.getElementById("message")
        
        const options = {
        method: 'GET',
        url: 'https://apidojo-forever21-v1.p.rapidapi.com/products/search',
        params: {query: 'dress', rows: '60', start: '0',sort: 'newest'},
       headers: {
        'x-rapidapi-key': 'e0dc19835cmshd90bb8669a276fep139f16jsn98f072bea061',
        'x-rapidapi-host': 'apidojo-forever21-v1.p.rapidapi.com'              
        }
      };
     
      axios.request(options).then(function (response) {
          var data = response.data;
          console.log(data);
          var products = '<h2></h2>';
        data.response.docs.forEach(item => {   
              products += `<div class="grid">
                            <div><img src="${item.thumb_image}"height="200px"width="200px"></div> 
                            <div class = "strength">${item.title}</div>
                            <div class = "strength2">Price: ₹${(item.price*72.91).toFixed(2)} INR</div>
                            <div><button class="click">Add to Cart</button></div>
                            </div>`
       });
          msg.innerHTML = products
          var item = [];
          var carts = document.querySelectorAll('.click');
          for(let i=0;i<carts.length;i++){
              carts[i].addEventListener('click',(e)=>{
               let items = {
                  id:i+1,
                  name:data.response.docs[i].title,
                  price: data.response.docs[i].price,
                  no:1
                }
                if(JSON.parse(localStorage.getItem("value"))===null){
                  item.push(items);
                  localStorage.setItem("value",JSON.stringify(item))
                  alert("Added to Cart Successfully");
                  window.location.reload()
                }else{
                  var localitem = JSON.parse(localStorage.getItem("value"));
                  localitem.map(data=>{
                    if(items.id == data.id){
                      alert('Item already in cart quantity increased');
                      items.no = data.no +1;
                    }else{
                      item.push(data)
                    }
                  });
                  item.push(items);
                  localStorage.setItem("value",JSON.stringify(item))
                  alert("Added to Cart Successfully");
                  window.location.reload()
                }
              })
      }
        }).catch(function (error) {
          console.error(error);
          msg.innerHTML = 'No results found';
      });
}

//increase the cart value

var cartNumbr = document.getElementById("cart")
let no =0;
JSON.parse(localStorage.getItem("value")).map(data=>{
  no += data.no;
});
cartNumbr.textContent = '( '+no+' )';

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
function popupClose(){
  var closeTab = document.getElementById('abc');
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
