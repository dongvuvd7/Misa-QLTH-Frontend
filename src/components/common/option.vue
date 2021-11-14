<template>
    <div style="display: flex; justify-content: center; align-items:center; cursor: pointer;" >

        <button id="btn-edit" @click="showEmployeeDetail()"></button>   
        <button id="btn-delete" @click="showDeleteDialog()"></button>   
        <button id="btn-duplicate" @click="showEmployeeDuplicate()"></button>   

        <ErrorPopUp
            :isShow="isErrorPopUpShow"
            :errorMsg="errorMsg"
            @hidePopUp="hidePopUp"
        />


    </div>
</template>

<script>

import ErrorPopUp from "../common/pop-up/errorPopUp.vue";

export default {

    components:{
        ErrorPopUp,
    },
    data() {
        return {
            // Biến hiện/ẩn option thêm
            isShowOption: false,
            // Biến phân biệt click vs blur (trong trường hợp click vào lựa chon dropdown content thì blur sẽ chạy trước)
            overClick: false,

            isErrorPopUpShow: false,
            errorMsg: "",

            turnBgBlack : false,

        }
    },

    created() {

    },

    methods: {

        /**
        Hiện dialog xác nhận xóa
        CreatedBy: VDDong (15/06/2021)
         */
        showDeleteDialog(){
            console.log("xóa");
            this.$emit('showDeleteDialog');
            this.isShowOption = false;
        },
        /**
        Hiện dialog sửa có bind thông tin nhân viên lên
        CreatedBy: VDDong (15/06/2021)
         */
        showEmployeeDetail(){
            console.log("sửa");
            this.$emit('showEmployeeDetail');
            this.isShowOption = false;

        },
        /**
        Hiện dialog nhân bản
        CreatedBy: VDDong (15/06/2021)
         */
        showEmployeeDuplicate(){
            console.log("nhân bản");
            this.$emit('showEmployeeDuplicate');
            this.isShowOption = false;
        },


        hidePopUp(){
            this.isErrorPopUpShow = false;
            this.errorMsg = "";
        },

    },
}
</script>

<style scoped>
    .hide{
        display: none;
    }

</style>