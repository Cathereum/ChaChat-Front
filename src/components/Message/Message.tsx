import { IMessageToChat } from "../../interfaces/user.interface";
import styles from "./Message.module.scss";

interface MessageProps {
  messageToChat: IMessageToChat[];
  activeName: string;
}

export const Message: React.FC<MessageProps> = ({
  messageToChat,
  activeName,
}) => {
  return (
    <>
      {messageToChat.map(({ user, message }) => {
        const itsMe =
          user.userName.trim().toLowerCase() ===
          activeName.trim().toLowerCase();

        const className = itsMe ? styles.me : styles.user;

        const admin = user.userName.trim().toLowerCase() === "admin";

        return (
          <div
            className={
              admin
                ? `${styles.wrapper} ${styles.admin}`
                : `${styles.wrapper} ${className}`
            }
          >
            <div>
              {!itsMe && !admin ? (
                <span className={styles.name}>{user.userName}</span>
              ) : null}
              <div className={styles.text}>{message}</div>
            </div>
          </div>
        );
      })}
    </>
  );
};
