import React, { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import searchIcon from "../../assets/search.svg";
import listView from "../../assets/listView.svg";
import kanbanView from "../../assets/kanbanView.svg";
import filter from "../../assets/filter.svg";
import filterDropdown from "../../assets/filter-dropdown.svg";
import calender from "../../assets/calender.svg";
import editIcon from "../../assets/edit-icon.svg";
import Loader from '../../components/loader/Loader';

const LeadDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { lead } = location.state || {};

  const [newFields, setNewFields] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newFieldLabel, setNewFieldLabel] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);
  const [editingCell, setEditingCell] = useState({ row: null, column: null });
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(
    [...Array(24)].map((_, idx) => ({
      id: String(idx + 1).padStart(2, '0'),
      room: '001',
      width: '001',
      height: '001',
      type: '',
      panel: 'OX',
      quantity: '001',
      price: '180',
      additionalLabor: '-----',
      notes: 'notes',
      totalLabor: '001',
    }))
  );

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

  const [formData, setFormData] = useState({
    customTerms: '',
    customTermsNotes: '',
    termsSelection: '',
    typeOfStructure: '',
    constructionTypes: '',
    municipality: '',
    contractTotal: '',
    engineeringNeeded: '',
    engineeringCost: '',
    engineeringFees: '',
    commissionableAmount: '',
    permit: '',
    laborCost: '',
    creditCardFees: '',
    creditCardAmount: '',
    materialAmount: '',
    shutters: '',
    shutterCost: '',
    materialTax: '',
    caulkingAndScrews: '',
    commissionPercentage: '',
    scaffold: '',
    commissionAmount: '',
    miscellaneous: '',
    profitPercentage: '',
    water: '',
    jobProfit: '',
    financing: ''
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

  const headers = ['Id', 'Room', 'Width', 'Height', 'Type', 'Panel', 'Quantity', 'Price', 'Additional Labor', 'Notes', 'Total Labor'];

  const typeOptions = [
    ' ',
    'ES-EL100 - Single Hung',
    'ES-EL200 - HORIZONTAL ROLLER',
    'ES-EL200 - HORIZONTAL ROLLER XOX',
    'ES-EL400 - SLIDING GLASS DOOR',
    'ES-EL300 - SWING DOOR - SINGLE LEAF',
    'ES-EL300 - SWING DOOR - DOUBLE LEAF',
    'ES-EL150 SHAPE - FIXED WINDOW',
    'MULLION',
    'ES-EL300 - SWING DOOR - SINGLE LEAF with Side Lite',
    'ES-EL300 - SWING DOOR - DOUBLE LEAF with side Lite',
    'ES-EL300 - SWING DOOR - DOUBLE LEAF with 2 Side Lites',
  ];

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      setLoading(true);
      try {
        const response = await axios.post(
          'https://job-calculator-dan-01-hwa8c4czf7c6h5ec.westus-01.azurewebsites.net/uploadfile/',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        const extractedData = response.data;
        console.log('Extracted Data:', extractedData);
        if (extractedData) {
          const updatedData = extractedData.map((item, idx) => ({
            id: String(idx + 1).padStart(2, '0'),
            ...item,
            notes: item.notes || '0',
            totalLabor: item.totalLabor || '0',
          }));

          const totalRows = 24;
          const remainingRows = totalRows - updatedData.length;

          if (remainingRows > 0) {
            const defaultRows = [...Array(remainingRows)].map((_, idx) => ({
              id: String(updatedData.length + idx + 1).padStart(2, '0'),
              room: '001',
              width: '001',
              height: '001',
              type: '',
              panel: 'OX',
              quantity: '001',
              price: '180',
              additionalLabor: '-----',
              notes: 'notes',
              totalLabor: '001',
            }));

            setData([...updatedData, ...defaultRows]);
          } else {
            setData(updatedData);
          }
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSaveChange = () => {
    setIsEditing(false);
  };

  const handleCellClick = (rowIdx, column) => {
    if (column !== 'id') {
      setEditingCell({ row: rowIdx, column });
    }
  };

  const handleInputChangee = (e, rowIdx, column) => {
    const updatedData = [...data];
    updatedData[rowIdx][column] = e.target.value;
    setData(updatedData);
  };

  const handleBlur = () => {
    setEditingCell({ row: null, column: null });
  };

  const handleAddField = () => {
    setShowModal(true);
  };

  const handleConfirmAddField = () => {
    if (newFieldLabel) {
      setNewFields((prevFields) => [...prevFields, { label: newFieldLabel, value: '' }]);
      setNewFieldLabel('');
    }
    setShowModal(false);
  };

  return (
    // <div className="max-w-screen-md mx-auto p-6 rounded lg:mt-0 mt-4 bg-white xl:w-full lg:w-[700px] md:w-[460px] w-72">
    <div className="w-full p-6 rounded lg:mt-0 mt-4 mx-2 bg-white xl:w-full lg:w-[700px] md:w-[460px]">

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


      <div className="flex min-h-screen xl:w-full lg:w-[700px] md:w-[460px] w-80 p-0 mt-4">
        <div className="flex-1 p-6 bg-gray-50 overflow-auto pt-0">
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

            {loading ? (
              <Loader />
            ) : (
              <div className="bg-white overflow-x-auto shadow-md rounded-lg p-4">
                <div className="bg-white overflow-hidden w-full h-full">
                  <div className="max-h-[500px] overflow-y-auto w-full">
                    <table className="min-w-full table-auto divide-y divide-gray-200 text-center">
                      <thead className="bg-[#F4F7F9] rounded-xl">
                        <tr>
                          {headers.map((header) => (
                            <th key={header} className="py-2 px-4 text-center text-sm font-medium tracking-wider">
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {data.map((row, rowIdx) => (
                          <tr key={rowIdx} className={rowIdx % 2 !== 0 ? 'bg-gray-100' : ''}>
                            {Object.keys(row).map((column, colIdx) => (
                              <td key={colIdx} className="px-3 py-4 whitespace-nowrap" onClick={() => handleCellClick(rowIdx, column)}>
                                {column === 'type' ? (
                                  <select
                                    value={typeOptions.includes(row[column]) ? row[column] : ' '}
                                    onChange={(e) => handleInputChangee(e, rowIdx, column)}
                                    className="form-select px-4 py-2 rounded-md w-64 border border-gray-300"
                                  >
                                    {typeOptions.map((option, idx) => (
                                      <option key={idx} value={option}>
                                        {option.length > 20 ? `${option.slice(0, 20)}...` : option}
                                      </option>
                                    ))}
                                  </select>
                                ) : column === 'id' ? (
                                  <span>{row[column]}</span>
                                ) : editingCell.row === rowIdx && editingCell.column === column ? (
                                  <input
                                    type="text"
                                    value={row[column]}
                                    onChange={(e) => handleInputChangee(e, rowIdx, column)}
                                    onBlur={handleBlur}
                                    autoFocus
                                    className="px-2 py-1 w-16 border border-gray-300 rounded"
                                  />
                                ) : (
                                  row[column]?.length > 20 ? `${row[column].slice(0, 20)}...` : (row[column] === '' ? '0' : row[column])
                                )}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white overflow-x-auto shadow-md rounded-lg p-4 mt-4">
            <div className="grid xl:grid-cols-2 lg:grid-cols-2 grid-cols-1 gap-2 mt-3 p-4">
              <div className="xl:col-span-2 lg:col-span-2 col-span-1 border-b pb-4">
                {['Custom Terms', 'Custom Terms Notes', 'Terms Selection'].map((label, idx) => (
                  <div key={idx} className="flex lg:flex-row md:flex-row flex-col lg:items-center md:items-center gap-2 mt-2">
                    <label className="w-44 text-sm text-gray-700 capitalize font-semibold">{label}</label>
                    {isEditing ? (
                      <input
                        type="text"
                        placeholder="Enter value"
                        value={formData[label.toLowerCase()] || ''}
                        onChange={(e) => setFormData({ ...formData, [label.toLowerCase()]: e.target.value })}
                        className="flex-1 border border-gray-300 rounded-lg py-2 px-4 mt-1"
                      />
                    ) : (
                      <span className="flex-1 py-2 px-4 border border-gray-300 rounded-lg mt-1 text-gray-700">
                        {formData[label.toLowerCase()] || 'Enter Value'}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {[
                'Deposit', 'Material Delivery', 'Material Delivery Payment 2', 'Final Payment',
                'Contract Total', 'Labor Cost', 'Material Amount', 'Shutter Cost', 'Credit Card Fees Amount',
                'Engineering Cost', 'Profit Percentage', 'Commissionable Amount', 'Commission Amount'
              ].map((label, idx) => (
                <div key={idx} className="flex lg:flex-row md:flex-row flex-col lg:items-center md:items-center gap-2 mt-2">
                  <label className="w-44 text-sm text-gray-700 capitalize font-semibold">{label}</label>
                  {isEditing ? (
                    <div className="flex-1 flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Enter percentage"
                        value={formData[`${label.toLowerCase()}Percentage`] || ''}
                        onChange={(e) => setFormData({ ...formData, [`${label.toLowerCase()}Percentage`]: e.target.value })}
                        className="border border-gray-300 rounded-lg py-2 px-4 mt-1 w-1/3"
                      />
                      <input
                        type="text"
                        placeholder="Enter amount"
                        value={formData[`${label.toLowerCase()}Amount`] || ''}
                        onChange={(e) => setFormData({ ...formData, [`${label.toLowerCase()}Amount`]: e.target.value })}
                        className="border border-gray-300 rounded-lg py-2 px-4 mt-1 flex-1"
                      />
                    </div>
                  ) : (
                    <div className="flex-1 flex items-center gap-2">
                      <span className="w-1/3 py-2 px-4 border border-gray-300 rounded-lg mt-1 text-gray-700">
                        {formData[`${label.toLowerCase()}Percentage`] || '0%'}
                      </span>
                      <span className="flex-1 py-2 px-4 border border-gray-300 rounded-lg mt-1 text-gray-700">
                        {formData[`${label.toLowerCase()}Amount`] || '$0.00'}
                      </span>
                    </div>
                  )}
                </div>
              ))}

              {[
                'Type Of Structure', 'Construction Types', 'Municipality', 'Engineering Needed', 'Permit', 'Shutters',
                'Caulking and Screws', 'Scaffold', 'Miscellaneous', 'Water', 'Job Profit'
              ].map((label, idx) => (
                <div key={idx} className="flex lg:flex-row md:flex-row flex-col lg:items-center md:items-center gap-2 mt-2">
                  <label className="w-44 text-sm text-gray-700 capitalize font-semibold">{label}</label>
                  {isEditing ? (
                    <input
                      type="text"
                      placeholder="Enter value"
                      value={formData[label.toLowerCase()] || ''}
                      onChange={(e) => setFormData({ ...formData, [label.toLowerCase()]: e.target.value })}
                      className="flex-1 border border-gray-300 rounded-lg py-2 px-4 mt-1"
                    />
                  ) : (
                    <span className="flex-1 py-2 px-4 border border-gray-300 rounded-lg mt-1 text-gray-700">
                      {formData[label.toLowerCase()] || 'Enter Value'}
                    </span>
                  )}
                </div>
              ))}
            </div>

            <div className="flex lg:flex-row md:flex-row flex-col lg:items-center md:items-center gap-2 mt-2">
              <label className="w-44 text-sm text-gray-700 capitalize font-semibold">Finance</label>
              {isEditing ? (
                <select
                  value={formData['finance'] || ''}
                  onChange={(e) => setFormData({ ...formData, finance: e.target.value })}
                  className="flex-1 border border-gray-300 rounded-lg py-2 px-4 mt-1"
                >
                  <option value="">Select</option>
                  <option value="Finance">Finance</option>
                  <option value="Cash">Cash</option>
                  <option value="Financing Plan">Financing Plan</option>
                </select>
              ) : (
                <span className="flex-1 py-2 px-4 border border-gray-300 rounded-lg mt-1 text-gray-700">
                  {formData['finance'] || 'Select Finance'}
                </span>
              )}

              <div className="flex gap-4 flex-1">
                <div className="w-1/2">
                  {isEditing ? (
                    <input
                      type="text"
                      placeholder="Amount"
                      value={formData['finance_amount'] || ''}
                      onChange={(e) => setFormData({ ...formData, finance_amount: e.target.value })}
                      className="border border-gray-300 rounded-lg py-2 px-4 mt-1 w-full"
                    />
                  ) : (
                    <span className="border border-gray-300 rounded-lg py-2 px-4 mt-1 w-full text-gray-700">
                      {formData['finance_amount'] ? `$${parseFloat(formData['finance_amount']).toFixed(2)}` : '$0.00'}
                    </span>
                  )}
                </div>

                <div className="w-1/2">
                  {isEditing ? (
                    <input
                      type="text"
                      placeholder="Percentage"
                      value={formData['finance_percentage'] || ''}
                      onChange={(e) => setFormData({ ...formData, finance_percentage: e.target.value })}
                      className="border border-gray-300 rounded-lg py-2 px-4 mt-1 w-full"
                    />
                  ) : (
                    <span className="border border-gray-300 rounded-lg py-2 px-4 mt-1 w-full text-gray-700">
                      {formData['finance_percentage'] ? `${formData['finance_percentage']}%` : '0%'}
                    </span>
                  )}
                </div>
              </div>

            </div>

            <div className="flex items-center gap-4 mt-5">
              {isEditing ? (
                <>
                  <button
                    className="bg-[#7234D7] text-white px-4 py-2 rounded"
                    onClick={handleSaveChange}
                  >
                    Save Changes
                  </button>
                  <button
                    className="bg-gray-400 text-white px-4 py-2 rounded"
                    onClick={handleAddField}
                  >
                    Add Field
                  </button>
                </>
              ) : (
                <button
                  className="flex items-center gap-2 border border-gray-400 rounded px-5 py-2"
                  onClick={() => setIsEditing(true)}
                >
                  <img src={editIcon} alt="edit icon" />
                  <span className="text-[#7234D7]">Edit</span>
                </button>
              )}
            </div>

            {showModal && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
                <div className="bg-white p-6 rounded shadow-lg">
                  <h3 className="text-lg font-semibold mb-3">Add New Field</h3>
                  <input
                    type="text"
                    placeholder="Enter field name"
                    value={newFieldLabel}
                    onChange={(e) => setNewFieldLabel(e.target.value)}
                    className="border border-gray-300 rounded-lg py-2 px-4 mb-4 w-full"
                  />
                  <div className="flex justify-end gap-4">
                    <button
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-[#7234D7] text-white px-4 py-2 rounded"
                      onClick={handleConfirmAddField}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
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
