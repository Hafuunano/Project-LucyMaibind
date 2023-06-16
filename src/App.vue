<script lang="ts" setup xmlns="http://www.w3.org/1999/html">
import {reactive, ref} from 'vue'

const formInline = reactive({
  qq: '',
  session: '',
})

interface replyFormat {
  token: string;
  expire: string;
}

async function onSubmit () {
  const qqID = formInline.qq
  const Session = formInline.session
  if ( qqID == "" || Session == "" ) {
    isDataSent.value = true;
    reply = "ERROR : 请填写信息～"
    return
  }
  isDataSent.value = false;
  requestSending.value = !requestSending.value
  // do not check the session is valid.
  const resp = await fetch('https://api.impart.icu/api/',{method:'post',body:JSON.stringify(formInline)})
  if (resp.ok) {
    const data : replyFormat = await resp.json()
    hash = data.token;
    isDataSent.value = true;
    requestSending.value = !requestSending.value
    reply = "请在 Lucy 端输入 :   !pgr bind " + hash
  } else {
    isDataSent.value = true;
    requestSending.value = !requestSending.value
    reply = "出现不可预料的错误 awa : " + resp.statusText
  }
}

let hash:string;
let reply:string;

const isDataSent = ref(false)
const requestSending = ref(false)

function linkToBook() {
  window.location.href = "https://moe.himoyo.cn/archives/14/"
}

function linkToIntro() {
  window.location.href = "https://lucy.impart.icu"
}


</script>

<template>
  <div class="inline-block">
    <div class="cat"> Meow? OwQ</div>
    <div class="icon-type">
    <font-awesome-icon icon="cat" class="type" @click="linkToBook" />
    <font-awesome-icon icon="book" class="type" @click="linkToIntro" />
    </div>
    </div>
<div class="container">
  <div class="format">
    <h1>关于 Phigros B19 Session 绑定</h1>
    <div class="index">
        <br>Session 是一种Phigros同步存档的身份码，使用此码同时可以拿到账户存档的控制权。<br>
      <br>使用此绑定页面可以将 Session 进行加密，通过此加密页面可以不通过直接发送原Session的的情况下传入Lucy.
      <br>
      <br>在这边填入你的相关信息，将账户进行绑定，绑定后将会返回一串校验码,请使用校验码进行绑定<br>
      <br>Android 端查询 Session App : <a href="https://cdn.himoyo.cn/uploads/%E8%8E%B7%E5%8F%96Token_1.0.apk">Token (By MiViQ)</a>
    </div>
    <div class="form-path">
      <form>
     Session:    <input v-model="formInline.session" placeholder="Please Type Your Session" class="inputbox" required />
        <br><br>
      QQ:   <input v-model="formInline.qq" placeholder="Please Type Your QQ" class="inputbox" required type="text" />
        <br><br>
      </form>
      <button @click="onSubmit">提交</button>
    </div>
    <br>
    <div class="request-handler" v-if="requestSending">
      Loading...
    </div>
    <div class="result" v-if="isDataSent">
    {{ reply }}
    </div>
  </div>
</div>
</template>

<style lang="scss">

html,body {
  width: 100%;
  height: 100%;
  background: linear-gradient(-45deg, #ffffff 25%, #87cefa 25%, #87cefa 50%, #ffffff 50%, #ffffff 75%, #87cefa 75%);
  background-size: 40px 40px;
  font-family: "Ubuntu","Noto Serif","Noto Serif CJK SC","serif";
  .inline-block {
    height: 125px;
    width: 100%;
    bottom: 20px;
    right: 10px;
    position: relative;
    background: #87cefa;
    .cat {
      position: relative;
      top: 30%;
      left: 3%;
      font-size: 30px;
      color: white;
    }
    .icon-type {
      height: auto;
      color: white;
      float: right;
      width: 100px;
      white-space: nowrap;
      .type {
        position: relative;
        height: 35px;
        right: 35px;
        margin-right: 10px;
      }
    }
  }
.container {
  width: 80%;
  height: auto;
  position: relative;
  margin: 30px auto auto;

  .format {
    position: relative;
    width: auto;
    height: auto;
    min-height: 400px;
    border: 2px solid rgb(240, 216, 220);
    border-radius: 10px;
    background-color: rgb(255, 255, 255);
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
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
      font-size: 16px;
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
      input {
        outline-style: none ;
        border: 0 #66afe9;
        font-family: "Microsoft soft",serif;
      }
    }
    .request-handler {
      position: relative;
      left: 40px;
    }
  }
}
}

a {
  text-decoration: none;
}

a:hover {
  color: rgb(109, 240, 240);
}

a:active {
  color: rgb(208, 255, 0);
}

a:visited {
  color: purple;
}

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

@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes fadeInOut {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

</style>
