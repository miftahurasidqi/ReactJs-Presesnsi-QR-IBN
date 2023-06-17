import { useState } from "react";

export function InputCari({ options, select, setSelect }) {
  const [isActive, setIsActive] = useState(false);
  return (
    <div className="relative w-48 lg:w-56 flex items-center justify-between  mb-3 lg:mb-5">
      <div
        id="parent"
        className="w-full px-2 py-1 bg-gray-100 text-gray-700 rounded-md outline-blue-700 ring-2 ring-blue-900"
        onClick={(e) => {
          setIsActive(!isActive);
        }}
      >
        {select}
      </div>
      {isActive && (
        <div className="absolute w-full -right-1 top-10">
          <div className="bg-gray-50 rounded-md shadow-md">
            {options.map((option, i) => (
              <div
                key={i}
                onClick={(e) => {
                  setSelect(option);
                  setIsActive(false);
                }}
                className="p-1 hover:bg-gray-200 text-gray-700"
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function InputDropdownUser({ options, select, setSelect, setErr }) {
  const [isActive, setIsActive] = useState(false);
  return (
    <div className="relative flex items-center justify-between  mb-3 lg:mb-5">
      <label className="w-[27%] text-gray-700 py-2 text-sm lg:text-md" htmlFor="Role">
        Role
      </label>
      <div
        id="parent"
        className="w-[70%] px-2 py-1 lg:p-2 bg-gray-100 text-gray-700 rounded-md outline-blue-700 ring-2 ring-blue-900"
        onClick={(e) => {
          setErr(false);
          setIsActive(!isActive);
        }}
      >
        {select}
      </div>
      {isActive && (
        <div className="absolute w-[72%] -right-1 top-10">
          <div className="bg-gray-50 rounded-md shadow-md">
            {options.map((option, i) => (
              <div
                key={i}
                onClick={(e) => {
                  setSelect(option);
                  setIsActive(false);
                }}
                className="p-1 hover:bg-gray-200 text-gray-700"
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
