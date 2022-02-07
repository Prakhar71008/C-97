var firebaseConfig = {
    apiKey: "AIzaSyAqmSKAWnsQyUhYEuafaRbuCdA36R3qg1g",
    authDomain: "kwitter-c6dbd.firebaseapp.com",
    databaseURL: "https://kwitter-c6dbd-default-rtdb.firebaseio.com",
    projectId: "kwitter-c6dbd",
    storageBucket: "kwitter-c6dbd.appspot.com",
    messagingSenderId: "83662404758",
    appId: "1:83662404758:web:7d7c89a74fdea32cd9d6b7"
  };
  firebase.initializeApp(firebaseConfig);

user_name=localStorage.getItem("user_name");
room_name=localStorage.getItem("room_name");

function send(){
    msg=document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
        name:user_name,
        message:msg,
        like:0
    }
    );
    document.getElementById("msg").value="";
}

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
    firebase_message_id = childKey;
    message_data = childData;
//Start code
console.log(firebase_message_id);
console.log(message_data);
name=message_data["name"];
message=message_data["message"];
like=message_data["like"];

name_with_tag="<h4> "+ name+"<img src='tick.png' class='user_tick'> </h4>";
message_with_tag="<h4 class='message_h4'> " +message+ "</h4>";
like_button="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
span_with_tag="<span class='glyphicon glyphicon-thumbs-up'>Like:"+like+"</span></button><hr>";

row=name_with_tag+message_with_tag+like_button+span_with_tag;
document.getElementById("output").innerHTML+= row;

//End code
 } });  }); }
getData();

function updateLike(message_id)
{

    button_id=message_id;
    console.log("clicked on the like button"+message_id);
    likes=document.getElementById(button_id).value;
    console.log("number of like "+likes);
    u_Likes=Number(likes)+1;
    console.log(u_Likes);
    firebase.database().ref(room_name).child(message_id).update({
    like:u_Likes
    });
}

function logout(){
    localStorage.removeItem("room_name");
    localStorage.removeItem("user_name");
    window.location="index.html";
}


