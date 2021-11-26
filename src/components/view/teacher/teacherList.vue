<template>
    <div id="router">
        <div id="router-content">

          <!-- Thanh tìm kiếm và các button chức năng thêm, xuất -->
            <div id="title-bar">
                <!-- Thanh tìm kiếm  -->
                <div class="search-bar-and-icon">
                    <input
                    id="search-bar"
                    type="text"
                    placeholder="Tìm theo mã, tên cán bộ"
                    v-model="message"
                    @keyup="searchData()"
                    autocomplete="off"
                    />
                    <button id="search-icon"></button>
                </div>
                <!-- Các button chức năng thêm, xuất -->
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
                      Xuất khẩu
                  </button>
                  <label class="btn-add-excel primary-color" id="btn-addFromExcel">
                    <i class="fas fa-table"></i>
                    <input type="file" id="uploadExcel" @change="importFileExcel"/>
                    Nhập khẩu
                  </label>
                </div>
            </div> <!-- End titlebar -->

            <!-- Sắp xếp dữ liệu, table hiển thị, footer -->
            <div id="tablewrapper">
                <div id="table">
                   <!-- Sắp xếp, nhóm dữ liệu -->
                    <div id="search">
                        <!-- Sắp xếp nhóm -->
                        <div id="sort-and-group">
                          <div class="sortBar">
                            <DropDown
                              :typeDropdown="SortType"  
                              :options="listOptions.Sort"
                              :initialOptions="initialListOptions.Sort"
                              @solveOnParent="solveDropdown" 
                              ref="dropDownSort">
                            </DropDown>
                          </div>
                          <div class="groupBar">
                            <DropDown
                              :typeDropdown="GroupType"  
                              :options="listOptions.Group"
                              :initialOptions="initialListOptions.Group"
                              @solveOnParent="solveDropdown" 
                              ref="dropDownGroup">
                            </DropDown>
                          </div>
                        </div>
                        <!-- Button refresh -->
                        <div id="search-bar-wrapper">
                            <div id="btn-refresh-wrapper">
                                <button id="btn-refresh" @click="refreshData()"></button>        
                            </div>
                        </div>
                    </div>
                    <!-- Table hiện thị dữ liệu -->
                    <div class="data">
                        <div class="scroll">
                          <!-- Table chính hiển thị dữ liệu -->
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
                                    <tr v-for="teacher in teachers" :key="teacher.teacherId" @dblclick="showTeacherDetail(teacher.teacherId)"
                                        @click="idTeacherSelected = teacher.teacherId"
                                        :class="{
                                          'selected-teacher-record':
                                            teacher.teacherId == idTeacherSelected,
                                        }"
                                    >
                                        <td>
                                            <input
                                                type="checkbox"
                                                v-model="checked"
                                                :value="teacher.teacherId"
                                            />
                                        </td>
                                        <td>{{ teacher.teacherCode }}</td>
                                        <td style="text-transform: capitalize; color: #0997EB">{{ teacher.teacherName }}</td>
                                        <td>{{ teacher.teacherPhone }}</td>
                                        <td>{{ teacher.teacherGroup | groupFormatToTable }}</td>
                                        <td>{{ teacher.teacherSubject | formatDisplayList }}</td>
                                        <td>{{ teacher.teacherRoom | formatDisplayList }}</td>
                                        <td :class="{'tickbox': teacher.teacherQltb == 1}"></td>
                                        <td :class="{'tickbox': teacher.teacherStatus == 1}"></td>
                                    </tr>
                                </tbody>
                            </table>
                            <!-- Table hiện thị các chức năng sửa, xóa, nhân bản -->
                            <table class="table1" style="position: sticky; z-index: 3; right: 0; border: 0">
                                <thead>
                                    <tr style="border-top: 0px solid #ccc">
                                        <th style="min-width: 100px; position: sticky; top: 0px; text-align: center;"></th>
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
                    <!-- Footer paging -->
                    <div id="footer">
                        <!-- Phân trang -->
                        <div id="total-data">
                          <div id="footer-3">
                            <Paging
                                :totalPages="totalPage"
                                :perPage="perPage"
                                :page="currentPage"
                                @onChangePage="onPageChange"
                            />
                          </div>
                          (<b style="margin-right: 4px;">{{this.teacherNumber}}</b>giáo viên)
                        </div>
                        <!-- Combobox lựa chọn số bản ghi / trang -->
                        <div id="footer-right">                          
                            <div id="footer-2">
                                <ComboBox @setPerPage="handlePerPage" ref="comboBox" />
                            </div>                
                        </div>
                    </div> <!-- End footer -->
                </div> 
            </div> <!-- End tablewrapper -->

        </div> <!-- End content -->

        <!-- Dialog chi tiết thêm, sửa -->
        <TeacherDetail 
            v-if="isShowDialogTeacher"
            @hideDialog="hideDialog"
            :teacher="selectedTeacher"
            :formmode="formmode"
            @showTeacherDialog="showTeacherDialog"
            @turnPopUpSuccess="showPopupSuccess"
            @turnPopUpWarning="showPopupWarning"
        />

        <!-- Dialog xác nhận xóa đơn -->
        <TeacherDelete
          :isShow="isShowDialogDelete"
          @hideDialog="hideDialog"
          :teacher="selectedTeacher"
          @turnPopUpSuccess="showPopupSuccess"
          @turnPopUpWarning="showPopupWarning"
        />

        <!-- Popup cảnh báo lỗi -->
        <ErrorPopUp 
          :isShow="isErrorPopUpShow"
          :errorMsg="errorMsg"
          @hidePopUp="hidePopUp"
        />  

        <!-- Popup xác nhận thêm từ file excel -->
        <AddFromExcelPopUp 
          :isShow="isShowPopUpAddFromExcel"
          :errorMsg="errorMsg"
          @hidePopUp="hidePopUp"
          @confirmAddFromExcel="addFromExcel"
        />

        <!-- Popup xác nhận xóa nhiều -->
        <ConfirmDeleteMultiplePopUp
          :isShow="isShowPopUpConfirmMultipleDelete"
          :errorMsg="errorMsg"
          @hidePopUp="hidePopUp"
          @confirmDeleteMultiple="deleteMultiple"
        />

        <!-- Popup warning 3s -->
        <WarningPopUp 
          :isShow="isShowWarningPopup"
          :warningMsg="warningMsg"
        />
        <!-- Popup success 3s -->
        <SuccessPopUp
          :isShow="isShowSuccessPopup"
          :warningMsg="warningMsg"
        />

        <!--Loading -->
        <div class="fa-3x" v-if="isBusy">
            <!--font awesome -->
            <i class="fas fa-spinner fa-spin" style="color: green"></i>
        </div>

    </div>
