import logger, {routeLogger} from "../logger/logger.js";
import { saveFakerProducts } from "../services/faker.js";


export const getFakerProducts = async (req, res,) => {
	try {
        let fproducts = await saveFakerProducts();
        console.log(fproducts);
		res.render('fakeProducts', { fproducts: fproducts });
		routeLogger(req, 'info')
	} catch (error) {
		logger.error(error)
	}
	
};