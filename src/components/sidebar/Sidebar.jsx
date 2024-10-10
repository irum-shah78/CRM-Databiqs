import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import dashboardIcon from "../../assets/dashboard.svg";
import leadManagementIcon from "../../assets/lead-mgmt.svg";
import dealManagementIcon from "../../assets/deal-mgmt.svg";
import appointmentsIcon from "../../assets/appointment.svg";
import tasksIcon from "../../assets/tasks.svg";
import financialIcon from "../../assets/financial.svg";
import jobSubmissionIcon from "../../assets/job-submission.svg";
import projectManagementIcon from "../../assets/project-mgmt.svg";
import paymentIcon from "../../assets/payment.svg";
import permitIcon from "../../assets/permit.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const menuItems = [
    { name: "Dashboard", icon: dashboardIcon, link: "/dashboard" },
    { name: "Lead Management", icon: leadManagementIcon, link: "/leadmanagement" },
    {
      name: "Deal Management",
      icon: dealManagementIcon,
      link: "/dealmanagement",
      subMenu: [
        { name: "Deal Management", link: "/dealmanagement" },
        { name: "Job Calculator", link: "/jobcalculator" },
      ]
    },
    { name: "Appointments & Calendar", icon: appointmentsIcon, link: "/appointments-calendar" },
    {
      name: "Tasks & Follow-ups", icon: tasksIcon, link: "/tasks",
      subMenu: [
        { name: "All Tasks", link: "/tasks" },
        { name: "Project Tasks", link: "/tasks/projects" },
        { name: "Call Backs", link: "/tasks/callbacks" },
        { name: "General Tasks", link: "/tasks/general" },
      ],
    },
    { name: "Jobs", icon: jobSubmissionIcon, link: "/jobs" },
    { name: "Project Management", icon: projectManagementIcon, link: "/project-management" },
    { name: "Payment Section", icon: paymentIcon, link: "/payment-section" },
    {
      name: "Financials", icon: financialIcon, link: "/financials",
      subMenu: [
        { name: "Financials", link: "/financials" },
        { name: "Invoices", link: "/financials/invoices" },
        { name: "Purchase Orders", link: "/financials/purchaseorders" },
        { name: "Warranty Purchase Order", link: "/financials/warrantyorders" },
        { name: "Commissions", link: "/financials/commissions" },
        { name: "Job Costing", link: "/financials/jobcosting" },
      ],
    },
    { name: "Permit & HOA Approval", icon: permitIcon, link: "/permit-hoa" },
  ];

  useEffect(() => {
    const currentPath = location.pathname;
    const activeMenuItem = menuItems.find(item =>
      item.link === currentPath ||
      (item.subMenu && item.subMenu.some(subItem => subItem.link === currentPath))
    );

    if (activeMenuItem) {
      setActiveItem(activeMenuItem.name);
    }
  }, [location.pathname]);

  const toggleDropdown = (itemName) => {
    setOpenDropdown((prev) => (prev === itemName ? null : itemName));
  };

  return (
    <div className="relative ps-3 pb-0 pt-3 pe-3">
      <div className="flex justify-between items-center p-4 bg-white shadow-md">
        <button className="text-xl" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>

      <div
        className={`min-h-screen fixed inset-y-0 left-0 lg:w-72 md:w-72 bg-white shadow-md rounded-xl transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out z-50`}
      >
        <nav className="flex flex-col space-y-2 p-4">
          {menuItems.map((item) => (
            <React.Fragment key={item.name}>
              {item.subMenu ? (
                <div className="flex flex-col">
                  <div
                    onClick={() => toggleDropdown(item.name)}
                    className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer ${activeItem === item.name || item.subMenu.some(subItem => location.pathname === subItem.link) ? "text-[#4508A8] font-semibold bg-gray-100" : "text-[#666666]"} hover:bg-gray-200`}
                  >
                    <img src={item.icon} alt={`${item.name} icon`} className="w-5 h-5" />
                    <span className="hidden md:block text-base">{item.name}</span>
                    <FontAwesomeIcon icon={openDropdown === item.name ? faChevronUp : faChevronDown} className="ml-auto" />
                  </div>
                  {openDropdown === item.name && (
                    <div className="ml-8 flex flex-col space-y-2">
                      {item.subMenu.map((subItem) => (
                        <Link to={subItem.link} key={subItem.name}>
                          <div
                            className={`p-2 rounded-lg cursor-pointer ${location.pathname === subItem.link ? "text-[#4508A8] font-semibold bg-gray-100" : "text-[#666666]"
                              } hover:bg-gray-200`}
                          >
                            {subItem.name}
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link to={item.link}>
                  <div
                    onClick={() => setActiveItem(item.name)}
                    className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer ${activeItem === item.name ? "text-[#4508A8] font-semibold bg-gray-100" : "text-[#666666]"
                      } hover:bg-gray-200`}
                  >
                    <img src={item.icon} alt={`${item.name} icon`} className="w-5 h-5" />
                    <span className="hidden md:block text-base">{item.name}</span>
                  </div>
                </Link>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>

  );
};

export default Sidebar;
