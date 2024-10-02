import React from 'react';
import searchIcon from "../../assets/search.svg";
import listView from "../../assets/listView.svg";
import kanbanView from "../../assets/kanbanView.svg";
import filter from "../../assets/filter.svg";
import filterDropdown from "../../assets/filter-dropdown.svg";
import calender from "../../assets/calender.svg";

const DealManagment = () => {
  return (
    <div className="flex min-h-screen xl:w-full lg:w-[700px] md:w-[460px] w-80 lg:p-0">
      <div className="flex-1 p-6 bg-gray-50 overflow-auto">
        <div className="flex lg:flex-row flex-col justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Deal Managment</h1>
          <div className="flex items-center justify-center space-x-4 h-[50px] mt-4 md:mt-0">
            <div className="relative w-full max-w-[238px]">
              <img
                src={searchIcon}
                alt="Search Icon"
                className="absolute inset-y-0 left-0 pl-3 mt-3 flex items-center pointer-events-none"
              />
              <input
                type="text"
                placeholder="Search Deals"
                className="border border-gray-300 rounded-lg py-2 pl-10 pr-4 w-full"
              />
            </div>
            <button className="bg-[#7234D7] text-white xl:px-4 xl:py-2 px-2 py-1 rounded-md xl:text-base text-sm">
              Add Deals
            </button>
          </div>
        </div>

        <div className='bg-white shadow-md rounded-lg p-4'>
          <div className="flex xl:flex-row flex-col md:gap-3 gap-2 justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <span className="mr-2 text-[#666666]">Show</span>
                <select className="border border-[#666666] rounded-lg xl:py-2 xl:px-3 px-2 py-1">
                  <option value="24">24</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
                <span className="lg:ml-2 lg:mr-4  text-[#666666]">Entities</span>
              </div>
            </div>
            <div className='flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2'>
              <button className="bg-[#7234D7] border border-[#666666] text-white xl:px-4 xl:py-2 px-2 py-1 rounded-lg flex items-center justify-center gap-2 xl:text-base text-sm">
                <img src={listView} alt='listView' />List View
              </button>
              <button className="border border-[#B3B3B3] px-4 py-2 rounded-lg flex items-center justify-center gap-2 xl:text-base text-sm">
                <img src={kanbanView} alt='kanbanView' />Kanban View
              </button>
              <button className="border border-[#B3B3B3] px-4 py-2 rounded-lg flex items-center justify-center gap-2 xl:text-base text-sm">
                <img src={filter} alt='filter' />Filter
              </button>
              <button className="border border-[#B3B3B3] px-4 py-2 rounded-lg flex items-center justify-center gap-2 xl:text-base text-sm">
                <img src={calender} alt='calendar' />September 2024
                <img src={filterDropdown} alt='filterDropdown' />
              </button>
            </div>
          </div>

          <div className="bg-white overflow-hidden w-full h-full">
            <div className="max-h-[500px] overflow-y-auto w-full">
              <table className="min-w-full table-auto divide-y divide-gray-200">
                <thead className="bg-[#F4F7F9] rounded-xl">
                  <tr>
                    {['Id', 'Deal Name', 'Deal Stage', 'Deal Owner', 'Created Date', 'Appointment Date', 'Deal Address', 'Description', 'Action'].map((header) => (
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
                    <tr key={idx} className={idx % 2 !== 0 ? 'bg-gray-100' : ''}>
                      <td className="px-6 py-4 text-center">01</td>
                      <td className="px-6 py-4 text-center">Facebook</td>
                      <td className="px-6 py-4 text-center text-[#EDBB06]">Negotiation</td>
                      <td className="px-6 py-4 text-center">Daniel</td>
                      <td className="px-6 py-4 text-center">Sept 24, 2024</td>
                      <td className="px-6 py-4 text-center">Sept 24, 2024</td>
                      <td className="px-6 py-4 text-center">Australia</td>
                      <td className="px-6 py-4 text-center">Lorem..</td>
                      <td className="px-6 py-4 text-center">
                        <button className='px-3 py-2 bg-[#7234D7] text-white rounded-md'>Job Calc</button>
                      </td>
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

export default DealManagment;
