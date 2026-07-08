
setInterval(() => {
    const now = new Date();
    const clockEl = document.getElementById('live-system-clock');
    if(clockEl) clockEl.innerText = now.toLocaleTimeString('en-US', { hour12: false });
}, 1000);


let dashTotalRevenue = 84000;
let REGISTERED_USERS_DATABASE = [];
let currentUser = null;
let theaterHallsDatabase = {}; 
let activeSelectedMovieContext = null;
let cartArray = [];
let completedLedger = [];


let GLOBAL_CINEMA_CATALOGUE = [
    { id: 1, title: "Alice in Borderland", genre: "Sci-Fi / Thriller", status: "Pre-Booking", price: 20.0, rating: "8.5/10", times: ["12:00", "15:30", "20:00"] },
    { id: 2, title: "Back to the Future", genre: "Sci-Fi / Adventure", status: "Pre-Booking", price: 18.0, rating: "8.5/10", times: ["13:00", "17:00", "21:30"] },
    { id: 3, title: "Colony", genre: "Sci-Fi", status: "Pre-Booking", price: 19.0, rating: "7.4/10", times: ["14:00", "18:00", "22:00"] },
    { id: 4, title: "Conjuring", genre: "Horror", status: "Pre-Booking", price: 21.0, rating: "7.5/10", times: ["15:00", "19:30", "23:45"] },
    { id: 5, title: "Deadpool", genre: "Action / Comedy", status: "On Air Now", price: 22.0, rating: "8.0/10", times: ["12:30", "16:45", "20:15"] },
    { id: 6, title: "Dune", genre: "Epic Sci-Fi", status: "On Air Now", price: 26.0, rating: "8.0/10", times: ["11:00", "14:45", "19:00"] },
    { id: 7, title: "E.T.", genre: "Family / Sci-Fi", status: "Pre-Booking", price: 16.0, rating: "7.8/10", times: ["10:30", "13:45"] },
    { id: 8, title: "Fantastic Beasts: Secrets of Dumbledore", genre: "Fantasy", status: "Pre-Booking", price: 20.0, rating: "6.2/10", times: ["13:15", "18:30"] },
    { id: 9, title: "Harry Potter: Prisoner of Azkaban", genre: "Fantasy", status: "Pre-Booking", price: 20.0, rating: "7.9/10", times: ["19:00"] },
    { id: 10, title: "Hobbit", genre: "Fantasy / Adventure", status: "Pre-Booking", price: 22.0, rating: "7.8/10", times: ["20:30"] },
    { id: 11, title: "Howl's Moving Castle", genre: "Anime / Fantasy", status: "Pre-Booking", price: 18.0, rating: "8.2/10", times: ["18:00"] },
    { id: 12, title: "Interstellar (IMAX Recut)", genre: "Epic Sci-Fi", status: "On Air Now", price: 22.0, rating: "8.6/10", times: ["21:00"] }, 
    { id: 13, title: "Joker", genre: "Drama / Thriller", status: "Coming Soon", price: 21.0, rating: "8.4/10", times: [] },
    { id: 14, title: "Maleficent", genre: "Fantasy", status: "Coming Soon", price: 19.0, rating: "7.0/10", times: [] },
    { id: 15, title: "Mario", genre: "Animation", status: "Coming Soon", price: 18.0, rating: "7.1/10", times: [] },
    { id: 16, title: "Maze Runner", genre: "Action / Sci-Fi", status: "Coming Soon", price: 19.0, rating: "6.8/10", times: [] },
    { id: 17, title: "Pirates of the Caribbean", genre: "Action / Adventure", status: "Coming Soon", price: 20.0, rating: "8.0/10", times: [] },
    { id: 18, title: "Spiderman Brand New Day", genre: "Action / Superhero", status: "Coming Soon", price: 24.0, rating: "New", times: [] },
    { id: 19, title: "Spirited Away", genre: "Anime / Fantasy", status: "Pre-Booking", price: 18.0, rating: "8.6/10", times: ["11:30", "16:00"] },
    { id: 20, title: "Tangled", genre: "Animation / Family", status: "Pre-Booking", price: 17.0, rating: "7.7/10", times: ["10:00", "14:15"] },
    { id: 21, title: "The Greatest Showman", genre: "Musical / Drama", status: "Pre-Booking", price: 19.0, rating: "7.6/10", times: ["15:45", "19:15"] },
    { id: 22, title: "Toy Story", genre: "Animation / Family", status: "Pre-Booking", price: 16.0, rating: "8.3/10", times: ["11:00", "13:30"] },
    { id: 23, title: "Up", genre: "Animation / Family", status: "Pre-Booking", price: 17.0, rating: "8.2/10", times: ["12:45", "17:30"] },
    { id: 24, title: "Avatar", genre: "Sci-Fi", status: "On Air Now", price: 28.0, rating: "7.8/10", times: ["12:00", "18:00", "22:15"] }
];


