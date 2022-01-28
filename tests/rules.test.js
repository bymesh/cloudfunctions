const { setup, teardown, adminSetup } = require('./helper');
const { assertFails, assertSucceeds } = require('@firebase/testing');

const bob = {
	uid: 'bob',
	username: 'bobstavitel',
	displayName: 'Bob Smith',
	photoURl: '/profile_picture',
	email: 'bob@gmail.com'
};

const alice = {
	uid: 'alice',
	username: 'alice',
	displayName: 'Alice Lovejoy'
};

describe('Store user data', () => {
	let db, admin;

	beforeAll(async () => {
		db = await setup(bob);
		admin = await adminSetup();
	});

	afterAll(async () => {
		await teardown();
	});

	test('Allow storing user data after registration', async () => {
		const batch = db.batch();

		batch.set(db.collection('usernames').doc(bob.username), { uid: bob.uid });

		batch.set(db.collection('users').doc(bob.uid), {
			uid: bob.uid,
			displayName: bob.displayName,
			photoURl: bob.photoURl,
			username: bob.username,
		});

		expect(await assertSucceeds(batch.commit()));
	});
});
