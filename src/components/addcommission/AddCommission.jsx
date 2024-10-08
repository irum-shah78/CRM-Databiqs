import React, { useState, useEffect } from 'react';
import backIcon from "../../assets/back-icon.svg";
import { useNavigate, useLocation } from 'react-router-dom';

const AddCommission = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    customerName: '',
    address: '',
    phoneNo: '',
    email: '',
    dealName: '',
    dealOwner: '',
    jobStage: '',
    commissionAmount: '',
    firstPay: '',
    status: '',
    depositAmount: '',
    backendPay: '',
    jobCosting: '',
    notes: ''
  });

  useEffect(() => {
    if (location.state && location.state.newCommission) {
      setFormData(location.state.newCommission);
    }
  }, [location.state]);

  const handleTask = () => {
    navigate('/commissions');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted', formData);
    setFormData({
      customerName: '',
      address: '',
      phoneNo: '',
      email: '',
      dealName: '',
      dealOwner: '',
      jobStage: '',
      commissionAmount: '',
      firstPay: '',
      status: '',
      depositAmount: '',
      backendPay: '',
      jobCosting: '',
      notes: ''
    });

    navigate('/commissions', { state: { newCommission: formData } });
  };
  return (
    <div className="w-full mx-auto p-6 pt-0 lg:mt-0 mt-4">
      <div className="flex lg:flex-row flex-col justify-between items-center mb-6">
        <div className="flex gap-2">
          <img src={backIcon} alt="back-icon" className="cursor-pointer" onClick={handleTask} />
          <h1 className="text-2xl font-bold">Add New Commission</h1>
        </div>
        <div className="flex items-center justify-center space-x-4 h-[50px] mt-4 md:mt-0">
          <div className="flex justify-end space-x-4">
            <button className="border border-[#747474] text-[#747474] px-8 py-2 rounded">
              Cancel
            </button>
            <button type='submit' className="border border-[#CDCDCD] bg-[#7234D7] text-white px-10 py-2 rounded" > 
              Save
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Commission Details</h2>
          </div>
          <hr className="text-[#D1D1D1]" />

          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Customer Name</label>
              <input
                type="text"
                value={formData.customerName}
                name="customerName"
                placeholder="Placeholder"
                className="block w-full px-4 py-2 border rounded-md shadow-sm border-[#CDCDCD] placeholder:text-[#808080] mt-2"
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                name="address"
                placeholder="Placeholder"
                className="block w-full px-4 py-2 border rounded-md shadow-sm border-[#CDCDCD] placeholder:text-[#808080] mt-2"
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="text"
                name="phoneNo"
                placeholder="Placeholder"
                className="block w-full px-4 py-2 border rounded-md shadow-sm border-[#CDCDCD] placeholder:text-[#808080] mt-2"
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="text"
                name="email"
                placeholder="Placeholder"
                className="block w-full px-4 py-2 border rounded-md shadow-sm border-[#CDCDCD] placeholder:text-[#808080] mt-2"
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Deal Name</label>
              <input
                type="text"
                name="dealName"
                placeholder="Placeholder"
                className="block w-full px-4 py-2 border rounded-md shadow-sm border-[#CDCDCD] placeholder:text-[#808080] mt-2"
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Deal Owner</label>
              <input
                type="text"
                name="dealOwner"
                placeholder="Placeholder"
                className="block w-full px-4 py-2 border rounded-md shadow-sm border-[#CDCDCD] placeholder:text-[#808080] mt-2"
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Job Stage</label>
              <input
                type="text"
                name="jobStage"
                placeholder="Placeholder"
                className="block w-full px-4 py-2 border rounded-md shadow-sm border-[#CDCDCD] placeholder:text-[#808080] mt-2"
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Commission Amount</label>
              <input
                type="text"
                name="commissionAmount"
                placeholder="Placeholder"
                className="block w-full px-4 py-2 border rounded-md shadow-sm border-[#CDCDCD] placeholder:text-[#808080] mt-2"
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">First Payment Amount</label>
              <input
                type="text"
                name="firstPay"
                placeholder="Placeholder"
                className="block w-full px-4 py-2 border rounded-md shadow-sm border-[#CDCDCD] placeholder:text-[#808080] mt-2"
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">First Payment Status</label>
              <select
                name="status"
                className="block w-full px-4 py-2 border rounded-md shadow-sm border-[#CDCDCD] placeholder:text-[#808080] mt-2"
                onChange={handleInputChange}
              >
                <option>Select Status</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Deposit Payment Amount</label>
              <input
                type="text"
                name="depositAmount"
                placeholder="Placeholder"
                className="block w-full px-4 py-2 border rounded-md shadow-sm border-[#CDCDCD] placeholder:text-[#808080] mt-2"
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Backend Payment Status</label>
              <input
                type="text"
                name="backendPay"
                placeholder="Placeholder"
                className="block w-full px-4 py-2 border rounded-md shadow-sm border-[#CDCDCD] placeholder:text-[#808080] mt-2"
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Job Costing</label>
              <input
                type="text"
                name="jobCosting"
                placeholder="Placeholder"
                className="block w-full px-4 py-2 border rounded-md shadow-sm border-[#CDCDCD] placeholder:text-[#808080] mt-2"
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Job Notes</label>
              <input
                name="notes"
                placeholder="Placeholder"
                className="block w-full px-4 py-2 border rounded-md shadow-sm border-[#CDCDCD] placeholder:text-[#808080] mt-2"
                onChange={handleInputChange}
              />
            </div>

            <div className="flex justify-end space-x-4 mt-6">
            <button type="button" className="border border-[#747474] text-[#747474] px-8 py-2 rounded" onClick={handleTask}>
              Cancel
            </button>
            <button type="submit" className="border border-[#CDCDCD] bg-[#7234D7] text-white px-10 py-2 rounded">
              Save
            </button>
          </div>

          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCommission;