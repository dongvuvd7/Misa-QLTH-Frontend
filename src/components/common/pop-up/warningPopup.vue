
<template>
    <div class="dialog" :class="{'dialog_hide': !isShow}">
        <!-- <div id="model" @click="hidePopUp()"></div> -->
        <div class="dialog-content">
            <div class="leftbar">

            </div>
            <div class="right-content">
                <div class="right-content-img">
                    <div class="img-content"></div>
                </div>
                <div class="right-content-content">
                    <div class="title-dialog">
                        <div style="font-size: 20px; margin: 10px 0px 0px 0px;"><b>Thất bại</b></div>
                    </div>
                    <div class="header">
                        <!-- <button class="btn-warning btn-warning-dc"></button> -->
                        <div style="margin-top: 5px;">{{warningMsg}}</div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>



<script>
export default {
    created() {

    },

    data(){
        return {

        }
    },

    props: {
        //Thuộc tính ẩn/hiện popup
        isShow: {
            type: Boolean,
            default: false
        },
        //Nội dung thông báo lỗi
        warningMsg: {
            type: String,
            default: null,
        }
    },
    
    methods: {
        

    },
}
</script>



<style scoped>

    .dialog_hide {
        display:none;
    }
    #model {
        position: fixed;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        background-color: #000000;
        opacity: .4;
        z-index: 4;
    }
    .dialog-content{
        position: fixed;
        width: 320px;
        height: 85px;
        bottom: 70px;
        right: 100px;
        background-color: white;
        border: 1px solid #f33f3f;
        border-radius: 3px;
        box-sizing: border-box;
        padding-right: 10px;
        z-index: 5;
        display: flex;
    }
    .leftbar{
        height: 100%;
        width: 8px;
        background-color: #f33f3f;
    }
    .right-content{
        height: 100%;
        width: calc(100% - 8px);
        /* background-color: lightblue; */
        display: flex;
    }
        .right-content-img{
            height: 100%;
            width: 60px;
            /* background-color: lightcoral; */
            display: flex;
            justify-content: center;
            align-items: center;
        }
            .img-content{
                width: 40px;
                height: 40px;
                /* border: 1px solid #000000; */
                background-image: url('../../../assets/Icons/ic_ToastMessage_Fail.png');
            }
            
        .right-content-content{
            height: 100%;
            width: calc(100% - 60px);
            /* background-color: cornflowerblue; */
            margin-left: 10px;
        }

</style>