export default function PageCard2({ children, claases, pegawai }) {
  let classe = "lg:pl-[264px] w-full lg:p-6 font-sans justify-center items-center p-3 ";
  classe = classe + claases;
  return (
    <div className={classe}>
      <div className="lg:w-full p-2 bg-white shadow-lg shadow-gray-400 rounded-xl">{children}</div>
    </div>
  );
}
