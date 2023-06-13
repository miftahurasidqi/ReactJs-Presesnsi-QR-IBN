export default function PageCard({ children, claases, pegawai }) {
  let classe = "lg:w-full p-2 bg-white shadow-lg shadow-gray-400 rounded-xl ";
  classe = classe + claases;
  return (
    <div className="lg:pl-[264px] w-full pt-[10vh] lg:p-6 min-h-[98vh] font-sans justify-center items-center p-3">
      <div className={classe}>{children}</div>
    </div>
  );
}
