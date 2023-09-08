import { Route, Routes } from "react-router-dom";
import { LoginPage } from "../components/LoginPage/LoginPage";
import { ChatPage } from "../components/ChatPage/ChatPage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/chat-room" element={<ChatPage />} />
    </Routes>
  );
};
