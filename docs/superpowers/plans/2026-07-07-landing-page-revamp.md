# Landing Page Revamp Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the current thin adoption landing page into a complete, modern
one — full-bleed photo hero, trust stats, storytelling, an expanded/filterable
dog gallery, testimonials, FAQ, a donation CTA, and a richer footer.

**Architecture:** React (Vite) functional components, one file per section
under `src/components/`, all styles centralized in `src/App.css` (matches
existing pattern — this codebase does not use CSS modules or per-component
stylesheets). Animations follow the existing GSAP + `ScrollTrigger` pattern
already used in every component (`gsap.context` in a `useEffect`, cleanup via
`ctx.revert()`). No new npm dependencies — `gsap` and `react-icons` are
already installed.

**Tech Stack:** React 19, Vite 6, GSAP 3 (+ ScrollTrigger), react-icons.

## Global Constraints

- No new npm dependencies — use only `gsap`, `react-icons`, `react`,
  `react-dom` (already in `package.json`).
- All new component styles go into `src/App.css`, following the existing
  section-by-section block structure (see current file for the pattern:
  `.hero { ... }`, `.gallery { ... }`, etc.).
- Dog/photo images are real Unsplash photo URLs
  (`https://images.unsplash.com/photo-<id>?...`) — free to use, no
  attribution required for this use case.
- This project has **no test framework installed** (no Jest/Vitest/RTL in
  `package.json`). Verification for every task is: `npm run dev`, visually
  confirm the described behavior in the browser, then `npm run build` to
  confirm no build errors. Do not attempt to add a test framework — out of
  scope per the spec.
- If any Unsplash image URL fails to load (broken/404), swap it for another
  Unsplash photo of the same subject (dog / shelter / volunteer) — same
  domain pattern (`images.unsplash.com/photo-<id>?auto=format&fit=crop&w=<n>&q=80`).
- Brand accent color stays `#e91e63` (`--primary`). Base background moves
  from solid pink blocks to a warm cream (`--bg: #faf7f2`), keeping pink for
  accents/CTAs/highlighted sections only.
- Keep existing anchors working: `#inicio`, `#sobre`, `#adotar`, `#contato`
  must all still resolve to a visible section after all changes.

---

### Task 1: Expand the dog catalog with real photos

**Files:**
- Modify: `src/context/DogsContext.jsx`

**Interfaces:**
- Produces: `dogs` array of `{ name: string, age: number, size: 'Pequeno'|'Médio'|'Grande', img: string }`, consumed by `Gallery.jsx` (Task 6) and `DogCard.jsx` (unchanged).

- [ ] **Step 1: Replace the hardcoded 3-dog array with 8 entries using real Unsplash photos**

Replace the whole file with:

```jsx
import { createContext, useState } from 'react';

export const DogsContext = createContext();

export function DogsProvider({ children }) {
  const [dogs] = useState([
    { name: 'Luna', age: 2, size: 'Médio', img: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=600&q=80' },
    { name: 'Toby', age: 3, size: 'Pequeno', img: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&q=80' },
    { name: 'Maggie', age: 4, size: 'Grande', img: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80' },
    { name: 'Bento', age: 1, size: 'Pequeno', img: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=600&q=80' },
    { name: 'Nina', age: 5, size: 'Médio', img: 'https://images.unsplash.com/photo-1517849845537-4d257902861a?auto=format&fit=crop&w=600&q=80' },
    { name: 'Zeus', age: 3, size: 'Grande', img: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=600&q=80' },
    { name: 'Mel', age: 2, size: 'Pequeno', img: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=600&q=80' },
    { name: 'Thor', age: 4, size: 'Médio', img: 'https://images.unsplash.com/photo-1547407139-3c921a66005c?auto=format&fit=crop&w=600&q=80' },
  ]);

  return (
    <DogsContext.Provider value={{ dogs }}>
      {children}
    </DogsContext.Provider>
  );
}
```

- [ ] **Step 2: Verify**

