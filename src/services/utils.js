const moveTo = (route) => {
  if (route) {
    window.location.replace(`/${route}`);
  } else if (route === "" || route === undefined) {
    window.location.replace(`/`);
  }
};
const logOut = () => {
  localStorage.clear();
  window.location.reload();
};
const getToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return undefined;
  return token;
};
const getUser = () => {
  const stringUser = localStorage.getItem("user");
  let user;
  if (!stringUser) user = undefined;
  if (stringUser) {
    const splitUser = stringUser.split(":");
    user = {
      _id: splitUser[0],
      nama: splitUser[1],
      nip: splitUser[2],
      status: splitUser[3],
      peran: splitUser[4],
    };
  }
  return user;
};
const getLocalUser = () => {
  const stringUser = localStorage.getItem("user");
  // const user = [userLogin._id, userLogin.nama, userLogin.nip, userLogin.status, userLogin.peran];

  if (!stringUser) return undefined;
  const user = stringUser.split(":");

  return {
    _id: user[0],
    nama: user[1],
    nip: user[2],
    status: user[3],
    peran: user[4],
  };
};

const getEditUser = () => {
  const stringUser = localStorage.getItem("userEdit");
  // const user = [userLogin._id, userLogin.nama, userLogin.nip, userLogin.status, userLogin.peran];

  if (!stringUser) return undefined;
  const user = stringUser.split(":");

  return {
    _id: user[0],
    nama: user[1],
    nip: user[2],
    status: user[3],
    peran: user[4],
  };
};
const handleInput = (inputValue, setInput, setErr) => {
  console.log(inputValue);
  setInput(inputValue);
  setErr(false);
};
const handlePrev = (ev, halaman, setHalaman) => {
  ev.preventDefault();
  setHalaman(halaman - 1);
};
const handleNext = (ev, halaman, setHalaman) => {
  ev.preventDefault();
  setHalaman(halaman + 1);
};

export { moveTo, logOut, getToken, getUser, handleInput, getLocalUser, getEditUser, handlePrev, handleNext };
