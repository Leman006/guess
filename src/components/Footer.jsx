import React from 'react'
import { IoCheckmarkSharp, IoLocationSharp } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import qrImage from '../assets/qrcode.jpeg'
import { FaFacebook, FaInstagram, FaPinterest, FaTiktok, FaYoutube } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

function Footer() {
  return (
    <div className='w-[1690px] mx-auto pb-[24px]'>
      <hr className="border-t-[3px] border-[#e6e6e6]"/>
      <div className="foot1 flex flex-col items-center py-[45px]">
        <h4 className='font-[600] text-[20px] mb-[8px] font-[Open_Sans,Century_Gothic,CenturyGothic,AppleGothic,sans-serif]'>Our exclusive services</h4>
        <p className='font-[500] text-[16px] mb-[8px] font-[Open_Sans]'>Tailor-made to enhance your shopping experience</p>
        <div className='flex mt-[48px] w-[320px] justify-between mb-[32px]'>
            <Link className='flex flex-col hover:underline items-center'>
                <img className='w-[62px] h-[50px] mb-[16px]' src="https://img.guess.com/image/upload/v1/EU/Asset/Europe/E-Commerce/assets/services/Giftbox.png" alt="" />
                <p>Gift Packaging</p>
            </Link>
            <Link className='flex flex-col hover:underline items-center'>
                <img className='w-[62px] h-[50px] mb-[16px]' src="https://img.guess.com/image/upload/v1/EU/Asset/Europe/E-Commerce/assets/services/PersonalShopper.png" alt="" />
                <p>Personal Shopper</p>
            </Link>
        </div>
        <Link
        className="relative inline-block pb-[2px] border-b border-black
                    after:content-[''] after:absolute after:left-0 after:bottom-0
                    after:h-[1.5px] after:w-0 after:bg-black
                    after:transition-all after:duration-300 hover:after:w-full"
        >
        Discover more
        </Link>

      </div>
      <hr className="border-t-[3px] border-[#e6e6e6]"/>
      <div className="foot2 pt-[32px] pl-[16px] flex">
        <div className="foot-left w-[420px]">
            <h5 className='mb-[16px] text-[16px]'>Sign up now and get 10% off</h5>
            <ul className='mb-[28px]'>
                <li className='flex items-center my-[8px] text-[16px]'><IoCheckmarkSharp className='mr-[5px]'/>Birthday promo</li>
                <li className='flex items-center my-[8px] text-[16px]'><IoCheckmarkSharp className='mr-[5px]'/>Early access to sales</li>
                <li className='flex items-center my-[8px] text-[16px]'><IoCheckmarkSharp className='mr-[5px]'/>Exclusive discounts</li>
            </ul>
            <Link className='bg-[#1d1d1d] rounded-[4px] px-[45px] py-[17px] text-white border-2 border-transparent hover:border-black hover:bg-white hover:text-black transition-colors duration-300 text-[14px]'>
            Register Now</Link>
            <h4 className='mt-[50px] text-[19px] font-[600] text-[#1c1b1b] mb-[24px] font-[Open_Sans,Century_Gothic,CenturyGothic,AppleGothic,sans-serif]'>Discover our app:</h4>
            <div className='flex gap-5'>
                <img className='w-[90px] h-[90px]' src={qrImage} alt="" />
                <div className='flex gap-3 flex-col'>
                    <img className='w-[120px] h-[40px]' src="https://content.guess.com/guesseurope/guesseu/assets/badge/App_Store_Badge_en.svg" alt="" />
                    <img className='w-[135px] h-[40px]' src="https://content.guess.com/guesseurope/guesseu/assets/badge/GetItOnGooglePlay_en.png" alt="" />
                </div>
            </div>
            <p className='text-[#aaa] mt-[20px] text-[10px]'>GUESS?, Inc. © 2025 All Rights Reserved.</p>
        </div>
        <div className='border-1 border-[#e5e5e5] h-[420px] w-[2px]'></div>
        <div className="foot-right px-[85px] w-full">
            <div className="columns flex justify-between">
                <div className="column flex flex-col">
                    <h5 className='mb-[16px] text-[16px] font-[600] font-[Open_Sans,Century_Gothic,CenturyGothic,AppleGothic,sans-serif]'>Customer Service</h5>
                    <Link className='text-[12px] mb-[10px]'>Need help?</Link>
                    <Link className='text-[12px] mb-[10px]'>My Orders</Link>
                    <Link className='text-[12px] mb-[10px]'>Register your return</Link>
                    <Link className='text-[12px] mb-[10px]'>Exclusive Services</Link>
                </div>
                <div className="column flex flex-col">
                    <h5 className='mb-[16px] text-[16px] font-[600] font-[Open_Sans,Century_Gothic,CenturyGothic,AppleGothic,sans-serif]'>My account</h5>
                    <Link className='text-[12px] mb-[10px]'>Account</Link>
                    <Link className='text-[12px] mb-[10px]'>Orders</Link>
                    <Link className='text-[12px] mb-[10px]'>Privacy policy</Link>
                </div>
                <div className="column flex flex-col">
                    <h5 className='mb-[16px] text-[16px] font-[600] font-[Open_Sans,Century_Gothic,CenturyGothic,AppleGothic,sans-serif]'>Corporate</h5>
                    <Link className='text-[12px] mb-[10px]'>Careers</Link>
                    <Link className='text-[12px] mb-[10px]'>Investor Relations</Link>
                    <Link className='text-[12px] mb-[10px]'>Subsidiaries</Link>
                    <Link className='text-[12px] mb-[10px]'>Guess Family</Link>
                    <Link className='text-[12px] mb-[10px]'>Guess Journal</Link>
                    <Link className='text-[12px] mb-[10px]'>Sustainability</Link>
                    <Link className='text-[12px] mb-[10px]'>Diversity and Inclusion</Link>
                </div>
                <div className="column flex flex-col">
                    <h5 className='mb-[16px] text-[16px] font-[600] font-[Open_Sans,Century_Gothic,CenturyGothic,AppleGothic,sans-serif]'>Privacy and Conditions</h5>
                    <Link className='text-[12px] mb-[10px]'>Privacy and Cookie Policy</Link>
                    <Link className='text-[12px] mb-[10px]'>Terms and Conditions</Link>
                    <Link className='text-[12px] mb-[10px]'>Manage Cookie Consent</Link>
                </div>
                <div className="column flex flex-col">
                    <h5 className='mb-[16px] text-[16px] font-[600] font-[Open_Sans,Century_Gothic,CenturyGothic,AppleGothic,sans-serif]'>Follow Us</h5>
                    <Link className='text-[12px] mb-[10px] flex items-center hover:text-[#666]'><FaFacebook  className='mr-[3px]'/>Facebook</Link>
                    <Link className='text-[12px] mb-[10px] flex items-center hover:text-[#666]'><FaInstagram  className='mr-[3px]'/>Instagram</Link>
                    <Link className='text-[12px] mb-[10px] flex items-center hover:text-[#666]'><FaXTwitter  className='mr-[3px]'/>X</Link>
                    <Link className='text-[12px] mb-[10px] flex items-center hover:text-[#666]'><FaTiktok  className='mr-[3px]'/>Tiktok</Link>
                    <Link className='text-[12px] mb-[10px] flex items-center hover:text-[#666]'><FaYoutube  className='mr-[3px]'/>YouTube</Link>
                    <Link className='text-[12px] mb-[10px] flex items-center hover:text-[#666]'><FaPinterest  className='mr-[3px]'/>Pinterest</Link>
                </div>
            </div>
            <div className="foot-row flex items-end h-[180px] justify-between">
                <div className='flex'>
                    <div className='flex items-center'>
                        <img className='w-[24px] h-[16px]' src="https://meclis.gov.az/main/bayraq.svg" alt="" />
                        <p className='ml-[4px] text-[13px]'>AZ | en -</p>
                        <Link className='underline text-[13px]'>Change</Link>
                    </div>
                    <div className='flex items-center ml-[76px]'>
                        <IoLocationSharp />
                        <Link className='underline text-[13px] ml-[3px]'>Find your closest store</Link>
                    </div>
                </div>
                
                <div className="banks flex justify-end items-end ">
                    <img className='w-[34px] h-[23px] mr-[16px]' src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMjMgMjI3IiB3aWR0aD0iMzIzIiBoZWlnaHQ9IjIyNyI+Cgk8ZGVmcz4KCQk8Y2xpcFBhdGggY2xpcFBhdGhVbml0cz0idXNlclNwYWNlT25Vc2UiIGlkPSJjcDEiPgoJCQk8cGF0aCBkPSJNMCAwTDMyMyAwTDMyMyAyMjdMMCAyMjdaIiAvPgoJCTwvY2xpcFBhdGg+Cgk8L2RlZnM+Cgk8c3R5bGU+CgkJdHNwYW4geyB3aGl0ZS1zcGFjZTpwcmUgfQoJCS5zaHAwIHsgZmlsbDogIzM2NDk1ZCB9IAoJCS5zaHAxIHsgZmlsbDogI2YxNjUyMiB9IAoJCS5zaHAyIHsgZmlsbDogI2U0MWIyNCB9IAoJCS5zaHAzIHsgZmlsbDogI2Y4OWUxYyB9IAoJPC9zdHlsZT4KCTxnIGlkPSJQYWdlIDEiIGNsaXAtcGF0aD0idXJsKCNjcDEpIj4KCQk8cGF0aCBpZD0iUGF0aCAxIiBjbGFzcz0ic2hwMCIgZD0iTTI5Mi42MyAyMjdMMjkuODggMjI3QzEzLjM4IDIyNyAwIDIxMy42MiAwIDE5Ny4xMkwwIDI5Ljc3QzAgMTMuMjYgMTMuMzggLTAuMTIgMjkuODggLTAuMTJMMjkyLjYzIC0wLjEyQzMwOS4xNCAtMC4xMiAzMjIuNTIgMTMuMjYgMzIyLjUyIDI5Ljc3TDMyMi41MiAxOTcuMTJDMzIyLjUyIDIxMy42MiAzMDkuMTQgMjI3IDI5Mi42MyAyMjdaIiAvPgoJCTxwYXRoIGlkPSJQYXRoIDIiIGNsYXNzPSJzaHAxIiBkPSJNMTg4LjM1IDE2Mi4xM0wxMzQuMTYgMTYyLjEzTDEzNC4xNiA2NC43NkwxODguMzUgNjQuNzZMMTg4LjM1IDE2Mi4xM1oiIC8+CgkJPHBhdGggaWQ9IlBhdGggMyIgY2xhc3M9InNocDIiIGQ9Ik0xMzcuNjEgMTEzLjQ0QzEzNy42MSA5My42OSAxNDYuODYgNzYuMSAxNjEuMjYgNjQuNzZDMTUwLjcyIDU2LjQ2IDEzNy40MyA1MS41MiAxMjIuOTkgNTEuNTJDODguNzkgNTEuNTIgNjEuMDcgNzkuMjQgNjEuMDcgMTEzLjQ0QzYxLjA3IDE0Ny42NCA4OC43OSAxNzUuMzcgMTIyLjk5IDE3NS4zN0MxMzcuNDMgMTc1LjM3IDE1MC43MiAxNzAuNDIgMTYxLjI2IDE2Mi4xM0MxNDYuODYgMTUwLjc5IDEzNy42MSAxMzMuMTkgMTM3LjYxIDExMy40NFoiIC8+CgkJPHBhdGggaWQ9IlBhdGggNCIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGFzcz0ic2hwMyIgZD0iTTI2MS40NSAxMTMuNDRDMjYxLjQ1IDE0Ny42NCAyMzMuNzMgMTc1LjM2IDE5OS41MyAxNzUuMzZDMTg1LjA4IDE3NS4zNiAxNzEuNzkgMTcwLjQxIDE2MS4yNiAxNjIuMTJDMTc1LjY2IDE1MC43OSAxODQuOTEgMTMzLjE5IDE4NC45MSAxMTMuNDRDMTg0LjkxIDkzLjY4IDE3NS42NiA3Ni4wOSAxNjEuMjYgNjQuNzVDMTcxLjc5IDU2LjQ2IDE4NS4wOCA1MS41MiAxOTkuNTMgNTEuNTJDMjMzLjczIDUxLjUyIDI2MS40NSA3OS4yNCAyNjEuNDUgMTEzLjQ0Wk0yNTUuMSAxNTEuODFMMjU1LjEgMTQ5LjgyTDI1NC4yOSAxNDkuODJMMjU0LjI5IDE0OS40MUwyNTYuMzQgMTQ5LjQxTDI1Ni4zNCAxNDkuODJMMjU1LjU0IDE0OS44MkwyNTUuNTQgMTUxLjgxTDI1NS4xIDE1MS44MVpNMjU5LjA3IDE1MS44MUwyNTkuMDcgMTQ5Ljk5TDI1OC4zOSAxNTEuNTZMMjU3LjkzIDE1MS41NkwyNTcuMjYgMTUwTDI1Ny4yNiAxNTEuODFMMjU2LjgyIDE1MS44MUwyNTYuODIgMTQ5LjQxTDI1Ny40NSAxNDkuNDFMMjU4LjE3IDE1MS4wNkwyNTguODkgMTQ5LjQxTDI1OS41MSAxNDkuNDFMMjU5LjUxIDE1MS44MUwyNTkuMDcgMTUxLjgxWiIgLz4KCTwvZz4KPC9zdmc+" alt="" />
                    <img className='w-[34px] h-[23px] mr-[16px]' src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMjMgMjI3IiB3aWR0aD0iMzIzIiBoZWlnaHQ9IjIyNyI+Cgk8ZGVmcz4KCQk8Y2xpcFBhdGggY2xpcFBhdGhVbml0cz0idXNlclNwYWNlT25Vc2UiIGlkPSJjcDEiPgoJCQk8cGF0aCBkPSJNMCAwTDMyMyAwTDMyMyAyMjdMMCAyMjdaIiAvPgoJCTwvY2xpcFBhdGg+Cgk8L2RlZnM+Cgk8c3R5bGU+CgkJdHNwYW4geyB3aGl0ZS1zcGFjZTpwcmUgfQoJCS5zaHAwIHsgZmlsbDogIzAwNjZiMiB9IAoJCS5zaHAxIHsgZmlsbDogI2ZmZmZmZiB9IAoJCS5zaHAyIHsgZmlsbDogI2Y5YTUzMyB9IAoJPC9zdHlsZT4KCTxnIGlkPSJQYWdlIDEiIGNsaXAtcGF0aD0idXJsKCNjcDEpIj4KCQk8cGF0aCBpZD0iUGF0aCAxIiBjbGFzcz0ic2hwMCIgZD0iTTI5Mi42MyAyMjdMMjkuODggMjI3QzEzLjM4IDIyNyAwIDIxMy42MiAwIDE5Ny4xMkwwIDI5Ljc3QzAgMTMuMjYgMTMuMzggLTAuMTIgMjkuODggLTAuMTJMMjkyLjYzIC0wLjEyQzMwOS4xNCAtMC4xMiAzMjIuNTIgMTMuMjYgMzIyLjUyIDI5Ljc3TDMyMi41MiAxOTcuMTJDMzIyLjUyIDIxMy42MiAzMDkuMTQgMjI3IDI5Mi42MyAyMjdaIiAvPgoJCTxwYXRoIGlkPSJQYXRoIDIiIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xhc3M9InNocDEiIGQ9Ik0xNDcuNTcgMTQ5LjAyTDEzMC43NyAxNDkuMDJMMTQxLjI3IDg0LjVMMTU4LjA3IDg0LjVMMTQ3LjU3IDE0OS4wMlpNMTM0LjcyIDg0LjVMMTA3Ljk5IDE0OS4wMkw5MC40OSAxNDkuMDJMNzUuODkgOTIuOTdDNjYuNDIgODcuMjcgNTguMzIgODUuNTkgNTguMzIgODUuNTlMNTguNjMgODQuNUw4NS4xMSA4NC41QzkyLjM5IDg0LjUgOTMuMDggOTAuMzEgOTMuMDggOTAuMzFMOTguNzMgMTE5LjMyTDk4LjczIDExOS4zMkwxMDAuNjIgMTI4Ljg4TDExNi42NCA4NC41TDEzNC43MiA4NC41Wk0yNDYuOCAxMzkuNDRMMjI1LjQ0IDEzOS40NEwyMjEuOTQgMTQ5LjAyTDIwNC40MyAxNDkuMDJMMjI5LjQ4IDg5LjMxQzIyOS40OCA4OS4zMSAyMzEgODQuNSAyMzcuMjQgODQuNUwyNTAuNzQgODQuNUwyNjQuMTkgMTQ5LjAyTDI0OC43NyAxNDkuMDJMMjQ2LjggMTM5LjQ0Wk0yNDQuMDcgMTI2LjJMMjM5LjExIDEwMi4wNUwyMzAuMjggMTI2LjJMMjQ0LjA3IDEyNi4yWk0xODIuMTkgMTAyLjQxQzE4Mi4xOSAxMDkuNyAyMDUuNjQgMTExLjI3IDIwNS42NCAxMjguMDRDMjA1LjY0IDE0NC4xOSAxODguMzQgMTUwLjEzIDE3Ni44OCAxNTAuMTNDMTY1LjQyIDE1MC4xMyAxNTcuOTIgMTQ2LjQ5IDE1Ny45MiAxNDYuNDlMMTYwLjQyIDEzMkMxNjcuMjkgMTM3LjUyIDE4OC4xMyAxMzkuMDkgMTg4LjEzIDEzMC4zM0MxODguMTMgMTIxLjU4IDE2NC45IDEyMS4zNyAxNjQuOSAxMDQuN0MxNjQuOSA4Ni45OSAxODQuNjkgODMuMzQgMTkzLjAzIDgzLjM0QzIwMC43NCA4My4zNCAyMDguMTQgODYuMTYgMjA4LjE0IDg2LjE2TDIwNS43NCAxMDAuMDFDMTk4LjU1IDk2LjA1IDE4Mi4xOSA5NS4xMiAxODIuMTkgMTAyLjQxWiIgLz4KCQk8cGF0aCBpZD0iUGF0aCAzIiBjbGFzcz0ic2hwMiIgZD0iTTk4LjczIDExOS4zMkw5My4wOCA5MC4zMUM5My4wOCA5MC4zMSA5Mi4zOSA4NC41IDg1LjExIDg0LjVMNTguNjMgODQuNUw1OC4zMiA4NS41OUM1OC4zMiA4NS41OSA3MS4wNSA4OC4yMyA4My4yNiA5OC4xMUM5NC45MiAxMDcuNTUgOTguNzMgMTE5LjMyIDk4LjczIDExOS4zMloiIC8+Cgk8L2c+Cjwvc3ZnPg==" alt="" />
                    <img className='w-[34px] h-[23px] mr-[16px]' src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMjMgMjI3IiB3aWR0aD0iMzIzIiBoZWlnaHQ9IjIyNyI+Cgk8ZGVmcz4KCQk8Y2xpcFBhdGggY2xpcFBhdGhVbml0cz0idXNlclNwYWNlT25Vc2UiIGlkPSJjcDEiPgoJCQk8cGF0aCBkPSJNMCAwTDMyMyAwTDMyMyAyMjdMMCAyMjdaIiAvPgoJCTwvY2xpcFBhdGg+Cgk8L2RlZnM+Cgk8c3R5bGU+CgkJdHNwYW4geyB3aGl0ZS1zcGFjZTpwcmUgfQoJCS5zaHAwIHsgZmlsbDogIzAwNmZjZiB9IAoJCS5zaHAxIHsgZmlsbDogI2Y3ZjdmNyB9IAoJPC9zdHlsZT4KCTxnIGlkPSJQYWdlIDEiIGNsaXAtcGF0aD0idXJsKCNjcDEpIj4KCQk8cGF0aCBpZD0iUGF0aCAxIiBjbGFzcz0ic2hwMCIgZD0iTTI5Mi42MyAyMjdMMjkuODggMjI3QzEzLjM4IDIyNyAwIDIxMy42MiAwIDE5Ny4xMkwwIDI5Ljc3QzAgMTMuMjYgMTMuMzggLTAuMTIgMjkuODggLTAuMTJMMjkyLjYzIC0wLjEyQzMwOS4xNCAtMC4xMiAzMjIuNTIgMTMuMjYgMzIyLjUyIDI5Ljc3TDMyMi41MiAxOTcuMTJDMzIyLjUyIDIxMy42MiAzMDkuMTQgMjI3IDI5Mi42MyAyMjdaIiAvPgoJCTxwYXRoIGlkPSJQYXRoIDIiIGNsYXNzPSJzaHAxIiBkPSJNMzIyLjMgMTgyLjIzTDMyMi4zIDEyOS40TDMxOS40OCAxMjkuNEwxMjIuMzYgMTI5LjRMMTE3LjI3IDEzNi42MUwxMTIuMjIgMTI5LjRMNTQuNzMgMTI5LjRMNTQuNzMgMTg1LjdMMTEyIDE4NS43TDExNyAxNzguMzhMMTIyLjE1IDE4NS43TDE1OCAxODUuN0wxNTggMTczLjU1TDE1Ny42MiAxNzMuNTVDMTYyLjA4IDE3My41NSAxNjYuMTMgMTcyLjc1IDE2OS43MiAxNzEuNDFMMTY5LjcyIDE4NS43TDE5NC43MiAxODUuN0wxOTQuNzIgMTc3LjUxTDIwMS4wMiAxODUuN0wzMDkuNSAxODUuN0MzMTIuNjIgMTg1LjcgMzE1LjU1IDE4NS4xNyAzMTguMTcgMTg0LjIyQzMxOS42NSAxODMuNjggMzIxLjAzIDE4My4wMSAzMjIuMyAxODIuMjNaTTI4Mi44MSAxMTAuMDNMMzA3IDExMC4wM0wzMDcgNTMuNzJMMjgxLjE4IDUzLjcyTDI4MS4xOCA2Mi43M0wyNzUuNDQgNTMuNzJMMjUyLjkzIDUzLjcyTDI1Mi45MyA2NS4xMUwyNDcuODggNTMuNzJMMjEwLjY3IDUzLjcyQzIwOC44OCA1My43MiAyMDcuMTQgNTMuODUgMjA1LjQ1IDU0LjEyQzIwNC4wMSA1NC4zNCAyMDIuNjEgNTQuNjcgMjAxLjI2IDU1LjA5QzIwMC4yIDU1LjQyIDE5OS4xNyA1NS44MSAxOTguMTcgNTYuMjZDMTk3LjAxIDU2LjggMTk1Ljg5IDU3LjQyIDE5NC44NCA1OC4xMkwxOTQuODQgNTYuMTlMMTk0Ljg0IDUzLjcyTDczLjM5IDUzLjcyTDcwLjA4IDYzLjU0TDY2LjcyIDUzLjcyTDM4LjQ2IDUzLjcyTDM4LjQ2IDY1LjIzTDMzLjM2IDUzLjcyTDEwLjMxIDUzLjcyTDAgNzcuODFMMCAxMDUuMDFMMCAxMTAuMDNMMTYuMzMgMTEwLjAzTDE5LjM2IDEwMS45NEwyNS4xMSAxMDEuOTRMMjguMjEgMTEwLjAzTDE1My44MyAxMTAuMDNMMTUzLjgzIDEwMS44NEwxNjAuMTIgMTEwLjAzTDE5NC44NCAxMTAuMDNMMTk0Ljg0IDEwOC4yMkwxOTQuODQgMTA1LjkzQzE5NS43MyAxMDYuNTEgMTk2LjY2IDEwNy4wMiAxOTcuNjEgMTA3LjQ2QzE5OC41NiAxMDcuOSAxOTkuNTMgMTA4LjI3IDIwMC41MSAxMDguNTlDMjAxLjcyIDEwOC45OSAyMDIuOTUgMTA5LjI5IDIwNC4xOCAxMDkuNTFDMjA2LjE5IDEwOS44NyAyMDguMTggMTEwLjAzIDIxMC4wOCAxMTAuMDNMMjMwLjg1IDExMC4wM0wyMzMuODkgMTAxLjk0TDIzOS42NCAxMDEuOTRMMjQyLjczIDExMC4wM0wyNzcuNTUgMTEwLjAzTDI3Ny41NSAxMDEuNjdMMjgyLjgxIDExMC4wM1oiIC8+CgkJPHBhdGggaWQ9IlBhdGggMyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGFzcz0ic2hwMCIgZD0iTTcyLjY5IDE0Ni4yN0w3Mi42OSAxNTMuNjRMOTMuNDYgMTUzLjY0TDkzLjQ2IDE2MS4yNEw3Mi42OSAxNjEuMjRMNzIuNjkgMTY4Ljg4TDkzLjk1IDE2OC44OEw5My45NSAxNzYuNTNMNjMuNTcgMTc2LjUzTDYzLjU3IDEzOC41Nkw5My45NSAxMzguNTZMOTMuOTUgMTQ2LjI3TDcyLjY5IDE0Ni4yN1pNMTE2LjI0IDE2NC4zM0wxMDYuOTEgMTc2LjUzTDk1Ljg0IDE3Ni41M0wxMTAuOTggMTU3LjU1TDk1Ljc5IDEzOC41NkwxMDcuMTggMTM4LjU2TDExNi40NiAxNTAuNjFMMTI1Ljc5IDEzOC41NkwxMzYuODUgMTM4LjU2TDEyMS43MiAxNTcuMzlMMTM2Ljk2IDE3Ni41M0wxMjUuNTcgMTc2LjUzTDExNi4yNCAxNjQuMzNaTTE1OS44NSAxMzguNTZDMTY3LjkzIDEzOC41NiAxNzIuOTcgMTQzLjcyIDE3Mi45NyAxNTEuMjZDMTcyLjk3IDE1OC41OCAxNjcuODIgMTY0IDE1OS41MiAxNjRMMTQ4LjA4IDE2NEwxNDguMDggMTc2LjUzTDEzOC45NyAxNzYuNTNMMTM4Ljk3IDEzOC41NkwxNTkuODUgMTM4LjU2Wk0xNTguOTggMTQ2LjY1TDE0OC4wOCAxNDYuNjVMMTQ4LjA4IDE1NS45N0wxNTguOTggMTU1Ljk3QzE2Mi4xOCAxNTUuOTcgMTYzLjgxIDE1My44NiAxNjMuODEgMTUxLjMxQzE2My44MSAxNDguNzEgMTYyLjE4IDE0Ni42NSAxNTguOTggMTQ2LjY1Wk0xODcuMDIgMTc2LjUzTDE3Ny45MSAxNzYuNTNMMTc3LjkxIDEzOC41NkwxOTguNTIgMTM4LjU2QzIwNi42MSAxMzguNTYgMjExLjY1IDE0My41IDIxMS42NSAxNTAuNjFDMjExLjY1IDE1Ni42OCAyMDcuOCAxNjEuMzQgMjAxLjM1IDE2Mi41NEwyMTMuOTggMTc2LjUzTDIwMi42NSAxNzYuNTNMMTkxLjMxIDE2Mi44NkwxODcuMDIgMTYyLjg2TDE4Ny4wMiAxNzYuNTNaTTE4Ny4wMiAxNDYuMzJMMTg3LjAyIDE1NS43TDE5Ny43MSAxNTUuN0MyMDAuOTcgMTU1LjcgMjAyLjcgMTUzLjY0IDIwMi43IDE1MS4wNEMyMDIuNyAxNDguNDQgMjAwLjk3IDE0Ni4zMiAxOTcuNzEgMTQ2LjMyTDE4Ny4wMiAxNDYuMzJaTTIyNy4zMyAxNDYuMjdMMjI3LjMzIDE1My42NEwyNDguMSAxNTMuNjRMMjQ4LjEgMTYxLjI0TDIyNy4zMyAxNjEuMjRMMjI3LjMzIDE2OC44OEwyNDguNTkgMTY4Ljg4TDI0OC41OSAxNzYuNTNMMjE4LjIxIDE3Ni41M0wyMTguMjEgMTM4LjU2TDI0OC41OSAxMzguNTZMMjQ4LjU5IDE0Ni4yN0wyMjcuMzMgMTQ2LjI3Wk0yNzcuMzMgMTY1LjA5QzI3Ny4zMyAxNjIuODEgMjc1Ljc2IDE2MS40IDI3My41OSAxNjEuNEwyNjQuODYgMTYxLjRDMjU3LjY1IDE2MS40IDI1My4wMyAxNTcuMzkgMjUzLjAzIDE1MC4zOUMyNTMuMDMgMTQzLjU1IDI1Ny45MiAxMzguNTYgMjY2LjExIDEzOC41NkwyODUuNjkgMTM4LjU2TDI4Mi4zMiAxNDYuMjdMMjY1Ljg0IDE0Ni4yN0MyNjMuNjcgMTQ2LjI3IDI2Mi4xNSAxNDcuNzkgMjYyLjE1IDE1MC4wNkMyNjIuMTUgMTUyLjI5IDI2My42NyAxNTMuNyAyNjUuODQgMTUzLjdMMjc0LjYyIDE1My43QzI4MiAxNTMuNyAyODYuNCAxNTcuNjYgMjg2LjQgMTY0LjQ0QzI4Ni40IDE3MS41NCAyODEuNTEgMTc2LjUzIDI3My4zMiAxNzYuNTNMMjU0LjEyIDE3Ni41M0wyNTQuMTIgMTY4Ljk0TDI3My41OSAxNjguOTRDMjc1Ljc2IDE2OC45NCAyNzcuMzMgMTY3LjQyIDI3Ny4zMyAxNjUuMDlaTTMxMy40NiAxNjUuMDlDMzEzLjQ2IDE2Mi44MSAzMTEuODkgMTYxLjQgMzA5LjcyIDE2MS40TDMwMC45OSAxNjEuNEMyOTMuNzcgMTYxLjQgMjg5LjE2IDE1Ny4zOSAyODkuMTYgMTUwLjM5QzI4OS4xNiAxNDMuNTUgMjk0LjA0IDEzOC41NiAzMDIuMjMgMTM4LjU2TDMyMS44MiAxMzguNTZMMzE4LjQ1IDE0Ni4yN0wzMDEuOTYgMTQ2LjI3QzI5OS43OSAxNDYuMjcgMjk4LjI3IDE0Ny43OSAyOTguMjcgMTUwLjA2QzI5OC4yNyAxNTIuMjkgMjk5Ljc5IDE1My43IDMwMS45NiAxNTMuN0wzMTAuNzUgMTUzLjdDMzE4LjEyIDE1My43IDMyMi41MiAxNTcuNjYgMzIyLjUyIDE2NC40NEMzMjIuNTIgMTcxLjU0IDMxNy42NCAxNzYuNTMgMzA5LjQ0IDE3Ni41M0wyOTAuMjUgMTc2LjUzTDI5MC4yNSAxNjguOTRMMzA5LjcyIDE2OC45NEMzMTEuODkgMTY4Ljk0IDMxMy40NiAxNjcuNDIgMzEzLjQ2IDE2NS4wOVpNMzEuMTMgOTIuNzJMMTMuMDcgOTIuNzJMOS44NyAxMDAuODZMMC4xNiAxMDAuODZMMTYuNDQgNjIuODlMMjguNDIgNjIuODlMNDQuNjQgMTAwLjg2TDM0LjM5IDEwMC44NkwzMS4xMyA5Mi43MlpNMTYgODUuNDVMMjguMjEgODUuNDVMMjQuODQgNzcuMDVMMjIuMDggNjkuOTRMMTkuMzEgNzcuMDVMMTYgODUuNDVaTTU1LjYgMTAwLjg2TDQ2Ljc2IDEwMC44Nkw0Ni43NiA2Mi44OUw2Mi43NiA2Mi44OUw3MC4wMyA4OS43OUw3Ny4yNCA2Mi44OUw5My4yOSA2Mi44OUw5My4yOSAxMDAuODZMODQuNDUgMTAwLjg2TDg0LjQ1IDc0Ljg4TDg0LjY3IDY0LjlMNzQuMTUgMTAwLjg2TDY1LjkgMTAwLjg2TDU1LjM4IDY0LjY4TDU1LjYgNzQuOTNMNTUuNiAxMDAuODZaTTEwOS44OSA3MC41OUwxMDkuODkgNzcuOTdMMTMwLjY3IDc3Ljk3TDEzMC42NyA4NS41NkwxMDkuODkgODUuNTZMMTA5Ljg5IDkzLjFMMTMxLjE2IDkzLjFMMTMxLjE2IDEwMC44NkwxMDAuNzggMTAwLjg2TDEwMC43OCA2Mi44OUwxMzEuMTYgNjIuODlMMTMxLjE2IDcwLjU5TDEwOS44OSA3MC41OVpNMTQ2Ljk0IDEwMC44NkwxMzcuODMgMTAwLjg2TDEzNy44MyA2Mi44OUwxNTguNDQgNjIuODlDMTY2LjUyIDYyLjg5IDE3MS41NyA2Ny44MyAxNzEuNTcgNzQuOTNDMTcxLjU3IDgxIDE2Ny43MSA4NS42NyAxNjEuMjYgODYuODZMMTczLjkgMTAwLjg2TDE2Mi41NiAxMDAuODZMMTUxLjIyIDg3LjE5TDE0Ni45NCA4Ny4xOUwxNDYuOTQgMTAwLjg2Wk0xNDYuOTQgNzAuNjVMMTQ2Ljk0IDgwLjAzTDE1Ny42MiA4MC4wM0MxNjAuODggODAuMDMgMTYyLjYyIDc3Ljk3IDE2Mi42MiA3NS4zN0MxNjIuNjIgNzIuNzYgMTYwLjg4IDcwLjY1IDE1Ny42MiA3MC42NUwxNDYuOTQgNzAuNjVaTTE3Ni43NyA2Mi44OUwxODUuODggNjIuODlMMTg1Ljg4IDEwMC44NkwxNzYuNzcgMTAwLjg2TDE3Ni43NyA2Mi44OVpNMTkxLjYzIDgyLjJMMTkxLjYzIDgxLjU1QzE5MS42MyA3MC43NiAxOTguMDQgNjIuODkgMjA5Ljc1IDYyLjg5TDIyMC4zOCA2Mi44OUwyMjAuMzggNzEuMDhMMjEwLjUxIDcxLjA4QzIwNCA3MS4wOCAyMDAuNjkgNzUuNTggMjAwLjY5IDgxLjYxTDIwMC42OSA4Mi4xNUMyMDAuNjkgODguODcgMjA0LjM4IDkyLjc4IDIxMC42MiA5Mi43OEwyMTMuMzggOTIuNzhMMjA5LjY0IDEwMC44NkwyMDkuMTUgMTAwLjg2QzE5OC4yIDEwMC44MSAxOTEuNjMgOTMuNDggMTkxLjYzIDgyLjJaTTI0NS42NiA5Mi43MkwyMjcuNiA5Mi43MkwyMjQuMzkgMTAwLjg2TDIxNC42OSAxMDAuODZMMjMwLjk1IDYyLjg5TDI0Mi45NSA2Mi44OUwyNTkuMTYgMTAwLjg2TDI0OC45MSAxMDAuODZMMjQ1LjY2IDkyLjcyWk0yMzAuNTIgODUuNDVMMjQyLjczIDg1LjQ1TDIzOS4zNiA3Ny4wNUwyMzYuNiA2OS45NEwyMzMuODMgNzcuMDVMMjMwLjUyIDg1LjQ1Wk0yNzAuMTcgMTAwLjg2TDI2MS4yOCAxMDAuODZMMjYxLjI4IDYyLjg5TDI3Mi40NSA2Mi44OUwyODYuNjYgODQuODZMMjg4LjM1IDg3LjY4TDI4OC4yNCA4NC44NkwyODguMjQgNjIuODlMMjk3LjEzIDYyLjg5TDI5Ny4xMyAxMDAuODZMMjg2LjUgMTAwLjg2TDI3MS45NiA3OC4xM0wyNzAuMDcgNzQuOTlMMjcwLjE3IDc4LjEzTDI3MC4xNyAxMDAuODZaIiAvPgoJPC9nPgo8L3N2Zz4=" alt="" />
                    <img className='w-[34px] h-[23px] mr-[16px] bg-cover' src="https://www.paypalobjects.com/webstatic/mktg/logo-center/PP_Acceptance_Marks_for_LogoCenter_266x142.png" alt="" />
                    <img className='w-[34px] h-[23px] mr-[16px] bg-cover' src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/2560px-Google_Pay_Logo.svg.png" alt="" />
                </div>
            </div>
        </div>
      </div>
      
    </div>
  )
}

export default Footer
