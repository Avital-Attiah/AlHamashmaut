
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Entry/logIn.jsx";
import Register from "./components/Entry/register.jsx";
import Home from "./components/home.jsx";
import Episodes from "./components/Episodes/episodes.JSX";
import EpisodeDetails from "./components/Episodes/episodeDetails.jsx";
import Supporters from "./components/supporters.jsx";
import Framework from "./components/framework.jsx"; // ✅ חדש
import EpisodeForm from "./components/Episodes/EpisodeForm.jsx";
import Contact from "./components/contact.jsx"; // ✅ חדש
import AdminPage from "./components/Admin/adminPage.jsx";
import AllUsers from "./components/Admin/allUsers.jsx";
import AllEpisodes from "./components/Admin/allEpisodes.jsx";
import AllFutureInterviews from "./components/Admin/allFutureInterviews.jsx"; // ✅ חדש
import AddEditEpisode from "./components/Admin/addEditEpisode.jsx"; // ✅ חדש


function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* דפים ללא פריסה (login/register) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/allUsers" element={<AllUsers />} />
        <Route path="/admin/allEpisodes" element={<AllEpisodes />} />
        <Route path="/admin/allFutureInterviews" element={<AllFutureInterviews />} /> */}
        {/* <Route path="/episode/new" element={<AddEditEpisode />} />
        <Route path="/episode/form" element={<AddEditEpisode />} />
        <Route path="/episode/form/future" element={<AddEditEpisode />} />
        <Route path="/episode/form/:id" element={<AddEditEpisode />} /> */}

    <Route path="/admin/episode/new" element={
            <EpisodeForm newInterview={false}  />
          } />

 <Route path="/admin/interview/new" element={
            <EpisodeForm newInterview={true}/>
          } />

        {/* דפים עם פריסת Framework */}
        <Route path="/" element={<Framework />}>
          <Route index element={<Home />} />

          <Route path="episodes" element={<Episodes showFuture={false} />} />
          <Route path="home" index element={<Home />} />
  <Route path="admin" element={<AdminPage />} >
   <Route path="allUsers" element={<AllUsers />} />
        <Route path="allEpisodes" element={<AllEpisodes />} />
        <Route path="allFutureInterviews" element={<AllFutureInterviews />} />
        <Route path="allEpisodes/episode/new" element={
            <EpisodeForm newInterview={false}  />
          } />

 <Route path="allFutureInterviews/interview/new" element={
            <EpisodeForm newInterview={true}/>
          } />
          </Route>
          <Route path="episodes" element={<Episodes showFuture={false} />} />
    
          <Route path="episode/:id/update" element={
            <EpisodeForm onSuccess={() => alert(`/episodes}`)} />
          } />

          <Route path="episode/:id/qustion" element={<EpisodeDetails showComments={false} />} />

          <Route path="episode/:id/update" element={
            <EpisodeForm onSuccess={() => alert(`/episodes}`)} />
          } />
      
          <Route path="episode/:id/qustion" element={<EpisodeDetails showComments={false} />} />
          <Route path="episode/:id/comment" element={<EpisodeDetails showComments={true} />} />
          <Route path="interviews" element={<Episodes showFuture={true} />} />
          <Route path="supporters" element={<Supporters />} />
          <Route path="contact" element={<Contact />} />
          {/* אפשר להוסיף כאן גם contact בעתיד */}
        </Route>

        {/* דף שגיאה */}
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

