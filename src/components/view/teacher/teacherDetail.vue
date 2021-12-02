<template>
    <div class="dialog" data-app>
        <!-- Màn đen bọc dialog -->
        <div class="model" @click="hideDialogDataCondition()"></div>
        <div class="dialog-content">
            <div class="left-dialog-content"></div>
            <div class="right-dialog-content">
                <!-- Nội dung dialog -->
                <div class="middle">
                    <div class="middle-1">
                        <!-- Ảnh đại diện -->
                        <div class="column clm1">
                            <div class="img-avt">
                            </div>
                            <div class="btn-add-avt primary-color">
                                Chọn ảnh
                            </div>
                            <div class="clm1-name">
                                {{teacher.teacherName}}
                            </div>
                            <div class="clm1-code">
                                {{teacher.teacherCode}}
                            </div>
                        </div>
                        <!-- Nhập liệu dialog -->
                        <div class="column clm2">
                            <!-- Phần title và nút đóng -->
                            <div class="header">
                                <div id="title">Thêm hồ sơ Cán bộ, giáo viên</div>
                                <button class="btn-help">
                                    <span class="tooltiptext">Để biết thêm thông tin, tham khảo google.com hì</span>
                                </button>
                                <button class="btn-X" @click="hideDialogDataCondition()"></button>
                            </div>
                            <!-- Hàng nhập liệu 1 -->
                            <div style="display: flex; align-items: center;">
                                <div class="input_bar" style="width: 50%; margin-right: 2px;">
                                    <div class="title-blank-box" style="position: relative"><b>Số hiệu cán bộ</b> <span style="color: red;">*</span>
                                        <div class="error-message" v-show="isValid.teacherCodeMessage == false" style="top: 3px;">SHCB chưa hợp lệ</div>
                                    </div>
                                    <input type="text" class="code-blank-box"
                                        :class="{'blank-box-invalid': isValid.teacherCode == false}"
                                        ref="teacherCode"
                                        v-model="teacher.teacherCode"
                                        @mouseenter="mouseEnterError('teacherCode')"
                                        @mouseleave="mouseLeaveError()"
                                        @blur="checkRequired('teacherCode', $event)"
                                    />
                                </div>
                                <div class="input_bar" style="width: 50%; margin-left: 2px;">
                                    <div class="title-blank-box" style="position: relative"><b>Họ và tên</b> <span style="color: red;">*</span>
                                        <div class="error-message" v-show="isValid.teacherNameMessage == false" style="top: 2px; left: 290%; width: 180px;">Họ và tên không được để trống</div>
                                    </div>
                                    <input type="text" class="fullname-blank-box" style="text-transform: capitalize; "
                                        :class="{'blank-box-invalid': isValid.teacherName == false }" 
                                        v-model="teacher.teacherName"
                                        @mouseenter="mouseEnterError('teacherName')"
                                        @mouseleave="mouseLeaveError()"
                                        ref="nameRef"
                                        @blur="checkRequired('teacherName', $event)"
                                    />                    
                                </div>
                            </div>
                            <!-- Hàng nhập liệu 2 -->
                            <div style="display: flex; align-items: center;">
                                <div class="input_bar" style="width: 50%; margin-right: 2px;">
                                    <div class="title-blank-box" style="position: relative"><b>Số điện thoại</b>
                                        <div class="error-message" v-show="isValid.phone == false" style="top: 3px;">SĐT chưa hợp lệ</div>
                                    </div>
                                    <input type="text" class="code-blank-box"
                                        :class="{'blank-box-invalid': isValid.phone == false}" 
                                        v-model="teacher.teacherPhone"
                                        @blur="checkPhone" 
                                    />
                                </div>
                                <div class="input_bar" style="width: 50%; margin-left: 2px;">
                                    <div class="title-blank-box" style="position: relative"><b>Email</b>
                                        <div class="error-message" v-show="isValid.email == false" style="top: 3px; left: 288%;">Email chưa hợp lệ</div>
                                    </div>
                                    <input type="email" class="fullname-blank-box"
                                        :class="{'blank-box-invalid': isValid.email == false }" 
                                        v-model="teacher.teacherEmail"
                                        @blur="checkEmail" 
                                    />                    
                                </div>
                            </div>
                            <!-- Hàng nhập liệu 3 -->
                            <div style="display: flex; align-items: center;">
                                <div class="input_bar" style="width: 50%; margin-right: 2px;">
                                    <div style="position: relative; width: 35%; line-height: 48px;"><b>Tổ bộ môn</b><span style="color: red;">*</span>
                                        <div class="error-message" v-show="isValid.teacherGroupMessage == false" style="width: 135px;">Tổ bộ môn chưa hợp lệ</div>
                                    </div>
                                    <!-- combobox -->
                                    <div class="dropdown-text-and-icon" :class="{'blank-box-invalid': isValid.teacherGroup == false}">
                                        <input type="text" class="input-blank-box" 
                                            @focus="showDropDownContent('teacherGroup')" 
                                            @blur="hideDropDownContent('teacherGroup')" 
                                            id="groupName"
                                            v-model="teacher.teacherGroupName"
                                            @mouseenter="mouseEnterError('teacherGroupName')"
                                            @mouseleave="mouseLeaveError()"
                                            @keyup="searchOption('teacherGroup')"
                                            autocomplete="off"
                                            tabindex="-1"
                                        />
                                        <button id="dropdown-icon" @click="showDropDownContent('teacherGroup')" @blur="hideDropDownContent('teacherGroup')"></button>
                                    </div>
                                    <div id="dropdown">     
                                        <div class="dropdown-content" :class="{'dialog_hide': !isShowOption.teacherGroup}" >
                                            <div class="dropdown-content-a" 
                                                :class="{'drop-down-content-selected' : option.id == teacher.teacherGroup}"
                                                v-for="option in listOptions.teacherGroup" 
                                                :key="option.id" 
                                                @click="chooseOption(option, 'teacherGroup')" 
                                                @mouseenter="enterClick()" 
                                                @mouseleave="leaveClick()"
                                            >{{option.name}}</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="input_bar" style="width: 50%; margin-right: 2px;">
                                    <div class="title-blank-box" style="position: relative; margin-right: 4px;"><b>QL theo môn</b>
                                    </div>
                                    <!-- <input type="text" class="fullname-blank-box"
                                        v-model="teacher.teacherSubject"
                                    /> -->

                                    <treeselect
                                        style="width: 65%; margin-top: 5px;"
                                        :options="listItemSubjects"
                                        :multiple="true"
                                        :limit="1"
                                        v-model="itemSubjects"
                                        placeholder="Chọn các môn"
                                    />

                                    <!-- <v-combobox
                                        style="width: 65%;"
                                        v-model="itemSubjects"
                                        :items="listItemSubjects"
                                        multiple
                                        outlined
                                        dense
                                        clearable
                                        small-chips
                                        tabindex="6"
                                    ></v-combobox> -->

                                    <!-- combobox -->
                                    <!-- <div class="dropdown-text-and-icon" :class="{'blank-box-invalid': isValid.groupName == false}"
                                        style="width: 65%"
                                    >
                                        <input type="text" class="input-blank-box item-selected" 
                                            @focus="showDropDownContent('teacherGroup')" 
                                            @blur="hideDropDownContent('teacherGroup')" 
                                            id="groupName"
                                            v-model="teacher.teacherGroupName"
                                            @mouseenter="mouseEnterError('teacherGroupName')"
                                            @mouseleave="mouseLeaveError()"
                                            @keyup="searchOption('teacherGroup')"
                                            autocomplete="off"
                                        />
                                        <span class="close-item"></span>
                                        <button id="dropdown-icon" @click="showDropDownContent('teacherGroup')" @blur="hideDropDownContent('teacherGroup')"></button>
                                    </div>
                                    <div id="dropdown">     
                                        <div class="dropdown-content" :class="{'dialog_hide': !isShowOption.teacherGroup}"
                                            style="width: 200px;"
                                         >
                                            <div class="dropdown-content-a" 
                                                :class="{'drop-down-content-selected' : option.id == teacher.teacherGroup}"
                                                v-for="option in listOptions.teacherGroup" 
                                                :key="option.id" 
                                                @click="chooseOption(option, 'teacherGroup')" 
                                                @mouseenter="enterClick()" 
                                                @mouseleave="leaveClick()"
                                            >
                                            
                                                <input type="checkbox" class="btn-check" style="line-height: 56px;"
                                                    :value="option.id"
                                                />
                                                    {{option.name}}
                                            
                                            </div>
                                        </div>
                                    </div> -->

                                </div>    
                            </div>
                            <!-- Hàng nhập liệu 4 -->
                            <div style="display: flex; align-items: center">
                                <div style="position: relative; width: 110px; height: 40px; line-height: 45px;"><b>QL kho, phòng</b> </div>
                                <!-- <input type="text" class="medium-blank-box" v-model="teacher.teacherRoom"/> -->

                                <treeselect
                                    style="width: 83%;"
                                    :options="listItemRooms"
                                    :multiple="true"
                                    :limit="3"
                                    v-model="itemRooms"
                                    placeholder="Chọn các kho, phòng"
                                />

                                <!-- <v-combobox
                                    style="width: 65%;"
                                    v-model="itemRooms"
                                    :items="listItemRooms"
                                    multiple
                                    outlined
                                    dense
                                    clearable
                                    small-chips
                                    tabindex="7"
                                ></v-combobox> -->

                            </div>
                            <!-- Hàng nhập liệu 5 -->
                            <div style="display: flex; align-items: center">
                                
                                <input type="checkbox" class="btn-check" style="line-height: 56px;"
                                    :checked="teacher.teacherQltb == 1"
                                    @click="changeTeacherCheckbox('Qltb')"
                                />
                                <div class="title-checkbox" style="margin-top: 3px; line-height: 56px;">Trình độ nghiệp vụ QLTB</div>

                                <input type="checkbox" class="btn-check" style="line-height: 56px;"
                                    :checked="teacher.teacherStatus == 1"
                                    @click="changeTeacherCheckbox('Status')"
                                />
                                <div class="title-checkbox" style="margin-top: 3px; line-height: 56px; margin-right: 52px;">Đang làm việc</div>

                                <div class="date-stop-working" style="display: flex; height: 56px; margin-left: 9px;"
                                    :class="{'date-area-hide': !isShowDateArea}"
                                    
                                >
                                    <div style="margin-right: 8px; line-height: 56px;">Ngày nghỉ việc</div>
                                    <!-- <date-pick
                                        style="width: 150px; line-height: 56px;"
                                        v-model="teacher.teacherStopday"
                                        :displayFormat="'DD/MM/YYYY'"
                                    ></date-pick> -->

                                    <!-- format là định dạng hiển thị sau khi pick, value-type là dạng dữ liệu bind từ chỗ khác (table) vào -->
                                     <date-picker
                                        v-model="teacher.teacherStopday"
                                        format="DD/MM/YYYY"
                                        type="date"
                                        value-type="YYYY-MM-DD"
                                        placeholder="dd/mm/yyyy"
                                    ></date-picker>

                                </div>
                            </div>

                        </div> <!-- End nhập liệu -->
                    </div> 

                </div>   <!-- End nội dung --> 
            </div>
            <!-- Phần footer dialog -->
            <div class="footer">
                <button class="btn-small cancel default-color" @click="hideDialogDataCondition()">Đóng</button>
                <button class="btn-small post primary-color" @click="btnSave()">Lưu</button>
                <button class="btn-post-and-put primary-color" @click="btnSaveAndAdd()" tabindex="0" @keydown="focusInput()">Lưu và thêm</button>
            </div>
        </div> 
        
        <!-- Dialog báo lỗi -->
        <ErrorDialog 
            :isShow="isErrorDialogShow"
            :errorMsg="errorMsg"
            @hidePopUp = "hidePopUp"
        />
        <!-- Popup báo lỗi -->
        <ErrorPopUp
            :isShow="isErrorPopUpShow"
            :errorMsg="errorMsg"
            @hidePopUp="hidePopUp"
        />
        <!-- Popup báo thay đổi dữ liệu -->
        <DataChange 
            :isShow="isDataChange"
            :errorMsg="errorMsg"
            @hidePopUp="hidePopUp"
            @hideDialog="hideDialog"
            @btnSave="btnSave"
        />

    </div>    
