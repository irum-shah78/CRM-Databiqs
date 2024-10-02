// import React, { useRef } from 'react';
// import searchIcon from "../../assets/search.svg";
// import listView from "../../assets/listView.svg";
// import kanbanView from "../../assets/kanbanView.svg";
// import filter from "../../assets/filter.svg";
// import filterDropdown from "../../assets/filter-dropdown.svg";
// import calender from "../../assets/calender.svg";

// const JobCalculator = () => {
//   const fileInputRef = useRef(null);
// const [isModalOpen, setIsModalOpen] = useState(false);
// const [editData, setEditData] = useState(null);
//   const handleUploadClick = () => {
//     fileInputRef.current.click();
//   };

//   const handleFileChange = (event) => {
//     const selectedFile = event.target.files[0];
//     if (selectedFile) {
//       console.log('File selected:', selectedFile.name);
//     }

// const handleEditClick = (rowData) => {
//   setEditData(rowData);
//   setIsModalOpen(true);
// };

// const handleModalClose = () => {
//   setIsModalOpen(false);
//   setEditData(null);
// };

// const handleSaveChanges = () => {
//   console.log("Saving changes:", editData);
//   setIsModalOpen(false);
// };

//   };
//   return (
// <div className="flex min-h-screen xl:w-full lg:w-[700px] md:w-[460px] w-80 p-0">
//   <div className="flex-1 p-6 bg-gray-50 overflow-auto">
//     <div className="flex lg:flex-row flex-col justify-between items-center mb-6">
//       <h1 className="text-2xl font-bold">Job Calculator</h1>
//       <div className="flex items-center justify-center space-x-4 h-[50px] mt-4 md:mt-0">
//         <div className="relative w-full max-w-[238px]">
//           <img
//             src={searchIcon}
//             alt="Search Icon"
//             className="absolute inset-y-0 left-0 pl-3 mt-3 flex items-center pointer-events-none"
//           />
//           <input
//             type="text"
//             placeholder="Search Job"
//             className="border border-gray-300 rounded-lg py-2 pl-10 pr-4 w-full"
//           />
//         </div>
//         <button className="bg-[#7234D7] text-white xl:px-4 xl:py-2 px-2 py-1 rounded-md xl:text-base text-sm">
//           Clone Job Calculator
//         </button>
//         <button
//           className="bg-[#7234D7] text-white xl:px-4 xl:py-2 px-2 py-1 rounded-md xl:text-base text-sm"
//           onClick={handleUploadClick}
//         >
//           Upload File
//         </button>
//         <input
//           type="file"
//           ref={fileInputRef}
//           onChange={handleFileChange}
//           style={{ display: 'none' }}
//         />
//       </div>
//     </div>

//     <div className='bg-white shadow-md rounded-lg p-4'>
//       <div className="flex xl:flex-row flex-col md:gap-3 gap-2 justify-between items-center mb-6">
//         <div className="flex items-center space-x-4">
//           <div className="flex items-center">
//             <span className="mr-2 text-[#666666]">Show</span>
//             <select className="border border-[#666666] rounded-lg xl:py-2 xl:px-3 px-2 py-1">
//               <option value="24">24</option>
//               <option value="50">50</option>
//               <option value="100">100</option>
//             </select>
//             <span className="lg:ml-2 lg:mr-4  text-[#666666]">Entities</span>
//           </div>
//         </div>
//         <div className='flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2'>
//           <button className="bg-[#7234D7] border border-[#666666] text-white xl:px-4 xl:py-2 px-2 py-1 rounded-lg flex items-center justify-center gap-2 xl:text-base text-sm">
//             <img src={listView} alt='listView' />List View
//           </button>
//           <button className="border border-[#B3B3B3] px-4 py-2 rounded-lg flex items-center justify-center gap-2 xl:text-base text-sm">
//             <img src={kanbanView} alt='kanbanView' />Kanban View
//           </button>
//           <button className="border border-[#B3B3B3] px-4 py-2 rounded-lg flex items-center justify-center gap-2 xl:text-base text-sm">
//             <img src={filter} alt='filter' />Filter
//           </button>
//           <button className="border border-[#B3B3B3] px-4 py-2 rounded-lg flex items-center justify-center gap-2 xl:text-base text-sm">
//             <img src={calender} alt='calendar' />September 2024
//             <img src={filterDropdown} alt='filterDropdown' />
//           </button>
//         </div>
//       </div>