Run: `npm run dev`, open the site, scroll to the current gallery.
Expected: 8 dog cards render (layout will wrap — filter UI comes in Task 6),
all 8 images load (no broken-image icons). If any image is broken, swap
that one URL for another Unsplash dog photo ID and re-check.

- [ ] **Step 3: Commit**

```bash
git add src/context/DogsContext.jsx
git commit -m "feat: expand dog catalog to 8 real photos"
```

---

### Task 2: Full-bleed photo hero

**Files:**
- Modify: `src/components/Hero.jsx`
- Modify: `src/App.css` (`.hero` block and root tokens)

**Interfaces:**
- Consumes: nothing new.
- Produces: `.hero` section keeps `id="inicio"`; adds a second CTA
  anchored to `#sobre`.

- [ ] **Step 1: Update the root background token**

In `src/App.css`, change:

```css
  --bg: #fafafa;
```

to:

```css
  --bg: #faf7f2;
```

- [ ] **Step 2: Rewrite `Hero.jsx` to add the second CTA**

Replace the `return` block in `src/components/Hero.jsx` with:

```jsx
  return (
    <section id="inicio" className="hero" ref={heroRef}>
      <div className="hero-overlay" />
      <div className="hero-content">
        <h2>Adote um amigo de quatro patas</h2>
        <p>Transforme uma vida. Encontre seu novo melhor amigo hoje!</p>
        <div className="hero-ctas">
          <a
            ref={ctaRef}
            href="#adotar"
            className="cta"
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            onMouseDown={handleDown}
            onMouseUp={handleUp}
          >
            Ver cães disponíveis
          </a>
          <a href="#sobre" className="cta cta-secondary">
            Como funciona
          </a>
        </div>
      </div>
    </section>
  );
```

- [ ] **Step 3: Replace the `.hero` CSS block in `App.css`**

Find the existing block:

```css
.hero {
  background: var(--bg-pink);
  text-align: center;
  padding: 100px 20px;
  overflow: hidden;
}
```

Replace the whole `.hero`, `.hero h2`, `.hero p`, `.hero .cta` block (through
the end of the original `.hero .cta` rule) with:

```css
.hero {
  position: relative;
  text-align: center;
  padding: 160px 20px;
  overflow: hidden;
  background-image: url('https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1600&q=80');
  background-size: cover;
  background-position: center;
  min-height: 520px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0.35) 60%, rgba(0, 0, 0, 0.6) 100%);
}

.hero-content {
  position: relative;
  z-index: 1;
  color: white;
}

.hero h2 {
  font-size: 2.75rem;
  font-weight: 800;
  margin-bottom: 14px;
  letter-spacing: -1px;
  color: white;
}

.hero p {
  font-size: 1.15rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.9);
  margin: 0 auto;
  max-width: 600px;
}

.hero-ctas {
  margin-top: 28px;
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.hero .cta {
  display: inline-block;
  background: var(--primary);
  color: white;
  padding: 14px 34px;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  box-shadow: 0 6px 18px rgba(233, 30, 99, 0.4);
  cursor: pointer;
}

.hero .cta-secondary {
  background: transparent;
  border: 2px solid white;
  box-shadow: none;
}
```

- [ ] **Step 4: Verify**

Run: `npm run dev`. Expected: hero fills the viewport with a real dog photo,
dark overlay keeps text readable, both CTAs are visible and clickable
(clicking scrolls to `#adotar` and `#sobre` respectively — `#sobre` doesn't
exist as a target yet until Task 5, so it will just no-op scroll to top of
`Steps` since that section currently owns `id="sobre"`; that's fine at this
point in the plan).

- [ ] **Step 5: Commit**

```bash
git add src/components/Hero.jsx src/App.css
git commit -m "feat: full-bleed photo hero with secondary CTA"
```

---

### Task 3: Mobile hamburger menu on Header

**Files:**
- Modify: `src/components/Header.jsx`
- Modify: `src/App.css` (`.header` block)

