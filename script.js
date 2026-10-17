/* ============================================================
   La Rocca Zofingen — Script Principal
   Módulos: Menú interactivo, Modal de reserva, Menú móvil
   ============================================================ */

/* ----------------------------------------------------------
   DATOS DEL MENÚ
   Estructura estática con precios reales de La Rocca Zofingen.
   Los precios de Tagesmenü varían diariamente; se usan valores
   orientativos del rango $$ (10–49 CHF) según la fuente.
   ---------------------------------------------------------- */
const MENU_DATA = {
  tagesmenu: [
    { name: 'Tagesmenü mit Menüsalat', desc: 'Täglich wechselnd – 8+ Optionen, auch vegetarisch', price: 'CHF 19.50' },
    { name: 'Pizza des Tages', desc: 'Holzofenpizza mit Beilagensalat', price: 'CHF 22.00' },
    { name: 'Pasta des Tages', desc: 'Hausgemachte Pasta nach Wahl des Küchenchefs', price: 'CHF 21.50' },
    { name: 'Risotto des Tages', desc: 'Cremiges Risotto mit saisonalen Zutaten', price: 'CHF 23.00' },
    { name: 'Fleischgericht des Tages', desc: 'Mit Beilage und Menüsalat', price: 'CHF 26.50' },
    { name: 'Vegetarisches Tagesmenü', desc: 'Frische Zutaten, täglich neu', price: 'CHF 18.50' },
  ],
  pizza: [
    { name: 'Pizza Margherita', desc: 'Tomaten, Mozzarella, Basilikum', price: 'CHF 16.50' },
    { name: 'Pizza La Rocca', desc: 'Tomatensauce, Mozzarella, Schinken, Champignons, Peperoni', price: 'CHF 21.50' },
    { name: 'Pizza Prosciutto e Funghi', desc: 'Tomaten, Mozzarella, Schinken, Champignons', price: 'CHF 19.50' },
    { name: 'Pizza Quattro Stagioni', desc: 'Tomaten, Mozzarella, Schinken, Champignons, Artischocken, Oliven', price: 'CHF 20.50' },
    { name: 'Pizza Diavola', desc: 'Tomaten, Mozzarella, scharfe Salami, Peperoncino', price: 'CHF 19.50' },
    { name: 'Pizza Vegetariana', desc: 'Tomaten, Mozzarella, saisonales Gemüse', price: 'CHF 18.50' },
  ],
  pasta: [
    { name: 'Spaghetti Carbonara', desc: 'Guanciale, Ei, Pecorino, Pfeffer', price: 'CHF 19.50' },
    { name: 'Tagliatelle al Ragù', desc: 'Hausgemachtes Rinderragù, Parmigiano', price: 'CHF 21.00' },
    { name: 'Gnocchi alla Sorrentina', desc: 'Tomatensauce, Mozzarella, Basilikum', price: 'CHF 20.00' },
    { name: 'Lasagne al Forno', desc: 'Klassische Lasagne mit Béchamel', price: 'CHF 22.00' },
    { name: 'Penne all\'Arrabbiata', desc: 'Scharfe Tomatensauce, Knoblauch, Peperoncino', price: 'CHF 17.50' },
    { name: 'Spaghetti Aglio e Olio', desc: 'Knoblauch, Olivenöl, Peperoncino', price: 'CHF 16.50' },
  ],
  dessert: [
    { name: 'Tiramisù della Casa', desc: 'Hausgemacht nach Familienrezept', price: 'CHF 9.50' },
    { name: 'Panna Cotta', desc: 'Mit Waldbeeren-Coulis', price: 'CHF 8.50' },
    { name: 'Gelato Misto', desc: 'Drei Kugeln nach Wahl', price: 'CHF 7.50' },
    { name: 'Profiteroles', desc: 'Mit Schokoladensauce', price: 'CHF 9.00' },
    { name: 'Espresso Affogato', desc: 'Vanilleeis mit heissem Espresso', price: 'CHF 8.50' },
  ],
  getraenke: [
    { name: 'Acqua Minerale 0,5L', desc: 'Mit oder ohne Kohlensäure', price: 'CHF 4.50' },
    { name: 'Coca-Cola / Zero 0,3L', desc: 'Glasflasche', price: 'CHF 4.50' },
    { name: 'Birra Moretti 0,3L', desc: 'Italienisches Lagerbier', price: 'CHF 5.50' },
    { name: 'Hauswein Rosso / Bianco', desc: '0,1L / 0,25L / 0,5L', price: 'ab CHF 4.50' },
    { name: 'Espresso / Doppio', desc: 'Italienischer Kaffee', price: 'CHF 3.80 / 4.80' },
    { name: 'Limoncello', desc: 'Hausgemacht, 4cl', price: 'CHF 7.50' },
  ]
};

