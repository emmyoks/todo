// TODO Controller
let todoCtrl = (function(){
    
    function Todo(todo, ID){
        this.todo = todo;
        this.ID = ID;
    }
    Todo.prototype.getID = function(){
        return this.ID
    }
    todoData = [];
    return {
        addTodo: function(todo){
            let id, newItem;
            if(todoData.length > 0){
                id = (todoData[todoData.length-1].ID) + 1;
            }else{
                id = 1;
            }
            newItem = new Todo(todo, id);
            todoData.push(newItem)
            return id
        },
        getTodo: function(id){
            let idList, index;
            idList = todoData.map(curr => {
                return curr.ID;
            })
            index = idList.indexOf(id);
           return todoData[index].todo;
        },
        updateData: function(newTodo,id){
            let idList, index;
            idList = todoData.map(curr => {
                return curr.ID;
            })
            index = idList.indexOf(id);
            todoData[index].todo = newTodo;
        },
        deleteTodo: function(id){
            let idList, index;
            idList = todoData.map(curr => {
                return curr.ID;
            })
            index = idList.indexOf(id);
            todoData.splice(index,1);
            return todoData.length;
        },
        test: function(){
            console.log(todoData)
        }
    }
})()
// User Interface Controller
let UICtrl = (function(){
        let DOMString = {
            todoInput: ".input-todo",
            addBtn: ".add-btn",
            addContainer: ".add-todo",
            todoWrapper: ".todo-wrapper",
            editTodoWrapper: ".edit-todo",
            editInput:".edit-input",
            editBtn: ".edit-btn"
        }
        
        return {
            getDOMString: function(){
                return DOMString;
            },
            getInput: function(){
               let value = document.querySelector(DOMString.todoInput).value;
                return value
            },
            addTodo: function(todo,id){
                let htmlTemplate;
                    htmlTemplate = `<div class="item" id="item-${id}">
                    <div class="todo-body">${todo}</div>
                    <div class="edit-delete"><i class="fas fa-edit edit"></i>
                    <i class="fas fa-times delete"></i> </div></div>`;
                    document.querySelector(DOMString.todoWrapper).insertAdjacentHTML('beforeend', htmlTemplate);
                    document.querySelector(DOMString.todoInput).value = ""
                    document.querySelector(DOMString.addContainer).style.display = "none";
            },
            editTodo: function(currTodo){
                if(currTodo){
                    document.querySelector(DOMString.editInput).value= currTodo;
                    document.querySelector(DOMString.editTodoWrapper).style.display = "flex";
                    document.querySelector(DOMString.editInput).focus();
                }else{
                    let newTodo = document.querySelector(DOMString.editInput).value;
                    if(newTodo !== ""){
                    document.querySelector(DOMString.editTodoWrapper).style.display = "none";
                    return newTodo;}
                }
            },
            deleteTodo: function(id){
                let el = document.getElementById(id);
                el.parentNode.removeChild(el);
            }
        }
    })()

// The main Controller.
let appCtrl = (function(UI,todo){
    let DOMString, add, edit,currID,currEl;
    DOMString = UI.getDOMString();
    add = true;
    edit = false;
    
    function addTodo(){
        let input;
        if(add){
            input = UI.getInput();
            if(input !== ""){
                todoID = todo.addTodo(input);
                UI.addTodo(input, todoID);
                add = false;
            }
            
        }else{
            document.querySelector(DOMString.addContainer).style.display = "";
            document.querySelector(DOMString.todoInput).focus();
            add = true;
        }
    }
    function editTodo(id){
        let currTodo;
        currTodo = todo.getTodo(id); 
        UI.editTodo(currTodo);
        edit = true
    }
    function updateApp(e,id){
        let newTodo;
        if(edit ){
            // console.log(id)
            newTodo = UI.editTodo();
            if(newTodo){
                todo.updateData(newTodo,id)
                e.target.parentNode.parentNode.children[0].innerText = newTodo;
                edit = false;
            }
        }
    }
    function deleteTodo(id, DOMid){
        UI.deleteTodo(DOMid);
        itemsCount = todo.deleteTodo(id);
        if(itemsCount === 0){
            addTodo();
        }
    }
    function editDeleteTodo(e){
        let DOMid, btn;
        currEl = e;
        DOMid = e.target.parentNode.parentNode.id;
        btn = e.target.classList[2];
        idSplit = DOMid.split('-');
        currID = idSplit[1];
        currID = parseInt(currID);
        if(DOMid.includes("item")){
            if(btn === "edit"){
                editTodo(currID);

            }else if(btn === "delete"){
                deleteTodo(currID, DOMid);
            }

        }
    }
    document.addEventListener('keypress', e =>{
        if(e.key === "Enter" && !edit){
            e.preventDefault();
            addTodo();
        }else if(e.key === "Enter" && edit){
            e.preventDefault();
            updateApp(currEl, currID);
        }else return;
    })
    document.querySelector(DOMString.editBtn).addEventListener('click', ()=> updateApp(currEl, currID));
    document.querySelector(DOMString.addBtn).addEventListener("click", ()=>{
        addTodo();
    })
    document.querySelector(DOMString.todoWrapper).addEventListener('click', editDeleteTodo);
    return {init(){
        let samples = [" Go grocery shopping:-).",
            "Read a book or see a movie later.",
            " Call or visit friends."];
            samples.forEach( (cur, index) => {todo.addTodo(cur)
                UI.addTodo(cur, (index+1))
            });
            add = false;

        }}
    })(UICtrl,todoCtrl)
    appCtrl.init();