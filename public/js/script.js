function cgpa(){
var m1=document.getElementById("m1").value;
var m2=document.getElementById("m2").value;
var m3=document.getElementById("m3").value;

var sum=parseInt(m1)+parseInt(m2)+parseInt(m3);
var avg=parseFloat(sum/3);
alert(avg);
}