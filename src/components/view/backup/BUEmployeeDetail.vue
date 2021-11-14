<!-- Bản Backup trước khi sử dụng filters và bổ sung resources (27/10/2021 8:36am) -->

<template>
    <div class="dialog">
        <div class="model" @click="hideDialogDataCondition()"></div>
        <div class="dialog-content">
            <div class="header">
                <div id="title">Thông tin nhân viên</div>
                <button class="btn-check"></button>
                <div class="div">Là khách hàng</div>
                <button class="btn-check"></button>
                <div class="div">Là nhà cung cấp</div>
                <button class="btn-help">
                    <span class="tooltiptext">Để biết thêm thông tin, tham khảo google.com hì</span>
                </button>
                <button class="btn-X" @click="hideDialogDataCondition()"></button>
            </div>

            <div class="middle">
                <div class="middle-1">
                    <div class="column clm1">
                        <div style="display: flex; align-items: center;">
                            <div style="width: 35%; margin-right: 2px">
                                <div style="position: relative"><b>Mã</b> <span style="color: red;">*</span>
                                    <div class="error-message" v-show="isValid.employeeCodeMessage == false">Mã nhân viên chưa hợp lệ</div>
                                </div>
                                <input type="text" class="code-blank-box"
                                    :class="{'blank-box-invalid': isValid.employeeCode == false}"
                                    ref="employeeCode"
                                    v-model="employee.employeeCode"
                                    @mouseenter="mouseEnterError('employeeCode')"
                                    @mouseleave="mouseLeaveError()"
                                />
                            </div>
                            <div style="width: 65%; margin-left: 2px;">
                                <div style="position: relative"><b>Tên</b> <span style="color: red;">*</span>
                                    <div class="error-message" v-show="isValid.fullNameMessage == false">Tên nhân viên không được để trống</div>
                                </div>
                                <input type="text" class="fullname-blank-box" style="text-transform: capitalize; "
                                    :class="{'blank-box-invalid': isValid.fullName == false }" 
                                    v-model="employee.fullName"
                                    @mouseenter="mouseEnterError('fullName')"
                                    @mouseleave="mouseLeaveError()"
                                />                    
                            </div>
                        </div>
                        <div style="position: relative"><b>Đơn vị</b><span style="color: red;">*</span>
                            <div class="error-message" v-show="isValid.departmentNameMessage == false">Tên đơn vị chưa hợp lệ</div>
                        </div>
                        <!-- combobox -->
                        <div class="dropdown-text-and-icon" :class="{'blank-box-invalid': isValid.departmentName == false}">
                            <input type="text" class="department-blank-box" 
                                @focus="showDropDownContent()" 
                                @blur="hideDropDownContent()" 
                                id="departmentName"
                                v-model="employee.departmentName"
                                @mouseenter="mouseEnterError('departmentName')"
                                @mouseleave="mouseLeaveError()"
                                @keyup="searchOption()"
                            />
                            <button id="dropdown-icon" @click="showDropDownContent(options)" @blur="hideDropDownContent()"></button>
                        </div>
                        <div id="dropdown">     
                            <div class="dropdown-content" :class="{'dialog_hide': !isShowOption}" >
                                <div class="dropdown-content-a" 
                                    :class="{'drop-down-content-selected' : option.id == employee.departmentId}"
                                    v-for="option in options" 
                                    :key="option.id" 
                                    @click="chooseOption(option)" 
                                    @mouseenter="enterClick()" 
                                    @mouseleave="leaveClick()"
                                >{{option.name}}</div>
                            </div>
                        </div>
                        <div><b>Chức danh</b></div>
                        <input type="text" class="medium-blank-box" v-model="employee.jobTitle"/>
                    </div>
                    <div class="column clm2">
                        <div style="display: flex; align-items: center">
                            <div style="width: 35%; margin-right: 2px;">
                                <div><b>Ngày sinh</b></div>
                                <!-- <datepicker v-model="employee.dateOfBirth" format="dd/MM/yyyy" id="date-input" placeholder="dd/mm/yyyy"/>     -->
                                <date-pick
                                    v-model="employee.dateOfBirth"
                                    :displayFormat="'DD/MM/YYYY'"
                                ></date-pick>  

                            </div>
                            <div style="width: 65%; margin-left: 2px; padding-left: 6px;">
                                <div><b>Giới tính</b></div>
                                <div class="radio-box" >
                                    <input type="radio" 
                                        class="btn-radio" 
                                        name="gender" 
                                        v-model="employee.gender"
                                        :value="1"
                                    />
                                    <div class="gender" >Nam</div>
                                    <input type="radio" 
                                        class="btn-radio"
                                        name="gender" 
                                        v-model="employee.gender" 
                                        :value="0"
                                    />
                                    <div class="gender">Nữ</div>
                                    <input type="radio" 
                                        class="btn-radio" 
                                        name="gender" 
                                        v-model="employee.gender" 
                                        :value="2"
                                    />
                                    <div class="gender">Khác</div>
                                </div>
                            </div>
                        </div>
                        <div style="display: flex; align-items: center">
                            <div style="width: 65%; margin-right: 2px;">
                                <div><b>Số CMND</b></div>
                                <input type="text" class="fullname-blank-box" v-model="employee.identityNumber"/>
                            </div>
                            <div style="width: 35%; margin-left: 2px;">
                                <div><b>Ngày cấp</b></div>
                                <!-- <datepicker v-model="employee.identityDate" format="dd/MM/yyyy" id="date-input" placeholder="dd/mm/yyyy"/> -->
                                <date-pick
                                    v-model="employee.identityDate"
                                    :displayFormat="'DD.MM.YYYY'"
                                ></date-pick>

                            </div>
                        </div>
                        <div><b>Nơi cấp</b></div>
                        <input type="text" class="medium-blank-box" v-model="employee.identityPlace"/>
                    </div>
                </div>
                <div class="middle-2">
                    <div><b>Địa chỉ</b></div>
                    <input type="text" class="large-blank-box" v-model="employee.address"/>
                    <div style="display: flex">
                        <div class="column-1">
                            <div><b>ĐT di động</b></div>
                            <input type="text" class="small-blank-box" v-model="employee.phone" :class="{'blank-box-invalid': isValid.phone == false}" />
                            <div><b>Tài khoản ngân hàng</b></div>
                            <input type="text" class="small-blank-box" v-model="employee.bankAccount" />
                        </div>
                        <div class="column-1">
                            <div style="position: relative"><b>ĐT cố định</b></div>
                            <input type="text" class="small-blank-box" :class="{'blank-box-invalid': isValid.telephone == false}" v-model="employee.telephone" />
                            <div><b>Tên ngân hàng</b></div>
                            <input type="text" class="small-blank-box" v-model="employee.bankName"/>
                        </div>
                        <div class="column-1">
                            <div style="position: relative"><b>Email</b></div>
                            <input type="email" class="small-blank-box" :class="{'blank-box-invalid': isValid.email == false}" v-model="employee.email" />
                            <div><b>Chi nhánh</b></div>
                            <input type="text" class="small-blank-box" v-model="employee.bankBranch"/>
                        </div>
                    </div>
                </div>
            </div>    

            <div class="footer">
                <button class="btn-small cancel" @click="hideDialogDataCondition()">Hủy</button>
                <button class="btn-small post" @click="btnSave()">Cất</button>
                <button class="btn-post-and-put primary-color" @click="btnSaveAndAdd()">Cất và thêm</button>
            </div>
        </div>  

        <ErrorDialog 
            :isShow="isErrorDialogShow"
            :errorMsg="errorMsg"
            @hidePopUp = "hidePopUp"
        />

        <ErrorPopUp
            :isShow="isErrorPopUpShow"
            :errorMsg="errorMsg"
            @hidePopUp="hidePopUp"
        />

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
    // import datepicker from 'vuejs-datepicker'

    import DatePick from 'vue-date-pick';
    import 'vue-date-pick/dist/vueDatePick.css';

    import DataChange from '../../common/pop-up/dataChange.vue';
    import ErrorDialog from '../../common/pop-up/errorDialog.vue';
    import ErrorPopUp from '../../common/pop-up/errorPopUp.vue';

    const getAll = "https://localhost:44342/api/v1/Employees"
    const form = {
        add: "add",
        edit: "edit"
    }
    const errorMessage = {
        invalidDepartment: "Tên đơn vị không tồn tại trong hệ thống, vui lòng kiểm tra lại.",
        nullFullName: "Tên không được để trống.",
        nullEmployeeCode: "Mã nhân viên không được để trống.",
        nullDepartment: "Tên đơn vị không được để trống.",
        dataChange: "Dữ liệu đã bị thay đổi. Bạn có muốn cất không?",
        dateIdentityAndDobError: "Ngày cấp số CMND không được phép trước ngày sinh.",
    }
    const property = {
        fullName: "fullName",
        employeeCode: "employeeCode",
        departmentName: "departmentName",

    }
    const Gender = {
        MaleId: 1,
        Male: "Nam",
        FemaleId: 0,
        Female: "Nữ",
        RestId: 2,
        Rest: "Khác"
    }

    // const MsgFromServer = {
    //     EmployeeCode: "Mã nhân viên",
    //     Phone: "ĐT di động",
    //     TelePhone: "ĐT cố định",
    //     Email: "Email",
    // }

