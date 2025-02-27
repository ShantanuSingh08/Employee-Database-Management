import AddEmployeeComponent from "./component/AddEmployeeComponent";
import ListEmployeeComponent from "./component/ListEmployeeComponent";

import FooterComponent from "./component/FooterComponent";
import HeaderComponent from "./component/HeaderComponent";
import LoginComponent from "./component/LoginComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <HeaderComponent />
      <div className="container">
        <Routes>
          <Route path="/" element={<ListEmployeeComponent />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/employee" element={<ListEmployeeComponent />} />
          <Route path="/add-employee" element={<AddEmployeeComponent />} />
          <Route path="/add-employee/:id" element={<AddEmployeeComponent />} />
        </Routes>
      </div>
      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;
