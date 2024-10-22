import React, { useState, useEffect } from "react";
import searchIcon from "../../assets/search.svg";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const LeadManagement = ({ currentUser }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { updatedLead } = location.state || {};
  const [leads, setLeads] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    leadName: "",
    leadOwner: "",
    createdDate: "",
    appointdate: "",
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

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // You are doing good, Keep it up!

  const handleSaveLead = async () => {
    const leadData = {
      user_email: currentUser.email,
      lead_name: formData.leadName,
      lead_owner: formData.leadOwner,
      created_date: formData.createdDate,
      appointment_date: formData.appointdate,
      lead_address: formData.leadAdd,
      lead_desc: formData.leadDesc,
    };

    try {
      const response = await axios.post(
        `http://localhost:8000/users/${currentUser.email}/leads/`,
        leadData
      );
      const newLead = response.data;
      setLeads([...leads, { ...formData, id: newLead.lead_id }]);
      setFormData({
        leadName: "",
        leadOwner: "",
        createdDate: "",
        appointdate: "",
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
          <h1 className="text-2xl font-bold">Lead Management</h1>
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
            <button
              className="bg-[#7234D7] text-white xl:px-4 xl:py-2 px-2 py-1 rounded-md xl:text-base text-sm"
              onClick={() => setIsModalOpen(true)}
            >
              Add Leads
            </button>
          </div>
        </div>

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
                      placeholder="Enter address"
                      value={formData.leadAdd}
                      onChange={handleInputChange}
                      className="w-full border p-2 pr-20 rounded border-[#CDCDCD]"
                    />
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
                      <td className="px-4 py-2 text-center">{lead.leadName}</td>
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
                        {lead.appointmentDate}
                      </td>
                      <td className="px-4 py-2 text-center">{lead.leadAdd}</td>
                      <td className="px-4 py-2 text-center">{lead.leadDesc}</td>
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
  );
};

export default LeadManagement;
