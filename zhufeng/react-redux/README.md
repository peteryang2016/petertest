#redux版TODO
##一、todo
###练习
##二、todo-plus
###2.1components:展示组件
####Link:是todo的尾部筛选（全选、未完成、已完成）
####TodoList:是通过筛选展示的todo列表
###2.2containers:容器组件
Link、ListTodo使用的是容器组件，其他功能，如（添加todo、删除todo）使用的非容器组件
####FilterLink是根据展示组件Link生成的容器组件
####VisibleTodoList是根据展示组件VisibleTodoList生成的容器组件
###2.3store:定义counter、todo组件的reducers
###2.4actions:action定义
###2.5Counter:计数器组件(redux计数器)
###2.6Counter2:手写一个connect(容器组件)
###2.7store.js：将多个reducers合并，并创建一个store（createStore）
###2.8todo：总功能

##三、counter-connect
###counter计数器，测试自己手写的connect方法。
