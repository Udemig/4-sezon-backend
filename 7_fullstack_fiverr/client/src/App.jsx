import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Header from "./components/header";
import Footer from "./components/footer";
import Search from "./pages/search";
import AddGig from "./pages/add_gig";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex-1 p-5 max-w-[1440px] mx-auto w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<Search />} />
          <Route path="/add-gig" element={<AddGig />} />
          <Route path="/detail" element={<h1>DETAY</h1>} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
};

export default App;
