<template>
  <div class="publish">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{$route.params.articleId?'编辑文章':'发布文章'}}</span>
      </div>
      <el-form :model="article" label-width="80px">
        <el-form-item label="标题">
          <el-input placeholder="文章名称" v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <!-- <el-input type="textarea" v-model="article.content"></el-input> -->
          <quill-editor
            v-model="article.content"
            ref='myQuillEditor'
            :options='editorOption'
            class="richEditor"
          ></quill-editor>
        </el-form-item>
        <el-form-item label="活动区域">
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group>
            <el-radio label="单图"></el-radio>
            <el-radio label="三图"></el-radio>
            <el-radio label="无图"></el-radio>
            <el-radio label="自动"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <ChannelSelect v-model="article.channel_id"></ChannelSelect>
            <!-- <el-select placeholder="请选择" v-model="article.channel_id">
            <el-option
              v-for="channel in channels"
              :label="channel.name"
              :value="channel.id"
              :key="channel.id"
            ></el-option>
          </el-select> -->
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit(false)">发表</el-button>
          <el-button @click="onSubmit(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 加载富文本编辑器样式文件
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import ChannelSelect from '../../components/channel-select'
export default {
  name: 'PublishArticle',
  components: {
    quillEditor,
    ChannelSelect
  },
  data () {
    return {
      article: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: { // 封面
          type: 0,
          images: []
        },
        channel_id: '' // 文章所属频道id
      },
      // channels: [],
      // 富文本编辑器的配置选项对象
      editorOption: {}
    }
  },
  created () {
    // this.loadChannels()
    if (this.$route.params.articleId) {
      this.loadArticle()
    }
  },
  methods: {
    loadArticle () {
      this.$axios({
        url: `/articles/${this.$route.params.articleId}`,
        method: 'GET'
      }).then(
        res => {
          console.log(res)
          this.article = res.data.data
        }
      )
    },
    // loadChannels () {
    //   this.$axios({
    //     url: '/channels',
    //     method: 'get'
    //   }).then(
    //     res => {
    //       this.channels = res.data.data.channels
    //     }
    //   ).catch()
    // },
    onSubmit (draft) {
      if (this.$route.params.articleId) {
        this.updateArticle(draft)
      } else {
        this.addArticle(draft)
      }
    },
    addArticle (draft) {
      this.$axios({
        url: '/articles',
        method: 'POST',
        // headers: {
        //   Authorization: `Bearer ${window.localStorage.getItem('user-token')}`
        // },
        params: {
          draft
        },
        data: this.article
      }).then(
        res => {
          console.log(res)
        }
      ).catch(
        err => {
          console.log('保存失败', err)
        }
      )
    },
    updateArticle (draft) {
      this.$axios({
        method: 'put',
        url: `/articles/${this.$route.params.articleId}`,
        params: {
          draft
        },
        data: this.article
      }).then(res => {
        this.$message({
          type: 'success',
          message: '更新成功'
        })
        this.$router.push('/article')
      }).catch(err => {
        console.log(err)
        this.$message.error('更新失败')
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .ql-editor {
   min-height: 500px;
  }
</style>
