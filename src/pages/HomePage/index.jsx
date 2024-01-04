import { Button } from "antd";
import "./style.css";
import TableFile from "../../components/TableFile";
import ModalAddNewProfile from "../../components/ModalAddNewProfile";

const HomePage = () => {
  return (
    <>
      <div className="homepage_btn_upload">
        <ModalAddNewProfile />
      </div>

      <TableFile />
      <Button
        id="btn_start"
        className="pages_homepages_button"
        onClick={() => {
          console.log("start");
        }}
      >
        Start
      </Button>
    </>
  );
};

export default HomePage;
