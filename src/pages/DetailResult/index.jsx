import { useEffect, useState } from "react";
import { getDetailResult } from "../../services/axios";
import { useParams } from "react-router-dom";
import ResultDashboard from "../../components/ResultDashboard";

function DetailResult() {
  const { nameProfile } = useParams();
  const [statusNumb, setStatusNumb] = useState([
    { errorNumbers: [] },
    { busyNumbers: [] },
  ]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDetailResult(nameProfile);
        setStatusNumb(response.message);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [nameProfile]);
  return (
    <>
      <ResultDashboard
        errorNumbers={statusNumb.errorNumbers}
        busyNumbers={statusNumb.busyNumbers}
      />
    </>
  );
}
export default DetailResult;
