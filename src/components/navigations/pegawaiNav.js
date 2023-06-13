import { useState, useEffect } from "react";
import { LogoutSmartphone, NavListSmartphone } from "./navList";
import ibn from "../../images/IBN-Logo-192x192.png";

function PegawaiNav({ posision, role }) {
  const posisi = posision;
  const [hamburgerTogel, setHamburgerTogel] = useState(false);

  const [absensi, setAbsensi] = useState([false, "Absensi", "absensi"]);
  const [profile, setProfile] = useState([false, "Profile", "profile"]);

  useEffect(() => {
    if (posisi === "absensi") setAbsensi([true, "Absensi"]);
    if (posisi === "profile") setProfile([true, "profile"]);
  }, [posisi]);

  return (
    <aside className={`${role ? "block" : "hidden"} py-3 px-5 w-full h-[8vh] border-r border-gray-200 bg-white bg-opacity-50 backdrop-blur-sm shadow-custom fixed`}>
      <div className="flex items-center">
        <img src={ibn} alt="Logo" className="h-8" />
        <div className="ml-2 flex gap-1">
          <h1 className="text-lg font-semibold text-gray-800">Presensi </h1>
          <h1 className="text-lg font-semibold text-blue-800"> QR-Qode</h1>
        </div>
      </div>

      <div className="block h-full relative">
        <div onClick={() => setHamburgerTogel(!hamburgerTogel)} className="px-2 py-[3px] border-2 rounded border-blue-600 hover:text-white hover:shadow-2xl absolute -right-2 -top-7 block  ">
          <span className="w-6 h-[2px] my-1 block bg-blue-600"></span>
          <span className="w-6 h-[2px] my-1 block bg-blue-600"></span>
          <span className="w-6 h-[2px] my-1 block bg-blue-600"></span>
        </div>

        <div className={`${hamburgerTogel ? "-right-2" : "-right-[280px]"} duration-500 absolute z-[100]  mt-2 w-64 divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}>
          <NavListSmartphone link={absensi[2]} on={absensi[0]} name={absensi[1]} />
          <NavListSmartphone link={profile[2]} on={profile[0]} name={profile[1]} />
          <LogoutSmartphone />
        </div>
      </div>
    </aside>
    //    <aside className={`${role ? "block" : "hidden"} py-3 px-5 w-full h-[8vh] lg:w-60 lg:h-full border-r border-gray-200 bg-white bg-opacity-50 backdrop-blur-sm shadow-custom fixed`}>
    //    <div className="flex items-center">
    //      <img src={ibn} alt="Logo" className="h-8 lg:h-12" />
    //      <div className="ml-2 lg:mt-3 flex gap-1 lg:block">
    //        <h1 className="text-lg lg:text-2xl font-semibold text-gray-800">Presensi </h1>
    //        <h1 className="text-lg lg:text-2xl font-semibold text-teal-800"> QR-Qode</h1>
    //      </div>
    //    </div>
    //    <div className="hidden lg:block">
    //      <ul className="flex flex-col gap-y-4 pt-16">
    //        <NavListDesktop link={absensi[2]} on={absensi[0]} name={absensi[1]} />
    //        <NavListDesktop link={profile[2]} on={profile[0]} name={profile[1]} />
    //      </ul>
    //    </div>

    //    <div className="block lg:hidden h-full relative">
    //      <div onClick={() => setHamburgerTogel(!hamburgerTogel)} className="px-2 py-[3px] border-2 rounded border-teal-500 hover:text-white hover:shadow-2xl absolute -right-2 -top-7 block lg:hidden ">
    //        <span className="w-6 h-[2px] my-1 block bg-teal-500"></span>
    //        <span className="w-6 h-[2px] my-1 block bg-teal-500"></span>
    //        <span className="w-6 h-[2px] my-1 block bg-teal-500"></span>
    //      </div>

    //      <div className={`${hamburgerTogel ? "-right-2" : "-right-[280px]"} duration-500 absolute z-[100]  mt-2 w-64 divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}>
    //        <NavListSmartphone link={absensi[2]} on={absensi[0]} name={absensi[1]} />
    //        <NavListSmartphone link={profile[2]} on={profile[0]} name={profile[1]} />
    //      </div>
    //    </div>
    //  </aside>
  );
}

export default PegawaiNav;
