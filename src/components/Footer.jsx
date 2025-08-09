import React, { useState } from 'react';
import { IoCheckmarkSharp, IoLocationSharp, IoChevronDownSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import qrImage from '../assets/qrcode.jpeg'; // Ensure this path is correct
import { FaFacebook, FaInstagram, FaPinterest, FaTiktok, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const footerLinks = [
  {
    title: 'Customer Service',
    links: ['Need help?', 'My Orders', 'Register your return', 'Exclusive Services'],
  },
  {
    title: 'My account',
    links: ['Account', 'Orders', 'Privacy policy'],
  },
  {
    title: 'Corporate',
    links: ['Careers', 'Investor Relations', 'Subsidiaries', 'Guess Family', 'Guess Journal', 'Sustainability', 'Diversity and Inclusion'],
  },
  {
    title: 'Privacy and Conditions',
    links: ['Privacy and Cookie Policy', 'Terms and Conditions', 'Manage Cookie Consent'],
  },
];

function Footer() {
  // State to manage the open/closed status of each accordion
  const [openAccordion, setOpenAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  return (
    <footer className='w-full px-4 md:px-6 lg:px-8 xl:px-12'>
      {/* Container with max-width and center alignment for larger screens */}
      <div className='max-w-[1690px] mx-auto pb-6'>

        {/* Exclusive Services Section */}
        <hr className="border-t-[3px] border-[#e6e6e6]" />
        <div className="foot1 flex flex-col items-center py-8 lg:py-12">
          <h4 className='font-bold text-xl mb-2 font-[Open_Sans,Century_Gothic,CenturyGothic,AppleGothic,sans-serif] text-center'>Our exclusive services</h4>
          <p className='font-medium text-base mb-8 text-center font-[Open_Sans]'>Tailor-made to enhance your shopping experience</p>
          <div className='flex  md:flex-row md:w-[320px] justify-between gap-8 md:gap-y-0'>
            <Link className='flex flex-col items-center hover:underline'>
              <img className='w-[62px] h-[50px] mb-4' src="https://img.guess.com/image/upload/v1/EU/Asset/Europe/E-Commerce/assets/services/Giftbox.png" alt="" />
              <p className='text-sm md:text-base'>Gift Packaging</p>
            </Link>
            <Link className='flex flex-col items-center hover:underline'>
              <img className='w-[62px] h-[50px] mb-4' src="https://img.guess.com/image/upload/v1/EU/Asset/Europe/E-Commerce/assets/services/PersonalShopper.png" alt="" />
              <p className='text-sm md:text-base'>Personal Shopper</p>
            </Link>
          </div>
          <Link
            className="relative inline-block mt-8 pb-[2px] border-b border-black
                       after:content-[''] after:absolute after:left-0 after:bottom-0
                       after:h-[1.5px] after:w-0 after:bg-black
                       after:transition-all after:duration-300 hover:after:w-full text-sm md:text-base"
          >
            Discover more
          </Link>
        </div>

        {/* Main Footer Content */}
        <hr className="border-t-[3px] border-[#e6e6e6]" />
        <div className="foot2 pt-8 flex flex-col lg:flex-row">
          
          {/* Left Section (Sign up & App) */}
          <div className="foot-left w-full lg:w-[420px] px-4 lg:px-0 flex justify-center items-center">
            <div>
            <h5 className='mb-4 text-base font-[Open_Sans,Century_Gothic,CenturyGothic,AppleGothic,sans-serif]'>Sign up now and get 10% off</h5>
            <ul className='mb-6 '>
              <li className='flex items-center my-2 text-sm md:text-base'><IoCheckmarkSharp className='mr-1 md:mr-2' />Birthday promo</li>
              <li className='flex items-center my-2 text-sm md:text-base'><IoCheckmarkSharp className='mr-1 md:mr-2' />Early access to sales</li>
              <li className='flex items-center my-2 text-sm md:text-base'><IoCheckmarkSharp className='mr-1 md:mr-2' />Exclusive discounts</li>
            </ul>
            <Link className='bg-[#1d1d1d] rounded px-6 py-4 text-white border-2 border-transparent hover:border-black hover:bg-white hover:text-black transition-colors duration-300 text-sm'>
              Register Now
            </Link>
            <h4 className='mt-8 text-lg font-bold text-[#1c1b1b] mb-6 font-[Open_Sans,Century_Gothic,CenturyGothic,AppleGothic,sans-serif]'>Discover our app:</h4>
            <div className='flex gap-4 md:gap-5 items-center'>
              <img className='w-[90px] h-[90px]' src={qrImage} alt="QR Code" />
              <div className='flex gap-2 md:gap-3 flex-col'>
                <img className='w-[120px] h-[40px]' src="https://content.guess.com/guesseurope/guesseu/assets/badge/App_Store_Badge_en.svg" alt="App Store" />
                <img className='w-[135px] h-[40px]' src="https://content.guess.com/guesseurope/guesseu/assets/badge/GetItOnGooglePlay_en.png" alt="Google Play" />
              </div>
            </div>
            <p className='text-[#aaa] mt-6 text-xs text-center lg:text-left'>GUESS?, Inc. © 2025 All Rights Reserved.</p>
            </div>
          </div>

          {/* Vertical divider visible only on large screens */}
          <div className='hidden lg:block border-l-2 border-[#e5e5e5] h-[420px] mx-12'></div>

          {/* Right Section (Link Columns & Socials) */}
          <div className="foot-right w-full lg:w-auto mt-8 lg:mt-0 px-4 lg:px-0">
            
            {/* Link Columns - Desktop View */}
            <div className='hidden lg:flex justify-between w-full'>
              {footerLinks.map((column, index) => (
                <div key={index} className="column flex flex-col min-w-[150px]">
                  <h5 className='mb-4 text-base font-bold font-[Open_Sans,Century_Gothic,CenturyGothic,AppleGothic,sans-serif]'>{column.title}</h5>
                  {column.links.map((link, linkIndex) => (
                    <Link key={linkIndex} className='text-xs mb-2 hover:underline'>{link}</Link>
                  ))}
                </div>
              ))}
              {/* Follow Us column is static */}
              <div className="column flex flex-col min-w-[150px]">
                <h5 className='mb-4 text-base font-bold font-[Open_Sans,Century_Gothic,CenturyGothic,AppleGothic,sans-serif]'>Follow Us</h5>
                <Link className='text-xs mb-2 flex items-center hover:text-[#666]'><FaFacebook className='mr-[3px]'/>Facebook</Link>
                <Link className='text-xs mb-2 flex items-center hover:text-[#666]'><FaInstagram className='mr-[3px]'/>Instagram</Link>
                <Link className='text-xs mb-2 flex items-center hover:text-[#666]'><FaXTwitter className='mr-[3px]'/>X</Link>
                <Link className='text-xs mb-2 flex items-center hover:text-[#666]'><FaTiktok className='mr-[3px]'/>Tiktok</Link>
                <Link className='text-xs mb-2 flex items-center hover:text-[#666]'><FaYoutube className='mr-[3px]'/>YouTube</Link>
                <Link className='text-xs mb-2 flex items-center hover:text-[#666]'><FaPinterest className='mr-[3px]'/>Pinterest</Link>
              </div>
            </div>

            {/* Link Columns - Mobile Accordion View */}
            <div className='lg:hidden'>
              {footerLinks.map((column, index) => (
                <div key={index}>
                  <div 
                    className='flex justify-between items-center py-4 border-b border-[#e5e5e5] cursor-pointer'
                    onClick={() => toggleAccordion(index)}
                  >
                    <h5 className='text-base font-bold font-[Open_Sans,Century_Gothic,CenturyGothic,AppleGothic,sans-serif]'>{column.title}</h5>
                    <IoChevronDownSharp className={`transition-transform duration-300 ${openAccordion === index ? 'rotate-180' : ''}`} />
                  </div>
                  <div className={`overflow-hidden transition-all duration-300 ${openAccordion === index ? 'max-h-96' : 'max-h-0'}`}>
                    <ul className='py-2'>
                      {column.links.map((link, linkIndex) => (
                        <li key={linkIndex} className='py-1'>
                          <Link className='text-sm text-[#555] hover:underline'>{link}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
              
              {/* Follow Us Accordion on mobile */}
              <div>
                <div 
                  className='flex justify-between items-center py-4 border-b border-[#e5e5e5] cursor-pointer'
                  onClick={() => toggleAccordion(footerLinks.length)}
                >
                  <h5 className='text-base font-bold font-[Open_Sans,Century_Gothic,CenturyGothic,AppleGothic,sans-serif]'>Follow Us</h5>
                  <IoChevronDownSharp className={`transition-transform duration-300 ${openAccordion === footerLinks.length ? 'rotate-180' : ''}`} />
                </div>
                <div className={`overflow-hidden transition-all duration-300 ${openAccordion === footerLinks.length ? 'max-h-96' : 'max-h-0'}`}>
                  <ul className='py-2'>
                    <li className='py-1'><Link className='text-sm flex items-center hover:text-[#666]'><FaFacebook className='mr-1' />Facebook</Link></li>
                    <li className='py-1'><Link className='text-sm flex items-center hover:text-[#666]'><FaInstagram className='mr-1' />Instagram</Link></li>
                    <li className='py-1'><Link className='text-sm flex items-center hover:text-[#666]'><FaXTwitter className='mr-1' />X</Link></li>
                    <li className='py-1'><Link className='text-sm flex items-center hover:text-[#666]'><FaTiktok className='mr-1' />Tiktok</Link></li>
                    <li className='py-1'><Link className='text-sm flex items-center hover:text-[#666]'><FaYoutube className='mr-1' />YouTube</Link></li>
                    <li className='py-1'><Link className='text-sm flex items-center hover:text-[#666]'><FaPinterest className='mr-1' />Pinterest</Link></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Social Icons & Payment Methods (Responsive) */}
            <div className="flex flex-col lg:flex-row items-center lg:items-end w-full mt-8 lg:mt-0 justify-between">
              
              {/* Country & Store Locator */}
              <div className='flex flex-col md:flex-row items-center lg:items-end mb-6 lg:mb-0'>
                <div className='flex items-center mb-4 md:mb-0'>
                  <img className='w-6 h-4' src="https://meclis.gov.az/main/bayraq.svg" alt="Flag" />
                  <p className='ml-1 text-sm'>AZ | en -</p>
                  <Link className='underline text-sm ml-1'>Change</Link>
                </div>
                <div className='flex items-center md:ml-12'>
                  <IoLocationSharp className='text-lg' />
                  <Link className='underline text-sm ml-1'>Find your closest store</Link>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="banks flex flex-wrap justify-center lg:justify-end items-center lg:items-end gap-x-4 gap-y-2">
                <img className='w-[34px] h-[23px]' src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMjMgMjI3IiB3aWR0aD0iMzIzIiBoZWlnaHQ9IjIyNyI+Cgk8ZGVmcz4KCQk8Y2xpcFBhdGggY2xpcFBhdGhVbml0cz0idXNlclNwYWNlT25Vc2UiIGlkPSJjcDEiPgoJCQk8cGF0aCBkPSJNMCAwTDMyMyAwTDMyMyAyMjdMMCAyMjdaIiAvPgoJCTwvY2xpcFBhdGg+Cgk8L2RlZnM+Cgk8c3R5bGU+CgkJdHNwYW4geyB3aGl0ZS1zcGFjZTpwcmUgfQoJCS5zaHAwIHsgZmlsbDogIzM2NDk1ZCB9IAoJCS5zaHAxIHsgZmlsbDogI2YxNjUyMiB9IAoJCS5zaHAyIHsgZmlsbDogI2U0MWIyNCB9IAoJCS5zaHAzIHsgZmlsbDogI2Y4OWUxYyB9IAoJPC9zdHlsZT4KCTxnIGlkPSJQYWdlIDEiIGNsaXAtcGF0aD0idXJsKCNjcDEpIj4KCQk8cGF0aCBpZD0iUGF0aCAxIiBjbGFzcz0ic2hwMCIgZD0iTTI5Mi42MyAyMjdMMjkuODggMjI3QzEzLjM4IDIyNyAwIDIxMy42MiAwIDE5Ny4xMkwwIDI5Ljc3QzAgMTMuMjYgMTMuMzggLTAuMTIgMjkuODggLTAuMTJMMjkyLjYzIC0wLjEyQzMwOS4xNCAtMC4xMiAzMjIuNTIgMTMuMjYgMzIyLjUyIDI5Ljc3TDMyMi41MiAxOTcuMTJDMzIyLjUyIDIxMy42MiAzMDkuMTQgMjI3IDI5Mi42MyAyMjdaIiAvPgoJCTxwYXRoIGlkPSJQYXRoIDIiIGNsYXNzPSJzaHAxIiBkPSJNMTg4LjM1IDE2Mi4xM0wxMzQuMTYgMTYyLjEzTDEzNC4xNiA2NC43NkwxODguMzUgNjQuNzZMMTg4LjM1IDE2Mi4xM1oiIC8+CgkJPHBhdGggaWQ9IlBhdGggMyIgY2xhc3M9InNocDIiIGQ9Ik0xMzcuNjEgMTEzLjQ0QzEzNy42MSA5My42OSAxNDYuODYgNzYuMSAxNjEuMjYgNjQuNzZDMTUwLjcyIDU2LjQ2IDEzNy40MyA1MS41MiAxMjIuOTkgNTEuNTJDODguNzkgNTEuNTIgNjEuMDcgNzkuMjQgNjEuMDcgMTEzLjQ0QzYxLjA3IDE0Ny42NCA4OC43OSAxNzUuMzcgMTIyLjk5IDE3NS4zN0MxMzcuNDMgMTc1LjM3IDE1MC43MiAxNzAuNDIgMTYxLjI2IDE2Mi4xM0MxNDYuODYgMTUwLjc5IDEzNy42MSAxMzMuMTkgMTM3LjYxIDExMy40NFoiIC8+CgkJPHBhdGggaWQ9IlBhdGggNCIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGFzcz0ic2hwMyIgZD0iTTI2MS40NSAxMTMuNDRDMjYxLjQ1IDE0Ny42NCAyMzMuNzMgMTc1LjM2IDE5OS41MyAxNzUuMzZDMTg1LjA4IDE3NS4zNiAxNzEuNzkgMTcwLjQxIDE2MS4yNiAxNjIuMTJDMTc1LjY2IDE1MC43OSAxODQuOTEgMTMzLjE5IDE4NC45MSAxMTMuNDRDMTg0LjkxIDkzLjY4IDE3NS42NiA3Ni4wOSAxNjEuMjYgNjQuNzVDMTcxLjc5IDU2LjQ2IDE4NS4wOCA1MS41MiAxOTkuNTMgNTEuNTJDMjMzLjczIDUxLjUyIDI2MS40NSA3OS4yNCAyNjEuNDUgMTEzLjQ0Wk0yNTUuMSAxNTEuODFMMjU1LjEgMTQ5LjgyTDI1NC4yOSAxNDkuODJMMjU0LjI5IDE0OS40MUwyNTYuMzQgMTQ5LjQxTDI1Ni4zNCAxNDkuODJMMjU1LjU0IDE0OS44MkwyNTUuNTQgMTUxLjgxTDI1NS4xIDE1MS44MVpNMjU5LjA3IDE1MS44MUwyNTkuMDcgMTQ5Ljk5TDI1OC4zOSAxNTEuNTZMMjU3LjkzIDE1MS41NkwyNTcuMjYgMTUwTDI1Ny4yNiAxNTEuODFMMjU2LjgyIDE1MS44MUwyNTYuODIgMTQ5LjQxTDI1Ny40NSAxNDkuNDFMMjU4LjE3IDE1MS4wNkwyNTguODkgMTQ5LjQxTDI1OS41MSAxNDkuNDFMMjU5LjUxIDE1MS44MUwyNTkuMDcgMTUxLjgxWiIgLz4KCTwvZz4KPC9zdmc+" alt="Credit Card 1" />
                <img className='w-[34px] h-[23px]' src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMjMgMjI3IiB3aWR0aD0iMzIzIiBoZWlnaHQ9IjIyNyI+Cgk8ZGVmcz4KCQk8Y2xpcFBhdGggY2xpcFBhdGhVbml0cz0idXNlclNwYWNlT25Vc2UiIGlkPSJjcDEiPgoJCQk8cGF0aCBkPSJNMCAwTDMyMyAwTDMyMyAyMjdMMCAyMjdaIiAvPgoJCTwvY2xpcFBhdGg+Cgk8L2RlZnM+Cgk8c3R5bGU+CgkJdHNwYW4geyB3aGl0ZS1zcGFjZTpwcmUgfQoJCS5zaHAwIHsgZmlsbDogIzAwNjZiMiB9IAoJCS5zaHAxIHsgZmlsbDogI2ZmZmZmZiB9IAoJCS5zaHAyIHsgZmlsbDogI2Y5YTUzMyB9IAoJPC9zdHlsZT4KCTxnIGlkPSJQYWdlIDEiIGNsaXAtcGF0aD0idXJsKCNjcDEpIj4KCQk8cGF0aCBpZD0iUGF0aCAxIiBjbGFzcz0ic2hwMCIgZD0iTTI5Mi42MyAyMjdMMjkuODggMjI3QzEzLjM4IDIyNyAwIDIxMy42MiAwIDE5Ny4xMkwwIDI5Ljc3QzAgMTMuMjYgMTMuMzggLTAuMTIgMjkuODggLTAuMTJMMjkyLjYzIC0wLjEyQzMwOS4xNCAtMC4xMiAzMjIuNTIgMTMuMjYgMzIyLjUyIDI5Ljc3TDMyMi41MiAxOTcuMTJDMzIyLjUyIDIxMy42MiAzMDkuMTQgMjI3IDI5Mi42MyAyMjdaIiAvPgoJCTxwYXRoIGlkPSJQYXRoIDIiIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xhc3M9InNocDEiIGQ9Ik0xNDcuNTcgMTQ5LjAyTDEzMC43NyAxNDkuMDJMMTQxLjI3IDg0LjVMMTU4LjA3IDg0LjVMMTQ3LjU3IDE0OS4wMlpNMTM0LjcyIDg0LjVMMTA3Ljk5IDE0OS4wMkw5MC40OSAxNDkuMDJMNzUuODkgOTIuOTdDNjYuNDIgODcuMjcgNTguMzIgODUuNTkgNTguMzIgODUuNTlMNTguNjMgODQuNUw4NS4xMSA4NC41QzkyLjM5IDg0LjUgOTMuMDggOTAuMzEgOTMuMDggOTAuMzFMOTguNzMgMTE5LjMyTDk4LjczIDExOS4zMkwxMDAuNjIgMTI4Ljg4TDExNi42NCA4NC41TDEzNC43MiA4NC41Wk0yNDYuOCAxMzkuNDRMMjI1LjQ0IDEzOS40NEwyMjEuOTQgMTQ5LjAyTDIwNC40MyAxNDkuMDJMMjI5LjQ4IDg5LjMxQzIyOS40OCA4OS4zMSAyMzEgODQuNSAyMzcuMjQgODQuNUwyNTAuNzQgODQuNUwyNjQuMTkgMTQ5LjAyTDI0OC43NyAxNDkuMDJMMjQ2LjggMTM5LjQ0Wk0yNDQuMDcgMTI2LjJMMjM5LjExIDEwMi4wNUwyMzAuMjggMTI2LjJMMjQ0LjA3IDEyNi4yWk0xODIuMTkgMTAyLjQxQzE4Mi4xOSAxMDkuNyAyMDUuNjQgMTExLjI3IDIwNS42NCAxMjguMDRDMjA1LjY0IDE0NC4xOSAxODguMzQgMTUwLjEzIDE3Ni44OCAxNTAuMTNDMTY1LjQyIDE1MC4xMyAxNTcuOTIgMTQ2LjQ5IDE1Ny45MiAxNDYuNDlMMTYwLjQyIDEzMkMxNjcuMjkgMTM3LjUyIDE4OC4xMyAxMzkuMDkgMTg4LjEzIDEzMC4zM0MxODguMTMgMTIxLjU4IDE2NC45IDEyMS4zNyAxNjQuOSAxMDQuN0MxNjQuOSA4Ni45OSAxODQuNjkgODMuMzQgMTkzLjAzIDgzLjM0QzIwMC43NCA4My4zNCAyMDguMTQgODYuMTYgMjA4LjE0IDg2LjE2TDIwNS43NCAxMDAuMDFDMTk4LjU1IDk2LjA1IDE4Mi4xOSA5NS4xMiAxODIuMTkgMTAyLjQxWiIgLz4KCQk8cGF0aCBpZD0iUGF0aCAzIiBjbGFzcz0ic2hwMiIgZD0iTTk4LjczIDExOS4zMkw5My4wOCA5MC4zMUM5My4wOCA5MC4zMSA5Mi4zOSA4NC41IDg1LjExIDg0LjVMNTguNjMgODQuNUw1OC4zMiA4NS41OUM1OC4zMiA4NS41OSA3MS4wNSA4OC4yMyA4My4yNiA5OC4xMUM5NC45MiAxMDcuNTUgOTguNzMgMTE5LjMyIDk4LjczIDExOS4zMloiIC8+Cgk8L2c+Cjwvc3ZnPg==" alt="Credit Card 2" />
                <img className='w-[34px] h-[23px]' src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMjMgMjI3IiB3aWR0aD0iMzIzIiBoZWlnaHQ9IjIyNyI+Cgk8ZGVmcz4KCQk8Y2xpcFBhdGggY2xpcFBhdGhVbml0cz0idXNlclNwYWNlT25Vc2UiIGlkPSJjcDEiPgoJCQk8cGF0aCBkPSJNMCAwTDMyMyAwTDMyMyAyMjdMMCAyMjdaIiAvPgoJCTwvY2xpcFBhdGg+Cgk8L2RlZnM+Cgk8c3R5bGU+CgkJdHNwYW4geyB3aGl0ZS1zcGFjZTpwcmUgfQoJCS5zaHAwIHsgZmlsbDogIzAwNmZjZiB9IAoJCS5zaHAxIHsgZmlsbDogI2Y3ZjdmNyB9IAoJPC9zdHlsZT4KCTxnIGlkPSJQYWdlIDEiIGNsaXAtcGF0aD0idXJsKCNjcDEpIj4KCQk8cGF0aCBpZD0iUGF0aCAxIiBjbGFzcz0ic2hwMCIgZD0iTTI5Mi42MyAyMjdMMjkuODggMjI3QzEzLjM4IDIyNyAwIDIxMy42MiAwIDE5Ny4xMkwwIDI5Ljc3QzAgMTMuMjYgMTMuMzggLTAuMTIgMjkuODggLTAuMTJMMjkyLjYzIC0wLjEyQzMwOS4xNCAtMC4xMiAzMjIuNTIgMTMuMjYgMzIyLjUyIDI5.NzctTDMyMi41MiAxOTcuMTJDMzIyLjUyIDIxMy42MiAzMDkuMTQgMjI3IDI5Mi42MyAyMjdaIiAvPgoJCTxwYXRoIGlkPSJQYXRoIDIiIGNsYXNzPSJzaHAxIiBkPSJNMzIyLjMgMTgyLjIzTDMyMi4zIDEyOS40TDMxOS40OCAxMjkuNEwxMjIuMzYgMTI5LjRMMTE3LjI3IDEzNi42MUwxMTIuMjIgMTI5LjRMNTQuNzMgMTI5LjRMNTQuNzMgMTg1LjdMMTEyIDE4NS43TDExNyAxNzguMzhMMTIyLjE1IDE4NS43TDE1OCAxODUuN0wxNTggMTczLjU1TDE1Ny42MiAxNzMuNTVDMTYyLjA4IDE3My41NSAxNjYuMTMgMTcyLjc1IDE2OS43MiAxNzEuNDFMMTY5LjcyIDE4NS43TDE5NC43MiAxODUuN0wxOTQuNzIgMTc3LjUxTDIwMS4wMiAxODUuN0wzMDkuNSAxODUuN0MzMTIuNjIgMTg1LjcgMzE1LjU1IDE4NS4xNyAzMTguMTcgMTg0LjIyQzMxOS42NSAxODMuNjggMzIxLjAzIDE4My4wMSAzMjIuMyAxODIuMjNaTTI4Mi44MSAxMTAuMDNMMzA3IDExMC4wM0wzMDcgNTMuNzJMMjgxLjE4IDUzLjcyTDI4MS4xOCA2Mi43M0wyNzUuNDQgNTMuNzJMMjUyLjkzIDUzLjcyTDI1Mi45MyA2NS4xMUwyNDcuODggNTMuNzJMMjEwLjY3IDUzLjcyQzIwOC44OCA1My43MiAyMDcuMTQgNTMuODUgMjA1LjQ1IDU0LjEyQzIwNC4wMSA1NC4zNCAyMDIuNjEgNTQuNjcgMjAxLjI2IDU1LjA5QzIwMC4yIDU1LjQyIDE5OS4xNyA1NS44MSAxOTguMTcgNTYuMjZDMTk3LjAxIDU2LjggMTk1Ljg5IDU3LjQyIDE5NC44NCA1OC4xMkwxOTQuODQgNTYuMTlMMTk0LjgyIDU2LjE5TDE5NC44NCA1My43Mkw3My4zOSA1My43Mkw3MC4wOCA2My41NEw2Ni43MiA1My43MkwzOC40NiA1My43MkwzOC40NiA2NS4yM0wzMy4zNiA1My43MkwxMC4zMSA1My43MkwwIDc3LjgxTDAgMTA1LjAxTDAgMTEwLjAzTDE2LjMzIDExMC4wM0wxOS4zNiAxMDEuOTRMMjUuMTEgMTAxLjk0TDI4LjIxIDExMC4wM0wxNTMuODMgMTEwLjAzTDE1My44MyAxMDEuODRMMTYwLjEyIDExMC4wM0wxOTQuODQgMTEwLjAzTDE5NC44NCAxMDguMjJMMTk0Ljg0IDEwNS45M0MxOTUuNzMgMTA2LjUxIDE5Ni42NiAxMDcuMDIgMTk3LjYxIDEwNy40NkMxOTguNTYgMTA3LjkgMTk5LjUzIDEwOC4yNyAyMDAuNTEgMTA4LjU5QzIwMS43MiAxMDguOTkgMjAyLjk1IDEwOS4yOSAyMDQuMTggMTA5LjUxQzIwNi4xOSAxMDkuODcgMjA4LjE4IDExMC4wMyAyMTAuMDggMTEwLjAzTDIzMC44NSAxMTAuMDNMMjMzLjg5IDEwMS45NEwyMzkuNjQgMTAxLjkyTDI0Mi43MyAxMTAuMDNMMjc3LjU1IDExMC4wM0wyNzcuNTUgMTAxLjY3TDI4Mi44MSAxMTAuMDNaIiAvPgoJCTxwYXRoIGlkPSJQYXRoIDMiIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xhc3M9InNocDAiIGQ9Ik03Mi42OSA5Mi43Mkw3Mi42OSA5Mi43Mkw3Mi42OSAxMDAuODZMOTMuNDYgMTAwLjg2TDkzLjQ2IDEwOC40Nkw3Mi42OSAxMDguNDZMNzIuNjkgMTE2LjExTDkzLjk1IDExNi4xMUw5My45NSAxMjMuNzdMNjMuNTcgMTIzLjc3TDYzLjU3IDgyLjExTDkzLjk1IDgyLjExTDkzLjk1IDkwLjY5TDcyLjY5IDkwLjY5Wk0xMTYuMjQgMTExLjU3TDEwNi45MSAxMjMuNzZMOTUuODQgMTIzLjc2TDExMC45OCAxMDQuNzhMOTUuNzkgODUuODlMMTA3LjE4IDg1Ljg5TDExNi40NiA5Ny45NEwxMjUuNzkgODUuODlMMTM2Ljg1IDg1Ljg5TDEyMS43MiAxMDQuNjJMMTM2Ljk2IDEyMy43NkwxMjUuNTcgMTIzLjc2TDExNi4yNCAxMTEuNTdaTTE1OS44NSA4NS44OUMxNjcuOTMgODUuODkgMTcyLjk3IDkwLjE0IDE3Mi45NyAxMDEuNjNDMTcyLjk3IDEwOC45NSAxNjcuODIgMTE0LjM4IDE1OS41MiAxMTQuMzhMMTQ4LjA4IDExNC4zOEwxNDguMDggMTIzLjc3TDEzOC45NyAxMjMuNzZMMTM4Ljk3IDgyLjExTDE1OS44NSA4Mi4xMVpNMTU4Ljk4IDkzLjk4TDE0OC4wOCA5My45OEwxNDguMDggMTA1LjMyTDE1OC45OCAxMDUuMzJDMTYyLjE4IDEwNS4zMiAxNjMuODEgMTAzLjIyIDE2My44MSAxMDAuNTlDMTYzLjgxIDk3Ljk4IDE2Mi4xOCA5My45OCAxNTguOTggOTMuOThNMTg3LjAyIDEyMy43NkwxNzcuOTEgMTIzLjc2TDE3Ny45MSA4Mi4xMUwxOTguNTIgODIuMTFDMjA2LjYxIDgyLjExIDIxMS42NSAxMTQuNTggMjExLjY1IDEwMC44NkwyMTEuNjUgMTA2LjY4QzIxMS42NSAxMTIuNzYgMjA3LjggMTE3LjQyIDIwMS4zNSAxMTguNjJMMjEzLjk4IDEyMy43NkwyMDIuNjUgMTIzLjc2TDE5MS4zMSAxMTEuMTJMMTg3LjAyIDExMS4xMkwxODcuMDIgMTIzLjc2Wk0xODcuMDIgOTMuNTZMMTg3LjAyIDEwMi45NUwxOTcuNzEgMTAyLjk1QzIwMC45NyAxMDIuOTUgMjAyLjcgMTAwLjg5IDIwMi43IDk4LjI5QzIwMi43IDk1LjY5IDIwMC45NyA5My41NiAxOTcuNzEgOTMuNTZMMTg3LjAyIDkzLjU2Wk0yMjcuMzMgOTAuNjdMMjI3LjMzIDk4LjA0TDI0OC4xIDk4LjA0TDI0OC4xIDEwNS42NEwyMjcuMzMgMTA1LjY0TDIyNy4zMyAxMTMuMjhMMjQ4LjU5IDExMy4yOEwyNDguNTkgMTIwLjkzTDIxOC4yMSAxMjAuOTNMMjE4LjIxIDgzLjU2TDI0OC41OSAxMjAuOTNMMjQ4LjU5IDkwLjY5TDIyNy4zMyA5MC42OVpNMjc3LjMzIDExMi4zM0MyNzcuMzMgMTEwLjA1IDI3NS43NiAxMDguNjQgMzczLjU5IDEwOC42NEwyNjQuODYgMTA4LjY0QzI1Ny42NSAxMDguNjQgMjUzLjAzIDEwNC41OCAyNTMuMDMgOTcuNTlDMjUzLjAzIDkwLjc5IDI1Ny45MiA4NS44MSAyNjYuMTEgODUuODFMMjg1LjY5IDg1LjgxTDI4Mi4zMiA5My42N0wyNjUuODQgOTMuNjdDMjYzLjY3IDkzLjY3IDI2Mi4xNSAxMTEuMzIgMjYyLjE1IDEwMC40MUMyNjIuMTUgMTAzLjc3IDI2My42NyAxMDguNjQgMjY1Ljg0IDEwMC40MUMyNjguODcgOTcuMjUgMjcyLjA4IDk3LjI1IDI3NC44NyA5OC4zOEMyNzguMTQgOTkuNTIgMjgyLjIgMTAxLjQyIDI4Mi4yIDEwOC41MUMyODIuMiAxMTUuNjEgMjc3LjMyIDEyMC42IDI2OS4xMyAxMjAuNjBMMjUwLjcyIDEyMC42TDI1MC43MiAxMTMuMDNMMjY5LjE3IDExMy4wM0MyNzEuMjcgMTEzLjAzIDI3Mi44IDExMS42MiAyNzIuOCAxMDkuMjZDMjcyLjggMTA3LjE4IDI3MS4yNyAxMDYuOTIgMjY5LjE3IDEwNi45MkwyNjAuODQgMTA2Ljk0QzI1Mi44IDEwNi45NCAyNDcuODUgMTAzLjEyIDI0Ny44NSA5Ni4wNkMyNDcuODUgODguNDkgMjU0LjIgODIuMDcgMjY3LjQ5IDgyLjA3TDI5My4wOCA4Mi4wN0wyOTAuMjIgOTIuNTRMMjcyLjE3IDkyLjU0QzI3MC4zOSA5Mi41NCAyNjkuMTkgOTMuNzcgMjY5LjE5IDk1LjgyQzI2OS4xOSA5Ny45MSAyNzAuNCA5OS4zOCAyNzIuNTggOTkuMzhMMjg1Ljc3IDk5LjM4QzI5NC45MSA5OS4zOCAzMDAuNzQgMTAyLjg2IDMwMC43NCAxMTAuMzJDNDg2LjY3IDEyOC4xOSAyOTkuNzcgMTIwLjYgMjkzLjg5IDEyMC42TDI3Mi4xNSAxMjAuNkMyNjQuOTQgMTIwLjYgMjYwLjMyIDExNS41OSAyNjAuMzIgMTA4LjY4TDI2MC4zMiAxMDYuNDVMMjY1Ljc0IDEwNi40NWMwLjMgMCAxLjA0IDAuMDkgMS43IDAuMjFDMjc1LjIgMTA4LjE4IDI4NS43NyAxMTIuNDkgMjg1Ljc3IDExOS41OUwyODUuNzcgMTIwLjQ3TDMwNC41NyAxMjAuNDdMMzE3LjY2IDEyMC40N0wzMTcuNjYgMTEzLjg3TDMxNy42NiAxMTMuMDNMMzA5LjQyIDExMy4wM0MzMDcuMjUgMTEzLjAzIDMwNS44OCAxMTEuNjMgMzA1Ljg4IDEwOS4yNkwzMDUuODggMTA3LjEzQzMwNS44OCAxMDYuNzkgMzA2LjA1IDEwNi4xOSAzMDYuMjcgMTA1Ljg0QzMwNi4yNyAxMDQuODkgMzA1LjgzIDEwNC41OSAzMDQuMjcgMTA0LjU5TDI4NS43NyAxMDQuNTlMMjg1Ljc3IDk2LjA2TDMwOS4wNCA5Ni4wNkwzMTIuNDEgMTA0LjQ2TDMxNS4yOCAxMTEuNDlMMzE4LjE0IDEwNC40NkwzMjIuNTIgOTYuMDZMMzIyLjUyIDEwOC43MUMzMjIuNTIgMTE3LjExIDMxNy41NyAxMjMuOTkgMzA2Ljg1IDEyMy45OUwyOTAuMDcgMTIzLjk5TDI4Ny42NSAxMTUuMjZMMjg3LjY1IDE2NC42NEwyODcuNjUgMTc2LjUzTDI5NS44OSAxNzYuNTNMNDAwLjE0IDE3Ni41M0w0MDAuMTQgMTU4LjM1TDM5NC4yIDE1OC4zNUwzOTQuMiAxNTMuMTdMNDAwLjYyIDE1My4xN0w0MDAuNjIgMTQ2LjA0TDM5NS40MSAxNDYuMDRMNDAwLjA0IDE0Ni4wNFoiIC8+CgkJPHBhdGggaWQ9IlBhdGggNCIgY2xhc3M9InNocDAiIGQ9Ik0zMTguNDUgMTQ2LjI3TDMwMS45NiAxNDYuMjZDMjk5Ljc5IDE0Ni4yNiAyOTguMjcgMTQ3Ljc4IDI5OC4yNyAxNTAuMDVDMjk4LjI3IDE1Mi4yOCAyOTkuNzkgMTUzLjcgMzAxLjk2IDE1My43TDMxMC43NSAxNTMuN0MzMTguMTIgMTUzLjcgMzIyLjUyIDE1Ny42NiAzMjIuNTIgMTY0LjQzQzMyMi41MiAxNzEuNTQgMzE3LjY0IDE3Ni41MiAzMDkuNDQgMTc2LjUyTDI5MC4yNSAxNzYuNTJMMjkwLjI1IDE2OC45NkwzMDkuNzIgMTY4Ljk2QzMxMS44OSAxNjguOTYgMzEzLjQ2IDE2Ny40MyAzMTMuNDYgMTY1LjA5QzMxMy40NiAxNjIuNzkgMzExLjg5IDE2MS4zOSAzMDkuNzIgMTYxLjM5TDMwMC45OSAxNjEuMzlDMjkzLjc3IDE2MS4zOSAyODkuMTYgMTU3LjM4IDI4OS4xNiAxNTAuMzhDMjg5LjE2IDE0My41NCAyOTQuMDQgMTM4LjU1IDMwMi4yMyAxMzguNTZMMzIxLjgxIDEzOC41NkwzMTguNDUgMTQ2LjI3WiIgLz4KCTwvZz4KPC9zdmc+" alt="Credit Card 3" />
                <img className='w-[34px] h-[23px]' src="https://www.paypalobjects.com/webstatic/mktg/logo-center/PP_Acceptance_Marks_for_LogoCenter_266x142.png" alt="PayPal" />
                <img className='w-[34px] h-[23px]' src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/2560px-Google_Pay_Logo.svg.png" alt="Google Pay" />
              </div>
            </div>
            
            {/* Social Icons - Mobile View (below links) */}
            <hr className='lg:hidden border-t-2 border-[#e6e6e6] mt-8'/>
            <div className='lg:hidden flex justify-center items-center gap-4 text-2xl mt-8'>
              <Link className='text-gray-600 hover:text-black'><FaFacebook /></Link>
              <Link className='text-gray-600 hover:text-black'><FaInstagram /></Link>
              <Link className='text-gray-600 hover:text-black'><FaXTwitter /></Link>
              <Link className='text-gray-600 hover:text-black'><FaTiktok /></Link>
              <Link className='text-gray-600 hover:text-black'><FaYoutube /></Link>
              <Link className='text-gray-600 hover:text-black'><FaPinterest /></Link>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
