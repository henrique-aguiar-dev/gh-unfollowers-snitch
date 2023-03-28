import React, { useState, useEffect, useRef } from 'react';
import {
	Routes,
	Route,
	Link,
	useNavigate,
} from "react-router-dom";

import getFollowersData from '../../services/GetFollowers';
import List from '../List/List';
import Loading from '../loading/Loading';

import './Result.css';

const Result = () => {
	const [errors, setErrors] = useState([]);
	const inputText = useRef(null);
	const [followers, setFollowers] = useState([]);
	const [following, setFollowing] = useState([]);
	const [mutualFollowers, setMutualFollowers] = useState([]);
	const [dontFollow, setDontFollow] = useState([]);
	const [dataLoaded, setDataLoaded] = useState(false);
	const [userName, setUserName] = useState(null);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	
	useEffect(() => {
		

		const getData = async () => {
			setLoading(true);

			const response = await getFollowersData(userName);
	
			if (!response) {
				setErrors(errors => [...errors, "User doesn't exist!"]);
				setLoading(false);
			} else {
				setFollowers(response.followers);
				setFollowing(response.following);
				setMutualFollowers(response.mutualFollowers);
				setDontFollow(response.dontFollowYou);
				setLoading(false);
				setDataLoaded(true);
			}

			inputText.current.value = '';
		}

		if (userName && !dataLoaded) getData();
	}, [userName, dataLoaded, navigate]);
	
	useEffect(() => {
		if (!userName) navigate('../', { replace: true });
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const handleFormSubmit = (() => {
		const errArr = []
		const formValue = inputText.current.value;
		setErrors([])

		if (!formValue || formValue === "") errArr.push("You didn't type anything...");
		if (typeof formValue !== "string") errArr.push('Invalid search terms!');
		if (errArr.length > 0) return setErrors([...errArr]);

		setDataLoaded(false);
		setUserName(formValue);
	})

	return (
		<div className="result-parent">
			<label htmlFor="user-name">Your Github username*:</label>
			<input ref={inputText} className="user-name" type="text" required />
			<button id="enviar" onClick={handleFormSubmit}>Go...</button>
			<p className="warning">*Login name. Case sensitive.</p>

			<div className="show-result">
				{errors.length > 0 &&
					errors.map((erro, index) => <h2 className="error-msg" key={index}>{erro}</h2>)}

				{(dataLoaded && errors.length === 0) && (
					<>
						<h2>Results for: "{userName}"</h2>
						<div className="counters">
							<Link to="/following">Following: <span>{following.length}</span></Link>
							<Link to="/followers">Followers: <span>{followers.length}</span></Link>
							<Link to="/mutual">Mutual: <span>{mutualFollowers.length}</span></Link>
							<Link to="/dontfollow">Don't follow: <span>{dontFollow.length}</span></Link>
						</div>
					</>
				)}

				{loading && (
					<Loading />
				)}

				{(dataLoaded && errors.length === 0) ? (
					<div className="list-container">
						<Routes>
							<Route
								path="/dontfollow"
								element={
									<>
										<h3>Don't follow back:</h3>
										<List data={dontFollow} />
									</>
								}
							></Route>
							<Route
								path="/following"
								element={
									<>
										<h3>Following:</h3>
										<List data={following} />
									</>
								}
							></Route>
							<Route
								path="/followers"
								element={
									<>
										<h3>Followers:</h3>
										<List data={followers} />
									</>
								}
							></Route>
							<Route
								path="/mutual"
								element={
									<>
										<h3>Mutual followers:</h3>
										<List data={mutualFollowers} />
									</>
								}
							></Route>
							<Route
								path="/"
								element={
									<>
										<h3>Don't follow back:</h3>
										<List data={dontFollow} />
									</>
								}></Route>
						</Routes>
					</div>
				) : (<p>There are no results to display yet!</p>)}
			</div>
		</div>
	);
}

export default Result;