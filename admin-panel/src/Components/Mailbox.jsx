import React, { useState } from "react";
import "../Styles/ComponentStyles/Mailbox.css";


const Mailbox = () => {
  const [message, setMessage] = useState("");

  const recipientEmail = "ananthun420@gmail.com";

  const sendMail = () => {
    if (message.trim() === "") {
      alert("Message cannot be empty!");
      return;
    }

    const subject = "Feedback from FellowSync";
    const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;

    window.location.href = mailtoLink; 
  };

  return (
    <div className="mailbox">
      <h2>Send Us a Message</h2>
      <textarea
        placeholder="Type your message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMail}>Send</button>
    </div>
  );
};

export default Mailbox;