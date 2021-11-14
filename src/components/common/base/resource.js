const Resource = {

    API: {
        GetAll: "https://localhost:44342/api/v1/Employees",
        GetMaxCode: "https://localhost:44342/api/v1/Employees/MaxCode",
        GetExport: "https://localhost:44342/api/v1/Employees/Export",
        GetDepartments: "https://localhost:44342/api/v1/Employees/Department",
        GetFilter: "https://localhost:44342/api/v1/Employees/Filter?",
        SortByCode: "https://localhost:44342/api/v1/Employees/SortByCode?",
        SortByName: "https://localhost:44342/api/v1/Employees/SortByName?",
        GetAllBankEmp: "https://localhost:44342/api/v1/BankEmp/",
        GetBankEmpByUserId: "https://localhost:44342/api/v1/Employees/GetAllBankEmpByUserId/",
        GetEmployeeIdByEmployeeCode: "https://localhost:44342/api/v1/Employees/GetEmployeeByEmployeeCode/",

    },

    Notice: {
        DeleteSuccess: "Xóa thành công!",
        IncorrecExcelFile: "Không đúng định dạng file. Vui lòng tải lên file excel!",
        ReadExcelFileFail: "Đọc file không thành công!",

    },

    ErrorMessage: {
        InvalidDepartment: "Tên đơn vị không tồn tại trong hệ thống, vui lòng kiểm tra lại.",
        NullFullName: "Tên không được để trống.",
        NullEmployeeCode: "Mã nhân viên không được để trống.",
        NullDepartment: "Tên đơn vị không được để trống.",
        DataChange: "Dữ liệu đã bị thay đổi. Bạn có muốn cất không?",
        DateIdentityAndDobError: "Ngày cấp số CMND không được phép trước ngày sinh.",
    },

    Property: {
        FullName: "fullName",
        EmployeeCode: "employeeCode",
        DepartmentName: "departmentName",

    },

    MsgFromServer: {
        EmployeeCode: "Mã nhân viên",
        Phone: "ĐT di động",
        TelePhone: "ĐT cố định",
        Email: "Email",
    },



};

export default Resource;