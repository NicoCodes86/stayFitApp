import { useState, useEffect, useMemo } from 'react';
import stayFitDataService from '../services/stayFitDataService';
import ResponsiveAppBar from '../components/Navbar';
import {
	Stack,
	ImageList,
	ImageListItem,
	Card,
	Container,
} from '@mui/material';

const ExerciseList = () => {
	const [exercises, setExercises] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState();
	const [selectedExerciseID, setSelectedExerciseID] = useState();

	useEffect(() => {
		retrieveExercises();
	}, []);

	const retrieveExercises = async () => {
		await stayFitDataService
			.getAll()
			.then((response) => {
				console.log(response.data);
				setExercises(response.data);
			})
			.catch((e) => {
				console.log('error is: ');
				console.log(e);
			});
	};

	function handleCategoryChange(event) {
		setSelectedCategory(event.target.value);
	}

	function handleExerciseLink(event) {
		setSelectedExerciseID(event.target.id);
		console.log(selectedExerciseID);
	}

	function getFilteredList() {
		if (!selectedCategory) {
			return exercises;
		}
		return exercises.filter((item) => item.category === selectedCategory);
	}

	var filteredList = useMemo(getFilteredList, [selectedCategory, exercises]);
	console.log(filteredList);

	var exerciseLink = `/saveExercise/${selectedExerciseID}`;

	return (
		<>
			<ResponsiveAppBar />
			<div className="filter-container">
				<div style={{ marginTop: '8px', marginLeft: '5px', color: 'dimGray' }}>
					Filter by Category:
				</div>
				<div>
					<select
						style={{ marginTop: '5px', marginLeft: '5px' }}
						name="category-list"
						id="category-list"
						onChange={handleCategoryChange}
					>
						<option value="">All Workouts</option>
						<option value="FBW">Full Body Workout</option>
						<option value="COR">Core Exercises</option>
						<option value="AFE">Ankle and Foot Exercises</option>
						<option value="CRV">Cervical (Neck) Exercises</option>
						<option value="AWE">Arm and Wrist Workouts</option>
						<option value="HKE">Hip and Knee Exercises</option>
						<option value="SHD">Shoulder Exercises</option>
						<option value="BRE">Breathing Exercises</option>
					</select>
				</div>
			</div>
			<h1 style={{ textAlign: 'center', color: '#0B4C8A' }}>Exercises:</h1>
			<Container className="container" sx={{ mx: 'auto', textAlign: 'center' }}>
				<Stack spacing={8}>
					<ImageList
						variant="standard"
						sx={{
							mx: 'auto',
							width: '90%',
							height: '100%',
						}}
						cols={3}
					>
						{!selectedCategory &&
							exercises &&
							exercises.map((exercise) => (
								<>
									<Card key={exercise._id}>
										<h5>{exercise.name}</h5>
										<ImageListItem key={exercise.index}>
											<a href={exerciseLink}>
												<img
													onMouseOver={handleExerciseLink}
													id={exercise._id}
													src={`${exercise.imageUrl}?w=164&h=164&fit=crop&auto=format&dpr=2`}
													alt={exercise.imageUrl}
													loading="lazy"
												/>
											</a>
										</ImageListItem>
									</Card>
								</>
							))}
						{selectedCategory &&
							filteredList.map((exercise) => (
								<>
									<Card key={exercise._id}>
										<h5>{exercise.name}</h5>
										<ImageListItem key={exercise.index}>
											<a href={exerciseLink}>
												<img
                          onMouseOver={handleExerciseLink}
													id={exercise._id}
													src={`${exercise.imageUrl}?w=164&h=164&fit=crop&auto=format&dpr=2`}
													alt={exercise.imageUrl}
													loading="lazy"
												/>
											</a>
										</ImageListItem>
									</Card>
								</>
							))}
					</ImageList>
				</Stack>
			</Container>
		</>
	);
};
export default ExerciseList;
