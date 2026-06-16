let imageData = "";




// =========================
// 記録画面表示
// =========================


document
.getElementById("startButton")
.addEventListener("click",function(){


document
.getElementById("record")
.classList
.remove("hidden");


});





// =========================
// 写真取得
// =========================


document
.getElementById("image")
.addEventListener("change",function(e){


let file=e.target.files[0];


if(!file){
return;
}


let reader=new FileReader();



reader.onload=function(){

imageData=reader.result;

};


reader.readAsDataURL(file);


});





// =========================
// 保存
// =========================


document
.getElementById("saveButton")
.addEventListener("click",function(){



let note={


id:Date.now(),


image:imageData,


comment:
document
.getElementById("comment")
.value,


x:Math.random()*300,


y:Math.random()*300,


date:
new Date()
.toLocaleDateString()


};





let notes=
JSON.parse(
localStorage.getItem("notes")
)
|| [];




notes.push(note);



localStorage.setItem(
"notes",
JSON.stringify(notes)
);



displayGarden();

displayNotes();



alert("植物園に追加しました");


});







// =========================
// デジタル植物園表示
// =========================


function displayGarden(){



let notes=
JSON.parse(
localStorage.getItem("notes")
)
|| [];



let garden=
document.getElementById("garden");



garden.innerHTML="";




notes.forEach(function(note){



let plant=document.createElement("div");


plant.className="plant";



plant.style.left=
note.x+"px";


plant.style.top=
note.y+"px";




plant.innerHTML=`


<img src="${note.image}">


<p>
${note.comment}
</p>


<button class="delete">
削除
</button>


`;




garden.appendChild(plant);





// ドラッグ移動

plant.onmousedown=function(e){



let offsetX=
e.offsetX;


let offsetY=
e.offsetY;




document.onmousemove=function(e){



let rect=
garden.getBoundingClientRect();



note.x=
e.clientX-
rect.left-
offsetX;


note.y=
e.clientY-
rect.top-
offsetY;




plant.style.left=
note.x+"px";


plant.style.top=
note.y+"px";


};



document.onmouseup=function(){



document.onmousemove=null;



savePosition(note);



};



};






// 削除

plant
.querySelector(".delete")
.onclick=function(){


deletePlant(note.id);


};



});



}








// =========================
// 配置保存
// =========================


function savePosition(note){



let notes=
JSON.parse(
localStorage.getItem("notes")
)
|| [];



let target=
notes.find(
n=>n.id===note.id
);



target.x=note.x;

target.y=note.y;



localStorage.setItem(
"notes",
JSON.stringify(notes)
);



}






// =========================
// 削除
// =========================


function deletePlant(id){



let notes=
JSON.parse(
localStorage.getItem("notes")
)
|| [];



notes=
notes.filter(
n=>n.id!==id
);



localStorage.setItem(
"notes",
JSON.stringify(notes)
);



displayGarden();

displayNotes();


}







// =========================
// ノート表示
// =========================


function displayNotes(){



let notes=
JSON.parse(
localStorage.getItem("notes")
)
|| [];



let area=
document.getElementById("notes");



area.innerHTML="";



notes.forEach(function(note){



area.innerHTML+=`

<div class="card">


<img src="${note.image}">


<p>
${note.comment}
</p>


<p>
${note.date}
</p>


</div>


`;



});



}






displayGarden();

displayNotes();