import { useState, useEffect } from "react";
import { getToken, getUser, moveTo, handlePrev, handleNext, lihatDetail } from "../services/utils";
import { getDataKehadiran, cariKehadiranByNama } from "../services/kehadiranApi";
import AdminNav from "../components/navigations/adminNav";
import PageCard from "../components/card/pageCard";
import { PanahKiriIcon, PanahKananIcon, Eye } from "../components/utils/icon";
import { InputCari } from "../components/utils/inputDropdown";

function DaftarKehadiran() {
  const [inputTanggal, setInputTanggal] = useState();
  const [inputNama, setInputNama] = useState("");
  const [kehadiranList, setKehadiranList] = useState([]);
  const [totalDocuments, setTotalDocuments] = useState(0);
  const [halaman, setHalaman] = useState(1);
  const [totalHalaman, setTotalHalaman] = useState();
  const [hasilPencarian, setHasilPencarian] = useState([]);
  const [prev, setPrev] = useState(false);
  const [next, setNext] = useState(true);
  const [err, setErr] = useState(false);
  const [selectCari, setSelectCari] = useState("Tanggal");

  useEffect(() => {
    if (getToken() === undefined && getUser() === undefined) moveTo("");
    const user = getUser();
    if (user.peran !== "admin") moveTo("absensi");
    if (hasilPencarian.length === 0) {
      getDataKehadiran(halaman, inputTanggal, inputNama, setKehadiranList, setTotalDocuments, setHalaman, setTotalHalaman, setNext, setPrev, setErr);
    }
    if (hasilPencarian.length > 0) {
      setKehadiranList(hasilPencarian);
    }

    // if (hasilPencarian.length > 0) {
    //   setKehadiranList(hasilPencarian);
    // }
    // if (hasilPencarian.length === 0) {
    //   semuaKehadiran(halaman, setKehadiranList, setTotalDocuments, setHalaman, setTotalHalaman, setNext, setPrev, setErr);
    // }
  }, [inputTanggal, inputNama, hasilPencarian, halaman]);

  return (
    <>
      <AdminNav posision={"daftarkehadiran"} role={true} />

      <PageCard>
        <div className="p-4 pb-2 lg:p-6 flex justify-between">
          <div className="">
            <h1 className="text-xl lg:text-3xl font-semibold text-gray-900">Daftar Kehadiran</h1>
            <h1 className="text-xl lg:text-3xl font-semibold text-gray-900">Pegawai</h1>
          </div>
        </div>

        <div className={`p-4 pb-0 lg:p-6 w-96  lg:w-[430px]`}>
          <div className="flex w-full justify-between">
            <h1 className="text-gray-700 lg:text-lg px-2 py-1">Cari Berdasarkan</h1>
            <InputCari options={["Tanggal", "Nama"]} select={selectCari} setSelect={setSelectCari} />
          </div>
          <div className="flex flex-col w-full items-end">
            <div className="w-48 lg:w-56">
              <input
                onChange={(ev) => {
                  setHasilPencarian([]);
                  setInputTanggal(ev.target.value);
                }}
                className={`${selectCari === "Tanggal" ? "" : "hidden"} outline-blue-700 ring-2 ring-blue-900 bg-gray-200  p-[3px] pl-2  rounded-lg w-48 lg:w-56`}
                type="date"
                defaultValue={inputTanggal}
                placeholder="Masukan Tahun/Bulan/Tanggal"
              />
            </div>

            <form
              onSubmit={(ev) => {
                ev.preventDefault();
                if (inputNama === "") {
                  getDataKehadiran(halaman, inputTanggal, inputNama, setKehadiranList, setTotalDocuments, setHalaman, setTotalHalaman, setNext, setPrev, setErr);
                } else {
                  cariKehadiranByNama(inputNama, setHasilPencarian, setErr);
                }
              }}
              className="w-48 lg:w-56"
            >
              <input
                onChange={(ev) => {
                  ev.preventDefault();
                  setInputNama(ev.target.value);
                }}
                className={`${selectCari === "Nama" ? "" : "hidden"} outline-blue-700 ring-2 ring-blue-900 bg-gray-200  p-1 pl-2  rounded-lg w-48 lg:w-56`}
                type="text"
                placeholder="Masukan Nama Pegawai"
              />
            </form>
          </div>
        </div>

        <div className="overflow-x-scroll w-full lg:-mt-8 p-2">
          <table className="w-full lg:mx-auto lg:mt-5 ">
            <thead className="bg-blue-100 border border-gray-700">
              <tr>
                <th className="w-10 text-sm lg:text-md px-2 lg:px-4 py-1 lg:py-2 border border-gray-700">NO</th>
                <th className="text-sm lg:text-md px-2 lg:px-4 py-1 lg:py-2 border border-gray-700">Nama Lengkap</th>
                <th className="text-sm lg:text-md px-2 lg:px-4 py-1 lg:py-2 border border-gray-700">Tanggal</th>
                <th className="text-sm lg:text-md px-2 lg:px-4 py-1 lg:py-2 border border-gray-700">Datang</th>
                <th className="text-sm lg:text-md px-2 lg:px-4 py-1 lg:py-2 border border-gray-700">Pulang</th>
                <th className="w-4 text-sm lg:text-md px-2 lg:px-4 py-1 lg:py-2 border border-gray-700">Aksi</th>
              </tr>
            </thead>
            <tbody className={`${err ? "hidden" : ""} border border-gray-700`}>
              {kehadiranList.map((kehadiran, i) => {
                let NO = i + 1;
                return (
                  <tr key={kehadiran._id} className="">
                    <td className="w-10 text-sm lg:text-md px-2 lg:px-4 py-1 lg:py-2 border border-gray-700">{NO}</td>
                    <td className="text-sm lg:text-md px-2 lg:px-4 py-1 lg:py-2 border border-gray-700">{kehadiran.pegawai.nama}</td>
                    <td className="text-sm lg:text-md px-2 lg:px-4 py-1 lg:py-2 border border-gray-700">{kehadiran.tanggal}</td>
                    <td className="text-sm lg:text-md px-2 lg:px-4 py-1 lg:py-2 border border-gray-700">{kehadiran.datang}</td>
                    <td className="text-sm lg:text-md px-2 lg:px-4 py-1 lg:py-2 border border-gray-700">{kehadiran.pulang}</td>
                    <td className="text-sm lg:text-md px-2 lg:px-4 py-1 lg:py-2 border border-gray-700">
                      <button onClick={(e) => lihatDetail(e, kehadiran.pegawai)} className="text-blue-700 flex items-center">
                        <Eye /> Detail
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tbody className={`${err ? "" : "hidden"} border border-gray-700`}>
              <tr className="text-center">
                <td colSpan={6} className="text-center lg:text-2xl px-2 lg:px-4 py-8 lg:py-10 border text-red-700 border-gray-700">
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
      </PageCard>
    </>
  );
}

export default DaftarKehadiran;
