import mongoose from 'mongoose';

const mensajesCollection = 'mensajes';

const mensajeSchema = new mongoose.Schema({
	author: {
		id: { type: String, require: true, max: 150 },
		alias: { type: String, require: true, max: 100 },
	},
	text: { type: String, require: true, max: 140 },
	id: { type: Number, require: true },
});
export const model = mongoose.model(mensajesCollection, mensajeSchema);
