import { doc, updateDoc } from "firebase/firestore";
import React, { useRef } from "react";
import { useState } from "react";
import { BiSolidSave } from "react-icons/bi";
import { BsTrashFill } from "react-icons/bs";
import { ImCancelCircle } from "react-icons/im";
import { IoMdReturnLeft } from "react-icons/io";

const Editmode = (tweet, close) => {
  const inputref = useRef();

  const [isdeleting, setisdeleting] = useState(false);

  // kaydet butonuna tıklanınca
  const handlesave = async () => {
    // 1. inputun içeriğini eriş
    const newtask = inputref.current.value;

    // 2 ) güncellenicek dokümanın referansını al

    const tweetref = doc(db, "tweets", tweet.id);
    // 3 ) dokümanın yazı içeriğini güncelle

    if (isdeleting) { 
      // resim siliniyorsa resmi null 'a çek 
      await updateDoc(tweetref, {
        textContent: newtask,
        imagecontext: null,
        isedited: true,
      });

      // resim silinmiyorsa sadece yazıyı güncelle.
    } else {
      await updateDoc(tweetref, {
        textContent: newtask,
        isedited: true,
      });
    }
  };
};

return;
<div>
  <div>
    <input
      ref={inputref}
      className=" rounded p-1 px-2 text-black"
      type="text"
    />

    <button
      onClick={handlesave}
      className="mx-5 p-2 text-gran-400 rounded-full shadow  hover:shadow-green-500 "
    >
      <BiSolidSave />
    </button>
    <button
      onClick={close}
      className="mx-5 p-2 text-gran-400 rounded-full shadow  hover:shadow-red-500 "
    >
      <ImCancelCircle />
    </button>

    {tweet.imagecontext && (
      <div className="relative">
        <img
          className={`${
            isdeleting ? "blur" : ""
          } my-2 rounded-lg w-full object-cover max-h-[400]`}
          src={tweet.imagecontext}
          alt=""
        />
        <button
          onClick={() => setisdeleting(!isdeleting)}
          className="absolute top-0 right-0 text-xl bg-white transition text-red-500 hover:scale-90 rounded-full"
        >
          {isdeleting ? <IoMdReturnLeft /> : <BsTrashFill />}
        </button>
      </div>
    )}
  </div>
</div>;

export default Editmode;
