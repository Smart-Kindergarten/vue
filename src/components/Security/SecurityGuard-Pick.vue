<template>
  <el-tabs v-model="editableTabsValue" type="card" @edit="handleTabsEdit">
    <el-tab-pane
      v-for="(item, index) in editableTabs"
      :key="item.name"
      :label="item.title"
      :name="item.name"
      :closable= "item.closable"
    >
      {{item.content}}
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import SecurityGuardTest from "./SecurityGuard-test"
    export default {
        name: "SecurityGuard-Pick",
        data(){
          return{
            editableTabsValue: '1',
            editableTabs: [{
              title: 'Tab 1',
              name: '1',
              closable: false,
              content:"123"
            },{
              title: 'Tab 2',
              name: '2',
              closable: true,
              content: SecurityGuardTest
            }],
          }
        },
      methods: {
        handleTabsEdit(targetName, action) {
          if (action === 'add') {
            let newTabName = ++this.tabIndex + '';
            this.editableTabs.push({
              title: 'New Tab',
              name: newTabName,
              content: 'New Tab content'
            });
            this.editableTabsValue = newTabName;
          }
          if (action === 'remove') {
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
          }
        }
      },
      components: {
          SecurityGuardTest
      }
    }
</script>

<style scoped>

</style>
