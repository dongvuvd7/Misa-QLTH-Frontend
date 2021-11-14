<template>

    <div class="dialog" :class="{'dialog_hide': !isShow}">
        <div id="model" @click="hidePopUp()"></div>
        <div class="dialog-content">
                <div class="header">
                    <button class="btn-warning btn-warning-ed"></button>
                    <div style="">{{errorMsg}}</div>
                </div>
                <div class="footer">
                    <button class="btn-confirm primary-color" @click="hidePopUp()">Đồng ý</button>
                </div>
        </div>
    </div>
    
</template>

<script>
export default {

    created() {

    },

    data() {
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
        errorMsg: {
            type: String,
            default: null,
        }
    },

    methods: {
        /**
         * Đóng errorDialog đi
         * CreatedBy: VDDong (18/06/2021)
         */
        hidePopUp(){
            this.$emit('hidePopUp');
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
        opacity: .4;
        z-index: 4;
    }
    .dialog-content{
        position: fixed;
        width: 444px;
        height: 200px;
        top: calc(50% - 100px);
        left: calc(50% - 222px);
        background-color: white;
        border-radius: 3px;
        box-sizing: border-box;
        padding-left: 28px;
        padding-right: 28px;
        z-index: 5;
    }
    .header{
        width: 100%;
        height: 55%;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #babec5;
    }
    .footer{
        width: 100%;
        height: 45%;
        display: flex;
        position: relative;
        /* align-items: center; */
    }
    .btn-warning-ed{
        background-position: -594px -457px;
    }
    
    
</style>