import { useState } from "react";
import { auth ,provider } from "./../firebase/config";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Authpage = () => {
  const [issignup, setissignup] = useState(false);

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const [iserror, seterror] = useState(false);
  const navigate = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();
    // eğer koydolma modundaysa

    if (issignup) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          toast.info("Hesabınız oluşturuldu");
          navigate("/");
        })
        .catch((err) => toast.error("Bir hata oluştu " + err.code));
    }
    // eğer kaydolma modunda  değilse
    else {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          toast.info("Hesabınıza giriş yapıldı");
          navigate("/home");
        })
        .catch((err) => {
          if (err.code === "auth/invalid-credential") {
            toast.error("üzgünüz bir hata olustu");
            // eğerki şifre hatası varsa state i güncelle
            seterror(true);
          }
        });
    }
  };

  const loginwithgoogle = () => {
    signInWithPopup(auth, provider).then(() => navigate("/home"));
  };

  // şifremi unuttum maili gönder

  const sendmail = () => {
    sendPasswordResetEmail(auth, email).then(() => {
      toast.info("Şifre sifirlama bağlantısı gönderildi");
    });
  };
  return (
    <section className="h-screen grid place-items-center ">
      <div className="bg-black flex flex-col gap-10 py-16 px-32 rounded-lg">
        <div className="flex justify-center">
          <img height={60} width={70} src="x-logo.webp" alt="twitter logosu" />
        </div>

        <h1 className="text-center font-bold text-xl">Twittera giriş yap</h1>

        {/* google butonu */}

        <button
          onClick={loginwithgoogle}
          className="flex bg-white text-black rounded-full py-3 px-10 items-center gap-4"
        >
          <img height={40} width={40} src="/google-logo.svg" alt="" />
          <span> Google ile giriş yap </span>
        </button>

        <form onSubmit={handlesubmit} className="flex flex-col">
          <label>Email</label>
          <input
            onChange={(e) => setemail(e.target.value)}
            className="mt-3 my- border-none text-black"
            type="text"
            required
          />

          <label> Şifre </label>

          <input
            onChange={(e) => setpassword(e.target.value)}
            type="password"
            required
            className="mt-3 my-3 text-black"
          />
          <button className=" font-bold transition hover:bg-gray-300 flex justify-center  bg-white text-black my-3 p-2 rounded-full align-center">
            {!issignup ? "Giriş Yap" : "Kaydol"}{" "}
          </button>

          <p className="text-center flex-col font-bold">
            <span className="mx-4">
              {!issignup ? "Hesabınız yoksa" : "Hesabınız varsa"}{" "}
            </span>
            <span
              onClick={() => setissignup(!issignup)}
              className="text-blue-500 cursor-pointer"
            >
              {!issignup ? "KAYDOL" : "GİRİŞ YAP"}
            </span>
          </p>
        </form>

        {iserror && (
          <p
            onClick={sendmail}
            className="text-center text-red-400 cursor-pointer"
          >
            Şifrenizi mi unuttunuz
          </p>
        )}

        {/* giriş formu  */}
      </div>
    </section>
  );
};
export default Authpage;
