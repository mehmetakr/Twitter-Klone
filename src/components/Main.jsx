import { useEffect, useState } from "react";
import Form from "../components/Form";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/config";
import Spinner from "../components/Spinner";
import Post from "./Post";

const Main = ({ user }) => {
  const [tweets, setTweets] = useState(null);
  const tweetsCol = collection(db, "tweet");

  useEffect(() => {
    const q = query(tweetsCol, orderBy("createdAt", "desc"));

    const unsub = onSnapshot(q, (snapshot) => {
      const tempTweets = [];
      snapshot.forEach((doc) => {
        tempTweets.push({ id: doc.id, ...doc.data() });
      });
      setTweets(tempTweets);
    });

    return () => unsub();
  }, [tweetsCol]);

  return (
    <main className="border border-gray-700 overflow-y-auto">
      <header className="font-bold p-4 border-b-[1px] border-gray-600">
        Anasayfa
        <Form user={user} />
      </header>
      {!tweets ? (
        <Spinner className="w-6 h-6 mx-auto my-10" />
      ) : (
        tweets.map((tweet) => <Post key={tweet.id} tweet={tweet} />)
      )}
    </main>
  );
};

export default Main;
