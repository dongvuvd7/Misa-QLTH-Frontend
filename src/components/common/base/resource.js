const Resource = {

    API: {
        GetAll: "https://localhost:44342/api/v1/Teachers",
        GetMaxCode: "https://localhost:44342/api/v1/Teachers/MaxCode",
        GetExport: "https://localhost:44342/api/v1/Teachers/Export",
        GetGroups: "https://localhost:44342/api/v1/Teachers/Group",
        GetFilter: "https://localhost:44342/api/v1/Teachers/Filter?",
        SortByCode: "https://localhost:44342/api/v1/Teachers/CodeDecrease?",
        SortByName: "https://localhost:44342/api/v1/Teachers/NameAnphabe?",
        DeleteMultiple: "https://localhost:44342/api/v1/Teachers/MultipleDelete/",
        GetRooms: "https://localhost:44342/api/v1/Rooms",
        GetSubjects: "https://localhost:44342/api/v1/Subjects",
    },

    Notice: {
        DeleteSuccess: "Xóa thành công!",
        DeleteFail: "Xóa thất bại!",
        IncorrecExcelFile: "Không đúng định dạng file. Vui lòng tải lên file excel!",
        ReadExcelFileFail: "Đọc file không thành công!",
        AddSuccess: "Thêm thành công!",
        EditSuccess: "Sửa thành công!",

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
        TeacherCode: "Mã cán bộ",
        Phone: "Số điện thoại",
        Email: "Email",
    },

    PartNotice: {
        PageSize: "pageSize=",
        PageIndex: "pageIndex=",
        Filter: "filter=",
        GroupString: "groupString=",
        Delete: "Xóa ",
        RecordChoose: " bản ghi đã chọn?",
        YourDelete: "Bạn đã xóa ",
        TeacherRecord: " bản ghi cán bộ giáo viên!",
        ConfirmAdd: "Xác nhận thêm ",
        RecordFromExcel: " bản ghi từ file excel ",
        AddSuccess: "Bạn đã thêm thành công ",
        Record: " bản ghi. ",
        AddFail: "Thêm không thành công các bản ghi: ",
        Teacher: "teacher",
        Name: "Name",
        Comma: "%27%2C%27",
        OpenBrackets: "%28%27",
        CloseBrackets: "%27%29",
    },

    Regexs: {
        Email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        Phone: /^\d+$/,
    },

    DropdownTitle: {
        SortName: "Sort",
        SortPlacehoder: "Lựa chọn sắp xếp",
        GroupName: "Group",
        GroupPlacehoder: "Nhóm tổ chuyên môn",
    }



};

export default Resource;