import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const LeadDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { lead } = location.state || {};

  const [updatedLead, setUpdatedLead] = useState({
    leadName: lead?.leadName || '',
    leadOwner: lead?.leadOwner || '',
    leadEmail: lead?.leadEmail || '',
    leadPhone: lead?.leadPhone || '',
    leadCompany: lead?.leadCompany || '',
    leadDesc: lead?.leadDesc || '',
    leadCity: lead?.leadCity || '',
    leadResidentialType: lead?.leadResidentialType || '',
    createdDate: lead?.createdDate || '',
    meetingTitle: lead?.meetingTitle || '',
    dealOwner: lead?.dealOwner || '',
    meetingTo: '',
    meetingFrom: '',
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

  const handleSave = () => {
    console.log('Updated Lead:', updatedLead);
    navigate(-1, { state: { updatedLead } });
  };

  return (
    <div className="max-w-screen-md mx-auto p-6 rounded lg:mt-0 mt-4 bg-white xl:w-full lg:w-[700px] md:w-[460px] w-72">
      <h1 className="text-2xl font-semibold text-center mb-6">Lead Details - {updatedLead.leadName}</h1>

      <div className="grid grid-cols-2 gap-6">
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
          <label className="font-semibold">Residential Type</label>
          <select
            name="leadResidentialType"
            value={updatedLead.leadResidentialType}
            onChange={handleInputChange}
            className="border p-2 rounded"
          >
            <option value="" disabled>-None-</option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Condominium">Condominium</option>
          </select>
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
          <h2 className="xl:text-4xl md:text-2xl text-lg font-semibold">Initial Appointment Meeting Schedule</h2>
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
