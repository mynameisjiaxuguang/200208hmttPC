  <template>
    <div>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>评论详情列表</span>
        </div>
        <el-table
          :data="comments "
          style="width: 100%">
        <el-table-column
            label="标题"
            width="180">
        </el-table-column>
        <el-table-column
            prop="name"
            label="评论内容"
            width="180">
        </el-table-column>
        <el-table-column
            prop="address"
            label="点赞">
        </el-table-column>
        <el-table-column
            prop="address"
            label="点赞数量">
        </el-table-column>
        <el-table-column
            prop="address"
            label="发布日期">
        </el-table-column>
        <el-table-column
            prop="address"
            label="回复数量">
        </el-table-column>
    </el-table>
      </el-card>
    </div>
  </template>

<script>
export default {
  name: 'CommentDetail',
  props: {
    articleId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      comments: []
    }
  },
  created () {
    this.loadComments()
  },
  methods: {
    loadComments () {
      this.$axios({
        method: 'get',
        url: '/comments',
        params: {
          type: 'a',
          source: this.articleId

        }
      }).then(
        res => {
          console.log(res)
          this.comments = res.data.data
        }
      )
    }
  }
}
</script>

<style lang="less" scoped>

</style>
