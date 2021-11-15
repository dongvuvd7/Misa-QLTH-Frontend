<template>
    <div id="router">
        <div id="router-content">
            <div id="title-bar">

                <div class="search-bar-and-icon">
                    <input
                    id="search-bar"
                    type="text"
                    placeholder="Tìm theo mã, tên cán bộ"
                    v-model="message"
                    @keyup="searchData()"
                    />
                    <button id="search-icon"></button>
                </div>

                <div class="btn-wrapper">
                  <button class="btn-delete-all delete-color" id="btn-delete-all" :class="{'btn-hide': !isDeleteMultiple}"
                    @click="showConfirmDeleteMultiple()"
                  >
                    Xóa hàng loạt
                  </button>
                  <button class="btn-add primary-color" id="btn-add" @click="showTeacherDialog()">
                      Thêm
                  </button>
                  <button class="btn-export-excel default-color" id="" @click="exportData()">
                      Xuất excel
                  </button>
                  <label class="btn-add-excel primary-color" id="btn-addFromExcel">
                    <i class="fas fa-table"></i>
                    <input type="file" id="uploadExcel" @change="importFileExcel"/>
                    Nhập Excel
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
                                    @focus="showDropDownContent('Sort')" 
                                    @blur="hideDropDownContent('Sort')" 
                                    @keyup="searchOption('Sort')"
                                    v-model="thisChoose.Sort.text"
                                    placeholder="Lựa chọn sắp xếp"
                                />
                                <button id="dropdown-icon" @click="showDropDownContent('Sort')" @blur="hideDropDownContent('Sort')"></button>
                            </div>
                            <div id="dropdown">     
                                <div class="dropdown-content" :class="{'dialog_hide': !isShowOptions.Sort}" >
                                    <div class="dropdown-content-a" 
                                        :class="{'drop-down-content-selected' : optionSort.id == thisChoose.Sort.id}"
                                        v-for="optionSort in listOptions.Sort" 
                                        :key="optionSort.id" 
                                        @click="chooseOption(optionSort, 'Sort')" 
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
                                    @focus="showDropDownContent('Group')" 
                                    @blur="hideDropDownContent('Group')" 
                                    @keyup="searchOption('Group')"
                                    v-model="thisChoose.Group.text"
                                    placeholder="Nhóm tổ chuyên môn"
                                />
                                <button id="dropdown-icon" @click="showDropDownContent('Group')" @blur="hideDropDownContent('Group')"></button>
                            </div>
                            <div id="dropdown">     
                                <div class="dropdown-content" :class="{'dialog_hide': !isShowOptions.Group}" >
                                    <div class="dropdown-content-a" 
                                        :class="{'drop-down-content-selected' : optionGroup.id == thisChoose.Group.id}"
                                        v-for="optionGroup in listOptions.Group" 
                                        :key="optionGroup.id" 
                                        @click="chooseOption(optionGroup, 'Group')" 
                                        @mouseenter="enterClick()" 
                                        @mouseleave="leaveClick()"
                                    >{{optionGroup.text}}</div>
                                </div>
                            </div>
                          </div>

                        </div>


                        <div id="search-bar-wrapper">
                            <div id="btn-refresh-wrapper">
                                <button id="btn-refresh" @click="refreshData()"></button>        
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
                                        <th style="min-width: 100px">Số hiệu cán bộ</th>
                                        <th style="min-width: 160px; text-align: center;">Họ và tên</th>
                                        <th style="min-width: 50px">Số điện thoại</th>
                                        <th style="min-width: 110px;">Tổ chuyên môn</th>
                                        <th style="min-width: 100px">QL theo môn</th>
                                        <th style="min-width: 150px">QL kho, phòng</th>
                                        <th style="min-width: 80px">Đào tạo QLTB</th>
                                        <th style="min-width: 100px">Đang làm việc</th>
                                        <!-- <th style="min-width: 83.33%">CHỨC NĂNG</th> -->
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="teacher in teachers" :key="teacher.teacherId">
                                        <td>
                                            <input
                                                type="checkbox"
                                                v-model="checked"
                                                :value="teacher.teacherId"
                                            />
                                        </td>
                                        <td>{{ teacher.teacherCode }}</td>
                                        <td style="text-transform: capitalize; color: #00a093">{{ teacher.teacherName }}</td>
                                        <td>{{ teacher.teacherPhone }}</td>
                                        <td>{{ teacher.teacherGroup | groupFormatToTable }}</td>
                                        <td>{{ teacher.teacherSubject }}</td>
                                        <td>{{ teacher.teacherRoom }}</td>
                                        <td :class="{'tickbox': teacher.teacherQltb == 1}"></td>
                                        <td></td>
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
                                    <tr v-for="teacher in teachers" :key="teacher.teacherId" style="background: white border: 1px solid #ccc;">
                                        <td>
                                            <Option 
                                                @showDeleteDialog="showDeleteDialog(teacher.teacherId)"
                                                @showTeacherDetail="showTeacherDetail(teacher.teacherId)"
                                                @showTeacherDuplicate="showTeacherDuplicate(teacher.teacherId)"
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div id="footer">
                        <div id="total-data">
                          <div id="footer-3">
                            <Paging
                                :totalPages="totalPage"
                                :perPage="perPage"
                                :page="currentPage"
                                @onChangePage="onPageChange"
                            />
                          </div>
                          (<b>{{this.teacherNumber}}</b> giáo viên)
                        </div>
                        <div id="footer-right">                          
                            <div id="footer-2">
                                <ComboBox @setPerPage="handlePerPage" ref="comboBox" />
                            </div>                
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <TeacherDetail 
            v-if="isShowDialogTeacher"
            @hideDialog="hideDialog"
            :teacher="selectedTeacher"
            :formmode="formmode"
            @showTeacherDialog="showTeacherDialog"
        />
        <TeacherDelete
          :isShow="isShowDialogDelete"
          @hideDialog="hideDialog"
          :teacher="selectedTeacher"
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
import TeacherDetail from "../teacher/teacherDetail.vue";
import TeacherDelete from "../teacher/teacherDelete.vue";
import ErrorPopUp from '../../common/pop-up/errorPopUp.vue';
import AddFromExcelPopUp from './teacherAddFromExcel.vue';
import ConfirmDeleteMultiplePopUp from './teacherConfirmMultipleDelete.vue';
import xlsx from 'xlsx';

