<template>
    <div class="dialog" :class="{'dialog_hide': !isShow}">
        <div id="model" @click="hideDialog()"></div>
        <div class="dialog-content">
                <div class="title-dialog">
                    <b style="font-size: 20px; color: #B1B1B1">Thông báo</b>
                    <button class="btn-X" @click="hideDialog()"></button>
                </div>
                <div class="header">
                    <div style="">Bạn có chắc chắn muốn xóa Cán bộ giáo viên <b>&#60;<span>{{teacher.teacherCode}}</span>&#62;</b> không?</div>
                </div>
                <div class="footer">
                    <button class="btn-small btn-no" @click="hideDialog()">Đóng</button>
                    <button class="btn-confirm-delete primary-color" @click="btnDelete()">Đồng ý</button>
                </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios';
import Resources from '../../common/base/resource.js';
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
                .delete(Resources.API.GetAll + "/" + this.teacher.teacherId) //xóa nhân viên
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
    .title-dialog{
        width: 100%;
        height: 20%;
        margin-top: 5%;        
    }
    .header{
        width: 100%;
        height: 35%;
        display: flex;
        align-items: center;
        /* border-bottom: 1px solid #babec5; */
    }
    .footer{
        width: 100%;
        height: 30%;
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
    .btn-no{
        position: absolute;
        right: 120px;
    }
    .btn-X{
        height: 20px;
        width: 20px;
        position: absolute;
        right: 20px;
        top: 15px;
        background: url("../../../assets/Icons/ic_X_2.png") no-repeat;
        cursor: pointer;
        border: none;
        outline: none;
        border-radius: 0px 4px 0px 4px;
    }
</style>