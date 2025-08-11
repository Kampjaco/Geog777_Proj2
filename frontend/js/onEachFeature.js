/**
 * Popup related functions for all GeoJSON files that need popups
 * 
 * Author: Jacob Kampf
 * Last edited: 8/11/2025
 */

function diningOnEachFeature(feature, layer) {
    const { name, section, dining_id, snack_plan, dining_plan, avg_wait_time } = feature.properties;

    const popupContent = `
    <div class="p-2" style="min-width:200px;">
      <h5 class="mb-2 text-primary fw-bold">${name}</h5>
      <p class="mb-1"><strong>Section:</strong> ${section}</p>
      <p class="mb-1"><strong>Accepts Snack Plans?:</strong> ${snack_plan}</p>
      <p class="mb-1"><strong>Accepts Dining Plans?:</strong> ${dining_plan}</p>
      <p class="mb-1"><strong>Average Wait Time:</strong> ${avg_wait_time ?? 'No submitted values'}</p>
      <form class="update-wait-form" data-id="${dining_id}">
        <div class="mb-2">
          <label for="current_wait_${dining_id}" class="form-label mb-0"><strong>Current Wait Time</strong></label>
          <input type="number" 
                 class="form-control form-control-sm" 
                 id="current_wait_${dining_id}" 
                 name="current_wait" 
                 placeholder="minutes" 
                 min="0" />
        </div>
        <button type="submit" class="btn btn-sm btn-success w-100">Submit wait time</button>
      </form>
    </div>
    `;

  layer.bindPopup(popupContent)
}