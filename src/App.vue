<script lang="ts" setup xmlns="http://www.w3.org/1999/html">
import { onMounted, reactive, ref} from 'vue';
import type {ZlibStatus,ServerStatus} from './received';
// import { inject } from '@vercel/analytics';


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
  const resp = await fetch('https://sample.lemonkoi.one/api/',{method:'post',body:JSON.stringify(formInline)})
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
  inject();
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

async function generator () {
  const tempid = tempUploader.session
  if ( tempid == "" ) {
    isDataSentTemp.value = true;
    reply = "ERROR : 请填写信息～"
    return
  }
  isDataSentTemp.value = false;
  requestSendingTemp.value = !requestSendingTemp.value
  const respData = await fetch('https://maihook.lemonkoi.one/api/generator?id='+tempid,{method:'get'})
  let ContentTemp;
  inject();
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
let serverStatus:string

const isDataSent = ref(false)
const requestSending = ref(false)
const FinishedRequest = ref(false)

const isDataSentTemp = ref(false)
const requestSendingTemp = ref(false)

function linkToBook() {
  window.location.href = "https://lemonkoi.one/archives/14/"
}

function linkToIntro() {
  window.location.href = "https://lucy.lemonkoi.one"
}

// export UserMaimai Webstatus.

function ConvertZlib(value:number,total:number) {
  if (total === 0) {
    return "0.000%";
  }

  const percentage: number = (value / total) * 100;
  return `${percentage.toFixed(3)}%`;
}

function ConvertFloat(percentage:number) {
  return `${percentage.toFixed(3)}%`;
}

async function status() {
  let fullText:string
  const getZlibData = await fetch("https://maihook.lemonkoi.one/api/zlib")
  const getWebData = await fetch("https://maihook.lemonkoi.one/api/ping")
if (getZlibData.ok && getWebData.ok) {
  const preparedWebData:ServerStatus = await getWebData.json()
  const preparedZlibData:ZlibStatus = await getZlibData.json()
  let getLucyResponse:number
  if (preparedZlibData.full["60"] <180) {
    getLucyResponse = preparedZlibData.full["60"]
  } else {
    getLucyResponse = preparedZlibData.full["60"] - 180
  }
  const headerText = "* Zlib 压缩跳过率可以很好的反馈当前 MaiNet (Wahlap Service) 当前负载的情况\n\n* Web Uptime Ping 则可以反馈 MaiNet 在外部原因(DDOS) 下造成的负载详情 ( 100% 即代表服务器为稳定, uptime 越低则代表可用性越差 ) \n\n* 在 1小时 内，Lucy 共处理了" + getLucyResponse+"次 请求💫，其中详细数据如下:\n\n"
  const shownZlibText = "Zlib 压缩跳过率: \n\n" + " * 10mins (" + ConvertZlib(preparedZlibData.zlib_Error["10"],preparedZlibData.full["10"]) + "Loss)\n"+ " * 30mins (" + ConvertZlib(preparedZlibData.zlib_Error["30"],preparedZlibData.full["30"]) + "Loss)\n" + " * 60mins (" + ConvertZlib(preparedZlibData.zlib_Error["60"],preparedZlibData.full["60"]) + "Loss)\n"
  const WebStatusText = "\n\nWeb Uptime Ping:\n\n * MaimaiDXCN: " +ConvertFloat(preparedWebData.details["maimai DX CN"].uptime*100) + "\n\n * MaimaiDXCN Main Server: " + ConvertFloat(preparedWebData.details["maimai DX CN Main"].uptime*100) + "\n\n * MaimaiDXCN Title Server: " + ConvertFloat(preparedWebData.details["maimai DX CN Title"].uptime*100) + "\n\n * MaimaiDXCN Update Server: " + ConvertFloat(preparedWebData.details["maimai DX CN Update"].uptime*100) + "\n\n * MaimaiDXCN NetLogin Server: " + ConvertFloat(preparedWebData.details["maimai DX CN NetLogin"].uptime*100) + "\n\n * MaimaiDXCN Net Server: " + ConvertFloat(preparedWebData.details["maimai DX CN DXNet"].uptime*100) + "\n"
  const FooterText = "\nTips:\n - Title Server 爆炸 容易造成数据获取失败\n - Zlib 3% Loss 以下则 基本上可以正常游玩\n - 10% Loss 则会有明显断网现象(请准备小黑屋工具)\n - 30% Loss 则无法正常游玩(即使使用小黑屋工具)"
  fullText = headerText + shownZlibText + WebStatusText + FooterText
  fullText = fullText.replace(/\n/g, '<br>');
  serverStatus = fullText
  FinishedRequest.value = true
}}

onMounted(()=> {
  status();
});

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
      <br>使用此绑定页面可以将 MaiID 进行加密，通过此加密页面可以不通过直接发送原MAIID的的情况下传入Lucy (仅限 QQ 端).<br>
      <br>此处的 MaiID 是 在华立下拿到的 二维码 识别后 得到的以 SGWCMAID 开头的 字符串.<br>
      <br>如果你的群组没有 Lucy Bot 存在，可以使用一次性的快速解锁，需要使用华立生成的二维码内容.<br>
      <br> * 此网站使用 Vercel Web Analytics 对用户采集来源 (使用 UA, 访问地区)，仅用作于滥用判断统计<br>
      <br>* (仅当使用临时解锁功能时才会被采集信息，且数据对开发者匿名). <br>
      <br> * 开源地址 : <a href="https://github.com/MoYoez/mai-bind_LucyBot"> Click Here</a>. (Hook 部分不开源) <br>
      <br> * 可以参考使用的其他Bot => TelegramBot @Lucy_HiMoYoBot || Q端 Lucy (右上角图标) <br>
      <br>Visited: <img src="https://visitor-badge.laobi.icu/badge?page_id=Lucy_maibindsite"><br>
      
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
      <br>* 使用生成快速链接可以直接点击使用，无需跳转到此页面<br>
         <br><span style="color:red">* 此link包含您的userid，请勿泄露</span>
      </div>
      <form class="form-path-temp">
        MaiID : <input v-model="tempUploader.session" placeholder="Please Type Your id" class="inputbox-temp" required />
        <br><br>
      </form>
      <button @click="onTempSubmit">提交</button><br>
      <br><button @click="generator">生成快速链接</button>
    </div>
    <br>
    <div class="request-handler" v-if="requestSendingTemp">
      Loading...
    </div>
    <div class="result" v-if="isDataSentTemp">
      {{ replyTemp }}
    </div>
    <div class="form-path">
    <h1> MaiMai 网络状况反馈~</h1>
      <br> <div class="ServerStatus" v-html="serverStatus" v-if="FinishedRequest"> </div> <br>
    </div>
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
