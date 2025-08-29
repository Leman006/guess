import React, { useContext } from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Loader from '../components/Loader';
import { DataContext } from "../context/DataContext"

function MainLayout() {
  const { loader } = useContext(DataContext);

  if (loader) {
    return <Loader />;
  }
  return (
    <div>
      <Header />
      <main>
        <Outlet/>
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
