<!-- Bản backup trước khi đổi database (01/11/2021 - 9:36am)-->
<template>
    <div id="router">
        <div id="router-content">
            <div id="title-bar">
                <router-link class="title" tag="span" to="/generaltest" style="cursor: pointer;">Nhân viên</router-link>
                <div class="btn-wrapper">
                  <button class="btn-delete-all delete-color" id="btn-delete-all" :class="{'btn-hide': !isDeleteMultiple}"
                    @click="showConfirmDeleteMultiple()"
                  >
                    Xóa hàng loạt
                  </button>
                  <button class="btn-add primary-color" id="btn-add" @click="showEmployeeDialog()">
                      Thêm mới nhân viên
                  </button>
                  <label class="btn-add-excel primary-color" id="btn-addFromExcel">
                    <i class="fas fa-table"></i>
                    <input type="file" id="uploadExcel" @change="importFileExcel"/>
                    Thêm từ file Excel
                  </label>
                </div>
            </div>
            <div id="tablewrapper">
                <div id="table">
                    <div id="search">

                        <div id="sort-and-group">
                          <div class="sortBar">
                            <!-- combobox -->
                            <div class="dropdown-text-and-icon">
                                <input type="text" class="input-blank-box" 
                                    @focus="showDropDownContentSort()" 
                                    @blur="hideDropDownContentSort()" 
                                    @keyup="searchOptionSort()"
                                    v-model="thisSort.text"
                                    placeholder="Lựa chọn sắp xếp"
                                />
                                <button id="dropdown-icon" @click="showDropDownContentSort(listOptionsSort)" @blur="hideDropDownContentSort()"></button>
                            </div>
                            <div id="dropdown">     
                                <div class="dropdown-content" :class="{'dialog_hide': !isShowOptionsSort}" >
                                    <div class="dropdown-content-a" 
                                        :class="{'drop-down-content-selected' : optionSort.id == thisSort.id}"
                                        v-for="optionSort in listOptionsSort" 
                                        :key="optionSort.id" 
                                        @click="chooseOptionSort(optionSort)" 
                                        @mouseenter="enterClick()" 
                                        @mouseleave="leaveClick()"
                                    >{{optionSort.text}}</div>
                                </div>
                            </div>
                          </div>
                          <div class="groupBar">
                            <!-- combobox -->
                            <div class="dropdown-text-and-icon">
                                <input type="text" class="input-blank-box" 
                                    @focus="showDropDownContentDepart()" 
                                    @blur="hideDropDownContentDepart()" 
                                    @keyup="searchOptionDepart()"
                                    v-model="thisDepart.text"
                                    placeholder="Nhóm theo đơn vị"
                                />
                                <button id="dropdown-icon" @click="showDropDownContentDepart()" @blur="hideDropDownContentDepart()"></button>
                            </div>
                            <div id="dropdown">     
                                <div class="dropdown-content" :class="{'dialog_hide': !isShowOptionsDepart}" >
                                    <div class="dropdown-content-a" 
                                        :class="{'drop-down-content-selected' : optionDepart.id == thisDepart.id}"
                                        v-for="optionDepart in listOptionsDepart" 
                                        :key="optionDepart.id" 
                                        @click="chooseOptionDepart(optionDepart)" 
                                        @mouseenter="enterClick()" 
                                        @mouseleave="leaveClick()"
                                    >{{optionDepart.text}}</div>
                                </div>
                            </div>
                          </div>

                        </div>


                        <div id="search-bar-wrapper">
                            <div class="search-bar-and-icon">
                                <input
                                id="search-bar"
                                type="text"
                                placeholder="Tìm theo mã, tên nhân viên"
                                v-model="message"
                                @keyup="searchData()"
                                />
                                <button id="search-icon"></button>
                            </div>

                            <div id="btn-refresh-wrapper">
                                <button id="btn-refresh" @click="refreshData()"></button>
                                <button id="btn-export" @click="exportData()"></button>
                            </div>
                        </div>
                    </div>
                

                    <div class="data">
                        <div class="scroll">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>
                                            <input type="checkbox" v-model="checkAll" />
                                        </th>
                                        <th style="min-width: 100px">MÃ NHÂN VIÊN</th>
                                        <th style="min-width: 200px">TÊN NHÂN VIÊN</th>
                                        <th style="min-width: 50px">GIỚI TÍNH</th>
                                        <th style="min-width: 110px; text-align: center;">NGÀY SINH</th>
                                        <th style="min-width: 100px">SỐ CMND</th>
                                        <th style="min-width: 100px">CHỨC DANH</th>
                                        <th style="min-width: 150px">TÊN ĐƠN VỊ</th>
                                        <th style="min-width: 100pxpx">SỐ TÀI KHOẢN</th>
                                        <th style="min-width: 100pxpx">TÊN NGÂN HÀNG</th>
                                        <th style="min-width: 100px">CHI NHÁNH TK NGÂN HÀNG</th>
                                        <!-- <th style="min-width: 83.33%">CHỨC NĂNG</th> -->
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="employee in employees" :key="employee.employeeId">
                                        <td>
                                            <input
                                                type="checkbox"
                                                v-model="checked"
                                                :value="employee.employeeId"
                                            />
                                        </td>
                                        <td>{{ employee.employeeCode }}</td>
                                        <td style="text-transform: capitalize;">{{ employee.fullName }}</td>
                                        <td>{{ employee.genderName }}</td>
                                        <td style="text-align: center;">{{ employee.dateOfBirth | dateFormat }}</td>
                                        <td>{{ employee.identityNumber }}</td>
                                        <td>{{ employee.jobTitle }}</td>
                                        <td>{{ employee.departmentName }}</td>
                                        <td>{{ employee.bankAccount }}</td>
                                        <td>{{ employee.bankName }}</td>
                                        <td>{{ employee.bankBranch }}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <table class="table1" style="position: sticky; z-index: 3; right: 0; border: 0">
                                <thead>
                                    <tr style="border-top: 0px solid #ccc">
                                        <th style="min-width: 100px; position: sticky; top: 0px; background-color: #e6e6e6; text-align: center;">CHỨC NĂNG</th>
                                    </tr>
                                </thead>
                                <tbody style="background-color: #fff">
                                    <tr v-for="employee in employees" :key="employee.employeeId" style="background: white border: 1px solid #ccc;">
                                        <td>
                                            <Option 
                                                @showDeleteDialog="showDeleteDialog(employee.employeeId)"
                                                @showEmployeeDetail="showEmployeeDetail(employee.employeeId)"
                                                @showEmployeeDuplicate="showEmployeeDuplicate(employee.employeeId)"
                                                @showStopUsingDialog="showStopUsingDialog"
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div id="footer">
                        <div id="total-data">
                            Tổng số <b>{{this.employeeNumber}}</b> bản ghi
                        </div>
                        <div id="footer-right">
                            <div id="footer-2">
                                <ComboBox @setPerPage="handlePerPage" ref="comboBox" />
                            </div>
                            <div id="footer-3">
                                <Paging
                                    :totalPages="totalPage"
                                    :perPage="perPage"
                                    :page="currentPage"
                                    @onChangePage="onPageChange"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <EmployeeDetail 
            v-if="isShowDialogEmployee"
            @hideDialog="hideDialog"
            :employee="selectedEmployee"
            :formmode="formmode"
            @showEmployeeDialog="showEmployeeDialog"
        />
        <EmployeeDelete
          :isShow="isShowDialogDelete"
          @hideDialog="hideDialog"
          :employee="selectedEmployee"
        />
        <EmployeeStopUsing 
          :isShow="isShowDialogStopUsing"
          @hideDialog="hideDialog"
        />
        <ErrorPopUp 
          :isShow="isErrorPopUpShow"
          :errorMsg="errorMsg"
          @hidePopUp="hidePopUp"
        />
        <AddFromExcelPopUp 
          :isShow="isShowPopUpAddFromExcel"
          :errorMsg="errorMsg"
          @hidePopUp="hidePopUp"
          @confirmAddFromExcel="AddFromExcel"
        />
        <ConfirmDeleteMultiplePopUp
          :isShow="isShowPopUpConfirmMultipleDelete"
          :errorMsg="errorMsg"
          @hidePopUp="hidePopUp"
          @confirmDeleteMultiple="deleteMultiple"
        />

        <!--loading -->
        <div class="fa-3x" v-if="isBusy">
            <!--font awesome -->
            <i class="fas fa-spinner fa-spin" style="color: green"></i>
        </div>

    </div>
