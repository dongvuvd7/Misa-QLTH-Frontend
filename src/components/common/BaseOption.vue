<template>
    <div style="display: flex; justify-content: center; align-items:center; cursor: pointer;" >

        <button id="btn-edit" @click="showTeacherDetail()"></button>   
        <button id="btn-delete" @click="showDeleteDialog()"></button>   
        <button id="btn-duplicate" @click="showTeacherDuplicate()"></button>   

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
        CreatedBy: VDDong (26/11/2021)
         */
        showDeleteDialog(){
            // console.log("xóa");
            this.$emit('showDeleteDialog');
            this.isShowOption = false;
        },
        /**
        Hiện dialog sửa có bind thông tin nhân viên lên
        CreatedBy: VDDong (26/11/2021)
         */
        showTeacherDetail(){
            // console.log("sửa");
            this.$emit('showTeacherDetail');
            this.isShowOption = false;

        },
        /**
        Hiện dialog nhân bản
        CreatedBy: VDDong (26/11/2021)
         */
        showTeacherDuplicate(){
            // console.log("nhân bản");
            this.$emit('showTeacherDuplicate');
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