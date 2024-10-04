import React, { useState } from "react";
import { useNavigate} from 'react-router-dom';
import backIcon from "../../assets/back-icon.svg";
import editIcon from "../../assets/edit-icon.svg";

const EditModal = ({ showModal, closeModal, fieldName, value, onSave }) => {
  const [inputValue, setInputValue] = useState(value);

  const handleSave = () => {
    onSave(inputValue);
    closeModal();
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-[400px]">
        <h2 className="text-xl font-bold mb-4">Edit {fieldName}</h2>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-2 border border-gray-300 rounded text-gray-700"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-purple-600 text-white rounded"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

const JobCalculatorDetails = () => {
  const [placeholders, setPlaceholders] = useState({
    typeOfStructure: "Placeholder",
    caulkingAndScrews: "Placeholder",
    luxuryCondoPrice: "Placeholder",
    creditCardFees: "Placeholder",
    constructionType: "Placeholder",
    creditCardFeesAmount: "Placeholder",
    engineeringNeed: "Placeholder",
    shutters: "Placeholder",
    scaffold: "Placeholder",
    miscellaneous: "Placeholder",
    engineeringFees: "Placeholder",
    contractTotal: "Placeholder",
    comissionableAmount: "Placeholder",
    materialAmount: "Placeholder",
    materialTax: "Placeholder",
    laborCost: "Placeholder",
    totalCost: "Placeholder",
    comissionAmount: "Placeholder",
    comissionPercentage: "Placeholder",
    profilePercentage: "Placeholder",
    profitAmount: "Placeholder",
    Drive: "Placeholder",
    hOA: "Placeholder",
    permits: "Placeholder",
    termsSelection: "Placeholder",
    customTerms: "Placeholder",
    customTermsNotes: "Placeholder",
    financing: "Placeholder",
    financingPlan: "Placeholder",
    deposit: "Placeholder",
    delivery: "Placeholder",
    final: "Placeholder"
  });

  const [editingField, setEditingField] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleJobCalcClick = () => {
    navigate('/dealmanagement');
  };

  const handleEdit = (field) => {
    setEditingField(field);
    setShowModal(true);
  };

  const handleSave = (newValue) => {
    setPlaceholders({ ...placeholders, [editingField]: newValue });
  };

  return (
    <div className="w-full mx-auto p-6 pt-0 lg:mt-0 mt-4">
      <div className="flex lg:flex-row flex-col justify-between items-center mb-6">
        <div className="flex gap-2">
          <img src={backIcon} alt="back-icon" className="cursor-pointer"  onClick={handleJobCalcClick} />
          <h1 className="text-2xl font-bold">Job Calculator</h1>
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
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Job Calculator Details</h2>
        </div>
        <hr className="text-[#D1D1D1]" />
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 mt-4">
          {Object.keys(placeholders).map((key, index) => (
            <div
              key={index}
              className="flex lg:flex-row md:flex-row flex-col items-center border border-gray-400 px-4 py-4 rounded"
            >
              <label className="w-1/2 capitalize font-semibold">
                {key.replace(/([A-Z])/g, " $1").toLowerCase()}
              </label>
              <input
                type="text"
                value={placeholders[key]}
                className="w-full p-2 border border-gray-300 rounded mr-4 text-[#808080]"
                readOnly
              />
              <button
                className="flex items-center gap-2 text-purple-600 hover:text-purple-800 p-2"
                onClick={() => handleEdit(key)}
              >
                <img src={editIcon} alt="edit icon" />
                <span className="text-[#7234D7]">Edit</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      <EditModal
        showModal={showModal}
        closeModal={() => setShowModal(false)}
        fieldName={editingField}
        value={placeholders[editingField]}
        onSave={handleSave}
      />
    </div>
  );
};

export default JobCalculatorDetails;
