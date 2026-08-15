import styles from '../styles/NavBar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFish, faMailBulk, faPhotoFilm, faWater, faHouse } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';
import { useRouter } from 'next/router';

import 'leaflet/dist/leaflet.css';
import dynamic from 'next/dynamic';

dynamic(() => import('leaflet'), { ssr: false });

export default function NavBar() {
  const router = useRouter();

  const [openMap, setOpenMap] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activitesOpen, setActivitesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const mapRef = useRef(null);
  const menuRef = useRef(null);

  const menu = <FontAwesomeIcon icon={faWater} />;
  const photos = <FontAwesomeIcon icon={faPhotoFilm} />;
  const contact = <FontAwesomeIcon icon={faMailBulk} />;
  const wiki = <FontAwesomeIcon icon={faFish} />;
  const home = <FontAwesomeIcon icon={faHouse} />;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fermeture du menu déroulant (clic extérieur ou touche Échap)
  useEffect(() => {
    if (!menuOpen) return;

    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
        setActivitesOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setActivitesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!openMap) return;

    const initMap = async () => {
      const L = await import('leaflet');

      const container = document.getElementById("mapModal");
      if (!container) return;

      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }

      const saintGilles = [-21.05574853081549, 55.22350096660605];

      const baleineIcon = L.icon({
        iconUrl: '/image/baleine.png',
        iconSize: [50, 50],
        iconAnchor: [25, 25],
        popupAnchor: [0, -25],
      });

      mapRef.current = L.map('mapModal', {
        zoomControl: true,
        scrollWheelZoom: true,
        touchZoom: true,
        dragging: true,
        attributionControl: false,
      }).setView([-21.055, 55.222], 10);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
        .addTo(mapRef.current);

      const marker = L.marker(saintGilles, { icon: baleineIcon })
        .addTo(mapRef.current)
        .bindPopup("Hugo Diving - Local 3A, Avant Port, Port de Plaisance, 97434, La Réunion");

      marker.on('click', () => {
        mapRef.current.flyTo(saintGilles, 15, { duration: 2 });
        marker.openPopup();
      });
    };

    initMap();
  }, [openMap]);

  const navigate = (path) => router.push(path);
  const closeAndGo = (path) => {
    setMenuOpen(false);
    setActivitesOpen(false);
    navigate(path);
  };

  return (
    <>
      <div className={`${styles.btntete} ${scrolled ? styles.scrolled : ""}`}>
       <button className={styles.logo} onClick={() => navigate("/")}>
  <img src="/image/transparent-logo.png" alt="" className={styles.logoImg} />
  Hug'O₂ Diving
</button>

        <div className={styles.navMenu} ref={menuRef}>
          <button
            className={`${styles.menuTrigger} ${scrolled ? styles.scrolled : ""} ${menuOpen ? styles.menuTriggerOpen : ""}`}
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
          >
            <span className={styles.burger}>
              <span></span>
              <span></span>
              <span></span>
            </span>
            Menu
          </button>

          <div className={`${styles.dropdown} ${menuOpen ? styles.dropdownOpen : ""}`}>
            <button className={styles.dropdownItem} onClick={() => closeAndGo("/")}>
  {home} Page d'accueil
</button>
            <button
              className={styles.dropdownItem}
              onClick={() => setActivitesOpen((o) => !o)}
              aria-expanded={activitesOpen}
            >
              {menu} Activités
              <span className={`${styles.chevron} ${activitesOpen ? styles.chevronOpen : ""}`}>⌄</span>
            </button>

            <div className={`${styles.submenu} ${activitesOpen ? styles.submenuOpen : ""}`}>
              <div className={styles.submenuInner}>
                <button className={styles.submenuItem} onClick={() => closeAndGo("/plongee")}>
                  Plongée
                </button>
                <button className={styles.submenuItem} onClick={() => closeAndGo("/snorkeling")}>
                  Snorkeling
                </button>
                <button className={styles.submenuItem} onClick={() => closeAndGo("/cetaces")}>
                  Sortie cétacés
                </button>
                <button className={styles.submenuItem} onClick={() => closeAndGo("/apnee")}>
                  Apnée
                </button>
                <button
                  className={styles.submenuItem}
                  onClick={() => { setMenuOpen(false); setActivitesOpen(false); setOpenMap(true); }}
                >
                  Localisation
                </button>
              </div>
            </div>

            <button className={styles.dropdownItem} onClick={() => closeAndGo("/gallery")}>
              {photos} Galerie
            </button>

            <button className={styles.dropdownItem} onClick={() => closeAndGo("/wikipage")}>
              {wiki} WikiFish
            </button>

            <button className={styles.dropdownItem} onClick={() => closeAndGo("/contact")}>
              {contact} Contact
            </button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={openMap}
        onRequestClose={() => setOpenMap(false)}
        shouldCloseOnOverlayClick
        className={styles.customModal}
        overlayClassName={styles.customOverlay}
      >
        <div id="mapModal" className={styles.mapContainer}></div>
        <button onClick={() => setOpenMap(false)} className={styles.closingButton}>
          Fermer
        </button>
      </Modal>
    </>
  );
}