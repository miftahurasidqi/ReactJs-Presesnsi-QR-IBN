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
            <div className={`${infoKehadiran === "00" ? "" : "hidden"}  h-full w-full`}>
              {isScan ? (
                <div className="flex flex-col h-full items-center">
                  <div>
                    <h1 className="text-2xl font-sans">Kehadiran hari ini</h1>
                  </div>
                  <div className={"h-full w-full mt-8 flex justify-center items-center border border-t-2"}>
                    <h1 className="text-lg font-sans">Anda belum melakukan absen hari ini</h1>
                  </div>
                  <div className="w-full flex flex-col items-center gap-3 mt-8">
                    <button onClick={(ev) => Scan(ev, "masuk")} className="shadow-sm px-2 rounded-full">
                      <QR />
                    </button>
                    {/* <button onClick={(ev) => absenKehadiran("8f0479fa3a")} className="shadow-sm px-2 rounded-full">
                      Absen
                    </button> */}
                    <h1 className="text-md lg:text-3xl font-sans">Silahkan scan kode untuk absen datang</h1>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-center">
                    <h1 className="mt-4 mb-12 text-xl">Arahkan kamera ke kode masuk {result}</h1>
                  </div>
                  <div id="masuk"></div>
                </div>
              )}
            </div>
            {/* ? */}
            <div className={`${infoKehadiran === "10" ? "" : "hidden"}  h-full w-full`}>
              {isScan ? (
                <div className="flex flex-col h-full items-center">
                  <div>
                    <h1 className="text-2xl font-sans">Kehadiran hari ini</h1>
                  </div>
                  <div className={"h-full w-full mt-8"}>
                    <div className="border border-gray-400 w-full p-2 flex flex-col gap-1 justify-between rounded-md shadow-lg">
                      <div className="flex justify-between">
                        {/* <p>{kehadiran[0].jenis}</p> */}
                        <p className="text-blue-700">Sukses</p>
                      </div>
                      <hr />
                      <div className="flex justify-between">
                        <div>
                          <p>Tanggal</p>
                          <p>jam</p>
                        </div>
                        <div>
                          {/* <p className="text-sm">{kehadiran[0].waktu[0]}</p> */}
                          {/* <p className="text-sm">{kehadiran[0].waktu[1]}</p> */}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full flex flex-col items-center gap-3">
                    <button onClick={(ev) => Scan(ev, "keluar")} className="shadow-sm px-2 rounded-full">
                      <QR />
                    </button>
                    {/* <button onClick={(ev) => absenKehadiran("a71634e353")} className="shadow-sm px-2 rounded-full">
                      Absen
                    </button> */}
                    <h1 className="text-md lg:text-3xl font-sans">Silahkan scan kode untuk absen pulang</h1>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-center">
                    <h1 className="mt-4 mb-12 text-xl">Arahkan kamera ke kode keluar {result}</h1>
                  </div>
                  <div id="keluar"></div>
                </div>
              )}
            </div>
            {/* ? */}
            <div className={`${infoKehadiran === "11" ? "flex" : "hidden"}  h-full flex-col items-center`}>
              <div>
                <h1 className="text-2xl font-sans">Kehadiran hari ini</h1>
              </div>
              <div className={"h-full w-full mt-8"}>
                <div className="border border-gray-400 w-full p-2 flex flex-col gap-1 justify-between rounded-md shadow-lg">
                  <div className="flex justify-between">
                    {/* <p>{kehadiran[0].jenis}</p> */}
                    <p className="text-blue-700">Sukses</p>
                  </div>
                  <hr />
                  <div className="flex justify-between">
                    <div>
                      <p>Tanggal</p>
                      <p>jam</p>
                    </div>
                    <div>
                      {/* <p className="text-sm">{kehadiran[0].waktu[0]}</p> */}
                      {/* <p className="text-sm">{kehadiran[0].waktu[1]}</p> */}
                    </div>
                  </div>
                </div>
                {/* <div className="border border-gray-400 w-full p-2 flex flex-col gap-1 justify-between rounded-md shadow-lg">
                  <div className="flex justify-between">
                    <p>{kehadiran[1].jenis}</p>
                    <p className="text-blue-700">Sukses</p>
                  </div>
                  <hr />
                  <div className="flex justify-between">
                    <div>
                      <p>Tanggal</p>
                      <p>jam</p>
                    </div>
                    <div>
                      <p className="text-sm">{kehadiran[1].waktu[0]}</p>
                      <p className="text-sm">{kehadiran[1].waktu[1]}</p>
                    </div>
                  </div>
                </div> */}
              </div>
              <div className="w-full flex flex-col items-center pb-4">
                <h1 className="text-md font-sans">Anda telah melakukan</h1>
                <h1 className="text-md font-sans">absen datang dan absen pulang</h1>
              </div>
            </div>
          </PageCard>
        </div>
      </div>
    </div>
  );
}

export default Absen;
