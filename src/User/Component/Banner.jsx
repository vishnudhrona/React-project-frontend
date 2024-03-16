import 'flowbite';
import { IoLogoInstagram } from "react-icons/io5";
import { CiFacebook } from "react-icons/ci";
import { IoLogoYoutube } from "react-icons/io";
import { FaGooglePlusSquare } from "react-icons/fa";


const Banner = () => {
  return (
    <>
    <div className="container-fluid mx-auto">
    <div id="default-carousel" className="relative w-full z-20" data-carousel="slide">
      <div className="relative">
{/* Carousel wrapper */}
<div className="relative h-56 overflow-hidden rounded-lg md:h-96">
  {/* Item 1 */}
  <div className="hidden duration-700 ease-in-out" data-carousel-item="">
    <img
      src="https://www.asterhospitals.in/sites/default/files/styles/banner_xxl/public/2023-09/Web%20banner_1920x810%20Web%20banner%20copy.jpg.webp?itok=qwfBJ-uV"
      className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
      alt="..."
    />
  </div>
  {/* Item 2 */}
  <div className="hidden duration-700 ease-in-out" data-carousel-item="">
    <img
      src="https://www.asterhospitals.in/sites/default/files/styles/banner_xxl/public/2023-09/BHB%20Banner.jpg.webp?itok=X8L9u7lH"
      className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
      alt="..."
    />
  </div>
  {/* Item 3 */}
  <div className="hidden duration-700 ease-in-out" data-carousel-item="">
    <img
      src="https://www.asterhospitals.in/sites/default/files/styles/banner_xxl/public/2023-09/ET%20award%20Banner%20web.jpg.webp?itok=mYm8DhMI"
      className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
      alt="..."
    />
  </div>
  {/* Item 4 */}
  <div className="hidden duration-700 ease-in-out" data-carousel-item="">
    <img
      src="https://www.asterhospitals.in/sites/default/files/styles/banner_xxl/public/2023-02/we-will-treat-you-well.webp?itok=i-R-ZzZv"
      className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
      alt="..."
    />
  </div>
  {/* Item 5 */}
  <div className=" duration-700 ease-in-out" data-carousel-item="">
    <img
      src="https://www.asterhospitals.in/sites/default/files/styles/banner_xxl/public/2023-09/Banner%201%20%281%29.jpg.webp?itok=v5yy_gAP"
      className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
      alt="..."
    />
  </div>
</div>
 </div>
{/* Slider indicators */}
<div className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
  <button
    type="button"
    className="w-3 h-3 rounded-full"
    aria-current="true"
    aria-label="Slide 1"
    data-carousel-slide-to={0}
  />
  <button
    type="button"
    className="w-3 h-3 rounded-full"
    aria-current="false"
    aria-label="Slide 2"
    data-carousel-slide-to={1}
  />
  <button
    type="button"
    className="w-3 h-3 rounded-full"
    aria-current="false"
    aria-label="Slide 3"
    data-carousel-slide-to={2}
  />
  <button
    type="button"
    className="w-3 h-3 rounded-full"
    aria-current="false"
    aria-label="Slide 4"
    data-carousel-slide-to={3}
  />
  <button
    type="button"
    className="w-3 h-3 rounded-full"
    aria-current="false"
    aria-label="Slide 5"
    data-carousel-slide-to={4}
  />
</div>
{/* Slider controls */}
<button
  type="button"
  className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
  data-carousel-prev=""
>
  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
    <svg
      className="w-4 h-4 text-white dark:text-gray-800"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 6 10"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 1 1 5l4 4"
      />
    </svg>
    <span className="sr-only">Previous</span>
  </span>
</button>
<button
  type="button"
  className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
  data-carousel-next=""
>
  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
    <svg
      className="w-4 h-4 text-white dark:text-gray-800"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 6 10"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="m1 9 4-4-4-4"
      />
    </svg>
    <span className="sr-only">Next</span>
  </span>
</button>
</div>
    </div>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4 text-blue-900">Overview</h1>
      <p className="text-blue-900 text-xs">
        Malabar Institute of Medical Sciences Ltd (MIMS), the well-acclaimed
        health enterprise and one of the leading healthcare systems in
        Malabar, assures comprehensive health care services with a global
        standard. The 600-bedded multispecialty hospital is renowned for its
        excellent medical expertise, nursing care and quality diagnostic
        services. By focusing on the idea of caring mission with a global
        vision, Aster MIMS - one of the best hospital in Calicut, stresses on
        improving the health of the community by setting up the standard of
        excellence in medical education, research and clinical care. Aiming a
        patient- centric care, the hospital is utilizing enhanced lifesaving
        technologies for leveraging the level of cure.
      </p>
      <div className="container pt-10">
        <div className="flex">
          <div className="w-8/12">
            <img
              className=""
              src="https://www.asterhospitals.in/sites/default/files/styles/webp/public/2021-03/aster-mims-calicut_2.jpg.webp?itok=KbRg3YzU"
              alt="Aster Mims picture"
            />
          </div>
          <div className="w-4/12 bg-customColor p-5">
            <h1 className="text-3xl font-bold text-white pl-3 mb-3">Address</h1>
            <p className="text-white text-xs pl-3 mb-1">
              Address Malabar Institute of Medical Sciences Ltd.  
            </p>
            <p className="text-white text-xs pl-3 mb-1">Mini By-passRoad, Govindapuram P.O.</p>
            <p className="text-white text-xs pl-3">Calicut, Kerala, 673016</p>
            <div className='py-10 px-3'>
              <h1 className='text-white text-2xl font-mono'>Contact Info</h1>
              <span className='text-white'>Email: mimsclt@asterhospital.com</span>
              <button className='bg-green-500 p-2 mt-5 px-5 text-green-900 font-semibold'>Emergency: +91 495 2488 004</button>
              <button className='bg-green-500 p-2 mt-5 px-7 text-green-900 font-semibold'>Helpline: +91 495 2322 004</button>
            </div>
            <div className='flex gap-4'>
            <IoLogoInstagram className='text-slate-400'/>
            <CiFacebook className='text-slate-400'/>
            <IoLogoYoutube className='text-slate-400'/>
            <FaGooglePlusSquare className='text-slate-400'/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default Banner
