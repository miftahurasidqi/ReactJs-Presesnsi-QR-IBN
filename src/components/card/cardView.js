export default function CardView({ children, claases, pegawai }) {
  let classe = "lg:w-full p-2 bg-white shadow-lg shadow-gray-400 rounded-xl mb-4 ";
  classe = classe + claases;
  return <div className={classe}>{children}</div>;
}
