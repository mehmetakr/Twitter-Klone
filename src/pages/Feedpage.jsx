import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import Main from "../components/Main";
import Aside from "../components/Aside";
import Nav from "../components/Nav";
import { useEffect, useState } from "react";

const Feedpage = () => {
  // Oturumu acık olan firabase kullanıcısının oturumunu kapatmak istiyorsak firebase metodu girmemız lazım (signout)


  //Hesabına giriş yapmamıs olan kullanıcı oturumu acık olmayan kullanıcının akıs sayfasın girişi engellenecek

  const [user, setuser] = useState(null);

  // kullanıcı bilgisine abone olma işlemını useeffect ile gerçekleştiririz.
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentuser) =>
      setuser(currentuser)
    );


     //Kullanıcı sayfadan ayrılırsa izlemeyi sonlandırıcaz
    return () => unsub();
  });

  // h-screen tam bir ekran yüksekliginde olucak demektir.
  return (
    <div className="feed h-screen bg-black overflow-hidden">
      <Nav  user={user}/>
      <Main  user={user}/>
      <Aside />
    </div>
  );
};

export default Feedpage;
