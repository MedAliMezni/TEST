let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();


chai.use(chaiHttp);

describe('Products API', () => {

    /*
     * Test the /GET route
     */
    describe('/GET products', () => {
        it('it should GET all the products', (done) => {
            chai.request(server)
                .get('/products')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.gte(0);
                    done();
                });
        });
    });
    /*
     * Test the /POST route
     */
    describe('/POST products', () => {
        it('it should not POST a product without product_name field', (done) => {
            let product = {
                product_id: "111111",
                date: "09-11-2020",
                quantity: 195
            }
            chai.request(server)
                .post('/products')
                .send(product)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    done();
                });
        });

    });
    /*
     * Test the /GET/:id route
     */
    describe('/GET/:id products', () => {
        it('it should GET a product by the given id', (done) => {
            let product_id = "111111";
            chai.request(server)
                .get('/products/' + product_id)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    done();
                });


        });
    });

    /*
     * Test the /PUT/:id route
     */
    describe('/PUT/:id products', () => {
        it('it should UPDATE a product given the id', (done) => {
            let product_id = "111111";

            chai.request(server)
                .put('/products/' + product_id)

                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('error while adding quantity or not found');
                    done();
                });

        });
    });
    /*
     * Test the /DELETE/:id route
     */
    describe('/DELETE/:id products', () => {
        it('it should DELETE a book given the id', (done) => {
            let product_id = "111111";
            chai.request(server)
                .delete('/products/' + product_id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql(`removed`);
                    done();
                });
        });
    });
});