</template>


<script>

//import
import axios from  "axios";
import Option from "../../common/option.vue";
import ComboBox from "../../common/comboBox.vue";
import Paging from "../../common/paging.vue";
import EmployeeDetail from "../employee/employeeDetail.vue";
import EmployeeDelete from "../employee/employeeDelete.vue";
import EmployeeStopUsing from '../employee/employeeStopUsing.vue';
import ErrorPopUp from '../../common/pop-up/errorPopUp.vue';
import AddFromExcelPopUp from './employeeAddFromExcel.vue';
import ConfirmDeleteMultiplePopUp from './employeeConfirmMultipleDelete.vue';
import xlsx from 'xlsx';

// khai báo biến cố định, code cho nhanh
const getAll = "https://localhost:44342/api/v1/Employees";
const getMaxCode = "https://localhost:44342/api/v1/Employees/MaxCode";
const getExport = "https://localhost:44342/api/v1/Employees/Export";
const getDepartments = "https://localhost:44342/api/v1/Employees/Department";
const getFilter = "https://localhost:44342/api/v1/Employees/Filter?";
const sortByCode = "https://localhost:44342/api/v1/Employees/SortByCode?";
const sortByName = "https://localhost:44342/api/v1/Employees/SortByName?";

const Notice = {
    DeleteSuccess: "Xóa thành công!",
    IncorrecExcelFile: "Không đúng định dạng file. Vui lòng tải lên file excel!",
    ReadExcelFileFail: "Đọc file không thành công!"
}

const gender = {
    maleId: 0,
    male: "Nam",
    femaleId: 1,
    female: "Nữ",
    restId: 2,
    rest: "Khác",
}

const form = {
    add: "add",
    edit: "edit",
}

const Department = {
    DTId: "142cb08f-7c31-21fa-8e90-67245e8b283e",
    DT: "Phòng Đào tạo",
    KTId: "17120d02-6ab5-3e43-18cb-66948daf6128",
    KT: "Phòng Kế toán",
    MKId: "469b3ece-744a-45d5-957d-e8c757976496",
    MK: "Phòng Marketing",
    NSId: "148ed882-32b8-218e-9c20-39c2f00615e8",
    NS: "Phòng Nhân sự",
}


