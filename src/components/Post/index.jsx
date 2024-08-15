import { BiMessageRounded } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { FiBookmark, FiShare2 } from "react-icons/fi";
import moment from "moment";
import "moment/locale/tr"; // Türkçe tarih formatları için gerekli
import {
  arrayRemove,
  arrayUnion,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore"; // Sadece Firestore kullanıyoruz
import { auth, db } from "../../firebase/config"; // Firestore'dan db'yi import etmelisiniz
import { AiOutlineHeart } from "react-icons/ai";
import Dropdown from "./Dropdown";
import { useState } from "react";
import Editmode from "./Editmodal";
const Post = ({ tweet }) => {
  // Aktif kullanıcı bu tweet'in like dizisi içerisinde var mı?
  const isLiked = tweet.likes.includes(auth.currentUser?.uid);

  const [iseditmode, setiseditmode] = useState(false);
  // Tweet atılma tarihinin ne kadar zaman önce olduğunu hesapla
  const date = moment(tweet.createdAt.toDate()).fromNow();

  // Tweet dokümanının likes dizisine oturumu açık olan kullanıcının id'sini ekle
  const handleLike = async () => {
    const ref = doc(db, "tweets", tweet.id);

    // Dokümanın bir değerini güncelleme
    await updateDoc(ref, {
      likes: isLiked
        ? arrayRemove(auth.currentUser?.uid) // like varsa kaldır
        : arrayUnion(auth.currentUser?.uid), // like yoksa ekle
    });
  };

  // tweeti kaldır

  const handleDelete = async () => {
    if (confirm("Tweeti silmeyi onaylıyor musunuz ?")) {
      // KALDIRICAGIMIZ DOKÜMANIN REFERANSINI ALMA.
      const tweetRef = doc(db, "tweets", tweet.id);
      // dokümanı kaldır..
      await deleteDoc(tweetRef);
    }
  };

  return (
    <div className="relative flex gap-3 px-3 border-b-[1px] border-gray-700">
      <img
        className="w-12 h-12 rounded-full"
        src={tweet.user.photo}
        alt="Profil Fotoğrafı"
      />

      <div className="w-full">
        {/* En üst kısım: kullanıcı bilgileri */}
        <div className="flex justify-between items-center m-3">
          <div className="flex items-center gap-3">
            <p className="font-bold">{tweet.user.name}</p>
            <p className="text-gray-400">@{tweet.user.username}</p>
            <p className="text-gray-400">{date}</p>
            {tweet.isedited &&  (  <p  className=" text-gray-400">   * Düzenlendi</p>)}
          </div>

          {tweet.user.id === auth.currentUser?.uid && (
            <Dropdown
              setiseditmode={setiseditmode}
              handleDelete={handleDelete}
            />
          )}
        </div>

        {/* Orta kısım */}
        <div className="my-4">
          {/* düzenleme modundaysak editmode bileşenini ekrana bas  */}

          {iseditmode && (
            <Editmode tweet={tweet} close={() => setiseditmode(false)} />
          )}
          {tweet.textcontext && !iseditmode && <p>{tweet.textcontext}</p>}
          {tweet.imagecontext && !iseditmode && (
            <img
              className="my-2 rounded w-full object-cover max-h-[400px]"
              src={tweet.imagecontext}
              alt="Tweet Resmi"
            />
          )}
        </div>

        {/* Alt kısım */}
        <div className="flex justify-between">
          <div className="flex py-2 px-3 rounded-full place-items-center cursor-pointer transition hover:bg-[#00b7ff69]">
            <BiMessageRounded />
          </div>
          <div className="flex py-2 px-3 rounded-full place-items-center cursor-pointer transition hover:bg-[#00ff4436]">
            <FaRetweet />
          </div>
          <div
            onClick={handleLike}
            className="flex py-2 px-3 rounded-full place-items-center cursor-pointer transition hover:bg-[#e8cd5769]"
          >
            {isLiked ? <FcLike /> : <AiOutlineHeart />}
            <span className="px-2">{tweet.likes.length}</span>
          </div>
          <div className="flex">
            <div className="flex py-2 px-3 rounded-full place-items-center cursor-pointer transition hover:bg-blue-300">
              <FiBookmark />
            </div>
            <div className="flex py-2 px-3 rounded-full place-items-center cursor-pointer transition hover:bg-[#e8cd5769]">
              <FiShare2 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
