import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { PropagateLoader } from "react-spinners";

import sendMessage, { q } from "../../firstore/firstoreFunctions";
import { db } from "../../firstore/firestoreConfig";
import { onSnapshot, collection } from "firebase/firestore";

import { useContext } from "react";
import { nameContext } from "../../nameContext/nameContext";

import { useNavigate } from "react-router-dom";

import "./index.css";

const colRef = collection(db, "messages");

const Chat = () => {
  const navigate = useNavigate();

  const { value, setvalue } = useContext(nameContext);
  const scrollRef = useRef();
  const scrollableDiv = useRef();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(value);
  const [message, setMessage] = useState("");
  const [chat, setchat] = useState([]);

  function getChat() {
    setLoading(true);
    onSnapshot(q, (snapshot) => {
      let items = [];
      snapshot.docs.forEach((doc) => {
        items.push({ ...doc.data(), id: doc.id });
      });
      items.reverse();
      setchat(items);
      setLoading(false);
    });
  }

  useEffect(() => {
    if (localStorage.getItem("name") != null) {
      setName(localStorage.getItem("name"));
    } else {
      navigate("/name");
    }
  });
  useEffect(() => {
    getChat();
    setName(value);
    setTimeout(() => {
      scrollRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 1500);
  }, []);

  useEffect(() => {
    scrollRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [chat]);

  const handlemessage = (e) => {
    if (name.length > 0) {
      if (message.length > 0) {
        e.preventDefault();
        sendMessage("messages", name, message);
        setMessage("");
        setTimeout(() => {
          scrollRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 200);
      } else {
        e.preventDefault();
      }
    } else {
      alert("kindly enter your name before sending a message.");
      e.preventDefault();
    }
  };

  return (
    <div className="main-container">
      <section className="section-2">
        {!loading ? (
          <div className="chat-div">
            <div className="messages-div" ref={scrollableDiv}>
              {console.log(chat)}
              {chat.map((e) =>
                e.user === name ? (
                  <div key={e.id} className="chat chat-end">
                    <div className="chat-header text-white">{e.user}</div>
                    <div className=" chat-bubble chat-bubble-success">{e.message}</div>
                  </div>
                ) : (
                  <>
                    
                    <div key={e.id} className="chat chat-start">
                    <div className="chat-header text-white">{e.user}</div>
                      <div className="chat-bubble chat-bubble-primary text-center flex items-center">{e.message}</div>
                    </div>
                  </>
                )
              )}
              <div ref={scrollRef} className="focus"></div>
            </div>
            <form className="chat-form flex flex-row" onSubmit={handlemessage}>
            <input type="text" placeholder="" className="input input-bordered w-full " value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }} />
                <button type="submit" className="bg-black rounded-full p-3 md:hover:bg-green-950 transition-all duration-300">

              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
  <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
</svg>

                </button>
            </form>
          </div>
        ) : (
          <div>
            <PropagateLoader color="white" />
          </div>
        )}
      </section>
    </div>
  );
};

export default Chat;
