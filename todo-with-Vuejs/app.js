Vue.component(
    'todo-item', {
        template:` <div class="item">
        <div class="todo-body"> {{todoText}} </div>
        <div class="edit-delete"><i @click="$emit('edit')" class="fas fa-edit edit"></i>
        <i @click="$emit('delete')" class="fas fa-times delete"></i>
        </div>
    </div>`,
    props:['todoText']
    }
)

let todoVm = new Vue({
    el:'#todo-container',
    data:{
        newTodoText:'',
        todoList:[
            {id:0, text:"Go grocery shopping:-)."},
            {id:1, text:"Read a book or see a movie later."},
            {id:2, text:"Call or visit friends."}
    ],
        hideEdit:'hide',
        hideAdd:'hide',
        editValue:'',
        editItemIndex:-1,
        nextID:3
    },
    methods:{

        addTodo: function(){
            this.hideAdd =''
            if(this.newTodoText !== ''){

                this.todoList.push({id:this.nextID++,text:this.newTodoText});
                this.newTodoText = '';
                this.hideAdd='hide';
            }
        },
        editTodo: function(value,i){
        this.hideEdit = '';
        this.editValue = value;
        editItemIndex = i;
        },
        submitEdit: function(){
            this.todoList[editItemIndex].text = this.editValue;
            this.editValue = '';
            this.editItemIndex = -1;
            this.hideEdit='hide';
        }
    }
})