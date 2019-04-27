const key = '_dynrulimuUYx6OQisbUKrVxSUummTQsJW1FOE1CjEJvJbPWUNQjWCQw2WRImQX1pcKfuxq5YFna93P9OS8tlSZGF5wCxCZoI63D9crhUVk3e_l8fkGhhuyWZ1r2WXYx';

const Yelp = {
	// Previous code to get access token before fetching results. Not needed anymore due to Yelp API changes //
	// Saved for reference //
	/*getAccessToken() {
		if (accessToken) {
			return new Promise(resolve => resolve(accessToken));
		}
		// Need to request a new access token
		return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/oauth2/token?grant_type=client_credentials&client_id=${clientId}&client_secret=${secret}`, {
			method: 'POST'
		}).then(response => {
			if (response.ok) {
				return response.json();
			}
		}).then(jsonResponse => {
			accessToken = jsonResponse.access_token;
		});
	},
*/
	search(term, location, sortBy) {
		return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, {
			headers: {
				Authorization: `Bearer ${key}`
			}
		}).then(response => {
			return response.json()
		}).then(jsonResponse => {
			if (jsonResponse.businesses) {
				return jsonResponse.businesses.map(business => {
					return {
						id: business.id,
						imageSrc: business.image_url,
						name: business.name,
						address: business.location.address1,
						city: business.location.city,
						state: business.location.state,
						zipCode: business.location.zip_code,
						category: business.categories[0].title,
						rating: business.rating,
						reviewCount: business.review_count
					};
				});
			}
		});
	}
};

export default Yelp;
