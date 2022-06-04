import { HeartIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import axios from "axios";

export function TweetForm() {
  const [text, setText] = useState("");
  const MAX_TWEET_CHAR = 140;

  function changeText(e) {
    setText(e.target.value);
  }

  return (
    <div className="border-b border-silver p-4 space-y-6">
      <div className="flex p-4 space-x-5">
        <img src="/src/avatar3.png" alt="#" className="w-7" />
        <h1 className="font-bold text-xl">Pagina Inicial</h1>
      </div>

      <form className="pl-12 text-lg flex flex-col">
        <textarea
          name="text"
          value={text}
          placeholder="O que está acontecendo?"
          className="bg-transparent outline-none disabled:opacity-50"
          onChange={changeText}
        />
        <div className="flex justify-end items-center space-x-2">
          <span className="text-sm">
            <span>{text.length}</span> /{" "}
            <span className="text-birdBlue">{MAX_TWEET_CHAR}</span>
          </span>
          <button
            className="bg-birdBlue px-6 p-2 rounded-full disabled:opacity-50"
            disabled={text.length > MAX_TWEET_CHAR}
          >
            Tweet
          </button>
        </div>
      </form>
    </div>
  );
}

export function Tweet({ name, username, avatar, children }) {
  return (
    <div className="flex space-x-3 p-4 border-b border-silver">
      <div>
        <img src={avatar} alt="#" className="h-12" />
      </div>
      <div className="space-y-1">
        <span className="font-bold text-sm">{name}</span>
        {"  "}
        <span className="text-sm text-silver">@{username}</span>

        <p>{children}</p>

        <div className="flex space-x-1 text-silver text-sm items-center">
          <HeartIcon className="w-6 stroke-1" />
          <span>1.2K</span>
        </div>
      </div>
    </div>
  );
}

export function Home() {
  const [data, setData] = useState([]);
  const token = ''
  async function getData() {
    const res = await axios.get("http://localhost:9901/tweets", {
      headers: {
        'authorization' : `Bearer ${token}`
      }
    });
    setData(res.data);
  }
  console.log(data)
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <TweetForm />
      <div>
        {data.length &&
          data.map((tweet) => (
            <Tweet
              key={tweet.userId}
              name={tweet.user.name}
              username={tweet.user.username}
              avatar="/src/avatar3.png"
            >
              {tweet.text}
            </Tweet>
          ))}
      </div>
    </>
  );
}
