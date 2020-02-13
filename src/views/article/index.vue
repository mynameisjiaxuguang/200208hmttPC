<template>
  <div class="article">
    <!-- 全部图文区域 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">全部图文</div>
      <div>
        <el-form>
          <el-form-item label="文章状态:">
            <el-radio-group v-model="filterForm.status">
              <el-radio label="全部"></el-radio>
              <el-radio label="草稿"></el-radio>
              <el-radio label="待审核"></el-radio>
              <el-radio label="审核通过"></el-radio>
              <el-radio label="审核失败"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="频道列表:">
            <el-select placeholder="请选择活动区域"  v-model="filterForm.channel_id">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="时间选择:">
            <el-date-picker
              v-model="rangeDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <!-- 文章列表-共找到63313条符合条件的内容区域 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>共找到59806条符合条件的内容</span>
      </div>
       <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="封面"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="标题"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="状态">
      </el-table-column>
       <el-table-column
        prop="address"
        label="发布日期">
      </el-table-column>
       <el-table-column
        prop="address"
        label="操作">
      </el-table-column>
    </el-table>
    </el-card>

  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      // 过滤数据的表单
      filterForm: {
        // 文章状态
        status: '',
        // 频道id，不传为全部
        channel_id: '',
        // 起始时间
        begin_pubdate: '',
        // 终止时间
        end_pubdate: '',
        page: '',
        // 每页数量
        per_page: '',
        // 返回数据的字段
        response_type: ''
      },
      rangeDate: '',
      tableData: [{
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
      }]
    }
  },
  created () {
    const token = window.localStorage.getItem('user-token')
    // 项目中除了登录不需要token其他接口都需要token，目的是保护接口，
    // 后端要去把token放入请求头
    // 否则401
    this.$axios({
      url: '/articles',
      method: 'get',
      headers: {
        // 添加请求头
        // 后端要去把token放入请求头，使用一个名字叫Authorization
        // token格式要求为  Bearer 用户token,注意Bearer后面有空格
        Authorization: `Bearer ${token}`
      }
      // data: {
      //   mobile: '',
      //   code: ''
      // }
    }).then(
      res => {
        console.log(res.data.data.results)
      }
    ).catch(
      err => {
        console.log('获取数据失败', err)
      }
    )
  }
}
</script>

<style lang="less" scoped>
 .box-card {
   margin-bottom: 10px;
 }
</style>
