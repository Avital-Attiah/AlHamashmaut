
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Entry/logIn.jsx";
import Register from "./components/Entry/register.jsx";
import Home from "./components/home.jsx";
import Episodes from "./components/Episodes/episodes.JSX";
import EpisodeDetails from "./components/Episodes/episodeDetails.jsx";
import Supporters from "./components/supporters.jsx";
import Framework from "./components/framework.jsx"; // ✅ חדש

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* דפים ללא פריסה (login/register) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* דפים עם פריסת Framework */}
        <Route path="/:user?/:id?" element={<Framework />}>
          <Route index element={<Home />} />
          <Route path="episodes" element={<Episodes  showFuture={false}/>} />
          <Route path="episodes/:id" element={<EpisodeDetails />} />
           {/* <Route path="episode/:id/qustion" element={<EpisodeDetails showComments={false}  />} />
          <Route path="episode/:id/comment" element={<EpisodeDetails showComments={true} />} /> */}
          <Route path="interviews" element={<Episodes showFuture={true} />} />
          <Route path="supporters" element={<Supporters />} />
          {/* אפשר להוסיף כאן גם contact בעתיד */}
        </Route>

        {/* דף שגיאה */}
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
