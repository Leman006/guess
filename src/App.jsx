import { Route, Routes } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import Home from "./pages/Home"
import Auth from "./pages/Auth"
import Women from "./pages/Women"
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import Men from "./pages/Men"
import WomenLayout from "./layouts/WomenLayout"
import WomenCloth from "./pages/WomenCloth"
import { Toaster } from "react-hot-toast"

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000, 
    });
  }, []);

  return (
    <>
    <Toaster />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />}/>
          <Route path="/men" element={<Men />}/>
          <Route path="/login" element={<Auth />}/>
        </Route>
        <Route path="/women" element={<WomenLayout/>}>
          <Route index element={<Women/>}/>
          <Route path="clothing/:subcategory" element={<WomenCloth/>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
