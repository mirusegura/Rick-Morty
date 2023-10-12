import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { Profile } from '../pages/Profile/Profile'
export default function PublicRoute({changeSearch}) {
  return (
    <Routes>
      <Route path="/" element={<Home changeSearch={changeSearch}/>} />
      <Route path="/profile/:id" element={<Profile />} />
    </Routes>
  );
}
