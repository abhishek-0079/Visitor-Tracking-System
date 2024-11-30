import {BrowserRouter as Router ,Routes, Route} from "react-router-dom";
import LoginPanel from "./components/LoginPanel";
import DashBoard from "./components/DashBoard";

function  App(){
  return (
    <>
   <Router>
    <Routes>
      <Route path="*" element={<LoginPanel/>}/>
      <Route path="/dashboard" element={<DashBoard/>}/>

    </Routes>
   </Router>
    </> 
  );
};
export default App;
