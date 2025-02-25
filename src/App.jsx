import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

const URL = 'http://127.0.0.1:8000';
function App() {
	const [item, setItem] = useState('');
	const [searchText, setSearchText] = useState('');
	const [users, setUsers] = useState({});

	const handleChange = (e) => {
		const value = e.target.value;
		console.log(e.target.value);
		setSearchText(value);
	};

	const fetchData = async (url) => {
		try {
			const res = await fetch(url);
			const data = await res.json();

			console.log('Data', data?.data);
			return data?.data;
			// setItem('users');
			// setUsers(data?.data);
		} catch (error) {
			console.log('Error', error);
		}
	};
	const getUser = async () => {
		try {
			const data = await fetchData(`${URL}/api/v1/github/search-users?query=${searchText}`);
			console.log('Data', data);

			setItem('users');
			setUsers(data);
		} catch (error) {
			console.log('Error', error);
		}
	};

	const getIssues = async () => {
		try {
			const data = await fetchData(`${URL}/api/v1/github/search-issues?query=${searchText}`);
			console.log('Data', data);

			setItem('issues');
			setUsers(data);
		} catch (error) {
			console.log('Error', error);
		}
	};

	const getRepos = async () => {
		try {
			const data = await fetchData(`${URL}/api/v1/github/search-repos?query=${searchText}`);
			console.log('Data', data);

			setItem('repos');
			setUsers(data);
		} catch (error) {
			console.log('Error', error);
		}
	};

	console.log('Users', window.location.href);
	return (
		<>
			<div className='w-[90%] flex flex-col gap-4 items-center'>
				<h2 className='text-3xl font-bold mb-1'>Github Repository Project</h2>
				<input
					type='text'
					value={searchText}
					onChange={handleChange}
					placeholder='Enter the Username'
					className='border px-4 py-3 border-gray-600 focus:border-none rounded-sm w-full'
				/>
				<div className='flex justify-start items-center gap-1 w-full '>
					<button
						className='py-3 rounded-sm px-4 bg-teal-600 font-bold text-white w-1/3'
						type='button'
						onClick={getUser}
					>
						Search User
					</button>
					<button
						className='py-3 rounded-sm px-4 bg-teal-600 font-bold text-white w-1/3'
						type='button'
						onClick={getRepos}
					>
						Search Repositories
					</button>
					<button
						className='py-3 rounded-sm px-4 bg-teal-600 font-bold text-white w-1/3'
						type='button'
						onClick={getIssues}
					>
						Search Issues
					</button>
				</div>
				{/* Display the results  */}
				{Object.keys(users).length > 0 ? (
					<div className='mt-1 w-full flex flex-col items-start justify-start'>
						<p className='text-xl leading-10'>
							The total no of {item} available are: <span className='font-bold'>{users.total_count}</span>
						</p>
						<p className='text-xl leading-10'>
							The total time taken to fetch the results is:{' '}
							<span className='font-bold'>{users?.seconds} seconds</span>
						</p>
						<p className='text-xl leading-10'>
							The source of the result is: <span className='font-bold'>{users.source}</span>
						</p>
					</div>
				) : (
					<></>
				)}
			</div>
		</>
	);
}

export default App;
