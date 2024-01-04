import { useState } from "react";
import { Button, Modal, message, Upload, Input } from "antd";
import { createNewProfile, saveFileBackEnd } from "../../services/axios";
import { UploadOutlined } from "@ant-design/icons";
import "./style.css";

const ModalAddNewProfile = () => {
  const [open, setOpen] = useState(false);
  const [profileName, setProfileName] = useState("");

  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("profileName", profileName);
    formData.append("files", fileList[0]);
    setUploading(true);
    const responseDB = await createNewProfile(profileName, fileList[0].name);
    const responseServer = await saveFileBackEnd(formData);
    if (responseServer.status === "success") {
      message.open({
        type: "success",
        content: "Upload file thành công",
      });
    } else {
      message.open({
        type: "error",
        content: "Lỗi Upload file thất bại",
      });
    }
    if (responseDB.status === "success") {
      setOpen(false);
    }
  };

  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Add new profile
      </Button>
      <Modal
        title="Add new profile"
        centered
        open={open}
        width={500}
        footer={null}
      >
        <div className="homepage_modal_input">
          <div className="homepage_modal_input_name">
            <p>Name profile: </p>
            <Input
              placeholder="Input name profile"
              value={profileName} // Gán giá trị của input tên profile từ state
              onChange={(e) => setProfileName(e.target.value)} // Cập nhật giá trị khi có sự thay đổi
            />
          </div>
          
          <div className="homepage_modal_input_file">
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
          </div>
          <div className="homepage_modal_btn">
            <Button
              onClick={() => {
                setOpen(false);
              }}
              style={{
                marginTop: 16,
              }}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              onClick={handleUpload}
              disabled={fileList.length === 0}
              loading={uploading}
              style={{
                marginTop: 16,
              }}
            >
              {uploading ? "Uploading" : "Start Upload"}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default ModalAddNewProfile;
