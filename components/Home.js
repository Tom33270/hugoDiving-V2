import styles from '../styles/Home.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';


import { useState, useEffect, useRef } from 'react';
import { useRouter } from "next/router";
import Head from "next/head";
import NavBar from './NavBar';

const InstagramIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 448 512"
    aria-hidden="true"
    focusable="false"
  >
    <defs>
      <linearGradient id="igGradient" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f09433" />
        <stop offset="25%" stopColor="#e6683c" />
        <stop offset="50%" stopColor="#dc2743" />
        <stop offset="75%" stopColor="#cc2366" />
        <stop offset="100%" stopColor="#bc1888" />
      </linearGradient>
    </defs>
    <path
      fill="url(#igGradient)"
      d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 288.5 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
    />
  </svg>
);
const WhatsappIcon = () => (
  <svg width="18" height="18" viewBox="0 0 448 512" aria-hidden="true" focusable="false">
    <path
      fill="currentColor"
      d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zM223.9 438.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.5-186.6 184.5zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
    />
  </svg>
);

function Home() {
  const router = useRouter();

  const tarifsRef = useRef(null);
  const bubblesRef = useRef(null);
  const position = <FontAwesomeIcon icon={faLocationDot} />;

const [Images, setImages] = useState([]);
const [randomImages, setRandomImages] = useState([]);

 const [randomSpecies, setRandomSpecies] = useState([]);

   const [showScrollTop, setShowScrollTop] = useState(false);

   useEffect(() => {
     const handleScroll = () => {
       setShowScrollTop(window.scrollY > 300);
     };

     window.addEventListener("scroll", handleScroll);
     return () => window.removeEventListener("scroll", handleScroll);
   }, []);

  // Bulles animées du hero (direction "Immersion")
  useEffect(() => {
    const wrap = bubblesRef.current;
    if (!wrap) return;

    const bubbles = [];
    for (let i = 0; i < 26; i++) {
      const b = document.createElement("span");
      const size = Math.random() * 10 + 4;
      b.className = styles.bubble;
      b.style.width = `${size}px`;
      b.style.height = `${size}px`;
      b.style.left = `${Math.random() * 100}%`;
      b.style.animationDuration = `${Math.random() * 10 + 8}s`;
      b.style.animationDelay = `${Math.random() * 10}s`;
      wrap.appendChild(b);
      bubbles.push(b);
    }

    return () => bubbles.forEach((b) => b.remove());
  }, []);



  useEffect(() => {
    fetch("/data/poissons-reunion.json")
      .then((res) => res.json())
      .then((data) => {
        // Mélange le tableau
        const shuffled = data.sort(() => 0.5 - Math.random());
        // Garde 4 espèces
        setRandomSpecies(shuffled.slice(0, 4));
      });
  }, []);


useEffect(() => {
  fetch('/api/photos')
    .then(res => res.json())
    .then(data => {
      const safeData = Array.isArray(data) ? data : [];
      setImages(safeData);

      // Tirage initial
      const firstRandom = [...safeData]
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

      setRandomImages(firstRandom);
    })
    .catch(() => {
      setImages([]);
      setRandomImages([]);
    });
}, []);

useEffect(() => {
  if (Images.length === 0) return;

  const interval = setInterval(() => {
    const newRandom = [...Images]
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    setRandomImages(newRandom);
  }, 4000);

  return () => clearInterval(interval);
}, [Images]);





const navigate = (path) => router.push(path);

return (
        <>
        <Head>
  <title>Plongée La Réunion – Baptême, Snorkeling & Cétacés  Hug’O₂ Diving
</title>
  <meta name="description" content="Centre de plongée à Saint‑Gilles : baptême, exploration, snorkeling, apnée et sorties cétacés. Encadrement pro et matériel premium." />
  <link rel="canonical" href="https://hugodiving.com/" />
</Head>
  <NavBar />

    <header className={styles.header}>
      <div className={styles.heroBubbles} ref={bubblesRef}></div>

      <div className={styles.mainTitle}>
        <span className={styles.eyebrow}>Instructeur indépendant ·Diplômé  d'état E4 · PADI · SDI/TDI</span>
        <h1>"Allez viens,<br />on est <em>bien.</em>"</h1>
        <p>{position} Saint-Gilles-les-Bains, La Réunion</p>

        <div className={styles.heroCta}>
          <button className={styles.heroCtaPrimary} onClick={() => navigate("/contact")}>
            Réserver une sortie
          </button> 
          <a
           className={styles.heroCtaInstagram}
    href="https://www.instagram.com/hug_o2_diving"
    target="_blank"
    rel="noopener noreferrer"
  >
    <InstagramIcon />
    Instagram
  </a>
  <a  className={styles.heroCtaWhatsapp}
    href="https://wa.me/33695482016"
    target="_blank"
    rel="noopener noreferrer"
  >
    <WhatsappIcon />
    WhatsApp
  </a>
        </div>
      </div>
    </header>

    {/* MAIN CONTENT */}
    <div className={styles.main}>

      {/* ABOUT */}
      <section className={styles.about}>
        <div className={styles.aboutPhoto} aria-hidden="true"></div>
        <div className={styles.presentation}>
          <div className={styles.textContent}>
            <span className={styles.kicker}>Depuis 2017 à La Réunion</span>
            <h2>Me, Myself and I</h2>
            <p>
               Dans l’enseignement depuis plus de 20 ans, comme professeur de tennis dans un premier temps, Mon parcours m’a mené de la Réunion à la Thaïlande, en passant par Banyuls-sur-Mer, pour vivre et enseigner ma passion de la plongée. Depuis 2017, je suis présent sur cette île magnifique et toujours avec la même envie de faire découvrir cette face peu connue qui grouille de vie ! 
      Moniteur de plongée sous-marine professionnel,  je travaille en tant qu’indépendant sur le  Port de Saint-Gilles les Bains. 
      Ce que j’aime le plus dans la plongée : Être dans l’instant présent, totalement connecté à l’environnement sous-marin, et me laisser surprendre par ses merveilles !
            </p>

            <div className={styles.aboutStats}>
              <div><strong>20+</strong><span>ans d'expérience</span></div>
              <div><strong>4 000+</strong><span>plongées</span></div>
              <div><strong>3</strong><span>certifications pro</span></div>
            </div>

            <button className={styles.moreBtn} onClick={() => navigate("/contact")}>
              Allez viens, on est bien !
            </button>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className={styles.why}>
        <span className={styles.kicker}>Ce qui fait la différence</span>
        <h2>Pourquoi choisir Hug'O₂ Diving?</h2>
        <div className={styles.whyGrid}>
          <div>
            <h3>Certifications multiples</h3>
            <p><ul><li>Diplôme d'état E4</li><li>Moniteur fédéral 1er degré</li><li>PADI, SDI/TDI</li></ul></p>
          </div>

          <div>
            <h3>Matériel Scubapro</h3>
            <p><ul><li> Équipement de qualité,<br></br> régulièrement entretenu</li></ul></p>
          </div>

          <div>
            <h3>Expérience internationale</h3>
            <p><ul><li>+4000 plongées dans<br></br> le monde entier</li></ul></p>
          </div>

          <div>
            <h3>Approche personnalisée</h3>
            <p><ul><li>Petits groupes,<br></br> encadrement adapté <br></br>à votre niveau</li></ul></p>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className={styles.gallery}>
        <span className={styles.kicker}>Immersion</span>
        <h2 className={styles.underWater}>Moments sous l'eau</h2>

        <div className={styles.galleryGrid}>
          {randomImages.map((img, index) => (
            <img
              key={index}
              src={img.secure_url}
              alt=""
              onClick={() => navigate("/gallery")}
            />
          ))}
        </div>

        <button className={styles.otherBtn} onClick={() => navigate("/gallery")}>
          Voir la galerie
        </button>
      </section>

      {/* PRICES */}
      <section className={styles.prices} ref={tarifsRef}>
        <span className={styles.kicker}>Tarifs indicatifs</span>
        <h2>Tarifs</h2>

        <ul className={styles.priceList}>
          <li><span>Randonnée Palmée</span><strong>55 euros</strong></li>
          <li><span>Baptême</span><strong>85 euros</strong></li>
          <li><span>Initiation</span><strong>110 euros</strong></li>
          <li><span>Pack découverte</span><strong>180 euros</strong></li>
          <li><span>Exploration</span><strong>65 euros</strong></li>
          <li><span>Réadaptation</span><strong>80 euros</strong></li>
          <li><span>Pack 3 plongées</span><strong>185 euros</strong></li>
          <li><span>Pack 6 plongées</span><strong>350 euros</strong></li>
          <li><span>Pack 10 plongées</span><strong>550 euros</strong></li>
          <li><span>Niveau 1 / Open water SDI</span><strong>490 euros</strong></li>
          <li><span>Nitrox simple</span><strong>180 euros</strong></li>
          <li><span>Nitrox confirmé</span><strong>310 euros</strong></li>
          <li><span>Formations N2, N3...</span><strong>Sur devis</strong></li>
        </ul>

        <button className={styles.otherBtn} onClick={() => navigate("/plongee")}>
          Voir toutes les formules
        </button>
      </section>

      {/* SPECIES */}
      <section className={styles.species}>
        <span className={styles.kicker}>WikiFish</span>
        <h2>Rencontrez les espèces</h2>

        <div className={styles.speciesGrid}>
          {randomSpecies.map((sp) => (
            <div key={sp.id}>
              <img
                src={sp.image}
                alt={sp.nom_commun}
                onClick={() => navigate(`/wikipage?id=${sp.id}`)}
              />
              <p>{sp.nom_commun}</p>
            </div>
          ))}
        </div>
      </section>

      <button className={styles.otherBtn} onClick={() => navigate("/wikipage")}>
        Wikipage
      </button>
        {showScrollTop && (
              <button
                className={styles.scrollTop}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                ↑
              </button>
            )}
    </div>
  </>
);


}
export default Home;