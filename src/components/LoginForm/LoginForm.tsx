import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../interfaces/user.interface";
import chatIcon from "../../assets/icons/chatIcon.svg";
import styles from "./LoginForm.module.scss";

export const LoginForm: React.FC = () => {
  const [userInfo, setUserInfo] = useState<IUser>({ userName: "", room: "" });
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserInfo((prevUserInfo) => ({ ...prevUserInfo, [name]: value }));
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!userInfo.userName || !userInfo.room) {
      return;
    }
    navigate(`/chat-room?userName=${userInfo.userName}&room=${userInfo.room}`);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <img src={chatIcon} alt="Logo" />
        <span>ChaChat</span>
      </div>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="userName"
          autoComplete="off"
          placeholder="Name"
          required
          value={userInfo.userName}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="room"
          autoComplete="off"
          placeholder="Room"
          required
          value={userInfo.room}
          onChange={handleInputChange}
        />
        <button type="submit">Enter Room</button>
      </form>
    </div>
  );
};
