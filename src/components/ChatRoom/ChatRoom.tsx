import EmojiPicker from "emoji-picker-react";
import emojiIcon from "../../assets/icons/smileIcon.png";
import { Message } from "../Message/Message";
import { IMessageToChat } from "../../interfaces/user.interface";
import styles from "./ChatRoom.module.scss";

interface ChatRoomProps {
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleFormSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  leftRoom: () => void;
  handleInputFocus: () => void;
  openEmoji: () => void;
  userMessage: string;
  onEmojiClick: any;
  roomName: string;
  usersInRoom: number;
  messageToChat: IMessageToChat[];
  activeName: string;
  isOpen: boolean;
}

export const ChatRoom: React.FC<ChatRoomProps> = ({
  handleInputChange,
  handleFormSubmit,
  handleInputFocus,
  leftRoom,
  openEmoji,
  userMessage,
  onEmojiClick,
  roomName,
  usersInRoom,
  messageToChat,
  activeName,
  isOpen,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div>Room: {roomName}</div>
        <div> Users in room ( {usersInRoom} ) </div>
        <button onClick={leftRoom}>Leave a room</button>
      </div>
      <div className={styles.content}>
        <Message messageToChat={messageToChat} activeName={activeName} />
      </div>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="name"
          autoComplete="off"
          placeholder="Write your message"
          onFocus={handleInputFocus}
          onChange={handleInputChange}
          value={userMessage}
        />
        <img onClick={openEmoji} src={emojiIcon} alt="Emoji icon" />
        {isOpen && (
          <div className={styles.emojiPicker}>
            <EmojiPicker onEmojiClick={onEmojiClick} />
          </div>
        )}
        <button type="submit">Send</button>
      </form>
    </div>
  );
};
