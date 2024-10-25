import React, { useState, useEffect } from "react";
import searchIcon from "../../assets/search.svg";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import listView from "../../assets/listView.svg";
import kanbanView from "../../assets/kanbanView.svg";
import filter from "../../assets/filter.svg";
import filterDropdown from "../../assets/filter-dropdown.svg";
import calender from "../../assets/calender.svg";

const LeadManagement = ({ currentUser }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { updatedLead } = location.state || {};
  const [leads, setLeads] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    leadPhone: "",
    leadCompany: "",
    leadEmail: "",
    leadSource: "",
    leadName: "",
    leadOwner: "",
    leadStage: "",
    createdDate: "",
    appointDate: "",
    leadAdd: "",
    leadDesc: "",
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

  // useEffect(() => {
  //   const fetchLeads = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:8000/users/${currentUser.email}/leads/`
  //       );
  //       setLeads(response.data);
  //     } catch (error) {
  //       console.error("Error fetching leads:", error);
  //     }
  //   };

  //   fetchLeads();

  //   if (updatedLead) {
  //     setLeads((prevLeads) =>
  //       prevLeads.map((lead) =>
  //         lead.id === updatedLead.id ? updatedLead : lead
  //       )
  //     );
  //   }
  // }, [currentUser.email, updatedLead]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // You are doing good, Keep it up!

  const handleSaveLead = async () => {
    const leadData = {
      user_email: currentUser.email,
      first_name: formData.firstName,
      last_name: formData.lastName,
      phone: formData.leadPhone,
      lead_email: formData.leadEmail,
      lead_source: formData.leadSource,
      company: formData.leadCompany,
      lead_name: formData.leadName,
      lead_stage: formData.leadStage,
      lead_owner: formData.leadOwner,
      created_date: formData.createdDate,
      appointment_date: formData.appointDate,
      lead_address: formData.leadAdd,
      lead_desc: formData.leadDesc,
    };

    console.log(leadData);

    try {
      const response = await axios.post(
        `http://localhost:8000/users/${currentUser.email}/leads/`,
        leadData
      );
      const newLead = response.data;
      setLeads([...leads, { ...formData, id: newLead.lead_id }]);
      setFormData({
        firstName: "",
        lastName: "",
        leadPhone: "",
        leadCompany: "",
        leadEmail: "",
        leadSource: "",
        leadName: "",
        leadStage: "",
        leadOwner: "",
        createdDate: "",
        appointDate: "",
        leadAdd: "",
        leadDesc: "",
      });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating lead:", error);
    }
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
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="Enter first name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full border p-2 rounded border-[#CDCDCD]"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-[14px] font-semibold">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Enter last name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full border p-2 rounded border-[#CDCDCD]"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-[14px] font-semibold">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="leadPhone"
                      placeholder="Enter phone"
                      value={formData.leadPhone}
                      onChange={handleInputChange}
                      className="w-full border p-2 rounded border-[#CDCDCD]"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-[14px] font-semibold">
                      Company
                    </label>
                    <input
                      type="text"
                      name="leadCompany"
                      placeholder="Enter lead company"
                      value={formData.leadCompany}
                      onChange={handleInputChange}
                      className="w-full border p-2 rounded border-[#CDCDCD]"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-[14px] font-semibold">
                      Email
                    </label>
                    <input
                      type="email"
                      name="leadEmail"
                      placeholder="Enter lead email"
                      value={formData.leadEmail}
                      onChange={handleInputChange}
                      className="w-full border p-2 rounded border-[#CDCDCD]"
                    />
                  </div>
                  <div>
                    <label className="font-semibold block mb-1 text-[14px]">
                      Lead Source
                    </label>
                    <select
                      name="leadSource"
                      value={formData.leadSource}
                      onChange={handleInputChange}
                      className="w-full border p-2 rounded border-[#CDCDCD]"
                    >
                      <option value="">-None-</option>
                      <option value="Facebook">Facebook</option>
                      <option value="Google">Google</option>
                    </select>
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
                          {lead.appointDate}
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
                  </tbody>
                </table>
                {leads.length === 0 && (
                  <div className="py-4 text-center text-gray-500">
                    No leads available
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadManagement;