//           <div className="bg-white overflow-hidden w-full h-full">
//             <div className="max-h-[500px] overflow-y-auto w-full">
//               <table className="min-w-full table-auto divide-y divide-gray-200">
//                 <thead className="bg-[#F4F7F9] rounded-xl">
//                   <tr>
//                     {['Id', 'Room', 'Width', 'Height', 'Type', 'Panel', 'Quantity', 'Price', 'Additional Labor', 'Total Labor'].map((header) => (
//                       <th key={header} className="py-2 px-4 text-center text-sm font-medium tracking-wider">
//                         {header}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {[...Array(10)].map((_, idx) => (
//                     <tr key={idx} className={idx % 2 !== 0 ? 'bg-gray-100' : ''}>
//                       <td className="px-6 py-4 whitespace-nowrap">01</td>
//                       <td className="px-6 py-4 whitespace-nowrap">001</td>
//                       <td className="px-6 py-4 whitespace-nowrap">001</td>
//                       <td className="px-6 py-4 whitespace-nowrap">001</td>
//                       <td className="px-6 py-4 whitespace-nowrap w-80">
//                         <select className="form-select px-4 py-2 rounded-md w-80 border border-gray-300">
//                           <option value="single-hung">ES-EL100 - Single Hung</option>
//                           <option value="horizontal-roller">ES-EL200 - HORIZONTAL ROLLER</option>
//                           <option value="horizontal-roller-xox">ES-EL200 - HORIZONTAL ROLLER XOX</option>
//                           <option value="sliding-glass-door">ES-EL400 - SLIDING GLASS DOOR</option>
//                           <option value="swing-door-single">ES-EL300 - SWING DOOR - SINGLE LEAF</option>
//                           <option value="swing-door-double">ES-EL300 - SWING DOOR - DOUBLE LEAF</option>
//                           <option value="fixed-window">ES-EL150 SHAPE - FIXED WINDOW</option>
//                           <option value="mullion">MULLION</option>
//                           <option value="swing-door-side-lite">ES-EL300 - SWING DOOR - SINGLE LEAF with Side Lite</option>
//                           <option value="swing-door-double-side-lite">ES-EL300 - SWING DOOR - DOUBLE LEAF with side Lite</option>
//                           <option value="swing-door-double-2-side-lites">ES-EL300 - SWING DOOR - DOUBLE LEAF with 2 Side Lites</option>
//                         </select>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">OX</td>
//                       <td className="px-6 py-4 whitespace-nowrap">001</td>
//                       <td className="px-6 py-4 whitespace-nowrap">180</td>
//                       <td className="px-6 py-4 whitespace-nowrap">-----</td>
//                       <td className="px-6 py-4 whitespace-nowrap">001</td>
//                     </tr>
//                   ))}
//                 </tbody>
//                 <tfoot>
//                   <tr>
//                     <td colSpan="8" className="px-6 py-4 text-right font-bold">Total Price</td>
//                     <td colSpan="2" className="px-6 py-4 text-right font-bold">
//                       Total Labor
//                     </td>
//                   </tr>
//                 </tfoot>
//               </table>
//             </div>
//           </div>

//         </div>
// <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 mt-3">
//   {['municipality', 'contract Total', 'engineering Cost', 'commissionable Amount', 'permit',
//     'labor Cost', 'credit Card Fees', 'material Amount', 'shutter Cost', 'material Tax',
//     'caulking Screws', 'commission Percentage', 'scaffold', 'commission Amount', 'miscellaneous',
//     'profit Percentage', 'water', 'job Profit'].map((label, idx) => (
//       <div key={idx} className="flex flex-col">
//         <label className="text-sm text-gray-700 capitalize font-semibold">{label}</label>
//         <input
//           type="text"
//           placeholder="Enter value"
//           className="border border-gray-300 rounded-lg py-2 px-4 mt-1"
//         />
//       </div>
//     ))}
// </div>
//       </div>
//     </div>
//   );
// };

// export default JobCalculator;


