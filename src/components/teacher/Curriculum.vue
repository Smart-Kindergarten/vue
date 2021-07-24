<template>

  <div class="class-table">
    <div style="height: 40px;font-size: 30px">课程表</div>
    <div>班级名称：小⑴班</div>
    <span>2021-07-26~2021-07-30</span>
    <div class="table-wrapper">
      <div class="tabel-container">
        <table>
          <thead>
          <tr>
            <th>时间</th>
            <th v-for='(week, index) in weeks' :key='index'> {{ '周' + digital2Chinese(index + 1, 'week') }}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for='(item, index) in classTableData' :key='index'>
            <td>
              <p>{{ '第' + digital2Chinese(index + 1) + '节' }}</p>
            </td>

            <td v-for='(week, index) in weeks' :key='index'>
              {{ item[week] || '-' }}
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Curriculum',
  data() {
    return {
      weeks: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
      classTableData: [{
        'monday': '物理',
        'tuesday': '英语',
        'wednesday': '政治',
        'thursday': '历史',
        'friday': '化学',
      }, {
        'monday': '生物',
        'tuesday': '物理',
        'wednesday': '化学',
        'thursday': '英语',
        'friday': '化学',
      }, {
        'monday': '生物',
        'tuesday': '物理',
        'wednesday': '生物',
        'thursday': '历史',
        'friday': '生物',
      }, {
        'monday': '',
        'tuesday': '政治',
        'wednesday': '物理',
        'thursday': '政治',
        'friday': '历史',
      }, {
        'monday': '生物',
        'tuesday': '历史',
        'wednesday': '历史',
        'thursday': '历史',
        'friday': '',
      }],
      tableShow: false
    };
  },
  methods: {
    /**
     * 数字转中文
     * @param {Number} num 需要转换的数字
     * @param {String} identifier 标识符
     * @returns {String} 转换后的中文
     */
    digital2Chinese(num, identifier) {
      const character = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'];
      return identifier === 'week' && (num === 0 || num === 7) ? '日' : character[num];
    }
  }
}
</script>
<style scoped>
.class-table {
  width: 800px;
  /*border: 1px black solid;*/
  margin: 0 auto;
}

.table-wrapper {
  width: 100%;
  height: 100%;
  overflow: auto;
}

.tabel-container {
  margin: 7px;
}

table {
  table-layout: fixed;
  width: 100%;
}

thead {
  background-color: #67a1ff;
}

th {
  color: #fff;
  line-height: 17px;
  font-weight: normal;
}


tbody {
  background-color: #eaf2ff;
}

td {
  color: #677998;
  line-height: 12px;
}


th, td {
  width: 60px;
  padding: 12px 2px;
  font-size: 12px;
  text-align: center;
}

tr td:first-child {
  color: #333;
}

.period {
  font-size: 8px;
}

</style>
