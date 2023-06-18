import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { cariKehadiranByIdAndMonth } from "../services/kehadiranApi";
import { moveTo, getUser, getToken, getKehadiranUser, handlePrev, handleNext } from "../services/utils";

import AdminNav from "../components/navigations/adminNav";
import PageCard2 from "../components/card/PageCard2";
import { PanahKiriIcon, PanahKananIcon } from "../components/utils/icon";

function DetailKehadiran({ match }) {
  const params = useParams();
  const Param_id = params.id;

  const dateNow = new Date();
  const yearNow = dateNow.getFullYear();
  let monthNow = dateNow.getMonth() + 1;
  monthNow = "0" + monthNow.toString();
  const yearMonthNow = `${yearNow}-${monthNow}`;

  const [totalDocuments, setTotalDocuments] = useState(0);
  const [halaman, setHalaman] = useState(1);
  const [totalHalaman, setTotalHalaman] = useState();
  const [prev, setPrev] = useState(false);
  const [next, setNext] = useState(true);
  const [month, setMonth] = useState(yearMonthNow);
  const [kehadiranList, setKehadiranList] = useState([]);
  const [err, setErr] = useState(false);
  const [nama, setNama] = useState("");
  const [nip, setNIP] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (getToken() === undefined && getUser() === undefined) moveTo("");
    if (!getKehadiranUser()) moveTo("daftarkehadiran");
    const user = getUser();
    if (user.peran !== "admin") moveTo("absensi");

    const { _id, nama, nip, status } = getKehadiranUser();
    if (_id !== Param_id) moveTo("daftarkehadiran");
    setNama(nama);
    setNIP(nip);
    setStatus(status);

    cariKehadiranByIdAndMonth(halaman, _id, month, setKehadiranList, setTotalDocuments, setHalaman, setTotalHalaman, setPrev, setNext, setErr);
  }, [month, halaman, Param_id]);

  return (
    <>
      <AdminNav posision={"daftarkehadiran"} role={true} />

      <PageCard2 claases={"pt-[10vh] lg:pt-6"}>
        <div className="p-4 pb-2 lg:pb-4 lg:p-6">
          <h1 className="text-xl lg:text-3xl font-semibold text-gray-900">Laporan Kehadiran</h1>
        </div>

        <div className="px-4 pb-0 lg:px-6 flex gap-1 lg:gap-2">
          <div className="py-4">
            <p className="lg:text-md font-semibold text-gray-900">Nama Lengkap</p>
            <p className="lg:text-md font-semibold text-gray-900">NIP/NIDN</p>
            <p className="lg:text-md font-semibold text-gray-900">Status</p>
          </div>
          <div className="py-4">
            <p className="lg:text-md font-semibold text-gray-900">:</p>
            <p className="lg:text-md font-semibold text-gray-900">:</p>

            <p className="lg:text-md font-semibold text-gray-900">:</p>
          </div>
          <div className="px-3 py-4">
            <p className="lg:text-md font-semibold text-gray-900">{nama}</p>
            <p className="lg:text-md font-semibold text-gray-900">{nip}</p>
            <p className="lg:text-md font-semibold text-gray-900">{status}</p>
          </div>
        </div>
      </PageCard2>
      <PageCard2>
        <div className=" p-2 py-3 w-full flex flex-col lg:flex-row justify-between gap-2 pr-5">
          <div className="flex w-96 gap-3 lg:w-[430px] order-2 lg:order-1 ">
            <h1 className="text-gray-700 lg:text-lg px-2 py-1">Pilih Bulan</h1>
            <input
              onChange={(ev) => {
                setMonth(ev.target.value);
              }}
              className={` outline-blue-700 ring-2 ring-blue-900 bg-gray-200  p-[3px] pl-2  rounded-lg w-48 lg:w-56`}
              type="month"
              defaultValue={"10-11-2023"}
              placeholder="Masukan Tahun/Bulan/Tanggal"
            />
          </div>
          <div className="order-1 lg:order-2 px-2">
            <h1 className="text-lg lg:text-xl font-semibold text-gray-800">Jumlah Kehadiran: {totalDocuments}</h1>
          </div>
        </div>
        <div className=" w-full p-2">
          <table className="w-full lg:mx-auto -mt-2  ">
            <thead className="bg-blue-100 border border-gray-700">
              <tr>
                <th className="w-10 text-sm lg:text-md px-2 lg:px-4 py-1 lg:py-2 border border-gray-700">NO</th>
                <th className="text-sm lg:text-md px-2 lg:px-4 py-1 lg:py-2 border border-gray-700">Tanggal</th>
                <th className="text-sm lg:text-md px-2 lg:px-4 py-1 lg:py-2 border border-gray-700">Hari</th>
                <th className="text-sm lg:text-md px-2 lg:px-4 py-1 lg:py-2 border border-gray-700">Datang</th>
                <th className="text-sm lg:text-md px-2 lg:px-4 py-1 lg:py-2 border border-gray-700">Pulang</th>
              </tr>
            </thead>
            <tbody className={`${err ? "hidden" : ""} border border-gray-700`}>
              {kehadiranList.map((kehadiran, i) => {
                let NO = i + 1;
                return (
                  <tr key={kehadiran._id} className="">
                    <td className="w-10 text-sm lg:text-md px-2 lg:px-4 py-1 lg:py-2 border border-gray-700">{NO}</td>
                    <td className="text-sm lg:text-md px-2 lg:px-4 py-1 lg:py-2 border border-gray-700">{kehadiran.tanggal}</td>
                    <td className="text-sm lg:text-md px-2 lg:px-4 py-1 lg:py-2 border border-gray-700">{kehadiran.day}</td>
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
        <div className={`${totalDocuments > 10 ? "block" : "hidden"} mt-1 flex gap-4 p-0 py-4 sm:p-4`}>
          <button onClick={(ev) => handlePrev(ev, halaman, setHalaman)} disabled={prev} id="min" className="bg-gray-100 text-gray-800 hover:bg-gray-200 shadow-sm p-1 rounded-lg inline-block">
            <PanahKiriIcon />
          </button>
          <div>
            <p className="text-sm text-gray-800 shadow-sm p-1 rounded-lg inline-block">
              <span>{halaman}</span>/<span>{totalHalaman}</span>
            </p>
          </div>
          <button onClick={(ev) => handleNext(ev, halaman, setHalaman)} disabled={next} id="plus" className="bg-gray-100 text-gray-800 hover:bg-gray-200 shadow-sm p-1 rounded-lg inline-block ">
            <PanahKananIcon />
          </button>
        </div>
      </PageCard2>
    </>
  );
}

export default DetailKehadiran;
