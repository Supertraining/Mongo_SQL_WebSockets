import mongoStore from 'connect-mongo';
import dotenv from 'dotenv';
dotenv.config({ path: './config/.env' });
import parseArgs from 'minimist';
import os from 'os';

export const numCPUs = os.cpus().length;

const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

export const sessionConfig = {
	store: mongoStore.create({
		mongoUrl: process.env.MONGODB_URL,
		mongoOptions: advancedOptions,
		collectionName: 'sessions',
		ttl: 600,
	}),
	secret: process.env.SECRET,
	resave: false,
	saveUninitialized: false,
}

export const mongoURL = process.env.MONGODB_URL;

export const options = {
	client: 'mysql',
	connection: {
		host: process.env.SQL_HOST,
		user: process.env.SQL_USERNAME,
		password: process.env.SQL_PASSWORD,
		database: process.env.SQL_DATABASE,
	},
};

export const minimistConfig = {
	default: {
		puerto: process.env.PORT,
		modo: process.env.MODE,
	},
};
export const { puerto, modo } = parseArgs(process.argv.slice(2), minimistConfig);


