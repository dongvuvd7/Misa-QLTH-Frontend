<template>
    <div style="display: flex; justify-content: center; align-items:center; cursor: pointer;" >
        <button id="dropdown-icon" @click="showDropContent()" @blur="hideDropContent()"></button>
        <div id="dropdown" >     
            <div class="dropdown-content" :class="{'hide': !isShowOption}" >
                <div class="dropdown-content-a" @click="showErrorUndeveloped()" @mouseenter="enterClick()" @mouseleave="leaveClick()">
                    <div class="content-a-icon icon-copy"></div>
                    Sao chép dữ liệu từ phân hệ khác
                </div>
                <div class="dropdown-content-a" @click="showImportDialog()" @mouseenter="enterClick()" @mouseleave="leaveClick()">   
                    <div class="content-a-icon icon-import"></div> 
                    <label class="btn-excel-add" id="btn-addFromExcel">
                        <input type="file" id="uploadExcel" @change="importFileExcel"/>
                        Nhập khẩu
                    </label>
                </div>
                <!-- <div class="dropdown-content-a">Ngưng sử dụng</div> -->
                <div class="dropdown-content-a" @click="showTeacherMultipleDelete()" @mouseenter="enterClick()" @mouseleave="leaveClick()">
                    <div class="content-a-icon icon-delete"></div>
                    Xóa
                </div>
            </div>
        </div>


    </div>
</template>

<script>

export default {

    components:{
    },

    data() {
        return {
            // Biến hiện/ẩn option thêm
            isShowOption: false,
            // Biến phân biệt click vs blur (trong trường hợp click vào lựa chon dropdown content thì blur sẽ chạy trước)
            overClick: false,


        }
    },

    created() {

    },

    methods: {
        /**
        Hiện dropdown content
        CreatedBy: VDDong (15/06/2021)
         */
         showDropContent() {
             this.isShowOption = true;
         },
        /**
        Ẩn dropdown content
        CreatedBy: VDDong (15/06/2021)
         */
         hideDropContent(){
             if(this.overClick == false)
                this.isShowOption = false;
         },
        /**
        Hiện dialog xác nhận xóa
        CreatedBy: VDDong (15/06/2021)
         */
        showImportDialog(){
            console.log("nhập khẩu");
            // this.$emit('showDeleteDialog');
            this.isShowOption = false;
        },
        /**
        Hiện dialog nhân bản
        CreatedBy: VDDong (15/06/2021)
         */
        showTeacherMultipleDelete(){
            this.isShowOption = false;
            console.log("xóa nhiều");
            this.$emit('deleteMultiple');
            
        },
        /**
        Phân biệt chuột di chuyển vào / ra dropdown content
        CreatedBy: VDDong (15/06/2021)
         */
        enterClick(){
            this.overClick = true;
        },
        leaveClick(){
            this.overClick = false;
        },

        showErrorUndeveloped(){
            console.log("Sao chép (đang phát triển)");
            // this.$emit('showStopUsingDialog');
            this.isShowOption = false;

        },

        importFileExcel(){
            console.log("tải file lên");
            // this.$emit('importFile');
            this.isShowOption = false;
        }

    },
}
</script>

<style scoped>

    .bg-black{
        
    }

    #dropdown{
        position: relative;
        display: inline-block;
        z-index: 4;
    }
    #dropdown-icon{
        width: 20px;
        height: 16px;
        min-width: 16px;
        min-height: 16px;
        background: url("../../assets/Icons/more.png") no-repeat;
        cursor: pointer;
        background-position: 0px 1px;
        background-size: cover;
        border: none;
        /* outline: aqua; */
    }
    #dropdown-icon:hover{
        border-color:aqua;
    }
    .dropdown-content{
        
        position: absolute;
        right: -5px;
        top: 20px;
        padding: 2px;
        background-color: #fff;
        /* min-width: 160px; */
        overflow: auto;
        width: 240px;
        height: 97px;
        border: 1px solid #babec5;
        box-sizing: border-box;
        border-radius: 4px;
        
        
    }
    .reserve{
        top: auto;
        bottom: 100%;
    }
    .dropdown-content-a{
        font-size: 12px;
        height: 30px;
        width: 100%;
        display: flex;
        align-items: center;
        padding-left: 4px;
        box-sizing: border-box;
        border: none;
        outline: none;
        color: #3a3a3a;
    }
    .dropdown-content-a:hover{
        background-color: #f1f1f1;
        cursor: pointer;
        color: #2ca01c;
    }
        .content-a-icon{
            width: 24px;
            height: 100%;
            /* border: 1px solid #ccc; */
            margin-right: 5px;
        }
            .icon-copy{
                background-image: url('../../assets/Icons/ic_Copy.svg');
                background-position: center;
                background-size: 22px;
            }
            .icon-import{
                background-image: url('../../assets/Icons/ic_nhapkhau.png');
                background-position: center;
                background-size: 22px;
            }
            .icon-delete{
                background-image: url('../../assets/Icons/ic- Del.svg');
                background-position: center;
                background-size: 22px;
            }
    .hide{
        display: none;
    }
    .btnEdit:hover{
        font-weight: bold;
    }

    .btn-excel-add {
        display: inline-block;
        width: 100%;
        padding: 6px 6px 6px 0px;
        cursor: pointer;
        border-radius: 5px;
        /* border: 1px solid #babec5; */
        color: #3a3a3a;
    }
</style>