import { useEffect, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { periksaKehadiran, absenKehadiran } from "../services/kehadiranApi";
import { moveTo, getUser, getToken } from "../services/utils";
import PegawaiNav from "../components/navigations/pegawaiNav";
import PageCard from "../components/card/pageCard";
import { QR } from "../components/utils/icon";

function Absen() {
  const [infoKehadiran, setInfoKehadiran] = useState("");
  const [kehadiran, setKehadiran] = useState([]);
  const [isScan, setIsScan] = useState(true);
  const [result, setResult] = useState(null);

  // const [isScanDatang, setIsScanDatang] = useState(false);
  // const [isScanPulang, setIsScanPulang] = useState(false);

  useEffect(() => {
    if (getToken() === undefined && getUser() === undefined) moveTo("");
    const user = getUser();
    if (user.peran !== "pegawai") moveTo("kodeabsen");
    periksaKehadiran(setInfoKehadiran, setKehadiran);
  }, []);
  const Scan = async (e, jenis) => {
    e.preventDefault();

    setIsScan(false);
    const getCameraUser = async () => {
      let camera;
      await Html5Qrcode.getCameras().then((devices) => {
        console.log(devices);
        if (devices[1]) {
          camera = devices[1].id;
        } else {
          camera = devices[0].id;
        }
      });
      return camera;
    };
    const cameraId = await getCameraUser();
    if (cameraId) console.log(cameraId);
    const config = {
      fps: 5,
      qrbox: {
        width: 250,
        height: 250,
      },
    };
    const handleScan = (decodedText, decodedRes) => {
      setResult(decodedText);
      console.log(decodedText);
      console.log(decodedRes);
      absenKehadiran(decodedText);
    };
    const handleError = (err) => {
      console.log(err);
    };
    if (jenis === "masuk") {
      const scanner = new Html5Qrcode("masuk");
      scanner.start(cameraId, config, handleScan, handleError).catch((err) => {
        console.log("err 1");
      });
    } else {
      const scanner = new Html5Qrcode("keluar");
      scanner
        .start(cameraId, config, handleScan, handleError)
        .catch((err) => {
          console.log("err 1");
        })
        .then((r) => {
          console.log(r, "R");
        });
    }
  };
  return (
    <div className="">
      <PegawaiNav posision={"absensi"} role={true} />
      <div className="min-w-full">
        <div className={` w-[100%] flex`}>
          <PageCard claases={`h-full p-5`} pegawai={true}>
            <div className={`  h-full w-full`}>
              <div className={`${isScan ? "flex" : "hidden"}  flex-col h-full items-center`}>
                <div>
                  <h1 className="text-2xl font-sans">Kehadiran hari ini</h1>
                </div>
                <div className={`${infoKehadiran === "00" ? "flex" : "hidden"} h-full w-full mt-8 justify-center items-center border border-t-2`}>
                  <h1 className="text-lg font-sans">Anda belum melakukan absen hari ini</h1>
                </div>
                <div className={`${infoKehadiran === "00" ? "hidden" : ""} h-full w-full mt-8`}>
                  {kehadiran.map((a, i) => {
                    console.log(a);
                    console.log(i);
                    if (!a) {
                      return <div>kakakak</div>;
                    } else {
                      return (
                        <div key={a.jam} className="border border-gray-400 w-full mb-3 p-2 flex flex-col gap-1 justify-between rounded-md shadow-lg">
                          <div className="flex justify-between">
                            <p>{a.jenis}</p>

                            <p className="text-blue-700">Sukses</p>
                          </div>
                          <hr />
                          <div className="flex justify-between">
                            <div>
                              <p>Tanggal</p>
                              <p>jam</p>
                            </div>
                            <div>
                              <p className="text-sm p-[2px]">{a.tanggal}</p>
                              <p className="text-sm p-[2px]">{a.jam}</p>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>

                <div className={`${infoKehadiran === "00" ? "" : "hidden"} w-full flex flex-col items-center gap-3 mt-8`}>
                  <button onClick={(ev) => Scan(ev, "masuk")} className="shadow-sm p-2 rounded-full bg-blue-700">
                    <QR />
                  </button>
                  {/* <button onClick={(ev) => absenKehadiran("52da4359de")} className="shadow-sm px-2 rounded-full">
                    Absen
                  </button> */}
                  <h1 className={` text-md lg:text-3xl font-sans`}>Silahkan scan kode untuk absen datang</h1>
                </div>

                <div className={`${infoKehadiran === "10" ? "" : "hidden"} w-full flex flex-col items-center gap-3 mt-8`}>
                  <button onClick={(ev) => Scan(ev, "keluar")} className="shadow-sm p-2 rounded-full bg-blue-700">
                    <QR />
                  </button>
                  {/* <button onClick={(ev) => absenKehadiran("52480fef1c")} className="shadow-sm px-2 rounded-full">
                    Absen
                  </button> */}
                  <h1 className={` text-md lg:text-3xl font-sans`}>Silahkan scan kode untuk absen pulang</h1>
                </div>

                <div className={`${infoKehadiran === "11" ? "" : "hidden"} w-full flex flex-col items-center pb-4`}>
                  <h1 className="text-md font-sans">Anda telah melakukan</h1>
                  <h1 className="text-md font-sans">absen datang dan absen pulang</h1>
                </div>
              </div>

              <div className={`${isScan ? "hidden" : ""}`}>
                <div className={`${infoKehadiran === "00" ? "" : "hidden"} flex justify-center`}>
                  <h1 className="mt-4 mb-12 text-xl">Arahkan kamera ke kode masuk</h1>
                </div>
                <div id="masuk"></div>

                <div className={`${infoKehadiran === "10" ? "" : "hidden"} flex justify-center`}>
                  <h1 className="mt-4 mb-12 text-xl">Arahkan kamera ke kode keluar</h1>
                </div>
                <div id="keluar"></div>
              </div>
            </div>
          </PageCard>
        </div>
      </div>
    </div>
  );
}

export default Absen;
