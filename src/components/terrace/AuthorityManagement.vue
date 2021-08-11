<template>
  <div>
    <el-form>
      <el-form-item label="" prop="region" style="margin-right: 0px;">
        <el-select v-model="ruleForm.region" placeholder="请选择角色">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button type="primary" @click="search" style="float: right; position: relative; left:-380px;">搜索</el-button>
      </el-form-item>
    </el-form>
    <tree-transfer ref="tree" node-key="id"
                   :from_data='fromData'
                   :to_data='toData'
                   :defaultProps="{label:'title',children: 'children'}"
                   @addBtn='add'
                   @removeBtn='remove' :mode='mode' height='540px' filter openAll>
    </tree-transfer>
    <el-button style="margin-right: 560px;" :loading="isLoading.changeForm" type="primary" @click="verifyLeft">
      确认删除
    </el-button>
    <el-button :loading="isLoading.changeForm" type="primary" @click="verifyForm">
      确认添加
    </el-button>

  </div>
</template>

<script>

  import treeTransfer from 'el-tree-transfer'
  import qs from 'qs'

  export default {
    name :"AuthorityManagement",
    data () {
      return {
        mode: 'transfer',
        options: [{
          value: '1',
          label: '家长'
        }, {
          value: '2',
          label: '老师'
        }, {
          value: '3',
          label: '园长'
        }, {
          value: '4',
          label: '保健员'
        }, {
          value: '5',
          label: '安防员'
        }, {
          value: '6',
          label: '管理员'
        }],
        value: '',
        fromData: [],
        toData: [],
        filldata: [],
        deldata: [],
        flag: '',
        ruleForm: {
          region: '',
        },
        rules: {
          region: [
            {required: true, message: '请选择角色', trigger: 'change'}
          ],
        },
        isLoading: {
          changeForm: false,
        },
      }
    },
    components: {treeTransfer, qs},// 注册
    methods: {
      verifyForm () {
        this.filldata = []
        this.addright()
        // this.$router.go(0)

      },
      verifyLeft () {
        this.deldata = []
        this.removeleft()
        // this.$router.go(0)
      },
      repower () {
        this.$axios.get('SafetyEducationInf/rePower', {
          params: {
            meid: this.ruleForm.region,
          }
        }).then((response) => {
          console.log(response.data)
          this.fromData = response.data.leftList
          this.toData = response.data.rightList
        }).catch((response) => {
          console.log(error)
        })
      },
      addright () {
        for (let i = 0; i < this.toData.length; i++) {
          this.filldata.push(this.toData[i].id)
        }
        let datas = {
          'mid': this.ruleForm.region,
          'pid': this.filldata
        }
        console.log(this.filldata)
        this.$axios.post('SafetyEducationInf/addright', datas
        ).then((response) => {
          console.log(response.data)
          if (response.data === 200) {
            this.$message({
              message: '添加成功！',
              type: 'success'
            })
          } else {
            this.$message({
              message: '添加失败！',
              type: 'error'
            })
          }
        }).catch((response) => {
          console.log(error)
        })
      },
      removeleft () {
        for (let i = 0; i < this.fromData.length; i++) {
          this.deldata.push(this.fromData[i].id)
        }
        let datas = {
          'roleidleft': this.ruleForm.region,
          'allIDleft': this.deldata
        }
        console.log("qqqqqqqqqqqqqqq")
        console.log(this.deldata)
        // 删除
        this.$axios.post('SafetyEducationInf/removeleft', datas//这个应该是整个左侧的集合   放进来   是左边的所有菜单  一级菜单

        ).then((response) => {
          console.log(response.data)
          if (response.data === 200) {
            this.$message({
              message: '删除成功！',
              type: 'success'
            })
          } else {
            this.$message({
              message: '删除失败！',
              type: 'error'
            })
          }
        }).catch((response) => {
          console.log(error)
        })
      },
      search () {
        this.repower(this.ruleForm.region)
      },

      // 切换模式 现有树形穿梭框模式transfer 和通讯录模式addressList
      changeMode () {
        if (this.mode === 'transfer') {
          this.mode = 'addressList'
        } else {
          this.mode = 'transfer'
        }
      },
      // 监听穿梭框组件添加
      add (fromData, toData, obj) {

      },
      // 监听穿梭框组件移除
      remove (fromData, toData, obj) {

      }
    },
  }
</script>





