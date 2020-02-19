<template>
  <div class="article">
    <!-- 全部图文区域 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">全部图文</div>
      <div>
        <el-form>
          <el-form-item label="文章状态:">
            <!-- 单选框租会把选中的radio的lebel同步给绑定的数据 -->
            <el-radio-group v-model="filterForm.status">
              <el-radio :label="null">全部</el-radio>
              <el-radio label="0">草稿</el-radio>
              <el-radio label="1">待审核</el-radio>
              <el-radio label="2">审核通过</el-radio>
              <el-radio label="3">审核失败</el-radio>
              <el-radio label="4">已删除</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="频道列表:">
            <!-- <el-select placeholder="请选择活动区域"  v-model="filterForm.channel_id">
              <el-option label="所有频道" :value='null'></el-option>
              <el-option :label="item.name" :value="item.id" v-for="item in channels" :key="item.id"></el-option>
            </el-select> -->
            <ChannelSelect v-model="filterForm.channels_id"></ChannelSelect>
          </el-form-item>
          <el-form-item label="时间选择:">
            <el-date-picker
              v-model="rangeDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <!-- 点击查询按钮重新获取数据，新查询的数据从第一页开始 -->
            <el-button type="primary" @click="loadArticles(1)">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <!-- 文章列表-共找到63313条符合 条件的内容区域 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>共找到{{totalCount}}条符合条件的内容</span>
      </div>
      <el-table
      v-loading='loading'
      :data="articles"
      style="width: 100%">
      <!-- prop用于指定渲染哪个数据字字段 -->
      <!-- label表头的名字 -->
      <!-- width表格的列宽 -->
      <!-- 表格列默认只能渲染文本,所以自定义表格列 -->
      <el-table-column
        prop="cover.images"
        label="封面"
        width="180">
        <!-- 自定义表格列先加template, template上声明slot-scope='scope',就可以通过scope.row获取遍历项,相当于v-for的item-->
        <template slot-scope="scope">
          <!-- src写遍历项.cover.images[0] -->
          <img width="100px" :src="scope.row.cover.images" alt="">
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="状态">
        <!-- 自定义表格列 -->
        <template slot-scope="scope">
          <!-- 最笨的方法 -->
          <!-- <span v-show="scope.row.status === 0">草稿</span>
          <span v-show="scope.row.status === 1">待审核</span>
          <span v-show="scope.row.status === 2">审核通过</span>
          <span v-show="scope.row.status === 3">审核失败</span>
          <span v-show="scope.row.status === 4">已删除</span> -->
          <!-- 新方法 -->
          <!-- scope.row.status是数字,相当于item的下标 -->
          <!-- <span>{{articleStatus[scope.row.status].label}}</span> -->
          <!-- 加样式 -->
          <el-tag :type="articleStatus[scope.row.status].type">{{articleStatus[scope.row.status].label}}</el-tag>
        </template>
      </el-table-column>
       <el-table-column
        prop="pubdate"
        label="发布日期">
      </el-table-column>
       <el-table-column
        prop="address"
        label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="onDelete(scope.row.id)">删除</el-button>
        <el-button type="primary" size="mini" @click="$router.push('/publish/'+scope.row.id)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    </el-card>
  <!-- 分页 -->
  <!-- layout控制布局 -->
  <el-pagination
  background
  layout="prev, pager, next"
  :total="totalCount"
  @current-change='onPageChange'
  :disabled="loading"
  >
</el-pagination>
  </div>
</template>

<script>
import ChannelSelect from '../../components/channel-select'

export default {
  // 给名字是为了调试工具可以快速找到组件
  name: 'Article',
  components: {
    ChannelSelect
  },
  data () {
    return {
      // 过滤数据的表单
      filterForm: {
        // 文章状态
        status: null,
        // 频道id，不传为全部
        channel_id: null,

        // 返回数据的字段
        response_type: ''
      },
      // 日期范围
      // axios对null，undefined，空数组也不发请求，空字符串会发
      rangeDate: [],
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
      articles: [],
      // 频道列表
      // channels: [],
      articleStatus: [
        {
          label: '草稿',
          type: 'info'
        },
        {
          label: '待审核',
          type: 'success'
        }, {
          label: '审核通过',
          type: ''
        }, {
          label: '审核失败',
          type: 'warning'
        }, {
          label: '已删除',
          type: 'danger'
        }
      ],
      // 总条数
      totalCount: 0,
      // 表格loading状态
      loading: true,
      // 当前页码
      page: 1
    }
  },
  created () {
    this.loadArticles(1)
    // this.loadChannels()
  },
  methods: {
    loadArticles (page = 1) {
      this.loading = true
      // const token = window.localStorage.getItem('user-token')
      // 项目中除了登录不需要token其他接口都需要token，目的是保护接口，
      // 后端要去把token放入请求头
      // 否则401
      this.$axios({
        url: '/articles',
        method: 'get',
        // headers: {
        // // 添加请求头
        // // 后端要去把token放入请求头，使用一个名字叫Authorization
        // // token格式要求为  Bearer 用户token,注意Bearer后面有空格
        //   Authorization: `Bearer ${token}`
        // },
        params: {
          page,
          // 每页数量
          per_page: 15,
          // axios特点当数据值为null时，就不发送了
          status: this.filterForm.status,
          channel_id: this.filterForm.channel_id,
          // null
          // channel_id,
          begin_pubdate: this.rangeDate ? this.rangeDate[0] : null,
          end_pubdate: this.rangeDate ? this.rangeDate[1] : null
        }
      // data: {
      //   mobile: '',
      //   code: ''
      // }
      }).then(
        res => {
          // console.log(res.data.data)
          this.articles = res.data.data.results
          this.totalCount = res.data.data.total_count
          // this.loading = false
        }
      ).catch(
        err => {
          console.log('获取数据失败加载文章', err)
        }
      )
      // 无论成功失败都要执行的
        .finally(() => {
          this.loading = false
        })
    },
    onPageChange (page) {
      // console.log(page)
      this.page = page
      this.loadArticles(page)
    },
    // loadChannels () {
    //   // 此处不需要token，详情看接口文档
    //   this.$axios({
    //     method: 'get',
    //     url: '/channels'
    //     // data: {
    //     //   mobile: '',
    //     //   code: ''
    //     // }

    //   }).then(res => {
    //     // console.log(res.data.data.channels)
    //     this.channels = res.data.data.channels
    //   }).catch()
    // },
    onDelete (articleId) {
      // console.log(e)
      // 此处报400是因为数据id的错误，后端返回数据中数字超过js安全整数范围
      // js中最大能表示的数字是Number.MAX_SAFE_INTEGER  ,后端返回都是json格式字符串，使用axios发请求收到数据后帮你把字符串转为了一个JavaScript对象
      // 解决办法使用第三方工具包json-bigint
      this.$axios({
        //  /mp/v1_0/articles/:target 接口路径中的:target是路径参数，是动态的
        url: `/articles/${articleId}`, // 任何数据和字符串相加都会自动toString
        method: 'DELETE'
        // headers: {
        //   Authorization: `Bearer ${window.localStorage.getItem('user-token')}`
        // }
      }).then(
        res => {
          // console.log(res)
          // 删除成功重新加载文章列表
          this.loadArticles(this.page)
        }
      ).catch()
    }
  }
}
</script>

<style lang="less" scoped>
 .box-card {
   margin-bottom: 10px;
 }
</style>
