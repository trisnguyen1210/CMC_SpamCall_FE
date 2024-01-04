import { Card, Col, Divider, Row } from "antd";
import { useEffect, useState } from "react";
import { getLogsResults } from "../../services/axios";
import "./style.css";
import { useNavigate } from "react-router-dom";

const ResultsPage = () => {
  const navigate = useNavigate();
  const [dataAPI, setDataAPI] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await getLogsResults();
      setDataAPI(response.message);
    };
    fetchData();
  }, []);

  const handleClickResult = (e) => {
    const urlNav = `/result/${e.nameProfile}`;
    navigate(urlNav);
  };

  return (
    <>
      <div className="resultpage">
        <Divider orientation="left">
          <p className="resultpage_title">Click to check result</p>
        </Divider>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          {dataAPI.map((e, index) => (
            <Col xs={24} sm={12} md={8} lg={6} xl={4} key={index}>
              <Card
                hoverable
                title={e.nameProfile}
                bordered={false}
                className="resultpage_card"
                onClick={() => {
                  handleClickResult(e);
                }}
              >
                {e.nameFile}
              </Card>
              <i className="resultpage_time">{e.updatedAt}</i>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};
export default ResultsPage;
