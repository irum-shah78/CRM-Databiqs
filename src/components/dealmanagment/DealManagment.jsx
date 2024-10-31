// import React from "react";
// import { useNavigate } from "react-router-dom";
// import searchIcon from "../../assets/search.svg";
// import listView from "../../assets/listView.svg";
// import kanbanView from "../../assets/kanbanView.svg";
// import filter from "../../assets/filter.svg";
// import filterDropdown from "../../assets/filter-dropdown.svg";
// import calender from "../../assets/calender.svg";

// const DealManagment = () => {
//   const navigate = useNavigate();
//   const handleJobCalcClick = () => {
//     navigate("/jobcalcdetails");
//   };

//   return (
//     <div className="flex min-h-screen xl:w-full lg:w-[850px] md:w-[650px] w-80 lg:p-0 lg:mt-0 mt-4">
//       <div className="flex-1 p-6 bg-gray-50 overflow-auto pt-0">
//         <div className="flex lg:flex-row flex-col justify-between items-center mb-6">
//           <h1 className="text-2xl font-bold">Deal Managment</h1>
//           <div className="flex items-center justify-center space-x-4 h-[50px] mt-4 md:mt-0">
//             <div className="relative w-full max-w-[238px]">
//               <img
//                 src={searchIcon}
//                 alt="Search Icon"
//                 className="absolute inset-y-0 left-0 pl-3 mt-3 flex items-center pointer-events-none"
//               />
//               <input
//                 type="text"
//                 placeholder="Search Deals"
//                 className="border border-gray-300 rounded-lg py-2 pl-10 pr-4 w-full"
//               />
//             </div>
//             <button className="bg-[#7234D7] text-white xl:px-4 xl:py-2 px-2 py-1 rounded-md xl:text-base text-sm">
//               Add Deals
//             </button>
//           </div>
//         </div>

//         <div className="bg-white shadow-md rounded-lg p-4">
//           <div className="flex xl:flex-row flex-col md:gap-3 gap-2 justify-between items-center mb-6">
//             <div className="flex items-center space-x-4">
//               <div className="flex items-center">
//                 <span className="mr-2 text-[#666666]">Show</span>
//                 <select className="border border-[#666666] rounded-lg xl:py-2 xl:px-3 px-2 py-1">
//                   <option value="24">24</option>
//                   <option value="50">50</option>
//                   <option value="100">100</option>
//                 </select>
//                 <span className="lg:ml-2 lg:mr-4  text-[#666666]">
//                   Entities
//                 </span>
//               </div>
//             </div>
//             <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
//               <button className="bg-[#7234D7] border border-[#666666] text-white xl:px-4 xl:py-2 px-2 py-1 rounded-lg flex items-center justify-center gap-2 xl:text-base text-sm">
//                 <img src={listView} alt="listView" />
//                 List View
//               </button>
//               <button className="border border-[#B3B3B3] px-4 py-2 rounded-lg flex items-center justify-center gap-2 xl:text-base text-sm">
//                 <img src={kanbanView} alt="kanbanView" />
//                 Kanban View
//               </button>
//               <button className="border border-[#B3B3B3] px-4 py-2 rounded-lg flex items-center justify-center gap-2 xl:text-base text-sm">
//                 <img src={filter} alt="filter" />
//                 Filter
//               </button>
//               <button className="border border-[#B3B3B3] px-4 py-2 rounded-lg flex items-center justify-center gap-2 xl:text-base text-sm">
//                 <img src={calender} alt="calendar" />
//                 September 2024
//                 <img src={filterDropdown} alt="filterDropdown" />
//               </button>
//             </div>
//           </div>

//           <div className="bg-white overflow-hidden w-full h-full">
//             <div className="max-h-[500px] overflow-y-auto w-full">
//               <table className="min-w-full table-auto divide-y divide-gray-200">
//                 <thead className="bg-[#F4F7F9] rounded-xl">
//                   <tr>
//                     {[
//                       "Id",
//                       "Deal Name",
//                       "Deal Stage",
//                       "Deal Owner",
//                       "Created Date",
//                       "Appointment Date",
//                       "Deal Address",
//                       "Description",
//                       "Action",
//                     ].map((header) => (
//                       <th
//                         key={header}
//                         className="py-2 px-4 text-center text-sm font-medium tracking-wider"
//                       >
//                         {header}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {[...Array(10)].map((_, idx) => (
//                     <tr
//                       key={idx}
//                       className={idx % 2 !== 0 ? "bg-gray-100" : ""}
//                     >
//                       <td className="px-6 py-4 text-center">01</td>
//                       <td className="px-6 py-4 text-center">Facebook</td>
//                       <td className="px-6 py-4 text-center text-[#EDBB06]">
//                         Negotiation
//                       </td>
//                       <td className="px-6 py-4 text-center">Daniel</td>
//                       <td className="px-6 py-4 text-center">Sept 24, 2024</td>
//                       <td className="px-6 py-4 text-center">Sept 24, 2024</td>
//                       <td className="px-6 py-4 text-center">Australia</td>
//                       <td className="px-6 py-4 text-center">Lorem..</td>
//                       <td className="px-6 py-4 text-center">
//                         <button
//                           className="px-3 py-2 bg-[#7234D7] text-white rounded-md"
//                           onClick={handleJobCalcClick}
//                         >
//                           Job Calc
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DealManagment;