export default {
  components: {
      Option,
      ComboBox,
      Paging,
      EmployeeDetail,
      EmployeeDelete,
      EmployeeStopUsing,
      ErrorPopUp,
      AddFromExcelPopUp,
      ConfirmDeleteMultiplePopUp,
  },

  data() {
      return {
            initialEmployees: [], //Data đầu vào cho api get all
            employees: [], //data lấy vào khi get để gán dữ liệu lên table
            employeeNumber: 0,  //tổng số bản ghi
            departments: [], //data đơn vị (phòng ban)
            isShowDialogEmployee: false, //biến đóng/mở dialog thêm sửa
            isShowDialogDelete: false, // biến đóng/mở dialog xóa
            isShowDialogStopUsing: false, //biến đóng/mở dialog ngưng sử dụng
            message: null, //tiêu chí tìm kiếm
            selectedEmployee: {}, //nhân viên được chọn
            checked: [], //danh sách được tích vào checkbox
            currentPage: 0, //trang hiện tại
            perPage: 0, //số bản ghi trên 1 trang
            totalPage: 0, //tổng số trang
            isBusy: true, //loading animation, kiểm tra đã load dữ liệu xong chưa
            formmode: "", //phân biệt giữa sửa và thêm

            overClick: false, //Biến kiểm tra xem chuột có di chuyển vào các options hay không, phân biệt click với blur
            //cụm biến của combobox sort
            isShowOptionsSort: false,
            thisSort: {
              id: null,
              text: null,
            },
            listOptionsSort: [
              {id: 1, text: 'Thứ tự thêm mới'},
              {id: 2, text: 'Tên khách hàng'},
            ],
            initialListOptionsSort: [
              {id: 1, text: 'Thứ tự thêm mới'},
              {id: 2, text: 'Tên khách hàng'},
            ],
            //cụm biến của combobox depart
            isShowOptionsDepart: false,
            thisDepart: {
              id: null,
              text: null,
            },
            listOptionsDepart: [
              {id: '142cb08f-7c31-21fa-8e90-67245e8b283e', text: 'Phòng Đào tạo'},
              {id: '17120d02-6ab5-3e43-18cb-66948daf6128', text: 'Phòng Kế toán'},
              {id: '469b3ece-744a-45d5-957d-e8c757976496', text: 'Phòng Marketing'},
              {id: '4e272fc4-7875-78d6-7d32-6a1673ffca7c', text: 'Phòng Nhân sự'},
            ],
            initialListOptionsDepart: [
              {id: '142cb08f-7c31-21fa-8e90-67245e8b283e', text: 'Phòng Đào tạo'},
              {id: '17120d02-6ab5-3e43-18cb-66948daf6128', text: 'Phòng Kế toán'},
              {id: '469b3ece-744a-45d5-957d-e8c757976496', text: 'Phòng Marketing'},
              {id: '4e272fc4-7875-78d6-7d32-6a1673ffca7c', text: 'Phòng Nhân sự'},
            ],
            //biến để phân biệt đang ở trạng thái paging theo filter hay paging theo (sắp xếp và nhóm) để truyền vào onPageChange, phục vụ việc bấm chuyển trang
            formPagingSort: false,
            //biến ẩn / hiện button xóa hàng loạt
            isDeleteMultiple: false,
            //Biến để hiện pop-up thông báo đã xóa hàng loạt bản ghi
            isErrorPopUpShow: false,
            //Biến để nhận thông báo lỗi truyền vào pop-up
            errorMsg: "",

            //Biến ẩn hiện thông báo các bản ghi thêm từ file excel thành công và bị lỗi
            isShowPopUpAddFromExcel: false,
            //Mảng lưu trữ các bản ghi từ file excel
            listRecordsExcel: [],

            //Biến ẩn hiện pop up xóa nhiều bản ghi
            isShowPopUpConfirmMultipleDelete: false,
      }
  }, //End Data

  created() {
      this.currentPage = 1;
      this.perPage = 20;
      this.message = "";
      axios
        .get(
            getFilter + "pageSize=" + this.perPage + "&" + "pageIndex=" + this.currentPage + "&" + "filter=" + this.message
        )
        .then((res) => {
            console.log(res);
            this.employees = res.data.data;
            this.genderFormat(this.employees);
            this.departmentsFormat(this.employees);
            this.employeeNumber = res.data.totalRecord;
            if(this.employeeNumber % this.perPage == 0){
                this.totalPage = this.employeeNumber/this.perPage;
            }
            else {
                this.totalPage = Math.floor(this.employeeNumber / this.perPage) + 1;
            }
            //loading data succesful
            this.isBusy = false;
        })
        .catch((res) => {
            console.log(res);
        })
        
        axios.get(getAll)
        .then((res) => {
            this.initialEmployees = res.data;
        })
        .catch((res) => {
            console.log(res);
        })
    
  }, //End Created

  mounted: function() {},

  methods: {
      /**
       * Lấy tất cả dữ liệu từ API
       */
      getAllData(){
          axios
          .get(getAll)
          .then((res) => {
              this.initialEmployees = res.data;
          })
          .catch((res) => {
              console.log(res);
          })
      },

      /**
       * Load lại data
       */
      loadData(){
          this.isBusy = true;
          this.message  = "";
          axios
        .get(
            getFilter + "pageSize=" + this.perPage + "&" + "pageIndex=" + this.currentPage + "&" + "filter=" + this.message
        )
        .then((res) => {
            console.log(res);
            this.employees = res.data.data;
            this.genderFormat(this.employees);
            this.departmentsFormat(this.employees);
            this.employeeNumber = res.data.totalRecord;
            if(this.employeeNumber % this.perPage == 0){
                this.totalPage = this.employeeNumber/this.perPage;
            }
            else {
                this.totalPage = Math.floor(this.employeeNumber / this.perPage) + 1;
            }
            //loading data succesful
            this.isBusy = false;
        })
        .catch((res) => {
            console.log(res);
        })
        
        axios.get(getAll)
        .then((res) => {
            this.initialEmployees = res.data;
        })
        .catch((res) => {
            console.log(res);
        })

        this.getAllData();
      },

    /**
     * Refresh data
     */
    refreshData(){
      //setup default combobox sort
      this.thisSort = {
        id: null,
        text: null,
      };
      //setup default combobox depart
      this.thisDepart = {
        id: null,
        text: null,
      }
      //setup default checkbox
      this.checked = [];

      this.currentPage = 1;
      this.perPage = 20;
      this.loadData();
      //set up mặc định cho combobox là lựa 20 bản ghi trên trang
      this.$refs.comboBox.resetPerPage(); //hàm resetPerPage là hàm viết bên file comboBox.vue
    },
    
    /**
     * cụm hàm đóng / mở dialog
     */
    //hiện dialog thêm
    showEmployeeDialog(){
        axios
            .get(getMaxCode)
            .then((res) => {
                this.isShowDialogEmployee = true;
                this.formmode = form.add;
                this.selectedEmployee = {};
                this.selectedEmployee.employeeCode = res.data;
            })
            .catch((res) => {
                console.log(res);
            })
    },
    //hiện dialog sửa
    showEmployeeDetail(employeeId){
        //get data employee to edit
        return axios
                .get(getAll + "/" + employeeId)
                .then((res) => {
                    this.isShowDialogEmployee = true;
                    this.formmode = form.edit;
                    this.selectedEmployee = res.data;
                    
                    this.departments.forEach((department) => {
                        if(this.selectedEmployee.departmentId == department.departmentId)
                            this.selectedEmployee.departmentName = department.departmentName;
                    });

                    return Promise.resolve(); //resolve là hàm sẽ được gọi khi promise hoàn thành
                })
                .catch((res) => {
                    console.log(res);
                    return Promise.reject(); //reject là hàm sẽ được gọi khi có lỗi xảy ra
                })

    },
    //hiện dialog nhân bản
      showEmployeeDuplicate(employeeId){
        this.showEmployeeDetail(employeeId).then(() => 
          axios
            .get(getMaxCode)
            .then((res) => {
              this.selectedEmployee.employeeCode = res.data;
              this.selectedEmployee.identityNumber = "";
              this.formmode = form.add;
            })
            .catch((res) => {
              console.log(res);
            })
        )
      },
      //hiện dialog xác nhận xóa
      showDeleteDialog(employeeId){
        this.isShowDialogDelete = true; //Bật dialog xác nhận xóa
        //Fix bug tích checkbox 1 bản ghi rồi xóa bản ghi đó, sau đó lại tiếp tục tích 2 checkbox để xóa hàng loạt thì dialog báo xóa 3 bản ghi
        const index = this.checked.indexOf(employeeId); //tìm vị trí của 1 bản ghi xóa lúc đầu
        console.log(index);
        if (index > -1) {
          this.checked.splice(index, 1); //xóa bản ghi đó trong mảng checked đi là mảng checked sẽ không lưu nó nữa, tránh bug trên
        }
        console.log(this.checked);
        //Lấy data của nhân viên muốn xóa
        axios
          .get(getAll +"/" + employeeId)
          .then((res) => {
            this.selectedEmployee = res.data;
          })
          .catch((res) => {
            console.log(res);
          });
      },
      //hiện thông báo đang hoàn thiện tính năng ngưng sử dụng
      showStopUsingDialog(){
        this.isShowDialogStopUsing = true;
      },
      //ẩn dialog thêm và xóa
      hideDialog(){
        this.isShowDialogEmployee = false;
        this.isShowDialogDelete = false;
        this.isShowDialogStopUsing = false;
        this.loadData();
      },

      /**
       * Tìm kiếm theo mã hoặc tên nhân viên
       */
      searchData(){
        //Vì chưa kết hợp vừa tìm kiếm vừa sắp xếp (nhóm phòng ban) nên khi tìm kiếm thì setup default 2 combobox sắp xếp vs nhóm
        this.thisSort = {
          id: null,
          text: null,
        }
        this.thisDepart = {
          id: null,
          text: null,
        }

        //Bắt đầu tìm kiếm
        this.currentPage = 1;
        axios
          .get(
            getFilter + "pageSize=" + this.perPage + "&" + "pageIndex=" + this.currentPage + "&" + "filter=" + this.message
          )
          .then((res) => {
            console.log(res);
            this.employees = res.data.data;

            //format gender and department
            this.genderFormat(this.employees);
            this.departmentsFormat(this.employees);
            //Số lượng bản ghi hợp lệ
            this.employeeNumber = res.data.totalRecord;
            if (this.employeeNumber % this.perPage == 0) {
              this.totalPage = this.employeeNumber / this.perPage;
            } else {
              this.totalPage = Math.floor(this.employeeNumber / this.perPage) + 1;
            }
          })
          .catch((res) => {
            console.log(res);
          })
      },

      /**
       * Cụm hàm format từ id sang name để hiện thị
       * CreatedBy: VDDong(14/06/2021)
       */
      //format giới tính
      genderFormat(array) {
        array.forEach((element) => {
          if (element.gender == 0) element.genderName = gender.female;
          else if (element.gender == 1) element.genderName = gender.male;
          else element.genderName = gender.rest;
        });
      },
      //format tên phòng ban
      departmentsFormat(array) {
        //Lấy tất cả dữ liệu phòng ban từ database
        axios
          .get(getDepartments)
          .then((res) => {
            this.departments = res.data;
            //Gán giá trị departmentName của từng nhân viên với id tương ứng trong dữ liệu phòng ban trả về từ api
            array.forEach((element) => {
              this.departments.forEach((department) => {
                if (element.departmentId == department.departmentId)
                  element.departmentName = department.departmentName;
              });
            });
          })
          .catch((res) => {
            console.log(res);
          });
      },

      /**
       * Xuất dữ liệu ra file excel
       * CreatedBy: VDDong(14/06/2021)
       */
      exportData(){
        window.open(getExport);
      },

      /**
       * Thay đổi số trang, thay đổi currentPage
       */
      onPageChange(page){
        if (this.employeeNumber % this.perPage == 0) {
        this.totalPage = this.employeeNumber / this.perPage;
        } else {
        this.totalPage = Math.floor(this.employeeNumber / this.perPage) + 1;
        }
        if(page > 0 && page <= this.totalPage){
          this.currentPage = page;
          //nếu đang ở trạng thái sort với nhóm
          //thì vẫn giữ api sắp xếp vs nhóm đó, chỉ đổi pageSize vs pageIndex
          if(this.formPagingSort){
            this.sortsBy();
          }
          //nếu đang ở trạng thái bình thường (sử dụng API filter)
          else {
            axios
              .get(
                  getFilter + "pageSize=" +
                              this.perPage +
                              "&" +
                              "pageIndex=" +
                              this.currentPage +
                              "&" +
                              "filter=" +
                              this.message
              )
              .then((res) => {
              console.log(res);
              this.employees = res.data.data;

              //format gender and department
              this.genderFormat(this.employees);
              this.departmentsFormat(this.employees);
              //Số lượng bản ghi hợp lệ 
              this.employeeNumber = res.data.totalRecord;
              })
              .catch((res) => {
                  console.log(res);
              });
          }
        }
      },

      /**
       * Xử lí việc chọn số bản ghi trên 1 trang
       * info là số lượng bản trên 1 trang truyền từ comboBox lên
       * CreatedBy: VDDong(14/06/2021)
       */
      handlePerPage(info) {
        //vì khi đổi số bản ghi trên trang thì dữ liệu reset về API filter
        //nên set default 2 cái combobox sắp xếp với nhóm phòng ban
        this.thisSort = {
          id: null,
          text: null,
        }
        this.thisDepart = {
          id: null,
          text: null,
        }

        //setup lại số bản ghi trên trang để hiển thị ra
        this.currentPage = 1;
        this.perPage = info;
        this.loadData();
      },

      /**
       * Cụm hàm liên quan đến combobox
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
      //Ẩn / hiện combobox
      showDropDownContentSort(){
        this.listOptionsSort = this.initialListOptionsSort;
        this.isShowOptionsSort = !this.isShowOptionsSort;
      },
      hideDropDownContentSort(){
        if(this.overClick == false) this.isShowOptionsSort = false;
      },
      showDropDownContentDepart(){
        this.listOptionsDepart = this.initialListOptionsDepart;
        this.isShowOptionsDepart = !this.isShowOptionsDepart;
      },
      hideDropDownContentDepart(){
        if(this.overClick == false) this.isShowOptionsDepart = false;
      },

      //Gán dữ liệu đã chọn từ combobox để thực thi và hiện ra combobox
      chooseOptionSort(option){
        //Vì chưa kết hợp vừa sort vừa tìm kiếm nên khi chọn sort thì reset default thanh input tìm kiếm
        this.message = "";

        //Gán giá trị được chọn cho id và text của loại sort
        this.thisSort.id = option.id;
        console.log(this.thisSort.id);
        this.sortFormat(this.thisSort.id);
        this.overClick = false;
        this.hideDropDownContentSort();
        this.sortsBy(); //thực thi
      },
      sortFormat(Id){ //Format tên loại sort để binding vào combobox
        this.listOptionsSort.forEach(optionSort => {
          if(Id == optionSort.id){
            this.thisSort.text = optionSort.text;
          }
        });
      },
      chooseOptionDepart(option){
        //vì chưa kết hợp vừa nhóm vừa tìm kiếm nên khi chọn nhóm phòng ban thì reset default input tìm kiếm
        this.message = "";

        //Gán giá trị được chọn cho id và text của loại sort
        this.thisDepart.id = option.id;
        console.log(this.thisDepart.id);
        this.departFormat(this.thisDepart.id);
        this.overClick = false;
        this.hideDropDownContentDepart();
        this.sortsBy(); //thực thi
      },
      departFormat(Id){ //Format tên loại phòng ban để binding vào form
        this.listOptionsDepart.forEach(optionDepart => {
          if(Id == optionDepart.id){
            this.thisDepart.text = optionDepart.text;
          }
        });
      },

      //Tìm kiếm ở ô input so với các option ở combobox
      searchOptionSort(){
        this.listOptionsSort = this.initialListOptionsSort.filter(option => {
            return (
                option.text.toLowerCase().includes(this.thisSort.text.toLowerCase())
            )
        });
      },
      searchOptionDepart(){
        this.listOptionsDepart = this.initialListOptionsDepart.filter(option => {
          return (
            option.text.toLowerCase().includes(this.thisDepart.text.toLowerCase())
          )
        });
      },

      /**
       * Hàm gọi đến API để xử lý việc sắp xếp và nhóm phòng ban
       * CreateBy: VDDong
       * */
      sortsBy(){
        console.log("sort all: " + this.thisSort.id);
        console.log("sort depart: " + this.thisDepart.id);

        this.formPagingSort = true; //chuyển sang trạng thái paging theo sắp xếp và nhóm
        if(this.thisDepart.id == null) this.thisDepart.id = ""; //nếu không chọn sắp xếp hay phòng ban thì đưa về "" cho phù hợp API
        var urlAPI = ""; //api để request trả về danh sách dữ liệu sắp xếp
        if(this.thisSort.id == null || this.thisSort.id == 1){ //mặc định hoặc sắp xếp thứ tự thêm mới (là sortByCode)
          urlAPI = (sortByCode + "pageSize=" + this.perPage + "&pageIndex=" + this.currentPage + "&departmentString=" + this.thisDepart.id);
        }
        else if(this.thisSort.id == 2){ //sắp xếp theo tên nhân viên
          urlAPI = (sortByName + "pageSize=" + this.perPage + "&pageIndex=" + this.currentPage + "&departmentString=" + this.thisDepart.id);
        }
        //call api
        axios
          .get(urlAPI)
          .then((res) => {
            console.log(res);
            this.employeeNumber = res.data.totalRecord;
            this.employees = res.data.data;
            if(this.employeeNumber % this.perPage == 0){
              this.totalPage = this.employeeNumber / this.perPage;
            }
            else {
              this.totalPage = Math.floor(this.employeeNumber / this.perPage) + 1;
            }
          })
          .catch((res) => {
            console.log(res);
          })

      },

      /**
       * Cụm hàm xóa hàng loạt nhiều bản ghi một lúc
       * Xóa các bản ghi có tích checkbox, xóa theo id các bản ghi được lưu trong mảng checked
       * CreatedBy:
       */
      //Hàm bật popup xác nhận xóa
      showConfirmDeleteMultiple(){
        this.isShowPopUpConfirmMultipleDelete = true;
        this.errorMsg = "Xóa " + this.checked.length + " bản ghi đã chọn?";
      },

      //Hàm thực thi xóa
      deleteMultiple(){
        console.log("multiple delete");
        var newChecked = this.checked;
        console.log(newChecked);
        for(let i=0; i<newChecked.length; i++){
          console.log(newChecked[i]);
          axios
            .delete(getAll + "/" + newChecked[i])
            .then(() => {
              console.log(Notice.DeleteSuccess);
              this.hideDialog();
            })
            .catch((res) => {
              console.log(res);
            })
        }
        //Ở đây đang xảy ra vấn đề là khi xóa xong thì mảng checked vẫn còn lưu các id bản ghi đã tích checkbox từ trước khi xóa
        //nên là button xóa hàng loạt vẫn còn hiện (click vào thì vẫn báo xóa thành công nhưng ko có bản khi nào xóa vì đã xóa từ trước rồi)
        //Nếu tại đây viết this.checked = [] thì sẽ xảy ra hiện tượng bất đồng bộ, nghĩa là api xóa chưa kịp chạy xong thì đã set mảng checked
        //thành rỗng rồi khiến khi api xóa gọi đến thì không còn id để lấy ra xóa
        //Chưa biết cách xử lí bất đồng bộ nên tạm thời lưu mảng checked sang mảng mới newChecked rồi lấy id để xóa từ newChecked, sau đó
        //set this.checked = [] để tắt button xóa hàng loạt đi
        this.checked = [];
        //hiện popup báo số bản ghi đã xóa
        this.isErrorPopUpShow = true;
        this.errorMsg = "Bạn đã xóa " + newChecked.length + " bản ghi nhân viên";

        //reset lại combobox (trong trường hợp sắp xếp, nhóm rồi xóa)
        this.thisSort = {
          id: null,
          text: null,
        }
        this.thisDepart = {
          id: null,
          text: null,
        }

      },

      /**
       * Tắt thông báo xóa hàng loạt
       * 
       * CreatedBy:
       */
      hidePopUp(){
        //Đóng thông báo
        this.isErrorPopUpShow = false,
        this.isShowPopUpAddFromExcel = false,
        this.isShowPopUpConfirmMultipleDelete = false,
        //reset lại nội dung thông báo
        this.errorMsg = "";

        this.loadData();
      },

    /**
    * Đọc file từ file excel bên ngoài
    * CreatedBy: VDDong (27/09/2021)
    */
     //Lấy các tiêu đề của các cột trong file excel
    getHeader(sheet) {
      const XLSX = xlsx;
      const headers = [];
      const range = XLSX.utils.decode_range(sheet["!ref"]); // worksheet['!ref'] Is the valid range of the worksheet
      let C;
      /* Get cell value start in the first row */
      const R = range.s.r; //Line / / column C
      let i = 0;
      for (C = range.s.c; C <= range.e.c; ++C) {
        var cell =
          sheet[
            XLSX.utils.encode_cell({ c: C, r: R })
          ]; /* Get the cell value based on the address  find the cell in the first row */
        var hdr = "UNKNOWN" + C; // replace with your desired default
        // XLSX.utils.format_cell Generate cell text value
        if (cell && cell.t) hdr = XLSX.utils.format_cell(cell);
        if(hdr.indexOf('UNKNOWN') > -1){
          if(!i) {
            hdr = '__EMPTY';
          }else {
            hdr = '__EMPTY_' + i;
          }
          i++;
        }
        headers.push(hdr);
      }
      return headers;
    },
    //Lấy ra các giá trị của từng row trong file excel (trừ row tiêu đề đầu mỗi cột)
    importFileExcel(e) {
      const files = e.target.files;
      console.log(files);
      var fileName = files[0].name; //lấy tên file
      if (!files.length) {
        return ;
      } else if (!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())) { //Nếu file không đúng định dạng
        return alert(Notice.IncorrecExcelFile);
      }
      const fileReader = new FileReader();
      fileReader.onload = ev => {
        try {
          const data = ev.target.result;
          const XLSX = xlsx;
          const workbook = XLSX.read(data, {
            type: "binary"
          });
          const wsname = workbook.SheetNames[0]; // Take the first sheet，wb.SheetNames[0] :Take the name of the first sheet in the sheets
          const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]); // Generate JSON table content，wb.Sheets[Sheet名]    Get the data of the first sheet
          //biến excellist là biến nhận các bản ghi từ file excel
          const excellist = []; // Clear received data
          // Edit data
          for (var i = 0; i < ws.length; i++) {
            excellist.push(ws[i]);
          }
          //chuyển các bản ghi từ file excel vào mảng listRecordsExcel
          this.listRecordsExcel = excellist;
          //hiện popup xác nhận thêm nhiều bản ghi từ file excel
          this.isShowPopUpAddFromExcel = true;
          this.errorMsg = "Xác nhận thêm " + this.listRecordsExcel.length + " nhân viên từ file excel " + fileName; //muốn hiện cả số bản ghi từ file với tên file nhưng chưa làm được
          // console.log(this.listRecordsExcel);
          console.log("Read results", excellist); // At this point, you get an array containing objects that need to be processed
          // Get header2-1
          const a = workbook.Sheets[workbook.SheetNames[0]];
          const headers = this.getHeader(a);
          console.log('headers', headers);
          // Get header2-2
        } catch (e) {
          return alert(Notice.ReadExcelFileFail);
        }
      };
      fileReader.readAsBinaryString(files[0]);
      //setup lại input file thành bình thường
      var input = document.getElementById("uploadExcel");
      input.value = "";

    },
    //Xử lý việc thêm các bản ghi vừa lấy từ file excel (đang lưu ở listRecordsExcel) lên database
  async  AddFromExcel(){
    this.hidePopUp(); //đóng popup xác nhận thêm x bản ghi từ file excel
      console.log("Xác nhận thêm từ file excel");
      var countAddSuccess = 0; //biến đếm xem đã thêm thành công bao nhiêu bản ghi
      var listRecordsAddFail = []; //mảng lưu trữ những mã nhân viên add không thành công
      for(let i=0; i<this.listRecordsExcel.length; i++){
        //Tạo employee mới để thêm lần lượt
        //File excel phải định dạng tiêu đề từng cột không dấu không cách như đặt tên biến thì mới chuyển thành thuộc tính employee được
        var newEmployee = {};
        newEmployee.employeeCode = this.listRecordsExcel[i].Ma_NV;
        newEmployee.fullName = this.listRecordsExcel[i].Ten_NV;
        newEmployee.gender = this.formatGenderFromExcelToDB(this.listRecordsExcel[i].Gioi_tinh);
        newEmployee.dateOfBirth = this.formatDobFromExcelToDB(this.listRecordsExcel[i].Ngay_sinh);
        newEmployee.jobTitle = this.listRecordsExcel[i].Chuc_danh;
        newEmployee.departmentId = this.formatDepartmentFromExcelToDB(this.listRecordsExcel[i].Don_vi);
        newEmployee.bankAccount = this.listRecordsExcel[i].STK;
        newEmployee.bankName = this.listRecordsExcel[i].Ten_ngan_hang;
        console.log(newEmployee);
        //Gọi API thêm từng newEmployee vào database
      await  axios
          .post(getAll + "/", newEmployee)
          .then((res) => {
            console.log(res);
            countAddSuccess++;
            this.loadData();
            // return Promise.resolve(); //Dùng async / await rồi thì thôi Promise
          })
          .catch((res) => {
            console.log(res);
            var errorFromBackend = res.response.data.devMsg;
            listRecordsAddFail.push(errorFromBackend.substring(13, 23));
            console.log("Error from backend: " + errorFromBackend);
            // return Promise.reject();
          })
      }
      //hiện popup báo số bản ghi đã thêm thành công, không thành công (làm 2 trong 1 luôn)
      this.isErrorPopUpShow = true;
      this.isErrorPopUpShow = true;
      this.errorMsg = "Bạn đã thêm thành công " + countAddSuccess + " bản ghi. " 
                      + "Thêm không thành công các bản ghi: " + listRecordsAddFail.toString();

      this.listRecordsExcel = [];
      // this.hidePopUp();
    },
    //Hàm format ngày sinh từ file excel sang chuẩn định dạng yyyy-MM-dd để có thể add vào database
    formatDobFromExcelToDB(excelDob){
      var stringDob = excelDob + "";
      const str = stringDob.split("/");
      return str[2] + "-" + str[1] + "-" + str[0];

      // var dob = new Date(excelDob).toISOString();
      // return dob;
    },
    //Hàm format tên đơn vị từ file excel sang departmentId để thêm vào DB
    formatDepartmentFromExcelToDB(departmentName){
      if(departmentName == Department.DT) return Department.DTId;
      else if(departmentName == Department.KT) return Department.KTId;
      else if(departmentName == Department.MK) return Department.MKId;
      else if(departmentName == Department.NS) return Department.NSId;
    },
    //Hàm format gender name từ file excel sang dạng int để thêm vào DB
    formatGenderFromExcelToDB(genderName){
      if(genderName == gender.female) return gender.femaleId;
      else if(genderName == gender.male) return gender.maleId;
      else if(genderName == gender.rest) return gender.restId;
    },




  }, //End Methods

  filters: {
    //format date of birth
    dateFormat(dateOfBirth) {
      if(!dateOfBirth) return "";
      var newDate = new Date(dateOfBirth);
      var stringDate = newDate.getDate();
      if (stringDate < 10) stringDate = "0" + stringDate;
      var stringMonth = newDate.getMonth() + 1;
      if (stringMonth < 10) stringMonth = "0" + stringMonth;
      var stringYear = newDate.getFullYear();
      return stringDate + "/" + stringMonth + "/" + stringYear;
    },

  }, //End Filters

  computed: {
      /**
       * Tích tất cả các checkbox
       * CreatedBy: VDDong(14/06/2021)
       */
      checkAll: {
        get: function() {
          return this.initialEmployees ? this.checked.length == this.employeeNumber : false;
        },
        set: function(value) {
          var checked = []; //mảng checked tạm thời, lưu trữ những bản ghi được tích checkbox
          if(value) {
            this.initialEmployees.forEach(function (employee) {
              checked.push(employee.employeeId); //đưa các bản ghi tích checkbox vào mảng checked tạm
            });
          }
          this.checked = checked; //mảng checked chính  = mảng checked tạm
        },
      },
  }, //End Computed

  watch: {
    /**
     * Hàm theo dõi các bản ghi được đánh dấu checkbox
     * 
     * CreatedBy:
     */
    checked: function() {
      console.log("Number records of checked: " + this.checked.le);
      console.log(this.checked);
      if(this.checked.length >= 2){
        // console.log("Có thể xóa hàng loạt");
        this.isDeleteMultiple = true;
      }
      else {
        // console.log("Tắt xóa hàng loạt");
        this.isDeleteMultiple = false;
      }
    }
  } //End Watch
  
}
</script>

<style scoped>
#router-content {
  position: absolute;
  top: 48px;
  left: 178px;
  box-sizing: border-box;
  display: inline-block;
  background: rgb(244, 245, 246);
  width: calc(100% - 178px);
  height: calc(100% - 48px);
  /* background-color: aqua; */
  padding-top: 24px;
  padding-left: 24px;
  padding-bottom: 24px;
  padding-right: 24px;
}
#title-bar {
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  /* background-color: aqua; */
}
.title {
  /* font-weight: bold; */
  font-size: 24px;
  font-weight: 700;
  color: #111;
  margin-bottom: 25px;
}
.back-title{
    position: absolute;
    left: 25px;
    top: 50px;
    color: rgb(29, 131, 214);
}
.btn-wrapper {
  position: absolute;
  right: 24px;
  height: 40px;
  top: 15px;
}




#tablewrapper {
  background: #fff;
  color: #111;
  height: calc(100% - 36px);
  width: 100%;
  overflow: hidden;
  /* margin-right: 24px; */
  /* padding: 0px 24px 24px 24px; */
  padding-bottom: 24px;
  box-sizing: border-box;
  border-collapse: collapse;
  /* background-color: #2ca01c; */
  /* background-color: gray; */
}
#table{
  height: 100%;
  overflow: auto;
  
}

