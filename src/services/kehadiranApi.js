import { API_BASE_URL } from "./configServie";
import { getToken, getUser } from "./utils";
import axios from "axios";

const ambilKode = async () => {
  const token = getToken();
  const response = await axios({
    method: "get",
    url: `${API_BASE_URL}/kehadiran/kode`,
    headers: {
      Authorization: token,
    },
  });

  return response.data;
};

const periksaKehadiran = async (setInfoKehadiran, setKehadiran) => {
  try {
    const token = getToken();
    const response = await axios({
      method: "get",
      url: `${API_BASE_URL}/kehadiran/periksakehadiran`,
      headers: {
        Authorization: token,
      },
    });
    console.log(response.data.kehadiran);
    setInfoKehadiran(response.data.message[1]);
    setKehadiran(response.data.kehadiran);
  } catch (error) {
    console.log(error);
  }
};

const absenKehadiran = async (kode) => {
  try {
    const token = getToken();
    const response = await axios({
      method: "post",
      url: `${API_BASE_URL}/kehadiran`,
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      data: JSON.stringify({ kode }),
    });
    const message = response.data.message;
    alert(message);
    window.location.reload();
    console.log("data");
  } catch (error) {
    const message = error.response.data.message;
    alert(message);
    window.location.reload();
  }
};

const semuaKehadiran = async (halaman, setKehadiranList, setTotalDocuments, setHalaman, setTotalHalaman, setNext, setPrev, setErr) => {
  setErr(false);
  try {
    const token = getToken();
    const response = await axios({
      method: "get",
      url: `${API_BASE_URL}/kehadiran?halaman=${halaman}`,
      headers: {
        Authorization: token,
      },
    });
    console.log(response);
    setKehadiranList(response.data.kehadiran);
    setTotalDocuments(response.data.halamanInfo.totalData);
    setHalaman(response.data.halamanInfo.halaman);
    setTotalHalaman(response.data.halamanInfo.totalHalaman);
    if (response.data.halamanInfo.totalHalaman > response.data.halamanInfo.halaman) {
      setNext(false);
    } else if (response.data.halamanInfo.totalHalaman === response.data.halamanInfo.halaman) {
      setNext(true);
    }
    if (response.data.halamanInfo.totalHalaman === 1) {
      setPrev(true);
    } else if (response.data.halamanInfo.totalHalaman > 1) {
      setPrev(false);
    }
  } catch (error) {
    setErr(true);
    console.log(error);
  }
};

const kehadiranSaya = async (halaman, setKehadiranList, setErr) => {
  const user = getUser();
  try {
    setErr(false);
    const token = getToken();
    const response = await axios({
      method: "get",
      url: `${API_BASE_URL}/kehadiran/me/${user._id}?halaman=${halaman}`,
      headers: {
        Authorization: token,
      },
    });
    const datKehadiran = response.data.kehadiran;
    console.log(response);
    setKehadiranList(datKehadiran);
    if (datKehadiran.length === 0) setErr(true);
  } catch (error) {
    console.log(error);
    setErr(true);
  }
};

const cariKehadiran = async (ev, halaman, inputCari, setHasilPencarian, setErr) => {
  ev.preventDefault();
  setErr(null);
  try {
    const token = getToken();
    const headers = {
      Authorization: token,
      tanggal: inputCari,
    };
    let response;
    if (inputCari === "") {
      response = await axios({
        method: "get",
        url: `${API_BASE_URL}/kehadiran?halaman=${halaman}`,
        headers: {
          Authorization: token,
        },
      });
    } else {
      response = await axios({
        method: "get",
        url: `${API_BASE_URL}/kehadiran/cari?halaman=${halaman}`,
        headers,
      });
    }
    console.log(response);
    setHasilPencarian(response.data.kehadiran);
  } catch (error) {
    setErr(error.response.data.message);
    console.log(error);
  }
};

export { ambilKode, periksaKehadiran, absenKehadiran, semuaKehadiran, kehadiranSaya, cariKehadiran };
