<template>
  <div class="today">
    <button @click="insert">newdoc</button>
    <button @click="find">find</button>
    {{newtodo}}
  </div>
</template>
<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import {Action, State} from 'vuex-class'
@Component
export default class Today extends Vue {
  @Action newTodo: any;
  @Action findAll: any;
  @State newtodo: any;
  todos: object[] = [];
  insert () {
    // this.$DB.insert({msg: 'hello'})
    // console.log('new');
    const doc = {
      msg: 'haha',
      complete: false,
    }
    this.newTodo(doc)
    console.log()
  }
  find() {
    this.findAll()
  }
  // mounted () {
  //   this.$DB.find({msg: 'hello'}, (err, docs) => {
  //     console.log(docs)
  //     this.todos = docs
  //   })
  // }
}
</script>
