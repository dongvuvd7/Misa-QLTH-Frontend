<template>

    <div class="dialog" :class="{'dialog_hide': !isShow}">
        <div id="model" @click="hidePopUp()"></div>
        <div class="dialog-content">
                <div class="header">
                    <button class="btn-warning btn-warning-pu"></button>
                    <div style="padding-top: 10px;">{{errorMsg}}</div>
                </div>
                <div class="footer">
                    <button class="btn-confirm primary-color" @click="hidePopUp()">Đóng</button>
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
        height: 180px;
        top: calc(50% - 100px);
        left: calc(50% - 222px);
        background-color: white;
        border-radius: 3px;
        box-sizing: border-box;
        padding-left: 32px;
        padding-right: 32px;
        z-index: 5;
    }
    .header{
        width: 100%;
        height: 50%;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #babec5;
    }
    .footer{
        width: 100%;
        height: 50%;
        display: flex;
        position: relative;
        justify-content: center;
        /* align-items: center; */
    }
    .btn-warning-pu{
        background-position: -20px -946px;
    }

</style>