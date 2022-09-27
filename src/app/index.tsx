import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from "../routes";
import { store } from "../store";
import "./index.scss";

function App() {
  
  return (
    <BrowserRouter basename={'/todos'}>
      <Provider store={store}>
        <div className="App">
          <Routes>
            {routes.map((item, index) => {
              return <Route path={item.path} element={item.element} key={index} />;
            })}
          </Routes>
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
