import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import searchIcon from "../../assets/search.svg";
import listView from "../../assets/listView.svg";
import kanbanView from "../../assets/kanbanView.svg";
import filter from "../../assets/filter.svg";
import filterDropdown from "../../assets/filter-dropdown.svg";
import calender from "../../assets/calender.svg";
import filterInactive from "../../assets/white-filter.svg";

const Tasks = () => {
  const [activeButton, setActiveButton] = useState();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleButtonClick = (button) => {
    setActiveButton(button);
    if (button === "Filter") {
      setShowDropdown(!showDropdown);
    } else {
      setShowDropdown(false);
    }
  };

  const navigate = useNavigate();
  const handleJobCalcClick = () => {
    navigate("/addtask");
  };

  return (
    <div className="flex min-h-screen xl:w-full lg:w-[850px] md:w-[650px] w-80 lg:p-0 lg:mt-0 mt-4">
      <div className="flex-1 p-6 bg-gray-50 overflow-auto pt-0">
        <div className="flex lg:flex-row flex-col justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Tasks & Follow-up</h1>
          <div className="flex items-center justify-center space-x-4 h-[50px] mt-4 md:mt-0">
            <div className="relative w-full max-w-[238px]">
              <img
                src={searchIcon}
                alt="Search Icon"
                className="absolute inset-y-0 left-0 pl-3 mt-3 flex items-center pointer-events-none"
              />
              <input
                type="text"
                placeholder="Search Tasks"
                className="border border-gray-300 rounded-lg py-2 pl-10 pr-4 w-full"
              />
            </div>
            <button
              className="bg-[#7234D7] text-white xl:px-4 xl:py-2 px-2 py-1 rounded-md xl:text-base text-sm"
              onClick={handleJobCalcClick}
            >
              Add Task
            </button>
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
              <button
                className={`${activeButton === "ListView"
                    ? "bg-[#7234D7] text-white"
                    : "border border-[#B3B3B3]"
                  } xl:px-4 xl:py-2 px-2 py-1 rounded-lg flex items-center justify-center gap-2 xl:text-base text-sm`}
                onClick={() => handleButtonClick("ListView")}
              >
                <img
                  src={activeButton === "ListView" ? listView : kanbanView}
                  alt="listView"
                />
                List View
              </button>
              <button
                className={`${activeButton === "KanbanView"
                    ? "bg-[#7234D7] text-white"
                    : "border border-[#B3B3B3]"
                  } xl:px-4 xl:py-2 px-2 py-1 rounded-lg flex items-center justify-center gap-2 xl:text-base text-sm`}
                onClick={() => handleButtonClick("KanbanView")}
              >
                <img
                  src={
                    activeButton === "KanbanView" ? filterInactive : kanbanView
                  }
                  alt="kanbanView"
                />
                Kanban View
              </button>
              <div className="relative">
                <button
                  className={`${activeButton === "Filter"
                      ? "bg-[#7234D7] text-white"
                      : "border border-[#B3B3B3]"
                    } xl:px-4 xl:py-2 md:py-4 px-2 py-4 rounded-lg flex items-center justify-center gap-2 xl:text-base text-sm`}
                  onClick={() => handleButtonClick("Filter")}
                >
                  <img
                    src={activeButton === "Filter" ? filterInactive : filter}
                    alt="filter"
                  />
                  Filter
                </button>

                {showDropdown && (
                  <div className="absolute top-full mt-2 right-0 bg-white shadow-lg rounded-md w-[200px] p-4 z-10">
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">
                        Status
                      </label>
                      <select className="w-full border border-gray-300 rounded-lg p-2">
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">
                        Priority
                      </label>
                      <select className="w-full border border-gray-300 rounded-lg p-2">
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                      </select>
                    </div>
                    <button className="bg-[#7234D7] text-white w-full py-2 rounded-md">
                      Filter
                    </button>
                  </div>
                )}
              </div>
              <button className="border border-[#B3B3B3] px-4 py-2 rounded-lg flex items-center justify-center gap-2 xl:text-base text-sm">
                <img src={calender} alt="calendar" />
                September 2024
                <img src={filterDropdown} alt="filterDropdown" />
              </button>
            </div>
          </div>

          <div className="bg-white overflow-hidden w-full h-full">
            <div className="max-h-[500px] overflow-y-auto w-full">
              <table className="min-w-full table-auto divide-y divide-gray-200">
                <thead className="bg-[#F4F7F9] rounded-xl">
                  <tr>
                    {[
                      "Id",
                      "Task Name",
                      "Task Owner",
                      "Task Description",
                      "Status",
                      "Assigned To",
                      "Priority",
                      "Attachment",
                      "Deadline",
                    ].map((header) => (
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
                  {[...Array(10)].map((_, idx) => (
                    <tr
                      key={idx}
                      className={idx % 2 !== 0 ? "bg-gray-100" : ""}
                    >
                      <td className="px-6 py-4 text-center">01</td>
                      <td className="px-6 py-4 text-center">Facebook</td>
                      <td className="px-6 py-4 text-center">Daniel</td>
                      <td className="px-6 py-4 text-center">Lorem..</td>
                      <td className="px-6 py-4 text-center text-[#165E3D]">
                        Completed
                      </td>
                      <td className="px-6 py-4 text-center">Jawad</td>
                      <td className="px-6 py-4 text-center">Normal</td>
                      <td className="px-6 py-4 text-center text-[#7234D7]">
                        Download
                      </td>
                      <td className="px-6 py-4 text-center">09.10.24</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
