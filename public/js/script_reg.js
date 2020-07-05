function register(){
    var pass=document.getElementById("pass").value;
    var cpass=document.getElementById("cpass").value;
    if(pass === cpass)
    {
        console.log("password same");
    }
    else
    {
        alert("Password & Confirm password does not match");
    }
}