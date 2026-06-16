let imageData = "";


// 記録画面を表示

document
.getElementById("startButton")
.addEventListener("click", function(){


document
.getElementById("record")
.classList
.remove("hidden");


});





// 写真読み込み

document
.getElementById("image")
.addEventListener("change", function(e){


let file = e.target.files[0];


let reader = new FileReader();



reader.onload = function(){

imageData = reader.result;

};



reader.readAsDataURL(file);



});






// 保存

document
.getElementById("saveButton")
.addEventListener("click", function(){



let feelings=[];


document
.querySelectorAll(
'input[type="checkbox"]:checked'
)
.forEach(function(item){


feelings.push(item.value);


});



let note={


image:imageData,


feeling:feelings,


comment:
document
.getElementById("comment")
.value,


date:
new Date()
.toLocaleDateString()


};




let notes =
JSON.parse(
localStorage.getItem("notes")
)
|| [];



notes.push(note);



localStorage.setItem(
"notes",
JSON.stringify(notes)
);



displayNotes();



});







// ノート表示

function displayNotes(){


let notes =
JSON.parse(
localStorage.getItem("notes")
)
|| [];



let area =
document.getElementById("notes");



area.innerHTML="";



notes.forEach(function(note){


area.innerHTML += `


<div class="card">


<img src="${note.image}">


<h3>
${note.feeling.join(" / ")}
</h3>


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



displayNotes();