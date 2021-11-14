<template>

    <div class="dialog" :class="{'dialog_hide': !isShow}">
        <div id="model" @click="hideDialog()"></div>
        <div class="dialog-content">
                <div class="header">
                    <button class="btn-warning-su"></button>
                    <div style="">Tính năng đang phát triển <br> Vui lòng quay lại sau !</div>
                </div>
                <div class="footer">
                    <button class="btn-confirm-su primary-color" @click="hideDialog()">Đóng</button>
                </div>
        </div>
    </div>
    
</template>

<script>


export default {
    created() {

    },
    data() {
        return{

        }
    },
    props: {
        //biến ẩn/hiện dialog delete confirm
        isShow: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        //Ẩn dialog xác nhận xóa
        hideDialog(){
            this.$emit('hideDialog');
        },
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
        opacity: .5;
        z-index: 3;
    }
    .dialog-content{
        position: fixed;
        width: 360px;
        height: 170px;
        top: calc(50% - 100px);
        left: calc(50% - 222px);
        background-color: white;
        border-radius: 3px;
        box-sizing: border-box;
        padding-left: 28px;
        padding-right: 28px;
        z-index: 3;
    }
    .header{
        width: 100%;
        height: 60%;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #babec5;
    }
    .footer{
        width: 100%;
        height: 40%;
        display: flex;
        align-items: center;
    }
    .btn-warning-su{
        width: 48px;
        height: 48px;
        min-width: 48px;
        min-height: 48px;
        background: url("../../../assets/img/maintenance.svg") no-repeat;
        cursor: pointer;
        border: none;
        outline: none;
        margin-right: 30px;
    }

    .btn-confirm-su{
        position: absolute;
        right: 24px;
        height: 36px;
        padding: 8px 20px;
        border: 1px solid transparent;
        color: #fff;
        border-radius: 3px;
        cursor: pointer;
    }
</style>