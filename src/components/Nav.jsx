import { BiDoorOpen } from "react-icons/bi";
import { navSections } from "./../constant";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";

const Nav = ({ user }) => {
  // signout firebasenın hesaptan cıkıs yapmaya yarayan methodudur. ve içerisine auth adında kımlık dogrulama amaclı olarak kullanılan parametresini kulllanıcaz
  return (
    <div className="flex flex-col justify-between items-end px-2 py-4">
      {/*  Linkler  */}
      <div>
        <img className="w-14 mb-4" src="x-logo.webp" alt="Logo" />

        {navSections.map((section, i) => (
          <div
            key={i.title}
            className="flex justify-center md:justify-normal items-center gap-3 text-2xl md:text-xl p-3 cursor-pointer transition hover:bg-[#505050b7]"
          >
            {section.icon}
            <span className="max-md:hidden whitespace-nowrap">
              {section.title}
            </span>
          </div>
        ))}
      </div>
      {/* Kullanıcı bilgileri */}
      <div>
        {!user ? (
          <div className="w-24 h-34 bg-gray-300 text-black text-lg rounded px-2 py-3 animate-pulse">
            Yükleniyor...
          </div>
        ) : (
          <div>
            <div className="flex gap-2 items-center">
              <img
                className="w-10 h-10 rounded-full"
                src={user.photoURL}
                alt="User Profile"
              />
              <p className="max-md:hidden">{user.displayName}</p>
            </div>

            <button
              onClick={() => signOut(auth)}
              className="flex justify-center items-center gap-3 my-3 mx-3 bg-gray-500 px-3 py-2 rounded text-xl md:text-[15px]"
            >
              <BiDoorOpen />

              <span className="max-md:hidden"> Çıkış Yap</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;
