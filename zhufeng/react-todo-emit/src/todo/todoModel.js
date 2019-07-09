export default class todoModel{
    constructor(){
        this.STORE_KEY = 'todos';
        this.todos = localStorage.getItem(this.STORE_KEY)?JSON.parse(localStorage.getItem(this.STORE_KEY)):[];

        //这里可以注册监听器，当模型数据发生变化，之后会调用这些监听函数
        this.listeners = [];
    }
    //订阅 和on(type,lintener)一个意思
    subscribe(listener){
        this.listeners.push(listener)

    }
    emit(){
        this.listeners.forEach(listener=>listener())
    }
    notify(todos){
        localStorage.setItem(this.STORE_KEY,JSON.stringify(todos))
        this.emit()//添加的时候，通知emit新增todo了   发射，
        this.todos = todos;
    }
    //增加todo
    addTodo = (todo)=>{
        todo = {id:Math.random(),completed:false,...todo}
        let todos = this.todos;
        todos.push(todo);
        /*localStorage.setItem(this.STORE_KEY,JSON.stringify(todos))
        this.emit()//添加的时候，通知emit新增todo了   发射，*/
        this.notify(todos)
    }
    //checkBox已完成未完成状态切换
    toggle = (id)=>{
        let todos = this.todos;
        console.log(id);
        todos = todos.map((todo)=>{
            if(todo.id===id){
                todo.completed=!todo.completed
            }
            return todo
        })
        /*localStorage.setItem(this.STORE_KEY,JSON.stringify(todos))
        this.emit()//添加的时候，通知emit新增todo了   发射，*/
        this.notify(todos)
    }

    //删除todo
    removeItem = (id)=>{
        let todos = this.todos;
        todos = todos.filter(todo=>{
            return todo.id!=id
        })
        /*localStorage.setItem(this.STORE_KEY,JSON.stringify(todos))
        this.emit()//添加的时候，通知emit新增todo了   发射，*/
        this.notify(todos)
    }

    //全部选中/全部取消
    toggleAll = (event)=>{
        let checked = event.target.checked;
        let todos = this.todos;
        todos = todos.map(todo=>{
            todo.completed = checked;
            return todo;
        })
        /*localStorage.setItem(this.STORE_KEY,JSON.stringify(todos))
        this.emit()//添加的时候，通知emit新增todo了   发射，*/
        this.notify(todos)
    }

    //删除已完成的todo
    delCompleted = ()=>{
        let todos = this.todos;
        todos = todos.filter(todo=>{
            return !todo.completed
        })
        /*localStorage.setItem(this.STORE_KEY,JSON.stringify(todos))
        this.emit()//添加的时候，通知emit新增todo了   发射，*/
        this.notify(todos)
    }



}
