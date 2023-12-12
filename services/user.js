import logger from '../logger/logger.js';
import bcrypt from 'bcrypt';


export default class UserService {

    constructor(UsersDAO) {
        
        this.userDAO = UsersDAO;
    }

     async save(data)  {
         try {
           
             const usuario = { username: data.username, password: bcrypt.hashSync(data.password, bcrypt.genSaltSync(10), null) };
                
             let newUser = await this.userDAO.save(usuario)
              
            return newUser;

        } catch (error) {
            logger.error(error)
        }
    }

    async getAll() {
        let data = null;
        try {
            data = await this.userDAO.getAll()
            return data;
        } catch (error) {
            logger.error(error)
            return data = [];
        }
    }
    async getById(id) {
        let data = null;
        try {
            data = await this.userDAO.getById(id);
            return data;
        } catch (err) {
            logger.error(err)
        }
    }
    async delete(id) {
        try {
            let deleted = await this.userDAO.delete(id);
            return deleted;
        } catch {
            logger.error(err)
        }
    }
    async update(obj) {
        try {
            let updated = await this.userDAO.update(obj);
            return updated;
        } catch {
            logger.error(err)
        }
    }

    authHash = async (username, password) => {
        try {
            const data = await this.getById(username);
            const auth = await bcrypt.compare(password, data.password);
            return auth;
        } catch (err) {
            logger.error(err)
        }
    }
}
