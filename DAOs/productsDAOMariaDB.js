import knex from 'knex';
import { faker } from '@faker-js/faker';
faker.locale = 'es';
import { productoDTO } from '../DTOs/productoDTO.js';
import logger from '../logger/logger.js';

let instance = null;

export default class ProductsDAOMariaDB {
  constructor(options, tabla) {
    this.knex = knex(options);
    this.tabla = tabla;
    logger.info('Database MariaDB connected');
  }

  async save(product) {
    try {
      console.log(product);
      const productId = await this.knex(`${this.tabla}`).insert(product);
      return productId[0];
    } catch (err) {
      logger.error(err);
    }
  }

  async getAll() {
    try {
      let data = await this.knex(`${this.tabla}`).select('*');
      console.log(data);
      return productoDTO(data);
    } catch (err) {
      logger.error(err);
    }
  }
  async getById(id) {
    try {
      let data = await this.knex(`${this.tabla}`).select('*').where('id', '=', id);
      return productoDTO(data);
    } catch (err) {
      logger.error(err);
    }
  }

  async delete(id) {
    try {
      const deleted = await this.knex(`${this.tabla}`).where('id', '=', id).del();
      return deleted;
    } catch (err) {
      logger.error(err);
    }
  }

  async update(obj) {
    try {
      const response = await this.knex(`${this.tabla}`)
        .where('id', '=', obj.id)
        .update({ nombre: obj.nombre, precio: obj.precio, imagen: obj.imagen });
      const updated = await this.getById(obj.id);
      return productoDTO(updated);
    } catch (err) {
      logger.error(err);
    }
  }

  static getInstance(options, tabla) {
    if (!instance) {
      instance = new ProductsDAOMariaDB(options, tabla);
      logger.info('Se ha creado una instancia de ProductsDAOMariaDB');
    }
    logger.info('Se ha utilizado una instancia ya creada de ProductsDAOMariaDB');
    return instance;
  }
}
