import { Button, Divider } from "antd";
import "./style.css";
import { useState } from "react";

const ResultDashboard = (props) => {
  // eslint-disable-next-line react/prop-types
  const { errorNumbers, busyNumbers } = props;
  const [isErrorCopied, setIsErrorCopied] = useState(false);
  const [isBusyCopied, setIsBusyCopied] = useState(false);

  const handleCopyClick = (dataCopy, setIsCopied) => {
    const tempInput = document.createElement("input");
    tempInput.value = dataCopy;
    document.body.appendChild(tempInput);

    tempInput.select();
    document.execCommand("copy");

    document.body.removeChild(tempInput);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <>
      <div className="result-dashboard">
        <Divider orientation="left">Error Numbers</Divider>
        <div className="result-dashboard_background">
          <p className="result-dashboard_data">{errorNumbers}</p>
        </div>
        <div className="result-dashboard_btn">
          <Button
            onClick={() => {
              handleCopyClick(errorNumbers, setIsErrorCopied);
            }}
            disabled={isErrorCopied}
          >
            {isErrorCopied ? "Copied!" : "Copy"}
          </Button>
        </div>
        <Divider orientation="left">Busy Numbers</Divider>
        <div className="result-dashboard_background">
          <p className="result-dashboard_data">{busyNumbers}</p>
        </div>
        <div className="result-dashboard_btn">
          <Button
            onClick={() => {
              handleCopyClick(busyNumbers, setIsBusyCopied);
            }}
            disabled={isBusyCopied}
          >
            {isBusyCopied ? "Copied!" : "Copy"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default ResultDashboard;
