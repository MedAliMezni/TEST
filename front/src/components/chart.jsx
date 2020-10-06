import * as React from "react";
import { Chart } from "react-google-charts";
import productService from "../services/productService";

export default function Chartt() {
  const [products, setProducts] = React.useState([]);
  const [isError, setIsError] = React.useState(false);

  React.useEffect(() => {
    setIsError(false);
    productService
      .getProducts()
      .then((products) => {
        setProducts(products);
      })
      .catch((err) => {
        setIsError(true);
      });
  }, []);
  const options = {
    title: "Quantiy vs. Date comparison",
    hAxis: { title: "Quantity" },
    vAxis: { title: "Date" },
    legend: "none"
  };
  var arrayToString = JSON.stringify(Object.assign({}, products));
  
  var stringToJsonObject = JSON.parse(arrayToString); // convert string to json object
  const data = [["Age", "Weight"]];

  var filt = [];
  for (let prop in stringToJsonObject) {
    filt.push({
      text: stringToJsonObject[prop].date,
      value: stringToJsonObject[prop].quantity,
    });
    data.push([stringToJsonObject[prop].date,stringToJsonObject[prop].quantity])
  }
 
return  <div className={"my-pretty-chart-container"}>
<div className="App">
        <Chart chartType="ScatterChart" width="100%" height="400px" data={data}
      options={options}
     
      legendToggle />
      </div>
</div>
}