const CONCESSIONS_DB = [
    { id: "FB1", name: "Large Caramel Popcorn", price: 18.00, type: "Snack", icon: "fa-bucket" },
    { id: "FB2", name: "Jumbo Salted Popcorn", price: 16.00, type: "Snack", icon: "fa-bucket" },
    { id: "FB3", name: "Nachos with Cheese Dip", price: 14.50, type: "Snack", icon: "fa-bowl-food" },
    { id: "FB4", name: "Chicken Hotdog Combo", price: 15.00, type: "Snack", icon: "fa-hotdog" },
    { id: "FB5", name: "Large Coca-Cola", price: 8.00, type: "Beverage", icon: "fa-glass-water" },
    { id: "FB6", name: "Iced Lemon Tea", price: 8.00, type: "Beverage", icon: "fa-mug-hot" }
];


function generate11x11SplitMap() {
    let spaceArray = [];
    let realSeatCounter = 1;
    const totalCols = 13; 
    for(let r = 0; r < 11; r++) {
        let rowLetter = String.fromCharCode(65 + r);
        let seatInRowNumber = 1;
        for(let c = 0; c < totalCols; c++) {
            if(c === 3 || c === 9) {
                spaceArray.push({ isAisle: true });
            } else {
                spaceArray.push({
                    isAisle: false, seatId: realSeatCounter, label: `${rowLetter}-${seatInRowNumber}`,
                    bookedStatus: false, userSelected: false
                });
                seatInRowNumber++; realSeatCounter++;
            }
        }
    }
    return spaceArray;
}

function bootSystemMemoryState() {
    const locations = ["1 Utama (New Wing)", "Central i-City", "Pavilion KL", "Mid Valley Megamall"];
    locations.forEach(loc => {
        GLOBAL_CINEMA_CATALOGUE.filter(m => m.times.length > 0).forEach(movie => {
            movie.times.forEach(timeSlot => {
                const compositeKey = `${loc}_Movie${movie.id}_Hall1_${timeSlot}`;
                if (!theaterHallsDatabase[compositeKey]) {
                    let map = generate11x11SplitMap();
                    map.forEach(seat => { if(!seat.isAisle) seat.bookedStatus = Math.random() > 0.6; });
                    theaterHallsDatabase[compositeKey] = map;
                }
            });
        });
    });
}


function showPage(pageId) {
    document.querySelectorAll('.page-content').forEach(p => p.classList.add('hidden'));
    document.getElementById('page-' + pageId).classList.remove('hidden');
    const navButtons = ['dashboard', 'movies-on-air', 'movies-available', 'seat-availability', 'concessions'];
    navButtons.forEach(btn => {
        const el = document.getElementById('nav-btn-' + btn);
        if(el) {
            let paddingClass = btn === 'movies-available' ? 'px-10' : 'px-4';
            el.className = btn === pageId 
                ? `nav-btn-active ${paddingClass} py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all` 
                : `${paddingClass} py-2.5 rounded-full text-xs font-bold tracking-wider uppercase text-zinc-400 hover:text-white transition-all`;
        }
    });
    document.getElementById('profile-dropdown').classList.add('hidden');
}


function toggleAuthMode(isRegistering) {
    document.getElementById('auth-feedback').classList.add('hidden');
    document.getElementById('forgot-form').classList.add('hidden');
    if (isRegistering) {
        document.getElementById('login-form').classList.add('hidden');
        document.getElementById('register-form').classList.remove('hidden');
        document.getElementById('auth-subtitle').innerText = "Register New Operator Profile";
    } else {
        document.getElementById('register-form').classList.add('hidden');
        document.getElementById('login-form').classList.remove('hidden');
        document.getElementById('auth-subtitle').innerText = "Security Terminal Access";
    }
}

function toggleForgotMode() {
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('forgot-form').classList.remove('hidden');
    document.getElementById('auth-subtitle').innerText = "Password Recovery Node";
}

