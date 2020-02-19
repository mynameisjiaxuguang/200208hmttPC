<template>
  <div class="channel-select">
      <el-select
       placeholder="请选择"
       :value='value'
       @input="$emit('input',$event )"
       >
            <el-option
              v-for="channel in channels"
              :label="channel.name"
              :value="channel.id"
              :key="channel.id"
            ></el-option>
          </el-select>
  </div>
</template>

<script>
export default {
  name: 'ChannelSelect',
  components: {},
  props: {
    value: {
      type: [String, Number],
      require: true
    }
  },
  data () {
    return {
      channels: [] // 存储频道列表
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadChannels()
  },
  methods: {
    loadChannels () {
      // 此处不需要token，详情看接口文档
      this.$axios({
        method: 'get',
        url: '/channels'
        // data: {
        //   mobile: '',
        //   code: ''
        // }

      }).then(res => {
        // console.log(res.data.data.channels)
        this.channels = res.data.data.channels
      }).catch()
    }
  }
}
</script>

<style>

</style>
