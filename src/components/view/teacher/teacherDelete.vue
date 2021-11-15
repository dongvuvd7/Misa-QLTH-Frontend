<template>
    <div class="dialog" :class="{'dialog_hide': !isShow}">
        <div id="model" @click="hideDialog()"></div>
        <div class="dialog-content">
                <div class="header">
                    <button class="btn-warning"></button>
                    <div style="">Bạn có thực sự muốn xóa Nhân viên <b>&#60;<span>{{teacher.teacherCode}}</span>&#62;</b> không?</div>
                </div>
                <div class="footer">
                    <button class="btn-small" @click="hideDialog()">Không</button>
                    <button class="btn-confirm-delete primary-color" @click="btnDelete()">Có</button>
                </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios';
const getAll = "https://localhost:44342/api/v1/Teachers/";

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
        //nhân viên đã chọn để xóa
        teacher: {
            type: Object,
            default: null,
        }
    },

    methods: {
        //Ẩn dialog xác nhận xóa
        hideDialog(){
            this.$emit('hideDialog');
        },


        btnDelete() {

            axios
                .delete(getAll + this.teacher.teacherId) //xóa nhân viên
                .then((res) => {
                    console.log(res);
                    this.hideDialog();
                })
                .catch((res) => {
                    console.log(res);
                })

            
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
        height: 200px;
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
    .btn-warning{
        width: 48px;
        height: 48px;
        min-width: 48px;
        min-height: 48px;
        background: url(../../../assets/img/Sprites.64af8f61.svg) no-repeat;
        cursor: pointer;
        background-position: -594px -457px;
        border: none;
        outline: none;
        margin-right: 12px;
    }
    .btn-confirm-delete{
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