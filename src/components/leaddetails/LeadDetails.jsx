import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';

const LeadDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { lead } = location.state || {};

  const [updatedLead, setUpdatedLead] = useState({
    firstName: lead?.firstName || "",
    lastName: lead?.lastName || "",
    leadName: lead?.leadName || "",
    leadOwner: lead?.leadOwner || "",
    leadEmail: lead?.leadEmail || "",
    leadPhone: lead?.leadPhone || "",
    leadCompany: lead?.leadCompany || "",
    leadDesc: lead?.leadDesc || "",
    leadSource: lead?.leadSource || "",
    leadStage:lead?.leadStage || "",
    leadAdd: lead?.leadAdd || "",
    leadCity: lead?.leadCity || "",
    leadResidentialType: lead?.leadResidentialType || "",
    createdDate: lead?.createdDate || "",
    appointDate: lead?.appointDate,
    meetingTitle: lead?.meetingTitle || "",
    dealOwner: lead?.dealOwner || "",
    meetingTo: "",
    meetingFrom: "",
  });

  if (!lead) {
    return <div>Lead not found!</div>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedLead({
      ...updatedLead,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      const leadId = lead.id;
      const response = await axios.put(`http://localhost:8000/leads/${leadId}/details/`, {
        first_name: updatedLead.firstName,
        last_name: updatedLead.lastName,
        company: updatedLead.leadCompany,
        lead_owner: updatedLead.leadOwner,
        lead_email: updatedLead.leadEmail,
        phone: updatedLead.leadPhone,
        city: updatedLead.leadCity,
        residential_type: updatedLead.leadResidentialType,
        meeting_title: updatedLead.meetingTitle,
        lead_source: updatedLead.leadSource,
        lead_stage: updatedLead.leadStage,
        lead_address: updatedLead.leadAdd,
        lead_desc: updatedLead.leadDesc,
        appointment_date: updatedLead.appointDate,
        deal_owner: updatedLead.dealOwner,
        created_date: updatedLead.createdDate,
        lead_name: updatedLead.leadName,
        to_date: updatedLead.meetingTo,
        from_date: updatedLead.meetingFrom,
      });
  
      navigate(-1, { state: { updatedLead: response.data } });
    } catch (error) {
      console.error("Error updating lead:", error);
    }
  };
  

  return (
    <div className="w-full p-6 rounded lg:mt-0 mt-4 mx-2 bg-white xl:w-full lg:w-full md:w-[650px]">
      <h1 className="text-2xl font-semibold text-center mb-6">
        Lead Details - {updatedLead.leadName}
      </h1>

      <div className="grid grid-cols-2 gap-6">
      <div className="flex flex-col gap-2">
          <label className="font-semibold">First Name</label>
          <input
            type="text"
            name="firstName"
            value={updatedLead.firstName}
            onChange={handleInputChange}
            className="border p-2 rounded"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={updatedLead.lastName}
            onChange={handleInputChange}
            className="border p-2 rounded"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Lead Name</label>
          <input
            type="text"
            name="leadName"
            value={updatedLead.leadName}
            onChange={handleInputChange}
            className="border p-2 rounded"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Lead Owner</label>
          <input
            type="text"
            name="leadOwner"
            value={updatedLead.leadOwner}
            onChange={handleInputChange}
            className="border p-2 rounded"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold">Lead Stage</label>
          <input
            type="text"
            name="leadStage"
            value={updatedLead.leadStage}
            onChange={handleInputChange}
            className="border p-2 rounded"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold">Lead Address</label>
          <input
            type="text"
            name="leadAdd"
            value={updatedLead.leadAdd}
            onChange={handleInputChange}
            className="border p-2 rounded"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold">Email</label>
          <input
            type="email"
            name="leadEmail"
            value={updatedLead.leadEmail}
            onChange={handleInputChange}
            className="border p-2 rounded"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Phone</label>
          <input
            type="tel"
            name="leadPhone"
            value={updatedLead.leadPhone}
            onChange={handleInputChange}
            className="border p-2 rounded"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold">Company</label>
          <input
            type="text"
            name="leadCompany"
            value={updatedLead.leadCompany}
            onChange={handleInputChange}
            className="border p-2 rounded"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Description</label>
          <textarea
            name="leadDesc"
            value={updatedLead.leadDesc}
            onChange={handleInputChange}
            className="border p-2 rounded"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold">City</label>
          <input
            type="text"
            name="leadCity"
            value={updatedLead.leadCity}
            onChange={handleInputChange}
            className="border p-2 rounded"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Appointment Date</label>
          <input
            type="date"
            name="appointDate"
            value={updatedLead.appointDate}
            onChange={handleInputChange}
            className="border p-2 rounded"
          />
        </div>
       

        <div className="flex flex-col gap-2">
          <label className="font-semibold">Created Date</label>
          <input
            type="date"
            name="createdDate"
            value={updatedLead.createdDate}
            onChange={handleInputChange}
            className="border p-2 rounded"
          />
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="xl:text-4xl md:text-2xl text-lg font-semibold">
            Initial Appointment Meeting Schedule
          </h2>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Meeting Title</label>
          <input
            type="text"
            name="meetingTitle"
            value={updatedLead.meetingTitle}
            onChange={handleInputChange}
            className="border p-2 rounded"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold">Deal Owner</label>
          <input
            type="text"
            name="dealOwner"
            value={updatedLead.dealOwner}
            onChange={handleInputChange}
            className="border p-2 rounded"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Residential Type</label>
          <select
            name="leadResidentialType"
            value={updatedLead.leadResidentialType}
            onChange={handleInputChange}
            className="border p-2 rounded"
          >
            <option value="" disabled>
              -None-
            </option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Condominium">Condominium</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold">To</label>
          <input
            type="text"
            name="meetingTo"
            value={updatedLead.meetingTo}
            onChange={handleInputChange}
            className="border p-2 rounded"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold">From</label>
          <input
            type="text"
            name="meetingFrom"
            value={updatedLead.meetingFrom}
            onChange={handleInputChange}
            className="border p-2 rounded"
          />
        </div>
      </div>
      <button
        className="px-4 py-2 bg-[#7234D7] text-white rounded-md w-full mt-4"
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  );
};

export default LeadDetails;
