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

//User Sign Up Validation

function Signup(){
    
    var name = document.getElementById("name");
    var username = document.getElementById("username");
    var password = document.getElementById("password");
    var cpassword = document.getElementById("cpassword");
    var address = document.getElementById("address");
    
    //Name section
    if(name.value.length < 4){
        return alert('Name is too small');
    }
    else{
        name.innerHTML = '';
    }
    
    //Username section
    if(username.value.length <= 5){
        return alert('Username should br atleast 6 characters');
    }
    else if(/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/.test(username.value)){
        username.innerHTML = ''
    }
    else{
        return alert("Username must contain Uppercase Lowercase and Number");
    }
    
    //address section
    if(address.value.length < 10){
        return alert('Address too small');
    }
    else{
        address.innerHTML = '';
    }

    //Password section
    if(password.value.length < 7){
        return alert('Password too small');
    }
    else if(/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()])/.test(password.value)){
        password.innerHTML = '';
    }
    else{
        return alert("Password must contain Uppercase Lowercase and Special Character");
    }
    
    //Confirm Password section
    if(cpassword.value == password.value){
        cpassword.innerHTML = '';
    }
    else{
        return alert("Password donot match");
    }
   
    //multiple acc signup
    var values=[];
    var value = 
        {
        id: 1,
        fullname: name.value,
        Address:address.value,
        UserName: username.value,
        Password: password.value
    }

    console.log(values);
    if(JSON.parse(localStorage.getItem("items"))=== null){
        values.push(value);
        localStorage.setItem("items",JSON.stringify(values));
        alert("Sign Up successful");
        window.location.reload();
    }else{
        var localacc = JSON.parse(localStorage.getItem("items"));
                  localacc.map(data=>{
                    if(value.UserName == data.UserName){
                      return alert('Account exists')
                    }else{
                        value.id = data.id+1;
                        values.push(data);
                        alert("Sign Up successful");
                    }
                  });
                  values.push(value)
                  localStorage.setItem("items",JSON.stringify(values));
                  window.location.reload();
    }
}


//Login Validation
function login(){
    var user = document.getElementById("user").value;
    var pass = document.getElementById("pass").value;

    var arr=JSON.parse(localStorage.getItem("items")).filter(data=>{
        if(data.UserName == user && data.Password == pass){
           return data;
       }else{
           return null;
       }
    });

     if(arr.length == 0){
          alert('Invalid Username Or Password');
          window.location.reload();
     }else{
         if(arr[0].UserName == user && arr[0].Password == pass){
             localStorage.setItem('name',arr[0].fullname)
             localStorage.setItem('id',arr[0].id)
             alert('Login successful');
             window.location = 'shopping.html';
         }
     }
}

//popup function display

function popup(){
    var forgetPass = document.getElementById("abc");
    forgetPass.style.display = 'flex';
}

//function popup close
function popupClose(){
    var closeTab = document.getElementById("abc");
    closeTab.style.display = 'none';
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
     var arr = JSON.parse(localStorage.getItem("items"))
       arr.map(data=>{
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

//function flip
function flip(){
    var signin = document.querySelector('.signin');
    var login = document.querySelector('.login');
    login.style.display = 'none'
    signin.style.display = 'flex'
}
