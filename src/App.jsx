import { useEffect, useState } from 'react';
import UserForm from './components/user/user-form';
import { BASE_URL } from './lib/utils';
import UserCard from './components/user/user-card';

function App() {
	const [users, setUsers] = useState([]);

	function fetchAllUsers() {
		fetch(`${BASE_URL}/users`)
			.then((response) => {
				if (!response.ok) {
					throw new Error('Fetching users failed');
				}

				return response.json();
			})
			.then((data) => setUsers(data))
			.catch((error) => console.error(error));
	}

	useEffect(() => {
		fetchAllUsers();
	}, []);

	return (
		<div className="h-screen p-5">
			<div className="grid grid-cols-5 gap-5">
				<div className="col-span-2">
					<UserForm onUserAdded={fetchAllUsers} />
				</div>
				<div className="col-span-3 flex flex-col gap-5">
					<h1 className="text-4xl font-barlow font-bold">
						All Users
					</h1>

					<div className="grid grid-cols-3 gap-5">
						{users.map((user) => (
							<UserCard key={user.id} {...user} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
