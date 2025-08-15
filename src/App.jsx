import { Route, Routes } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import Home from "./pages/Home"
import Auth from "./pages/Auth"
import Women from "./pages/Women"
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useContext, useEffect } from 'react';
import Men from "./pages/Men"
import WomenLayout from "./layouts/WomenLayout"
import WomenCloth from "./pages/WomenCloth"
import { Toaster } from "react-hot-toast"
import Loader from "./components/Loader"
import { DataContext } from "./context/DataContext"
import Wishlist from "./pages/Wishlist"
import MenCloth from "./pages/MenCloth"
import MenLayout from "./layouts/MenLayout"
import Details from "./pages/Details"

function App() {
  const { loader } = useContext(DataContext);

  useEffect(() => {
    AOS.init({
      duration: 1000, 
    });
  }, []);

  if (loader) {
    return <Loader />; 
  }

  return (
    <>
    <Toaster />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />}/>
          <Route path="/men" element={<MenLayout />}>
            <Route index element={<Men />}/>
            <Route path="clothing/:subcategory" element={<MenCloth />} />
            <Route path="clothing/:subcategory/:code" element={<Details/>} />
          </Route>
          <Route path="/women" element={<WomenLayout/>}>
            <Route index element={<Women/>}/>
            <Route path="clothing/:subcategory" element={<WomenCloth/>} />
            <Route path="clothing/:subcategory/:code" element={<Details/>} />
          </Route>
          <Route path="/login" element={<Auth />}/>
          <Route path="/wishlist" element={<Wishlist />} />
        </Route>
        
      </Routes>
    </>
  )
}

export default App
