import React, { useState } from 'react';
import backIcon from "../../assets/back-icon.svg";
import { useNavigate } from 'react-router-dom';

const AddTask = () => {
  const navigate = useNavigate();
  const handleTask = () => {
    navigate('/tasks');
  };
  const [formData, setFormData] = useState({
    taskName: '',
    taskOwner: '',
    status: '',
    assignee: '',
    priority: '',
    attachment: '',
    deadline: '',
    description: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted', formData);
  };

  return (
    <div className="w-full mx-auto p-6 pt-0 lg:mt-0 mt-4">
      <div className="flex lg:flex-row flex-col justify-between items-center mb-6">
        <div className="flex gap-2">
          <img src={backIcon} alt="back-icon" className="cursor-pointer" onClick={handleTask} />
          <h1 className="text-2xl font-bold">Add New Task</h1>
        </div>
        <div className="flex items-center justify-center space-x-4 h-[50px] mt-4 md:mt-0">
          <div className="flex justify-end space-x-4">
            <button className="border border-[#747474] text-[#747474] px-8 py-2 rounded">
              Cancel
            </button>
            <button className="border border-[#CDCDCD] bg-[#7234D7] text-white px-10 py-2 rounded">
              Save
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Task Details</h2>
          </div>
          <hr className="text-[#D1D1D1]" />

          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Task Name</label>
              <input
                type="text"
                name="taskName"
                placeholder="Placeholder"
                className="block w-full px-4 py-2 border rounded-md shadow-sm border-[#CDCDCD] placeholder:text-[#808080] mt-2"
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Task Owner</label>
              <input
                type="text"
                name="taskOwner"
                placeholder="Placeholder"
                className="block w-full px-4 py-2 border rounded-md shadow-sm border-[#CDCDCD] placeholder:text-[#808080] mt-2"
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
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
              <label className="block text-sm font-medium text-gray-700">Assigned to</label>
              <select
                name="assignee"
                className="block w-full px-4 py-2 border rounded-md shadow-sm border-[#CDCDCD] placeholder:text-[#808080] mt-2"
                onChange={handleInputChange}
              >
                <option>Select Assignee</option>
                <option value="User1">User1</option>
                <option value="User2">User2</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Priority</label>
              <select
                name="priority"
                className="block w-full px-4 py-2 border rounded-md shadow-sm border-[#CDCDCD] placeholder:text-[#808080] mt-2"
                onChange={handleInputChange}
              >
                <option>Select Priority Level</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Attachment</label>
              <input
                type="text"
                name="attachment"
                placeholder="Placeholder"
                className="block w-full px-4 py-2 border rounded-md shadow-sm border-[#CDCDCD] placeholder:text-[#808080] mt-2"
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Deadline</label>
              <input
                type="date"
                name="deadline"
                className="block w-full px-4 py-2 border rounded-md shadow-sm border-[#CDCDCD] placeholder:text-[#808080] mt-2"
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Task Description</label>
              <input
                name="description"
                placeholder="Placeholder"
                className="block w-full px-4 py-2 border rounded-md shadow-sm border-[#CDCDCD] placeholder:text-[#808080] mt-2"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