**Interfaces:**
- Produces: `Header` now manages local `isOpen` boolean state; nav becomes
  a `.nav-open` class toggle on the existing `<nav>` element for mobile.

- [ ] **Step 1: Rewrite `Header.jsx`**

Replace the whole file with:

```jsx
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Header() {
  const headerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.header h1', {
        y: -30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });
      gsap.from('.header nav a', {
        y: -20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.2,
        ease: 'power2.out',
      });
    }, headerRef);
    return () => ctx.revert();
  }, []);

  const handleHover = (e, enter) => {
    gsap.to(e.currentTarget, {
      color: enter ? '#e91e63' : '#555',
      y: enter ? -2 : 0,
      duration: 0.25,
      ease: 'power2.out',
    });
  };

  const navItems = [
    { href: '#inicio', label: 'Início' },
    { href: '#sobre', label: 'Sobre' },
    { href: '#adotar', label: 'Adotar' },
    { href: '#contato', label: 'Contato' },
  ];

  return (
    <header className="header" ref={headerRef}>
      <h1>Adote com Amor</h1>
      <button
        className="menu-toggle"
        aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
        onClick={() => setIsOpen((v) => !v)}
      >
        {isOpen ? <FiX size={26} /> : <FiMenu size={26} />}
      </button>
      <nav className={isOpen ? 'nav-open' : ''}>
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={() => setIsOpen(false)}
            onMouseEnter={(e) => handleHover(e, true)}
            onMouseLeave={(e) => handleHover(e, false)}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
```

- [ ] **Step 2: Add mobile menu CSS**

In `src/App.css`, right after the existing `.header nav a:hover { color: var(--primary); }` rule, add:

```css
.menu-toggle {
  display: none;
  background: none;
  border: none;
  color: var(--text);
  cursor: pointer;
  padding: 4px;
}

@media (max-width: 768px) {
  .menu-toggle {
    display: block;
  }

  .header nav {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    max-height: 0;
    overflow: hidden;
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.06);
    transition: max-height 0.3s ease;
  }

  .header nav.nav-open {
    max-height: 300px;
    padding: 12px 0;
  }

  .header nav a {
    margin: 8px 0;
  }
}
```

Also update the existing `.header` rule to allow the dropdown to position
correctly — find:

```css
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 20px 40px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 0;
  z-index: 100;
}
```

and add `position: relative;` is not needed since `.header` is already
`position: sticky` (a positioned element), so the absolute-positioned
mobile `nav` will anchor to it correctly as-is — no change needed to this
rule.

- [ ] **Step 3: Verify**

Run: `npm run dev`, resize the browser to under 768px width (or use dev
tools device toolbar). Expected: nav links disappear, hamburger icon
appears top-right; clicking it slides open a full-width dropdown with the
4 links stacked; clicking a link closes the menu and scrolls to the anchor;
clicking the icon again (now an X) closes it. At desktop width, hamburger
is hidden and nav shows inline as before.

- [ ] **Step 4: Commit**

```bash
git add src/components/Header.jsx src/App.css
git commit -m "feat: add mobile hamburger menu to header"
```

---

### Task 4: TrustBar component

**Files:**
- Create: `src/components/TrustBar.jsx`
- Modify: `src/App.jsx` (wire in after `Hero`)
- Modify: `src/App.css` (add `.trust-bar` block)

**Interfaces:**
- Produces: default-exported `TrustBar` component, no props.

- [ ] **Step 1: Create `TrustBar.jsx`**

```jsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: '500+', label: 'Adoções realizadas' },
  { value: '12', label: 'Anos de atuação' },
  { value: '98%', label: 'Famílias satisfeitas' },
  { value: '20+', label: 'ONGs parceiras' },
];

export default function TrustBar() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.trust-item', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 90%' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="trust-bar" ref={ref}>
      {stats.map((stat) => (
        <div className="trust-item" key={stat.label}>
          <strong>{stat.value}</strong>
          <span>{stat.label}</span>
        </div>
      ))}
    </section>
  );
}
```

- [ ] **Step 2: Add CSS**

