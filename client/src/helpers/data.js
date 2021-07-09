import { dbSecure } from 'whirled-react/util/db';

const { REACT_APP_SERVER_ROOT } = process.env;

export const requestConfig = async ({ setData, setMessage }) => {
	try {
		const res = await dbSecure.get(`${REACT_APP_SERVER_ROOT}/git/info`);
		setData(res);
	}
	catch (ex) {
		console.error(ex);
		setMessage({ severity: 0, message: "Whoops. Your config.js file might not be setup." });
	}
};

export const requestStatus = async ({params, setData, setMessage }) => {
	try {
		const res = await dbSecure.get(`${REACT_APP_SERVER_ROOT}/git/info`);
		setData(res);
	}
	catch (ex) {
		console.error(ex);
		setMessage({ severity: 0, message: "Whoops. Your config.js file might not be setup." });
	}
};