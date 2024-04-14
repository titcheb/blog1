let buttonClicked;
const button=document.getElementById("button1");
button.addEventListener("click", function(e){
    buttonClicked=true;
    showdiv();
    alert("asdsa")
})
div1=document.getElementById("showDiv");

function showdiv() { 
     alert("asd")
    if(buttonClicked==true){
       div1.style.display="none"
    }
 }