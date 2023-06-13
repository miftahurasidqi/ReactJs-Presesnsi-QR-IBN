import { API_BASE_URL } from "./configServie";
import { getToken, moveTo, getUser, logOut } from "./utils";
import axios from "axios";

const loginApi = async (e, NIP, password, setErr) => {
  e.preventDefault();
  const requestingData = {
    nip: NIP,
    password: password,
  };
  console.log(requestingData);

  try {
    const response = await axios.post(`${API_BASE_URL}/pegawai/login`, requestingData);
    console.log(response);
    const token = response.data.token;
    const userLogin = response.data.pegawai;
    const user = `${userLogin._id}:${userLogin.nama}:${userLogin.nip}:${userLogin.status}:${userLogin.peran}`;
    console.log(userLogin);
    localStorage.setItem("token", token);
    localStorage.setItem("user", user);
    console.log(response);
    if (userLogin.peran === "admin") {
      moveTo("kodeabsen");
    } else {
      moveTo("absensi");
    }
  } catch (err) {
    setErr(true);
    console.log(err);
  }
};

const profil = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/pegawai/me`, {
      headers: {
        Authorization: getToken(),
      },
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

const tambahUser = async (e, data, set) => {
  e.preventDefault();

  try {
    const requestingData = {
      nama: data.namaLengkap,
      nip: data.NIP,
      status: data.status,
      peran: data.role,
      password: data.password,
    };
    const token = getToken();
    console.log(requestingData, token);
    const response = await axios({
      method: "post",
      url: `${API_BASE_URL}/pegawai`,
      data: requestingData,
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });

    console.log(response);
    alert("Tambah User Berhasil");
    window.location.reload();
  } catch (error) {
    set.setErr(true);
    set.setErrMsg(error.response.data.message);
  }
};

const semuaPegawai = async (halaman = 1, setUserList, setTotalDocuments, setHalaman, setTotalHalaman, setPrev, setNext) => {
  try {
    const token = getToken();
    const response = await axios({
      method: "get",
      url: `${API_BASE_URL}/pegawai`,
      headers: {
        Authorization: token,
        halaman: halaman,
      },
    });

    console.log(response.data);
    setUserList(response.data.user);
    setTotalDocuments(response.data.totalDocuments);
    setHalaman(response.data.halaman);
    setTotalHalaman(response.data.totalHalaman);

    if (response.data.totalHalaman > response.data.halaman) {
      setNext(false);
    } else if (response.data.totalHalaman === response.data.halaman) {
      setNext(true);
    }
    if (response.data.halaman === 1) {
      setPrev(true);
    } else if (response.data.halaman > 1) {
      setPrev(false);
    }
  } catch (error) {
    console.log(error);
  }
};

const editUser = async (e, id, nama, nip, status, peran, password, setErr, setErrMsg) => {
  e.preventDefault();

  try {
    const requestingData = {
      _id: id,
      nama,
      nip,
      status,
      peran,
      password,
    };
    const token = getToken();
    console.log(requestingData, token);
    const response = await axios({
      method: "patch",
      url: `${API_BASE_URL}/pegawai/update`,
      data: requestingData,
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    alert("Edit User Berhasil");
    moveTo("daftaruser");
  } catch (error) {
    console.log(error.response.data.msg);
    setErrMsg(error.response.data.msg);
    setErr(true);
  }
};

const deleteUser = async (_id) => {
  const token = getToken();
  try {
    const response = await axios.delete(`${API_BASE_URL}/pegawai/hapus`, {
      headers: {
        Authorization: token,
      },
      data: { _id: _id },
    });
    const data = response;
    console.log(data);
    console.log("hapus Sucses");
  } catch (error) {
    console.log(error);
  }
};

const confirmDelete = async (ev, userDelete) => {
  ev.preventDefault();
  const { _id } = getUser();

  if (userDelete._id === _id) {
    if (window.confirm(" Apakah anda yakin ingin menghapus akun anda? \n hal ini menyebabkan anda tidak dapat mengakses aplikasi ini lagi !")) {
      console.log("hapus");
      await deleteUser(_id);
      logOut();
    } else {
      console.log("ga jadi hapuss");
    }
  } else {
    if (window.confirm(`Apakah anda yakin ingin menghapus ${userDelete.nama} ?`)) {
      console.log("hapus");
      await deleteUser(userDelete._id);
      window.location.reload();
    } else {
      console.log("ga jadi hapuss");
    }
  }
};

export { loginApi, profil, tambahUser, semuaPegawai, editUser, confirmDelete };
