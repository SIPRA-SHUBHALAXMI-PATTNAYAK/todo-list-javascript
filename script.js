//Select dom elements
const input=document.getElementById("todo-input")
const addBtn=document.getElementById("add-button")
const list=document.getElementById("todo-list")


//trying to load saved todos from local storage(if any todo is there)
const saved=localStorage.getItem('todos');
const todos=saved? JSON.parse(saved) :[]; 

//function to save todos to local storage
function saveTodos()
{
localStorage.setItem('todos', JSON.stringify(todos));
}


//function to create a dom node for a todo object and append it to the list
function createTodonode(todo,index)
{
    const li=document.createElement('li');

    //checkbox to toggle completion
    const checkbox =document.createElement('input');
    checkbox.type='checkbox';
    checkbox.checked=!!todo.completed;

    checkbox.addEventListener('change',()=>{

        todo.completed=checkbox.checked;

        //visual feedback strick through the completed tasks
         textSpan.style.textDecoration=todo.completed? 'line-through' : '';
        saveTodos();
    })

    //text of the todo
    const textSpan=document.createElement('span');
    textSpan.textContent=todo.text;
    if(todo.completed)
    {
        textSpan.style.textDecoration='line-through';
    }

    //add double click event listner to edit todo
    textSpan.addEventListener("dblclick",()=>
    {
        const newtext=prompt("edit todo", todo.text);
        if(newtext!== null)
        {
            todo.text=newtext.trim()
            textSpan.textContent=todo.text;
            saveTodos();
        }
    })

    //delete todo button
    const delBtn=document.createElement('button');
    delBtn.textContent="Delete";
    delBtn.addEventListener('click', ()=>
    {
        todos.splice(index,1);
        render();
        saveTodos();
    })


    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(delBtn);
    return li;


}


//function to rander whole todo list from todos array
function render()
{

    list.innerHTML='';

    //create each item
    todos.forEach((todo,index) =>
    {
        const node=createTodonode(todo,index);
        console.log(node)
        list.appendChild(node)
    });
}


function addTodo(){
const text=input.value.trim();
if(!text){
    return
}

//push a new todo object
todos.push({text: text,completed:false});
input.value='';
render()
saveTodos()
}

addBtn.addEventListener("click",addTodo);
render();