</template>

<script>

import axios from 'axios'

// import DatePick from 'vue-date-pick';
// import 'vue-date-pick/dist/vueDatePick.css';
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
// import the component
import Treeselect from '@riophae/vue-treeselect'
// import the styles
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

import DataChange from '../../common/pop-up/dataChange.vue';
import ErrorDialog from '../../common/pop-up/errorDialog.vue';
import ErrorPopUp from '../../common/pop-up/errorPopUp.vue';

import Enums from "../../common/base/enum.js";
import Resources from "../../common/base/resource.js";



export default {
    components: {
        DataChange,
        ErrorDialog,
        ErrorPopUp,
        // DatePick,
        DatePicker,
        Treeselect,
    },

    created() {
        //Truyền dữ liệu động các phòng
        axios.get(Resources.API.GetRooms)
        .then((res) => {
          this.listItemRooms = this.listItemRooms.concat(
            (res.data || []).map((item) => {
              return {
                  id: item.roomName,
                  label: item.roomName,
              };
            })
          )
        })
        .catch((res) => {
          console.log(res);
        })
        //Truyền dữ liệu động các môn
        axios.get(Resources.API.GetSubjects)
        .then((res) => {
          this.listItemSubjects = this.listItemSubjects.concat(
            (res.data || []).map((item) => {
              return {
                  id: item.subjectName,
                  label: item.subjectName
              };
            })
          )
        })
        .catch((res) => {
          console.log(res);
        })


        // console.log(this.teacher);
        //Khi ở trạng thái form thêm mới thì mặc định set teacherStatus = 1
        if(this.formmode == Enums.FormMode.Add){
            this.teacher.teacherStatus = 1;
        }

        
        if(this.formmode == Enums.FormMode.Edit){
            //Tách subjects và room để bind lên combobox
            if(this.teacher.teacherSubject != null) {
                this.itemSubjects = this.teacher.teacherSubject.split(",");
            }
            if(this.teacher.teacherRoom != null) {
                this.itemRooms = this.teacher.teacherRoom.split(",");
            }

            //Xác định trạng thái công việc (teacherStatus) để xác định có hiện date area (ngày nghỉ việc) hay không
            if(this.teacher.teacherStatus == 1) this.isShowDateArea = false;
            else if(this.teacher.teacherStatus == 0) this.isShowDateArea = true;
        }


    },

    data() {
        return {
            //Biến ẩn hiện khu vực chọn ngày nghỉ việc
            isShowDateArea: false,

            //Mảng lưu trữ các môn học (QL theo môn)
            itemSubjects: [],
            listItemSubjects: [
                // Enums.Subject.Toan,
                // Enums.Subject.Ly,
                // Enums.Subject.Hoa,
                // Enums.Subject.Sinh,
                // Enums.Subject.NguVan,
                // Enums.Subject.LichSu,
                // Enums.Subject.Tin,
                // Enums.Subject.AnhVan,
                // Enums.Subject.Dia,
                // Enums.Subject.TheChat,
                // Enums.Subject.CongDan,
            ],
            //Mảng lưu trữ các phòng (QL kho, phòng)
            itemRooms: [],
            listItemRooms: [
                // Enums.Room.ToanLy,
                // Enums.Room.HoaSinh,
                // Enums.Room.AnhVan,
                // Enums.Room.Chung,
            ],


            //Biến bật tắt combobox custom
            isShowOption: {
                teacherGroup: false,

            },
            //List các lựa chọn của combobox
            listOptions: {
                teacherGroup: [
                    {id: Enums.Group.VPId, name: Enums.Group.VP},
                    {id: Enums.Group.LHId, name: Enums.Group.LH},
                    {id: Enums.Group.TTId, name: Enums.Group.TT},
                    {id: Enums.Group.SSDId, name: Enums.Group.SSD},
                    {id: Enums.Group.NVId, name: Enums.Group.NV},
                    {id: Enums.Group.AVId, name: Enums.Group.AV},
                ],

            },
            //List các lựa chọn combobox (dùng trong việc so sánh input nhập vào phải đúng dữ liệu)
            initialListOptions: {
                teacherGroup: [
                    {id: Enums.Group.VPId, name: Enums.Group.VP},
                    {id: Enums.Group.LHId, name: Enums.Group.LH},
                    {id: Enums.Group.TTId, name: Enums.Group.TT},
                    {id: Enums.Group.SSDId, name: Enums.Group.SSD},
                    {id: Enums.Group.NVId, name: Enums.Group.NV},
                    {id: Enums.Group.AVId, name: Enums.Group.AV},
                ]
            },
            
            //Biến kiểm tra xem chuột có di chuyển vào các option hay không, để phân biệt click với blur
            overClick: false,

            //Biến kiểm tra validate
            isValid: {
                teacherCode: true,
                teacherName: true,
                teacherGroup: true,
                teacherCodeMessage: true,
                teacherNameMessage: true,
                teacherGroupMessage: true,
                stopdayAndToday: true,

                phone: true,
                email: true,

            },

            //Biển để hiện dialog thông báo trùng mã nhân viên
            isErrorDialogShow: false,
            //Biến để hiện pop-up thông báo trống mã hoặc tên
            isErrorPopUpShow: false,
            //Biến để nhận giá trị của teacher truyền vào ban đầu, để so sánh sau khi thay đổi
            initialTeacher: {},
            //Biến để hiện thông báo đã có thay đổi dữ liệu
            isDataChange: false,
            //Biến để nhận thông báo lỗi trả về từ API
            errorMsg: "",

            //Biến để xác nhận thông tin nhân viên đã hợp lệ để put/post lên database
            isAppropriate: null,


        }
    },

    props: {
        teacher: {
            type: Object,
            default: null,
        },
        formmode: {
            type: String,
            default: null,
        },
    },

    updated(){

    },

    mounted() {
        //auto focus vào ô input teacherCode
        this.focusInput();

        //copy teacher sang 1 object khac de so xem co su thay doi khong?
        this.initialTeacher = {...this.teacher};

    },

    methods: {

        /**
       * Cụm hàm check validate
       * Khi không thỏa mãn thì báo lỗi, khi thỏa mãn rồi thì bỏ báo lỗi đi
       * CreatedBy: VDDong (11/09/2021)
       */
      checkRequired: function(teacherProp, e) {
          if(!this.teacher[teacherProp]){
              this.isValid[teacherProp] = false; //báo viền đỏ
          }
          else {
              this.isValid[teacherProp] = true; //tắt viền đỏ
          }
      },
      validEmail: function (email) {
          var re = Resources.Regexs.Email;
          return re.test(email);
      },
      checkEmail: function(e){
          if(!this.validEmail(this.teacher.teacherEmail) && this.teacher.teacherEmail != null && this.teacher.teacherEmail != ""){
              this.isValid.email = false;
          }
          else {
              this.isValid.email = true;
          }
      },
      validPhone: function (phone) {
          var re = Resources.Regexs.Phone;
          return re.test(phone);
      },
      checkPhone: function(e){
          if(!this.validPhone(this.teacher.teacherPhone) && this.teacher.teacherPhone != null && this.teacher.teacherPhone != ""){
              this.isValid.phone = false;
          }
          else {
              this.isValid.phone = true;
          }
      },

        
        /**
        Thay đổi teacherQltb hoặc teacherStatus khi nhấn vào tích checkbox
        Hàm dùng chung
        CreatedBy: VDDong (19/11/2021)
         */
         changeTeacherCheckbox(type){
             //đặt giá trị cho teacherQltb và teacherStatus
             var property = 'teacher' + type;
             if(!this.teacher[property] || this.teacher[property] == 0) this.teacher[property] = 1;
             else if(this.teacher[property] == 1) this.teacher[property] = 0;
            //  console.log(this.teacher[property], property);

            //ẩn hiên date area (ngày nghỉ việc)
            if(this.teacher.teacherStatus == 0) this.isShowDateArea = true;
            else if(this.teacher.teacherStatus == 1) this.isShowDateArea = false;

         },

        /**
         * So sánh 2 Object để kiểm tra xem dữ liệu đã thay đổi chưa
         * Return true: có thay đổi, false: chưa thay đổi
         * CreatedBy: VDDong (19/11/2021)
         */
        compareDataObject(obj1, obj2){
            for(let i in obj1){
                if(obj1[i] !== obj2[i]) return true;
            }
            return false
        },

        /**
         * Ẩn dialog TeacherDetail
         * CreatedBy: VDDong (19/11/2021)
         */
        hideDialog(){
            //Reset lại các biến validate form
            this.isValid.teacherName = true;
            this.isValid.teacherCode = true;
            this.isValid.teacherGroup = true;
            this.isValid.stopdayAndToday = true;
            //Gọi phương thức ẩn của thằng cha là teacherList
            this.$emit('hideDialog');
        },

        /**
        * Ẩn dialog
        * Nếu dữ liệu đã bị thay  đổi thì hiện pop up DataChange, nếu không thì ẩn dialog TeacherDetail
        * CreatedBy: VDDong (19/11/2021)
        */
        hideDialogDataCondition(){
            // console.log(this.initialTeacher, "initialTeacher");
            // console.log(this.teacher, "teacher");

            if(this.formmode == Enums.FormMode.Add){ //formmode add thì initialTeacher và teacher ở dạng observer nên cần convert trước khi so
                var initTeacherAdd = JSON.parse(JSON.stringify(this.initialTeacher))
                // console.log(initTeacherAdd, 'initeacheradd');
                var teacherAdd = JSON.parse(JSON.stringify(this.teacher))
                // console.log(teacherAdd, 'teacheradd');
                if(this.compareDataObject(teacherAdd, initTeacherAdd)){
                    this.isDataChange = true;
                    this.errorMsg = Resources.ErrorMessage.DataChange;
                }
                else this.hideDialog();
            }
            else {
                if(this.compareDataObject(this.teacher, this.initialTeacher)){
                    this.isDataChange = true;
                    this.errorMsg = Resources.ErrorMessage.DataChange;
                }
                else this.hideDialog();
            }
        },


        /**
         * Cụm hàm lên quan combobox custom
        * Hiện combobox
        * CreatedBy: VDDong (19/11/2021)
        */
        showDropDownContent(type){
            this.listOptions[type] = this.initialListOptions[type];
            this.isShowOption[type] = !this.isShowOption[type];      
            
        },
       /**
        * Ẩn combobox
        * CreatedBy: VDDong (19/11/2021)
        */
        hideDropDownContent(type){
            if(this.overClick == false) this.isShowOption[type] = false;
            if(this.teacher[type]) this.isValid[type] = true;
        },
        /**
        * Gán dữ liệu đã chọn từ combobox cho chủ thể teacher và format cho đúng định dạng
        * CreatedBy: VDDong (19/11/2021)
        */
        chooseOption(option, type){
            var propertyId = type;

            //Gán giá trị được chọn cho id và tên phòng ban của teacher
            this.teacher[propertyId] = option.id;
            // this.teacher.departmentName = option.name;
            this.optionFormat(this.teacher[propertyId], type);
            this.overClick = false;
            this.hideDropDownContent(type);
        },
        //Format tên phòng ban để binding vào form
        optionFormat(Id, type){
            var propertyName  = type + 'Name'; 

            this.listOptions[type].forEach(option => {
                    if(Id == option.id) {
                        this.teacher[propertyName] = option.name;
                    }
                });
        },
        /**
         * Tìm kiếm ô input đơn vị so với các option data có sẵn từ combobox
         * CreatedBy: VDDong (19/11/2021)
         */
        searchOption(type){
            var propertyName = type + 'Name';

            this.listOptions[type] = this.initialListOptions[type].filter(option => {
                return (
                    option.name.toLowerCase().includes(this.teacher[propertyName].toLowerCase())
                )
            })
        },
        /**
         * Di chuyển chuột vào ra các option của combobox
         * CreatedBy: VDDong (19/11/2021)
         */
        //Khi di chuyển chuột vào trong các option
        enterClick(){
            //Gán overClick = true để tránh lỗi click và focusout overlapping (khi click thì focusout sẽ chạy trước mà không chạy click)
            this.overClick = true;
        },
        //Khi di chuyển chuột ra khỏi các option
        leaveClick(){
            this.overClick = false;
        },

        /**
         * Auto focus vào ô teacherCode khi hiện dialog TeacherDetail
         * CreatedBy: VDDong (19/11/2021)
         */
        focusInput(){
            this.$refs.teacherCode.focus();
        },

        /**
         * Validate trường hợp ô teacher code và fullname bỏ trống hoặc nhập toàn dấu cách (khoảng trắng) 
         * CreatedBy: VDDong (19/11/2021)
         */
        nullValidation(propertyValue, propertyName){
            propertyValue = propertyValue || '';
            if (propertyValue.trim() == "") {
                if(propertyName == Resources.Property.TeacherCode) {
                    this.isValid.teacherCode = false;
                    this.isErrorPopUpShow = true;
                    this.errorMsg = Resources.ErrorMessage.NullTeacherCode;
                    
                }
                else if(propertyName == Resources.Property.FullName) {
                    this.isValid.teacherName = false;
                    this.isErrorPopUpShow = true;
                    this.errorMsg = Resources.ErrorMessage.NullFullName;
                    this.$refs.nameRef.focus();
                }
            } 
            else{
                if(propertyName == Resources.Property.TeacherCode) {
                    this.isValid.teacherCode = true;
                }
                else if(propertyName == Resources.Property.FullName) {
                    this.isValid.teacherName = true;
                }
            }    
        },

        /**
         * Validate tên tổ chuyên môn
         * CreatedBy: VDDong (19/11/2021)
         */
        groupNameValidation(value){
            //Validate tên đơn vị không được trống
            value = value || '';
            if (value.trim() == "") {
                this.isValid.teacherGroup = false;
                this.isErrorPopUpShow = true;
                this.errorMsg = Resources.ErrorMessage.NullGroup;
            }
            else {
                this.isValid.teacherGroup = false;
                //Validate tên đơn vị giống với tên đơn vị trong option
                //Kiểm tra xem thông tin nhập vào có đúng với các option tên đơn vị không
                this.listOptions.teacherGroup.forEach(option => {
                    if(option.name == value) {
                        this.isValid.teacherGroup = true;
                        this.teacher.teacherGroup = option.id;
                    }
                });
                if(this.isValid.teacherGroup == false) 
                {
                    this.isErrorPopUpShow = false;
                    this.isErrorDialogShow = true;
                    this.errorMsg = Resources.ErrorMessage.InvalidGroup;
                }
            }
        },

        /**
         * Validate ngày không được lớn hơn ngày hiện tại
         * CreatedBy: VDDong (19/11/2021)
         */
        dateValidation(prop){
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            today = yyyy + "-"+ mm + "-" + dd;

            // console.log(this.teacher.teacherStopday, 'teacherStopday');
            // console.log(today, 'today');
            if(this.teacher[prop] > today){
                // console.log("date bigger")
                this.isValid.stopdayAndToday = false;
                this.isErrorPopUpShow = true;
                this.errorMsg = Resources.ErrorMessage.StopdayAndToday;
            } else {
                this.isValid.stopdayAndToday = true;
            }
        },


        /**
         * Validate trước khi request lên database
         * CreatedBy: VDDong (19/11/2021)
         */
        formValidation(){
            //Gán dữ liệu cho teacherSubject và teacherRoom
            var subjects = this.itemSubjects.toString();
            var rooms = this.itemRooms.toString();
            // console.log(subjects, 'itemSubjects');
            // console.log(rooms, 'itemRooms');
            this.teacher.teacherSubject = subjects;
            this.teacher.teacherRoom = rooms;
            if(this.teacher.teacherSubject == "") this.teacher.teacherSubject = null;
            if(this.teacher.teacherRoom == "") this.teacher.teacherRoom = null;
            //Fix lối nếu bấm xóa ngày thì bị lỗi, fix nếu xóa thì chuyển thành null
            if(!this.teacher.teacherStopday) this.teacher.teacherStopday = null;

            //Validate ngày nghỉ việc không được lớn hơn ngày hiện tại
            this.dateValidation('teacherStopday');
            //Validate tên tổ chuyên môn
            this.groupNameValidation(this.teacher.teacherGroupName);
            //Validate tên nhân viên không được trống hoặc là khoảng trắng
            this.nullValidation(this.teacher.teacherName, Resources.Property.FullName);
            //Validate mã nhân viên không được trống hoặc là khoảng trắng
            this.nullValidation(this.teacher.teacherCode, Resources.Property.TeacherCode);
            
            
            //Nếu thỏa mã hết các validate thì chấp thuận
            if(this.isValid.teacherName == true
                && this.isValid.teacherCode == true
                && this.isValid.teacherGroup == true
                && this.isValid.stopdayAndToday == true
                && this.isValid.phone == true
                && this.isValid.email == true
            ) this.isAppropriate = true;
            else this.isAppropriate = false;         
        },

        /**
         * Ẩn các error popup và error dialog, error datachange, reset lại error msg
         * CreatedBy: VDDong (19/11/2021)
         */
        hidePopUp(){
            //đóng thông báo trùng mã, tên đơn vị không trong hệ thống
            this.isErrorDialogShow = false;
            //Đóng thông báo mã null, tên đơn vị null, mã nhân viên null
            this.isErrorPopUpShow = false;
            //Đóng thông báo đã có dữ liệu bị thay đổi
            this.isDataChange = false;
            //reset nội dung thông báo lỗi
            this.errorMsg = "";
        },

        /**
         * Cụm hàm ẩn/hiện lỗi khi trỏ chuột vào ô input bị lỗi
         * Trỏ chuột vào - hiện lỗi, trỏ chuột ra - ẩn lỗi
         * CreatedBy: VDDong (19/11/2021)
         */
        //Di chuyển chuột vào trong hiện lỗi
        mouseEnterError(propertyName){
            if( this.isValid.teacherCode == false && propertyName == Resources.Property.TeacherCode){
                this.isValid.teacherCodeMessage = false;
            }
            else if( this.isValid.teacherName == false && propertyName == Resources.Property.FullName){
                this.isValid.teacherNameMessage = false;
            }
            if( this.isValid.teacherGroup == false && propertyName == Resources.Property.GroupName) 
                this.isValid.teacherGroupMessage = false;
            
        },
        //Di chuyển chuột ra ngoài ẩn lỗi
        mouseLeaveError(){
            this.isValid.teacherCodeMessage = true;
            this.isValid.teacherNameMessage = true;
            this.isValid.teacherGroupMessage = true;

            // this.isValid.questionMessage = true;
        },

        /**
         * Reset lại các thông tin nhân viên khi bấm 'cất và thêm'
         * CreatedBy: VDDong (19/11/2021)
         */
        resetTeacher(){
            //reset lại teacherSubjects và teacherRooms
            this.itemSubjects = [];
            this.itemRooms = [];
            //Nếu đang bật date area (ngày nghỉ việc) thì ẩn nó đi
            this.isShowDateArea = false;
            //Gọi hàm bật dialog form thêm bên teacherList
            this.$emit('showTeacherDialog');
            this.focusInput();
        },

        /**
         * Thông báo validate gửi về từ server
         * CreatedBy: VDDong (19/11/2021)
         */
        validateFromServer(notice){
            if(notice.includes(Resources.MsgFromServer.TeacherCode)){
                this.isValid.teacherCode = false;
                this.isValid.phone = true;
                this.isValid.email = true;
            }
            if(notice.includes(Resources.MsgFromServer.Phone)){
                this.isValid.teacherCode = true;
                this.isValid.phone = false;
                this.isValid.email = true;
            }
            if(notice.includes(Resources.MsgFromServer.Email)){
                this.isValid.teacherCode = true;
                this.isValid.phone = true;
                this.isValid.email = false;
            }

            this.errorMsg = notice;
            this.isErrorDialogShow = true;
        },

        /**
         * Phân biệt post vs put, rồi post / put lên database
         * CreatedBy: VDDong (19/11/2021)
         */
        callApiRequest(){
            
            // if(this.employee.identityDate == undefined) this.employee.identityDate = null;
            // if(this.employee.dateOfBirth == undefined) this.employee.dateOfBirth = null;
            // console.log(this.teacher);

            if(this.formmode == Enums.FormMode.Add) {
                return axios
                    .post(Resources.API.GetAll, this.teacher)
                    .then((res) => {
                        console.log(res);
                        var msg = Resources.Notice.AddSuccess;
                        this.$emit('turnPopUpSuccess', msg);
                        return Promise.resolve();
                    })
                    .catch((res) => {
                        var errorContent = res.response.data.devMsg;
                        // console.log(errorContent);
                        this.validateFromServer(errorContent);                     
                        return Promise.reject();
                    })

            }
            else if(this.formmode == Enums.FormMode.Edit){
                return axios
                    .put(Resources.API.GetAll + "/" + this.teacher.teacherId, this.teacher)
                    .then((res) => {
                        console.log(res);
                        var msg = Resources.Notice.EditSuccess;
                        this.$emit('turnPopUpSuccess', msg);
                        return Promise.resolve();
                    })
                    .catch((res) => {
                        // console.log(res.response);
                        var errorContent = res.response.data.devMsg;
                        // console.log(errorContent);
                        this.validateFromServer(errorContent);                      
                        return Promise.reject();
                    })
            }
        },

        /**
         * Cụm hàm cập nhật dữ liệu lên database
         * CreatedBy: VDDong (19/11/2021)
         */
        //Cất
        btnSave(){
            // console.log(this.teacher);
            this.formValidation();
            if(this.isAppropriate){
                this.callApiRequest().then(() => this.hideDialog());
            }
        },
        //Cất và thêm
        btnSaveAndAdd(){
            this.formValidation();
            if(this.isAppropriate){
                this.callApiRequest().then(() => this.resetTeacher());
            }
        },

    },


}
</script>