function cancelForgotMode() {
    document.getElementById('forgot-form').classList.add('hidden');
    document.getElementById('login-form').classList.remove('hidden');
    document.getElementById('auth-subtitle').innerText = "Security Terminal Access";
}

function togglePasswordDisplay(fieldId) {
    const f = document.getElementById(fieldId);
    f.type = f.type === "password" ? "text" : "password";
}

function handleForgotReset(event) {
    event.preventDefault();
    const f = document.getElementById('auth-feedback');
    f.className = "bg-emerald-950 border border-emerald-900 text-emerald-400 text-sm rounded-xl p-4 mb-5 text-center font-bold";
    f.innerText = "RESET LINK DISPATCHED TO REGISTERED EMAIL ADDRESS.";
    f.classList.remove('hidden');
    cancelForgotMode();
}

function handleRegister(event) {
    event.preventDefault();
    REGISTERED_USERS_DATABASE.push({
        name: document.getElementById('reg-name').value,
        username: document.getElementById('reg-username').value,
        email: document.getElementById('reg-email').value,
        phone: document.getElementById('reg-phone').value,
        password: document.getElementById('reg-password').value
    });
    
    const f = document.getElementById('auth-feedback');
    f.className = "bg-emerald-950 border border-emerald-900 text-emerald-400 text-sm rounded-xl p-4 mb-5 text-center font-bold";
    f.innerText = "ACCOUNT CREATED SUCCESSFULLY. PLEASE LOG IN.";
    f.classList.remove('hidden');
    document.getElementById('register-form').reset();
    toggleAuthMode(false);
}

function handleLogin(event) {
    event.preventDefault();
    const u = document.getElementById('login-username').value;
    const p = document.getElementById('login-password').value;
    
    const authUser = REGISTERED_USERS_DATABASE.find(user => (user.username === u || user.email === u) && user.password === p);

    if (authUser) {
        currentUser = authUser;
        document.getElementById('auth-page').classList.add('hidden');
        document.getElementById('app-container').classList.remove('hidden');
        
        bootSystemMemoryState();
        syncProfile();
        buildCatalogueTable();
        buildCrudTable();
        buildOnAirCards();
        buildFBGrid();
        initCharts();
        showPage('dashboard');
    } else {
        const f = document.getElementById('auth-feedback');
        f.className = "bg-red-950 border border-red-900 text-cinema-cherry text-sm rounded-xl p-4 mb-5 text-center font-bold";
        f.innerText = "ACCESS DENIED: INVALID CREDENTIALS.";
        f.classList.remove('hidden');
    }
}

function handleLogout() {
    currentUser = null; cartArray = []; completedLedger = [];
    document.getElementById('app-container').classList.add('hidden');
    document.getElementById('auth-page').classList.remove('hidden');
    document.getElementById('login-username').value = "";
    document.getElementById('login-password').value = "";
    document.getElementById('auth-feedback').classList.add('hidden');
}

function toggleProfileDropdownMenu() { document.getElementById('profile-dropdown').classList.toggle('hidden'); }
function openUserProfileSuite() { showPage('profile'); toggleProfileSection('prof-sect-info'); }
function changeGlobalLocationHub() { switchHallContext(); }


function buildCatalogueTable() {
    const body = document.getElementById('catalogue-table-body');
    body.innerHTML = "";
    
    const statusOrder = { "On Air Now": 1, "Pre-Booking": 2, "Coming Soon": 3 };
    const sortedMovies = [...GLOBAL_CINEMA_CATALOGUE].sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);

    sortedMovies.forEach(m => {
        const tr = document.createElement('tr');
        tr.className = "hover:bg-zinc-900/40 transition-colors";
        let badgeClass = m.status === "On Air Now" ? "text-emerald-400 border-emerald-900 bg-emerald-950/40" : 
                         m.status === "Coming Soon" ? "text-sky-400 border-sky-900 bg-sky-950/40" : "text-amber-400 border-amber-900 bg-amber-950/40";
        tr.innerHTML = `
            <td class="p-4 sm:p-5 font-bold text-white">${m.title}</td>
            <td class="p-4 sm:p-5 text-zinc-400 text-xs">${m.genre}</td>
            <td class="p-4 sm:p-5"><span class="border text-[10px] font-bold px-3 py-1 rounded-full ${badgeClass}">${m.status}</span></td>
            <td class="p-4 sm:p-5 font-mono text-zinc-300 text-base">RM ${m.price.toFixed(2)}</td>
            <td class="p-4 sm:p-5"><button onclick="openMovieDetails(${m.id})" class="text-sm bg-zinc-900 px-4 py-2 rounded-lg hover:bg-zinc-800 transition">View Details</button></td>
        `;
        body.appendChild(tr);
    });
    document.getElementById('dash-db-count').innerText = GLOBAL_CINEMA_CATALOGUE.length;
}

