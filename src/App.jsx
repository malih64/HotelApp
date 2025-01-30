import { Toaster } from "react-hot-toast";
import "./App.css";
import LocationList from "./components/LocationList/LocationList";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HotelsLayout from "./components/HotelsLayout/HotelsLayout";
import Hotels from "./components/Hotels/Hotels";
import HotelsProvider from "./context/HotelsProvider";
import SingleHotel from "./components/SingleHotel/SingleHotel";


function App() {

  return (
    <HotelsProvider>
      <Toaster />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LocationList />} />
          <Route path="/hotels" element={<HotelsLayout />}>
            <Route index element={<Hotels />} />
            <Route path=":id" element={<SingleHotel />} />
          </Route>
        </Route>
      </Routes>
    </HotelsProvider>
  )
}

export default App