import Enums from "../../common/base/enum.js";
import Resources from "../../common/base/resource.js";


export default {
  components: {
      Option,
      ComboBox,
      Paging,
      TeacherDetail,
      TeacherDelete,
      ErrorPopUp,
      AddFromExcelPopUp,
      ConfirmDeleteMultiplePopUp,
  },

  data() {
      return {
            initialTeachers: [], //Data đầu vào cho api get all
            teachers: [], //data lấy vào khi get để gán dữ liệu lên table
            teacherNumber: 0,  //tổng số bản ghi
            groups: [], //data đơn vị (phòng ban)
            isShowDialogTeacher: false, //biến đóng/mở dialog thêm sửa
            isShowDialogDelete: false, // biến đóng/mở dialog xóa
            isShowDialogStopUsing: false, //biến đóng/mở dialog ngưng sử dụng
            message: null, //tiêu chí tìm kiếm
            selectedTeacher: {}, //nhân viên được chọn
            checked: [], //danh sách được tích vào checkbox
            currentPage: 0, //trang hiện tại
            perPage: 0, //số bản ghi trên 1 trang
            totalPage: 0, //tổng số trang
            isBusy: true, //loading animation, kiểm tra đã load dữ liệu xong chưa
            formmode: "", //phân biệt giữa sửa và thêm

            overClick: false, //Biến kiểm tra xem chuột có di chuyển vào các options hay không, phân biệt click với blur

            isShowOptions: {
              Sort: false,
              Group: false,
            },
            thisChoose: {
              Sort: {
                id: null,
                text: null,
              },
              Group: {
                id: null,
                text: null,
              }
            },
            listOptions: {
              Sort: [
                {id: Enums.TypeSort.CodeId, text: Enums.TypeSort.Code},
                {id: Enums.TypeSort.NameId, text: Enums.TypeSort.Name},
              ],
              Group: [
                {id: Enums.Group.VPId, text: Enums.Group.VP},
                {id: Enums.Group.LHId, text: Enums.Group.LH},
                {id: Enums.Group.TTId, text: Enums.Group.TT},
                {id: Enums.Group.SSDId, text: Enums.Group.SSD},
                {id: Enums.Group.NVId, text: Enums.Group.NV},
                {id: Enums.Group.AVId, text: Enums.Group.AV},
              ],
            },
            initialListOptions: {
              Sort: [
                {id: Enums.TypeSort.CodeId, text: Enums.TypeSort.Code},
                {id: Enums.TypeSort.NameId, text: Enums.TypeSort.Name},
              ],
              Group: [
                {id: Enums.Group.VPId, text: Enums.Group.VP},
                {id: Enums.Group.LHId, text: Enums.Group.LH},
                {id: Enums.Group.TTId, text: Enums.Group.TT},
                {id: Enums.Group.SSDId, text: Enums.Group.SSD},
                {id: Enums.Group.NVId, text: Enums.Group.NV},
                {id: Enums.Group.AVId, text: Enums.Group.AV},
              ],
            },

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
            Resources.API.GetFilter + "pageSize=" + this.perPage + "&" + "pageIndex=" + this.currentPage + "&" + "filter=" + this.message
        )
        .then((res) => {
            console.log(res);
            this.teachers = res.data.data;
            this.groupsFormat(this.teachers);
            this.teacherNumber = res.data.totalRecord;
            if(this.teacherNumber % this.perPage == 0){
                this.totalPage = this.teacherNumber/this.perPage;
            }
            else {
                this.totalPage = Math.floor(this.teacherNumber / this.perPage) + 1;
            }
            //loading data succesful
            this.isBusy = false;
        })
        .catch((res) => {
            console.log(res);
        })
        
        axios.get(Resources.API.GetAll)
        .then((res) => {
            this.initialTeachers = res.data;
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
          .get(Resources.API.GetAll)
          .then((res) => {
              this.initialTeachers = res.data;
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
            Resources.API.GetFilter + "pageSize=" + this.perPage + "&" + "pageIndex=" + this.currentPage + "&" + "filter=" + this.message
        )
        .then((res) => {
            console.log(res);
            this.teachers = res.data.data;
            this.groupsFormat(this.teachers);
            this.teacherNumber = res.data.totalRecord;
            if(this.teacherNumber % this.perPage == 0){
                this.totalPage = this.teacherNumber/this.perPage;
            }
            else {
                this.totalPage = Math.floor(this.teacherNumber / this.perPage) + 1;
            }
            //loading data succesful
            this.isBusy = false;
        })
        .catch((res) => {
            console.log(res);
        })
        
        axios.get(Resources.API.GetAll)
        .then((res) => {
            this.initialTeachers = res.data;
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
      this.refreshCombobox();
      //setup default checkbox
      this.checked = [];

      this.currentPage = 1;
      this.perPage = 20;
      this.loadData();
      //set up mặc định cho combobox là lựa 20 bản ghi trên trang
      this.$refs.comboBox.resetPerPage(); //hàm resetPerPage là hàm viết bên file comboBox.vue
    },

    /**
     * Hàm refresh combobox
     * CreatedBy: VDDong
     */
    refreshCombobox(){
      this.thisChoose = {
        Sort: {
          id: null,
          text: null
        },
        Group: {
          id: null,
          text: null,
        },
      }
    },
    
    /**
     * Cụm hàm đóng / mở dialog
     */
    //hiện dialog thêm
    showTeacherDialog(){
        axios
            .get(Resources.API.GetMaxCode)
            .then((res) => {
                this.isShowDialogTeacher = true;
                this.formmode = Enums.FormMode.Add;
                this.selectedTeacher = {};
                this.selectedTeacher.teacherCode = res.data;
            })
            .catch((res) => {
                console.log(res);
            })
    },
    //hiện dialog sửa
    showTeacherDetail(teacherId){
        //get data teacher to edit
        return axios
                .get(Resources.API.GetAll + "/" + teacherId)
                .then((res) => {
                    this.isShowDialogTeacher = true;
                    this.formmode = Enums.FormMode.Edit;
                    this.selectedTeacher = res.data;
                    
                    this.groups.forEach((group) => {
                        if(this.selectedTeacher.teacherGroup == group.groupId)
                            this.selectedTeacher.teacherGroupName = group.groupName;
                    });

                    return Promise.resolve(); //resolve là hàm sẽ được gọi khi promise hoàn thành
                })
                .catch((res) => {
                    console.log(res);
                    return Promise.reject(); //reject là hàm sẽ được gọi khi có lỗi xảy ra
                })

    },
    //hiện dialog nhân bản
      showTeacherDuplicate(teacherId){
        this.showTeacherDetail(teacherId).then(() => 
          axios
            .get(Resources.API.GetMaxCode)
            .then((res) => {
              this.selectedTeacher.teacherCode = res.data;
              this.formmode = Enums.FormMode.Add;
            })
            .catch((res) => {
              console.log(res);
            })
        )
      },
      //hiện dialog xác nhận xóa
      showDeleteDialog(teacherId){
        this.isShowDialogDelete = true; //Bật dialog xác nhận xóa
        //Fix bug tích checkbox 1 bản ghi rồi xóa bản ghi đó, sau đó lại tiếp tục tích 2 checkbox để xóa hàng loạt thì dialog báo xóa 3 bản ghi
        const index = this.checked.indexOf(teacherId); //tìm vị trí của 1 bản ghi xóa lúc đầu
        console.log(index);
        if (index > -1) {
          this.checked.splice(index, 1); //xóa bản ghi đó trong mảng checked đi là mảng checked sẽ không lưu nó nữa, tránh bug trên
        }
        console.log(this.checked);
        //Lấy data của nhân viên muốn xóa
        axios
          .get(Resources.API.GetAll +"/" + teacherId)
          .then((res) => {
            this.selectedTeacher = res.data;
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
        this.isShowDialogTeacher = false;
        this.isShowDialogDelete = false;
        this.isShowDialogStopUsing = false;
        this.loadData();
      },

      /**
       * Tìm kiếm theo mã hoặc tên nhân viên
       */
      searchData(){
        //Vì chưa kết hợp vừa tìm kiếm vừa sắp xếp (nhóm phòng ban) nên khi tìm kiếm thì setup default 2 combobox sắp xếp vs nhóm
        this.refreshCombobox();

        //Bắt đầu tìm kiếm
        this.currentPage = 1;
        axios
          .get(
            Resources.API.GetFilter + "pageSize=" + this.perPage + "&" + "pageIndex=" + this.currentPage + "&" + "filter=" + this.message
          )
          .then((res) => {
            console.log(res);
            this.teachers = res.data.data;

            //format group
            this.groupsFormat(this.teachers);
            //Số lượng bản ghi hợp lệ
            this.teacherNumber = res.data.totalRecord;
            if (this.teacherNumber % this.perPage == 0) {
              this.totalPage = this.teacherNumber / this.perPage;
            } else {
              this.totalPage = Math.floor(this.teacherNumber / this.perPage) + 1;
            }
          })
          .catch((res) => {
            console.log(res);
          })
      },

      //format tên tổ chuyên môn
      groupsFormat(array) {
        //Lấy tất cả dữ liệu phòng ban từ database
        axios
          .get(Resources.API.GetGroups)
          .then((res) => {
            this.groups = res.data;
            //Gán giá trị groupName của từng nhân viên với id tương ứng trong dữ liệu phòng ban trả về từ api
            array.forEach((element) => {
              this.groups.forEach((group) => {
                if (element.teacherGroup == group.groupId)
                  element.teacherGroupName = group.groupName;
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
        window.open(Resources.API.GetExport);
      },

      /**
       * Thay đổi số trang, thay đổi currentPage
       */
      onPageChange(page){
        if (this.teacherNumber % this.perPage == 0) {
        this.totalPage = this.teacherNumber / this.perPage;
        } else {
        this.totalPage = Math.floor(this.teacherNumber / this.perPage) + 1;
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
                  Resources.API.GetFilter + "pageSize=" +
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
              this.teachers = res.data.data;

              //format group
              this.groupsFormat(this.teachers);
              //Số lượng bản ghi hợp lệ 
              this.teacherNumber = res.data.totalRecord;
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
        this.refreshCombobox();

        //setup lại số bản ghi trên trang để hiển thị ra
        this.currentPage = 1;
        this.perPage = info;
        this.loadData();
      },

      /**
       * Cụm hàm liên quan đến combobox
       * Hàm dùng chung
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
      showDropDownContent(type){
        this.listOptions[type] = this.initialListOptions[type];
        this.isShowOptions[type] = !this.isShowOptions[type];
      },
      hideDropDownContent(type){
        if(this.overClick == false) this.isShowOptions[type] = false;
      },
      //Gán dữ liệu đã chọn từ combobox để thực thi và hiện ra combobox
      chooseOption(option, type){
        //Vì chưa kết hợp vừa sort vừa tìm kiếm nên khi chọn sort thì reset default thanh input tìm kiếm
        this.message = "";

        //Gán giá trị được chọn cho id và text của loại sort
        this.thisChoose[type].id = option.id;
        this.optionFormat(this.thisChoose[type].id, type);
        this.overClick = false;
        this.hideDropDownContent(type);
        this.sortsBy();
      },
      //Format tên loại type option để binding vào combobox
      optionFormat(Id, type){
        this.listOptions[type].forEach(option => {
          if(Id == option.id){
            this.thisChoose[type].text = option.text;
          }
        });
      },
      //Tìm kiếm ở ô input so với các option ở combobox
      searchOption(type){
        this.listOptions[type] = this.initialListOptions[type].filter(option => {
            return (
                option.text.toLowerCase().includes(this.thisChoose[type].text.toLowerCase())
            )
        });
      },


      /**
       * Hàm gọi đến API để xử lý việc sắp xếp và nhóm phòng ban
       * CreateBy: VDDong
       * */
      sortsBy(){
        console.log("sort all: " + this.thisChoose.Sort.id);
        console.log("sort group: " + this.thisChoose.Group.id);

        this.formPagingSort = true; //chuyển sang trạng thái paging theo sắp xếp và nhóm
        if(this.thisChoose.Group.id == null) this.thisChoose.Group.id = ""; //nếu không chọn sắp xếp hay phòng ban thì đưa về "" cho phù hợp API
        var urlAPI = ""; //api để request trả về danh sách dữ liệu sắp xếp
        if(this.thisChoose.Sort.id == null || this.thisChoose.Sort.id == 1){ //mặc định hoặc sắp xếp thứ tự thêm mới (là sortByCode)
          urlAPI = (Resources.API.SortByCode + "pageSize=" + this.perPage + "&pageIndex=" + this.currentPage + "&groupString=" + this.thisChoose.Group.id);
        }
        else if(this.thisChoose.Sort.id == 2){ //sắp xếp theo tên nhân viên
          urlAPI = (Resources.API.SortByName + "pageSize=" + this.perPage + "&pageIndex=" + this.currentPage + "&groupString=" + this.thisChoose.Group.id);
        }
        //call api
        axios
          .get(urlAPI)
          .then((res) => {
            console.log(res);
            this.teacherNumber = res.data.totalRecord;
            this.teachers = res.data.data;
            if(this.teacherNumber % this.perPage == 0){
              this.totalPage = this.teacherNumber / this.perPage;
            }
            else {
              this.totalPage = Math.floor(this.teacherNumber / this.perPage) + 1;
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
            .delete(Resources.API.GetAll + "/" + newChecked[i])
            .then(() => {
              console.log(Resources.Notice.DeleteSuccess);
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
        this.refreshCombobox();

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
        return alert(Resources.Notice.IncorrecExcelFile);
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
          return alert(Resources.Notice.ReadExcelFileFail);
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
        //Tạo teacher mới để thêm lần lượt
        //File excel phải định dạng tiêu đề từng cột không dấu không cách như đặt tên biến thì mới chuyển thành thuộc tính teacher được
        var newTeacher = {};
        newTeacher.teacherCode = this.listRecordsExcel[i].Ma_NV;
        newTeacher.teacherName = this.listRecordsExcel[i].Ten_NV;
        newTeacher.gender = this.formatGenderFromExcelToDB(this.listRecordsExcel[i].Gioi_tinh);
        newTeacher.dateOfBirth = this.formatDobFromExcelToDB(this.listRecordsExcel[i].Ngay_sinh);
        newTeacher.jobTitle = this.listRecordsExcel[i].Chuc_danh;
        newTeacher.groupId = this.formatGroupFromExcelToDB(this.listRecordsExcel[i].Don_vi);
        newTeacher.bankAccount = this.listRecordsExcel[i].STK;
        newTeacher.bankName = this.listRecordsExcel[i].Ten_ngan_hang;
        console.log(newTeacher);
        //Gọi API thêm từng newTeacher vào database
      await  axios
          .post(Resources.API.GetAll + "/", newTeacher)
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
    //Hàm format tên đơn vị từ file excel sang groupId để thêm vào DB
    formatGroupFromExcelToDB(groupName){
      if(groupName == Enums.Group.VP) return Enums.Group.VPId;
      else if(groupName == Enums.Group.LH) return Enums.Group.LHId
      else if(groupName == Enums.Group.TT) return Enums.Group.TTId
      else if(groupName == Enums.Group.SSD) return Enums.Group.SSDId
      else if(groupName == Enums.Group.NV) return Enums.Group.NVId
      else if(groupName == Enums.Group.AV) return Enums.Group.AVId
    },
    //Hàm format gender name từ file excel sang dạng int để thêm vào DB
    formatGenderFromExcelToDB(genderName){
      if(genderName == Enums.Gender.Female) return Enums.Gender.FemaleId;
      else if(genderName == Enums.Gender.Male) return Enums.Gender.MaleId;
      else if(genderName == Enums.Gender.Rest) return Enums.Gender.RestId;
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

    //format tổ chuyên môn
    groupFormatToTable(groupId){
      if(groupId == Enums.Group.VPId) return Enums.Group.VP;
      else if(groupId == Enums.Group.LHId) return Enums.Group.LH;
      else if(groupId == Enums.Group.TTId) return Enums.Group.TT;
      else if(groupId == Enums.Group.SSDId) return Enums.Group.SSD;
      else if(groupId == Enums.Group.NVId) return Enums.Group.NV;
      else if(groupId == Enums.Group.AVId) return Enums.Group.AV;
    }

  }, //End Filters

  computed: {
      /**
       * Tích tất cả các checkbox
       * CreatedBy: VDDong(14/06/2021)
       */
      checkAll: {
        get: function() {
          return this.initialTeachers ? this.checked.length == this.teacherNumber : false;
        },
        set: function(value) {
          var checked = []; //mảng checked tạm thời, lưu trữ những bản ghi được tích checkbox
          if(value) {
            this.initialTeachers.forEach(function (teacher) {
              checked.push(teacher.teacherId); //đưa các bản ghi tích checkbox vào mảng checked tạm
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
      console.log("Number records of checked: " + this.checked.length);
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
  height: 60px;
  width: 100%;
}
#sort-and-group{
  height: 60px;
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
  height: 60px;
  /* background-color: aqua; */
  display: flex;
  align-items: center;
  position: absolute;
  right: 36px;
}
.search-bar-and-icon {
  border-radius: 2px;
  box-sizing: border-box;
  width: 332px;
  display: flex;
  align-items: center;
  border: 1px solid #babec5;
  border-collapse: collapse;
  margin-bottom: 20px;
}
.search-bar-and-icon:focus-within {
  border: 1px solid #2ca01c;
}
#search-bar {
  width: 299px;
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
#total-data{
  display: flex;
  align-items: center;
  position: absolute;
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

/* Dấu tích ở table */
.tickbox::before
  {
    display: block;
    content: "";
    width: 16px;
    height: 16px;
    background: url('../../../assets/img/Sprites.64af8f61.svg');
    background-position: -1224px -360px;
    margin-left: 30px;

  }
  /* .tickbox::before
  {
      display: block;
  } */

</style>