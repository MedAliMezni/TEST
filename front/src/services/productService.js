import axios from 'axios';


const service = axios.create({
  baseURL: "http://localhost:5000/",
  responseType: "json"
});
const errHandler = (err) => {
	console.error(err);
	if (err.response && err.response.data) {
		console.error('API response', err.response.data);
		throw err.response.data.message;
	}
	throw err;
};
export default {
	service: service,

	getProducts() {
		return service.get('/products').then((res) => res.data).catch(errHandler);
	},
	addQuantity(id){
        return service.put('/products/' + id).then(res => res.data).catch(errHandler)
    }
};
