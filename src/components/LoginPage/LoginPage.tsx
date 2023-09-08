import { LoginForm } from "../LoginForm/LoginForm";
import styles from "./LoginPage.module.scss";

export const LoginPage: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <LoginForm />
    </div>
  );
};
