import React from "react";
import { Table } from "antd";
import productService from "../services/productService";
import { Button } from "antd";

export default function ProductList() {
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

  function handleClick(record) {
    productService.addQuantity(record.product_id);
    window.location.reload(false);
  }

  var arrayToString = JSON.stringify(Object.assign({}, products));
  var stringToJsonObject = JSON.parse(arrayToString); // convert string to json object
  var filt = [];
  for (let prop in stringToJsonObject) {
    filt.push({
      text: stringToJsonObject[prop].product_name,
      value: stringToJsonObject[prop].product_name,
    });
  }
  const columns = [
    {
      title: "Product Name",
      dataIndex: "product_name",
      filters: filt,
      onFilter: (value, record) => record.product_name.indexOf(value) === 0,
      sorter: (a, b) => a.product_name.length - b.product_name.length,
      sortDirections: ["descend"],
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button onClick={(e) => handleClick(record, e)} type="primary">
          Add Quantity
        </Button>
      ),
    },
  ];

  return <Table columns={columns} dataSource={products} />;
}
