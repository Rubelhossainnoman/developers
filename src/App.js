import { Route, Routes } from "react-router-dom";
import About from "./pages/About/About";
import Create from "./pages/Create/Create";
import Edit from "./pages/Edit/Edit";
import Home from "./pages/Home/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/create" element={<Create />}></Route>
      <Route path="/edit/:id" element={<Edit />}></Route>
      <Route path="/about" element={<About />}></Route>
    </Routes>
  );
}

export default App;
