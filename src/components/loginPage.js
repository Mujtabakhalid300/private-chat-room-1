import React from "react";
import { useState, useEffect } from "react";
import sendMessage, { q } from "../firstore/firstoreFunctions";
import { PropagateLoader } from "react-spinners";

import { db } from "../firstore/firestoreConfig";
import { onSnapshot, collection } from "firebase/firestore";

const colRef = collection(db, "messages");

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
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
    getChat();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length > 0) {
    }
    const userName = name;
  };

  const handlemessage = (e) => {
    e.preventDefault();
    sendMessage("messages", name, message);
    setMessage("");
  };

  return (
    <div className="main-container">
      <section className="section-1">
        <h3 className="login-heading">Enter your name to continue</h3>
        <form onSubmit={handleSubmit} className="form-1">
          <input
            className="login-input"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </form>
      </section>

      {!loading ? (
        <div className="chat-div">
          {chat.map((e) => (
            <div key={e.id} className="single-chat-div">
              <h6 className="user-name-h1">{e.user}</h6>
              <h5 className="user-message-h3">{e.message}</h5>
            </div>
          ))}
          <form onSubmit={handlemessage}>
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
    </div>
  );
};

export default LoginPage;
