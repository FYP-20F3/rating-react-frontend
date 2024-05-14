// CommonChat.js

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { BASE_URL } from "../../../const/APIS";

const useChatData = () => {
  const { token, currentUser } = useSelector((state) => state.user);
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const socket = useRef(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receiveMessage, setReceiveMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    socket.current = io("http://localhost:8800");
    socket.current.on("connect", () => {
      // console.log("connected");
      socket.current.emit("new-user-add", currentUser?._id);
      socket.current.on("get-users", (users) => {
        setOnlineUsers(users);
      });
    });
  }, [currentUser]);

  useEffect(() => {
    if (sendMessage) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  useEffect(() => {
    socket.current.on("receive-message", (data) => {
      setReceiveMessage(data);
    });
  }, []);

  useEffect(() => {
    if (
      receiveMessage !== null &&
      receiveMessage.chatId === currentChat._id &&
      receiveMessage.complaintId === currentChat?.members[0]?.complaintId?._id
    ) {
      setChatMessages([...chatMessages, receiveMessage]);
    }
  }, [receiveMessage]);

  useEffect(() => {
    const fetchChats = async () => {
      const { data } = await axios.get(`${BASE_URL}chat/${currentUser._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(data);
      setChats(data);
    };
    if (currentUser) fetchChats();
  }, [currentUser._id, token]);

  useEffect(() => {
    // Fetch messages from the server
    const fetchMessages = async () => {
      const { data } = await axios.get(
        `${BASE_URL}message/${currentChat?._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(data);
      setChatMessages(data);
    };
    if (currentChat) fetchMessages();
  }, [currentChat, token]);

  const handleSend = async (e) => {
    e.preventDefault();

    // console.log(currentUser);
    const message = {
      senderId: currentUser?._id,
      message: newMessage,
      chatId: currentChat?._id,
      complaintId: currentChat.members[0]?.complaintId?._id,
    };
    // console.log(message);

    try {
      const { data } = await axios.post(`${BASE_URL}message/`, message, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setChatMessages([...chatMessages, message]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }

    const receiverId =
      currentChat?.members[0]?.customer?._id !== currentUser?._id
        ? currentChat?.members[0]?.customer?._id
        : currentChat?.members[0]?.business?._id;

    const receiverSocketId = onlineUsers?.find(
      (user) => user.userId === receiverId
    )?.socketId;

    setSendMessage({ ...message, receiverSocketId });
  };

  

  return {
    chats,
    currentChat,
    setCurrentChat,
    chatMessages,
    newMessage,
    setNewMessage,
    handleSend,
    onlineUsers,
  };
};

export default useChatData;
