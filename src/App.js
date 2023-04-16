import Navigation from "./Routes/Navbar/Navbar";
import Home from "./Routes/Home/Home";
import Crop from "./Routes/Crop/Crop";
import Authentication from "./Routes/Auth/Authentication";
import Form from "./components/Form/Form";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  const [prediction, setPrediction] = useState(null);

  const handlePrediction = (data) => {
    setPrediction(data.prediction);
  };

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="/crop-recommendation" element={<Crop />} />
        <Route path="/sign-in" element={<Authentication />} />
        <Route
          path="/form"
          element={<Form handlePrediction={handlePrediction} />}
        />
      </Route>
    </Routes>
  );
}

export default App;
