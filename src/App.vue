<script lang="ts" setup xmlns="http://www.w3.org/1999/html">
import {reactive, ref} from 'vue'
import Analytics from '@vercel/analytics'


const formInline = reactive({
  qq: '',
  session: '',
})

const tempUploader = reactive({
  session:'',
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
    reply = "请在 Lucy 端输入 :   !mai bind " + hash
  } else {
    isDataSent.value = true;
    requestSending.value = !requestSending.value
    reply = "出现不可预料的错误~ : " + resp.statusText
  }
}

async function onTempSubmit () {
  const tempid = tempUploader.session
  if ( tempid == "" ) {
    isDataSentTemp.value = true;
    reply = "ERROR : 请填写信息～"
    return
  }
  isDataSentTemp.value = false;
  requestSendingTemp.value = !requestSendingTemp.value
  const respData = await fetch('https://maihook.lemonkoi.one/api/hook?id='+tempid,{method:'get'})
  let ContentTemp;
  if (respData.ok) {
    ContentTemp = await respData.text();
    requestSendingTemp.value = !requestSendingTemp.value
    isDataSentTemp.value = !isDataSentTemp.value
    replyTemp = ContentTemp
  } else {
    ContentTemp = await respData.text();
    requestSendingTemp.value = !requestSendingTemp.value
    isDataSentTemp.value = !isDataSentTemp.value
    replyTemp = "ERR: " + ContentTemp
  }
}


let hash:string;
let reply:string;
let replyTemp:string;

const isDataSent = ref(false)
const requestSending = ref(false)

const isDataSentTemp = ref(false)
const requestSendingTemp = ref(false)

function linkToBook() {
  window.location.href = "https://lemonkoi.one/archives/14/"
}

function linkToIntro() {
  window.location.href = "https://lucy.impart.icu"
}


</script>

<template>
  <div class="inline-block">
    <div class="cat"> Meow? OwQ </div>
    <div class="icon-type">
    <font-awesome-icon icon="cat" class="type" @click="linkToBook" />
    <font-awesome-icon icon="book" class="type" @click="linkToIntro" />
    </div>
    </div>
<div class="container">
  <div class="format">
    <h1>关于 maimai UserID 绑定</h1>
    <div class="index">
      <br>使用此绑定页面可以将 MaiID 进行加密，通过此加密页面可以不通过直接发送原MAIID的的情况下传入Lucy.<br>
      <br>此处的 MaiID 是 在华立下拿到的 二维码 识别后 得到的以 SGWCMAID 开头的 字符串.<br>
      <br>如果你的群组没有 Lucy Bot 存在，可以使用一次性的快速解锁，需要使用华立生成的二维码内容.<br>
    </div>
    <div class="form-path">
      <form>
     maiID: <input v-model="formInline.session" placeholder="Please Type Your maiid" class="inputbox" required />
        <br><br>
      QQ: <input v-model="formInline.qq" placeholder="Please Type Your QQ" class="inputbox" required type="text" />
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
    <div class="index">
      <div class="temp-box">
      <h1>此处为快速解锁页面</h1>
      </div>
      <form class="form-path-temp">
        MaiID : <input v-model="tempUploader.session" placeholder="Please Type Your id" class="inputbox-temp" required />
        <br><br>
      </form>
      <button @click="onTempSubmit">提交</button>
    </div>
    <br>
    <div class="request-handler" v-if="requestSendingTemp">
      Loading...
    </div>
    <div class="result" v-if="isDataSentTemp">
      {{ replyTemp }}
    </div>
    <Analytics />
  </div>
</div>
</template>

<style lang="scss">

html,body {
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(45deg, #5bcefa, #5bcefa 10px, #f5a9b8 10px, #f5a9b8 20px, #fff 20px, #fff 30px);
  font-family: "Noto Sans CJK SC","serif";
  a {
    text-decoration: none;
  }
  h1 {
    font-size: 18px;
    text-align: center;
    font-family: "Noto Sans CJK SC",serif;
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
  .inline-block {
    height: 125px;
    width: 100%;
    bottom: 20px;
    right: 10px;
    position: relative;
    background: #87cefa;
    .cat {
      position: absolute;
      top: 30%;
      left: 3%;
      font-size: 30px;
      color: white;
    }
    .icon-type {
      position: relative;
      color: white;
      float: right;
      top: 35%;
      white-space: nowrap;
      .type {
        position: relative;
        height: 2rem;
        right: 2rem;
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
      font-family: "Noto Sans CJK SC",sans-serif;
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
    .form-path-temp {
      width: auto;
      height: auto;
      position: relative;
      margin-left: 0;
      margin-top: 5%;
      input {
        outline-style: none ;
        border: 0 #66afe9;
        font-family: "Noto Sans CJK SC",serif;
      }
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
        font-family: "Noto Sans CJK SC",serif;
      }
    }
    .request-handler {
      position: relative;
      left: 40px;
    }
  }
}
}



</style>
