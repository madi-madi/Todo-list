

      var filters = {

          'all': function(todos) {
            // body...
            return todos;
          },
          active:function(todos){
            // body...
            return todos.filter(function(todo){ 

                //  console.log(!todo.completed);
                  return !todo.completed;
            });
          },
          completed:function(todos){
            // body...
            return todos.filter(function(todo){ return todo.completed;});
          },

      }


      var todo_storage ={

          fetch: function(){

            var todos = JSON.parse(localStorage.getItem('todos') || '[]');
            return todos;
          },

          save: function(todos){

            localStorage.setItem('todos',JSON.stringify(todos) );
          }


      }

    
    new Vue({

        el: '.todoapp',

        data:{
          newTodo:'',
          visible:'all',
          editingTodo:null,
          todos:todo_storage.fetch(),
        },

        computed:{

          filterTodos(){
            return filters[this.visible] (this.todos);
          },
          reaminingTodoActive(){
            return filters.active(this.todos).length;
          },
          reaminingTodoCompleted(){
            return filters.completed(this.todos).length;
          },

          reaminingTodoAll(){
            return filters.all(this.todos).length;
          },
          reaminingTodoText(){
            if (filters.all(this.todos).length > 1){ 

              return "Items";
            }else{return "item";}
          },

          allDone:{
            get: function(){

            return this.reaminingTodo === 0;
          },
           set: function(value){

            this.todos.forEach(function(todo){

                todo.completed= value;

            });
          }

          }
        },

        methods:{
          deleteTodo(todo){
            this.todos.splice(this.todos.indexOf(todo),1);
          },

          addTodo(){

                  if (this.newTodo == '' || this.newTodo ==" ") {return;}
              this.todos.push({
                                        //@keyup.enter
                'title':this.newTodo,
                'completed': false,
              });

              this.newTodo = ''

          },

          removeCompleted(){

            this.todos = filters.active(this.todos);
          },

          editTodo(todo){
            this.editingTodo = todo;
            this.oldTodoTitle = todo.title;
        },

            doneEditing(){
              if (this.editingTodo.title == '') {

                this.deleteTodo(this.editingTodo);
              }
            this.editingTodo = null;
        },

        cancleEditing(){

           this.editingTodo.title= this.oldTodoTitle;
            this.editingTodo= null;
        }


        },

        watch:{

          todos:{
            handler:function(todos){
             // console.log(todos);
             todo_storage.save(todos);
            },
            deep:true
          }
          
        }


      });

























    /*
اضافة مهمة
انهاء والغاء الانهاء للمهمة 
حذف مهمة
حذف المنتهي من المهام 
تعديل مهمة
فلاتر
عرض النتائج المكتملة 
انهاء الكل
تخزين الداتا


    */
 