/* ----------------------------------------------------------
   MENÚ INTERACTIVO — FILTRADO POR CATEGORÍA
   Renderiza los items sin recargar la página.
   ---------------------------------------------------------- */
const menuContainer = document.getElementById('menu-items');
const filterButtons = document.querySelectorAll('.filter-btn');

/**
 * Renderiza los items de una categoría en el contenedor.
 * @param {string} category - Clave de categoría (tagesmenu, pizza, pasta, dessert, getraenke)
 */
function renderMenuItems(category) {
  const items = MENU_DATA[category] || [];
  menuContainer.innerHTML = items.map(item => `
    <div class="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow border border-charcoal/5">
      <div class="flex justify-between items-start gap-4">
        <div class="flex-1 min-w-0">
          <h3 class="font-semibold text-charcoal">${item.name}</h3>
          <p class="text-sm text-charcoal/55 mt-1 leading-relaxed">${item.desc}</p>
        </div>
        <span class="font-display font-bold text-terracotta whitespace-nowrap text-sm">${item.price}</span>
      </div>
    </div>
  `).join('');
}

/**
 * Actualiza el estado visual de los botones de filtro.
 * @param {HTMLElement} activeBtn - Botón que debe aparecer activo
 */
function setActiveFilter(activeBtn) {
  filterButtons.forEach(btn => {
    const isActive = btn === activeBtn;
    btn.classList.toggle('bg-terracotta', isActive);
    btn.classList.toggle('text-white', isActive);
    btn.classList.toggle('bg-white', !isActive);
    btn.classList.toggle('text-charcoal', !isActive);
    btn.classList.toggle('border', !isActive);
    btn.classList.toggle('border-charcoal/15', !isActive);
    btn.setAttribute('aria-selected', isActive.toString());
  });
}

// Event listeners para filtros
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const category = btn.dataset.category;
    setActiveFilter(btn);
    renderMenuItems(category);
  });
});

// Render inicial: Tagesmenü
renderMenuItems('tagesmenu');

/* ----------------------------------------------------------
   MODAL DE RESERVA
   Abre/cierra la ventana emergente y maneja el envío.
   ---------------------------------------------------------- */
const reservationModal = document.getElementById('reservation-modal');

function openReservationModal() {
  reservationModal.classList.remove('hidden');
  reservationModal.classList.add('flex');
  document.body.style.overflow = 'hidden'; // Prevenir scroll de fondo
  // Establecer fecha mínima a hoy
  const dateInput = document.getElementById('res-date');
  if (dateInput) {
    dateInput.min = new Date().toISOString().split('T')[0];
  }
}

function closeReservationModal() {
  reservationModal.classList.add('hidden');
  reservationModal.classList.remove('flex');
  document.body.style.overflow = '';
}

/**
 * Maneja el envío del formulario de reserva.
 * En producción, aquí se conectaría con un backend o servicio
 * como OpenTable, Formspree, o una API propia.
 */
function handleReservationSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const data = {
    date: form.querySelector('#res-date').value,
    time: form.querySelector('#res-time').value,
    guests: form.querySelector('#res-guests').value,
    name: form.querySelector('#res-name').value,
    phone: form.querySelector('#res-phone').value,
    notes: form.querySelector('#res-notes').value,
  };

  // Simulación de envío exitoso (reemplazar con fetch() real)
  console.log('Reservierungsanfrage:', data);

  // Feedback visual al usuario
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = '✓ Anfrage gesendet!';
  submitBtn.classList.add('bg-green-600', 'hover:bg-green-700');
  submitBtn.classList.remove('bg-terracotta', 'hover:bg-terracotta/90');

  setTimeout(() => {
    closeReservationModal();
    form.reset();
    submitBtn.textContent = originalText;
    submitBtn.classList.remove('bg-green-600', 'hover:bg-green-700');
    submitBtn.classList.add('bg-terracotta', 'hover:bg-terracotta/90');
  }, 2000);
}

// Cerrar modal con tecla Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !reservationModal.classList.contains('hidden')) {
    closeReservationModal();
  }
});

/* ----------------------------------------------------------
   MENÚ HAMBURGUESA MÓVIL
   Alterna la visibilidad del menú de navegación en móvil.
   ---------------------------------------------------------- */
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
  const isOpen = !mobileMenu.classList.contains('hidden');
  mobileMenuBtn.setAttribute('aria-label', isOpen ? 'Menü schliessen' : 'Menü öffnen');
});

// Cerrar menú móvil al hacer clic en un enlace
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
  });
});

/* ----------------------------------------------------------
   HEADER: EFECTO SCROLL
   Añade sombra sutil al header al hacer scroll para mejorar
   la legibilidad sobre el hero.
   ---------------------------------------------------------- */
const header = document.getElementById('main-header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    header.classList.add('shadow-md');
  } else {
    header.classList.remove('shadow-md');
  }
}, { passive: true });