In `src/App.css`, after the `.hero` related rules, add:

```css
.trust-bar {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 48px;
  background: white;
  padding: 36px 20px;
  text-align: center;
}

.trust-item {
  display: flex;
  flex-direction: column;
}

.trust-item strong {
  font-size: 2rem;
  font-weight: 800;
  color: var(--primary);
}

.trust-item span {
  font-size: 0.9rem;
  color: var(--text-muted);
  font-weight: 500;
}
```

- [ ] **Step 3: Wire into `App.jsx`**

```jsx
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import Gallery from './components/Gallery';
import Steps from './components/Steps';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import { DogsProvider } from './context/DogsContext';


export default function App() {
  return (
    <DogsProvider>

        <Header />
        <Hero />
        <TrustBar />
        <Gallery />
        <Steps />
        <ContactForm />
        <Footer />

    </DogsProvider>
  );
}
```

- [ ] **Step 4: Verify**

Run: `npm run dev`. Expected: a white strip with 4 centered stats appears
directly below the hero, fading/sliding in as you scroll to it.

- [ ] **Step 5: Commit**

```bash
git add src/components/TrustBar.jsx src/App.jsx src/App.css
git commit -m "feat: add trust bar with adoption stats"
```

---

### Task 5: About (storytelling) section

**Files:**
- Create: `src/components/About.jsx`
- Modify: `src/App.jsx` (wire in after `TrustBar`)
- Modify: `src/components/Steps.jsx` (remove `id="sobre"`, since `About` now owns that anchor)
- Modify: `src/App.css` (add `.about` block)

**Interfaces:**
- Produces: default-exported `About` component, owns `id="sobre"`.

- [ ] **Step 1: Create `About.jsx`**

```jsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-text > *', {
        x: -30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      });
      gsap.from('.about-img', {
        x: 30,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="sobre" className="about" ref={ref}>
      <div className="about-text">
        <h3>Nossa missão</h3>
        <p>
          Há 12 anos resgatamos, cuidamos e encontramos lares para cães
          abandonados. Cada adoção é acompanhada de perto pela nossa equipe,
          desde a primeira visita até muito depois de o pet chegar em casa.
        </p>
        <p>
          Trabalhamos com uma rede de ONGs parceiras e voluntários para
          garantir que cada cão receba cuidados veterinários, socialização e,
          principalmente, uma segunda chance.
        </p>
      </div>
      <img
        className="about-img"
        src="https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=700&q=80"
        alt="Voluntário cuidando de um cão no abrigo"
      />
    </section>
  );
}
```

- [ ] **Step 2: Remove the anchor from `Steps.jsx`**

In `src/components/Steps.jsx`, change:

```jsx
    <section id="sobre" className="steps" ref={sectionRef}>
```

to:

```jsx
    <section className="steps" ref={sectionRef}>
```

- [ ] **Step 3: Add CSS**

In `src/App.css`, after the `.trust-bar` rules, add:

```css
.about {
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: center;
  padding: 80px 20px;
  max-width: 1100px;
  margin: 0 auto;
}

.about-text h3 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 16px;
  letter-spacing: -0.5px;
}

.about-text p {
  color: var(--text-muted);
  line-height: 1.6;
  margin-bottom: 12px;
}

.about-img {
  width: 100%;
  max-width: 500px;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  object-fit: cover;
}

@media (min-width: 900px) {
  .about {
    flex-direction: row;
    text-align: left;
  }

  .about-text,
  .about-img {
    flex: 1;
  }
}
```

- [ ] **Step 4: Wire into `App.jsx`**

Add the import and place it after `<TrustBar />`:

```jsx
import About from './components/About';
```

```jsx
        <Header />
        <Hero />
        <TrustBar />
        <About />
        <Gallery />
        <Steps />
        <ContactForm />
        <Footer />
```

- [ ] **Step 5: Verify**

