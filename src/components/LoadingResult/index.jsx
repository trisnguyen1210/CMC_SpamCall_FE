import { Alert, Flex, Spin } from "antd";
import "./style.css";

function LoadingResult(props) {
  const { activeProcess } = props;

  return (
    <>
      {activeProcess ? (
        <div className="loading-result">
          <Flex gap={"small"} vertical>
            <Spin tip="Loading...">Loading</Spin>
          </Flex>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
export default LoadingResult;
