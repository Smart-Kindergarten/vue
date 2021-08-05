<template>
  <div>
    <li>
      <h3>添加新图：</h3>
      <input type="file" id="saveImage" name="myphoto" accept="image/png,image/gif,image/jpeg"
             ref="new_image">
      <el-button @click="addImage">确认添加</el-button>
    </li>
  </div>
</template>
<script>
  export default {
    name: 'ParentChildReading',
    data () {
      return {

      }
    },
    methods: {
          addImage: function () {
            let self = this;
            if (self.$refs.new_image.files.length !== 0) {
              var formData = new FormData()
              formData.append('image_data', self.$refs.new_image.files[0]);
              //单个文件进行上传
              this.$axios.post('/addImage', formData, {
                headers: {
                  "Content-Type": "multipart/form-data"
                },
                params: {
                  name : "asd",
                },
              }).then(response => {

              })
            }

          }
        }


  }
</script>

