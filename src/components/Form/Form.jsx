  import "./Form.scss";
  import Footer from "../../components/footer/Footer";
  import { useState } from "react";

  const defaultFormValues = {
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    humidity: "",
    temperature: "",
    ph: "",
    rainfall: "",
  };

  const Form = () => {
    const [formValues, setFormValues] = useState(defaultFormValues);
    const [prediction, setPrediction] = useState(null);

    const {
      nitrogen,
      phosphorus,
      potassium,
      temperature,
      humidity,
      ph,
      rainfall,
    } = formValues;

    const onChangeHandler = (e) => {
      const { name, value } = e.target;
      setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (event) => {
      event.preventDefault();

      fetch('http://localhost:5000/predict', {
        method: 'POST',
        mode: "cors",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.prediction);
          setPrediction(data.prediction);
          setFormValues(defaultFormValues);
        });
    };

    return (
      <>
        <form className="form-container" onSubmit={handleSubmit}>
          <div className="heading">
            <h2>Enter the parameters</h2>
          </div>
          <label htmlFor="nitrogen">Nitrogen:</label>
          <input
            type="number"
            name="nitrogen"
            value={nitrogen}
            onChange={onChangeHandler}
            // required
          />
          <label htmlFor="phosphorus">Phosphorus:</label>
          <input
            type="number"
            name="phosphorus"
            value={phosphorus}
            onChange={onChangeHandler}
            // required
          />
          <label htmlFor="potassium">Potassium:</label>
          <input
            type="number"
            name="potassium"
            value={potassium}
            onChange={onChangeHandler}
            // required
          />
          <label htmlFor="temperature">Temperature:</label>
          <input
            type="number"
            name="temperature"
            value={temperature}
            onChange={onChangeHandler}
            // required
          />
          <label htmlFor="humidity">Humidity:</label>
          <input
            type="number"
            name="humidity"
            value={humidity}
            onChange={onChangeHandler}
            // required
          />
          <label htmlFor="ph">PH:</label>
          <input
            type="number"
            name="ph"
            value={ph}
            onChange={onChangeHandler}
            // required
          />
          <label htmlFor="rainfall">Rainfall:</label>
          <input
            type="number"
            name="rainfall"
            value={rainfall}
            onChange={onChangeHandler}
            // required
          />
          <button type="submit" className="submit-form">
            Submit
          </button>
        </form>
        {prediction && (
        <div className="prediction-container">
          <h1>The predicted crop yield is {prediction}</h1>
        </div>
      )}
        <Footer />
      </>
    );
  };

  export default Form;
