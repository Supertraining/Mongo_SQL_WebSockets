import ProductRepo from '../repo/productRepo.js';
import logger from '../logger/logger.js';

export default class ProductServices {
    constructor() {
        this.productsService = new ProductRepo()
    }
    async getAll() {
        try {

            const productos = await this.productsService.getAll();
            return productos;

        } catch (error) {
            logger.error(error);
        }
    }

    async save(product) {
        try {
            const productId = await this.productsService.save(product);
            return productId;
        } catch (error) {
            logger.error(error);
        }
    }

    async delete(id) {
        try {
            const deleted = await this.productsService.delete(id);
            return deleted
        } catch (error) {
            logger.error(error);
        }
    }

    async update(product) {
        try {
            const productToBeUpdated = await this.productsService.getById(product.id);

            const updatedProduct = await this.productsService.update({...productToBeUpdated[ 0 ],  ...product, id: productToBeUpdated[ 0 ].id });
            return updatedProduct;
        } catch (error) {
            logger.error(error);
        }
    }

    async getById(id) {
        try {
            const data = await this.productsService.getById(id);
            return data;
        } catch (error) {
            logger.error(error);
        }
    }
}