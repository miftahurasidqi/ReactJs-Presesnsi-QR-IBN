import { useState, useEffect } from "react";
import { getToken, getUser, moveTo, handlePrev, handleNext } from "../services/utils";
import { semuaKehadiran, cariKehadiran } from "../services/kehadiranApi";
import AdminNav from "../components/navigations/adminNav";
import PageCard from "../components/card/pageCard";
import { PanahKiriIcon, PanahKananIcon } from "../components/utils/icon";

function DaftarKehadiran() {
  const [kehadiranList, setKehadiranList] = useState([]);
  const [totalDocuments, setTotalDocuments] = useState(0);
  const [halaman, setHalaman] = useState(1);
  const [totalHalaman, setTotalHalaman] = useState();
  const [prev, setPrev] = useState(false);
  const [next, setNext] = useState(true);
  const [inputCari, setInputCari] = useState("");
  const [hasilPencarian, setHasilPencarian] = useState([]);
  const [err, setErr] = useState(false);
  // const [errMsg, setErrMsg] = useState("");

  // const tanggal = new Date();
  // console.log(totalDocuments);
  // console.log(totalDocuments);
  // console.log(totalDocuments);
  // console.log(totalDocuments);
  // console.log(totalDocuments);

  useEffect(() => {
    if (getToken() === undefined && getUser() === undefined) moveTo("");
    const user = getUser();
    if (user.peran !== "admin") moveTo("absensi");
    if (hasilPencarian.length > 0) {
      setKehadiranList(hasilPencarian);
    }
    // if (err) {
    //   console.log("error");
    // }
    if (hasilPencarian.length === 0) {
      semuaKehadiran(halaman, setKehadiranList, setTotalDocuments, setHalaman, setTotalHalaman, setNext, setPrev, setErr);
    }
  }, [hasilPencarian, halaman]);
  return (
    <>
      <AdminNav posision={"daftarkehadiran"} role={true} />

      <PageCard>
        <div className="p-4 pb-0 lg:p-6 flex justify-between">
          <div className="">
            <h1 className="text-xl lg:text-3xl font-semibold text-gray-900">Daftar Kehadiran</h1>
            <h1 className="text-xl lg:text-3xl font-semibold text-gray-900">Pegawai</h1>
          </div>
        </div>

        <form onSubmit={(ev) => cariKehadiran(ev, halaman, inputCari, setHasilPencarian, setErr)} className="px-4 flex justify-end w-full">
          <input onChange={(ev) => setInputCari(ev.target.value)} className="bg-gray-200  p-1 pl-2 lg:p-2 rounded-lg w-1/2 lg:w-1/3" type="text" placeholder="Masukan Tahun/Bulan/Tanggal" />
        </form>

        <div className="w-full p-2">
          {/* <div> */}
          <table className="w-full lg:mx-auto lg:mt-5 ">
            <thead className="bg-blue-100 border border-gray-700">
              <tr>
                <th className="w-10 text-sm lg:text-md px-2 lg:px-4 py-1 lg:py-2 border border-gray-700">NO</th>
                <th className="text-sm lg:text-md px-2 lg:px-4 py-1 lg:py-2 border border-gray-700">Nama Lengkap</th>
                <th className="text-sm lg:text-md px-2 lg:px-4 py-1 lg:py-2 border border-gray-700">Tanggal</th>
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
                    <td className="text-sm lg:text-md px-2 lg:px-4 py-1 lg:py-2 border border-gray-700">{kehadiran.pegawai.nama}</td>
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
