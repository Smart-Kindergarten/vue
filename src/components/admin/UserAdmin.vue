<template>
  <div>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column
        v-for="(item,i) in tableCol"
        :key="i"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
      ></el-table-column>
      <el-table-column label="操作" v-if="showOper">
        <template slot-scope="scope" >
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  export default {
    name: "UserAdmin",
    data() {
      return {
        showOper:true,
        tableData: [
          { date: "2010-1-2", name: "嘻嘻", address: "广州天河东圃" },
          { date: "2010-1-2", name: "嘻嘻", address: "广州天河东圃" },
          { date: "2010-1-2", name: "嘻嘻", address: "广州天河东圃" }
        ],
        tableCol: [
          { prop: "date", label: "日期", width: 180 },
          { prop: "name", label: "姓名", width: 200 },
          { prop: "address", label: "地址" }
        ]
      };
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    },
  };
</script>
<style lang="css" scoped>
</style>
