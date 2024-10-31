import React, { useRef, useState} from "react";
import axios from "axios";
import searchIcon from "../../assets/search.svg";
import listView from "../../assets/listView.svg";
import kanbanView from "../../assets/kanbanView.svg";
import filter from "../../assets/filter.svg";
import filterDropdown from "../../assets/filter-dropdown.svg";
import calender from "../../assets/calender.svg";
import Loader from "../../components/loader/Loader";
import JobCalculatorComponent from "../../components/jobcalcComponent/JobCalcComponent";

const JobCalculator = () => {
  const fileInputRef = useRef(null);
  const [editingCell, setEditingCell] = useState({ row: null, column: null });
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState(
    [...Array(24)].map((_, idx) => ({
      id: String(idx + 1).padStart(2, "0"),
      room: "001",
      width: "001",
      height: "001",
      type: "",
      panel: "OX",
      quantity: "001",
      price: "180",
      additionalLabor: "-----",
      notes: "notes",
      totalLabor: "001",
    }))
  );

  const headers = [
    "Id",
    "Room",
    "Width",
    "Height",
    "Type",
    "Panel",
    "Quantity",
    "Price",
    "Additional Labor",
    "Notes",
    "Total Labor",
  ];

  const typeOptions = [
    " ",
    "ES-EL100 - Single Hung",
    "ES-EL200 - HORIZONTAL ROLLER",
    "ES-EL200 - HORIZONTAL ROLLER XOX",
    "ES-EL400 - SLIDING GLASS DOOR",
    "ES-EL300 - SWING DOOR - SINGLE LEAF",
    "ES-EL300 - SWING DOOR - DOUBLE LEAF",
    "ES-EL150 SHAPE - FIXED WINDOW",
    "MULLION",
    "ES-EL300 - SWING DOOR - SINGLE LEAF with Side Lite",
    "ES-EL300 - SWING DOOR - DOUBLE LEAF with side Lite",
    "ES-EL300 - SWING DOOR - DOUBLE LEAF with 2 Side Lites",
  ];

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      setLoading(true);
      try {
        const response = await axios.post(
          "https://job-calculator-dan-01-hwa8c4czf7c6h5ec.westus-01.azurewebsites.net/uploadfile/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const extractedData = response.data;
        console.log("Extracted Data:", extractedData);
        if (extractedData) {
          const updatedData = extractedData.map((item, idx) => ({
            id: String(idx + 1).padStart(2, "0"),
            ...item,
            notes: item.notes || "0",
            totalLabor: item.totalLabor || "0",
          }));

          const totalRows = 24;
          const remainingRows = totalRows - updatedData.length;

          if (remainingRows > 0) {
            const defaultRows = [...Array(remainingRows)].map((_, idx) => ({
              id: String(updatedData.length + idx + 1).padStart(2, "0"),
              room: "001",
              width: "001",
              height: "001",
              type: "",
              panel: "OX",
              quantity: "001",
              price: "180",
              additionalLabor: "-----",
              notes: "notes",
              totalLabor: "001",
            }));

            setData([...updatedData, ...defaultRows]);
          } else {
            setData(updatedData);
          }
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCellClick = (rowIdx, column) => {
    if (column !== "id") {
      setEditingCell({ row: rowIdx, column });
    }
  };

  const handleInputChangee = (e, rowIdx, column) => {
    const updatedData = [...data];
    updatedData[rowIdx][column] = e.target.value;
    setData(updatedData);
  };

  const handleBlur = () => {
    setEditingCell({ row: null, column: null });
  };

  return (
    <div className="flex min-h-screen xl:w-full lg:w-[700px] md:w-[460px] w-80 p-0 lg:mt-0 mt-4">
      <div className="flex-1 p-6 bg-gray-50 overflow-auto pt-0">
        <div className="flex lg:flex-row flex-col justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Job Calculator</h1>
          <div className="flex items-center justify-center space-x-4 h-[50px] mt-4 md:mt-0">
            <div className="relative w-full max-w-[238px]">
              <img
                src={searchIcon}
                alt="Search Icon"
                className="absolute inset-y-0 left-0 pl-3 mt-3 flex items-center pointer-events-none"
              />
              <input
                type="text"
                placeholder="Search Job"
                className="border border-gray-300 rounded-lg py-2 pl-10 pr-4 w-full"
              />
            </div>
            <button className="bg-[#7234D7] text-white xl:px-4 xl:py-2 px-2 py-1 rounded-md xl:text-base text-sm">
              Clone Job Calculator
            </button>
            <button
              className="bg-[#7234D7] text-white xl:px-4 xl:py-2 px-2 py-1 rounded-md xl:text-base text-sm"
              onClick={handleUploadClick}
            >
              Upload File
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4">
          <div className="flex xl:flex-row flex-col md:gap-3 gap-2 justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <span className="mr-2 text-[#666666]">Show</span>
                <select className="border border-[#666666] rounded-lg xl:py-2 xl:px-3 px-2 py-1">
                  <option value="24">24</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
                <span className="lg:ml-2 lg:mr-4  text-[#666666]">
                  Entities
                </span>
              </div>
            </div>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
              <button className="bg-[#7234D7] border border-[#666666] text-white xl:px-4 xl:py-2 px-2 py-1 rounded-lg flex items-center justify-center gap-2 xl:text-base text-sm">
                <img src={listView} alt="listView" />
                List View
              </button>
              <button className="border border-[#B3B3B3] px-4 py-2 rounded-lg flex items-center justify-center gap-2 xl:text-base text-sm">
                <img src={kanbanView} alt="kanbanView" />
                Kanban View
              </button>
              <button className="border border-[#B3B3B3] px-4 py-2 rounded-lg flex items-center justify-center gap-2 xl:text-base text-sm">
                <img src={filter} alt="filter" />
                Filter
              </button>
              <button className="border border-[#B3B3B3] px-4 py-2 rounded-lg flex items-center justify-center gap-2 xl:text-base text-sm">
                <img src={calender} alt="calendar" />
                September 2024
                <img src={filterDropdown} alt="filterDropdown" />
              </button>
            </div>
          </div>

          {loading ? (
            <Loader />
          ) : (
            <div className="bg-white overflow-x-auto shadow-md rounded-lg p-4">
              <div className="bg-white overflow-hidden w-full h-full">
                <div className="max-h-[500px] overflow-y-auto w-full">
                  <table className="min-w-full table-auto divide-y divide-gray-200 text-center">
                    <thead className="bg-[#F4F7F9] rounded-xl">
                      <tr>
                        {headers.map((header) => (
                          <th
                            key={header}
                            className="py-2 px-4 text-center text-sm font-medium tracking-wider"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {data.map((row, rowIdx) => (
                        <tr
                          key={rowIdx}
                          className={rowIdx % 2 !== 0 ? "bg-gray-100" : ""}
                        >
                          {Object.keys(row).map((column, colIdx) => (
                            <td
                              key={colIdx}
                              className="px-3 py-4 whitespace-nowrap"
                              onClick={() => handleCellClick(rowIdx, column)}
                            >
                              {column === "type" ? (
                                <select
                                  value={
                                    typeOptions.includes(row[column])
                                      ? row[column]
                                      : " "
                                  }
                                  onChange={(e) =>
                                    handleInputChangee(e, rowIdx, column)
                                  }
                                  className="form-select px-4 py-2 rounded-md w-64 border border-gray-300"
                                >
                                  {typeOptions.map((option, idx) => (
                                    <option key={idx} value={option}>
                                      {option.length > 20
                                        ? `${option.slice(0, 20)}...`
                                        : option}
                                    </option>
                                  ))}
                                </select>
                              ) : column === "id" ? (
                                <span>{row[column]}</span>
                              ) : editingCell.row === rowIdx &&
                                editingCell.column === column ? (
                                <input
                                  type="text"
                                  value={row[column]}
                                  onChange={(e) =>
                                    handleInputChangee(e, rowIdx, column)
                                  }
                                  onBlur={handleBlur}
                                  autoFocus
                                  className="px-2 py-1 w-16 border border-gray-300 rounded"
                                />
                              ) : row[column]?.length > 20 ? (
                                `${row[column].slice(0, 20)}...`
                              ) : row[column] === "" ? (
                                "0"
                              ) : (
                                row[column]
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>

        <JobCalculatorComponent />
      </div>
    </div>
  );
};

export default JobCalculator;
