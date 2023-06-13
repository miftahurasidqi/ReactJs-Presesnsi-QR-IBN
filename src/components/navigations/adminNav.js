import { useState, useEffect } from "react";
import { LogOutDesktop, LogoutSmartphone, NavListDesktop, NavListSmartphone } from "./navList";
import ibn from "../../images/IBN-Logo-192x192.png";

function AdminNav({ posision, role }) {
  const posisi = posision;
  const [hamburgerTogel, setHamburgerTogel] = useState(false);

  const [kodeAbsen, setKodeAbsen] = useState([false, "Kode Absen", "kodeabsen"]);
  const [daftarKehadiran, setDaftarKehadiran] = useState([false, "Daftar Kehadiran", "daftarkehadiran"]);
  const [daftarUser, setDaftarUser] = useState([false, "Daftar User", "daftaruser"]);

  useEffect(() => {
    if (posisi === "kodeabsen") setKodeAbsen([true, "Kode Absen", ""]);
    if (posisi === "daftarkehadiran") setDaftarKehadiran([true, "Daftar Kehadiran", ""]);
    if (posisi === "daftaruser") setDaftarUser([true, "Daftar User", ""]);
  }, [posisi]);

  return (
    <aside className={`${role ? "block" : "hidden"} py-3 px-5 w-full h-[8vh] lg:w-60 lg:h-full border-r border-gray-200 bg-white bg-opacity-50 backdrop-blur-sm shadow-custom fixed`}>
      <div className="flex items-center">
        <img src={ibn} alt="Logo" className="h-8 lg:h-16 lg:mt-2" />
        <div className="ml-2 lg:mt-3 flex gap-1 lg:block">
          <h1 className="text-lg lg:text-2xl font-semibold text-gray-800">Presensi </h1>
          <h1 className="text-lg lg:text-2xl font-semibold text-blue-800"> QR-Qode</h1>
        </div>
      </div>
      <div className="hidden lg:block">
        <ul className="flex flex-col gap-y-4 pt-16">
          <NavListDesktop link={kodeAbsen[2]} on={kodeAbsen[0]} name={kodeAbsen[1]} />
          <NavListDesktop link={daftarKehadiran[2]} on={daftarKehadiran[0]} name={daftarKehadiran[1]} />
          <NavListDesktop link={daftarUser[2]} on={daftarUser[0]} name={daftarUser[1]} />
          <LogOutDesktop />
        </ul>
      </div>

      <div className="block lg:hidden h-full relative">
        <div onClick={() => setHamburgerTogel(!hamburgerTogel)} className="px-2 py-[3px] border-2 rounded border-blue-600 hover:text-white hover:shadow-2xl absolute -right-2 -top-8 block lg:hidden ">
          <span className="w-6 h-[2px] my-1 block bg-blue-600"></span>
          <span className="w-6 h-[2px] my-1 block bg-blue-600"></span>
          <span className="w-6 h-[2px] my-1 block bg-blue-600"></span>
        </div>

        <div className={`${hamburgerTogel ? "-right-2" : "-right-[280px]"} duration-500 absolute z-[100]  mt-2 w-64 divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}>
          <NavListSmartphone link={kodeAbsen[2]} on={kodeAbsen[0]} name={kodeAbsen[1]} />
          <NavListSmartphone link={daftarKehadiran[2]} on={daftarKehadiran[0]} name={daftarKehadiran[1]} />
          <NavListSmartphone link={daftarUser[2]} on={daftarUser[0]} name={daftarUser[1]} />
          <LogoutSmartphone />
        </div>
      </div>
    </aside>
  );
}

export default AdminNav;
