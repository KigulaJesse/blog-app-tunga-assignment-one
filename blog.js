//variables
const inputEl =document.querySelector(".inputEl")
const addButton = document.querySelector(".createBtn")
const blogs= document.querySelector(".blogs")
const bloglist=[]

addButton.onclick = createBlog

function createBlog(){
    bloglist.push(inputEl.value);
    const singleBlog = document.createElement("p")
    const delbtn = document.createElement("button")
    delbtn.innerHTML = "x"
    delbtn.className = "btn btn-dazger delBtn"

    bloglist.forEach(function (item, id) {
        singleBlog.innerText = item;
        singleTodo.appendChild(delbtn)
        delbtn.className = `btn btn-danger delBtn ${itemid} `
    }
    );
    blogs.appendChild(singleBlog); //inject each todo within the div of class todos.

    // deleTodo()
}