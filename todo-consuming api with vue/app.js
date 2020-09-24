axios.get('https://jsonplaceholder.typicode.com/todos',
{params: {_limit:100}})
    .then(res=> vm.todos = res.data)
    .catch(err=>console.log(err))
vm = new Vue({
    el:"#todo",
    data:{
        todos:[]
    },
    methods:{
        toggleComplete:function(i){
            this.todos[i].completed = true;
        }
    }
})