Run: `npm run dev`. Expected: clicking "Sobre" in the header nav (or the
hero's "Como funciona" CTA) now scrolls to the new About section (text +
photo, side-by-side on desktop, stacked on mobile). No section has a
duplicate `id="sobre"` (check via browser dev tools that only one element
has that id).

- [ ] **Step 6: Commit**

```bash
git add src/components/About.jsx src/components/Steps.jsx src/App.jsx src/App.css
git commit -m "feat: add About storytelling section, move #sobre anchor"
```

---

### Task 6: Gallery filter pills

**Files:**
- Modify: `src/components/Gallery.jsx`
- Modify: `src/App.css` (add `.filter-pills` block)

**Interfaces:**
- Consumes: `dogs` from `DogsContext` (Task 1), each with `size: 'Pequeno'|'Médio'|'Grande'`.
- Produces: no external interface change — `Gallery` remains a default-exported, prop-less component.

- [ ] **Step 1: Rewrite `Gallery.jsx`**

```jsx
import { useContext, useState } from 'react';
import { DogsContext } from '../context/DogsContext';
import DogCard from './DogCard';

const FILTERS = ['Todos', 'Pequeno', 'Médio', 'Grande'];

export default function Gallery() {
  const { dogs } = useContext(DogsContext);
  const [filter, setFilter] = useState('Todos');

  const filteredDogs = filter === 'Todos' ? dogs : dogs.filter((dog) => dog.size === filter);

  return (
    <section id="adotar" className="gallery">
      <h3>Cães para Adoção</h3>
      <div className="filter-pills">
        {FILTERS.map((f) => (
          <button
            key={f}
            className={`filter-pill ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="cards">
        {filteredDogs.map((dog, index) => (
          <DogCard key={dog.name} dog={dog} index={index} />
        ))}
      </div>
    </section>
  );
}
```

Note: `key` changed from `index` to `dog.name` since filtering changes which
items are at which index — using `dog.name` (unique in this dataset) avoids
React reusing/misplacing DOM nodes across filter changes.

- [ ] **Step 2: Add CSS**

In `src/App.css`, right after `.gallery h3 { ... }`, add:

```css
.filter-pills {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-bottom: 36px;
}

.filter-pill {
  border: 1px solid #ddd;
  background: white;
  color: var(--text-muted);
  padding: 8px 20px;
  border-radius: 30px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
}

.filter-pill:hover {
  border-color: var(--primary);
  color: var(--primary);
}

.filter-pill.active {
  background: var(--primary);
  border-color: var(--primary);
  color: white;
}
```

- [ ] **Step 3: Verify**

Run: `npm run dev`, scroll to the gallery. Expected: 4 pills ("Todos",
"Pequeno", "Médio", "Grande") above the cards; "Todos" active by default
showing all 8 dogs; clicking "Pequeno" filters to only `Pequeno`-size dogs
(Toby, Bento, Mel per Task 1's data) and highlights that pill; clicking
"Todos" restores all 8.

- [ ] **Step 4: Commit**

```bash
git add src/components/Gallery.jsx src/App.css
git commit -m "feat: add size filter pills to dog gallery"
```

---

### Task 7: Testimonials section

**Files:**
- Create: `src/components/Testimonials.jsx`
- Modify: `src/App.jsx` (wire in after `Steps`)
- Modify: `src/App.css` (add `.testimonials` block)

**Interfaces:**
- Produces: default-exported `Testimonials` component, no props.

- [ ] **Step 1: Create `Testimonials.jsx`**

```jsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: 'Carla Mendes',
    quote: 'Adotamos a Luna há 6 meses e ela transformou nossa casa. O processo foi todo acompanhado com muito cuidado.',
    img: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Rafael Souza',
    quote: 'A equipe foi super atenciosa em cada etapa. O Zeus se adaptou rapidinho e hoje é parte da família.',
    img: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Patrícia Lima',
    quote: 'Nunca imaginei que adotar seria tão simples e transparente. Recomendo pra qualquer pessoa que queira dar um lar a um cão.',
    img: 'https://images.unsplash.com/photo-1547407139-3c921a66005c?auto=format&fit=crop&w=200&q=80',
  },
];

