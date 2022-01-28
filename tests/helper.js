const {
	loadFirestoreRules,
	initializeTestApp,
	initializeAdminApp,
	clearFirestoreData
} = require('@firebase/testing');
const { readFileSync } = require('fs');

const projectId = 'mesh-dev-55129';

module.exports.setup = async (auth) => {
	const app = initializeTestApp({
		projectId,
		auth
	});
	await loadFirestoreRules({
		projectId: projectId,
		rules: readFileSync('firestore.rules', 'utf-8')
	});

	return app.firestore();
};

module.exports.adminSetup = async () => {
	const admin = initializeAdminApp({
		projectId
	});

	return admin.firestore();
};

module.exports.teardown = async () => {
	await clearFirestoreData({ projectId: projectId });
};
