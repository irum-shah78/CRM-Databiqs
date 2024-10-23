import React, { useRef, useState } from "react";
import axios from "axios";
import searchIcon from "../../assets/search.svg";
import listView from "../../assets/listView.svg";
import kanbanView from "../../assets/kanbanView.svg";
import filter from "../../assets/filter.svg";
import filterDropdown from "../../assets/filter-dropdown.svg";
import calender from "../../assets/calender.svg";
import editIcon from "../../assets/edit-icon.svg";
import Loader from "../../components/loader/Loader";

const JobCalculator = () => {
  const [newFields, setNewFields] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newFieldLabel, setNewFieldLabel] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);
  const [editingCell, setEditingCell] = useState({ row: null, column: null });
  const [loading, setLoading] = useState(false);

  const [depositPaymentTypes, setDepositPaymentTypes] = useState([]);
  const [paymentPercentages, setPaymentPercentages] = useState([]);

  const [data, setData] = useState(
    [...Array(24)].map((_, idx) => ({
      id: String(idx + 1).padStart(2, "0"),
      room: "001",
      width: "001",
      height: "001",
      type: "",
      panel: "OX",
      quantity: "001",
      price: "180",
      additionalLabor: "-----",
      notes: "notes",
      totalLabor: "001",
    }))
  );

  const headers = [
    "Id",
    "Room",
    "Width",
    "Height",
    "Type",
    "Panel",
    "Quantity",
    "Price",
    "Additional Labor",
    "Notes",
    "Total Labor",
  ];

  const typeOptions = [
    " ",
    "ES-EL100 - Single Hung",
    "ES-EL200 - HORIZONTAL ROLLER",
    "ES-EL200 - HORIZONTAL ROLLER XOX",
    "ES-EL400 - SLIDING GLASS DOOR",
    "ES-EL300 - SWING DOOR - SINGLE LEAF",
    "ES-EL300 - SWING DOOR - DOUBLE LEAF",
    "ES-EL150 SHAPE - FIXED WINDOW",
    "MULLION",
    "ES-EL300 - SWING DOOR - SINGLE LEAF with Side Lite",
    "ES-EL300 - SWING DOOR - DOUBLE LEAF with side Lite",
    "ES-EL300 - SWING DOOR - DOUBLE LEAF with 2 Side Lites",
  ];

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      setLoading(true);
      try {
        const response = await axios.post(
          "https://job-calculator-dan-01-hwa8c4czf7c6h5ec.westus-01.azurewebsites.net/uploadfile/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const extractedData = response.data;
        console.log("Extracted Data:", extractedData);
        if (extractedData) {
          const updatedData = extractedData.map((item, idx) => ({
            id: String(idx + 1).padStart(2, "0"),
            ...item,
            notes: item.notes || "0",
            totalLabor: item.totalLabor || "0",
          }));

          const totalRows = 24;
          const remainingRows = totalRows - updatedData.length;

          if (remainingRows > 0) {
            const defaultRows = [...Array(remainingRows)].map((_, idx) => ({
              id: String(updatedData.length + idx + 1).padStart(2, "0"),
              room: "001",
              width: "001",
              height: "001",
              type: "",
              panel: "OX",
              quantity: "001",
              price: "180",
              additionalLabor: "-----",
              notes: "notes",
              totalLabor: "001",
            }));

            setData([...updatedData, ...defaultRows]);
          } else {
            setData(updatedData);
          }
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const [formData, setFormData] = useState({
    customTerms: "",
    customTermsNotes: "",
    termsSelection: "",
    typeOfStructure: "",
    constructionTypes: "",
    municipality: "",
    contractTotal: "",
    engineeringNeeded: "",
    engineeringCost: "",
    engineeringFees: "",
    commissionableAmount: "",
    permit: "",
    laborCost: "",
    creditCardFees: "",
    creditCardAmount: "",
    materialAmount: "",
    shutters: "",
    shutterCost: "",
    materialTax: "",
    caulkingAndScrews: "",
    commissionPercentage: "",
    scaffold: "",
    commissionAmount: "",
    miscellaneous: "",
    profitPercentage: "",
    water: "",
    jobProfit: "",
    financing: "",
    termSelection: "",
    customPayment: "",
    paymentType: "",
    financingProvider: "",
    providerTerms: "",
  });

  const handleSaveChange = () => {
    setIsEditing(false);
  };

  const handleCellClick = (rowIdx, column) => {
    if (column !== "id") {
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
      setNewFields((prevFields) => [
        ...prevFields,
        { label: newFieldLabel, value: "" },
      ]);
      setNewFieldLabel("");
    }
    setShowModal(false);
  };

  const [depositAmounts, setDepositAmounts] = useState([]);

  const handlePaymentPercentageChange = (index, value) => {
    const newPercentages = [...paymentPercentages];
    newPercentages[index] = value;
    setPaymentPercentages(newPercentages);
  };

  const handleDepositAmountChange = (index, value) => {
    const newDepositAmounts = [...depositAmounts];
    newDepositAmounts[index] = value;
    setDepositAmounts(newDepositAmounts);
  };

  const handleDepositPaymentTypeChange = (index, value) => {
    setDepositPaymentTypes((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const [savedData, setSavedData] = useState(null);

  const handleSave = () => {
    const dataToDisplay = {
      customPayment: formData.customPayment,
      paymentType: formData.paymentType,
      financingProvider: formData.financingProvider,
      providerTerms: formData.providerTerms,
      contractTotal: formData.contractTotal,
      deposits: depositAmounts,
      percentages: paymentPercentages,
      paymentTypes: depositPaymentTypes,
    };

    setSavedData(dataToDisplay);
  };

  return (
    <div className="flex min-h-screen xl:w-full lg:w-[700px] md:w-[460px] w-80 p-0 lg:mt-0 mt-4">
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
              style={{ display: "none" }}
            />
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
                <span className="lg:ml-2 lg:mr-4  text-[#666666]">
                  Entities
                </span>
              </div>
            </div>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
              <button className="bg-[#7234D7] border border-[#666666] text-white xl:px-4 xl:py-2 px-2 py-1 rounded-lg flex items-center justify-center gap-2 xl:text-base text-sm">
                <img src={listView} alt="listView" />
                List View
              </button>
              <button className="border border-[#B3B3B3] px-4 py-2 rounded-lg flex items-center justify-center gap-2 xl:text-base text-sm">
                <img src={kanbanView} alt="kanbanView" />
                Kanban View
              </button>
              <button className="border border-[#B3B3B3] px-4 py-2 rounded-lg flex items-center justify-center gap-2 xl:text-base text-sm">
                <img src={filter} alt="filter" />
                Filter
              </button>
              <button className="border border-[#B3B3B3] px-4 py-2 rounded-lg flex items-center justify-center gap-2 xl:text-base text-sm">
                <img src={calender} alt="calendar" />
                September 2024
                <img src={filterDropdown} alt="filterDropdown" />
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
                      {data.map((row, rowIdx) => (
                        <tr
                          key={rowIdx}
                          className={rowIdx % 2 !== 0 ? "bg-gray-100" : ""}
                        >
                          {Object.keys(row).map((column, colIdx) => (
                            <td
                              key={colIdx}
                              className="px-3 py-4 whitespace-nowrap"
                              onClick={() => handleCellClick(rowIdx, column)}
                            >
                              {column === "type" ? (
                                <select
                                  value={
                                    typeOptions.includes(row[column])
                                      ? row[column]
                                      : " "
                                  }
                                  onChange={(e) =>
                                    handleInputChangee(e, rowIdx, column)
                                  }
                                  className="form-select px-4 py-2 rounded-md w-64 border border-gray-300"
                                >
                                  {typeOptions.map((option, idx) => (
                                    <option key={idx} value={option}>
                                      {option.length > 20
                                        ? `${option.slice(0, 20)}...`
                                        : option}
                                    </option>
                                  ))}
                                </select>
                              ) : column === "id" ? (
                                <span>{row[column]}</span>
                              ) : editingCell.row === rowIdx &&
                                editingCell.column === column ? (
                                <input
                                  type="text"
                                  value={row[column]}
                                  onChange={(e) =>
                                    handleInputChangee(e, rowIdx, column)
                                  }
                                  onBlur={handleBlur}
                                  autoFocus
                                  className="px-2 py-1 w-16 border border-gray-300 rounded"
                                />
                              ) : row[column]?.length > 20 ? (
                                `${row[column].slice(0, 20)}...`
                              ) : row[column] === "" ? (
                                "0"
                              ) : (
                                row[column]
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

        {savedData && (
          <div className="bg-blue-100 p-4 mb-4 rounded-lg shadow-md mt-4">
            <h3 className="text-lg font-bold mb-2">Saved Payment Details</h3>
            <p>
              <strong>Custom Payments:</strong> {savedData.customPayment}
            </p>
            <p>
              <strong>Payment Type:</strong> {savedData.paymentType}
            </p>
            {savedData.paymentType === "Cash + Financing" && (
              <>
                <p>
                  <strong>Financing Provider:</strong>{" "}
                  {savedData.financingProvider}
                </p>
                <p>
                  <strong>Provider Terms:</strong> {savedData.providerTerms}
                </p>
              </>
            )}
            <p>
              <strong>Contract Total:</strong> ${savedData.contractTotal}
            </p>
            {savedData.deposits.map((deposit, index) => (
              <div key={index} className="mt-2">
                <p>
                  <strong>Deposit {index + 1}:</strong> ${deposit}
                </p>
                <p>
                  <strong>Percentage: </strong> {savedData.percentages[index]}%
                </p>
                <p>
                  <strong>Payment Type:</strong> {savedData.paymentTypes[index]}
                </p>
              </div>
            ))}
          </div>
        )}
        <div className="grid xl:grid-cols-2 lg:grid-cols-2 grid-cols-1 border-b pb-4 mt-4 bg-white shadow-sm p-4 rounded-lg">
          {["Custom Terms Notes"].map((label, idx) => (
            <div
              key={idx}
              className="flex lg:flex-row md:flex-row flex-col lg:items-center md:items-center gap-2 mt-2"
            >
              <label className="w-44 text-sm text-gray-700 capitalize font-semibold">
                {label}
              </label>
              {isEditing ? (
                <input
                  type="text"
                  placeholder="Enter value"
                  value={formData[label.toLowerCase()] || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [label.toLowerCase()]: e.target.value,
                    })
                  }
                  className="flex-1 border border-gray-300 rounded-lg py-2 px-4 mt-1"
                />
              ) : (
                <span className="flex-1 py-2 px-4 border border-gray-300 rounded-lg mt-1 text-gray-700">
                  {formData[label.toLowerCase()] || "Enter Value"}
                </span>
              )}
            </div>
          ))}
          <div className="flex lg:flex-row md:flex-row flex-col lg:items-center md:items-center gap-2 mt-2">
            <label className="w-44 text-sm text-gray-700 capitalize font-semibold ms-4">
              Term Selection
            </label>
            {isEditing ? (
              <select
                name="termSelection"
                value={formData["termSelection"] || ""}
                onChange={(e) =>
                  setFormData({ ...formData, termSelection: e.target.value })
                }
                className="flex-1 border border-gray-300 rounded-lg py-2 px-4 mt-1"
              >
                <option value="" disabled>
                  Select a term
                </option>
                <option value="50/45/5">50/45/5</option>
                <option value="Custom Payment">Custom Payment</option>
                <option value="Financing">Financing</option>
              </select>
            ) : (
              <span className="flex-1 py-2 px-4 border border-gray-300 rounded-lg mt-1 text-gray-700">
                {formData["termSelection"] || "Select a term"}
              </span>
            )}
          </div>

          {formData.termSelection === "50/45/5" && (
            <div className="flex flex-col gap-2 mt-2">
              <div className="flex lg:flex-row md:flex-row flex-col lg:items-center md:items-center gap-2 mt-2">
                <label className="w-44 text-sm text-gray-700 capitalize font-semibold">
                  Deposit Payment (50%)
                </label>
                <span className="flex-1 py-2 px-4 border border-gray-300 rounded-lg mt-1 text-gray-700">
                  50%
                </span>
              </div>
              <div className="flex lg:flex-row md:flex-row flex-col lg:items-center md:items-center gap-2 mt-2">
                <label className="w-44 text-sm text-gray-700 capitalize font-semibold">
                  Material Payment (45%)
                </label>
                <span className="flex-1 py-2 px-4 border border-gray-300 rounded-lg mt-1 text-gray-700">
                  45%
                </span>
              </div>
              <div className="flex lg:flex-row md:flex-row flex-col lg:items-center md:items-center gap-2 mt-2">
                <label className="w-44 text-sm text-gray-700 capitalize font-semibold">
                  Final Payment (5%)
                </label>
                <span className="flex-1 py-2 px-4 border border-gray-300 rounded-lg mt-1 text-gray-700">
                  5%
                </span>
              </div>
            </div>
          )}

          {formData.termSelection === "Custom Payment" && (
            <div className="flex flex-col gap-2 mt-2">
              <label className="w-44 text-sm text-gray-700 capitalize font-semibold">
                Custom Payment
              </label>
              <select
                name="customPayment"
                value={formData["customPayment"] || ""}
                onChange={(e) => {
                  const numberOfPayments = parseInt(e.target.value, 10);
                  setFormData({ ...formData, customPayment: numberOfPayments });
                  setPaymentPercentages(Array(numberOfPayments).fill(0));
                }}
                className="flex-1 border border-gray-300 rounded-lg py-2 px-4 mt-1"
              >
                <option value="" disabled>
                  Select a number
                </option>
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
              {formData.customPayment && (
                <div className="flex flex-col gap-2 mt-2">
                  <label className="w-44 text-sm text-gray-700 capitalize font-semibold">
                    Payment Type
                  </label>
                  <select
                    name="paymentType"
                    value={formData["paymentType"] || ""}
                    onChange={(e) => {
                      const selectedPaymentType = e.target.value;
                      setFormData({
                        ...formData,
                        paymentType: selectedPaymentType,
                        financingProvider:
                          selectedPaymentType === "Cash"
                            ? ""
                            : formData.financingProvider,
                        providerTerms:
                          selectedPaymentType === "Cash"
                            ? ""
                            : formData.providerTerms,
                      });
                    }}
                    className="flex-1 border border-gray-300 rounded-lg py-2 px-4 mt-1"
                  >
                    <option value="" disabled>
                      Select payment type
                    </option>
                    <option value="Cash">Cash</option>
                    <option value="Cash + Financing">Cash + Financing</option>
                  </select>

                  {formData.paymentType === "Cash + Financing" && (
                    <>
                      <label className="w-44 text-sm text-gray-700 capitalize font-semibold">
                        Select Financing Provider
                      </label>
                      <select
                        name="financingProvider"
                        value={formData.financingProvider || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            financingProvider: e.target.value,
                            providerTerms: "",
                          })
                        }
                        className="flex-1 border border-gray-300 rounded-lg py-2 px-4 mt-1"
                      >
                        <option value="" disabled>
                          Select provider
                        </option>
                        <option value="Wells Fargo">Wells Fargo</option>
                        <option value="Synchrony">Synchrony</option>
                        <option value="Ygrene">Ygrene</option>
                        <option value="Fortify">Fortify</option>
                        <option value="Mosaic">Mosaic</option>
                        <option value="Renew Financial">Renew Financial</option>
                      </select>
                    </>
                  )}

                  {(formData.financingProvider === "Wells Fargo" ||
                    formData.financingProvider === "Synchrony") && (
                    <>
                      <label className="w-44 text-sm text-gray-700 capitalize font-semibold">
                        {formData.financingProvider} Plans
                      </label>
                      <select
                        name="providerTerms"
                        value={formData.providerTerms || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            providerTerms: e.target.value,
                          })
                        }
                        className="flex-1 border border-gray-300 rounded-lg py-2 px-4 mt-1"
                      >
                        <option value="" disabled>
                          Select plans
                        </option>
                        {formData.financingProvider === "Wells Fargo" && (
                          <>
                            <option value="Plan">Plan</option>
                            <option value="Special Rate with Custom Monthly Payments">
                              Special Rate with Custom Monthly Payments
                            </option>
                            <option value="Discount Rate">Discount Rate</option>
                          </>
                        )}

                        {formData.financingProvider === "Synchrony" && (
                          <>
                            <option value="Plan">Plan</option>
                            <option value="Promotional Offer">
                              Promotional Offer
                            </option>
                            <option value="Monthly Payment Factor">
                              Monthly Payment Factor
                            </option>
                            <option value="Est. # of Payments">
                              Est. # of Payments
                            </option>
                            <option value="Merchant Fee">Merchant Fee</option>
                          </>
                        )}
                      </select>
                    </>
                  )}

                  {formData.providerTerms && (
                    <>
                      <label className="w-44 text-sm text-gray-700 capitalize font-semibold">
                        Contract Total
                      </label>
                      <input
                        type="number"
                        value={formData.contractTotal || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            contractTotal: e.target.value,
                          })
                        }
                        className="flex-1 border border-gray-300 rounded-lg py-2 px-4 mt-1"
                      />
                    </>
                  )}

                  {formData.contractTotal && (
                    <>
                      <div className="bg-gray-100 p-4 rounded-lg shadow-md mt-4">
                        {Array.from({ length: formData.customPayment }).map(
                          (_, index) => (
                            <div
                              key={index}
                              className="flex flex-col gap-2 mt-2"
                            >
                              {index === 0 ? (
                                <>
                                  <label className="w-44 text-sm text-gray-700 capitalize font-semibold">
                                    Deposit Amount
                                  </label>
                                  <input
                                    type="number"
                                    value={depositAmounts[index] || ""}
                                    onChange={(e) =>
                                      handleDepositAmountChange(
                                        index,
                                        e.target.value
                                      )
                                    }
                                    className="flex-1 border border-gray-300 rounded-lg py-2 px-4 mt-1"
                                  />
                                </>
                              ) : index === formData.customPayment - 1 ? (
                                <>
                                  <label className="w-44 text-sm text-gray-700 capitalize font-semibold">
                                    Final Payment
                                  </label>
                                  <input
                                    type="number"
                                    value={depositAmounts[index] || ""}
                                    onChange={(e) =>
                                      handleDepositAmountChange(
                                        index,
                                        e.target.value
                                      )
                                    }
                                    className="flex-1 border border-gray-300 rounded-lg py-2 px-4 mt-1"
                                  />
                                </>
                              ) : (
                                <>
                                  <label className="w-44 text-sm text-gray-700 capitalize font-semibold">
                                    Material Delivery {index}
                                  </label>
                                  <input
                                    type="number"
                                    value={depositAmounts[index] || ""}
                                    onChange={(e) =>
                                      handleDepositAmountChange(
                                        index,
                                        e.target.value
                                      )
                                    }
                                    className="flex-1 border border-gray-300 rounded-lg py-2 px-4 mt-1"
                                  />
                                </>
                              )}

                              <label className="w-44 text-sm text-gray-700 capitalize font-semibold">
                                Percentage
                              </label>
                              <input
                                type="number"
                                value={paymentPercentages[index] || ""}
                                onChange={(e) =>
                                  handlePaymentPercentageChange(
                                    index,
                                    e.target.value
                                  )
                                }
                                className="flex-1 border border-gray-300 rounded-lg py-2 px-4 mt-1"
                                onBlur={() => {
                                  const total =
                                    parseFloat(formData.contractTotal) || 0;
                                  const percentage =
                                    parseFloat(paymentPercentages[index]) || 0;
                                  const deposit = (total * percentage) / 100;
                                  setDepositAmounts((prev) => {
                                    const updated = [...prev];
                                    updated[index] = deposit;
                                    return updated;
                                  });
                                }}
                              />

                              <label className="w-44 text-sm text-gray-700 capitalize font-semibold">
                                Payment Type
                              </label>
                              <select
                                name={`paymentType-${index}`}
                                value={depositPaymentTypes[index] || ""}
                                onChange={(e) =>
                                  handleDepositPaymentTypeChange(
                                    index,
                                    e.target.value
                                  )
                                }
                                className="flex-1 border border-gray-300 rounded-lg py-2 px-4 mt-1"
                              >
                                <option value="" disabled>
                                  Select payment type
                                </option>
                                <option value="Cash">Cash</option>
                                <option value="Financing">Financing</option>
                                <option value="Credit Card">Credit Card</option>
                              </select>
                            </div>
                          )
                        )}

                        {paymentPercentages.reduce(
                          (a, b) => parseFloat(a) + parseFloat(b),
                          0
                        ) !== 100 && (
                          <p className="text-red-500 text-sm mt-2">
                            The total percentage must equal 100%.
                          </p>
                        )}

                        <button
                          onClick={handleSave}
                          className="mt-4 bg-[#7234D7] text-white py-2 px-4 rounded-lg shadow-md w-full"
                        >
                          Save
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          )}

          {formData["termSelection"] === "Financing" && (
            <div className="flex flex-col gap-2 mt-4">
              <div className="flex flex-col gap-2">
                <label className="w-44 text-sm text-gray-700 capitalize font-semibold">
                  Select Financing Provider
                </label>
                <select
                  name="financingProvider"
                  value={formData["financingProvider"] || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      financingProvider: e.target.value,
                      providerTerms: "",
                    })
                  }
                  className="flex-1 border border-gray-300 rounded-lg py-2 px-4 mt-1"
                >
                  <option value="" disabled>
                    Select provider
                  </option>
                  <option value="Wells Fargo">Wells Fargo</option>
                  <option value="Synchrony">Synchrony</option>
                  <option value="Ygrene">Ygrene</option>
                  <option value="Fortify">Fortify</option>
                  <option value="Mosaic">Mosaic</option>
                  <option value="Renew Financial">Renew Financial</option>
                </select>
              </div>

              <div className="flex flex-col gap-2 mt-4">
                <label className="w-44 text-sm text-gray-700 capitalize font-semibold">
                  Choose Plan
                </label>
                <select
                  name="providerTerms"
                  value={formData["providerTerms"] || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, providerTerms: e.target.value })
                  }
                  className="flex-1 border border-gray-300 rounded-lg py-2 px-4 mt-1"
                >
                  <option value="" disabled>
                    Select plan
                  </option>
                  <option value="Plan 1">Plan 1</option>
                  <option value="Plan 2">Plan 2</option>
                  <option value="Plan 3">Plan 3</option>
                  <option value="Plan 4">Plan 4</option>
                  <option value="Plan 5">Plan 5</option>
                  <option value="Plan 6">Plan 6</option>
                  <option value="Plan 7">Plan 7</option>
                  <option value="Plan 8">Plan 8</option>
                  <option value="Plan 9">Plan 9</option>
                  <option value="Plan 10">Plan 10</option>
                </select>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white overflow-x-auto shadow-md rounded-lg p-4 mt-4">
          <div className="grid xl:grid-cols-2 lg:grid-cols-2 grid-cols-1 gap-2 mt-3 p-4">
            {[
              "Labor Cost",
              "Contract Total",
              "Material Amount",
              "Shutter Cost",
              "Credit Card Fees Amount",
              "Engineering Cost",
              "Profit Percentage",
              "Commissionable Amount",
              "Commission Amount",
            ].map((label, idx) => (
              <div
                key={idx}
                className="flex lg:flex-row md:flex-row flex-col lg:items-center md:items-center gap-2 mt-2"
              >
                <label className="w-44 text-sm text-gray-700 capitalize font-semibold">
                  {label}
                </label>
                {isEditing ? (
                  <div className="flex-1 flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Enter percentage"
                      value={formData[`${label.toLowerCase()}Percentage`] || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [`${label.toLowerCase()}Percentage`]: e.target.value,
                        })
                      }
                      className="border border-gray-300 rounded-lg py-2 px-4 mt-1 w-1/3"
                    />
                    <input
                      type="text"
                      placeholder="Enter amount"
                      value={formData[`${label.toLowerCase()}Amount`] || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [`${label.toLowerCase()}Amount`]: e.target.value,
                        })
                      }
                      className="border border-gray-300 rounded-lg py-2 px-4 mt-1 flex-1"
                    />
                  </div>
                ) : (
                  <div className="flex-1 flex items-center gap-2">
                    <span className="w-1/3 py-2 px-4 border border-gray-300 rounded-lg mt-1 text-gray-700">
                      {formData[`${label.toLowerCase()}Percentage`] || "0%"}
                    </span>
                    <span className="flex-1 py-2 px-4 border border-gray-300 rounded-lg mt-1 text-gray-700">
                      {formData[`${label.toLowerCase()}Amount`] || "$0.00"}
                    </span>
                  </div>
                )}
              </div>
            ))}

            {[
              "Type Of Structure",
              "Construction Types",
              "Municipality",
              "Engineering Needed",
              "Permit",
              "Shutters",
              "Caulking and Screws",
              "Scaffold",
              "Miscellaneous",
              "Job Profit",
            ].map((label, idx) => (
              <div
                key={idx}
                className="flex lg:flex-row md:flex-row flex-col lg:items-center md:items-center gap-2 mt-2"
              >
                <label className="w-44 text-sm text-gray-700 capitalize font-semibold">
                  {label}
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    placeholder="Enter value"
                    value={formData[label.toLowerCase()] || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [label.toLowerCase()]: e.target.value,
                      })
                    }
                    className="flex-1 border border-gray-300 rounded-lg py-2 px-4 mt-1"
                  />
                ) : (
                  <span className="flex-1 py-2 px-4 border border-gray-300 rounded-lg mt-1 text-gray-700">
                    {formData[label.toLowerCase()] || "Enter Value"}
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="flex lg:flex-row md:flex-row flex-col lg:items-center md:items-center gap-2 mt-2">
            <label className="w-44 text-sm text-gray-700 capitalize font-semibold">
              Finance
            </label>
            {isEditing ? (
              <select
                value={formData["finance"] || ""}
                onChange={(e) =>
                  setFormData({ ...formData, finance: e.target.value })
                }
                className="flex-1 border border-gray-300 rounded-lg py-2 px-4 mt-1"
              >
                <option value="">Select</option>
                <option value="Finance">Finance</option>
                <option value="Cash">Cash</option>
                <option value="Financing Plan">Financing Plan</option>
              </select>
            ) : (
              <span className="flex-1 py-2 px-4 border border-gray-300 rounded-lg mt-1 text-gray-700">
                {formData["finance"] || "Select Finance"}
              </span>
            )}

            <div className="flex gap-4 flex-1">
              <div className="w-1/2">
                {isEditing ? (
                  <input
                    type="text"
                    placeholder="Amount"
                    value={formData["finance_amount"] || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        finance_amount: e.target.value,
                      })
                    }
                    className="border border-gray-300 rounded-lg py-2 px-4 mt-1 w-full"
                  />
                ) : (
                  <span className="border border-gray-300 rounded-lg py-2 px-4 mt-1 w-full text-gray-700">
                    {formData["finance_amount"]
                      ? `$${parseFloat(formData["finance_amount"]).toFixed(2)}`
                      : "$0.00"}
                  </span>
                )}
              </div>

              <div className="w-1/2">
                {isEditing ? (
                  <input
                    type="text"
                    placeholder="Percentage"
                    value={formData["finance_percentage"] || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        finance_percentage: e.target.value,
                      })
                    }
                    className="border border-gray-300 rounded-lg py-2 px-4 mt-1 w-full"
                  />
                ) : (
                  <span className="border border-gray-300 rounded-lg py-2 px-4 mt-1 w-full text-gray-700">
                    {formData["finance_percentage"]
                      ? `${formData["finance_percentage"]}%`
                      : "0%"}
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
  );
};

export default JobCalculator;
