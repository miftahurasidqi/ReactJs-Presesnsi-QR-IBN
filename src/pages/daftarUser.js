import { useState, useEffect } from "react";
import { getToken, getUser, moveTo, handlePrev, handleNext } from "../services/utils";

import { semuaPegawai, confirmDelete } from "../services/pegawaiApi";

import AdminNav from "../components/navigations/adminNav";
import PageCard from "../components/card/pageCard";
import RegistrasiPegawai from "./registrasiPegawai";
import { EditPen, Trash, PanahKiriIcon, PanahKananIcon } from "../components/utils/icon";

function DaftarUser() {
  const [addTogle, setAddTogle] = useState(false);
  const [userList, setUserList] = useState([]);
  const [totalDocuments, setTotalDocuments] = useState(0);
  const [halaman, setHalaman] = useState(1);
  const [totalHalaman, setTotalHalaman] = useState();
  const [prev, setPrev] = useState(false);
  const [next, setNext] = useState(true);

  useEffect(() => {
    if (getToken() === undefined && getUser() === undefined) moveTo("");
    const user = getUser();
    if (user.peran !== "admin") moveTo("absensi");

    semuaPegawai(halaman, setUserList, setTotalDocuments, setHalaman, setTotalHalaman, setPrev, setNext);
  }, [halaman]);

  const editUser = (ev, user) => {
    ev.preventDefault();
    localStorage.setItem("userEdit", `${user._id}:${user.nama}:${user.nip}:${user.status}:${user.peran}`);
    moveTo(`edituser/${user._id}`);
  };
  return (
    <>
      <AdminNav posision={"daftaruser"} role={true} />
      <PageCard>
        <div className="p-4 lg:p-6 flex justify-between">
          <h1 className="text-xl lg:text-3xl font-semibold text-gray-900">Daftar User</h1>
          <button onClick={() => setAddTogle(!addTogle)} className="text-xs lg:text-md font-semibold text-white bg-blue-800 hover:bg-blue-700 rounded-md p-2">
            Tambah User
          </button>
          <div className={`${addTogle ? "block" : "hidden"} fixed w-full h-full top-0 left-0`}>
            <RegistrasiPegawai setClose={setAddTogle} />
          </div>
        </div>
        <div className="w-full p-2">
          {/* <div> */}
          <table className="w-full lg:mx-auto lg:mt-5 ">
            <thead className=" border border-gray-700">
              <tr>
                <td className="text-sm lg:text-md p-1 lg:p-2 font-bold">No</td>
                <td className="text-sm lg:text-md p-1 lg:p-2 font-bold">Nama Lengkap</td>
                <td className="text-sm lg:text-md p-1 lg:p-2 font-bold">NIP</td>
                <td className="text-sm lg:text-md p-1 lg:p-2 font-bold">Status</td>
                <td className="text-sm lg:text-md p-1 lg:p-2 font-bold">Role</td>
                <td className="text-sm lg:text-md p-1 lg:p-2 font-bold"></td>
              </tr>
            </thead>
            <tbody className="border border-gray-700">
              {userList.map((user, i) => {
                let bg = false;
                if (i % 2 === 0) bg = true;
                let NO = i + 1;
                return (
                  <tr className={`${bg ? "bg-gray-200" : ""}`} key={user._id}>
                    <td className="text-sm lg:text-md p-1 lg:p-2">{NO}</td>
                    <td className="text-sm lg:text-md p-1 lg:p-2">{user.nama}</td>
                    <td className="text-sm lg:text-md p-1 lg:p-2">{user.nip}</td>
                    <td className="text-sm lg:text-md p-1 lg:p-2">{user.status}</td>
                    <td className="text-sm lg:text-md p-1 lg:p-2">{user.peran}</td>
                    <td className="text-sm lg:text-md p-1 lg:p-2 flex gap-2 lg:gap-5 justify-center">
                      <button className="text-gray-700" onClick={(ev) => editUser(ev, user)}>
                        <EditPen />
                      </button>
                      <button className="text-gray-700" onClick={(ev) => confirmDelete(ev, user)}>
                        <Trash />
                      </button>
                    </td>
                  </tr>
                );
              })}
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

export default DaftarUser;
