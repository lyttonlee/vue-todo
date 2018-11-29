<template>
  <div class="today">
    <button @click="insert">newdoc</button>
  </div>
</template>
<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
@Component
export default class Today extends Vue {
  todos: object[] = [];
  insert () {
    // this.$DB.insert({msg: 'hello'})
    console.log('new');
  }
  // mounted () {
  //   this.$DB.find({msg: 'hello'}, (err, docs) => {
  //     console.log(docs)
  //     this.todos = docs
  //   })
  // }
}
</script>
