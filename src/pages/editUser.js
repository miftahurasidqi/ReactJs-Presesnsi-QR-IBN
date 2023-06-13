import { useState, useEffect } from "react";
import { editUser } from "../services/pegawaiApi";
import { moveTo, getToken, getUser, getEditUser, handleInput } from "../services/utils";

import { Close } from "../components/utils/icon";
import { InputDropdownUser } from "../components/utils/inputDropdown";

function EditUser({ setClose }) {
  const [id, setId] = useState("");
  const [namaLengkap, setNamaLengkap] = useState("");
  const [NIP, setNIP] = useState("");
  const [status, setStatus] = useState("");
  const [role, setRole] = useState("Pilih peran user");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    if (getToken() === undefined && getUser() === undefined) moveTo("");
    const user = getUser();
    if (user.peran !== "admin") moveTo("absensi");

    const { _id, nama, nip, status, peran } = getEditUser();
    setId(_id);
    setNamaLengkap(nama);
    setNIP(nip);
    setStatus(status);
    setRole(peran);
  }, []);

  return (
    <main className="flex w-full h-screen justify-center items-center bg-white bg-opacity-90 backdrop-blur-sm">
      <div onClick={() => moveTo("daftaruser")} className="fixed top-6 right-6">
        <Close />
      </div>
      <form>
        <div className="w-[340px] lg:w-96 p-7 shadow-xl shadow-gray-600 rounded-md bg-white">
          <div className="flex flex-col justify-center items-center gap-1 lg:gap-2 py-3 pb-10">
            <h2 className="text-gray-800 text-2xl lg:text-3xl font-semibold inline-block">Edit User</h2>
            {/* <h2 className="text-gray-800 text-2xl lg:text-3xl font-semibold inline-block">QR-Code</h2> */}
          </div>
          <div className="flex items-center justify-between  mb-3 lg:mb-5">
            <label className="w-[27%] text-gray-700 text-sm lg:text-md" htmlFor="Nama">
              Nama Lengkap
            </label>
            <input
              onChange={(ev) => handleInput(ev.target.value, setNamaLengkap, setErr)}
              className="w-[70%] px-2 py-1 lg:p-2 bg-gray-100 text-gray-700 rounded-md outline-blue-700 ring-2 ring-blue-900"
              placeholder="Masukan Nama Lengkap"
              defaultValue={namaLengkap}
              type="Nama"
              id="Nama"
              required
            />
          </div>
          <div className="flex items-center justify-between  mb-3 lg:mb-5">
            <label className="w-[27%] text-gray-700 py-2 text-sm lg:text-md" htmlFor="NIP">
              NIP
            </label>
            <input
              onChange={(ev) => handleInput(ev.target.value, setNIP, setErr)}
              className="w-[70%] px-2 py-1 lg:p-2 bg-gray-100 text-gray-700 rounded-md outline-blue-700 ring-2 ring-blue-900"
              placeholder="Masukan NIP"
              defaultValue={NIP}
              type="number"
              id="NIP"
              required
            />
          </div>
          <div className="flex items-center justify-between  mb-3 lg:mb-5">
            <label className="w-[27%] text-gray-700 py-2 text-sm lg:text-md" htmlFor="Status">
              Status
            </label>
            <input
              onChange={(ev) => handleInput(ev.target.value, setStatus, setErr)}
              className="w-[70%] px-2 py-1 lg:p-2 bg-gray-100 text-gray-700 rounded-md outline-blue-700 ring-2 ring-blue-900"
              placeholder="Masukan Status"
              defaultValue={status}
              type="text"
              id="Status"
              required
            />
          </div>
          {/* <div className="flex items-center justify-between  mb-3 lg:mb-5">
            <label className="w-[27%] text-gray-700 py-2 text-sm lg:text-md" htmlFor="Role">
              Role
            </label>
            <input
              onChange={(ev) => handleInput(ev.target.value, setRole, setErr)}
              required
              className="w-[70%] px-2 py-1 lg:p-2 bg-gray-100 text-gray-700 rounded-md outline-blue-700 ring-2 ring-blue-900"
              type="text"
              placeholder="Masukan Role"
              id="Role"
            />
          </div> */}
          <InputDropdownUser options={["admin", "pegawai"]} select={role} setSelect={setRole} setErr={setErr} />
          <div className="flex items-center justify-between  mb-7">
            <label className="w-[27%] text-gray-700 py-2 text-sm lg:text-md" htmlFor="Password">
              Password
            </label>
            <input
              onChange={(ev) => handleInput(ev.target.value, setPassword, setErr)}
              className="w-[70%] px-2 py-1 lg:p-2 bg-gray-100 text-gray-700 rounded-md outline-blue-700 ring-2 ring-blue-900"
              placeholder="Masukan Password"
              defaultValue={""}
              type="password"
              id="Password"
              required
            />
          </div>

          {/*  */}
          <div className="w-full relative">
            <p className={`${err ? "block" : "hidden"} absolute text-red-700 -mt-6`}>{errMsg}</p>
            <button onClick={(ev) => editUser(ev, id, namaLengkap, NIP, status, role, password, setErr, setErrMsg)} type="submit" className="flex w-full bg-blue-800 hover:bg-blue-700 text-white rounded-md">
              <div className="flex gap-1 w-full justify-center h-12 py-3">
                <span>Simpan</span>
              </div>
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}

export default EditUser;
