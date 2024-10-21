import React, { useState, useEffect } from "react";
import searchIcon from "../../assets/search.svg";
import listView from "../../assets/listView.svg";
import kanbanView from "../../assets/kanbanView.svg";
import filter from "../../assets/filter.svg";
import filterDropdown from "../../assets/filter-dropdown.svg";
import calender from "../../assets/calender.svg";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const LeadManagment = ({ currentUser }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { updatedLead } = location.state || {};
  const [leads, setLeads] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    leadName: "",
    leadOwner: "",
    // leadStage: "",
    appointdate: "",
    createdDate: "",
    leadAdd: "",
    leadDesc: "",
    // leadSource: "",
  });

  useEffect(() => {
    if (updatedLead) {
      setLeads((prevLeads) =>
        prevLeads.map((lead) =>
          lead.id === updatedLead.id ? updatedLead : lead
        )
      );
    }
  }, [updatedLead]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // You are doing good, Keep it up!
  
  const handleSaveLead = () => {
    setLeads([...leads, { ...formData, id: leads.length + 1 }]);
    setFormData({
      // firstName: "",
      // lastName: "",
      leadName: "",
      leadOwner: "",
      // leadStage: "",
      createdDate: "",
      appointdate: "",
      leadAdd: "",
      leadDesc: "",
      // leadSource: "",
    });
    setIsModalOpen(false);
  };

  const handleRowClick = (lead) => {
    navigate(`/lead/${lead.id}`, { state: { lead } });
  };

  return (
    <div className="flex min-h-screen xl:w-full lg:w-full md:w-[650px] w-80 lg:p-0 lg:mt-0 mt-4">
      <div className="flex-1 p-6 bg-gray-50 overflow-auto pt-0">
        <div className="flex lg:flex-row flex-col justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Lead Managment</h1>
          <div className="flex items-center justify-center space-x-4 h-[50px] mt-4 md:mt-0">
            <div className="relative w-full max-w-[238px]">
              <img
                src={searchIcon}
                alt="Search Icon"
                className="absolute inset-y-0 left-0 pl-3 mt-3 flex items-center pointer-events-none"
              />
              <input
                type="text"
                placeholder="Search Leads"
                className="border border-gray-300 rounded-lg py-2 pl-10 pr-4 w-full"
              />
            </div>
            {/* {currentUser ? ( */}
            <button
              className="bg-[#7234D7] text-white xl:px-4 xl:py-2 px-2 py-1 rounded-md xl:text-base text-sm"
              onClick={() => setIsModalOpen(true)}
            >
              Add Leads
            </button>
            {/* ) : (
              <p className="text-red-500">Please log in to add leads</p>
            )} */}
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

          <hr />

          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
              <div className="bg-white p-8 rounded-lg w-full max-w-2xl">
                <div className="relative flex justify-center items-center mb-6">
                  <h2 className="text-2xl font-bold">Add New Lead</h2>
                </div>
                <hr />

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block mb-1 text-[14px] font-semibold">
                      Lead Name
                    </label>
                    <input
                      type="text"
                      name="leadName"
                      placeholder="Enter lead name"
                      value={formData.leadName}
                      onChange={handleInputChange}
                      className="w-full border p-2 rounded border-[#CDCDCD]"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-[14px] font-semibold">
                      Lead Owner
                    </label>
                    <input
                      type="text"
                      name="leadOwner"
                      placeholder="Enter lead owner"
                      value={formData.leadOwner}
                      onChange={handleInputChange}
                      className="w-full border p-2 rounded border-[#CDCDCD]"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-[14px] font-semibold">
                      Created Date
                    </label>
                    <input
                      type="date"
                      name="createdDate"
                      placeholder="Select created date"
                      value={formData.createdDate}
                      onChange={handleInputChange}
                      className="w-full border p-2 rounded border-[#CDCDCD]"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-[14px] font-semibold">
                      Appointment Date
                    </label>
                    <input
                      type="date"
                      name="appointdate"
                      placeholder="Select appointment date"
                      value={formData.appointdate}
                      onChange={handleInputChange}
                      className="w-full border p-2 rounded border-[#CDCDCD]"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block mb-1 text-[14px] font-semibold">
                      Lead Address
                    </label>
                    <div className="relative w-full">
                      <input
                        type="text"
                        name="leadAdd"
                        placeholder="Enter address or"
                        value={formData.leadAdd}
                        onChange={handleInputChange}
                        className="w-full border p-2 pr-20 rounded border-[#CDCDCD]"
                      />
                      <a
                        href="/"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#7234D7]"
                      >
                        select on map
                      </a>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label className="block mb-1 text-[14px] font-semibold">
                      Lead Description
                    </label>
                    <textarea
                      name="leadDesc"
                      placeholder="Start writing from here..."
                      value={formData.leadDesc}
                      onChange={handleInputChange}
                      className="w-full border p-2 rounded border-[#CDCDCD] h-28"
                    ></textarea>
                  </div>
                </div>
                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    className="border border-[#747474] text-[#747474] px-6 py-2 rounded"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="border border-[#CDCDCD] bg-[#7234D7] text-white px-8 py-2 rounded"
                    onClick={handleSaveLead}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white shadow rounded-lg p-4">
            <div className="bg-white overflow-hidden w-full h-full">
              <div className="max-h-[500px] overflow-y-auto w-full">
                <table className="min-w-full table-auto divide-y divide-gray-200">
                  <thead className="bg-[#F4F7F9] rounded">
                    <tr>
                      {[
                        "Id",
                        "Lead Name",
                        "Lead Stage",
                        "Lead Owner",
                        "Created Date",
                        "Appointment Date",
                        "Lead Address",
                        "Description",
                        "Action",
                      ].map((header) => (
                        <th
                          key={header}
                          className="py-2 px-4 text-center text-sm font-medium tracking-wider "
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 cursor-pointer">
                    {leads.map((lead, idx) => (
                      <tr
                        key={idx}
                        className={idx % 2 !== 0 ? "bg-gray-100" : ""}
                        onClick={() => handleRowClick(lead)}
                      >
                        <td className="px-4 py-2 text-center">{lead.id}</td>
                        <td className="px-4 py-2 text-center">
                          {lead.leadName}
                        </td>
                        <td className="px-4 py-2 text-center">
                          {lead.leadStage}
                        </td>
                        <td className="px-4 py-2 text-center">
                          {lead.leadOwner}
                        </td>
                        <td className="px-4 py-2 text-center">
                          {lead.createdDate}
                        </td>
                        <td className="px-4 py-2 text-center">
                          {lead.appointdate}
                        </td>
                        <td className="px-4 py-2 text-center">
                          {lead.leadAdd}
                        </td>
                        <td className="px-4 py-2 text-center">
                          {lead.leadDesc}
                        </td>
                        <td className="px-4 py-2 text-center">
                          <button className="px-4 py-2 bg-[#7234D7] text-white rounded-md">
                            Deal
                          </button>
                        </td>
                      </tr>
                    ))}
                    {leads.length === 0 && (
                      <tr>
                        <td colSpan="10" className="text-center py-4">
                          No leads found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadManagment;
