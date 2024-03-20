import React from 'react'
import { GiIndianPalace, GiIndiaGate } from "react-icons/gi"
import { BsBuildingsFill, BsHospitalFill, BsFillHouseAddFill, BsTaxiFrontFill } from "react-icons/bs"

const Megamenuspecialities = () => {
  return (
    <div className="absolute mt-2 p-8 space-x-4 bg-megamenuColor border shadow-xl w-auto">
      <div className="grid grid-cols-3 gap-20">
        <div className="col-span-1 text-white">
          <div className="flex items-center gap-2">
            <GiIndianPalace />
            <h3 className="font-bold">Kerala</h3>
          </div>
          <ul>
            <li className="text-lg mt-2">
              <a href="#">Aster Medcity, Kochi</a>
            </li>
            <li className="text-lg mt-2">
              <a href="#">Aster MIMS, Calicut</a>
            </li>
            <li className="text-lg mt-2">
              <a href="#">Aster MIMS, Kannur</a>
            </li>
            <li className="text-lg mt-2">
              <a href="#">Aster MIMS, Kottakkal</a>
            </li>
            <li className="text-lg mt-2">
              <a href="#">Aster Mother, Areekode</a>
            </li>
            <li className="text-lg mt-2">
              <a href="#">Aster PMF, Kollam</a>
            </li>
          </ul>
          <div className="mt-16">
            <div className="flex items-center gap-2">
              <BsHospitalFill />
              <h3 className="font-bold mb-2">Maharashtra</h3>
            </div>
            <ul>
              <li className="text-lg mt-2">
                <a href="#">Aster Aadhar, Kolhapur</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="col-span-1 text-white">
          <div className="flex items-center gap-2">
            <GiIndiaGate />
            <h3 className="font-bold">Karnataka</h3>
          </div>
          <ul>
            <li className="text-lg mt-2">
              <a href="#">Aster Medcity, Kochi</a>
            </li>
            <li className="text-lg mt-2">
              <a href="#">Aster MIMS, Calicut</a>
            </li>
            <li className="text-lg mt-2">
              <a href="#">Aster MIMS, Kannur</a>
            </li>
            <li className="text-lg mt-2">
              <a href="#">Aster MIMS, Kottakkal</a>
            </li>
            <li className="text-lg mt-2">
              <a href="#">Aster Mother, Areekode</a>
            </li>
            <li className="text-lg mt-2">
              <a href="#">Aster PMF, Kollam</a>
            </li>
          </ul>
          <div className="mt-16">
            <div className="flex items-center gap-2">
            <BsFillHouseAddFill />
            <h3 className="font-bold mb-2">Telengana</h3>
            </div>
            <ul>
              <li className="text-lg mt-2">
                <a href="#">Aster Prime, Hyderabad</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="col-span-1 text-white">
          <div className="flex items-center gap-2">
            <BsBuildingsFill />
            <h3 className="font-bold">Andra pradesh</h3>
          </div>
          <ul>
            <li className="text-lg mt-2">
              <a href="#">Aster Medcity, Kochi</a>
            </li>
            <li className="text-lg mt-2">
              <a href="#">Aster MIMS, Calicut</a>
            </li>
            <li className="text-lg mt-2">
              <a href="#">Aster MIMS, Kannur</a>
            </li>
            <li className="text-lg mt-2">
              <a href="#">Aster MIMS, Kottakkal</a>
            </li>
            <li className="text-lg mt-2">
              <a href="#">Aster Mother, Areekode</a>
            </li>
            <li className="text-lg mt-2">
              <a href="#">Aster PMF, Kollam</a>
            </li>
          </ul>
          <div className="mt-16">
            <div className="flex items-center gap-2">
                <BsTaxiFrontFill />
                <h3 className="font-bold mb-2">Our clinics</h3>
            </div>
            <ul>
              <li className="text-lg mt-2">
                <a href="#">Yelahanka New Town, Bangalore</a>
              </li>
              <li className="text-lg mt-2">
                <a href="#">Manyata Tech Park, Bangalore</a>
              </li>
              <li className="text-lg mt-2">
                <a href="#">International Airport, Bangalore.</a>
              </li>
              <li className="text-lg mt-2">
                <a href="#">JP Nagar, Bangalore</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Megamenuspecialities
