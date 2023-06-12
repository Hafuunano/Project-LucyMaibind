<script lang="ts" setup xmlns="http://www.w3.org/1999/html">
import {reactive, ref} from 'vue'

const formInline = reactive({
  qq: '',
  session: '',
})

interface replyFormat {
  token: string;
  md5: string;
}

async function onSubmit () {
  const qqID = formInline.qq
  const Session = formInline.session
  if ( qqID == "" || Session == "" ) {
    return
  }
  // do not check the session is valid.
  console.log(JSON.stringify(formInline))
  const resp = await fetch('https://api.impart.icu/api/',{method:'post',body:JSON.stringify(formInline)})
  if (resp.ok) {
    const data : replyFormat = await resp.json()
    hash = data.token;
    md5 = data.md5;
    isDataSent.value = true;
  }
}

let hash:string;
let md5:string;

const isDataSent = ref(false)
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
      <form >
     Session:    <input v-model="formInline.session" placeholder="Please Type Your Session" class="inputbox" required />
        <br><br>
      QQ:   <input v-model="formInline.qq" placeholder="Please Type Your QQ" class="inputbox" required type="text" />
        <br><br>
      </form>
      <button @click="onSubmit">提交</button>
    </div>
    <br>
    <div class="result" v-if="isDataSent">
    请在 Lucy 端输入 ： /pgr bind {{ hash }} {{ md5 }}
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
    .result{
      top: 10px;
      font-size: 14px;
      font-family: "Noto Sans",sans-serif;
      padding-left: 5%;
      padding-right: 5%;
      padding-bottom: 5%;
      word-break: break-all;
    }
    .form-path {
      width: auto;
      height: auto;
      position: relative;
      margin-left: 5%;
      margin-top: 5%;
      border:transparent;

    }
  }
}


</style>
