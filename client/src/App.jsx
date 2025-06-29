
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Entry/logIn.jsx";
import Register from "./components/Entry/register.jsx";
import Home from "./components/home.jsx";
import EpisodesPage from "./components/Episodes/episodes.jsx";
import EpisodeDetails from "./components/Episodes/episodeDetails.jsx";
import Supporters from "./components/supporters.jsx";
import Framework from "./components/framework.jsx";
import EpisodeForm from "./components/Episodes/EpisodeForm.jsx";
import Contact from "./components/contact.jsx";
import AdminPage from "./components/Admin/adminPage.jsx";
import AllUsers from "./components/Admin/allUsers.jsx";
import AllEpisodes from "./components/Admin/allEpisodes.jsx";
import AllFutureInterviews from "./components/Admin/allFutureInterviews.jsx";
import ProfilePage from "./components/Personal/ProfilePage.jsx";
import "./style/globalStyle.css"; // ייבוא קובץ CSS גלובלי

// import MessagesPage from "./components/Personal/MessagesPage.jsx";

import { ModalProvider } from "./AppContext.jsx";

function App() {
  return (
    <BrowserRouter>
      <ModalProvider>
        <Routes>
          {/* עמודי רישום בלבד - ללא פריסה */}
          {/* <Route path="/register" element={<Register />} /> */}
          {/* אין צורך ב- /login כי הוא נפתח כמודאל */}

          {/* דפים עם תבנית Framework */}
          <Route path="/" element={<Framework />}>
            <Route index element={<Home />} />
            <Route path="episodes" element={<EpisodesPage showFuture={false} />} />
            <Route path="interviews" element={<EpisodesPage showFuture={true} />} />
            <Route path="episode/:id/comment" element={<EpisodeDetails showComments={true} />} />
            <Route path="episode/:id/qustion" element={<EpisodeDetails showComments={false} />} />
            <Route path="episode/:id/update" element={<EpisodeForm onSuccess={() => alert("/episodes")} />} />
            <Route path="supporters" element={<Supporters />} />
            <Route path="contact" element={<Contact />} />
            <Route path="profile" element={<ProfilePage />} />
            {/* <Route path="messages" element={<MessagesPage />} /> */}

            {/* ניהול */}
            <Route path="admin" element={<AdminPage />}>
              <Route path="allUsers" element={<AllUsers />} />
              <Route path="allEpisodes" element={<AllEpisodes />} />
              <Route path="allFutureInterviews" element={<AllFutureInterviews />} />
              <Route path="allEpisodes/episode/new" element={<EpisodeForm newInterview={false} />} />
              <Route path="allFutureInterviews/interview/new" element={<EpisodeForm newInterview={true} />} />
            </Route>
          </Route>

          {/* עמוד שגיאה */}
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </ModalProvider>
    </BrowserRouter>
  );
}

export default App;