</template>


<script>

//import
import axios from  "axios";
import Option from "../../common/BaseOption.vue";
import ComboBox from "../../common/BaseComboBox.vue";
import Paging from "../../common/BasePaging.vue";
import TeacherDetail from "./TeacherDetail.vue";
import TeacherDelete from "./TeacherDelete.vue";
import ErrorPopUp from '../../common/pop-up/errorPopUp.vue';
import AddFromExcelPopUp from './TeacherAddFromExcel.vue';
import ConfirmDeleteMultiplePopUp from './TeacherConfirmMultipleDelete.vue';
import DropDown from "../../common/BaseDropdown.vue";
import xlsx from 'xlsx';

import WarningPopUp from '../../common/pop-up/warningPopup.vue';
import SuccessPopUp from '../../common/pop-up/successPopup.vue';

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
      DropDown,

      WarningPopUp,
      SuccessPopUp,
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
              ],
            },
            initialListOptions: {
              Sort: [
                {id: Enums.TypeSort.CodeId, text: Enums.TypeSort.Code},
                {id: Enums.TypeSort.NameId, text: Enums.TypeSort.Name},
              ],
              Group: [
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

            //Biến ẩn hiện warning popup, success popup
            isShowWarningPopup: false,
            isShowSuccessPopup: false,
            warningMsg: "",

            //Biến truyền sang component dropdown để phân biệt loại dropdown
            SortType: "Sort",
            GroupType: "Group",

            idTeacherSelected: "",

      }
  }, //End Data

  created() {

      /**
       * Lấy dữ liệu từ database để build table và phân trang
       * CreatedBy: VDDong (19/11/2021)
       */
      this.currentPage = 1;
      this.perPage = 20;
      this.message = "";
      axios
        .get(
            Resources.API.GetFilter + Resources.PartNotice.PageSize + this.perPage + "&" + Resources.PartNotice.PageIndex + this.currentPage + "&" + Resources.PartNotice.Filter + this.message
        )
        .then((res) => {
            // console.log(res);
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

        //Truyền dữ liệu (động) vào listOptions.Group
        axios.get(Resources.API.GetGroups)
        .then((res) => {
          this.listOptions.Group = this.listOptions.Group.concat(
            (res.data || []).map((item) => {
              return {
                id: item.groupId,
                text: item.groupName,
              }
            })
          )
        })
        .catch((res) => {
          console.log(res);
        })

    
  }, //End Created

  mounted: function() {},

  methods: {
      /**
       * Lấy tất cả dữ liệu từ API
       * CreatedBy: VDDong (19/11/2021)
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
       * CreatedBy: VDDong (19/11/2021)
       */
      loadData(){
          this.isBusy = true;
          this.message  = "";
          axios
        .get(
            Resources.API.GetFilter + Resources.PartNotice.PageSize + this.perPage + "&" + Resources.PartNotice.PageIndex + this.currentPage + "&" + Resources.PartNotice.Filter + this.message
        )
        .then((res) => {
            // console.log(res);
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
     * CreatedBy: VDDong (19/11/2021)
     */
    refreshData(){
      //setup default combobox sort
      this.refreshCombobox();
      //setup default checkbox
      this.checked = [];
      this.idTeacherSelected = "";
      this.currentPage = 1;
      this.perPage = 20;
      this.loadData();
      //set up mặc định cho combobox là lựa 20 bản ghi trên trang
      this.$refs.comboBox.resetPerPage(); //hàm resetPerPage là hàm viết bên file comboBox.vue
      //reset lại dropdown sắp xếp, nhóm tổ
      this.$refs.dropDownSort.resetChoose();
      this.$refs.dropDownGroup.resetChoose();
    },

    /**
     * Hàm refresh combobox
     * CreatedBy: VDDong (19/11/2021)
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
      this.$refs.dropDownSort.resetChoose();
      this.$refs.dropDownGroup.resetChoose();
    },

    /**
     * Show popup báo thành công, thất bại (popup 3s)
     * CreatedBy: VDDong (19/11/2021)
     */
    showPopupSuccess(msg){
      // console.log('show puss')
      this.warningMsg = msg;
      this.isShowSuccessPopup = true;
      setTimeout(() => this.isShowSuccessPopup = false, 4000);
    },
    showPopupWarning(msg){
      // console.log('show warn')
      this.warningMsg = msg;
      this.isShowWarningPopup = true;
      setTimeout(() => this.isShowWarningPopup = false, 4000);
    },
    
    /**
     * Cụm hàm đóng / mở dialog
     * CreatedBy: VDDong (19/11/2021)
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
                this.selectedTeacher.teacherStatus = 1;
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
        // console.log(index);
        if (index > -1) {
          this.checked.splice(index, 1); //xóa bản ghi đó trong mảng checked đi là mảng checked sẽ không lưu nó nữa, tránh bug trên
        }
        // console.log(this.checked);
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
      //ẩn dialog thêm và xóa
      hideDialog(){
        this.isShowDialogTeacher = false;
        this.isShowDialogDelete = false;
        this.isShowDialogStopUsing = false;
        this.loadData();
      },

      /**
       * Tìm kiếm theo mã hoặc tên nhân viên
       * CreatedBy: VDDong (19/11/2021)
       */
      searchData(){
        //Vì chưa kết hợp vừa tìm kiếm vừa sắp xếp (nhóm phòng ban) nên khi tìm kiếm thì setup default 2 combobox sắp xếp vs nhóm
        this.refreshCombobox();

        //Bắt đầu tìm kiếm
        this.currentPage = 1;
        axios
          .get(
            Resources.API.GetFilter + Resources.PartNotice.PageSize + this.perPage + "&" + Resources.PartNotice.PageIndex + this.currentPage + "&" + Resources.PartNotice.Filter + this.message
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

      /**
       * Format tên tổ chuyên môn để chuyển sang dialog chi tiết
       * CreatedBy: VDDong (19/11/2021)
       * */
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
       * CreatedBy: VDDong (19/11/2021)
       */
      exportData(){
        window.open(Resources.API.GetExport);
      },

      /**
       * Thay đổi số trang, thay đổi currentPage (Paging)
       * CreatedBy: VDDong (19/11/2021)
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
            this.isBusy = true;
            axios
              .get(
                  Resources.API.GetFilter + Resources.PartNotice.PageSize + this.perPage + "&" + Resources.PartNotice.PageIndex + this.currentPage + "&" + Resources.PartNotice.Filter + this.message
              )
              .then((res) => {
                // console.log(res);
                this.teachers = res.data.data;

                //format group
                this.groupsFormat(this.teachers);
                //Số lượng bản ghi hợp lệ 
                this.teacherNumber = res.data.totalRecord;

                this.isBusy = false;
              })
              .catch((res) => {
                  console.log(res);
              });
          }
        }
      },

      /**
       * Xử lí việc chọn số bản ghi trên 1 trang (Combobox)
       * info là số lượng bản trên 1 trang truyền từ comboBox lên
       * CreatedBy: VDDong (19/11/2021)
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
       * Nhận dữ liệu đã chọn từ bên dropdown
       * Sau đó gọi hàm sortsBy để sắp xếp
       * CreatedBy: VDDong (19/11/2021)
       */
      solveDropdown(valueFromChild, type){
        //chưa kết hợp tìm kiếm vs sắp xếp và nhóm nên cần reset lại input tìm kiếm
        this.message = "";
        // this.sortsBy();
        this.thisChoose[type].id = valueFromChild;
        // console.log(this.thisChoose[type].id);
        this.sortsBy();
      },

      /**
       * Hàm gọi đến API để xử lý việc sắp xếp và nhóm phòng ban
       * CreatedBy: VDDong (19/11/2021)
       * */
      sortsBy(){
        // console.log("sort all: " + this.thisChoose.Sort.id);
        // console.log("sort group: " + this.thisChoose.Group.id);

        this.formPagingSort = true; //chuyển sang trạng thái paging theo sắp xếp và nhóm
        if(this.thisChoose.Group.id == null) this.thisChoose.Group.id = ""; //nếu không chọn sắp xếp hay phòng ban thì đưa về "" cho phù hợp API
        var urlAPI = ""; //api để request trả về danh sách dữ liệu sắp xếp
        if(this.thisChoose.Sort.id == null || this.thisChoose.Sort.id == 1){ //mặc định hoặc sắp xếp thứ tự thêm mới (là sortByCode)
          urlAPI = (Resources.API.SortByCode + Resources.PartNotice.PageSize + this.perPage + "&" + Resources.PartNotice.PageIndex + this.currentPage + "&" + Resources.PartNotice.GroupString + this.thisChoose.Group.id);
        }
        else if(this.thisChoose.Sort.id == 2){ //sắp xếp theo tên nhân viên
          urlAPI = (Resources.API.SortByName + Resources.PartNotice.PageSize + this.perPage + "&" + Resources.PartNotice.PageIndex + this.currentPage + "&" + Resources.PartNotice.GroupString + this.thisChoose.Group.id);
        }
        //call api
        this.isBusy = true;
        axios
          .get(urlAPI)
          .then((res) => {
            // console.log(res);
            this.teacherNumber = res.data.totalRecord;
            this.teachers = res.data.data;
            if(this.teacherNumber % this.perPage == 0){
              this.totalPage = this.teacherNumber / this.perPage;
            }
            else {
              this.totalPage = Math.floor(this.teacherNumber / this.perPage) + 1;
            }
            this.isBusy = false;
          })
          .catch((res) => {
            console.log(res);
          })

      },

      /**
       * Cụm hàm xóa hàng loạt nhiều bản ghi một lúc
       * Xóa các bản ghi có tích checkbox, xóa theo id các bản ghi được lưu trong mảng checked
       * CreatedBy: VDDong (19/11/2021)
       */
      //Hàm bật popup xác nhận xóa
      showConfirmDeleteMultiple(){
        this.isShowPopUpConfirmMultipleDelete = true;
        this.errorMsg = Resources.PartNotice.Delete + this.checked.length + Resources.PartNotice.RecordChoose;
      },

      /**
       * Hàm thực thi xóa nhiều
       * CreatedBy: VDDong (19/11/2021)
       * */
      deleteMultiple(){
        // console.log("multiple delete");
        var newChecked = this.checked;
        var arrIds = newChecked.toString().split(",");
        var stringIds = "";
        for(let i=0; i<arrIds.length - 1; i++){
          stringIds += (arrIds[i] + Resources.PartNotice.Comma);
        }
        stringIds += arrIds[arrIds.length - 1];

        var recordIds = Resources.PartNotice.OpenBrackets + stringIds + Resources.PartNotice.CloseBrackets;
        // console.log(recordIds);
        axios
          .delete(Resources.API.DeleteMultiple + recordIds)
          .then((res) => {
            console.log(res.status);
            this.hideDialog();
          })
          .catch((res) => {
            console.log(res);
          })

        this.checked = [];
        //hiện popup 3s báo số bản ghi đã xóa
        var msg = Resources.PartNotice.YourDelete + newChecked.length + Resources.PartNotice.TeacherRecord;
        this.showPopupSuccess(msg);
        this.hidePopUp();
        //reset lại combobox (trong trường hợp sắp xếp, nhóm rồi xóa)
        this.refreshCombobox();

      },

      /**
       * Tắt thông báo đã thêm từ file excel, xác nhận thêm từ file excel, xác nhận xóa nhiều
       * CreatedBy: VDDong (19/11/2021)
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
     * Cụm hàm liên quan đến thêm từ file excel
    * Đọc file từ file excel bên ngoài
    * CreatedBy: VDDong (19/11/2021)
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
      // console.log(files);
      var fileName = files[0].name; //lấy tên file
      if (!files.length) {
        return ;
      } else if (!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())) { //Nếu file không đúng định dạng
        // return alert(Resources.Notice.IncorrecExcelFile);
        return this.showPopupWarning(Resources.Notice.IncorrecExcelFile);
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
          this.errorMsg = Resources.PartNotice.ConfirmAdd + this.listRecordsExcel.length + Resources.PartNotice.RecordFromExcel + fileName; //muốn hiện cả số bản ghi từ file với tên file nhưng chưa làm được
          // console.log(this.listRecordsExcel);
          console.log("Read results", excellist); // At this point, you get an array containing objects that need to be processed
          // Get header2-1
          const a = workbook.Sheets[workbook.SheetNames[0]];
          const headers = this.getHeader(a);
          console.log('headers', headers);
          // Get header2-2
        } catch (e) {
          // return alert(Resources.Notice.ReadExcelFileFail);
          return this.showPopupWarning(Resources.Notice.ReadExcelFileFail);
        }
      };
      fileReader.readAsBinaryString(files[0]);
      //setup lại input file thành bình thường
      var input = document.getElementById("uploadExcel");
      input.value = "";

    },

    /**
     * Xử lý thêm các bản ghi vừa lấy từ file excel (đang lưu ở listRecordsExcel) lên database
     * CreatedBy: VDDong (19/11/2021)
     */
  async  addFromExcel(){
    this.hidePopUp(); //đóng popup xác nhận thêm x bản ghi từ file excel
      // console.log("Xác nhận thêm từ file excel");
      var countAddSuccess = 0; //biến đếm xem đã thêm thành công bao nhiêu bản ghi
      var listRecordsAddFail = []; //mảng lưu trữ những mã nhân viên add không thành công
      for(let i=0; i<this.listRecordsExcel.length; i++){
        //Tạo teacher mới để thêm lần lượt
        //File excel phải định dạng tiêu đề từng cột không dấu không cách như đặt tên biến thì mới chuyển thành thuộc tính teacher được
        var newTeacher = {};
        newTeacher.teacherCode = this.listRecordsExcel[i].SHCB;
        newTeacher.teacherName = this.listRecordsExcel[i].Ho_va_ten;
        newTeacher.teacherPhone = this.listRecordsExcel[i].So_dien_thoai;
        newTeacher.teacherGroup = this.formatGroupFromExcelToDB(this.listRecordsExcel[i].To_chuyen_mon);
        newTeacher.teacherSubject = this.listRecordsExcel[i].QLTB_mon;
        newTeacher.teacherRoom = this.listRecordsExcel[i].QL_kho_phong;
        newTeacher.teacherQltb = this.formatStatusFromExcelToDB(this.listRecordsExcel[i].Dao_tao_QLTB);
        newTeacher.teacherStatus = this.formatStatusFromExcelToDB(this.listRecordsExcel[i].Dang_lam_viec);
        // console.log(newTeacher);
        //Gọi API thêm từng newTeacher vào database
      await  axios
          .post(Resources.API.GetAll + "/", newTeacher)
          .then((res) => {
            console.log(res);
            countAddSuccess++;
            this.loadData();
          })
          .catch((res) => {
            // console.log(res.response);
            var errorFromBackend = res.response.data.devMsg;
            listRecordsAddFail.push(errorFromBackend.substring(9, 17));
            console.log("Error from backend: " + errorFromBackend);
          })
      }
      //hiện popup báo số bản ghi đã thêm thành công, không thành công (làm 2 trong 1 luôn)
      // this.isErrorPopUpShow = true;
      this.isErrorPopUpShow = true;
      this.errorMsg = Resources.PartNotice.AddSuccess + countAddSuccess + Resources.PartNotice.Record 
                      + Resources.PartNotice.AddFail + listRecordsAddFail.toString();

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
    //Hàm format tên tổ từ file excel sang groupId để thêm vào DB
    formatGroupFromExcelToDB(groupName){
      if(groupName == Enums.Group.VP) return Enums.Group.VPId;
      else if(groupName == Enums.Group.LH) return Enums.Group.LHId
      else if(groupName == Enums.Group.TT) return Enums.Group.TTId
      else if(groupName == Enums.Group.SSD) return Enums.Group.SSDId
      else if(groupName == Enums.Group.NV) return Enums.Group.NVId
      else if(groupName == Enums.Group.AV) return Enums.Group.AVId
    },
    //Hàm format teacherQltb và teacherStatus từ file excel sang dạng int để thêm vào DB
    formatStatusFromExcelToDB(excelValue){
      if(excelValue == Enums.Value.Yes) return Enums.Value.YesInt;
      else return Enums.Value.NoInt;
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
    },

    //định dạng lại hiển thị list môn, phòng
    formatDisplayList(listValue){
      if(listValue != null){
        var arr =  listValue.split(",").toString();
        var res = arr.replace(/,/g, ", ");
        return res;
      }
    }

  }, //End Filters

  computed: {
      /**
       * Tích tất cả các checkbox
       * CreatedBy: VDDong (19/11/2021)
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
     * CreatedBy: VDDong (19/11/2021)
     */
    checked: function() {
      // console.log("Number records of checked: " + this.checked.length);
      // console.log(this.checked);
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

/* Content */
#router-content {
  position: absolute;
  top: 48px;
  left: 178px;
  box-sizing: border-box;
  display: inline-block;
  background: rgb(244, 245, 246);
  width: calc(100% - 171px);
  height: calc(100% - 48px);
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
  }
    .title {
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

/* Phần nội dung sắp xếp, nhóm và table */
#tablewrapper {
  background: #fff;
  color: #111;
  height: calc(100% - 24px);
  width: 100%;
  overflow: hidden;
  padding-bottom: 24px;
  box-sizing: border-box;
  border-collapse: collapse;
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
      border: 1px solid #03AE66;
    }
      #search-bar {
        width: 299px;
        height: 31px;
        font-size: 13px;
        outline: none;
        border: none;
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
    }

tbody tr:hover {
  background-color: #E5F3FF;
}

/* Phần Footer */
#footer {
  position: absolute;
  bottom: 30px;
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
    right: 5px;
  }
  #total-data{
    display: flex;
    align-items: center;
    position: absolute;
  }

/* Phần loading */
.fa-3x {
  position: absolute;
  left: 54%;
  top: 50%;
  transform: translate(-50%, -50%);
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

/* Click dòng nào thì đổi màu dòng đó */
/* .selected-teacher-record{
    background-color: #CCE8FF;
} */


</style>