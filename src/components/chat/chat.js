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
        alert("Can't send an empty message.");
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
              {chat.map((e) => (
                <div
                  key={e.id}
                  className={
                    e.user === name
                      ? "single-chat-div align-left"
                      : "single-chat-div"
                  }
                >
                  <h6 className="user-name-h1">{e.user}</h6>
                  <h5 className="user-message-h3">{e.message}</h5>
                </div>
              ))}
              <div ref={scrollRef} className="focus"></div>
            </div>
            <form className="chat-form" onSubmit={handlemessage}>
              <input
                className="login-input"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
              />
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
