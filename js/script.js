// checking if there is an account at the local storage
if( localStorage.getItem("musicShare_name") == null && new RegExp("Index.html","gi").test(window.location.href))
{
  window.location.href = "loginForm.html";
}

const timeline = document.getElementById("home");
const arr = localStorage.getItem("musicShare_arr")? JSON.parse(localStorage.getItem("musicShare_arr")): [
  { id:0001, song: "purge", artiste:"Bas", user: "Marnjo", likes:{users:[],total:0}, comments:[] },
  { id:0002, song: "4am", artiste:"rema 6lack etc.", user: "Floffy", likes:{users:[],total:0}, comments:[] },
  { id:0003, song: "nobody", artiste:"dj neptune", user: "Mutegi", likes:{users:[],total:0}, comments:[] },
  { id:0004, song: "lemme know", artiste:"ladipoe", user: "Marnjo", likes:{users:[],total:0}, comments:[] },
  { id:0005, song: "risk", artiste:"Bas", user: "Floffy", likes:{users:[],total:0}, comments:[] },
  { id:0006, song: "dumebi", artiste:"rema", user: "Mutegi", likes:{users:[],total:0}, comments:[] },
  { id:0007, song: "pompei", artiste:"Bastille", user: "Marnjo", likes:{users:[],total:0}, comments:[] }
]
let arrofIds = arr.map( n => n.id);

window.addEventListener('load', () => {
  if( localStorage.arr === null ||localStorage.musicShare_arr === undefined )
  {
    localStorage.setItem("musicShare_arr",JSON.stringify(arr));
    updateTimeline();
  }
  else{
    localStorage.musicShare_arr = JSON.stringify(arr);
    updateTimeline();
  }
});

function updateTimeline()
{
  timeline.innerHTML = "";
  let h1 = document.createElement("h1");
  h1.innerText = "Timeline";
  timeline.appendChild(h1);

  arr.forEach( elem => createPosts(elem));
  localStorage.musicShare_arr = JSON.stringify(arr);
}

function updateMem()
{
  localStorage.musicShare_arr = JSON.stringify(arr);
}

function numExtractor(num)
{
  num = num.split("");
  return parseInt(String(num.filter( n => !isNaN(parseInt(n)))));
}

