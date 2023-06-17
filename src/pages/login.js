import { useState, useEffect } from "react";
import { loginApi } from "../services/pegawaiApi";
import { moveTo, getToken, getUser, handleInput } from "../services/utils";

function Login() {
  const [NIP, setNIP] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false);

  useEffect(() => {
    if (getToken() === undefined && getUser() === undefined) {
      console.log("belum login");
    } else {
      console.log("sudah login");
      const user = getUser();
      if (user.peran === "admin") moveTo("kodeabsen");
      if (user.peran === "pegawai") moveTo("absensi");
    }
  }, []);

  return (
    <main className="flex h-screen justify-center items-center">
      <form>
        <div className="w-80 lg:w-96 p-7 shadow-xl shadow-gray-600 rounded-md">
          <div className="flex flex-col justify-center items-center gap-1 lg:gap-2 py-3 pb-10">
            <h2 className="text-gray-800 text-2xl lg:text-3xl font-semibold inline-block">Login Presensi</h2>
            <h2 className="text-gray-800 text-2xl lg:text-3xl font-semibold inline-block">QR-Code</h2>
          </div>
          <label className="text-gray-700" htmlFor="NIP">
            NIP/NIDN
          </label>
          <input
            onChange={(ev) => handleInput(ev.target.value, setNIP, setErr)}
            required
            className="w-full p-2 bg-gray-100 text-gray-700 rounded-md outline-blue-700 mb-4 ring-2 ring-blue-900"
            type="number"
            placeholder="Masukan NIP/NIDN"
            id="NIP"
          />
          {/*  */}
          <label className="text-gray-700" htmlFor="password">
            Password
          </label>
          <input
            onChange={(ev) => handleInput(ev.target.value, setPassword, setErr)}
            required
            className="w-full p-2 bg-gray-100 text-gray-700 rounded-md outline-blue-700 mb-6 ring-2 ring-blue-900"
            type="password"
            suggested={password}
            placeholder="Masukan Password"
            id="password"
          />
          <p className={`${err ? "block" : "hidden"} text-red-700 mt-[-21px]`}>NIP atau password salah</p>
          <button onClick={(ev) => loginApi(ev, NIP, password, setErr)} type="submit" className="flex w-full bg-blue-800 hover:bg-blue-700 text-white rounded-md">
            <div className="flex gap-1 w-full justify-center h-12 py-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
              </svg>
              <span>Log In</span>
            </div>
          </button>
        </div>
      </form>
    </main>
  );
}

export default Login;