<style scoped>

    .item-selected{
        background: #dfdfdf;
        color: #000;
        float: left;
        font-size: 12px;
        padding: 2px 5px;
        border-radius: 0px !important;
        border: 1px solid #DDD;
        margin: 1px 0px 1px 0;
        max-width: 100px;
        height: 24px !important;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: unset;
        white-space: pre;
    }
    .close-item{
        padding: 2px 5px;
        /* border-radius: 4px; */
        border: 1px solid #DDD;
        width: 20px;
        height: 24px;
        background: #dfdfdf;
        cursor: pointer;
        float: right;
        background-image: url('../../../assets/img/ic_x.png');
        background-position: -5px -1px;
    }




    b{
    font-size: 13px;
    }

    .dialog_hide {
        display:none;
    }
    .date-area-hide{
        display: none !important;
    }
    #area-date-hide{
        display: none !important;
    }
    .model {
        position: fixed;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        background-color: #000000;
        opacity: .4;
        z-index: 3;
    }
    .dialog-content{
        position: fixed;
        width: 900px;
        height: 425px;
        top: calc(50% - 250px);
        left: calc(50% - 450px);
        background-color: white;
        border-radius: 4px;
        box-sizing: border-box;
        z-index: 3;
    }

    /* Phần header của dilog */
    .header{
        display: flex;
        align-items: center;
        width: 100%;
        height: 45px;
        padding-top: 5px;
        padding-bottom: 20px;
        padding-right: 12px;
        position: relative;
        overflow: hidden;
        border-radius: 5px 5px 0 0;
        box-sizing: border-box;
    }
    #title{
        font-size: 22px;
        color: #111;
        font-weight: 500;
    }
    .btn-help{
        height: 20px;
        width: 20px;
        position: absolute;
        right: 25px;
        top: 1px;
        min-width: 24px;
        min-height: 24px;
        background: url('../../../assets/img/ic-help.svg') no-repeat;
        cursor: pointer;
        background-position: center;
        background-size: 17px;
        /* background-position: -70px -132px; */
        border: none;
        outline: none;
        border-radius: 0px 4px 0px 4px;
    }
    .btn-X{
        height: 20px;
        width: 20px;
        position: absolute;
        right: 0px;
        top: 0px;
        background: url("../../../assets/Icons/ic_X_2.png") no-repeat;
        cursor: pointer;
        border: none;
        outline: none;
        border-radius: 0px 4px 0px 4px;
    }

    /* Phần middle của dialog */
    .middle{
        padding: 24px;
        padding-top: 10px;
        padding-left: 9px;
    }
    .middle-1{
        display: flex;
    }
    .clm1{
        width: 25%;
        margin-right: 12px;
        border-right: 1px solid #ccc;
    }
        .img-avt{
            width: 160px;
            height: 160px;
            margin-top: 20px;
            margin-left: 15px;
            border: 1px solid #ccc;
            background-image: url('../../../assets/img/default-avt.jpg');
            background-position: center;
            background-size: contain;
        }
        .btn-add-avt{
            width: 160px;
            height: 30px;
            margin-left: 15px;
            text-align: center;
            line-height: 30px;
            color: #fff;
            /* background-color: #03AE66; */
            cursor: pointer;
        }
        .clm1-name{
            width: 160px;
            height: 30px;
            margin-top: 15px;
            margin-left: 15px;
            font-size: 16px;
            font-weight: bold;
            text-align: center;
            line-height: 30px;
            overflow: hidden;
        }
        .clm1-code{
            width: 160px;
            height: 30px;
            margin-left: 15px;
            font-size: 15px;
            text-align: center;
            line-height: 30px;
        }

    .clm2{
        width: 75%;
        margin-left: 12px;
    }
    .input_bar{
        display: flex;
    }
    .title-blank-box{
        width: 35%;
        height: 32px;
        margin-top: 6px;
        margin-bottom: 16px;
        line-height: 32px;
    }
    .code-blank-box{
        width: 55%;
        padding: 6px 10px;
        font-size: 13px;
        height: 32px;
        border: 1px solid #babec5;
        box-sizing: border-box;
        margin-top: 8px;
        margin-bottom: 16px;
        border-radius: 3px;
        outline: none;
    }
    .code-blank-box:focus{
        border-color: #03AE66;
    }

    .fullname-blank-box{
        width: 65%;
        padding: 6px 10px;
        font-size: 13px;
        height: 32px;
        border: 1px solid #babec5;
        box-sizing: border-box;
        margin-top: 8px;
        margin-bottom: 16px;
        border-radius: 3px;
        outline: none;
    }
    .fullname-blank-box:focus{
        border-color: #03AE66;
    }
    .medium-blank-box{
        width: calc(100% - 108px);
        padding: 6px 10px;
        font-size: 13px;
        height: 32px;
        border: 1px solid #babec5;
        box-sizing: border-box;
        margin-top: 8px;
        margin-bottom: 16px;
        border-radius: 3px;
        display: flex;
        align-items: center;
        outline: none;
    }
    .medium-blank-box:focus{
        border-color: #03AE66;
    }
    .btn-check{
        width: 18px;
        height: 18px;
        cursor: pointer;
        margin-right: 8px;
    }
    .title-checkbox{
        margin-right: 24px;
    }

    /* Phần Footer của dialog */
    .footer{
        position: absolute;
        bottom: 0px;
        width: calc(100% - 48px);
        height: 68px;
        display: flex;
        align-items: center;
        /* background-color: aqua; */
        margin-left: 24px;
        margin-right: 24px;
        box-sizing: border-box;
    }    
        .cancel{
            position: absolute;
            right: 196px;
        }
        .post{
            color: white;
            position: absolute;
            right: 124px;
        }

    /* Báo đỏ thanh input khi có lỗi */
    .blank-box-invalid {
        border-color: #F65454 !important;
        outline: none;
    }
    /* Trỏ chuột và thanh input lỗi hiện thông báo lỗi */
    .error-message{
        position: absolute;
        top: 10px;
        left: 260%;
        background-color: #F65454;
        color: #fff;
        font-size: 11px;
        padding-left: 8px;
        padding-top: 2px;
        padding-bottom: 2px;
        padding-right: 8px;
        /* width: 300px; */
        min-width: 110px;
        height: 30px;
        line-height: 30px;
        border-radius: 4px;
        z-index: 3;
    }

    /* Thông báo khi trỏ chuột vào icon dấu hỏi (đã tạm ẩn đi) */
    .tooltiptext {
        visibility: hidden;
        background-color: black;
        color: #babec5;
        font-size: 11px;
        text-align: center;
        border-radius: 2px;
        padding: 4px;

        /* Position the tooltip */
        position: fixed;
        top: 13%;
        left: 62%;
        z-index: 1;
        }

    .btn-help:hover .tooltiptext {
        visibility: visible;
    }