function createPosts(elem)
  {
    let post = document.createElement("div");
    let postContent = document.createElement("p");
    let postLike = document.createElement("button");
    let infoP = document.createElement("p");
    let likesSpan = document.createElement("span")
    let commentsSpan = document.createElement("span");
    let commentBtn = document.createElement("button");
    let commentDiv = document.createElement("div");
    let commentInput = document.createElement("input");
    let postComment = document.createElement("button");

    // setting the up post
    post.setAttribute("class","post")
    postContent.innerHTML = `<strong>${elem.user}</strong> says: Have you heard
     <strong>${elem.song}</strong> by <strong>${elem.artiste}</strong>`;

    postLike.textContent = "like";
    postLike.addEventListener('click', () =>{
      let numHolder = elem.likes.total;
      if( !elem.likes.users.some( n => n == localStorage.musicShare_name ))
      {
        numHolder++;
        elem.likes.total++;
        timeline.querySelectorAll(".post")[ elem.id - 1 ].querySelector("span").textContent = `Likes: ${numHolder}`;
        elem.likes.users.push(localStorage.musicShare_name);
        postLike.setAttribute("style","background-color:blue");
        updateMem()
      }
      else
      {
        numHolder--;
        elem.likes.total--;
        timeline.querySelectorAll(".post")[ elem.id - 1 ].querySelector("span").textContent = `Likes: ${numHolder}`;
        elem.likes.users = elem.likes.users.filter( n => n != localStorage.musicShare_name);
        postLike.removeAttribute("style");
        updateMem();
      }
    });
    
    if( elem.likes.users.some( n => n == localStorage.musicShare_name )) postLike.setAttribute("style","background-color:blue");

    if( elem.likes.total > 1 ) likesSpan.textContent = `likes: ${elem.likes.total} `;
    else{ likesSpan.textContent = ` like: ${elem.likes.total} `; }
    if( elem.likes.total > 1 ) commentsSpan.textContent = `Comments: ${elem.comments.length}`;
    else{ commentsSpan.textContent = ` Comment: ${elem.likes.total}`; }

    commentInput.setAttribute("type", "text");
    commentDiv.setAttribute("style", "display:none");
    postComment.textContent= "Post Comment";
    commentBtn.textContent = "Comment";
    commentBtn.addEventListener('click', ()=> {
      if( commentDiv.style.display == "none" )
      {
        commentDiv.style.display = "block"
      }
      else{commentDiv.style.display = "none"}
    })
    postComment.addEventListener('click', ()=> {
      let pComment = document.createElement("p");
      pComment.innerHTML = `<strong>${localStorage.musicShare_name}</strong> 
      commented: ` + commentInput.value;
      elem.comments.push({user: localStorage.musicShare_name, comment: commentInput.value});
      commentInput.value = "";
      post.appendChild(pComment);
      timeline.querySelectorAll(".post")[ elem.id - 1 ].querySelectorAll
        ("span")[1].textContent = `Comments: ${elem.comments.length}`;
      updateMem();
    });

    commentDiv.appendChild(commentInput);
    commentDiv.appendChild(postComment);
    infoP.appendChild(likesSpan);
    infoP.appendChild(commentsSpan);
    post.appendChild(postContent);
    post.appendChild(infoP);
    post.appendChild(postLike);
    post.appendChild(commentBtn);
    post.appendChild(commentDiv);
    elem.comments.forEach( comment => {
      let newComment = document.createElement("p");
      newComment.innerHTML = `<strong>${comment["user"]}</strong> 
      commented: ` + comment["comment"];
      post.appendChild(newComment);
    })
    timeline.appendChild(post);
  }

// works on the post section
let postBtn = document.getElementById("post");
postBtn.addEventListener('click', (e) => {
  let artiste = document.querySelectorAll("#addPost input")[0].value;
  document.querySelectorAll("#addPost input")[0].value = "";
  let song = document.querySelectorAll("#addPost input")[1].value;
  document.querySelectorAll("#addPost input")[1].value = "";

  let id = arrofIds[arrofIds.length - 1] + 1;

  arr.push({ "id":id, "song": song, "artiste": artiste, "user": 
    localStorage.musicShare_name, likes:{users:[],total:0}, comments:[] });
  arrofIds.push(id);
  updateTimeline();
});

// works on the search section
let searchBtn = document.getElementById("searchBtn");
let results = document.createElement("div");
searchBtn.addEventListener('click', () => {
  results.innerHTML = "";
  let searchInput = document.querySelectorAll('input')[document.querySelectorAll('input').length-1]
  let searchValue = searchInput.value;
  let myRegExp = RegExp(searchValue,"gi");

const searchDiv = document.getElementById("search");
let toggler = false;
  arr.forEach(a => {
    if( myRegExp.test(a["artiste"]) || myRegExp.test(a["song"]) || myRegExp.test(a["user"]))
    {
      results.innerHTML = "";
      let searchP = document.createElement("p");
      searchP.textContent = `${a["artiste"]} ${a["song"]} ${a["user"]}`;
      toggler = true;
      searchP.addEventListener('mouseover', () => searchP.style.color = "blue");
      searchP.addEventListener('mouseout', () => searchP.removeAttribute('style'))
      results.appendChild(searchP);
      searchDiv.appendChild(results);
    }
  });
  if(toggler == false){
    results.innerHTML = "";
    let searchP = document.createElement("p");
    searchP.innerHTML = `sorry <strong>${searchValue}</strong> was not found`;
    results.appendChild(searchP);
    searchDiv.appendChild(results);
  };
});

// logout
let logout = document.querySelector("#logOut").querySelector("button");
logout.addEventListener('click', () => {
  if(confirm("Are you sure you want to log out?")) 
  {
    localStorage.musicShare_name = null
    window.location.href = "loginForm.html";
  };
});