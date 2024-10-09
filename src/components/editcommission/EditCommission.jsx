import React, { useState, useEffect } from 'react';
import backIcon from "../../assets/back-icon.svg";
import { useNavigate, useLocation } from 'react-router-dom';

const EditCommission = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { commission } = location.state || {}
  const [formData, setFormData] = useState({
    customerName: commission?.customerName || '',
    address: commission?.address || '',
    phoneNo: commission?.phoneNo || '',
    email: commission?.email || '',
    dealName: commission?.dealName || '',
    dealOwner: commission?.dealOwner || '',
    jobStage: commission?.jobStage || '',
    commissionAmount: commission?.commissionAmount || '',
    firstPay: commission?.firstPay || '',
    status: commission?.status || '',
    depositAmount: commission?.depositAmount || '',
    backendPay: commission?.backendPay || '',
    jobCosting: commission?.jobCosting || '',
    notes: commission?.notes || '',
  });

  const handleTask = () => {
    navigate('/financials/commissions');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted', formData);
  };

  useEffect(() => {
    if (commission) {
      setFormData({
        customerName: commission.customerName || '',
        address: commission.address || '',
        phoneNo: commission.phoneNo || '',
        email: commission.email || '',
        dealName: commission.dealName || '',
        dealOwner: commission.dealOwner || '',
        jobStage: commission.jobStage || '',
        commissionAmount: commission.commissionAmount || '',
        firstPay: commission.firstPay || '',
        status: commission.status || '',
        depositAmount: commission.depositAmount || '',
        backendPay: commission.backendPay || '',
        jobCosting: commission.jobCosting || '',
        notes: commission.notes || '',
      });
    }
  }, [commission]);

  const initialData = [
    { detail: 'Labor Cost', actual: '$7200', expected: '$7200' },
    { detail: 'Material Cost w Tax', actual: '$7200', expected: '$7200' },
    { detail: 'Caulking/Screws', actual: '$7200', expected: '$7200' },
    { detail: 'Mulls', actual: '$7200', expected: '$7200' },
    { detail: 'Measurements (Clearview)', actual: '$7200', expected: '$7200' },
    { detail: 'Commission', actual: '$7200', expected: '$7200' },
    { detail: 'Permit', actual: '$7200', expected: '$7200' },
    { detail: 'Engineering', actual: '$7200', expected: '$7200' },
    { detail: 'Scaffold', actual: '$7200', expected: '$7200' },
    { detail: 'Home Depot', actual: '$7200', expected: '$7200' },
    { detail: 'Air BN/Hotel fees', actual: '$7200', expected: '$7200' },
    { detail: 'Total Cost', actual: '$7200', expected: '$7200' },
    { detail: 'Profit', actual: '$7200', expected: '$7200' },
    { detail: 'Percentage Profit', actual: '$7200', expected: '$7200' },
  ];

  const [data, setData] = useState(initialData);
  const [editIndex, setEditIndex] = useState(null);
  const [editField, setEditField] = useState(null);
  const [editedValue, setEditedValue] = useState('');

  const handleEdit = (index, field) => {
    setEditIndex(index);
    setEditField(field);
    setEditedValue(data[index][field]);
  };

  const handleChange = (e) => {
    setEditedValue(e.target.value);
  };

  const handleKeyDown = (e, index, field) => {
    if (e.key === 'Enter') {
      const updatedData = [...data];
      updatedData[index] = {
        ...updatedData[index],
        [field]: editedValue,
      };
      setData(updatedData);
      setEditIndex(null);
      setEditField(null);
    }
  };

  return (
    <div className="w-full mx-auto p-6 pt-0 lg:mt-0 mt-4">
      <div className="flex lg:flex-row flex-col justify-between items-center mb-6">
        <div className="flex gap-2">
          <img src={backIcon} alt="back-icon" className="cursor-pointer" onClick={handleTask} />
          <h1 className="text-2xl font-bold">Edit Commission Details</h1>
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
            <h2 className="text-2xl font-semibold">Commission Details</h2>
          </div>
          <hr className="text-[#D1D1D1]" />

          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Job Name</label>
              <input
                type="text"
                name="jobName"
                placeholder="Placeholder"
                className="block w-full px-4 py-2 border rounded-md shadow-sm border-[#CDCDCD] placeholder:text-[#808080] mt-2"
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Job Amount</label>
              <input
                type="text"
                name="jobAmount"
                placeholder="Placeholder"
                className="block w-full px-4 py-2 border rounded-md shadow-sm border-[#CDCDCD] placeholder:text-[#808080] mt-2"
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Installation Start</label>
              <input
                type="text"
                name="installationStart"
                placeholder="Placeholder"
                className="block w-full px-4 py-2 border rounded-md shadow-sm border-[#CDCDCD] placeholder:text-[#808080] mt-2"
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Installation End</label>
              <input
                type="text"
                name="installationEnd"
                placeholder="Placeholder"
                className="block w-full px-4 py-2 border rounded-md shadow-sm border-[#CDCDCD] placeholder:text-[#808080] mt-2"
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Installer</label>
              <input
                type="text"
                name="installer"
                placeholder="Placeholder"
                className="block w-full px-4 py-2 border rounded-md shadow-sm border-[#CDCDCD] placeholder:text-[#808080] mt-2"
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Commission Percentage</label>
              <input
                type="text"
                name="commissionPerc"
                placeholder="Placeholder"
                className="block w-full px-4 py-2 border rounded-md shadow-sm border-[#CDCDCD] placeholder:text-[#808080] mt-2"
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Invoicing Status</label>
              <input
                type="text"
                name="invoiceStatus"
                placeholder="Placeholder"
                className="block w-full px-4 py-2 border rounded-md shadow-sm border-[#CDCDCD] placeholder:text-[#808080] mt-2"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </form>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg p-6 mt-4">
        <table className="min-w-full bg-white">
          <thead className="rounded-lg">
            <tr>
              <th className="py-2 px-4 text-left bg-[#F4F7F9]">Details</th>
              <th className="py-2 px-4 text-left bg-[#F4F7F9]">Actual</th>
              <th className="py-2 px-4 text-left bg-[#F4F7F9]">Expected</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className={`hover:bg-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                <td className="py-4 px-4">{item.detail}</td>
                <td className="py-4 px-4">
                  {editIndex === index && editField === 'actual' ? (
                    <input
                      type="text"
                      value={editedValue}
                      onChange={handleChange}
                      onKeyDown={(e) => handleKeyDown(e, index, 'actual')}
                      className="border border-gray-300 rounded px-2 w-16"
                      autoFocus
                    />
                  ) : (
                    <span onClick={() => handleEdit(index, 'actual')} className="cursor-pointer">
                      {item.detail === 'Total Cost' || item.detail === 'Profit' || item.detail === 'Percentage Profit' ? (
                        <strong>{item.actual}</strong>
                      ) : (
                        item.actual
                      )}
                    </span>
                  )}
                </td>
                <td className="py-4 px-4">
                  {editIndex === index && editField === 'expected' ? (
                    <input
                      type="text"
                      value={editedValue}
                      onChange={handleChange}
                      onKeyDown={(e) => handleKeyDown(e, index, 'expected')}
                      className="border border-gray-300 rounded px-2 w-16"
                      autoFocus
                    />
                  ) : (
                    <span onClick={() => handleEdit(index, 'expected')} className="cursor-pointer">
                      {item.detail === 'Total Cost' || item.detail === 'Profit' || item.detail === 'Percentage Profit' ? (
                        <strong>{item.expected}</strong>
                      ) : (
                        item.expected
                      )}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mt-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Commission Overages Amount</label>
              <input
                type="text"
                name="commissionOverages"
                placeholder="Placeholder"
                className="block w-full px-4 py-2 border rounded-md shadow-sm border-[#CDCDCD] placeholder:text-[#808080] mt-2"
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <input
                type="text"
                name="overagesStatus"
                placeholder="Placeholder"
                className="block w-full px-4 py-2 border rounded-md shadow-sm border-[#CDCDCD] placeholder:text-[#808080] mt-2"
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Date Paid</label>
              <input
                type="text"
                name="overagesDate"
                placeholder="Placeholder"
                className="block w-full px-4 py-2 border rounded-md shadow-sm border-[#CDCDCD] placeholder:text-[#808080] mt-2"
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Commission Deduction Amount</label>
              <input
                type="text"
                name="commissionDeduct"
                placeholder="Placeholder"
                className="block w-full px-4 py-2 border rounded-md shadow-sm border-[#CDCDCD] placeholder:text-[#808080] mt-2"
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <input
                type="text"
                name="deductStatus"
                placeholder="Placeholder"
                className="block w-full px-4 py-2 border rounded-md shadow-sm border-[#CDCDCD] placeholder:text-[#808080] mt-2"
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Date Paid</label>
              <input
                type="text"
                name="deductDate"
                placeholder="Placeholder"
                className="block w-full px-4 py-2 border rounded-md shadow-sm border-[#CDCDCD] placeholder:text-[#808080] mt-2"
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Deposit Commission Amount</label>
              <input
                type="text"
                name="depositCommission"
                placeholder="Placeholder"
                className="block w-full px-4 py-2 border rounded-md shadow-sm border-[#CDCDCD] placeholder:text-[#808080] mt-2"
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <input
                type="text"
                name="depositStatus"
                placeholder="Placeholder"
                className="block w-full px-4 py-2 border rounded-md shadow-sm border-[#CDCDCD] placeholder:text-[#808080] mt-2"
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Date Paid</label>
              <input
                type="text"
                name="depositDate"
                placeholder="Placeholder"
                className="block w-full px-4 py-2 border rounded-md shadow-sm border-[#CDCDCD] placeholder:text-[#808080] mt-2"
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Installation Commission Pay</label>
              <input
                type="text"
                name="installationCommission"
                placeholder="Placeholder"
                className="block w-full px-4 py-2 border rounded-md shadow-sm border-[#CDCDCD] placeholder:text-[#808080] mt-2"
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <input
                type="text"
                name="installationStatus"
                placeholder="Placeholder"
                className="block w-full px-4 py-2 border rounded-md shadow-sm border-[#CDCDCD] placeholder:text-[#808080] mt-2"
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Date Paid</label>
              <input
                type="text"
                name="installationDate"
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

export default EditCommission;



// import React, { useState, useEffect } from 'react';
// import backIcon from "../../assets/back-icon.svg";
// import del from "../../assets/delete.svg";
// import { useNavigate, useLocation } from 'react-router-dom';

// const EditCommission = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { commission } = location.state || {}
//   const [formData, setFormData] = useState({
//     customerName: commission?.customerName || '',
//     address: commission?.address || '',
//     phoneNo: commission?.phoneNo || '',
//     email: commission?.email || '',
//     dealName: commission?.dealName || '',
//     dealOwner: commission?.dealOwner || '',
//     jobStage: commission?.jobStage || '',
//     commissionAmount: commission?.commissionAmount || '',
//     firstPay: commission?.firstPay || '',
//     status: commission?.status || '',
//     depositAmount: commission?.depositAmount || '',
//     backendPay: commission?.backendPay || '',
//     jobCosting: commission?.jobCosting || '',
//     notes: commission?.notes || '',
//   });

//   const handleTask = () => {
//     navigate('/financials/commissions');
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Form submitted', formData);
//   };

//   useEffect(() => {
//     if (commission) {
//       setFormData({
//         customerName: commission.customerName || '',
//         address: commission.address || '',
//         phoneNo: commission.phoneNo || '',
//         email: commission.email || '',
//         dealName: commission.dealName || '',
//         dealOwner: commission.dealOwner || '',
//         jobStage: commission.jobStage || '',
//         commissionAmount: commission.commissionAmount || '',
//         firstPay: commission.firstPay || '',
//         status: commission.status || '',
//         depositAmount: commission.depositAmount || '',
//         backendPay: commission.backendPay || '',
//         jobCosting: commission.jobCosting || '',
//         notes: commission.notes || '',
//       });
//     }
//   }, [commission]);


//   const handleDelete = () => {
//     setFormData({
//       customerName: '',
//       address: '',
//       phoneNo: '',
//       email: '',
//       dealName: '',
//       dealOwner: '',
//       jobStage: '',
//       commissionAmount: '',
//       firstPay: '',
//       status: '',
//       depositAmount: '',
//       backendPay: '',
//       jobCosting: '',
//       notes: '',
//     });
//   };

//   return (
//     <div className="w-full mx-auto p-6 pt-0 lg:mt-0 mt-4">
//       <div className="flex lg:flex-row flex-col justify-between items-center mb-6">
//         <div className="flex gap-2">
//           <img src={backIcon} alt="back-icon" className="cursor-pointer" onClick={handleTask} />
//           <h1 className="text-2xl font-bold">Edit Commission Details</h1>
//         </div>
//         <div className="flex items-center justify-center space-x-4 h-[50px] mt-4 md:mt-0">
//           <div className="flex justify-end space-x-4">
//             <button className="border border-[#747474] text-[#747474] px-8 py-2 rounded">
//               Cancel
//             </button>
//             <button className="border border-[#CDCDCD] bg-[#7234D7] text-white px-10 py-2 rounded">
//               Save
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="bg-white shadow-md rounded-lg p-6">
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-2xl font-semibold">Commission Details</h2>
//             <img src={del} alt="del-icon" className="cursor-pointer" onClick={handleDelete} />
//           </div>
//           <hr className="text-[#D1D1D1]" />

//           <div className="grid grid-cols-3 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Customer Name</label>
//               <input
//                 type="text"
//                 name="customerName"
//                 placeholder="Placeholder"
//                 value={formData.customerName}
//                 className="block w-full px-4 py-2 border rounded-md shadow-sm border-[#CDCDCD] placeholder:text-[#808080] mt-2"
//                 onChange={handleInputChange}
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">Address</label>
//               <input
//                 type="text"
//                 name="address"
//                 placeholder="Placeholder"
//                 value={formData.address}
//                 className="block w-full px-4 py-2 border rounded-md shadow-sm border-[#CDCDCD] placeholder:text-[#808080] mt-2"
//                 onChange={handleInputChange}
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">Phone Number</label>
//               <input
//                 type="text"
//                 name="phoneNo"
//                 placeholder="Placeholder"
//                 value={formData.phoneNo}
//                 className="block w-full px-4 py-2 border rounded-md shadow-sm border-[#CDCDCD] placeholder:text-[#808080] mt-2"
//                 onChange={handleInputChange}
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">Email</label>
//               <input
//                 type="text"
//                 name="email"
//                 placeholder="Placeholder"
//                 value={formData.email}
//                 className="block w-full px-4 py-2 border rounded-md shadow-sm border-[#CDCDCD] placeholder:text-[#808080] mt-2"
//                 onChange={handleInputChange}
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">Deal Name</label>
//               <input
//                 type="text"
//                 name="dealName"
//                 placeholder="Placeholder"
//                 value={formData.dealName}
//                 className="block w-full px-4 py-2 border rounded-md shadow-sm border-[#CDCDCD] placeholder:text-[#808080] mt-2"
//                 onChange={handleInputChange}
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">Deal Owner</label>
//               <input
//                 type="text"
//                 name="dealOwner"
//                 placeholder="Placeholder"
//                 value={formData.dealOwner}
//                 className="block w-full px-4 py-2 border rounded-md shadow-sm border-[#CDCDCD] placeholder:text-[#808080] mt-2"
//                 onChange={handleInputChange}
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">Job Stage</label>
//               <input
//                 type="text"
//                 name="jobStage"
//                 placeholder="Placeholder"
//                 value={formData.jobStage}
//                 className="block w-full px-4 py-2 border rounded-md shadow-sm border-[#CDCDCD] placeholder:text-[#808080] mt-2"
//                 onChange={handleInputChange}
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">Commission Amount</label>
//               <input
//                 type="text"
//                 name="commissionAmount"
//                 placeholder="Placeholder"
//                 value={formData.commissionAmount}
//                 className="block w-full px-4 py-2 border rounded-md shadow-sm border-[#CDCDCD] placeholder:text-[#808080] mt-2"
//                 onChange={handleInputChange}
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">First Payment Amount</label>
//               <input
//                 type="text"
//                 name="firstPay"
//                 placeholder="Placeholder"
//                 value={formData.firstPay}
//                 className="block w-full px-4 py-2 border rounded-md shadow-sm border-[#CDCDCD] placeholder:text-[#808080] mt-2"
//                 onChange={handleInputChange}
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">First Payment Status</label>
//               <select
//                 name="status"
//                 value={formData.status}
//                 className="block w-full px-4 py-2 border rounded-md shadow-sm border-[#CDCDCD] placeholder:text-[#808080] mt-2"
//                 onChange={handleInputChange}
//               >
//                 <option>Select Status</option>
//                 <option value="In Progress">In Progress</option>
//                 <option value="Completed">Completed</option>
//                 <option value="Pending">Pending</option>
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">Deposit Payment Amount</label>
//               <input
//                 type="text"
//                 name="depositAmount"
//                 placeholder="Placeholder"
//                 value={formData.depositAmount}
//                 className="block w-full px-4 py-2 border rounded-md shadow-sm border-[#CDCDCD] placeholder:text-[#808080] mt-2"
//                 onChange={handleInputChange}
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">Backend Payment Status</label>
//               <input
//                 type="text"
//                 name="backendPay"
//                 placeholder="Placeholder"
//                 value={formData.backendPay}
//                 className="block w-full px-4 py-2 border rounded-md shadow-sm border-[#CDCDCD] placeholder:text-[#808080] mt-2"
//                 onChange={handleInputChange}
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">Job Costing</label>
//               <input
//                 type="text"
//                 name="jobCosting"
//                 placeholder="Placeholder"
//                 value={formData.jobCosting}
//                 className="block w-full px-4 py-2 border rounded-md shadow-sm border-[#CDCDCD] placeholder:text-[#808080] mt-2"
//                 onChange={handleInputChange}
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">Job Notes</label>
//               <input
//                 name="notes"
//                 placeholder="Placeholder"
//                 value={formData.notes}
//                 className="block w-full px-4 py-2 border rounded-md shadow-sm border-[#CDCDCD] placeholder:text-[#808080] mt-2"
//                 onChange={handleInputChange}
//               />
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditCommission;