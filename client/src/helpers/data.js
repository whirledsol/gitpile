import { dbSecure } from 'whirled-react/util/db';

const { REACT_APP_SERVER_ROOT } = process.env;

export const requestConfig = async ({ setMessage }) => {
	try {
		return await dbSecure.get(`${REACT_APP_SERVER_ROOT}/getConfig`);
	}
	catch (ex) {
		console.error(ex);
		setMessage({ feels: 0, message: "Whoops. Your config.js file might not be setup." });
	}
};

export const requestStatus = async ({params, setMessage }) => {
	const {projectKey,repoKey} = params;
	try {
		
		return await dbSecure.get(`${REACT_APP_SERVER_ROOT}/git/status/${projectKey}/${repoKey}`);
	}
	catch (ex) {
		console.error(ex);
		setMessage({ feels: 3, message: `Could not obtain the status of ${repoKey}` });
	}
};

export const requestLogs = async ({params, setMessage }) => {
	const {projectKey,repoKey} = params;
	try {
		
		return await dbSecure.get(`${REACT_APP_SERVER_ROOT}/git/log/${projectKey}/${repoKey}`);
	}
	catch (ex) {
		console.error(ex);
		setMessage({ feels: 3, message: `Could not obtain the log of ${repoKey}` });
	}
};