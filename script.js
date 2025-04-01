document.addEventListener('DOMContentLoaded', function () {
    // Bus name for URL query (use this to get bus name if needed)
    const urlParams = new URLSearchParams(window.location.search);
    const busName = urlParams.get('bus') || 'Bus-1';  // Default to Bus-1 if no bus is selected

    // Set bus name in title
    document.title = `${busName} - Smart Bus Control`;

    // Initialize the map for the selected bus
    const busLocation = {
        'Bus-1': { lat: 11.0301, lng: 77.0782 },
        'Bus-2': { lat: 11.0500, lng: 77.0800 },
        'Bus-3': { lat: 11.0600, lng: 77.0900 }
    };

    const location = busLocation[busName];

    // Initialize the map
    const map = L.map('map').setView([location.lat, location.lng], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    const marker = L.marker([location.lat, location.lng]).addTo(map);
    marker.bindPopup(`${busName} Location`).openPopup();

    // Mock seat availability (can be dynamic in real case)
    const seatAvailability = {
        'Bus-1': ['Vacant', 'Occupied', 'Vacant', 'Occupied', 'Vacant', 'Vacant', 'Occupied', 'Vacant'],
        'Bus-2': ['Occupied', 'Occupied', 'Vacant', 'Vacant', 'Occupied', 'Vacant', 'Vacant', 'Occupied'],
        'Bus-3': ['Vacant', 'Vacant', 'Vacant', 'Occupied', 'Vacant', 'Occupied', 'Vacant', 'Vacant']
    };

    // Generate seat layout
    const seats = seatAvailability[busName];
    let seatLayoutHtml = '';
    seats.forEach((status, index) => {
        const seatClass = status === 'Vacant' ? 'vacant' : 'occupied';
        seatLayoutHtml += `
            <div class="seat ${seatClass}" data-seat="Seat ${index + 1}">
                ${index + 1}
            </div>
        `;
    });

    document.getElementById('seat-container').innerHTML = seatLayoutHtml;
});
