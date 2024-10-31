import React, { useState } from "react";
import Select from "react-select";
import editIcon from "../../assets/edit-icon.svg";

const JobCalculator = () => {
  const [showModal, setShowModal] = useState(false);
  const [newFieldLabel, setNewFieldLabel] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [paymentPercentages, setPaymentPercentages] = useState([]);
  const [depositPaymentTypes, setDepositPaymentTypes] = useState([]);

  const [dynamicFields, setDynamicFields] = useState([]);

  const handleConfirmAddField = () => {
    if (newFieldLabel) {
      setDynamicFields([...dynamicFields, { label: newFieldLabel, value: "" }]);
      setFormData({
        ...formData,
        [newFieldLabel.toLowerCase().replace(/\s+/g, "")]: "",
      });
      setNewFieldLabel("");
      setShowModal(false);
    }
  };

  const handleDynamicFieldChange = (index, value) => {
    const updatedFields = [...dynamicFields];
    updatedFields[index].value = value;
    setDynamicFields(updatedFields);
    setFormData({
      ...formData,
      [updatedFields[index].label.toLowerCase().replace(/\s+/g, "")]: value,
    });
  };

  const handleSaveChange = () => {
    setIsEditing(false);
  };

  const handleAddField = () => {
    setShowModal(true);
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
  const structureOptions = [
    { value: "Single Story Residential", label: "Single Story Residential" },
    { value: "Town Home", label: "Town Home" },
    { value: "Condo Century Value Type", label: "Condo Century Value Type" },
    { value: "Luxury Condo", label: "Luxury Condo" },
  ];

  const constructionOptions = [
    { value: "cbs", label: "CBS" },
    { value: "wood_frame", label: "Wood Frame" },
  ];
  const [formData, setFormData] = useState({
    laborCost: 0,
    materialCost: 0,
    commissionJobAmount: 0,
    commissionPercentage: 0,
    shutters: 0,
    miscellaneous: 0,
    engineer: 0,
    measurementsAndMisc: 0,
    permit: 0,
    scaffold: 0,
    numberOfSmokeDetectors: 0,
    structureType: [],
    luxuryCondoPrice: 0,
    deliveryFee: 0,
    woodFrameCost: 0,
    finance_amount: 0,
    finance_percentage: 0,

    materialTax: 0,
    totalCost: 0,
    profit: 0,
    profitPercentage: "0.00",
    caulkingAndScrews: 0,
    contractTotal: 0,
    subTotal: 0,
    measurementsMisc: 0,
    typeOfStructure: 0,
    constructionType: 0,

    customTerms: "",
    customTermsNotes: "",
    termsSelection: "",
    constructionTypes: 0,
    municipality: "",
    engineeringNeeded: 0,
    engineeringCost: 0,
    engineeringFees: "",
    commissionableAmount: 0,
    creditCardFees: 0,
    creditCardAmount: 0,
    materialAmount: 0,
    shutterCost: 0,
    commissionAmount: 0,
    jobProfit: 0,
    financing: 0,
    termSelection: "",
    customPayment: "",
    paymentType: "",
    financingProvider: "",
    providerTerms: "",
    creditCardFeesAmount: 0,
  });

  const calculateLaborCost = () => {
    return parseFloat(formData.laborCost || 0);
  };

  const calculateMaterialTax = () => {
    return Math.round(parseFloat(formData.materialCost || 0) * 0.07);
  };

  const calculateCommissionAmount = () => {
    return (
      (parseFloat(formData.commissionPercentage || 0) / 100) *
      parseFloat(formData.commissionJobAmount || 0)
    );
  };

  const calculateTotalCost = () => {
    const commissionAmount = calculateCommissionAmount();
    const luxuryCondoAdjustment = formData.structureType.includes(
      "Luxury Condo"
    )
      ? 0.5 * calculateLaborCost()
      : 0;

    return (
      commissionAmount +
      parseFloat(formData.shutters || 0) +
      parseFloat(formData.miscellaneous || 0) +
      calculateLaborCost() +
      parseFloat(formData.materialCost || 0) +
      parseFloat(formData.engineer || 0) +
      parseFloat(formData.measurementsAndMisc || 0) +
      luxuryCondoAdjustment +
      parseFloat(formData.materialCost || 0) * 0.04 +
      parseFloat(formData.permit || 0) +
      parseFloat(formData.scaffold || 0) +
      (formData.numberOfSmokeDetectors
        ? 50 * formData.numberOfSmokeDetectors
        : 0)
    );
  };

  const calculateProfits = () => {
    const totalCost = calculateTotalCost();
    return parseFloat(formData.commissionJobAmount || 0) - totalCost;
  };

  const calculateProfitPercentage = () => {
    const profits = calculateProfits();
    return (
      (profits / (parseFloat(formData.commissionJobAmount || 0) || 1)) * 100
    );
  };

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
    setIsEditing(false);
  };

  const wellsFargoPlans = [
    {
      plan: "2225",
      details:
        "Special rate of 12.90% APR with custom monthly payments of 2.15%",
      discountRate: "5.74%",
    },
    {
      plan: "1193",
      details:
        "Special rate of 9.90% APR with custom monthly payments of 2.00%",
      discountRate: "6.74%",
    },
    {
      plan: "1157",
      details:
        "Special rate of 6.90% APR with custom monthly payments of 2.00%",
      discountRate: "8.74%",
    },
    {
      plan: "2700",
      details:
        "Special rate of 3.90% APR with custom monthly payments of 1.75%",
      discountRate: "13.74%",
    },
    {
      plan: "2701",
      details:
        "Special rate of 5.90% APR with custom monthly payments of 1.75%",
      discountRate: "9.74%",
    },
    {
      plan: "3702",
      details:
        "Special rate of 7.90% APR with custom monthly payments of 1.75%",
      discountRate: "8.74%",
    },
    {
      plan: "4079",
      details: "Special rate of 0% APR with 24 equal monthly payments",
      discountRate: "11.99%",
    },
    {
      plan: "4091",
      details: "Special rate of 0% APR with 36 equal monthly payments",
      discountRate: "14.99%",
    },
    {
      plan: "4103",
      details: "Special rate of 0% APR with 48 equal monthly payments",
      discountRate: "16.99%",
    },
    {
      plan: "4115",
      details: "Special rate of 0% APR with 60 equal monthly payments",
      discountRate: "18.99%",
    },
    {
      plan: "4062",
      details: "Special rate of 0% APR with 72 equal monthly payments",
      discountRate: "19.99%",
    },
    {
      plan: "3389",
      details:
        "Special rate of 8.99% APR with 24 equal monthly payments (4.6538% payment factor)",
      discountRate: "4.74%",
    },
    {
      plan: "3390",
      details:
        "Special rate of 8.99% APR with 36 equal monthly payments (3.2170% payment factor)",
      discountRate: "5.74%",
    },
    {
      plan: "3391",
      details:
        "Special rate of 8.99% APR with 48 equal monthly payments (2.5090% payment factor)",
      discountRate: "6.74%",
    },
    {
      plan: "3392",
      details:
        "Special rate of 8.99% APR with 60 equal monthly payments (2.0888% payment factor)",
      discountRate: "7.74%",
    },
    {
      plan: "1148",
      details:
        "No interest if paid in full within 6 months with regular monthly payments",
      discountRate: "4.24%",
    },
    {
      plan: "1181",
      details:
        "No interest if paid in full within 9 months with regular monthly payments",
      discountRate: "5.24%",
    },
    {
      plan: "1019",
      details:
        "No interest if paid in full within 12 months with regular monthly payments",
      discountRate: "6.24%",
    },
    {
      plan: "1047",
      details:
        "No interest if paid in full within 15 months with regular monthly payments",
      discountRate: "6.74%",
    },
    {
      plan: "1066",
      details:
        "No interest if paid in full within 18 months with regular monthly payments",
      discountRate: "7.24%",
    },
    { plan: "9999", details: "Regular Account Terms", discountRate: "3.34%" },
  ];

  const synchronyPlans = [
    {
      value: "921",
      label:
        "921 No Monthly Interest if Paid in Full within 9 Months 2.50% N/A 6.50%",
    },
    {
      value: "922",
      label:
        "922 No Monthly Interest if Paid in Full within 12 Months 2.50% N/A 7.25%",
    },
    {
      value: "923",
      label:
        "923 No Monthly Interest if Paid in Full within 15 Months 2.50% N/A 7.70%",
    },
    {
      value: "924",
      label:
        "924 No Monthly Interest if Paid in Full within 18 Months 2.50% N/A 8.00%",
    },
    {
      value: "925",
      label:
        "925 No Monthly Interest if Paid in Full within 24 Months 2.50% N/A 11.15%",
    },
    { value: "940", label: "940 3.99% APR Until Paid in Full 1.25% 94 22.15%" },
    {
      value: "941",
      label: "941 5.99% APR Until Paid in Full 1.25% 102 16.00%",
    },
    {
      value: "942",
      label: "942 7.99% APR Until Paid in Full 1.25% 115 11.15%",
    },
    { value: "943", label: "943 9.99% APR Until Paid in Full 1.25% 132 8.00%" },
    { value: "950", label: "950 5.99% APR Until Paid in Full 1.50% 82 14.65%" },
    { value: "951", label: "951 7.99% APR Until Paid in Full 1.50% 88 10.25%" },
    { value: "952", label: "952 9.99% APR Until Paid in Full 1.50% 98 7.65%" },
    { value: "960", label: "960 3.99% APR Until Paid in Full 1.75% 64 15.65%" },
    { value: "961", label: "961 5.99% APR Until Paid in Full 1.75% 68 12.90%" },
    { value: "962", label: "962 7.99% APR Until Paid in Full 1.75% 73 9.15%" },
    { value: "963", label: "963 9.99% APR Until Paid in Full 1.75% 78 7.25%" },
    { value: "964", label: "964 10.99% APR Until Paid in Full 1.75% 82 4.15%" },
    { value: "965", label: "965 11.99% APR Until Paid in Full 1.75% 86 3.00%" },
    { value: "970", label: "970 5.99% APR Until Paid in Full 2.00% 58 11.15%" },
    { value: "971", label: "971 7.99% APR Until Paid in Full 2.00% 61 8.00%" },
    { value: "972", label: "972 9.99% APR Until Paid in Full 2.00% 65 7.05%" },
    { value: "980", label: "980 5.99% APR Until Paid in Full 3.00% 37 8.00%" },
    { value: "981", label: "981 7.99% APR Until Paid in Full 3.00% 38 7.25%" },
    { value: "982", label: "982 9.99% APR Until Paid in Full 3.00% 40 6.40%" },
    { value: "990", label: "990 5.99% APR Until Paid in Full 4.00% 27 7.25%" },
    { value: "991", label: "991 7.99% APR Until Paid in Full 4.00% 28 7.00%" },
    { value: "992", label: "992 9.99% APR Until Paid in Full 4.00% 28 5.35%" },
    { value: "930", label: "930 25 Month No Monthly Interest 4.00% 25 11.15%" },
    { value: "931", label: "931 36 Month No Monthly Interest 2.78% 36 16.00%" },
    { value: "932", label: "932 48 Month No Monthly Interest 2.08% 48 17.75%" },
    { value: "933", label: "933 60 Month No Monthly Interest 1.67% 60 20.25%" },
    { value: "934", label: "934 72 Month No Monthly Interest 1.39% 72 23.75%" },
  ];

  const [calculatedValues, setCalculatedValues] = useState({
    totalCost: null,
    profit: null,
    profitPercentage: null,
    materialTax: null,
  });

  const handleCalculate = () => {
    const totalCost = calculateTotalCost();
    const profit = calculateProfits();
    const profitPercentage = calculateProfitPercentage();
    const materialTax = calculateMaterialTax();

    console.log("Total Cost:", totalCost);
    console.log("Profit:", profit);
    console.log("Profit Percentage:", profitPercentage);
    console.log("Material Tax:", materialTax);

    setCalculatedValues({
      totalCost,
      profit,
      profitPercentage,
      materialTax,
    });
  };

  return (
    <div>
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
              <option value="50/50">50/50</option>
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

        {formData.termSelection === "50/50" && (
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
                Final Payment (50%)
              </label>
              <span className="flex-1 py-2 px-4 border border-gray-300 rounded-lg mt-1 text-gray-700">
                50%
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
                          {wellsFargoPlans.map((plan) => (
                            <option key={plan.plan} value={plan.plan}>
                              {`${plan.plan} ${plan.details} ${plan.discountRate}`}
                            </option>
                          ))}
                        </>
                      )}

                      {formData.financingProvider === "Synchrony" && (
                        <>
                          {synchronyPlans.map((plan) => (
                            <option key={plan.value} value={plan.value}>
                              {plan.label}
                            </option>
                          ))}
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
                          <div key={index} className="flex flex-col gap-2 mt-2">
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
            <div className="flex flex-col gap-2 mt-4">
              <label className="w-44 text-sm text-gray-700 capitalize font-semibold">
                Fees Percentage
              </label>
              <input
                type="number"
                name="feesPercentage"
                value={formData["feesPercentage"] || ""}
                onChange={(e) =>
                  setFormData({ ...formData, feesPercentage: e.target.value })
                }
                placeholder="Enter percentage"
                className="flex-1 border border-gray-300 rounded-lg py-2 px-4 mt-1"
              />
            </div>
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
        <div className="grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 gap-4 mt-3 p-4">
          {[
            "Labor Cost",
            "Contract Total",
            "No of Smoke Detectors",
            "Material Amount",
            "Credit Card Fees Amount",
            "Commissionable Amount",
            "Profit Percentage",
            "Material Tax",
            "Material Cost",
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
                  placeholder="Enter amount"
                  value={
                    formData[label.toLowerCase().replace(/\s+/g, "")] || ""
                  }
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      [label.toLowerCase().replace(/\s+/g, "")]: e.target.value,
                    });
                    handleCalculate();
                  }}
                  className="border border-gray-300 rounded-lg py-2 px-4 mt-1 flex-1"
                />
              ) : (
                <span className="border border-gray-300 text-gray-700 rounded-lg py-2 px-4 mt-1 flex-1">
                  {formData[label.toLowerCase().replace(/\s+/g, "")] ||
                    "Enter Value"}
                </span>
              )}
            </div>
          ))}

          {[
            "Miscellaneous",
            "Shutter Cost",
            "Total Cost",
            "Engineering Needed",
            "Commission Amount",
            "Shutters",
            "Commission Percentage",
            "Scaffold",
            "Profit Percentage",
            "Job Profit",
            "Profit Amount",
            "Commission Job Amount",
            "Caulking and Screws",
          ].map((label, idx) => (
            <div
              key={idx}
              className="flex lg:flex-row md:flex-row flex-col lg:items-center md:items-center gap-2 mt-2"
            >
              <label className="w-44 text-sm text-gray-700 capitalize font-semibold">
                {label}
              </label>

              {isEditing ? (
                label === "Commission Percentage" ? (
                  <select
                    name="commissionPercentage"
                    value={formData.commissionPercentage || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        commissionPercentage: e.target.value,
                      })
                    }
                    className="flex-1 border border-gray-300 text-gray-700 rounded-lg py-2 px-4 mt-1"
                  >
                    <option value="" disabled>
                      Select percentage
                    </option>
                    {Array.from({ length: 10 }, (_, i) => (
                      <option key={10 - i} value={10 - i}>
                        {10 - i}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    placeholder="Enter value"
                    value={
                      formData[label.toLowerCase().replace(/\s+/g, "")] || ""
                    }
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [label.toLowerCase().replace(/\s+/g, "")]:
                          e.target.value,
                      })
                    }
                    className="flex-1 border border-gray-300 text-gray-700 rounded-lg py-2 px-4 mt-1"
                  />
                )
              ) : (
                <span className="border border-gray-300 text-gray-700 rounded-lg py-2 px-4 mt-1 flex-1">
                  {label === "Commission Percentage"
                    ? `${formData.commissionPercentage || "Select percentage"}%`
                    : formData[label.toLowerCase().replace(/\s+/g, "")] ||
                      "Enter Value"}
                </span>
              )}
            </div>
          ))}

          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm text-gray-700 capitalize font-semibold">
              Type of Structures
            </label>
            <Select
              isMulti
              options={structureOptions}
              value={structureOptions.filter((option) =>
                formData.structureType.includes(option.value)
              )}
              onChange={(selectedOptions) =>
                setFormData({
                  ...formData,
                  structureType: selectedOptions.map((option) => option.value),
                })
              }
              className="border border-gray-300 rounded-lg"
            />
          </div>

          {formData.structureType.includes("Luxury Condo") && (
            <div className="flex flex-col gap-2 w-full mt-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-700 capitalize font-semibold">
                  Luxury Condo Price
                </label>
                <input
                  type="text"
                  placeholder="Enter Luxury Condo Price"
                  value={formData.luxuryCondoPrice}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      luxuryCondoPrice: e.target.value,
                    })
                  }
                  className="border border-gray-300 rounded-lg py-2 px-4 mt-1"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-700 capitalize font-semibold">
                  Delivery Fee
                </label>
                <input
                  type="text"
                  placeholder="Enter Delivery Fee"
                  value={formData.deliveryFee}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      deliveryFee: e.target.value,
                    })
                  }
                  className="border border-gray-300 rounded-lg py-2 px-4 mt-1"
                />
              </div>
            </div>
          )}

          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm text-gray-700 capitalize font-semibold">
              Construction Type
            </label>
            <Select
              options={constructionOptions}
              value={
                constructionOptions.find(
                  (option) => option.value === formData.constructionType
                ) || null
              }
              onChange={(selectedOption) =>
                setFormData({
                  ...formData,
                  constructionType: selectedOption ? selectedOption.value : "",
                })
              }
              className="border border-gray-300 rounded-lg"
            />
          </div>

          {formData.constructionType === "wood_frame" && (
            <div className="flex flex-col gap-2 w-full mt-4">
              <label className="text-sm text-gray-700 capitalize font-semibold">
                Wood Frame Cost
              </label>
              <input
                type="text"
                placeholder="Enter Wood Frame Cost"
                value={formData.woodFrameCost}
                onChange={(e) =>
                  setFormData({ ...formData, woodFrameCost: e.target.value })
                }
                className="border border-gray-300 rounded-lg py-2 px-4 mt-1"
              />
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center mt-2">
          <label className="w-44 ms-5 text-sm font-semibold text-gray-700 capitalize">
            Finance
          </label>

          <div className="flex flex-col md:flex-row w-full gap-4">
            <div className="flex-1">
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
                  className="border border-gray-300 rounded-lg py-2 px-4 w-full mt-1 placeholder-gray-400"
                />
              ) : (
                <span className="block border border-gray-300 rounded-lg py-2 px-4 w-full mt-1 text-gray-700">
                  {formData["finance_amount"]
                    ? `$${parseFloat(formData["finance_amount"]).toFixed(2)}`
                    : "$0.00"}
                </span>
              )}
            </div>

            <div className="flex-1">
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
                  className="border border-gray-300 rounded-lg py-2 px-4 w-full mt-1 placeholder-gray-400"
                />
              ) : (
                <span className="block border border-gray-300 rounded-lg py-2 px-4 w-full mt-1 text-gray-700">
                  {formData["finance_percentage"]
                    ? `${formData["finance_percentage"]}%`
                    : "0%"}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 gap-4 ">
          {dynamicFields.map((field, index) => (
            <div
              key={`dynamic-${index}`}
              className="flex lg:flex-row md:flex-row flex-col lg:items-center md:items-center gap-2 mt-2"
            >
              <label className="ms-5 w-32 text-sm text-gray-700 capitalize font-semibold">
                {field.label}
              </label>
              <input
                type="text"
                placeholder="Enter value"
                value={field.value}
                onChange={(e) =>
                  handleDynamicFieldChange(index, e.target.value)
                }
                className="flex-1 border border-gray-300 rounded-lg py-2 px-4 mt-1"
              />
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4 mt-5">
          {isEditing ? (
            <>
              <button
                type="button"
                onClick={handleCalculate}
                className="bg-[#7234D7] text-white px-4 py-2 rounded"
              >
                Calculate
              </button>
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded"
                onClick={handleAddField}
              >
                Add Field
              </button>
              <button
                className="bg-[#7234D7] text-white px-4 py-2 rounded"
                onClick={handleSaveChange}
              >
                Save Changes
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
                <div className="flex justify-center gap-4">
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
        <div className="mt-5 bg-gray-100 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Calculated Values:</h4>
          <p>Total Cost: ${calculatedValues.totalCost}</p>
          <p>Profit: ${calculatedValues.profit}</p>
          <p>Profit Percentage: {calculatedValues.profitPercentage}%</p>
          <p>Material Tax: ${calculatedValues.materialTax}</p>
        </div>
      </div>
    </div>
  );
};

export default JobCalculator;
