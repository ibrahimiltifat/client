import React from "react";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([{}]);
  // const [weights, setWeights] = useState([
  //   38, 28, 38, 37, 37, 30, 37, 37, 42, 37, 31, 36, 36, 36, 42, 29, 29, 36, 34,
  //   39, 39, 24, 39, 39, 38, 26, 38, 38, 35, 35, 22, 42, 40, 40, 20, 40, 34, 36,
  //   36, 25, 25, 35, 35, 22, 25, 25, 35, 34, 23, 25, 25, 34, 34, 34, 20, 20, 33,
  //   33, 33, 23, 20, 33, 33, 32, 22, 22, 32, 32, 32, 23, 23, 32, 32, 31, 20, 27,
  //   31, 31, 31, 20, 29, 31, 30, 30, 24, 27, 30, 30, 30, 29, 23, 28, 28, 28, 28,
  //   28, 22, 23, 24, 26, 27, 20, 26, 26, 26, 26, 38, 27, 27, 27, 24, 37, 24, 24,
  //   24, 24, 24, 22, 23, 23, 23, 23, 25, 25, 31, 32, 33, 42,
  // ]);
  const [weights, setWeights] = useState([]);
  const [listItems, setlistItems] = useState([]);
  const [SUMS, setSUMS] = useState([]);
  const [dSize, setdSize] = useState();

  const [bins, setBins] = useState([]);

  const [formValues, setFormValues] = useState([{ name: "", email: "" }]);
  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    // let test = [...weights];
    // let newWeights = [];
    newFormValues[i][e.target.name] = e.target.value;
    let newWeights = new Array(Number(newFormValues[i].email)).fill(
      Number(newFormValues[i].name)
    );
    let test = [...weights, ...newWeights];
    setWeights(test);
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
    console.log(weights);
    console.log(dSize);
    callApi();
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