export default {
    components: {
        DataChange,
        ErrorDialog,
        ErrorPopUp,
        // datepicker,
        DatePick,
    },

    created() {

    },

    data() {
        return {

            //Biến kiểm tra xem dữ liệu combobox có show ra hay không
            isShowOption: false,
            //Option được chọn trong dropbox
            // selectedOption: {
            //     id: null,
            //     name: null
            // },
            //Danh sách các lựa chọn
            options: [
                {
                    id: "142cb08f-7c31-21fa-8e90-67245e8b283e",
                    name: "Phòng Đào tạo"
                },
                {
                    id: "17120d02-6ab5-3e43-18cb-66948daf6128",
                    name: "Phòng Kế toán"
                },
                {
                    id: "469b3ece-744a-45d5-957d-e8c757976496",
                    name: "Phòng Marketing"
                },
                {
                    id: "4e272fc4-7875-78d6-7d32-6a1673ffca7c",
                    name: "Phòng Nhân sự"
                },
            ],
            //Danh sách các lựa chọn ban đầu (không thay đổi)
            initialOptions: [
                {
                    id: "142cb08f-7c31-21fa-8e90-67245e8b283e",
                    name: "Phòng Đào tạo"
                },
                {
                    id: "17120d02-6ab5-3e43-18cb-66948daf6128",
                    name: "Phòng Kế toán"
                },
                {
                    id: "469b3ece-744a-45d5-957d-e8c757976496",
                    name: "Phòng Marketing"
                },
                {
                    id: "4e272fc4-7875-78d6-7d32-6a1673ffca7c",
                    name: "Phòng Nhân sự"
                },
            ],
            //Biến kiểm tra xem chuột có di chuyển vào các option hay không, để phân biệt click với blur
            overClick: false,

            isValid: {
                employeeCode: true,
                fullName: true,
                departmentName: true,
                employeeCodeMessage: true,
                fullNameMessage: true,
                departmentNameMessage: true,
                dateIdentityAndDob: true,

                phone: true,
                telephone: true,
                email: true,

            },

            //Biển để hiện dialog thông báo trùng mã nhân viên
            isErrorDialogShow: false,
            //Biến để hiện pop-up thông báo trống mã hoặc tên
            isErrorPopUpShow: false,
            //Biến để nhận giá trị của employee truyền vào ban đầu, để so sánh sau khi thay đổi
            initialEmployee: {},
            //Biến để hiện thông báo đã có thay đổi dữ liệu
            isDataChange: false,
            //Biến để nhận thông báo lỗi trả về từ API
            errorMsg: "",

            //Biến để xác nhận thông tin nhân viên đã hợp lệ để put/post lên database
            isAppropriate: null,
        }
    },

    props: {
        employee: {
            type: Object,
            default: null,
        },
        formmode: {
            type: String,
            default: null,
        },
    },

    updated(){
        //Format giới tính sau khi dialog được hiện ra, để binding dữ liệu
        this.genderFormat(this.employee.gender);
    },

    mounted() {
        //auto focus vào ô input employeeCode
        this.focusInput();

        this.genderFormat(this.employee.gender);
        //copy employee sang 1 object khac de so xem co su thay doi khong?
        this.initialEmployee = {...this.employee};
    },

    methods: {
        /**
         * Cụm hàm format
         * CreatedBy: VDDong (17/06/2021)
         */
        //format giới tính để đưa dữ liệu lên database
        genderFormat(gender){
            if(gender == Gender.FemaleId) {
                this.employee.genderName = Gender.Female;
            }
            else if(gender == Gender.MaleId) {
                this.employee.genderName = Gender.Male;
            }
            else if(gender == Gender.RestId){
                this.employee.genderName = Gender.Rest;
            }
        },
        //Format tên phòng ban để binding vào form
        departmentFormat(departmentId){
            this.options.forEach(option => {
                    if(departmentId == option.id) {
                        this.employee.departmentName = option.name;
                    }
                });
        },

        /**
         * So sánh 2 Object để kiểm tra xem dữ liệu đã thay đổi chưa
         * Return true: có thay đổi, false: chưa thay đổi
         * CreatedBy: VDDong (17/06/2021)
         */
        compareDataObject(obj1, obj2){
            for(let i in obj1){
                if(obj1[i] !== obj2[i]) return true;
            }
            return false
        },

        /**
         * Ẩn dialog EmployeeDetail
         * CreatedBy: VDDong (17/06/2021)
         */
        hideDialog(){
            //Reset lại các biến validate form
            this.isValid.fullName = true;
            this.isValid.employeeCode = true;
            this.isValid.departmentName = true;
            //Gọi phương thức ẩn của thằng cha là employeeList
            this.$emit('hideDialog');
        },

        /**
        * Ẩn dialog
        * Nếu dữ liệu đã bị thay  đổi thì hiện pop up DataChange, nếu không thì ẩn dialog EmployeeDetail
        * CreatedBy: VDDong (17/06/2021)
        */
        hideDialogDataCondition(){
           if(this.compareDataObject(this.initialEmployee, this.employee)){
               this.isDataChange = true;
               this.errorMsg = errorMessage.dataChange;
           }
           else this.hideDialog();
        },

        /**
        * Hiện combobox
        * CreatedBy: VDDong (17/06/2021)
        */
        showDropDownContent(){
            this.options = this.initialOptions;
            this.isShowOption = !this.isShowOption;      
            
        },

       /**
        * Ẩn combobox
        * CreatedBy: VDDong (17/06/2021)
        */
        hideDropDownContent(){
            if(this.overClick == false) this.isShowOption = false;
        },

        /**
        * Gán dữ liệu đã chọn từ combobox cho chủ thể employee và format cho đúng định dạng
        * CreatedBy: VDDong (17/06/2021)
        */
        chooseOption(option){
            //Gán giá trị được chọn cho id và tên phòng ban của employee
            this.employee.departmentId = option.id;
            // this.employee.departmentName = option.name;
            this.departmentFormat(this.employee.departmentId);
            this.overClick = false;
            this.hideDropDownContent();
        },

        /**
         * Tìm kiếm ô input đơn vị so với các option data có sẵn từ combobox
         * CreatedBy: VDDong (17/06/2021)
         */
        searchOption(){
            this.options = this.initialOptions.filter(option => {
                return (
                    option.name.toLowerCase().includes(this.employee.departmentName.toLowerCase())
                )
            })
        },

        /**
         * Di chuyển chuột vào ra các option của combobox
         * CreatedBy: VDDong (17/06/2021)
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
         * Auto focus vào ô employeeCode khi hiện dialog EmployeeDetail
         * CreatedBy: VDDong (17/06/2021)
         */
        focusInput(){
            this.$refs.employeeCode.focus();
        },

        /**
         * Validate trường hợp ô employee code và fullname bỏ trống hoặc nhập toàn dấu cách (khoảng trắng) 
         * CreatedBy: VDDong (17/06/2021)
         */
        nullValidation(propertyValue, propertyName){
            propertyValue = propertyValue || '';
            if (propertyValue.trim() == "") {
                if(propertyName == property.employeeCode) {
                    this.isValid.employeeCode = false;
                    this.isErrorPopUpShow = true;
                    this.errorMsg = errorMessage.nullEmployeeCode;
                }
                else if(propertyName == property.fullName) {
                    this.isValid.fullName = false;
                    this.isErrorPopUpShow = true;
                    this.errorMsg = errorMessage.nullFullName;
                }
            } 
            else{
                if(propertyName == property.employeeCode) {
                    this.isValid.employeeCode = true;
                }
                else if(propertyName == property.fullName) {
                    this.isValid.fullName = true;
                }
            }    
        },

        /**
         * Validate tên đơn vị (phòng ban)
         * CreatedBy: VDDong (17/06/2021)
         */
        departmentNameValidation(value){
            //Validate tên đơn vị không được trống
            value = value || '';
            if (value.trim() == "") {
                this.isValid.departmentName = false;
                this.isErrorPopUpShow = true;
                this.errorMsg = errorMessage.nullDepartment;
            }
            else {
                this.isValid.departmentName = false;
                //Validate tên đơn vị giống với tên đơn vị trong option
                //Kiểm tra xem thông tin nhập vào có đúng với các option tên đơn vị không
                this.options.forEach(option => {
                    if(option.name == value) {
                        this.isValid.departmentName = true;
                        this.employee.departmentId = option.id;
                    }
                });
                if(this.isValid.departmentName == false) 
                {
                    this.isErrorPopUpShow = false;
                    this.isErrorDialogShow = true;
                    this.errorMsg = errorMessage.invalidDepartment;
                }
            }
        },

        /**
         * Validate ngày cấp số CMND không được trước ngày sinh
         * CreatedBy:
         */
        dateIdentityAndDobValidation(identityDate, dobDate){
            console.log("Identity date: " + identityDate);
            console.log("Dob date:" + dobDate)
            if(identityDate < dobDate){
                this.isValid.dateIdentityAndDob = false;
                this.isErrorDialogShow = true;
                this.errorMsg = errorMessage.dateIdentityAndDobError;
            }
            else this.isValid.dateIdentityAndDob = true;
        },


        /**
         * Validate trước khi request lên database
         * CreatedBy: VDDong (17/06/2021)
         */
        formValidation(){
            //Validate tên nhân viên không được trống hoặc là khoảng trắng
            this.nullValidation(this.employee.fullName, property.fullName);
            //Validate mã nhân viên không được trống hoặc là khoảng trắng
            this.nullValidation(this.employee.employeeCode, property.employeeCode);
            //Validate tên đơn vị
            this.departmentNameValidation(this.employee.departmentName);
            //Validate ngày cấp số CMND không trước ngày sinh
            this.dateIdentityAndDobValidation(this.employee.identityDate, this.employee.dateOfBirth);

            //Nếu thỏa mã hết các validate thì chấp thuận
            if(this.isValid.fullName == true
                && this.isValid.employeeCode == true
                && this.isValid.departmentName == true
                && this.isValid.dateIdentityAndDob == true
            ) this.isAppropriate = true;
            else this.isAppropriate = false;         
        },

        /**
         * Ẩn các error popup và error dialog, error datachange, reset lại error msg
         * CreatedBy: VDDong (17/06/2021)
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
         * CreatedBy: VDDong (17/06/2021)
         */
        //Di chuyển chuột vào trong hiện lỗi
        mouseEnterError(propertyName){
            if( this.isValid.employeeCode == false && propertyName == property.employeeCode){
                this.isValid.employeeCodeMessage = false;
            }
            else if( this.isValid.fullName == false && propertyName == property.fullName){
                this.isValid.fullNameMessage = false;
            }
            if( this.isValid.departmentName == false && propertyName == property.departmentName) 
                this.isValid.departmentNameMessage = false;
            
        },
        //Di chuyển chuột ra ngoài ẩn lỗi
        mouseLeaveError(){
            this.isValid.employeeCodeMessage = true;
            this.isValid.fullNameMessage = true;
            this.isValid.departmentNameMessage = true;

            this.isValid.questionMessage = true;
        },

        /**
         * Reset lại các thông tin nhân viên khi bấm 'cất và thêm'
         * CreatedBy: VDDong (17/06/2021)
         */
        resetEmployee(){
            this.$emit('showEmployeeDialog');
            this.focusInput();
        },

        /**
         * Phân biệt post vs put, rồi post / put lên database
         * CreatedBy: VDDong (17/06/2021)
         */
        formmodeValidation(){
            
            // if(this.employee.identityDate == undefined) this.employee.identityDate = null;
            // if(this.employee.dateOfBirth == undefined) this.employee.dateOfBirth = null;
            console.log(this.employee);
            console.log(this.employee.identityDate);

            if(this.formmode == form.add) {
                return axios
                    .post(getAll, this.employee)
                    .then((res) => {
                        console.log(res);
                        return Promise.resolve();
                    })
                    .catch((res) => {

                        var errorContent = res.response.data.devMsg;

                        if(errorContent.includes("Mã nhân viên")) this.isValid.employeeCode = false;
                        if(errorContent.includes("ĐT di động")) this.isValid.phone = false;
                        if(errorContent.includes("ĐT cố định")) this.isValid.telephone = false;
                        if(errorContent.includes("Email")) this.isValid.email = false;

                        this.errorMsg = errorContent;
                        this.isErrorDialogShow = true;
                        return Promise.reject();
                    })
            }
            else if(this.formmode == form.edit){
                //Do chênh lệch về múi giờ giữa frontend và backend nên ở trạng thái sửa
                //ngày giờ bên font end đang là ngày x 00:00:00 GTM+7 giờ Đông Dương, sang bên backend lại thành ngày x-1 5h:00 PM
                //nên khi ở trạng thái sửa, đành phải +1 thêm vào ngày để khi sang backend lưu vào DB nó vẫn đúng ngày mình chọn
                //Ở trạng thái thêm thì còn tùy thuộc vào lúc thêm, nếu thêm vào tầm buổi trưa đổ đi, lúc đó đang giờ tầm 11 12h thì dù
                //có lệch múi giờ thì sang backend nó giảm đi vài giờ vẫn thuộc ngày x, còn nếu pick datetime lúc sáng sớm thì vẫn có khả 
                //năng sang backend bị -1 ngày do lệch múi giờ
                // this.employee.dateOfBirth = new Date(this.employee.dateOfBirth);
                //     this.employee.dateOfBirth.setDate(this.employee.dateOfBirth.getDate() + 1);
                //(Vấn đề đã được khắc phục sau khi chuyển sang packet pickdate mới là Vue date pick)
                //Packet này hình như không lưu giờ nên không bị dính vấn đề liên quan múi giờ
                console.log(this.employee);
                return axios
                    .put(getAll + "/" + this.employee.employeeId, this.employee)
                    .then((res) => {
                        console.log(res);
                        return Promise.resolve();
                    })
                    .catch((res) => {
                        var errorContent = res.response.data.devMsg;

                        if(errorContent.includes("Mã nhân viên")) this.isValid.employeeCode = false;
                        if(errorContent.includes("ĐT di động")) this.isValid.phone = false;
                        if(errorContent.includes("ĐT cố định")) this.isValid.telephone = false;
                        if(errorContent.includes("Email")) this.isValid.email = false;

                        this.errorMsg = errorContent;
                        this.isErrorDialogShow = true;
                        return Promise.reject();
                    })
            }
        },

        /**
         * Cụm hàm cập nhật dữ liệu lên database
         */
        //Cất
        btnSave(){
            this.formValidation();
            if(this.isAppropriate){
                this.formmodeValidation().then(() => this.hideDialog());
            }
        },
        //Cất và thêm
        btnSaveAndAdd(){
            this.formValidation();
            if(this.isAppropriate){
                this.formmodeValidation().then(() => this.resetEmployee());
            }
        },

    },


}
</script>