export default function Testimonials() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.testimonial-card', {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="testimonials" ref={ref}>
      <h3>Quem já adotou conta</h3>
      <div className="testimonial-list">
        {testimonials.map((t) => (
          <div className="testimonial-card" key={t.name}>
            <img src={t.img} alt={t.name} className="testimonial-img" />
            <p>&ldquo;{t.quote}&rdquo;</p>
            <strong>{t.name}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add CSS**

In `src/App.css`, after the `.steps` related rules, add:

```css
.testimonials {
  padding: 80px 20px;
  text-align: center;
  background: var(--bg-pink-soft);
}

.testimonials h3 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 40px;
  letter-spacing: -0.5px;
}

.testimonial-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
  max-width: 1000px;
  margin: 0 auto;
}

.testimonial-card {
  background: white;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 28px 22px;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.testimonial-img {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 14px;
}

.testimonial-card p {
  color: var(--text-muted);
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 14px;
}

.testimonial-card strong {
  font-size: 0.95rem;
  color: var(--primary);
}
```

- [ ] **Step 3: Wire into `App.jsx`**

```jsx
import Testimonials from './components/Testimonials';
```

```jsx
        <Steps />
        <Testimonials />
        <ContactForm />
```

- [ ] **Step 4: Verify**

Run: `npm run dev`, scroll past Steps. Expected: pink-tinted section with 3
testimonial cards (circular avatar, quote, name), fading/sliding in with
stagger as you scroll to it.

- [ ] **Step 5: Commit**

```bash
git add src/components/Testimonials.jsx src/App.jsx src/App.css
git commit -m "feat: add testimonials section"
```

---

### Task 8: FAQ accordion

**Files:**
- Create: `src/components/Faq.jsx`
- Modify: `src/App.jsx` (wire in after `Testimonials`)
- Modify: `src/App.css` (add `.faq` block)

**Interfaces:**
- Produces: default-exported `Faq` component, no props. Internal
  `openIndex: number|null` state, single-open accordion.

- [ ] **Step 1: Create `Faq.jsx`**

```jsx
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiChevronDown } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    q: 'Quanto custa adotar um cão?',
    a: 'A adoção em si é gratuita. Pedimos apenas que a família esteja preparada para os custos de manutenção do pet (alimentação, vacinas, veterinário).',
  },
  {
    q: 'Quais são os requisitos para adotar?',
    a: 'Ser maior de 18 anos, morar em local seguro para o porte do cão e passar por uma breve entrevista com nossa equipe.',
  },
  {
    q: 'Como funciona o processo de adoção?',
    a: 'Você escolhe um cão no site, preenche o formulário de interesse, fazemos uma entrevista e agendamos uma visita para vocês se conhecerem antes de finalizar.',
  },
  {
    q: 'Existe acompanhamento após a adoção?',
    a: 'Sim, nossa equipe entra em contato periodicamente nos primeiros meses para ajudar na adaptação do pet à nova casa.',
  },
  {
    q: 'É possível devolver o cão se não der certo?',
    a: 'Sim. Preferimos que o cão volte para nós a ser abandonado — pedimos apenas que a família nos avise com antecedência.',
  },
];

export default function Faq() {
  const ref = useRef(null);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.faq-item', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const toggle = (index) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section className="faq" ref={ref}>
      <h3>Perguntas frequentes</h3>
      <div className="faq-list">
        {faqs.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div className="faq-item" key={item.q}>
              <button className="faq-question" onClick={() => toggle(index)}>
                <span>{item.q}</span>
                <FiChevronDown className={`faq-icon ${isOpen ? 'open' : ''}`} />
              </button>
              {isOpen && <p className="faq-answer">{item.a}</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add CSS**

In `src/App.css`, after the `.testimonials` related rules, add:

```css
.faq {
  padding: 80px 20px;
  text-align: center;
  background: white;
}

.faq h3 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 40px;
  letter-spacing: -0.5px;
}

.faq-list {
  max-width: 700px;
  margin: 0 auto;
  text-align: left;
}

.faq-item {
  border-bottom: 1px solid #eee;
}

.faq-question {
  width: 100%;
  background: none;
  border: none;
  padding: 18px 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  font-weight: 600;
  color: var(--text);
  cursor: pointer;
  font-family: var(--font);
}

.faq-icon {
  transition: transform 0.25s ease;
  flex-shrink: 0;
  color: var(--primary);
}

.faq-icon.open {
  transform: rotate(180deg);
}

.faq-answer {
  padding: 0 4px 18px;
  color: var(--text-muted);
  line-height: 1.6;
  margin: 0;
}
```

- [ ] **Step 3: Wire into `App.jsx`**

```jsx
import Faq from './components/Faq';
```

```jsx
        <Testimonials />
        <Faq />
        <ContactForm />
```

- [ ] **Step 4: Verify**

Run: `npm run dev`, scroll to the FAQ section. Expected: 5 questions listed,
each closed by default; clicking one expands its answer and rotates the
chevron; clicking a second one closes the first (only one open at a time);
clicking an open one again closes it.

- [ ] **Step 5: Commit**

```bash
git add src/components/Faq.jsx src/App.jsx src/App.css
git commit -m "feat: add FAQ accordion section"
```

---

### Task 9: Donation CTA banner

**Files:**
- Create: `src/components/DonationCTA.jsx`
- Modify: `src/App.jsx` (wire in after `Faq`, before `ContactForm`)
- Modify: `src/App.css` (add `.donation-cta` block)

**Interfaces:**
- Produces: default-exported `DonationCTA` component, no props.

- [ ] **Step 1: Create `DonationCTA.jsx`**

```jsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function DonationCTA() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.donation-cta > *', {
        y: 20,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 90%' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="donation-cta" ref={ref}>
      <h3>Não pode adotar agora?</h3>
      <p>Ajude com uma doação e contribua para o resgate e cuidado de mais cães.</p>
      <a href="#contato" className="cta">Quero doar</a>
    </section>
  );
}
```

- [ ] **Step 2: Add CSS**

In `src/App.css`, after the `.faq` related rules, add:

```css
.donation-cta {
  background: var(--primary);
  color: white;
  text-align: center;
  padding: 60px 20px;
}

