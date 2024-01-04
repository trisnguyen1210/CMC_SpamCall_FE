import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { Button, Input, Space, Table, message } from "antd";
import { deleteProfile, getProfiles, runFile } from "../services/axios";

const TableFile = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [dataApi, setDataApi] = useState([]);
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const handleRunFile = async (record) => {
    message.open({
      type: "info",
      content: `Đang chạy file ${record.nameProfile}`,
    });
    const response = await runFile(record);
    if (response.status === "success") {
      message.open({
        type: "success",
        content: "Run file hoàn thành",
      });
    }
  };

  const handleDeleteProfile = async (record) => {
    const response = await deleteProfile(record.nameProfile);
    if (response.status === "success") {
      message.open({
        type: "success",
        content: "Xóa Profile thành công",
      });
      const updatedData = dataApi.filter(
        (item) => item.nameProfile !== record.nameProfile
      );
      setDataApi(updatedData);
    }
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "nameProfile",
      key: "nameProfile",
      width: "25%",
      ...getColumnSearchProps("nameProfile"),
    },
    {
      title: "File",
      dataIndex: "nameFile",
      key: "nameFile",
      width: "25%",
      ...getColumnSearchProps("nameFile"),
    },
    {
      title: "Time",
      dataIndex: "updatedAt",
      key: "updatedAt",
      width: "40%",
    },
    {
      title: "Action",
      key: "action",
      width: "10%",
      render: (_, record) => (
        <Space size="middle">
          <a
            onClick={() => {
              handleRunFile(record);
            }}
          >
            Run
          </a>
          <a
            onClick={() => {
              handleDeleteProfile(record);
            }}
          >
            Delete
          </a>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await getProfiles();
        const response = await getProfiles();
        const formattedAPI = response.message.map((item, index) => ({
          key: index,
          nameProfile: item.nameProfile,
          nameFile: item.nameFile,
          updatedAt: item.updatedAt,
        }));
        setDataApi(formattedAPI);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Table
      columns={columns}
      dataSource={dataApi}
      pagination={false}
      rowSelection={{}}
    />
  );
};
export default TableFile;
