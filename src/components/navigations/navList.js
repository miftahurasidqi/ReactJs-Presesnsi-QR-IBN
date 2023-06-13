import { moveTo, logOut } from "../../services/utils";
// import { IonIcon } from "@ionic/react";
// import { people, leaf, mail, business } from "ionicons/icons";

function NavListDesktop({ link, on, name }) {
  return (
    <li>
      <div onClick={() => moveTo(link)} className={`${on ? "bg-blue-800 text-white" : "text-gray-900 hover:text-blue-900"} flex gap-x-4 items-center py-2 pl-3 rounded-md group`}>
        <span className="absolute w-1.5 h-8 bg-blue-800 rounded-r-full left-0 scale-y-0 -translate-x-full group-hover:scale-y-100 group-hover:translate-x-0 transition-transform ease-in-out" />
        {/* <IonIcon icon={leaf} size="medium"></IonIcon> */}
        {/*  */}
        <span>{name}</span>
      </div>
    </li>
  );
}

function NavListSmartphone({ link, on, name }) {
  return (
    <button
      onClick={() => moveTo(link)}
      className={`${on ? "bg-blue-800 text-white" : "text-gray-900 hover:text-blue-900"} group flex gap-2 w-full items-center rounded-md px-4 py-2 font-semibold text-lg  hover:font-bold hover:shadow-lg shadow-blue-800`}
    >
      <span>{name}</span>
    </button>
  );
}
function LogOutDesktop() {
  return (
    <li>
      <div onClick={() => logOut()} className={`text-gray-900 hover:text-blue-900 flex gap-x-4 items-center py-2 pl-3 rounded-md group`}>
        <span className="absolute w-1.5 h-8 bg-blue-800 rounded-r-full left-0 scale-y-0 -translate-x-full group-hover:scale-y-100 group-hover:translate-x-0 transition-transform ease-in-out" />
        {/* <IonIcon icon={leaf} size="medium"></IonIcon> */}
        {/*  */}
        <span>Log Out</span>
      </div>
    </li>
  );
}

function LogoutSmartphone() {
  return (
    <button onClick={() => logOut()} className={`text-gray-800 hover:text-blue-900 group flex gap-2 w-full items-center rounded-md px-4 py-2 font-semibold text-lg  hover:font-bold hover:shadow-lg shadow-blue-700`}>
      <span>Log Out</span>
    </button>
  );
}

export { NavListDesktop, NavListSmartphone, LogOutDesktop, LogoutSmartphone };
