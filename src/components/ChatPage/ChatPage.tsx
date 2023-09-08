import { io } from "socket.io-client";
import { ChatRoom } from "../ChatRoom/ChatRoom";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { IMessageToChat, IUser } from "../../interfaces/user.interface";

const socket = io("http://localhost:8082");

export const ChatPage = () => {
  const [activeUser, setActiveUser] = useState<IUser>({
    userName: "",
    room: "",
  });
  const [messageToChat, setMessageToChat] = useState<IMessageToChat[]>([]);
  const [userMessage, setUserMessage] = useState("");
  const [usersInRoom, setUsersInRoom] = useState(0);
  const [isOpen, setOpen] = useState<boolean>(false);

  const navigate = useNavigate();
  const { search } = useLocation();

  const handleInputFocus = () => {
    setOpen(false);
  };

  const openEmoji = () => {
    setOpen((prev) => !prev);
  };

  /* user enter room */
  useEffect(() => {
    const searchParams = new URLSearchParams(search);
    const userToJoin: IUser = {
      userName: searchParams.get("userName") || "",
      room: searchParams.get("room") || "",
    };
    setActiveUser(userToJoin);
    socket.emit("join", userToJoin);
  }, [search]);

  /* all message to chat */
  useEffect(() => {
    socket.on("messageToChat", ({ data }) => {
      setMessageToChat((prev) => [...prev, data]);
    });
  }, []);

  /* send message from user */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserMessage(event.target.value);
  };

  const onEmojiClick = ({ emoji }: any) =>
    setUserMessage(`${userMessage} ${emoji}`);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!userMessage) return;
    socket.emit("userMessage", { userMessage, activeUser });
    setUserMessage("");
    setOpen(false);
  };

  /* users in chat */
  useEffect(() => {
    socket.on("usersInRoom", ({ data: { usersInRoom } }) => {
      setUsersInRoom(usersInRoom.length);
    });
  }, []);

  /* user left chat */
  const leftRoom = () => {
    socket.emit("leftRoom", { activeUser });
    navigate("/");
  };

  console.log("activeUser", activeUser);
  console.log("messageToChat", messageToChat);
  console.log("usersInRoom", usersInRoom);

  return (
    <ChatRoom
      userMessage={userMessage}
      roomName={activeUser.room}
      usersInRoom={usersInRoom}
      messageToChat={messageToChat}
      activeName={activeUser.userName}
      isOpen={isOpen}
      handleInputChange={handleInputChange}
      handleFormSubmit={handleFormSubmit}
      onEmojiClick={onEmojiClick}
      leftRoom={leftRoom}
      handleInputFocus={handleInputFocus}
      openEmoji={openEmoji}
    />
  );
};
