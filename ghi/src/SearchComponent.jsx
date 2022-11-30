import usePlacesAutocomplete, {
	getGeocode,
	getLatLng,
} from "use-places-autocomplete";

const SearchComponent = ({ getLocation }) => {
	const {
		ready,
		value,
		suggestions: { status, data },
		setValue,
		clearSuggestions,
	} = usePlacesAutocomplete({
		requestOptions: {
			/* Define search scope here */
		},
		debounce: 300,
	});

	const handleInput = (e) => {
		// Update the keyword of the input element
		setValue(e.target.value);
	};

	const handleSelect =
		({ description }) =>
		() => {
			// When user selects a place, we can replace the keyword without request data from API
			// by setting the second parameter to "false"
			setValue(description, false);
			clearSuggestions();

			// Get latitude and longitude via utility functions
			// getGeocode({ address: description }).then((results) => {
			// 	const { lat, lng } = getLatLng(results[0]);
			// 	console.log("📍 Coordinates: ", { lat, lng });
			// });
		};

	const renderSuggestions = () =>
		data.map((suggestion) => {
			const {
				place_id,
				structured_formatting: { main_text, secondary_text },
			} = suggestion;

			return (
				<li key={place_id} onClick={handleSelect(suggestion)}>
					<strong>{main_text}</strong> <small>{secondary_text}</small>
				</li>
			);
		});

	// const handleSubmit = async (event) => {
	// 	event.preventDefault();

	// 	const date_time = dateTime;
	// 	const technician = selectedTechnician;

	// 	const data = { vin, owner, date_time, technician, reason };

	// 	const concertsUrl = "http://localhost:8000/concerts/";
	// 	const fetchConfig = {
	// 		method: "post",
	// 		body: JSON.stringify(data),
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		},
	// 	};

	// 	const response = await fetch(appointmentUrl, fetchConfig);
	// 	if (response.ok) {
	// 		event.target.reset();
	// 		clearState();
	// 	}
	// };

	return (
		<div>
			{/* <form id="search-location" onSubmit={handleSubmit}> */}
			<input
				value={value}
				onChange={handleInput}
				disabled={!ready}
				placeholder="Where are you going?"
			/>
			{/* We can use the "status" to decide whether we should display the dropdown or not */}
			{status === "OK" && <ul>{renderSuggestions()}</ul>}
			<button onClick={() => getLocation(value)}>Click</button>
			{/* </form> */}
			<p>This is the {value}</p>
		</div>
	);
};

export default SearchComponent;
