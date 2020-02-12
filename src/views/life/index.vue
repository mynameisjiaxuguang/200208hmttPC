<template>
  <div>生命周期
      <p>{{name}}</p>
      <input type="text" v-model="name">
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: 'zs'
    }
  },
  // 实例创建前后,页面未渲染
  //   鸡肋事件1
  beforeCreate () {
    console.log('实例创建前beforecreate')
  },
  //   创建实例，一般用作查询数据，没有完成页面渲染
  created () {
    console.log('实例创建之后created')
  },
  //   页面渲染前后,可以用watch代替，
  beforeMount () {
    //   也可加载查询数据,依然没有完成页面渲染
    console.log('页面渲染前执行beforeMount')
  },
  mounted () {
    //   加载数据页面渲染完成，可以通过$refs获取dom
    console.log('页面渲染之后执行mounted')
  },
  //   数据更新前后
  // 数据更新之前执行
  //   鸡肋事件
  beforeUpdate () {
    console.log('数据更新之前执行beforeupdate')
  },
  updated () {
    //   鸡肋事件
    console.log('数据更新之后执行updated')
  },
  //   实例销毁阶段
  beforeDestory () {
    //   一般销毁定时器
    console.log('实例销毁之前执行beforeDestory')
  },
  // 鸡肋事件
  destoryed () {
    console.log('实例销毁后执行destoryed')
  }
}
</script>

<style>

</style>
