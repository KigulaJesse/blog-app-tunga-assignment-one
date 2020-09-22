const name = document.querySelector(".name")
const password = document.querySelector(".password")
const addUser = document.querySelector(".addBtn")
const accounts = document.querySelector(".accounts")
const loginname = document.querySelector(".loginname")
const loginpassword = document.querySelector(".loginpassword")
const loginUser = document.querySelector(".loginBtn")
const title = document.querySelector(".title")
const content = document.querySelector(".content")
const createBtn = document.querySelector(".createBtn")
const blogs = document.querySelector(".blogs")
const blogie = document.querySelector(".blogie")

//create store in local storage
function createUserStore() {
    //localStorage.clear();
    let userstore = JSON.parse(localStorage.getItem("accounts"));
    if (userstore === null) {
        localStorage.setItem("accounts", JSON.stringify([]));
        return userstore;
    }
    else {
        return userstore;
    }
}

createUserStore();

//create user account
function createAccount() {
    let userstore = createUserStore();
    // userstore.push(name.value);
    //localStorage.clear();
    const user_name = name.value;
    const user_password = password.value

    const user = {
        user_name,
        user_password
    }

    if (userstore.find(element => element.user_name === name.value)) {
        alert('Username already taken')
    }
    else {
        if (user_name.trim().length !== 0) {
              userstore.push(user);
              localStorage.setItem("accounts", JSON.stringify(userstore));
            //keep value of the authenticated user in localStorage variable loggedIn
              localStorage.setItem('loggedIn' , name.value);
            //direct to the blog.html page for this new user
              window.location.replace('blog.html');

        } else {
            alert("Your todo is empty")
        }
    }
}

// addUser.onclick = createAccount

//user log into account
function login() {
    let userstore = createUserStore();

    const auth_name = loginname
    const auth_pass = loginpassword

    if (userstore.find(element => element.user_name === auth_name.value)) {
        if ((userstore.find(element => element.user_name === auth_name.value && element.user_password === auth_pass.value))) {
              //keep value of the authenticated user in localStorage variable loggedIn
                localStorage.setItem('loggedIn' , auth_name.value);
              //direct to the blog.html page after login
                window.location.replace('blog.html');
              //call displayTodo to display the blogs for this authenticated user
                displayTodo();
        }
        else {
            alert('incorrect password')
        }
    }
    else {
        alert('Your credentials dont match our records')
    }

}

function logout(){
  //destroy the localstorage variable loggedIn when logging out
    localStorage.removeItem('loggedIn');
    window.location.replace('login.html');
}


//create blogstore in local storage
function createBlogStore() {
    let blogstore = JSON.parse(localStorage.getItem("blogs"));
    if (blogstore === null) {
        localStorage.setItem("blogs", JSON.stringify([]));
        return blogstore;
    }
    else {
        return blogstore;
    }
}

createBlogStore();

const inputEl = document.querySelector(".inputEl");
const addButton = document.querySelector(".addToDoBtn");
const todos = document.querySelector(".todos");

function createTodoStore() {
  let todostore = JSON.parse(localStorage.getItem("todos"));
  if (todostore === null) {
    localStorage.setItem("todos", JSON.stringify([]));
    return todostore;
  } else {
    return todostore;
  }
}

createTodoStore();
//* create Todo
function createTodo() {
  
  let todostore = createTodoStore();

  //create an object which has the authenticated user and the blog he has posted
    const todoinputValue = {
                user_name : localStorage.getItem('loggedIn'),
                blogvalue : inputEl.value
    };

  if (inputEl.value.trim().length !== 0) {
    //push the created object into the todstore array as a string using stringify
    todostore.push(JSON.stringify(todoinputValue));
    localStorage.setItem("todos", JSON.stringify(todostore));
    //display blogs 
    displayTodo();
    deleTodo();
      updateTodo();
  }
  else{
    alert("Your todo is empty")
    return
  }
}

//* displayTodo
function displayTodo() {
  let todostore = createTodoStore();
  todos.innerHTML = "";
  count = 0;
  todostore.forEach(function (todoitem, itemid) {
    
      const singleTodo = document.createElement("p");
      const delbtn = document.createElement("button");
      const updatebtn = document.createElement("button");

      orla = JSON.parse(todoitem);
      if(orla.user_name === localStorage.getItem('loggedIn')){
        singleTodo.style.display = "block";
      }
      else{
        singleTodo.style.display = "none";
      }
    

      delbtn.innerHTML = "delete";
      delbtn.className = "btn btn-danger delBtn";

  
      singleTodo.innerText = orla.blogvalue;
      updatebtn.innerHTML = "update";
      updatebtn.className = "btn btn-warning updateBtn";

      singleTodo.innerHTML = `<span>${orla.blogvalue}</span>`;
      singleTodo.appendChild(delbtn);
      singleTodo.appendChild(updatebtn);

      delbtn.className = `btn btn-danger delBtn ${itemid} `;
      
        todos.appendChild(singleTodo); //inject each todo within the div of class todos.
      
      
  });
}


// *updateTodo
function updateTodo() {
  const updateButtons = document.querySelectorAll(".updateBtn");
  let todostore = createTodoStore();

  updateButtons.forEach(function (button, index) {
    button.onclick = function () {
      //alert(index);
      //alert(todostore);
      const todo = this.parentElement.children[0];
      //alert(todo.innerText);
      const updateTodo = prompt(`updateTODO :${todo.innerText}`);
      const blognow = {
        user_name : localStorage.getItem('loggedIn'),
        blogvalue : updateTodo
      };
      todostore.splice(index, 1, JSON.stringify(blognow));
      //alert(todostore)
      localStorage.setItem("todos", JSON.stringify(todostore));
      displayTodo();
      location.reload();
    };
  });
}


//* Delete Todo
function deleTodo() {
  const delButtons = document.querySelectorAll(".delBtn");
  let todostore = createTodoStore();
console.log(delButtons);
  console.log(delButtons);
  delButtons.forEach(function (button, index) {
    button.onclick = function () {
      todostore.splice(index, 1);
      localStorage.setItem("todos", JSON.stringify(todostore));
      console.log(todostore);
      displayTodo();
      location.reload();
    };
  });
}


displayTodo();
deleTodo();
updateTodo();
// inputEl.onchange = createTodo
addButton.onclick = createTodo;