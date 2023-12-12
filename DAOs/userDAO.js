import logger from '../logger/logger.js';
import usuarioDTO from '../DTOs/usuarioDTO.js';
import * as config from '../config/config.js';
import { dbConnection } from '../utils/mongoDbConnection.js';


let instance = null;

class UsersDAO {
	constructor(model) {

		this.model = model

		if (!instance) {
			instance = this;
			logger.info('Se ha Creado una nueva instancia de UsersDAO');
			dbConnection(config.mongoURL);
		}
		logger.info('Se ha utilizado una instancia ya creada de UsersDAO');
		return instance;
	}
	async save(data) {
		try {
			
			const dataDb = await this.model.insertMany(data);

			return usuarioDTO(dataDb)

		} catch (err) {
			logger.error(err)
		}
	}

	async getAll() {
		let data = null;
		try {
			data = await this.model.find({}, { _id: 0, __v: 0 });
			return usuarioDTO(data)

		} catch (err) {
			logger.error(err)
			return data = [];
		}
	}

	async getById(id) {
		let data = null;
		try {
			data = await this.model.find({ username: id });
			return usuarioDTO(data)
		} catch (err) {
			logger.error(err)
		}
	}

	async delete(id) {
		try {
			const deleted = await this.model.deleteOne(id);
			return usuarioDTO(deleted)
		} catch {
			logger.error(err)
		}
	}

	async update(obj) {
		try {
			const updated = await this.model.updateOne(obj);
			return usuarioDTO(updated)
		} catch {
			logger.error(err)
		}
	}
}

export default UsersDAO;