/**
  Dropdown
*/
.dialog_hide{
  display: none;
}
.dropdown-text-and-icon{
    width: 55%;
    padding: 6px 6px;
    font-size: 13px;
    height: 35px;
    border: 1px solid #babec5;
    box-sizing: border-box;
    margin-top: 8px;
    margin-bottom: 13px;
    border-radius: 3px;
    /* box-sizing: border-box; */
    display: flex;
    align-items: center;
}
.dropdown-text-and-icon:focus-within{
    border-color: #03AE66;
}
.input-blank-box{
    height: 30px;
    width: calc(100% - 32px);
    /* padding: 6px 0 6px 12px; */
    box-sizing: border-box;
    border: none;
    outline: none;
    border-collapse: collapse;
    border-radius: 4px;
}
#dropdown-icon{
    width: 30px;
    height: 30px;
    border: none;
    outline: none;
    border-collapse: collapse;
    border-radius: 4px;
    background: url(../../../assets/img/Sprites.64af8f61.svg) no-repeat;
    background-position: -545px -352px;
    transform: rotate(0deg);
    transition: transform .15s linear;
    /* background-color: aqua; */
}
#dropdown{
    position: absolute;
    display: inline-block;
    width: 100%;
    /* background-color: #2ca01c; */
}
.dropdown-content{
    /* height: 120px; */
    width: 172px;
    left: 110px;
    top: 45px;
    position: absolute;
    z-index: 2;
    /* right: 0px; */
    border: 1px solid;
    background-color: #fff;
    border-radius: 3px;
    border: 1px solid #babec5;
    cursor: pointer;
}
.dropdown-content-a{
    /* position: absolute; */
    height: 30px;
    width: 100%;
    display: flex;
    align-items: center;
    padding-left: 12px;
    box-sizing: border-box;
    border: none;
    outline: none;
    font-size: 13px;
    margin-bottom: 2px;
}
.dropdown-content-a:hover{
    color: #03AE66;
    background-color: rgb(219, 219, 219);
}
.drop-down-content-selected{
    background-color: #03AE66;
    color: #fff;
}
.drop-down-content-selected:hover{
    background-color: #03AE66;
    color: #fff;
}


</style>