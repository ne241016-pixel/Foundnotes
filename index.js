let imageData = "";


// =========================
// 記録画面を表示
// =========================

document
.getElementById("startButton")
.addEventListener("click", function(){

    document
    .getElementById("record")
    .classList
    .remove("hidden");

});




// =========================
// 写真読み込み
// =========================

document
.getElementById("image")
.addEventListener("change", function(e){

    let file = e.target.files[0];


    if(!file){
        return;
    }


    let reader = new FileReader();


    reader.onload = function(){

        imageData = reader.result;

    };


    reader.readAsDataURL(file);


});




// =========================
// 保存処理
// =========================

document
.getElementById("saveButton")
.addEventListener("click", function(){


    let feelings = [];


    document
    .querySelectorAll(
        'input[type="checkbox"]:checked'
    )
    .forEach(function(item){


        feelings.push(item.value);


    });



    let note = {


        image: imageData,


        feeling: feelings,


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



    alert("発見を保存しました");



});




// =========================
// ノート表示
// =========================

function displayNotes(){


    let notes =
    JSON.parse(
        localStorage.getItem("notes")
    )
    || [];



    let area =
    document.getElementById("notes");



    area.innerHTML = "";



    notes.forEach(function(note, index){



        area.innerHTML += `


        <div class="card">


        ${
        note.image
        ?
        `<img src="${note.image}">`
        :
        "写真なし"
        }



        <h3>

        ${
        note.feeling.length > 0
        ?
        note.feeling.join(" / ")
        :
        "気づき"
        }

        </h3>



        <p>
        ${note.comment}
        </p>



        <p>
        ${note.date}
        </p>



        <button onclick="deleteNote(${index})">

        削除する

        </button>



        </div>


        `;


    });


}





// =========================
// 記録削除
// =========================

function deleteNote(index){



    if(
        !confirm(
            "この発見を削除しますか？"
        )
    ){

        return;

    }




    let notes =
    JSON.parse(
        localStorage.getItem("notes")
    )
    || [];



    notes.splice(index, 1);



    localStorage.setItem(
        "notes",
        JSON.stringify(notes)
    );



    displayNotes();



}





// =========================
// ページ読み込み時
// =========================

displayNotes();