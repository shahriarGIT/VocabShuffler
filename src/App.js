import "./App.css";
import { FcGenericSortingAsc, FcTimeline } from "react-icons/fc";
import { IoMdResize } from "react-icons/io";
import Layout from "./container/ui/Layout";
import VocabList from "./pages/VocabList";
import Home from "./pages/Home";
import { useState } from "react";

import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  const [showMenu, setShowMenu] = useState(false);

  const showMenuHandler = () => {
    setShowMenu(!showMenu);
  };

  const hideMenuHandler = () => {
    setShowMenu(false);
  };
  return (
    <div className="App">
      <Layout
        hideMenu={hideMenuHandler}
        showMenu={showMenuHandler}
        menuStatus={showMenu}
      >
        <Routes>
          <Route path="/" element={<Navigate replace to="/Home" />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Vocab-List" element={<VocabList />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
