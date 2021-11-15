<template>
    <div class="dialog" :class="{'dialog_hide': !isShow}">
        <div id="model" @click="btnNo()"></div>
        <div class="dialog-content">
                <div class="header">
                    <button class="btn-warning btn-warning-excel"></button>
                    <div style="">{{errorMsg}}</div>
                </div>
                <div class="footer">
                    <button class="btn-small" @click="btnNo()">Hủy</button>
                    <button class="btn-confirm-ex primary-color" @click="btnYes()">Đồng ý</button>
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
        //nội dung thông báo
        errorMsg: {
            type: String,
            default: null,
        }
    },

    methods: {
        //Ẩn dialog xác nhận xóa
        btnNo(){
            this.$emit('hidePopUp');
        },

        //Đồng ý xóa
        //Xóa ngân hàng liên kết với ncc đó trước, sau đó xóa ncc đó
        btnYes() {
            this.$emit('confirmDeleteMultiple');
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
        width: 444px;
        height: 180px;
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
    .btn-warning-excel{
        background-position: -826px -456px;
    }

    .btn-confirm-ex{
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