<!-- 测试文件 -->
<template lang="html">
  <div class="">
    <el-tree
     :data="data"
     show-checkbox
     node-key="id"
     default-expand-all
     :expand-on-click-node="false">
     <span class="custom-tree-node" slot-scope="{ node, data }">
       <span>{{ node.label }}</span>
       <span>
         <el-button
           type="text"
           size="mini"
           @click="append()">
           Append
         </el-button>
         <el-button
           type="text"
           size="mini"
           @click="remove()">
           Delete
         </el-button>
       </span>
     </span>
   </el-tree>
  </div>
</template>

<script>
export default {
  data(){
    const data = [{
       id: 1,
       label: '一级 1',
       children: [{
         id: 4,
         label: '二级 1-1',
         children: [{
           id: 9,
           label: '三级 1-1-1'
         }, {
           id: 10,
           label: '三级 1-1-2'
         }]
       }]
     }, {
       id: 2,
       label: '一级 2',
       children: [{
         id: 5,
         label: '二级 2-1'
       }, {
         id: 6,
         label: '二级 2-2'
       }]
     }, {
       id: 3,
       label: '一级 3',
       children: [{
         id: 7,
         label: '二级 3-1'
       }, {
         id: 8,
         label: '二级 3-2'
       }]
     }];
     return{
      data: JSON.parse(JSON.stringify(data))
     }
  },
  methods:{
    append(){
      alert(1)
    },
    remove(){
      alert(2)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
