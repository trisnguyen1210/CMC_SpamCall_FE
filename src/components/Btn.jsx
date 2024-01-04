import { Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import * as XLSX from "xlsx";

const ExcelUpload = () => {
  const beforeUpload = (file) => {
    const isXlsx =
      file.type ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    if (!isXlsx) {
      message.error("Chỉ chấp nhận file xlsx!");
    }
    return isXlsx;
  };

  const handleUpload = (info) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const readWorkbookData = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      // Lấy dữ liệu từ workbook
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

      // Console.log dữ liệu
      console.log("Dữ liệu từ workbook:", jsonData);
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <Upload
      customRequest={({ file, onSuccess, onError }) => {
        readWorkbookData(file);
        onSuccess();
      }}
      showUploadList={false}
      beforeUpload={beforeUpload}
      onChange={handleUpload}
    >
      <Button icon={<UploadOutlined />}>Upload Excel</Button>
    </Upload>
  );
};

export default ExcelUpload;
