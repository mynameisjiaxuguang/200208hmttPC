<template>
  <div>
      <el-card class="box-card">
          <div slot="header" class="clearfix">
              <span>评论管理</span>
              <p>共找到{{totalCount}}条评论</p>
              <el-table
                :data="articles"
                style="width: 100%">
                <el-table-column
                    prop="title"
                    label="标题"
                    width="180">
                </el-table-column>

                <el-table-column
                    prop="total_comment_count"
                    label="总评论数">
                </el-table-column>
                 <el-table-column
                    prop="fans_comment_count"
                    label="评论粉丝数">
                </el-table-column>
                <el-table-column
                  label="评论状态"
                  width="180">
                    <template slot-scope="scope">
                      <el-switch
                      @change="onStatusChange(scope.row)"
                        v-model="scope.row.comment_status"
                        active-color="#13ce66"
                        inactive-color="#ff4949">
                    </el-switch>
                    </template>
                </el-table-column>
                 <el-table-column
                    label="操作">
                      <template slot-scope="scope">
                        <el-button type="primary" @click="$router.push('/comment/'+scope.row.id)">修改</el-button>
                      </template>
                </el-table-column>
                </el-table>
          </div>
          <el-pagination
              background
              layout="prev, pager, next"
              :total= totalCount
              @current-change = 'onPageChange'
              >
            </el-pagination>
      </el-card>
  </div>
</template>

<script>
export default {
  name: 'CommentIndex',
  data () {
    return {
      articles: [],
      totalCount: 0,
      loading: true,
      page: 1
    }
  },
  created () {
    this.loadArticles(1)
  },
  methods: {
    onPageChange (page) {
      // console.log(page)
      this.loadArticles(page)
    },
    onStatusChange (article) {
      // console.log(article)
      this.$axios({
        url: '/comments/status',
        method: 'PUT',
        params: {
          article_id: article.id.toString()
        },
        data: {
          allow_comment: article.comment_status
        }
      }).then(
        res => {
          console.log(res)

          this.$message({
            type: 'success',
            message: `${article.comment_status ? '启用' : '关闭'}成功`
          })
        }
      ).catch(
        err => {
          console.log(err)

          this.$message.error('操作失败')
        }
      )
    },
    loadArticles (page = 1) {
      this.$axios({
        url: '/articles',
        method: 'GET',
        params: {
          page,
          response_type: 'comment'
        }
      }).then(
        res => {
          console.log(res.data.data)
          this.articles = res.data.data.results
          this.totalCount = res.data.data.total_count
        }
      ).catch(
        err => {
          console.log('请求错误', err)
        }
      )
    }
  }
}
</script>

<style>

</style>
