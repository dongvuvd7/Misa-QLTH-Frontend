<template>
    <div style="display: flex; justify-content: center; align-items:center; margin-top: 9px;">
        <div class="dropdown-text-and-icon">
            <input id="dropdown-text" type="text"
                readonly      
                @focus="showDropDownContent(options)" 
                @blur="hideDropDownContent()" 
                @keyup="searchOption()"
                v-model="selectedOption.text" 
                :placeholder="msgPlacehoder"
                autocomplete="off"
            />
            <button id="dropdown-icon" 
                :class="{'dropdown-icon-click' : isClicked}"        
                @click="showDropDownContent(options)" 
                @blur="hideDropDownContent()">
            </button>
        </div>
        <div id="dropdown">     
            <div class="dropdown-content" :class="{'hide': !isShowOption}" >
                <div class="dropdown-content-a" :class="{'selected': selectedOption.text == option.text}"
                    v-for="option in options" 
                    :key="option.id" 
                    @click="chooseOption(option)" 
                    @mouseenter="enterClick()" 
                    @mouseleave="leaveClick()"
                    >{{option.text}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import Enums from './base/enum.js';
import Resources from './base/resource.js';

export default {

    created() {
        if(this.typeDropdown == Resources.DropdownTitle.SortName) this.msgPlacehoder = Resources.DropdownTitle.SortPlacehoder;
        if(this.typeDropdown == Resources.DropdownTitle.GroupName) this.msgPlacehoder = Resources.DropdownTitle.GroupPlacehoder;
    },

    props: {
        options: {
            type: Array,
            default: null,
        },
        typeDropdown: {
            type: String,
            default: null,
        },
        initialOptions: {
            type: Array,
            default: null,
        }

    },

    data() {
        return {
            isShowOption: false, //biến ẩn/hiện các option của comboBox
            selectedOption: { //option được chọn
                id: null,
                text: null,
            },
            //biến kiểm tra xem chuột có di chuyển vào các option hay không ? -> phân biệt blur với click
            overClick: false,
            //biến kiểm tra xem button đã click hay chưa
            isClicked:  false,
            //Biến truyền vào placeholder
            msgPlacehoder: "",
        }
    },

    methods: {
        /**
         * Cụm hàm xử lý Dropdown combobox
         * CreatedBy: VDDong (26/11/2021)
         */
        //Hiện ra dữ liệu cho combobox
        showDropDownContent(){
            this.isClicked = !this.isClicked;
            this.isShowOption = !this.isShowOption;
        },
        //Ẩn dữ liệu combobox
        hideDropDownContent(){
            if(this.overClick == false) this.isShowOption = false;
        },
        //Khi di chuyển chuột vào trong các option
        enterClick(){
            //Gán overClick = true để tránh lỗi click và focusout overlapping (khi click thì focusout sẽ chạy trước mà không chạy click)
            this.overClick = true;
        },
        //Khi di chuyển chuột ra khỏi các option
        leaveClick(){
            this.overClick = false;
        },
        //Chọn option gán vào input
        chooseOption(option){
            this.selectedOption.text = option.text;
            this.selectedOption.id = option.id;
            this.$emit('solveOnParent', this.selectedOption.id, this.typeDropdown); //truyền vào biến info của handlePerPage bên employeeList.vue
            this.overClick = false;
            this.hideDropDownContent();
        },
        //Tìm kiếm ở ô input so với các options dropdown sổ xuống
        searchOption(){
            this.options = this.initialOptions.filter(option => {
                return (
                    option.text.toLowerCase().includes(this.selectedOption.text.toLowerCase())
                )
            });
        },
        //Set lại số lượng bản ghi 1 trang trong combobox 
        //Khi chạy hàm refreshData() thì mặc định selectedOption của comboBox phải quay lại 20 bản ghi 1 trang
        resetChoose(){
            this.selectedOption.text = ""; //chỉ là hiên thị của comboBox, còn thực tế hiển thị lên table là việc của hàm refreshData
        }
        
    },

}
</script>

<style scoped>
    .hide{
        display: none;
    }
    #dropdown{
        position: relative;
        display: inline-block;
    }
    .dropdown-content{
        /* height: 120px; */
        width: 180px;
        position: absolute;
        top: 18px;
        left: -180px;
        border: 1px solid;
        background-color: #f1f1f1;
        cursor: pointer;
        border: 1px solid #babec5;
        z-index: 3;
    }
    .dropdown-content-a{
        height: 30px;
        width: 100%;
        display: flex;
        align-items: center;
        padding-left: 8px;
        box-sizing: border-box;
        border: none;
        outline: none;
        font-size: 13px;
    }
    .dropdown-content-a:hover{
        color: #03AE66;
        background-color: rgb(219, 219, 219);
    }
    .selected{
        background-color: #03AE66;
        color: #fff;
    }
    .selected:hover{
        background-color: #03AE66;
        color: #fff;
    }
    .dropdown-text-and-icon{
        display: flex;
        align-items: center;
        border: 1px solid #babec5;
        border-collapse: collapse;
        border-radius: 2px;
        /* background-color: #2ca01c; */

    }
    .dropdown-text-and-icon:hover{
        border-color: #03AE66;
        /* background-color: aqua; */

    }
    .dropdown-text-and-icon:focus-within{
        border-color: #2ca01c;
        /* background-color: aqua; */

    }
    #dropdown-text{
        height: 31px;
        width: calc(100% - 32px);
        padding: 6px 0 6px 12px;
        box-sizing: border-box;
        border: none;
        outline: none;
        border-collapse: collapse;
        border-radius: 4px;
    }
    #dropdown-icon{
        width: 31px;
        height: 31px;
        border: none;
        outline: none;
        border-collapse: collapse;
        border-radius: 4px;
        background: url("../../assets/img/Sprites.64af8f61.svg") no-repeat;
        background-position: -553px -353px;
        
        
    }

    .dropdown-icon-click{
        /* transform: rotate(180deg); */
        transition: transform .15s linear;
    }
</style>