<style scoped>
    b{
    font-size: 13px;
    }

    .dialog_hide {
        display:none;
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
        height: 625px;
        top: calc(50% - 312px);
        left: calc(50% - 450px);
        background-color: white;
        border-radius: 4px;
        box-sizing: border-box;
        z-index: 3;
    }
    .header{
        display: flex;
        align-items: center;
        width: 100%;
        height: 60px;
        width: 100%;
        padding: 20px 32px;
        padding-right: 12px;
        position: relative;
        overflow: hidden;
        border-radius: 5px 5px 0 0;
        box-sizing: border-box;
    }
    #title{
        font-size: 24px;
        color: #111;
        font-weight: 700;
    }
    .btn-check{
        width: 18px;
        height: 18px;
        cursor: pointer;
        margin-left: 24px;
        margin-right: 8px;
    }
    .div{
        margin-right: 24px;
    }
    .btn-help{
        height: 48px;
        width: 48px;
        position: absolute;
        right: 45px;
        top: 0px;
        min-width: 24px;
        min-height: 24px;
        background: url(../../../assets/img/Sprites.64af8f61.svg) no-repeat;
        cursor: pointer;
        background-position: -70px -132px;
        border: none;
        outline: none;
        border-radius: 0px 4px 0px 4px;
    }
    .btn-X{
        height: 48px;
        width: 48px;
        position: absolute;
        right: 0px;
        top: 0px;
        min-width: 24px;
        min-height: 24px;
        background: url(../../../assets/img/Sprites.64af8f61.svg) no-repeat;
        cursor: pointer;
        background-position: -134px -132px;
        border: none;
        outline: none;
        border-radius: 0px 4px 0px 4px;
    }
    .middle{
        padding: 24px;
    }
    .middle-1{
        display: flex;
    }
    .column{
        width: 420px;
        height: 220px;
    }
    .clm1{
        margin-right: 12px;
    }
    .clm2{
        margin-left: 12px;
    }
    .code-blank-box{
        width: 100%;
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
        border-color: #2ca01c;
    }
    /* #date-input{
        width: 100%;
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
    .date-blank-box:focus{
        border-color: #2ca01c;
    } */

    .radio-box{
        width: 100%;
        font-size: 13px;
        height: 32px;
        box-sizing: border-box;
        margin-top: 8px;
        margin-bottom: 16px;
        border-radius: 3px;
        display: flex;
        align-items: center;
    }
    .radio-box .gender{
        margin-right: 16px;
    }
    .btn-radio{
        
        /* margin-left: 16px; */
        margin-right: 10px;
        cursor: pointer;
    }

    .fullname-blank-box{
        width: 100%;
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
        border-color: #2ca01c;
    }
    .medium-blank-box{
        width: 100%;
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
        border-color: #2ca01c;
    }
    .dropdown-text-and-icon{
        width: 100%;
        padding: 6px 10px;
        font-size: 13px;
        height: 32px;
        border: 1px solid #babec5;
        box-sizing: border-box;
        margin-top: 8px;
        margin-bottom: -2px;
        border-radius: 3px;
        /* box-sizing: border-box; */
        display: flex;
        align-items: center;
    }
    .dropdown-text-and-icon:focus-within{
        border-color: #2ca01c;
    }
    .department-blank-box{
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

    .large-blank-box{
        width: 100%;
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
    .large-blank-box:focus{
        border-color: #2ca01c;
    }
    .column-1{
        width: 220px;
        height: 100px;
    }
    .small-blank-box{
        width: 214px;
        padding: 6px 10px;
        font-size: 13px;
        height: 32px;
        border: 1px solid #babec5;
        box-sizing: border-box;
        margin-top: 8px;
        margin-bottom: 16px;
        outline: none;
        border-radius: 3px;
    }
    .small-blank-box:focus{
        border-color: #2ca01c;

    }
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
        border-top: 1px solid #ccc;
    }
    
    
    .post{
        position: absolute;
        right: 124px;
    }

    #dropdown{
            position: relative;
            display: inline-block;
            width: 100%;
            /* background-color: #2ca01c; */
        }
        .dropdown-content{
            /* height: 120px; */
            width: 410px;
            
            top: -6px;
            position: absolute;
            /* right: 0px; */
            border: 1px solid;
            background-color: #fff;
            border-radius: 3px;
            border: 1px solid #babec5;
        }
        .dropdown-content-a{
            /* position: absolute; */
            height: 24px;
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
            color: #2ca01c;
            background-color: rgb(219, 219, 219);
        }
        .drop-down-content-selected{
            background-color: #2ca01c;
            color: #fff;
        }
        .drop-down-content-selected:hover{
            background-color: #2ca01c;
            color: #fff;
        }

    .blank-box-invalid {
        border-color: #F65454;
        outline: none;
    }
    .error-message{
        position: absolute;
        top: 50px;
        left: calc(50% - 80px);
        background-color: black;
        color: #babec5;
        font-size: 11px;
        padding-left: 8px;
        padding-top: 2px;
        padding-bottom: 2px;
        padding-right: 8px;
        width: 160px;
        border-radius: 4px;
    }

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


</style>