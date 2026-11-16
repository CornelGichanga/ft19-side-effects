import { useEffect, useState } from 'react';
import UserForm from './components/user/user-form';
import { BASE_URL } from './lib/utils';

function App() {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const controller = new AbortController();

		fetch(`${BASE_URL}/users`, {
			signal: controller.signal,
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error('Fetching users failed');
				}

				return response.json();
			})
			.then((data) => setUsers(data))
			.catch((error) => console.error(error));

		// cleanup
		return () => controller.abort();
	}, []);

	return (
		<div className="h-screen p-5">
			<div className="grid grid-cols-5 gap-5">
				<div className="col-span-2">
					<UserForm />
				</div>
				<div className="col-span-3">
					<h1 className="text-5xl font-barlow font-bold">Users</h1>

					<div className="">{JSON.stringify(users)}</div>
				</div>
			</div>
		</div>
	);
}

export default App;
