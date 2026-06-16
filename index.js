let imageData = "";


document
.getElementById("image")
.addEventListener(
"change",
function(e){


let file=e.target.files[0];


let reader=new FileReader();


reader.onload=function(){

imageData=reader.result;

};


reader.readAsDataURL(file);


});