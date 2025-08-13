/**
 * Popup related functions for all GeoJSON files that need popups
 * 
 * Author: Jacob Kampf
 * Last edited: 8/11/2025
 */

function serviceOnEachFeature(feature, layer) {
    const { type, section } = feature.properties;

    const popupContent = 
    `
    <div class="p-2" style="min-width:200px;">
      <h5 class="mb-2 text-primary fw-bold">${type}</h5>
      <p class="mb-1"><strong>Section:</strong> ${section}</p>
    </div>
    `;

    layer.bindPopup(popupContent, {
        autoPan: true,
        autoPanPadding: L.point(80, 80)
    });
}

function retailOnEachFeature(feature, layer) {
    const { name, sells_fastlane, section } = feature.properties;

    const popupContent = 
    `
    <div class="p-2" style="min-width:200px;">
      <h5 class="mb-2 text-primary fw-bold">${name}</h5>
      <p class="mb-1"><strong>Sells Fastlane?:</strong> ${sells_fastlane}</p>
      <p class="mb-1"><strong>Section:</strong> ${section}</p>
    </div>
    `;

    layer.bindPopup(popupContent, {
        autoPan: true,
        autoPanPadding: L.point(80, 80)
    });    
}

function diningOnEachFeature(feature, layer) {
    const { name, section, dining_id, snack_plan, dining_plan, avg_wait_time } = feature.properties;

    const popupContent = `
    <div class="p-2" style="min-width:200px;">
      <h5 class="mb-2 text-primary fw-bold">${name}</h5>
      <p class="mb-1"><strong>Section:</strong> ${section}</p>
      <p class="mb-1"><strong>Accepts Snack Plans?:</strong> ${snack_plan}</p>
      <p class="mb-1"><strong>Accepts Dining Plans?:</strong> ${dining_plan}</p>
      <p class="mb-1"><strong>Average Wait Time:</strong>  ${avg_wait_time != null ? `${Math.round(avg_wait_time)} minutes` : 'No submitted values'}</p>
      <form class="update-wait-form" data-id="${dining_id}">
        <div class="mb-2">
          <label for="current_wait_${dining_id}" class="form-label mb-0"><strong>Submit a wait time</strong></label>
          <input type="number" 
                 class="form-control form-control-sm" 
                 id="current_wait_${dining_id}" 
                 name="current_wait" 
                 placeholder="minutes" 
                 min="0" />
        </div>
        <button type="submit" class="btn btn-sm btn-success w-100">Submit</button>
      </form>
    </div>
    `;

    layer.bindPopup(popupContent, {
        autoPan: true,
        autoPanPadding: L.point(80, 80)
    });

    // Handle form submission when popup opens
    layer.on('popupopen', () => {
        const form = document.querySelector(`.update-wait-form[data-id="${dining_id}"]`);

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const waitTime = formData.get('current_wait');

            if (!waitTime) {
                alert('Please enter a wait time.');
                return;
            }

            console.log(dining_id)
            console.log(waitTime)

            fetch(`https://geog777-proj2-backend.onrender.com/api/dining/wait_time`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ diningId: dining_id, waitTime: waitTime }),
            })
            .then(res => {
                console.log(res)
                if (!res.ok) throw new Error('Failed to update wait time.');
                return res.json();
            })
            .then(() => {
                layer.closePopup();
                loadDining(); // reload the dining layer from backend
            })
            .catch(err => {
                alert(err.message);
            });
        });
    });
}

function ridesOnEachFeature(feature, layer) {
    const { name, section, ride_id, uses_fastlane, ride_type, min_alone_height, min_accomp_height, avg_thrill_rating, avg_wait_time } = feature.properties;

    const popupContent = `
    <div class="p-2" style="min-width:200px;">
      <h5 class="mb-2 text-primary fw-bold">${name}</h5>
      <p class="mb-1"><strong>Section:</strong> ${section}</p>
      <p class="mb-1"><strong>Ride Type:</strong> ${ride_type}</p>
      <p class="mb-1"><strong>Uses Fastlane?:</strong> ${uses_fastlane}</p>
      <p class="mb-1"><strong>Minimum Height to Ride Alone:</strong> ${min_alone_height}''</p>
      <p class="mb-1"><strong>Minimum Height to Ride Accompanied:</strong> ${min_accomp_height}''</p>
      <p class="mb-1"><strong>Average Thrill Rating:</strong> 
        ${avg_thrill_rating != null ? `${avg_thrill_rating} / 5` : 'No submitted values'}
      </p>
      <p class="mb-1"><strong>Average Wait Time:</strong>  
        ${avg_wait_time != null ? `${Math.round(avg_wait_time)} minutes` : 'No submitted values'}
      </p>

      <!-- Thrill Rating Form -->
      <form class="update-thrill-form" data-id="${ride_id}">
        <div class="mb-2">
          <label for="thrill_rating_${ride_id}" class="form-label mb-0"><strong>Submit Thrill Rating</strong></label>
          <input type="number" 
                 class="form-control form-control-sm" 
                 id="thrill_rating_${ride_id}" 
                 name="thrill_rating" 
                 placeholder="1-5 - higher = more thrilling" 
                 min="1" max="5" />
        </div>
        <button type="submit" class="btn btn-sm btn-warning w-100">Submit Thrill Rating</button>
      </form>

      <!-- Wait Time Form -->
      <form class="update-wait-form" data-id="${ride_id}">
        <div class="mb-2 mt-3">
          <label for="wait_time_${ride_id}" class="form-label mb-0"><strong>Submit Wait Time</strong></label>
          <input type="number" 
                 class="form-control form-control-sm" 
                 id="wait_time_${ride_id}" 
                 name="wait_time" 
                 placeholder="minutes" 
                 min="0" />
        </div>
        <button type="submit" class="btn btn-sm btn-success w-100">Submit Wait Time</button>
      </form>
    </div>
    `;

    layer.bindPopup(popupContent, {
        autoPan: true,
        autoPanPadding: L.point(80, 80)
    });

    // Handle form submissions when popup opens
    layer.on('popupopen', () => {
        // Thrill Rating form
        const thrillForm = document.querySelector(`.update-thrill-form[data-id="${ride_id}"]`);
        thrillForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(thrillForm);
            const thrillRating = formData.get('thrill_rating');

            if (!thrillRating) {
                alert('Please enter a thrill rating.');
                return;
            }

            fetch(`https://geog777-proj2-backend.onrender.com/api/rides/thrill_rating`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ rideId: ride_id, thrillRating: thrillRating }),
            })
            .then(res => {
                if (!res.ok) throw new Error('Failed to update thrill rating.');
                return res.json();
            })
            .then(() => {
                layer.closePopup();
                loadRides(); // reload rides layer
            })
            .catch(err => {
                alert(err.message);
            });
        });

        // Wait Time form
        const waitForm = document.querySelector(`.update-wait-form[data-id="${ride_id}"]`);
        waitForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(waitForm);
            const waitTime = formData.get('wait_time');

            if (!waitTime) {
                alert('Please enter a wait time.');
                return;
            }

            fetch(`https://geog777-proj2-backend.onrender.com/api/rides/wait_time`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ rideId: ride_id, waitTime: waitTime }),
            })
            .then(res => {
                if (!res.ok) throw new Error('Failed to update wait time.');
                return res.json();
            })
            .then(() => {
                layer.closePopup();
                loadRides(); // reload rides layer
            })
            .catch(err => {
                alert(err.message);
            });
        });
    });
}
