import { collection, count, getAggregateFromServer } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";

const Aside = () => {
  const [data, setdata] = useState({});
  const tweetscol = collection(db, "tweets");

  // Dokümanları ile alakaları istatistik hesaplamaya yarar..
  // Koleksiyonun referansı
  // Sum / average  / count

  useEffect(() => {
    getAggregateFromServer(tweetscol, {
      tweetscount: count(),
    }).then((res) => setdata(res.data()));
  } , []);

  return (
    <div className="max-lg:hidden p-3">
      <h2>Toplam gönderi sayısı : {data.tweetscount}</h2>
    </div>
  );
};

export default Aside;
