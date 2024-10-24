import "./App.css";
import { RouterComponent as Router } from "./shared/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MainProvider } from "./utils/context/context";
function App() {
  return (
    <MainProvider>
      <div className="App">
        <Router />
        <ToastContainer
          position="top-right"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </MainProvider>
  );
}

export default App;
