import {
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreatePost from "./pages/CreatePost";
import PostDetails from "./pages/PostDetails";
import EditPost from "./pages/EditPost";
import Articles from "./pages/Articles";
import Trending from "./pages/Trending";
import Profile from "./pages/Profile";
import Drafts from "./pages/Drafts";
import Search from "./pages/Search";
import Bookmarks from "./pages/Bookmarks";
import Notifications from "./pages/Notifications";
import History from "./pages/History";
import Settings from "./pages/Settings";
import Feed from "./pages/Feed";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
  path="/bookmarks"
  element={<Bookmarks />}
/>



        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          }
        />

        <Route
  path="/feed"
  element={<Feed />}
/>

        <Route path="/post/:id" element={<PostDetails />} />
        <Route
  path="/drafts"
  element={<Drafts />}
/>
        <Route
  path="/settings"
  element={<Settings />}
/>
        <Route path="/search" element={<Search />} />
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <EditPost />
            </ProtectedRoute>
          }
        />

        <Route
  path="/notifications"
  element={<Notifications />}
/>

        <Route path="/articles" element={<Articles />} />

        <Route
  path="/history"
  element={<History />}
/>

        <Route
  path="/trending"
  element={<Trending />}
/>

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

      </Routes>

  );
}

export default App;