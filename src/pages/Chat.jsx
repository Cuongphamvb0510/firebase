import React, { useState, useEffect } from "react";
import {
  getDatabase,
  ref,
  set,
  onValue,
  push,
  remove,
} from "firebase/database";
import { useFirebase } from "../context/Firebase";

const Chat = () => {
  const firebase = useFirebase();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const db = getDatabase();

  useEffect(() => {
    const starCountRef = ref(db, "mesagers");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messagesArray = Object.entries(data).map(([id, message]) => ({
          id,
          ...message,
        }));
        setMessages(messagesArray);
      } else {
        setMessages([]);
      }
    });
  }, [db]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const messagesRef = ref(db, "mesagers");
      const newMessageRef = push(messagesRef);
      set(newMessageRef, {
        text: newMessage,
        timestamp: new Date().toString(),
        idUser: firebase.user.uid,
        name: firebase.user.displayName,
      });

      setNewMessage("");
    }
  };

  const handleEditMessage = (messageId) => {
    messageId = String(`mesagers/` + messageId);
    set(ref(db, messageId), {
      text: newMessage,
      timestamp: new Date().toString(),
      idUser: firebase.user.uid,
      name: firebase.user.displayName,
    });
    setNewMessage("");
  };
  const handleDeleteMessage = (messageId) => {
    const messageRef = ref(db, `/mesagers/${messageId}`);
    remove(messageRef);
  };

  console.log(messages);

  return (
    <div
      style={{
        width: "500px",
        margin: "0 auto",
      }}
    >
      <h1 className="mt-3 mb-5">Real-time Chat App</h1>
      <div>
        {messages.map((message) => (
          <div
            key={message.id}
            style={{
              margin: "10px 0",
              display: "flex",
              justifyContent: `${
                message.idUser === firebase.user.uid ? "right" : "left"
              }`,
            }}
          >
            {message.idUser === firebase.user.uid && (
              <div style={{ marginRight: "20px" }}>
                <button onClick={() => handleEditMessage(message.id)}>
                  Sửa
                </button>
                <button onClick={() => handleDeleteMessage(message.id)}>
                  Xóa
                </button>
              </div>
            )}
            <div>
              {message.idUser !== firebase.user.uid && message.name} :{" "}
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5">
        <input
          style={{ width: "400px" }}
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          onClick={handleSendMessage}
          style={{ width: "70px", marginLeft: "30px" }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
