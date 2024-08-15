import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

const Protectedroute = () => {
  // kullanıcın yetkisi varmı state i tutalım

  const [isauth, setisauth] = useState(null);

  // Bir alt routun içeriğini kapsayıcı routun içerisinde nasıl gösterebiliriz ?

  useEffect(() => {
    // Anlık olarak kullanıcının oturumunu izle
    // Herhangi bir değişimde state i güncelle

    // sisteme giriş veya cıkıs yapan herkesin kimlk bilgilerini geri döndürür.
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setisauth(true);
      } else {
        setisauth(false);
      }
    });

    // Kullanıcı sayfadan ayrılırsa izleyici kaldır

    return () => unsub();
  }, []);

  // eğer yetkiniz varsa logine gönderin

  if ( isauth === false ) return  <Navigate to={"/"} />;


  // yetkisi varsa sayfayı göster..

  // Outlet : alt route un ekranda yerleşeceği yeri belirler
  return     <Outlet />

};

export default Protectedroute;
