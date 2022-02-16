import React from "react";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([{}]);

  const [weights, setWeights] = useState([]);
  const [weightsArray, setWeightsArray] = useState([]);
  const [listItems, setlistItems] = useState([]);
  const [SUMS, setSUMS] = useState([]);
  const [dSize, setdSize] = useState();

  const [bins, setBins] = useState([]);
  useEffect(() => {
    callApi();
  }, [weights]);

  const [formValues, setFormValues] = useState([{ name: "", email: "" }]);
  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    let newWeights = [...weightsArray];
    // let test = [...weights];
    // let newWeights = [];
    newFormValues[i][e.target.name] = e.target.value;
    newWeights[i] = new Array(Number(newFormValues[i].email)).fill(
      Number(newFormValues[i].name)
    );
    // let test = [...weights, ...newWeights];
    setWeightsArray(newWeights);
    setFormValues(newFormValues);
  };

  let addFormFields = () => {
    setFormValues([...formValues, { name: "", email: "" }]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };
  async function callApi() {
    const response = await fetch(
      "https://decel-making-software.herokuapp.com/",
      {
        method: "POST",
        body: JSON.stringify({
          weights,
          dSize: Number(dSize),
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((response) => response.json())
      .then((message) => {
        console.log(message);
        setBins(message);
        let x = message.map((number) => <li>{number + " "} </li>);
        setlistItems(x);
        let y = message.map((number) => (
          <li>{number.reduce((result, number) => result + number)} </li>
        ));
        setSUMS(y);
      });
  }

  let handleSubmit = (event) => {
    event.preventDefault();
    var newArr = [];
    for (var i = 0; i < formValues.length; i++) {
      newArr = newArr.concat(weightsArray[i]);
    }
    setWeights(newArr);
    console.log(dSize);
    // callApi();
    // fetch("/username", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     weights,
    //     dSize: Number(dSize),
    //   }),
    //   headers: {
    //     "Content-type": "application/json; charset=UTF-8",
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((message) => {
    //     console.log(message);
    //     setBins(message);
    //     let x = bins.map((number) => <li>{number + " "} </li>);
    //     setlistItems(x);
    //     let y = bins.map((number) => (
    //       <li>{number.reduce((result, number) => result + number)} </li>
    //     ));
    //     setSUMS(y);
    //   });
  };

  return (
    <div>
      <label>Please Enter Decel Size</label>
      <input
        type="number"
        name="dSize"
        value={dSize}
        onChange={(e) => setdSize(e.target.value)}
      />
      <form onSubmit={handleSubmit}>
        {formValues.map((element, index) => (
          <div className="form-inline" key={index}>
            <label>Size</label>
            <input
              type="text"
              name="name"
              value={element.name || ""}
              onChange={(e) => handleChange(index, e)}
            />
            <label>X</label>
            <input
              type="text"
              name="email"
              value={element.email || ""}
              onChange={(e) => handleChange(index, e)}
            />
            {/* {index ? (
              <button
                type="button"
                className="button remove"
                onClick={() => removeFormFields(index)}
              >
                Remove
              </button>
            ) : null} */}
          </div>
        ))}
        <div>
          <button
            className="button add"
            type="button"
            onClick={() => addFormFields()}
          >
            Add
          </button>
          <button className="button submit" type="submit">
            Submit
          </button>
        </div>
      </form>
      <div className="bins">{listItems}</div>
      {/* <div className="bins">{weights}</div> */}
      <div>{SUMS}</div>
    </div>
  );
}

export default App;