#search {
  height: 80px;
  width: 100%;
}
#sort-and-group{
  height: 80px;
  width: 400px;
  /* background-color: aqua; */
  display: flex;
  align-items: center;
  position: absolute;
  left: 40px;
}
  .sortBar{
    width: 180px;
    height: 50px;
  }

  .groupBar{
    width: 180px;
    height: 50px;
    /* background-color: rgb(37, 165, 122); */
    margin-left: 20px;
  }

#search-bar-wrapper {
  height: 80px;
  /* background-color: aqua; */
  display: flex;
  align-items: center;
  position: absolute;
  right: 36px;
}
.search-bar-and-icon {
  border-radius: 2px;
  box-sizing: border-box;
  width: 232px;
  display: flex;
  align-items: center;
  border: 1px solid #babec5;
  border-collapse: collapse;
}
.search-bar-and-icon:focus-within {
  border: 1px solid #2ca01c;
}
#search-bar {
  width: 199px;
  height: 31px;
  font-size: 13px;
  /* border-radius: 2px;
        border: 1px solid #babec5; */
  outline: none;
  border: none;
  /* border: 1px solid #babec5; */
  /* border-right: none; */
  box-sizing: border-box;
  padding: 6px 10px;
  font-style: italic;
  border-collapse: collapse;
}
#search-icon {
  width: 31px;
  height: 31px;
  background: url(../../../assets/img/Sprites.64af8f61.svg) no-repeat;
  background-position: -984px -353px;
  border: none;
  outline: none;
  border-collapse: collapse;
}

#btn-refresh-wrapper {
  height: 80px;
  width: 80px;
  padding-left: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: #2ca01c; */
}

tbody tr:hover {
  background-color: #eeeded;
}


#footer {
  /* margin-top: 24px; */
  position: absolute;
  bottom: 24px;
  /* background-color: red; */
  width: calc(100% - 48px);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
#footer-right {
  display: flex;
  align-items: center;
  position: absolute;
  right: 48px;
}
/* #footer-2{
        background-color: aqua;
    }
    #footer-3{
        background-color: red;
        position: absolute;
        right: 48px;
        float: right;
        
    } */
.fa-3x {
  position: absolute;
  left: 54%;
  top: 50%;
  transform: translate(-50%, -50%);
}


/**
  Dropdown
*/
.dialog_hide{
  display: none;
}
.dropdown-text-and-icon{
    width: 100%;
    padding: 6px 6px;
    font-size: 13px;
    height: 35px;
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
    position: relative;
    display: inline-block;
    width: 100%;
    /* background-color: #2ca01c; */
}
.dropdown-content{
    /* height: 120px; */
    width: 100%;
    
    top: -10px;
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

</style>