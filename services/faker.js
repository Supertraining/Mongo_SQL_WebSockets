import logger from '../logger/logger.js';
import MemoryContainer from "../DAOs/memoryContainer.js"
const memoryContainer = new MemoryContainer();

export const saveFakerProducts = async () => {
    try {
        return await memoryContainer.fakerProducts()
    } catch (error) {
        logger.error(error)
    }
}