const Resource = {

    API: {
        GetAll: "https://localhost:44342/api/v1/Teachers",
        GetMaxCode: "https://localhost:44342/api/v1/Teachers/MaxCode",
        GetExport: "https://localhost:44342/api/v1/Teachers/Export",
        GetGroups: "https://localhost:44342/api/v1/Teachers/Group",
        GetFilter: "https://localhost:44342/api/v1/Teachers/Filter?",
        SortByCode: "https://localhost:44342/api/v1/Teachers/SortByCode?",
        SortByName: "https://localhost:44342/api/v1/Teachers/SortByName?",

    },

    Notice: {
        DeleteSuccess: "Xóa thành công!",
        IncorrecExcelFile: "Không đúng định dạng file. Vui lòng tải lên file excel!",
        ReadExcelFileFail: "Đọc file không thành công!",

    },

    ErrorMessage: {
        InvalidGroup: "Tên tổ chuyên môn không tồn tại trong hệ thống, vui lòng kiểm tra lại!",
        NullFullName: "Tên không được để trống!",
        NullTeacherCode: "Mã giáo viên không được để trống!",
        NullGroup: "Tên tổ chuyên môn không được để trống!",
        DataChange: "Dữ liệu đã bị thay đổi, bạn có muốn lưu lại không?",
        DateIdentityAndDobError: "Ngày cấp số CMND không được phép trước ngày sinh!",
        StopdayAndToday: "Ngày nghỉ việc không được lớn hơn ngày hiện tại!",
    },

    Property: {
        FullName: "teacherName",
        TeacherCode: "teacherCode",
        GroupName: "teacherGroupName",

    },

    MsgFromServer: {
        TeacherCode: "Mã nhân viên",
        Phone: "ĐT di động",
        TelePhone: "ĐT cố định",
        Email: "Email",
    },



};

export default Resource;