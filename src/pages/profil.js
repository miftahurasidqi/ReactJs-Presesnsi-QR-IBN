import { useState, useEffect } from "react";
import CardView from "../components/card/cardView";
import { kehadiranSaya } from "../services/kehadiranApi";
import { getUser, getToken, moveTo } from "../services/utils";
import PegawaiNav from "../components/navigations/pegawaiNav";

function Profile() {
  if (getToken() === undefined && getUser() === undefined) moveTo("");
  const user = getUser();
  if (user.peran !== "pegawai") moveTo("kodeabsen");
  const [pegawai, setPegawai] = useState({});
  const [kehadiranList, setKehadiranList] = useState([]);
  const [err, setErr] = useState(false);

  useEffect(() => {
    const user = getUser();
    setPegawai(user);
    kehadiranSaya(1, setKehadiranList, setErr);
  }, []);
  return (
    <>
      <PegawaiNav posision={"profile"} role={true} />
      <div className="w-full pt-[10vh] min-h-[98vh] font-sans justify-center items-center p-3">
        <CardView>
          <div className="">
            <div className="flex gap-1">
              <div className="px-3 py-4">
                <p className="text-xs text-gray-600">Nama Lengkap</p>
                <p className="text-xs text-gray-600">NIP/NIDN</p>
                <p className="text-xs text-gray-600">Status</p>
                <p className="text-xs text-gray-600">Peran</p>
              </div>
              <div className=" py-4">
                <p className="text-xs text-gray-600">:</p>
                <p className="text-xs text-gray-600">:</p>
                <p className="text-xs text-gray-600">:</p>
                <p className="text-xs text-gray-600">:</p>
              </div>
              <div className="px-3 py-4">
                <p className="text-xs text-gray-600">{pegawai.nama}</p>
                <p className="text-xs text-gray-600">{pegawai.nip}</p>
                <p className="text-xs text-gray-600">{pegawai.status}</p>
                <p className="text-xs text-gray-600">{pegawai.peran}</p>
              </div>
            </div>
          </div>
        </CardView>
        <CardView>
          <div className="p-4 lg:p-6 flex justify-between">
            <h1 className="text-xl lg:text-3xl font-semibold text-gray-900">Riwayat Kehadiran Anda</h1>
          </div>
          <div className="w-full p-2">
            <table className="w-full lg:mx-auto lg:mt-5 ">
              <thead className="bg-blue-100 border border-gray-700">
                <tr>
                  <td className="w-10 text-sm lg:text-md px-2 lg:px-4 py-1 lg:py-2 border border-gray-700">No</td>
                  <td className="text-sm lg:text-md px-2 lg:px-4 py-1 lg:py-2 border border-gray-700">Tanggal</td>
                  <td className="text-sm lg:text-md px-2 lg:px-4 py-1 lg:py-2 border border-gray-700">Datang</td>
                  <td className="text-sm lg:text-md px-2 lg:px-4 py-1 lg:py-2 border border-gray-700">Pulang</td>
                </tr>
              </thead>
              <tbody className={`${err ? "hidden" : ""} border border-gray-700`}>
                {kehadiranList.map((kehadiran, i) => {
                  let NO = i + 1;
                  return (
                    <tr key={kehadiran._id}>
                      <td className="w-10 text-sm lg:text-md px-2 lg:px-4 py-1 lg:py-2 border border-gray-700">{NO}</td>
                      <td className="text-sm lg:text-md px-2 lg:px-4 py-1 lg:py-2 border border-gray-700">{kehadiran.tanggal}</td>
                      <td className="text-sm lg:text-md px-2 lg:px-4 py-1 lg:py-2 border border-gray-700">{kehadiran.datang}</td>
                      <td className="text-sm lg:text-md px-2 lg:px-4 py-1 lg:py-2 border border-gray-700">{kehadiran.pulang}</td>
                    </tr>
                  );
                })}
              </tbody>
              <tbody className={`${err ? "" : "hidden"} border border-gray-700`}>
                <tr className="text-center">
                  <td colSpan={5} className="text-center lg:text-2xl px-2 lg:px-4 py-8 lg:py-10 border text-red-700 border-gray-700">
                    Data Tidak Ditemukan
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardView>
      </div>
    </>
  );
}

export default Profile;
