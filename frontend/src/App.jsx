import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreatePaste from "./pages/Createpaste";
import ViewPaste from "./pages/Viewpaste";
import MyPastes from "./pages/MyPastes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreatePaste />} />
        <Route path="/paste/:id" element={<ViewPaste />} />
        <Route path="/my-pastes" element={<MyPastes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
