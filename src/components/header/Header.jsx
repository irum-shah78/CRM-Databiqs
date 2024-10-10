import React, { useState } from 'react';
import logo from "../../assets/logo.svg";
import profileImage from "../../assets/profile-img.svg";
import notification from "../../assets/notification.svg";
import profileDropdown from "../../assets/profile-dropdown.svg";
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getCurrentDateTime = () => {
    const current = new Date();
    return current.toLocaleString('en-US', {
      month: 'long',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <>
      <header className="flex items-center justify-between px-8 h-[80px] bg-white shadow-md lg:w-full md:w-full w-[400px] z-50">
        <div className="flex items-center cursor-pointer" onClick={handleClick}>
          <img src={logo} alt="Logo" className="w-8 h-8" />
          <span className="ml-2 text-xl font-bold text-[#4508A8]">Crystalyze</span>
        </div>
        <div className="flex items-center space-x-4 gap-3">
          <div className="hidden md:block text-[#656565] text-sm">
            {getCurrentDateTime()}
          </div>

          <div className="relative">
            <button className="focus:outline-none">
              <img src={notification} alt="Notification" />
              <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-[#4508A8] rounded-full"></span>
            </button>
          </div>
          <div className="hidden md:flex items-center">
            <img
              src={profileImage}
              alt="User"
              className="w-8 h-8 rounded-full"
            />
            <div className="text-base flex flex-col ms-2">
              <span className="mr-2 text-[#656565] ms-2">Welcome</span>
              <div className="flex justify-between items-center gap-2 cursor-pointer">
                <span className="ml-2 text-[#4508A8] font-semibold">Jawad Afzal</span>
                <img src={profileDropdown} alt="dropdown" className="w-2 h-2" />
              </div>
            </div>
          </div>

          <div className="md:hidden">
            <button onClick={toggleMenu} className="focus:outline-none">
              <svg className="w-6 h-6 text-[#4508A8]" fill="none" stroke="currentColor" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg p-4 absolute top-[80px] left-0 w-full z-10">
          <div className="flex flex-col items-start space-y-4">
            <div className="text-[#656565] text-sm">
              {getCurrentDateTime()}
            </div>
            <div className="flex items-center ms-2">
              <img
                src={profileImage}
                alt="User"
                className="w-8 h-8 rounded-full"
              />
              <div className="text-base flex flex-col ml-2">
                <span className="text-[#656565]">Welcome</span>
                <div className="flex justify-between items-center gap-2 cursor-pointer">
                  <span className="text-[#4508A8] font-semibold">Jawad Afzal</span>
                  <img src={profileDropdown} alt="dropdown" className="w-2 h-2" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