import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios
import searchIcon from "../../assets/search.svg";
import listView from "../../assets/listView.svg";
import kanbanView from "../../assets/kanbanView.svg";
import filter from "../../assets/filter.svg";
import filterDropdown from "../../assets/filter-dropdown.svg";
import calender from "../../assets/calender.svg";

const DealManagement = ({ currentUser }) => {
  const [deals, setDeals] = useState([]); // State to store fetched deals
  const navigate = useNavigate();

  // Fetch deals on component mount
  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/users/${currentUser.email}/deals/`);
        setDeals(response.data); // Set the deals from response
      } catch (error) {
        console.error("Error fetching deals:", error);
      }
    };
    fetchDeals();
  }, [currentUser]);

  const handleJobCalcClick = () => {
    navigate("/jobcalcdetails");
  };

  return (
    <div className="flex min-h-screen xl:w-full lg:w-[850px] md:w-[650px] w-80 lg:p-0 lg:mt-0 mt-4">
      <div className="flex-1 p-6 bg-gray-50 overflow-auto pt-0">
        <div className="flex lg:flex-row flex-col justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Deal Management</h1>
          <div className="flex items-center justify-center space-x-4 h-[50px] mt-4 md:mt-0">
            <div className="relative w-full max-w-[238px]">
              <img src={searchIcon} alt="Search Icon" className="absolute inset-y-0 left-0 pl-3 mt-3 flex items-center pointer-events-none" />
              <input type="text" placeholder="Search Deals" className="border border-gray-300 rounded-lg py-2 pl-10 pr-4 w-full" />
            </div>
            <button className="bg-[#7234D7] text-white xl:px-4 xl:py-2 px-2 py-1 rounded-md xl:text-base text-sm">
              Add Deals
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
                <span className="lg:ml-2 lg:mr-4 text-[#666666]">Entities</span>
              </div>
            </div>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
              <button className="bg-[#7234D7] border border-[#666666] text-white xl:px-4 xl:py-2 px-2 py-1 rounded-lg flex items-center justify-center gap-2 xl:text-base text-sm">
                <img src={listView} alt="listView" /> List View
              </button>
              <button className="border border-[#B3B3B3] px-4 py-2 rounded-lg flex items-center justify-center gap-2 xl:text-base text-sm">
                <img src={kanbanView} alt="kanbanView" /> Kanban View
              </button>
              <button className="border border-[#B3B3B3] px-4 py-2 rounded-lg flex items-center justify-center gap-2 xl:text-base text-sm">
                <img src={filter} alt="filter" /> Filter
              </button>
              <button className="border border-[#B3B3B3] px-4 py-2 rounded-lg flex items-center justify-center gap-2 xl:text-base text-sm">
                <img src={calender} alt="calendar" /> September 2024
                <img src={filterDropdown} alt="filterDropdown" />
              </button>
            </div>
          </div>

          <div className="bg-white overflow-hidden w-full h-full">
            <div className="max-h-[500px] overflow-y-auto w-full">
              <table className="min-w-full table-auto divide-y divide-gray-200">
                <thead className="bg-[#F4F7F9] rounded-xl">
                  <tr>
                    {["Id", "Deal Name", "Deal Stage", "Deal Owner", "Created Date", "Appointment Date", "Deal Address", "Description", "Action"].map((header) => (
                      <th key={header} className="py-2 px-4 text-center text-sm font-medium tracking-wider">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {deals.map((deal, idx) => (
                    <tr key={deal.id} className={idx % 2 !== 0 ? "bg-gray-100" : ""}>
                      <td className="px-6 py-3 text-center">{deal.id}</td>
                      <td className="px-6 py-3 text-center">{deal.deal_name}</td>
                      <td className="px-6 py-3 text-center text-[#EDBB06]">{deal.deal_stage}</td>
                      <td className="px-6 py-3 text-center">{deal.deal_owner}</td>
                      <td className="px-6 py-3 text-center">{new Date(deal.created_date).toLocaleDateString()}</td>
                      <td className="px-6 py-3 text-center">{new Date(deal.appointment_date).toLocaleDateString()}</td>
                      <td className="px-6 py-3 text-center">{deal.deal_address}</td>
                      <td className="px-6 py-3 text-center">{deal.description}</td>
                      <td className="px-6 py-3 text-center">
                        <button className="px-2 py-2 bg-[#7234D7] text-white font-sm rounded-md" onClick={handleJobCalcClick}>
                          Job Calc
                        </button>
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

export default DealManagement;




// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import searchIcon from "../../assets/search.svg";
// import listView from "../../assets/listView.svg";
// import kanbanView from "../../assets/kanbanView.svg";
// import filter from "../../assets/filter.svg";
// import filterDropdown from "../../assets/filter-dropdown.svg";
// import calender from "../../assets/calender.svg";

// const DealManagment = ({ currentUser }) => {
//   const navigate = useNavigate();
//   const [deals, setDeals] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     dealName: "",
//     dealStage: "",
//     dealOwner: "",
//     appointmentDate: "",
//     dealAddress: "",
//     description: "",
//     createdDate:"",
//   });

//   const handleJobCalcClick = () => {
//     navigate("/jobcalcdetails");
//   };

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSaveDeal = async () => {
//     const dealData = {
//       deal_name: formData.dealName,
//       user_email: currentUser.email,
//       appointment_date: formData.appointmentDate,
//       deal_owner: formData.dealOwner,
//       deal_stage: formData.dealStage,
//       deal_address: formData.dealAddress,
//       description: formData.description,
//       created_date:formData.createdDate
//     };

//     try {
//       const response = await axios.post(
//         `http://localhost:8000/users/${currentUser.email}/deals/`,
//         dealData
//       );
//       const newDeal = response.data;
//       setDeals([...deals, newDeal]);
//       setIsModalOpen(false);
//       setFormData({
//         dealName: "",
//         dealStage: "",
//         dealOwner: "",
//         appointmentDate: "",
//         dealAddress: "",
//         description: "",
//         createdDate: "",
//       });
//     } catch (error) {
//       console.error("Error creating deal:", error);
//       console.log("Error details:", error.response?.data);
//     }
//   };

//   return (
//     <div className="flex min-h-screen xl:w-full lg:w-[850px] md:w-[650px] w-80 lg:p-0 lg:mt-0 mt-4">
//       <div className="flex-1 p-6 bg-gray-50 overflow-auto pt-0">
//         <div className="flex lg:flex-row flex-col justify-between items-center mb-6">
//           <h1 className="text-2xl font-bold">Deal Management</h1>
//           <div className="flex items-center justify-center space-x-4 h-[50px] mt-4 md:mt-0">
//             <div className="relative w-full max-w-[238px]">
//               <img
//                 src={searchIcon}
//                 alt="Search Icon"
//                 className="absolute inset-y-0 left-0 pl-3 mt-3 flex items-center pointer-events-none"
//               />
//               <input
//                 type="text"
//                 placeholder="Search Deals"
//                 className="border border-gray-300 rounded-lg py-2 pl-10 pr-4 w-full"
//               />
//             </div>
//             <button
//               onClick={() => setIsModalOpen(true)}
//               className="bg-[#7234D7] text-white xl:px-4 xl:py-2 px-2 py-1 rounded-md xl:text-base text-sm"
//             >
//               Add Deal
//             </button>
//           </div>
//         </div>

//         <div className="bg-white shadow-md rounded-lg p-4">
//           <table className="min-w-full table-auto divide-y divide-gray-200">
//             <thead className="bg-[#F4F7F9] rounded-xl">
//               <tr>
//                 {[
//                   "Id",
//                   "Deal Name",
//                   "Deal Stage",
//                   "Deal Owner",
//                   "Created Date",
//                   "Appointment Date",
//                   "Deal Address",
//                   "Description",
//                   "Action",
//                 ].map((header) => (
//                   <th key={header} className="py-2 px-4 text-center text-sm font-medium">
//                     {header}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {deals.map((deal, idx) => (
//                 <tr key={idx} className={idx % 2 !== 0 ? "bg-gray-100" : ""}>
//                   <td className="px-6 py-4 text-center">{deal.id}</td>
//                   <td className="px-6 py-4 text-center">{deal.deal_name}</td>
//                   <td className="px-6 py-4 text-center">{deal.deal_stage}</td>
//                   <td className="px-6 py-4 text-center">{deal.deal_owner}</td>
//                   <td className="px-6 py-4 text-center">{deal.created_date}</td>
//                   <td className="px-6 py-4 text-center">{deal.appointment_date}</td>
//                   <td className="px-6 py-4 text-center">{deal.deal_address}</td>
//                   <td className="px-6 py-4 text-center">{deal.description}</td>
//                   <td className="px-6 py-4 text-center">
//                     <button
//                       className="px-3 py-2 bg-[#7234D7] text-white rounded-md"
//                       onClick={handleJobCalcClick}
//                     >
//                       Job Calc
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {isModalOpen && (
//           <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//             <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
//               <h2 className="text-lg font-bold mb-4">Add New Deal</h2>
//               <form className="space-y-4">
//                 {["dealName", "dealStage", "dealOwner", "appointmentDate", "dealAddress", "description"].map((field) => (
//                   <input
//                     key={field}
//                     type="text"
//                     name={field}
//                     placeholder={field.replace(/([A-Z])/g, " $1")}
//                     value={formData[field]}
//                     onChange={handleInputChange}
//                     className="w-full border border-gray-300 rounded-lg px-3 py-2"
//                   />
//                 ))}
//                 <button
//                   type="button"
//                   onClick={handleSaveDeal}
//                   className="w-full bg-[#7234D7] text-white px-4 py-2 rounded-md"
//                 >
//                   Save Deal
//                 </button>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DealManagment;
