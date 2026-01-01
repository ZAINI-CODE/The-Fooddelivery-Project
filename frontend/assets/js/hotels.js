// Hotels page: very simple demo, no backend dependency yet

const hotelsListEl = document.getElementById('hotels-list');
const hotelsSearchEl = document.getElementById('hotels-search');
const toastElH = document.getElementById('toast');

let hotels = [
  {
    id: 1,
    name: 'Serena Hotel Islamabad',
    city: 'Islamabad',
    rating: 4.7,
    priceFrom: 18000,
    image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg'
  },
  {
    id: 2,
    name: 'Pearl Continental Lahore',
    city: 'Lahore',
    rating: 4.5,
    priceFrom: 15000,
    image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg'
  },
  {
    id: 3,
    name: 'Mövenpick Hotel Karachi',
    city: 'Karachi',
    rating: 4.4,
    priceFrom: 16000,
    image: 'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg'
  }
];

let toastTimeoutIdH = null;

function showToastH(msg) {
  if (!toastElH) return;
  toastElH.textContent = msg;
  toastElH.classList.add('show');

  if (toastTimeoutIdH) clearTimeout(toastTimeoutIdH);
  toastTimeoutIdH = setTimeout(() => {
    toastElH.classList.remove('show');
  }, 2000);
}

function createHotelCard(h) {
  const card = document.createElement('div');
  card.className = 'card hotel-card';

  const img = document.createElement('div');
  img.className = 'card-image';
  img.style.backgroundImage = `url(${h.image})`;
  img.style.backgroundSize = 'cover';
  img.style.backgroundPosition = 'center';

  const body = document.createElement('div');
  body.className = 'card-body';

  const title = document.createElement('div');
  title.className = 'card-title';
  title.textContent = h.name;

  const subtitle = document.createElement('div');
  subtitle.className = 'card-subtitle';
  subtitle.textContent = h.city;

  const meta = document.createElement('div');
  meta.className = 'card-meta';
  meta.textContent = `From Rs. ${h.priceFrom} • ★ ${h.rating.toFixed(1)}`;

  body.appendChild(title);
  body.appendChild(subtitle);
  body.appendChild(meta);

  card.appendChild(img);
  card.appendChild(body);

  card.addEventListener('click', () => {
    showToastH(`Hotel details for ${h.name} (demo only)`);
  });

  return card;
}

function renderHotels(list) {
  hotelsListEl.innerHTML = '';

  if (!list.length) {
    const p = document.createElement('p');
    p.className = 'muted';
    p.textContent = 'No hotels matched your search.';
    hotelsListEl.appendChild(p);
    return;
  }

  list.forEach((h) => hotelsListEl.appendChild(createHotelCard(h)));
}

function applyHotelsFilter() {
  const term = hotelsSearchEl.value.trim().toLowerCase();
  let filtered = hotels;

  if (term) {
    filtered = filtered.filter(
      (h) =>
        h.name.toLowerCase().includes(term) ||
        h.city.toLowerCase().includes(term)
    );
  }

  renderHotels(filtered);
}

document.addEventListener('DOMContentLoaded', () => {
  renderHotels(hotels);
  if (hotelsSearchEl) {
    hotelsSearchEl.addEventListener('input', applyHotelsFilter);
  }
});