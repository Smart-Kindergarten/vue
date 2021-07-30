<template>
  <el-tabs v-model="editableTabsValue" type="card" @tab-remove="removeTab">
    <el-tab-pane
      v-for="(item, index) in editableTabs"
      :key="item.name"
      :label="item.title"
      :name="item.name"
      :closable= "item.closable"
      :lazy="item.lazy"
    >
      <SecurityGuardPickQuery v-if="item.content" @addTab="addTab"></SecurityGuardPickQuery>
      <SecurityGuardPickinformation v-else></SecurityGuardPickinformation>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import SecurityGuardPickQuery from "./SecurityGuard-Pick-Query"
  import SecurityGuardPickinformation from "./SecurityGuard-Pick-information";
    export default {
      name: "SecurityGuard-Pick",
      data(){
        return{
          editableTabsValue: 'Query',
          editableTabs: [{
            title: '宝宝接送查询',
            name: 'Query',
            closable: false,
            content: true
          }],
        }
      },
      methods: {
        removeTab(targetName) {
          let tabs = this.editableTabs;
          let activeName = this.editableTabsValue;
          if (activeName === targetName) {
            tabs.forEach((tab, index) => {
              if (tab.name === targetName) {
                let nextTab = tabs[index + 1] || tabs[index - 1];
                if (nextTab) {
                  activeName = nextTab.name;
                }
              }
            });
          }

          this.editableTabsValue = activeName;
          this.editableTabs = tabs.filter(tab => tab.name !== targetName);
        },
        addTab(baby) {
          console.log(baby)
          console.log(this.editableTabs)
          for(var i of this.editableTabs){
            if(i.name==baby[0].toString()){
              this.editableTabsValue = baby[0].toString();
              return
            }
          }
          this.editableTabs.push({
            title: baby[1],
            name: baby[0].toString(),
            closable: true,
            babyID:baby[0],
            content: false
          });
          this.editableTabsValue = baby[0].toString();
        }
      },
      components: {
        SecurityGuardPickQuery,
        SecurityGuardPickinformation
      },
      mounted() {

      }
    }
</script>

<style scoped>

</style>
