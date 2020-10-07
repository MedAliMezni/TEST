const {
  v4: uuidv4
} = require('uuid');

const yup = require('yup');
let Product = yup.object().shape({
  product_id: yup.string().required(),
  product_name: yup.string().required(),
  date: yup.date().default(function () {
    return new Date();
  }).required(),
  quantity: yup.number().required().positive().integer()
});


const productRoutes = (app, fs) => {
  // variables
  const dataPath = "./data/products.json";

  // helper methods
  const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
    fs.readFile(filePath, encoding, (err, data) => {
      if (err) {
        throw err;
      }

      callback(returnJson ? JSON.parse(data) : data);
    });
  };

  const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {

    fs.writeFile(filePath, fileData, encoding, (err) => {
      if (err) {
        throw err;
      }

      callback();
    });
  };
  // Funtcion that will send all products in the JSON file
  app.get("/products", (req, res) => {
    fs.readFile(dataPath, "utf8", (err, data) => {
      if (err) {
        throw err;
      }

      res.send(JSON.parse(data));
    });
  });

  //Function that will add a new product after validating the body of the request 
  //and opening the file and adding the new product at the end of the file

  app.post('/products', (req, res) => {

    let p = req.body
    p.product_id = uuidv4();
    Product.isValid(p).then(function (valid) {
      if (valid) {
        readFile(data => {
            const product_id = Object.keys(data).length;
            // add the new product
            data[product_id.toString()] = p;
            writeFile(JSON.stringify(data, null, 2), () => {
              res.status(200).json({
                message: 'new product added'
              });
            });
          },
          true);

      } else {
        res.status(400).json({
          message: 'error while adding'
        });

      }
    })

  });
  // Function that will return an object of product after fidning it 
  app.get('/products/:id', (req, res) => {

    readFile(data => {

        // search for the the new product

        if (Object.keys(data).length > 0) {
          index = data.findIndex(it => it.product_id === req.params["id"]);
          if (index != -1) {
            res.status(200).json({
              product: data[index]
            });


          } else {
            res.status(400).json({
              message: ` error while removing or already empty`
            });
          }
        }


      },
      true);
  });

  //Function that will search withing the file for the product to be deleted 
  //and after finding it , it will be deleted or returns ann error 
  app.delete('/products/:id', (req, res) => {

    readFile(data => {

        // add the new product

        if (Object.keys(data).length > 0) {
          index = data.findIndex(it => it.product_id === req.params["id"]);
          data.splice(index, 1);
          writeFile(JSON.stringify(data, null, 2), () => {
            res.status(200).json({
              message: `removed`
            });
          });
        } else {
          res.status(400).json({
            message: `error while removing or already empty`
          });
        }


      },
      true);
  });

  //Function that will increment the quantity by 1 after searching for the product
  //and return an error in case of the product not found or the JSON file is empty 
  app.put('/products/:id', (req, res) => {
    readFile(data => {
        if (Object.keys(data).length > 0) {
          index = data.findIndex(it => it.product_id === req.params["id"]);
          if (index != -1) {
            data[index].quantity += 1
            writeFile(JSON.stringify(data, null, 2), () => {
              res.status(200).json({
                message: ` quantity added`
              });
            });
          } else {
            res.status(400).json({
              message: `error while adding quantity or not found`
            });
          }
        } else {
          res.status(400).json({
            message: `empty file`
          });
        }
      },
      true);
  });

};

module.exports = productRoutes;