<template>
<!-- appList列表添加信息 -->
  <div :class="'dialog-cover '+ (isvisible ? 'dialog-cover-show':'')">
    
    <div class="addDialog">
      <i
        class="iconfont icon-delete dialog-delete"
        @click="close()"
      ></i>

      <span class="title">添加网站</span>
      <span class="tips">（右键可删除已添加的网站）</span>

      <div class="addWebInfo">
        <div class="infoItem">
          <span class="infoTitle">网站名称</span>
          <input type="text" class="infoInput" name="webName" ref="webName">
        </div>

        <div class="infoItem">
          <span class="infoTitle">URL</span>
          <input type="text" class="infoInput" name="webUrl" ref="webUrl">
        </div>

        <div class="addBox">
          <button @click="addWeb()">确认</button>
          <button @click="close()">取消</button>
        </div>


      </div>
    </div>    
  </div>
</template>

<script>
export default {
  props: ['isvisible','appList'],
  data () {
    return {
      // true表示点击后 addWeb()可执行
      addWebFlag: true,
    }
  },
  methods: {
    // 关闭dialog
    close(){
      this.$emit("close");
      this.clear();
    },
    // 添加web
    addWeb(){
      if(this.addWebFlag){
        this.addWebFlag=false;
        let webName = this.$refs.webName;
        let webUrl = this.$refs.webUrl;
        if(webName.value===""||webUrl.value===""){
          alert("输入请不要为空！")
        }else{
          let arry = {
            appName: webName.value,
            href: webUrl.value
            };
          this.appList.push(arry);
          localStorage.setItem("appList", JSON.stringify(this.appList));
          console.log(this.appList);
          this.close();
          
        }

        // 设置500ms延迟防止重复点击
        setTimeout(()=>{
          this.addWebFlag=true;
        }, 500)
      }
      
    },
    // 清空输入框
    clear(){
      this.$refs.webName.value = "";
      this.$refs.webUrl.value = "";
    }

  },
  mounted () {

  }
}
</script>

<style lang="scss" scoped>
.dialog-cover{
  position: fixed;
  background-color: rgba(0, 0, 0, 0.4);
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  transition: all .2s ease-in-out;
  opacity: 0;
  z-index: 1;
  visibility: hidden;
}

.dialog-cover-show{
  opacity: 1;
  visibility: visible;
}

.addDialog{
  position: absolute;
  height: 300px;
  width: 350px;
  top: calc(50% - 150px);
  left: calc(50% - 175px);
  border-radius: 15px;
  background-color: white;

  .dialog-delete{
    position: absolute;
    font-size: 28px;
    cursor: pointer;
    left: 20px;
    top: 20px;
  }

  .title{
    position: absolute;
    left: 70px;
    top: 25px;
    font-size: 18px;
  }

  .tips{
    position: absolute;
    left: 60px;
    top: 50px;
    font-size: 12px;
    color: grey;
  }

  .addWebInfo{
    position: absolute;
    width: 290px;
    height: 220px;
    top: 70px;
    left: 30px;

    .infoItem{
      margin-bottom: 10px;

      // 网站信息输入项标题
      .infoTitle{
        font-size: 16px;
        display: block;
      }
      
      // 信息输入框
      .infoInput{
        padding: 5px 10px;
        margin: 10px 5px;
        width: 250px;
        border: 1px solid rgb(210, 210, 210);
        border-radius: 1px;
        background-color: rgb(245, 245, 245);

        &:hover{
          border: 1px solid rgb(128, 128, 128);
        }

        &:active, &:focus{
          border: 1px solid rgb(128, 128, 128);
          outline: 1px solid grey;
        }
      }
    }

    // 确认按钮和取消按钮
    .addBox{

      button{
        width: 120px;
        height: 35px;
        margin: 10px 10px;
        background-color: rgb(180, 180, 180);
        cursor: pointer;

         &:first-child{
           background-color:#0b8793;
         }

        &:first-child:hover{
          background-color:#0c7e88;
        }

        &:last-child:hover{
          background-color:rgb(160, 160, 160);
        }
      }
    }
    
  }

}


</style>