.donation-cta h3 {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 12px;
}

.donation-cta p {
  max-width: 500px;
  margin: 0 auto 24px;
  color: rgba(255, 255, 255, 0.9);
}

.donation-cta .cta {
  display: inline-block;
  background: white;
  color: var(--primary);
  padding: 14px 34px;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 600;
}
```

- [ ] **Step 3: Wire into `App.jsx`**

```jsx
import DonationCTA from './components/DonationCTA';
```

```jsx
        <Faq />
        <DonationCTA />
        <ContactForm />
```

- [ ] **Step 4: Verify**

Run: `npm run dev`, scroll between FAQ and the contact form. Expected: solid
pink banner with heading, supporting text, and a white "Quero doar" button
that scrolls to the contact form when clicked.

- [ ] **Step 5: Commit**

```bash
git add src/components/DonationCTA.jsx src/App.jsx src/App.css
git commit -m "feat: add donation CTA banner"
```

---

### Task 10: Multi-column footer

**Files:**
- Modify: `src/components/Footer.jsx`
- Modify: `src/App.css` (`footer` block)

**Interfaces:**
- Produces: no external interface change — `Footer` remains default-exported, prop-less.

- [ ] **Step 1: Rewrite `Footer.jsx`**

```jsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiInstagram, FiFacebook } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(footerRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: { trigger: footerRef.current, start: 'top 95%' },
      });
    }, footerRef);
    return () => ctx.revert();
  }, []);

  const handleEnter = (e) => {
    gsap.to(e.currentTarget, { y: -2, color: '#ff80ab', duration: 0.2 });
  };
  const handleLeave = (e) => {
    gsap.to(e.currentTarget, { y: 0, color: '#ffffff', duration: 0.2 });
  };

  return (
    <footer ref={footerRef}>
      <div className="footer-columns">
        <div className="footer-col">
          <h4>Adote com Amor</h4>
          <p>Conectando cães resgatados a famílias que querem transformar uma vida.</p>
        </div>
        <div className="footer-col">
          <h5>Links rápidos</h5>
          <a href="#inicio" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>Início</a>
          <a href="#sobre" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>Sobre</a>
          <a href="#adotar" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>Adotar</a>
          <a href="#contato" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>Contato</a>
        </div>
        <div className="footer-col">
          <h5>Contato</h5>
          <p>contato@adotecomamor.org</p>
          <p>(11) 4002-8922</p>
        </div>
        <div className="footer-col">
          <h5>Endereço</h5>
          <p>Rua dos Rescatados, 123</p>
          <p>São Paulo - SP</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Adote com Amor</p>
        <div className="socials">
          <a href="#" aria-label="Instagram" onMouseEnter={handleEnter} onMouseLeave={handleLeave}><FiInstagram size={20} /></a>
          <a href="#" aria-label="Facebook" onMouseEnter={handleEnter} onMouseLeave={handleLeave}><FiFacebook size={20} /></a>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Replace the `footer` CSS block**

Find the existing block from `footer { ... }` through `footer .socials a:hover { ... }` and replace it with:

```css
footer {
  padding: 56px 20px 24px;
  background: #222;
  color: white;
}

.footer-columns {
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  max-width: 1100px;
  margin: 0 auto 32px;
}

.footer-col {
  flex: 1;
  min-width: 180px;
}

.footer-col h4 {
  color: white;
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.footer-col h5 {
  color: white;
  font-size: 0.95rem;
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.footer-col p {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  line-height: 1.6;
  margin: 0 0 6px;
}

.footer-col a {
  display: block;
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  font-size: 0.9rem;
  margin-bottom: 10px;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  padding-top: 20px;
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.footer-bottom p {
  margin: 0;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
}

footer .socials {
  display: flex;
  gap: 16px;
}

footer .socials a {
  color: #fff;
  display: flex;
}
```

- [ ] **Step 3: Verify**

Run: `npm run dev`, scroll to the very bottom. Expected: 4-column footer
(brand blurb, quick links, contact info, address) above a bottom bar with
copyright text and Instagram/Facebook icons; columns stack vertically on
narrow viewports (flex-wrap).

- [ ] **Step 4: Commit**

```bash
git add src/components/Footer.jsx src/App.css
git commit -m "feat: expand footer to multi-column layout"
```

---

### Task 11: Final integration check

**Files:**
- No new changes expected — this task is a verification pass over the
  whole page after Tasks 1–10.

- [ ] **Step 1: Full production build**

Run: `npm run build`
Expected: build completes with no errors or warnings about unused/missing
imports.

- [ ] **Step 2: Full manual walkthrough**

Run: `npm run preview` (serves the production build), open it in the
browser and check, top to bottom:
- Header: logo, nav links, mobile hamburger at narrow widths.
- Hero: full-bleed photo loads, both CTAs work.
- TrustBar: 4 stats visible.
- About: text + photo, `#sobre` anchor scrolls here from nav and from the
  hero's secondary CTA.
- Gallery: 8 dogs, filter pills work, `#adotar` anchor correct.
- Steps: unchanged 3-step section still renders correctly without its old
  `id="sobre"`.
- Testimonials: 3 cards with photos.
- FAQ: accordion opens one at a time.
- DonationCTA: banner + button scrolls to `#contato`.
- ContactForm: unchanged, still submits (no-op) without errors.
- Footer: 4 columns + bottom bar.

- [ ] **Step 3: Commit (only if Step 1/2 revealed fixes)**

If no fixes were needed, skip this step — there is nothing to commit.
If fixes were needed, stage exactly the files touched and commit:

```bash
git add -A
git commit -m "fix: address issues found in final integration pass"
```
