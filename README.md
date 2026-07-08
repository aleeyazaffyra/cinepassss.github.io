# cinepassss.github.io
# CinePass Enterprise 🍿🎟️
**Malaysia Multiplex Hub Network Operator**

CinePass Enterprise is a comprehensive, front-end enterprise management dashboard built for multiplex cinema operators. It features a sleek, neon-themed user interface designed for managing movie catalogues, tracking live operational data, handling ticketing with interactive seat mapping, and processing food and beverage (F&B) transactions.

## ✨ Core Features

* 📊 **Operational Dashboard:** Live analytics hub featuring data visualization (powered by Chart.js) for sales, demographics, and active screening yields.
* 🗂️ **Live Database & CRUD:** Full control over the movie catalogue. Add new movies, edit existing details, and drop records dynamically.
* 💺 **Ticketing Desk (Seat Mapping):** Interactive, real-time seat selection grid for specific halls, movies, and time slots.
* 🍔 **F&B Concessions Store:** Integrated shopping cart system for snacks and beverages.
* 🛒 **Secure Checkout & Cart:** Calculates total costs across tickets and F&B, processing mock transactions seamlessly.
* 🧾 **Automated PDF Receipts:** Instantly generates and downloads formatted transaction receipts using `html2pdf.js`.
* 🔐 **Operator Profile Suite:** Mock authentication system (Login/Register/Forgot Password) with user session state management and transaction ledgers.

## 🛠️ Technology Stack

* **Markup & Styling:** HTML5, CSS3, Tailwind CSS (via CDN), Bootstrap 5 (for data tables)
* **Logic & State:** Vanilla JavaScript (ES6+)
* **Typography & Icons:** Plus Jakarta Sans, Space Mono, FontAwesome (v6.4.0)
* **Libraries:** * [Chart.js](https://www.chartjs.org/) (Data Visualization)
    * [html2pdf.js](https://ekoopmans.github.io/html2pdf.js/) (Receipt Generation)

## 📁 Project Structure

The project has been refactored into a modular architecture for easy maintenance and scalability:

```text
/cinepass-enterprise
│
├── index.html            # Main application shell (Auth, Nav, Modals)
├── style.css             # Custom CSS variables, themes, and scrollbars
├── script.js             # Core logic, state management, and charting
│
└── /pages                # Modular UI components
    ├── dashboard.html    # Operational metrics & charts
    ├── catalogue.html    # Full movie database table
    ├── screening.html    # Live "On Air" movie cards
    ├── ticket.html       # Seat selection and ticketing pipeline
    ├── fb.html           # Concessions store grid
    └── profile.html      # Operator details, CRUD manager, and ledger
