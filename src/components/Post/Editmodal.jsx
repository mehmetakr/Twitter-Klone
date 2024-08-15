import { doc, updateDoc } from "firebase/firestore";
import React, { useRef, useState } from "react";
import { BiSolidSave } from "react-icons/bi";
import { BsTrashFill } from "react-icons/bs";
import { ImCancelCircle } from "react-icons/im";
import { IoMdReturnLeft } from "react-icons/io";
import { db } from "../../firebase/config";

const Editmode = ({ tweet, close }) => { // Destructuring props
  const inputref = useRef();
  const [isdeleting, setisdeleting] = useState(false);

  const handlesave = async () => {
    const newtask = inputref.current.value;
    const tweetref = doc(db, "tweets", tweet.id);

    if (isdeleting) {
      await updateDoc(tweetref, {
        textContent: newtask,
        imagecontext: null,
        isedited: true,
      });
    } else {
      await updateDoc(tweetref, {
        textContent: newtask,
        isedited: true,
      });
    }

    close(); // Edit modunu kapatmak için
  };

  return (
    <div>
      <div>
        <input
          ref={inputref}
          className="rounded p-1 px-2 text-black"
          type="text"
          defaultValue={tweet.textContent} // Eski içeriği göstermesi için
        />
        <button
          onClick={handlesave}
          className="mx-5 p-2 text-gray-400 rounded-full shadow hover:shadow-green-500"
        >
          <BiSolidSave />
        </button>
        <button
          onClick={close}
          className="mx-5 p-2 text-gray-400 rounded-full shadow hover:shadow-red-500"
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
    </div>
  );
};

export default Editmode;
