import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { BsCardImage } from "react-icons/bs";
import { db, storage } from "../firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { toast } from "react-toastify";
import { v4 as uuid  } from "uuid";
import Spinner from "./Spinner";

const Form = ({ user }) => {
  const [isloading, setisloading] = useState(false);
  // dosya eğer resimse storage'a yükle
  // resmin url ini fonksiyonun çağrıldıgı yere döndürrr...

  const uploadimage = async (file) => {
    // 1 ) dosya resim değilse fonksiyonu durdur..

    if (!file || !file.type.startsWith("image")) return null;

    // 2 ) dosyanın yükleneceği yerin referansını oluştur..

    const fileref = ref(storage, file.name.concat(v4));
    // 3 ) referansını olustudugumuz yere dosyayı yükle

    await uploadBytes(fileref, file);
    // 4 ) yüklenecek dosyanın url ' sine eriş

    const url = await getDownloadURL(fileref);

    return url;
  };

  // tweet koleksiyonunu referansını al
  const tweetcol = collection(db, "tweet");

  // formun gönderilmesi
  const handlesubmit = async (e) => {
    e.preventDefault();
    // inputlardaki verilere eriş
    const textcontext = e.target[0].value;
    const imagecontext = e.target[1].files[0];

    // yazı veye resim içeriği yoksa uyarı ver

    if (!textcontext && !imagecontext) return;
    toast.info("Lütfen içerik giriniz");

    setisloading(true);
    // resmi yükle
    const url = await uploadimage(imagecontext);

    // tweet koleksıyonua yenı dokuman ekle
    // firebase de yenı dokuman ekleme işlemını addDock ile yaparız

    await addDoc(tweetcol, {
      textcontext,
      imagecontext: null,
      createdAt: serverTimestamp(),
      user: {
        id: user.uid,
        name: user.displayName,
        phot: user.photoURL,
      },
      likes: [],
      isedited: false,
    });

    // formu sıfırla
    e.target.reset();
    // yüklenmeyi sonlandır.
    setisloading(false);
  };
  return (
    <form
      onSubmit={handlesubmit}
      className="flex gap-3 p-4 border-b-[1px] border-gray-700"
    >
      <img
        className="w-12 h-12 rounded-full md:h-[45px]"
        src={user?.photoURL}
        alt="user--profile"
      />

      <div className="w-full">
        <input
          className="w-full bg-transparent my-2 outline-none md:text-lg"
          type="text"
          placeholder="Neler Oluyor?"
        />

        <div className="flex justify-between items-center">
          <label
            className="  hover:bg-gray-600 text-lg transition p-4  rounded-full cursor-pointer "
            htmlFor="tık"
          >
            <BsCardImage />
          </label>
          <input type="file" hidden id="tık" />
          <button
            className="bg-blue-500 p-2 rounded-full cursor-pointer hover:bg-blue-400 flex min-h-[40px] min-w-[85px] items-center justify-center transition
          "
          >
            {isloading ? <Spinner /> : "Tweetle"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
