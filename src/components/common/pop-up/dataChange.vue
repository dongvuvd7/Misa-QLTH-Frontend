<template>

    <div class="dialog" :class="{'dialog_hide': !isShow}">
        <div id="model" @click="hidePopUp()"></div>
        <div class="dialog-content">
                <div class="header">
                    <button class="btn-warning btn-warning-dc"></button>
                    <div style="padding-top: 10px;">{{errorMsg}}</div>
                </div>
                <div class="footer">
                    <button class="btn-small cancel" @click="hidePopUp()">Hủy</button>
                    <div class="footer-2">
                        <button class="btn-small cancel" @click="hideDialog()">Không</button>
                        <button class="btn-confirm-dc primary-color" @click="hideDialogAndSaveData()">Có</button>
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
        errorMsg: {
            type: String,
            default: null,
        }
    },

    methods: {
        /**
         * Ẩn popup thông báo trong khi vẫn giữ form employeeDetail
         * CreatedBy: VDDong (18/06/2021)
         */
        hidePopUp(){
            this.$emit('hidePopUp');
        },

        /**
         * Ẩn popup thông báo và đóng form employeeDetail, không lưu dữ liệu
         * CreatedBy: VDDong (18/06/2021)
         */
        hideDialog(){
            this.$emit('hideDialog');
        },

        /**
         * Ẩn popup thông báo và đóng form employeeDetail, có lưu dữ liệu
         * CreatedBy: VDDong (18/06/2021)
         */
        hideDialogAndSaveData(){
            this.$emit('hidePopUp');
            this.$emit('btnSave');
        }


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
        justify-content: space-between;
        align-items: center;
    }
    .footer-2{
        width: 150px;
        display: flex;
        justify-content: space-between;
    }
    .btn-warning-dc{
        background-position: -826px -450px;
    }
    .btn-confirm-dc{
        /* position: absolute; */
        /* top: 24px; */
        height: 36px;
        padding: 8px 20px;
        border: 1px solid transparent;
        color: #fff;
        border-radius: 3px;
        cursor: pointer;
    }
    
</style>