import React, { useState, useRef } from 'react';
import searchIcon from "../../assets/search.svg";
import listView from "../../assets/listView.svg";
import kanbanView from "../../assets/kanbanView.svg";
import filter from "../../assets/filter.svg";
import filterDropdown from "../../assets/filter-dropdown.svg";
import calender from "../../assets/calender.svg";
import editIcon from "../../assets/edit-icon.svg";

const JobCalculator = () => {
  const fileInputRef = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      console.log('File selected:', selectedFile.name);
    }
  };

  const handleEditClick = (rowData) => {
    setEditData(rowData);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditData(null);
  };

  const handleSaveChanges = () => {
    console.log("Saving changes:", editData);
    setIsModalOpen(false);
  };


  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    municipality: '',
    contractTotal: '',
    engineeringCost: '',
    commissionableAmount: '',
    permit: '',
    laborCost: '',
    creditCardFees: '',
    materialAmount: '',
    shutterCost: '',
    materialTax: '',
    caulkingScrews: '',
    commissionPercentage: '',
    scaffold: '',
    commissionAmount: '',
    miscellaneous: '',
    profitPercentage: '',
    water: '',
    jobProfit: '',
  });

  const handleSaveChange = () => {
    // You can also handle data saving logic here
    setIsEditing(false); // Exit edit mode
  };

  return (
    <div className="flex min-h-screen xl:w-full lg:w-[700px] md:w-[460px] w-80 p-0 lg:mt-0 mt-4">
      <div className="flex-1 p-6 bg-gray-50 overflow-auto">
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
              style={{ display: 'none' }}
            />
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

          <div className='bg-white shadow-md rounded-lg p-4'>
            <div className="bg-white overflow-hidden w-full h-full">
              <div className="max-h-[500px] overflow-y-auto w-full">
                <table className="min-w-full table-auto divide-y divide-gray-200">
                  <thead className="bg-[#F4F7F9] rounded-xl">
                    <tr>
                      {['Id', 'Room', 'Width', 'Height', 'Type', 'Panel', 'Quantity', 'Price', 'Additional Labor', 'Total Labor', 'Edit'].map((header) => (
                        <th key={header} className="py-2 px-4 text-center text-sm font-medium tracking-wider">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[...Array(10)].map((_, idx) => (
                      <tr key={idx} className={idx % 2 !== 0 ? 'bg-gray-100' : ''}>
                        <td className="px-3 py-4 whitespace-nowrap">01</td>
                        <td className="px-3 py-4 whitespace-nowrap">001</td>
                        <td className="px-3 py-4 whitespace-nowrap">001</td>
                        <td className="px-3 py-4 whitespace-nowrap">001</td>
                        <td className="px-3 py-4 whitespace-nowrap w-80">
                          <select className="form-select px-4 py-2 rounded-md w-80 border border-gray-300">
                            <option value="single-hung">ES-EL100 - Single Hung</option>
                            <option value="horizontal-roller">ES-EL200 - HORIZONTAL ROLLER</option>
                            <option value="horizontal-roller-xox">ES-EL200 - HORIZONTAL ROLLER XOX</option>
                            <option value="sliding-glass-door">ES-EL400 - SLIDING GLASS DOOR</option>
                            <option value="swing-door-single">ES-EL300 - SWING DOOR - SINGLE LEAF</option>
                            <option value="swing-door-double">ES-EL300 - SWING DOOR - DOUBLE LEAF</option>
                            <option value="fixed-window">ES-EL150 SHAPE - FIXED WINDOW</option>
                            <option value="mullion">MULLION</option>
                            <option value="swing-door-side-lite">ES-EL300 - SWING DOOR - SINGLE LEAF with Side Lite</option>
                            <option value="swing-door-double-side-lite">ES-EL300 - SWING DOOR - DOUBLE LEAF with side Lite</option>
                            <option value="swing-door-double-2-side-lites">ES-EL300 - SWING DOOR - DOUBLE LEAF with 2 Side Lites</option>
                          </select>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap">OX</td>
                        <td className="px-3 py-4 whitespace-nowrap">001</td>
                        <td className="px-3 py-4 whitespace-nowrap">180</td>
                        <td className="px-3 py-4 whitespace-nowrap">-----</td>
                        <td className="px-3 py-4 whitespace-nowrap">001</td>
                        <td className="px-3 py-4 whitespace-nowrap text-center">
                          <img
                            src={editIcon}
                            alt="Edit Icon"
                            className="cursor-pointer"
                            onClick={() => handleEditClick({ id: idx, room: '001', width: '001', height: '001', type: 'Single Hung' })}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {isModalOpen && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
              <div className="bg-white rounded-lg p-6 lg:w-1/2 w-2/3">
                <h2 className="text-xl font-bold mb-4">Edit Job Entry</h2>
                <div className="grid grid-cols-2 gap-4">
                  {['Room', 'Width', 'Height', 'Type', 'Panel', 'Quantity', 'Price', 'Additional Labor', 'Total Labor'].map((label) => (
                    <div key={label} className="flex flex-col">
                      <label className="text-sm text-gray-700 capitalize font-semibold">{label}</label>
                      {label === 'Type' ? (
                        <select
                          value={editData ? editData[label.toLowerCase()] : ''}
                          onChange={(e) => setEditData({ ...editData, [label.toLowerCase()]: e.target.value })}
                          className="border border-gray-300 rounded-lg py-2 px-4 mt-1"
                        >
                          <option value="single-hung">ES-EL100 - Single Hung</option>
                          <option value="horizontal-roller">ES-EL200 - Horizontal Roller</option>
                          <option value="horizontal-roller-xox">ES-EL200 - Horizontal Roller XOX</option>
                          <option value="sliding-glass-door">ES-EL400 - Sliding Glass Door</option>
                          <option value="swing-door-single">ES-EL300 - Swing Door - Single Leaf</option>
                          <option value="swing-door-double">ES-EL300 - Swing Door - Double Leaf</option>
                          <option value="fixed-window">ES-EL150 Shape - Fixed Window</option>
                          <option value="mullion">Mullion</option>
                          <option value="swing-door-side-lite">ES-EL300 - Swing Door - Single Leaf with Side Lite</option>
                          <option value="swing-door-double-side-lite">ES-EL300 - Swing Door - Double Leaf with Side Lite</option>
                          <option value="swing-door-double-2-side-lites">ES-EL300 - Swing Door - Double Leaf with 2 Side Lites</option>
                        </select>
                      ) : (
                        <input
                          type="text"
                          value={editData ? editData[label.toLowerCase()] : ''}
                          onChange={(e) => setEditData({ ...editData, [label.toLowerCase()]: e.target.value })}
                          className="border border-gray-300 rounded-lg py-2 px-4 mt-1"
                        />
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    className="border border-[#747474] text-[#747474] px-4 py-2 rounded-lg mr-2"
                    onClick={handleModalClose}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-[#7234D7] text-white px-4 py-2 rounded-lg"
                    onClick={handleSaveChanges}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div>
          <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 mt-3">
            {['municipality', 'contractTotal', 'engineeringCost', 'commissionableAmount', 'permit',
              'laborCost', 'creditCardFees', 'materialAmount', 'shutterCost', 'materialTax',
              'caulkingScrews', 'commissionPercentage', 'scaffold', 'commissionAmount', 'miscellaneous',
              'profitPercentage', 'water', 'jobProfit'].map((label, idx) => (
                <div key={idx} className="flex flex-col">
                  <label className="text-sm text-gray-700 capitalize font-semibold">{label}</label>
                  {isEditing ? (
                    <input
                      type="text"
                      placeholder="Enter value"
                      value={formData[label.toLowerCase()]}
                      onChange={(e) => setFormData({ ...formData, [label.toLowerCase()]: e.target.value })}
                      className="border border-gray-300 rounded-lg py-2 px-4 mt-1"
                    />
                  ) : (
                    <span className="py-2 px-4 border border-gray-300 rounded-lg mt-1 text-gray-700">{formData[label.toLowerCase()] || 'Enter Value'}</span>
                  )}
                </div>
              ))}
          </div>

          <div className='flex items-center gap-4 mt-5'>
            {isEditing ? (
              <>
                <button
                  className="bg-[#7234D7] text-white px-4 py-2 rounded"
                  onClick={handleSaveChange}
                >
                  Save Changes
                </button>
              </>
            ) : (
              <button className='flex items-center gap-2 border border-gray-400 rounded px-5 py-2' onClick={() => setIsEditing(true)}>
                <img src={editIcon} alt='edit icon' /> <span className='text-[#7234D7]'>Edit</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default JobCalculator;
