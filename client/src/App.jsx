// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./components/Entry/logIn";
// import Register from "./components/Entry/register";
// import FullInfo from "./components/Entry/fullInfo";
// import Home from "./components/home"; // או Main
// import Episodes from "./components/Episodes/episodes.JSX";
// import EpisodeDetails from "./components/Episodes/episodeDetails.jsx";
// import Info from "./components/Info";
// import Posts from "./components/Episodes/posts";
// import OtherPosts from "./components/Episodes/otherPosts";
// import { UserProvider } from "./UserContext";
// import Supporters from "./components/supporters";

// function App() {
//   return (
    // <UserProvider>
    // <BrowserRouter>
    //   <Routes>
    //     {/* ✅ עמוד הבית (חופשי לכולם) */}
    //     <Route path="/" element={<Home />} />
    //     <Route index element={<Home />} />

    //     {/* התחברות והרשמה */}
    //     <Route path="/login" element={<Login />} />
    //     <Route path="/register" element={<Register />} />
    //     {/* <Route path="/full-registration" element={<FullInfo />} /> */}
    //     <Route path="/:user?/:id?/home" element={<Home />}>
    //       <Route path="episodes" element={<Episodes />} />
    //       <Route path="episodes/:id" element={<EpisodeDetails />} />
    //       <Route path="interviews" element={<Episodes />} />
    //       <Route path="supporters" element={<Supporters />} />


          {/* <Route path="posts/:idPost/comments" element={<Comments />} /> */}

          {/* <Route path="albums" element={<Albums />} />
          <Route path="albums/:idAlbum/photos" element={<Photos />} />
        
        <Route path="info" element={<Info />} />
        <Route path=":kind/new/:id?" element={<CreateForm />} />
        <Route path=":from/:id?/:kind/new" element={<CreateForm />} /> */}
        // </Route>
        
        // <Route path="*" element={<div>Page Not Found</div>} />
        {/* דפים פומביים נוספים */}
        {/* <Route path="/:user?/:id?/supporters" element={<Supporters />} /> */}

        {/* דפים מותאמים למשתמשים */}
        {/* <Route path="/:user/:id/home" element={<Home />} />
          <Route path="/:user?/:id?/episodes" element={<Episodes />} />
          <Route path="/:user?/:id?/interviews" element={<Episodes />} /> */}

        {/* <Route path="/:user/:id/info" element={<Info />} /> */}
        {/* <Route path="/:user/:id/todos" element={<Todos />} /> */}
        {/* <Route path="/:user/:id/posts" element={<Posts />} /> */}
        {/* <Route path="/:user/:id/otherPosts" element={<OtherPosts />} /> */}
    //   </Routes>
    // </BrowserRouter>
    // {/* </UserProvider> */}
//   );
// }

// export default App;

//App.jsx
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./components/Entry/logIn";
// import Register from "./components/Entry/register";
// import Home from "./components/home";
// import Episodes from "./components/Episodes/episodes.jsx"; // ודא שזה שם הקובץ
// import Supporters from "./components/supporters";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* דפים ללא פריסה כלל */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />

//         {/* פריסה דרך דף הבית */}
//         <Route path="/" element={<Home />}>
//           <Route index element={<div>ברוכים הבאים</div>} />
//           <Route path="episodes" element={<Episodes />} />
//           <Route path="interviews" element={<Episodes />} />
//           <Route path="supporters" element={<Supporters />} />
//         </Route>

//         <Route path="*" element={<div>Page Not Found</div>} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;



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
          <Route path="episodes" element={<Episodes />} />
          <Route path="episodes/:id" element={<EpisodeDetails />} />
          <Route path="interviews" element={<Episodes />} />
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
