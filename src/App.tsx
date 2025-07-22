import { Routes, Route } from 'react-router-dom';
import { DefaultLayout } from "./view/common/DefaultLayout/DefaultLayout";
import { Home } from "./view/pages/home/home";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Home />} />
          {/* Add more routes here as needed */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;