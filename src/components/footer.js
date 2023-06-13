const Footer = ({ padding }) => {
  const year = new Date().getFullYear();
  return (
    <footer className={`${padding ? "lg:pl-64" : "lg:pl-0"}`}>
      <div className=" bg-teal-700 text-white">
        <div className="grid text-center pt-3 pb-8">
          <span>
            Created By <a href="https://github.com/miftahurasidqi?tab=repositories">@miftahurasidqi</a>
          </span>
          <span className="text-lg">Copyright © {year}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