function buildOnAirCards() {
    const grid = document.getElementById('on-air-cards-grid');
    grid.innerHTML = "";
    GLOBAL_CINEMA_CATALOGUE.filter(m => m.status === "On Air Now").forEach(m => {
        const card = document.createElement('div');
        card.className = "bg-cinema-card rounded-2xl border border-zinc-800 flex flex-col justify-between group hover:border-zinc-700 transition cursor-pointer";
        let timeOptionsHTML = (m.times || []).map(t => `<option value="${t}">${t}</option>`).join('');
        
        card.innerHTML = `
            <div class="p-5 sm:p-6 flex-grow" onclick="openMovieDetails(${m.id})">
                <div class="flex justify-between items-start mb-3">
                    <span class="bg-rose-600 text-white text-[10px] uppercase font-bold px-3 py-1 rounded shadow-neon-cherry">Live</span>
                    <span class="text-amber-400 text-xs font-bold"><i class="fa-solid fa-star text-[10px]"></i> ${m.rating || "New"}</span>
                </div>
                <h3 class="text-lg font-bold text-white group-hover:text-cinema-cherry transition-colors line-clamp-2">${m.title}</h3>
                <p class="text-xs text-zinc-500 font-semibold mt-1.5">${m.genre}</p>
            </div>
            <div class="p-5 bg-zinc-950 border-t border-zinc-900">
                <div class="flex justify-between items-center mb-4">
                    <span class="font-mono text-white text-base font-bold">RM ${m.price.toFixed(2)}</span>
                    <select id="time-card-${m.id}" class="bg-zinc-900 border border-zinc-800 text-zinc-300 px-3 py-1.5 rounded-lg text-sm font-bold focus:border-cinema-cherry outline-none" onclick="event.stopPropagation()">
                        ${timeOptionsHTML}
                    </select>
                </div>
                <button onclick="initBooking(${m.id}); event.stopPropagation()" class="w-full text-sm bg-cinema-cherry text-center py-3.5 rounded-xl font-bold tracking-wider hover:bg-rose-700 transition">SELECT SEATS</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

function buildFBGrid() {
    const grid = document.getElementById('fb-grid');
    grid.innerHTML = "";
    CONCESSIONS_DB.forEach(item => {
        const div = document.createElement('div');
        div.className = "bg-cinema-card p-6 rounded-2xl border border-zinc-800 flex items-center justify-between";
        div.innerHTML = `
            <div class="flex items-center gap-4">
                <div class="w-14 h-14 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-400 text-2xl"><i class="fa-solid ${item.icon}"></i></div>
                <div>
                    <p class="text-base font-bold text-white">${item.name}</p>
                    <p class="font-mono text-cinema-cherry font-bold text-sm mt-1">RM ${item.price.toFixed(2)}</p>
                </div>
            </div>
            <button onclick="addFBToCart('${item.id}')" class="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 text-white hover:bg-cinema-cherry hover:border-cinema-cherry transition flex items-center justify-center"><i class="fa-solid fa-plus text-sm"></i></button>
        `;
        grid.appendChild(div);
    });
}

function openMovieDetails(id) {
    const m = GLOBAL_CINEMA_CATALOGUE.find(m => m.id === id);
    document.getElementById('modal-title').innerText = m.title;
    document.getElementById('modal-genre').innerText = m.genre;
    document.getElementById('modal-status').innerText = m.status;
    document.getElementById('movie-details-modal').classList.remove('hidden');
}


function initBooking(id) {
    activeSelectedMovieContext = GLOBAL_CINEMA_CATALOGUE.find(m => m.id === id);
    const chosenTime = document.getElementById(`time-card-${id}`).value;
    
    document.getElementById('booking-target-title').innerText = activeSelectedMovieContext.title;
    
    const timeSelector = document.getElementById('booking-time-selector');
    timeSelector.innerHTML = activeSelectedMovieContext.times.map(t => `<option value="${t}">${t}</option>`).join('');
    timeSelector.value = chosenTime;
    
    const hallSelector = document.getElementById('hall-selector');
    hallSelector.innerHTML = `<option value="1">Hall 1 (IMAX)</option>`; 
    hallSelector.value = "1";

    switchHallContext();
    showPage('seat-availability');
    document.getElementById('page-seat-availability').scrollIntoView({ behavior: 'smooth' });
}

function switchHallContext() {
    if(!activeSelectedMovieContext) return;
    const loc = document.getElementById('global-location-picker').value;
    const time = document.getElementById('booking-time-selector').value;
    const compositeKey = `${loc}_Movie${activeSelectedMovieContext.id}_Hall1_${time}`;

    const viewport = document.getElementById('seating-grid-viewport');
    viewport.style.gridTemplateColumns = `repeat(13, minmax(0, 1fr))`;
    viewport.innerHTML = "";

    let memoryMap = theaterHallsDatabase[compositeKey];
    if(!memoryMap) {
        let map = generate11x11SplitMap();
        theaterHallsDatabase[compositeKey] = map;
        memoryMap = map;
    }

    memoryMap.forEach((node, index) => {
        if(node.isAisle) {
            const space = document.createElement('div');
            space.className = "w-8 h-8 sm:w-12 sm:h-12";
            viewport.appendChild(space);
        } else {
            const cell = document.createElement('button');
            cell.innerText = node.label;
            cell.className = "w-8 h-8 sm:w-12 sm:h-12 text-[8px] sm:text-xs font-mono font-black rounded-lg flex items-center justify-center transition-all select-none border";
            
            if(node.bookedStatus) {
                cell.className += " bg-zinc-950 border-zinc-900 text-zinc-700 cursor-not-allowed";
            } else if(node.userSelected) {
                cell.className += " bg-sky-500 border-sky-400 text-white shadow-md shadow-sky-500/30 cursor-pointer";
                cell.onclick = () => toggleSeatState(compositeKey, index);
            } else {
                cell.className += " bg-cinema-cherry border-rose-500 text-white hover:scale-105 cursor-pointer";
                cell.onclick = () => toggleSeatState(compositeKey, index);
            }
            viewport.appendChild(cell);
        }
    });
    recalcTotals(compositeKey);
}

function toggleSeatState(compositeKey, idx) {
    theaterHallsDatabase[compositeKey][idx].userSelected = !theaterHallsDatabase[compositeKey][idx].userSelected;
    switchHallContext();
}

function recalcTotals(compositeKey) {
    const map = theaterHallsDatabase[compositeKey];
    const seats = map.filter(s => !s.isAisle && s.userSelected).map(s => s.label);
    const cost = seats.length * activeSelectedMovieContext.price;

    document.getElementById('summary-movie').innerText = activeSelectedMovieContext.title;
    document.getElementById('summary-time').innerText = document.getElementById('booking-time-selector').value;
    document.getElementById('summary-hall').innerText = "Hall 1";
    document.getElementById('summary-seats').innerText = seats.length > 0 ? seats.join(', ') : "None";
    document.getElementById('summary-total').innerText = "RM " + cost.toFixed(2);
    document.getElementById('summary-location').innerText = document.getElementById('global-location-picker').value;
}


function commitSelectedSeatsToCart() {
    const loc = document.getElementById('global-location-picker').value;
    const time = document.getElementById('booking-time-selector').value;
    const compositeKey = `${loc}_Movie${activeSelectedMovieContext.id}_Hall1_${time}`;

    const seats = theaterHallsDatabase[compositeKey].filter(s => !s.isAisle && s.userSelected);
    if (seats.length === 0) { alert("Please select seats."); return; }

    seats.forEach(s => {
        cartArray.push({
            type: "Ticket", compositeKey: compositeKey, seatId: s.seatId, label: s.label,
            title: activeSelectedMovieContext.title, price: activeSelectedMovieContext.price,
            location: loc, timeSlot: time
        });
        s.userSelected = false; 
    });

    switchHallContext();
    syncCartUI();
    openCartOverlay();
}

function addFBToCart(itemId) {
    const item = CONCESSIONS_DB.find(i => i.id === itemId);
    cartArray.push({ type: "F&B", title: item.name, price: item.price });
    syncCartUI();
    alert(`${item.name} added to cart.`);
}

function syncCartUI() {
    const wrapper = document.getElementById('cart-items-wrapper');
    const badge = document.getElementById('cart-badge');
    const actionBtn = document.getElementById('cart-checkout-action-btn');
    
    wrapper.innerHTML = "";
    badge.innerText = cartArray.length;

    if(cartArray.length === 0) {
        wrapper.innerHTML = `<p class="text-sm text-zinc-500 font-medium text-center py-10">Your cart is empty.</p>`;
        document.getElementById('cart-total-metric').innerText = "RM 0.00";
        actionBtn.className = "w-full bg-zinc-900 text-zinc-500 cursor-not-allowed text-sm font-black py-4 rounded-xl tracking-widest uppercase";
        actionBtn.disabled = true;
        return;
    }

    let sum = 0;
    cartArray.forEach((item, index) => {
        sum += item.price;
        const div = document.createElement('div');
        div.className = "bg-zinc-950 p-4 sm:p-5 border border-zinc-900 rounded-xl flex justify-between items-center text-sm";
        if(item.type === "Ticket") {
            div.innerHTML = `
                <div>
                    <p class="font-bold text-white mb-1"><span class="bg-cinema-cherry text-white px-2 py-0.5 rounded text-[10px] mr-2">TKT</span> ${item.title}</p>
                    <p class="text-xs text-zinc-500">Seat ${item.label} @ ${item.timeSlot} (${item.location})</p>
                </div>
                <div class="flex items-center gap-4"><span class="font-mono text-white text-base font-bold">RM ${item.price.toFixed(2)}</span><button onclick="purgeCart(${index})" class="text-zinc-600 hover:text-cinema-cherry p-2 -mr-2"><i class="fa-solid fa-trash-can text-lg"></i></button></div>
            `;
        } else {
            div.innerHTML = `
                <div>
                    <p class="font-bold text-white"><span class="bg-amber-500 text-white px-2 py-0.5 rounded text-[10px] mr-2">F&B</span> ${item.title}</p>
                </div>
                <div class="flex items-center gap-4"><span class="font-mono text-white text-base font-bold">RM ${item.price.toFixed(2)}</span><button onclick="purgeCart(${index})" class="text-zinc-600 hover:text-cinema-cherry p-2 -mr-2"><i class="fa-solid fa-trash-can text-lg"></i></button></div>
            `;
        }
        wrapper.appendChild(div);
    });

    document.getElementById('cart-total-metric').innerText = "RM " + sum.toFixed(2);
    actionBtn.className = "w-full bg-cinema-cherry text-white text-sm font-black py-4 rounded-xl tracking-widest uppercase shadow-neon-cherry cursor-pointer hover:bg-rose-700 transition";
    actionBtn.disabled = false;
}

function purgeCart(idx) { cartArray.splice(idx, 1); syncCartUI(); }
function openCartOverlay() { document.getElementById('cart-overlay-module').classList.remove('hidden'); }
function closeCartOverlay() { document.getElementById('cart-overlay-module').classList.add('hidden'); }

function routeToCheckoutPaymentDeck() {
    closeCartOverlay();
    let total = cartArray.reduce((acc, curr) => acc + curr.price, 0);
    document.getElementById('checkout-charge-value').innerText = "RM " + total.toFixed(2);
    document.getElementById('checkout-modal-module').classList.remove('hidden');
}

function closeCheckoutModal() { document.getElementById('checkout-modal-module').classList.add('hidden'); }

function executeCheckoutPaymentTransaction(event) {
    event.preventDefault();
    let groupedTickets = [];
    
    cartArray.forEach(item => {
        if(item.type === "Ticket") {
            let map = theaterHallsDatabase[item.compositeKey];
            let node = map.find(n => !n.isAisle && n.seatId === item.seatId);
            if(node) node.bookedStatus = true;
            groupedTickets.push(item);
        }
    });

    if(groupedTickets.length > 0) {
        let totalVal = cartArray.reduce((acc, curr) => acc + curr.price, 0);
        completedLedger.unshift({
            id: "CP-" + Math.floor(100000 + Math.random() * 900000),
            date: new Date().toLocaleString(),
            movie: groupedTickets[0].title,
            seats: groupedTickets.map(t => t.label).join(', '),
            location: groupedTickets[0].location,
            total: totalVal,
            items: [...cartArray]
        });
        
        dashTotalRevenue += totalVal;
        document.getElementById('dash-rev-count').innerText = "RM " + (dashTotalRevenue/1000).toFixed(1) + "K";
        
        let salesEl = document.getElementById('dash-sales-count');
        salesEl.innerText = parseInt(salesEl.innerText.replace(',','')) + groupedTickets.length;
    }

    if(groupedTickets.length > 0) {
        const latestTx = completedLedger[0];
        document.getElementById('pdf-id').innerText = latestTx.id;
        document.getElementById('pdf-timestamp').innerText = latestTx.date;
        document.getElementById('pdf-location').innerText = latestTx.location;
        document.getElementById('pdf-movie').innerText = latestTx.movie;
        document.getElementById('pdf-units').innerText = "Total Allocated Items: " + latestTx.items.length;
        document.getElementById('pdf-seats').innerText = latestTx.seats;
        document.getElementById('pdf-cost').innerText = "RM " + latestTx.total.toFixed(2);
        document.getElementById('pdf-total').innerText = "RM " + latestTx.total.toFixed(2);
        
        document.getElementById('pdf-receipt-container').classList.remove('hidden');
        html2pdf().set({ margin: 0, filename: `CinePass_TX_${latestTx.id}.pdf`, image: { type: 'jpeg', quality: 1 }, html2canvas: { scale: 2, useCORS: true }, jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' } })
        .from(document.getElementById('pdf-receipt-container')).save().then(() => {
            document.getElementById('pdf-receipt-container').classList.add('hidden');
        });
    } else {
        alert("Payment Authorized. F&B items purchased.");
    }

    cartArray = []; syncCartUI(); switchHallContext(); closeCheckoutModal(); syncProfile();
}


function syncProfile() {
    if(!currentUser) return;
    document.getElementById('nav-username-display').innerText = currentUser.username;
    document.getElementById('prof-display-name').innerText = currentUser.name;
    document.getElementById('prof-display-username').innerText = "@" + currentUser.username;
    document.getElementById('prof-field-name').value = currentUser.name;
    document.getElementById('prof-field-username').value = currentUser.username;
    document.getElementById('prof-field-email').value = currentUser.email;
    document.getElementById('prof-field-phone').value = currentUser.phone;

    const bList = document.getElementById('profile-bookings-list-container');
    bList.innerHTML = "";
    if(completedLedger.length === 0) {
        bList.innerHTML = "<p class='text-sm text-zinc-500 font-medium'>No transaction history recorded on this node.</p>";
    } else {
        completedLedger.forEach(tx => {
            bList.innerHTML += `
                <div class="bg-zinc-950 border border-zinc-800 p-5 rounded-xl">
                    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-zinc-900 pb-3 mb-3 gap-2">
                        <span class="font-mono text-cinema-cherry text-xs font-bold">${tx.id}</span>
                        <span class="text-xs text-zinc-500">${tx.date}</span>
                    </div>
                    <div class="flex justify-between items-center mt-2">
                        <div>
                            <h5 class="text-base font-bold text-white mb-1">${tx.movie}</h5>
                            <p class="text-xs text-zinc-400">Seats: <span class="text-zinc-200 font-mono">${tx.seats}</span></p>
                        </div>
                        <div class="text-right">
                            <p class="text-xs text-zinc-500 font-bold uppercase mb-1">Total</p>
                            <p class="font-mono text-white text-base font-bold">RM ${tx.total.toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            `;
        });
    }
}

function toggleProfileSection(sectionId) {
    document.querySelectorAll('.prof-sub-panel').forEach(p => p.classList.add('hidden'));
    document.getElementById(sectionId).classList.remove('hidden');
    ['prof-sect-info', 'prof-sect-bookings', 'prof-sect-crud'].forEach(id => {
        const tab = document.getElementById('tab-' + id);
        if(tab) {
            if(id === sectionId) {
                tab.classList.add('border-b-2', 'border-cinema-cherry', 'text-white');
                tab.classList.remove('text-zinc-400');
            } else {
                tab.classList.remove('border-b-2', 'border-cinema-cherry', 'text-white');
                tab.classList.add('text-zinc-400');
            }
        }
    });
}


function buildCrudTable() {
    const body = document.getElementById('crud-table-body');
    body.innerHTML = "";
    GLOBAL_CINEMA_CATALOGUE.forEach(m => {
        body.innerHTML += `
            <tr>
                <td class="p-3 text-zinc-400">${m.id}</td>
                <td class="p-3 font-bold text-white">${m.title}</td>
                <td class="p-3">RM ${m.price.toFixed(2)}</td>
                <td class="p-3"><span class="badge ${m.status==='On Air Now'?'bg-success':m.status==='Coming Soon'?'bg-info text-dark':'bg-warning text-dark'}">${m.status}</span></td>
                <td class="p-3">
                    <button class="btn btn-sm btn-outline-light me-2 py-1 px-3 text-xs" onclick="openCrudModal(${m.id})">Edit</button>
                    <button class="btn btn-sm btn-outline-danger py-1 px-3 text-xs" onclick="deleteCrudMovie(${m.id})">Drop</button>
                </td>
            </tr>
        `;
    });
}

function openCrudModal(id = null) {
    if(id) {
        const m = GLOBAL_CINEMA_CATALOGUE.find(x => x.id === id);
        document.getElementById('crud-id').value = m.id;
        document.getElementById('crud-title').value = m.title;
        document.getElementById('crud-genre').value = m.genre;
        document.getElementById('crud-price').value = m.price;
        document.getElementById('crud-status').value = m.status;
        document.getElementById('crud-modal-title').innerText = "Edit Existing Movie Node";
    } else {
        document.getElementById('crud-id').value = "";
        document.getElementById('crud-title').value = "";
        document.getElementById('crud-genre').value = "";
        document.getElementById('crud-price').value = "";
        document.getElementById('crud-status').value = "On Air Now";
        document.getElementById('crud-modal-title').innerText = "Deploy New Movie Asset";
    }
    document.getElementById('crud-modal').classList.remove('hidden');
}

function closeCrudModal() { document.getElementById('crud-modal').classList.add('hidden'); }

function saveCrudMovie(e) {
    e.preventDefault();
    const id = document.getElementById('crud-id').value;
    const title = document.getElementById('crud-title').value;
    const genre = document.getElementById('crud-genre').value;
    const price = parseFloat(document.getElementById('crud-price').value);
    const status = document.getElementById('crud-status').value;

    if(id) {
        const m = GLOBAL_CINEMA_CATALOGUE.find(x => x.id == id);
        m.title = title; m.genre = genre; m.price = price; m.status = status;
    } else {
        GLOBAL_CINEMA_CATALOGUE.push({
            id: Date.now(), title, genre, price, status, rating: "New", times: status==="On Air Now" ? ["10:00","15:00","20:00"] : []
        });
    }
    closeCrudModal();
    buildCrudTable();
    buildCatalogueTable();
    buildOnAirCards();
}

function deleteCrudMovie(id) {
    if(confirm("Confirm destructive drop of database record ID: " + id + "?")) {
        GLOBAL_CINEMA_CATALOGUE = GLOBAL_CINEMA_CATALOGUE.filter(x => x.id !== id);
        buildCrudTable();
        buildCatalogueTable();
        buildOnAirCards();
    }
}


function initCharts() {
    Chart.defaults.color = '#a1a1aa';
    Chart.defaults.font.family = "'Plus Jakarta Sans', sans-serif";

    new Chart(document.getElementById('salesChart'), {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{ label: 'Sales Network Traffic', data: [120, 190, 150, 250, 420, 650, 580], borderColor: '#ff0055', backgroundColor: 'rgba(255, 0, 85, 0.1)', tension: 0.4, fill: true, borderWidth: 3 }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { grid: { color: '#22222a' } }, x: { grid: { display: false } } } }
    });

    new Chart(document.getElementById('platformPieChart'), {
        type: 'doughnut',
        data: {
            labels: ['Mobile App', 'Web Terminal', 'Kiosk Node'],
            datasets: [{ data: [65, 25, 10], backgroundColor: ['#ff0055', '#10b981', '#f59e0b'], borderWidth: 0 }]
        },
        options: { responsive: true, maintainAspectRatio: false, cutout: '75%', plugins: { legend: { position: 'bottom', labels: { boxWidth: 12 } } } }
    });

    new Chart(document.getElementById('localBuyerChart'), {
        type: 'bar',
        data: {
            labels: ['Gen Z', 'Millennials', 'Gen X', 'Boomers'],
            datasets: [{ label: 'Demographic Share', data: [45, 35, 15, 5], backgroundColor: '#3b82f6', borderRadius: 4 }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { display: false }, x: { grid: { display: false } } } }
    });

    new Chart(document.getElementById('concessionSalesChart'), {
        type: 'bar',
        data: {
            labels: ['Caramel Pop', 'Salted Pop', 'Nachos', 'Hotdog', 'Coke', 'Lemon Tea'],
            datasets: [{ label: 'Velocity', data: [320, 150, 180, 90, 410, 260], backgroundColor: '#f59e0b', borderRadius: 4 }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { grid: { color: '#22222a' } }, x: { grid: { display: false } } } }
    });
}