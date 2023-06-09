<script lang="ts" setup>
import {reactive, ref,getCurrentInstance} from 'vue'
import { ElNotification } from 'element-plus'

const formInline = reactive({
  qq: '',
  session: '',
})

const { appContext } = getCurrentInstance()!
ElNotification({}, appContext)

async function onSubmit () {
  const qqID = formInline.qq
  const Session = formInline.session

  if ( qqID == "" || Session == "" ) {
    ElNotification({
      title: '错误',
      message: '请检查您的数据填写是否正确',
      type: 'error',
    });
    return
  }
  // do not check the session is valid.
  const resp = await fetch('https://api.himoyo.cn/pgr/bind',{method:'post',headers: { 'Content-Type': 'application/json'},body:JSON.stringify(formInline)})
  if (resp.ok) {
    const data = await resp.json()
    const { key } = data
    key.value = token;
    isDataSent = true;
  } else {
    ElNotification({
      title: '错误',
      message: resp.statusText,
      type: 'error',
    })
    return
  }
}
/*
  code
  data:["bindkey"]
 */
const token = ref('');
let isDataSent: boolean = false;

</script>

<template>
<div class="container">
  <div class="format">
    <h1>关于 Phigros B19 Session 绑定</h1>
    <div class="index">
        <br>Session 是一种Phigros同步存档的身份码，使用此码同时可以拿到账户存档的控制权。<br>
      <br>使用此绑定页面可以将 Session 进行加密，通过此加密页面可以不通过直接发送原Session的的情况下传入Lucy.
      <br>
      <br>在这边填入你的相关信息，将账户进行绑定，绑定后将会返回一串校验码,请使用校验码进行绑定<br>
    </div>
    <div class="form-path">
    <el-form :model="formInline" >
      <el-form-item label="QQ" :rules="[{ required: true}]">
        <el-input  v-model.number="formInline.qq" placeholder="Type Your qq" />
      </el-form-item>
      <el-form-item label="Session" >
        <el-input v-model="formInline.session" placeholder="Type your Session" />
      </el-form-item>
    </el-form>
      <button @click="onSubmit">提交</button>
    </div>
    <div class="result" v-if="isDataSent">
    请在 Lucy 端输入 ： /pgr bind {{ token }} 即可
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">

h1 {
  font-size: 18px;
  text-align: center;
  font-family: "Noto Sans",serif;
}
button {
  display: inline-block;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  background-color: #409eff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.container {
  width: 80%;
  height: auto;
  position: relative;
  margin: auto;
  .format {
    position: relative;
    width: auto;
    height: auto;
    min-height: 300px;
    border: 2px solid #ccc;
    border-radius: 10px;
    background-color: whitesmoke;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    padding-bottom: 5%;
    .index {
      top: 10px;
      font-family: "Noto Sans",sans-serif;
      font-size: 16px;
      padding-left: 5%;
      padding-right: 5%;
    }
    .form-path {
      position: relative;
      padding-top: 50px;
      padding-right: 10%;
      padding-left: 10%;
      width: 40%;
    }
    .result{
      top: 10px;
      font-family: "Noto Sans",sans-serif;
      font-size: 16px;
      padding-left: 5%;
      padding-right: 5%;
      padding-bottom: 5%;
    }
  }
}


</style>
