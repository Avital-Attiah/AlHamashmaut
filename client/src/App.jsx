import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Entry/logIn";
import Register from "./components/Entry/register";
import FullInfo from "./components/Entry/fullInfo";
import Home from "./components/home"; // או Main
import Todos from "./components/Todos/todos";
import Info from "./components/Info";
import Posts from "./components/Episodes/posts";
import OtherPosts from "./components/Episodes/otherPosts";
import { UserProvider } from "./UserContext";
import Supporters from "./components/supporters";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          {/* ✅ עמוד הבית (חופשי לכולם) */}
          <Route path="/" element={<Home />} />
          <Route index element={<Home />} />

          {/* התחברות והרשמה */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/full-registration" element={<FullInfo />} />

          {/* דפים פומביים נוספים */}
          <Route path="/supporters" element={<Supporters />} />

          {/* דפים מותאמים למשתמשים */}
          <Route path="/:user/:id/home" element={<Home />} />
          <Route path="/:user/:id/info" element={<Info />} />
          <Route path="/:user/:id/todos" element={<Todos />} />
          <Route path="/:user/:id/posts" element={<Posts />} />
          <Route path="/:user/:id/otherPosts" element={<OtherPosts />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
