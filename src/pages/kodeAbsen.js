import { useEffect, useState } from "react";
import axios from "axios";
import QRCode from "react-qr-code";

import { moveTo, getToken, getUser } from "../services/utils";
import { API_BASE_URL } from "../services/configServie";

import AdminNav from "../components/navigations/adminNav";
import PageCard from "../components/card/pageCard";
import { PanahKananIcon, PanahKiriIcon } from "../components/utils/icon";

// import { ambilKode } from "../services/kehadiranApi";
// import useSWR from "swr";
// import  from "react-qr-code"
// import Logo from "../images/logo192.png";

function KodeAbsen() {
  const [kodeMasuk, setKodeMasuk] = useState();
  const [kodeKeluar, setKodeKeluar] = useState();
  const [kodeTogle, setKodeTogle] = useState(false);

  const ambilKode = async () => {
    const token = getToken();
    const response = await axios({
      method: "get",
      url: `${API_BASE_URL}/kehadiran/kode`,
      headers: {
        Authorization: token,
      },
    });
    setKodeMasuk(response.data.kodeMasuk.kode);
    setKodeKeluar(response.data.kodeKeluar.kode);
    // return response.data;
  };
  useEffect(() => {
    if (getToken() === undefined && getUser() === undefined) moveTo("");
    const user = getUser();
    if (user.peran !== "admin") moveTo("absensi");
    ambilKode();
  }, []);

  const screenWidth = window.innerWidth;
  let size;
  if (screenWidth <= 600) {
    size = 190;
  } else {
    size = 300;
  }

  return (
    <>
      <AdminNav posision={"kodeabsen"} role={true} />
      {/* <div className="min-w-full"> */}
      <div className="min-w-full overflow-hidden">
        <div className={`${kodeTogle ? "-ml-[100%]" : ""} w-[200%] flex duration-700`}>
          <PageCard claases={"h-full"}>
            <div className="h-full flex flex-col justify-evenly lg:justify-around items-center">
              <div>
                <h1 className="text-4xl lg:text-6xl font-sans">Absen Datang</h1>
              </div>
              <div className={`w-[${size}] h-[${size}]`}>
                {kodeMasuk ? (
                  <QRCode size={size} style={{ height: "auto", maxWidth: "100%", width: "100%" }} value={kodeMasuk} viewBox={`0 0 ${size} ${size}`} />
                ) : (
                  <div className={`w-[${size}] h-[${size}]`}>
                    <p>Loading...</p>
                  </div>
                )}
              </div>
              <div className="relative w-full">
                <h1 className="text-md lg:text-3xl font-sans flex justify-center">Silahkan scan kode untuk absen datang</h1>
                <button onClick={(ev) => setKodeTogle(!kodeTogle)} className="absolute -bottom-2 right-4 lg:bottom-0 bg-gray-100 text-gray-600 hover:bg-gray-200 shadow-sm px-2 rounded-full inline-block">
                  <PanahKananIcon claases={"w-5 h-5 lg:w-7 h-7"} />
                </button>
              </div>
            </div>
          </PageCard>
          <PageCard claases={"h-full"}>
            <div className="h-full flex flex-col justify-evenly lg:justify-around items-center">
              <div>
                <h1 className="text-4xl lg:text-6xl font-sans">Absen Pulang</h1>
              </div>
              <div className={`w-[${size}] h-[${size}]`}>
                {kodeMasuk ? (
                  <QRCode size={size} style={{ height: "auto", maxWidth: "100%", width: "100%" }} value={kodeKeluar} viewBox={`0 0 ${size} ${size}`} />
                ) : (
                  <div className={`w-[${size}] h-[${size}]`}>
                    <p>Loading...</p>
                  </div>
                )}
              </div>
              <div className="relative w-full">
                <h1 className="text-md lg:text-3xl font-sans flex justify-center">Silahkan scan kode untuk absen pulang</h1>
                <button onClick={(ev) => setKodeTogle(!kodeTogle)} className="absolute -bottom-2 left-4 lg:bottom-0 bg-gray-100 text-gray-600 hover:bg-gray-200 shadow-sm px-2 rounded-full inline-block">
                  <PanahKiriIcon claases={"w-5 h-5 lg:w-7 h-7"} />
                </button>
              </div>
            </div>
          </PageCard>
        </div>
      </div>
    </>
  );
}

export default KodeAbsen;

// import React, { useState } from 'react';
// import QrReader from 'react-qr-scanner';

// const Test = () => {
//   const [delay, setDelay] = useState(100);
//   const [result, setResult] = useState('No result');

//   const handleScan = (data) => {
//     setResult(data);
//   };

//   const handleError = (err) => {
//     console.error(err);
//   };

//   const previewStyle = {
//     height: 240,
//     width: 320,
//   };

//   return (
//     <div>
//       <QrReader
//         delay={delay}
//         style={previewStyle}
//         onError={handleError}
//         onScan={handleScan}
//       />
//       <p>{result}</p>
//     </div>
//   );
// };

// export default Test;
