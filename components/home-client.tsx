/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight, CalendarCheck, ChevronDown, CircleDot, HeartHandshake,
  Menu, MessageCircle, Mic2, Phone, Quote, Star, Users, Utensils, X
} from "lucide-react";
import { ADDRESS, facilities, gallerySeed, MAP_URL, menuItems, PHONE_DISPLAY, WHATSAPP } from "@/lib/data";

type GalleryItem = { id: string; image_url: string; title: string; caption: string };
type Testimonial = { id: string; name: string; message: string; rating: number };
type Promotion = { id: string; title: string; description: string; active: boolean };

const iconMap: Record<string, React.ReactNode> = {
  Utensils: <Utensils size={25} />,
  CircleDot: <CircleDot size={25} />,
  Mic2: <Mic2 size={25} />,
  HeartHandshake: <HeartHandshake size={25} />,
  Users: <Users size={25} />
};

function waLink(text: string) {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
}

export default function HomeClient() {
  const [openMenu, setOpenMenu] = useState(false);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [complaintOpen, setComplaintOpen] = useState(false);
  const [testimonialOpen, setTestimonialOpen] = useState(false);

  useEffect(() => {
    fetch("/api/gallery", { cache: "no-store" })
      .then((response) => response.json())
      .then((data) => { if (data.items?.length) setGallery(data.items); })
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    setPromotions([
      { id: "p1", title: "Booking & Gathering", description: "Butuh tempat untuk billiard, karaoke, rapat, pengajian, atau acara bersama? Hubungi Paradise untuk reservasi.", active: true },
      { id: "p2", title: "Kuliner Paradise", description: "Nikmati pilihan ikan bakar, ayam kampung, sambal, nasi, mie, dan menu favorit lainnya.", active: true },
      { id: "p3", title: "Pesan Antar", description: `Pesan makanan dengan mudah melalui WhatsApp ${PHONE_DISPLAY}.`, active: true }
    ]);
  }, []);

  const displayGallery = gallery.length ? gallery : gallerySeed.map((x, i) => ({
    id: `seed-${i}`, image_url: x.src, title: x.title, caption: x.caption
  }));

  function submitTestimonial(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "");
    const message = String(form.get("message") || "");
    const rating = String(form.get("rating") || "5");
    const text = `Halo Paradise Cafe & Billiard, saya ingin mengirim testimoni.\n\nNama: ${name}\nRating: ${rating}/5\nTestimoni: ${message}`;
    window.open(waLink(text), "_blank");
    setTestimonialOpen(false);
  }

  function submitComplaint(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const text = `Halo Paradise Cafe & Billiard, saya ingin menyampaikan pengaduan/masukan.\n\nNama: ${String(form.get("name") || "")}\nKontak: ${String(form.get("contact") || "")}\nPesan: ${String(form.get("message") || "")}`;
    window.open(waLink(text), "_blank");
    setComplaintOpen(false);
  }

  return (
    <main>
      <header className="nav">
        <a className="brand" href="#home" aria-label="Paradise Cafe & Billiard">
          <img src="/images/logo-paradise.jpg" alt="Paradise Cafe & Billiard" />
          <span>PARADISE <small>CAFE & BILLIARD</small></span>
        </a>
        <nav className={openMenu ? "nav-links open" : "nav-links"}>
          {["Tentang", "Menu", "Fasilitas", "Galeri", "Promosi", "Testimoni", "Kontak"].map((x) =>
            <a key={x} href={`#${x.toLowerCase()}`} onClick={() => setOpenMenu(false)}>{x}</a>
          )}
          <a className="nav-cta" href={waLink("Halo Paradise Cafe & Billiard, saya ingin melakukan pemesanan.")}>Pesan Sekarang</a>
        </nav>
        <button className="mobile-menu" onClick={() => setOpenMenu(!openMenu)} aria-label="Buka menu">
          {openMenu ? <X /> : <Menu />}
        </button>
      </header>

      <section id="home" className="hero">
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="eyebrow">KELING • KEPUNG • KEDIRI</p>
          <h1>Eat. Play.<br /><em>Gather.</em></h1>
          <p className="hero-copy">Satu tempat untuk menikmati kuliner, billiard, karaoke, pengajian, rapat, dan waktu berkualitas bersama orang-orang tersayang.</p>
          <div className="hero-actions">
            <a className="button primary" href="#menu">Lihat Menu <ArrowRight size={18} /></a>
            <a className="button ghost" href={waLink("Halo Paradise Cafe & Billiard, saya ingin booking tempat.")}>Booking via WhatsApp <MessageCircle size={18} /></a>
          </div>
          <div className="hero-note"><span>●</span> Pesan antar: {PHONE_DISPLAY}</div>
        </div>
        <div className="hero-scroll">SCROLL <ChevronDown size={16} /></div>
      </section>

      <section id="tentang" className="section about">
        <div className="section-kicker">THE PARADISE EXPERIENCE</div>
        <div className="split">
          <div>
            <h2>Lebih dari sekadar <span>cafe.</span></h2>
            <p className="lead">Paradise Cafe & Billiard hadir sebagai ruang berkumpul di Keling, Kepung, Kediri — tempat rasa, permainan, hiburan, dan kebersamaan bertemu.</p>
            <p>Kami melayani makan di tempat, pemesanan makanan, booking billiard, karaoke, serta kebutuhan acara seperti pengajian dan rapat. Hubungi kami untuk menyesuaikan kebutuhan acara Anda.</p>
            <a className="text-link" href="#kontak">Hubungi Paradise <ArrowRight size={16} /></a>
          </div>
          <div className="about-card">
            <div className="about-logo"><img src="/images/logo-paradise.jpg" alt="" /></div>
            <p>“A warm place to eat, play, sing and gather.”</p>
            <span>— Paradise Cafe & Billiard</span>
          </div>
        </div>
      </section>

      <section id="menu" className="section dark">
        <div className="section-heading">
          <div><div className="section-kicker">OUR KITCHEN</div><h2>Menu <span>Paradise</span></h2></div>
          <a className="button ghost small" href={waLink("Halo Paradise Cafe & Billiard, saya ingin memesan menu. Silakan bantu saya.")}>Order via WhatsApp <MessageCircle size={16} /></a>
        </div>
        <div className="menu-grid">
          {menuItems.map((item) => (
            <article className="menu-item" key={item.name}>
              <div><small>{item.category}</small><h3>{item.name}</h3></div>
              <strong>{item.price}</strong>
            </article>
          ))}
        </div>
        <p className="menu-note">Harga dan ketersediaan menu dapat berubah. Konfirmasi pesanan melalui WhatsApp.</p>
      </section>

      <section id="fasilitas" className="section">
        <div className="section-kicker">MORE THAN FOOD</div>
        <h2>Satu tempat, <span>banyak cerita.</span></h2>
        <div className="facility-grid">
          {facilities.map((f) => (
            <article className="facility" key={f.title}>
              <div className="facility-icon">{iconMap[f.icon]}</div>
              <h3>{f.title}</h3><p>{f.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="galeri" className="section gallery-section">
        <div className="section-heading">
          <div><div className="section-kicker">MOMENTS AT PARADISE</div><h2>Galeri <span>kami.</span></h2></div>
          <a className="text-link" href="#kontak">Kirim foto kegiatan <ArrowRight size={16} /></a>
        </div>
        <div className="gallery-grid">
          {displayGallery.map((g) => (
            <figure key={g.id} className="gallery-card">
              <img src={g.image_url} alt={g.title} loading="lazy" />
              <figcaption><strong>{g.title}</strong><span>{g.caption}</span></figcaption>
            </figure>
          ))}
        </div>
      </section>

      {promotions.length > 0 && (
        <section id="promosi" className="section promo-section">
          <div className="section-kicker">CURRENT OFFERS</div>
          <h2>Program <span>promosi.</span></h2>
          <div className="promo-grid">
            {promotions.map((p) => <article className="promo-card" key={p.id}><span>PARADISE SPECIAL</span><h3>{p.title}</h3><p>{p.description}</p><a href={waLink(`Halo Paradise, saya tertarik promo: ${p.title}`)}>Ambil Promo <ArrowRight size={15} /></a></article>)}
          </div>
        </section>
      )}

      <section id="testimoni" className="section testimonials">
        <div className="section-heading">
          <div><div className="section-kicker">FROM OUR GUESTS</div><h2>Kata mereka <span>tentang Paradise.</span></h2></div>
          <button className="button outline small" onClick={() => setTestimonialOpen(true)}>Tulis Testimoni <Star size={16} /></button>
        </div>
        <div className="testimonial-grid">
          {(testimonials.length ? testimonials : [
            { id:"1", name:"Pelanggan Paradise", message:"Tempatnya nyaman untuk makan dan kumpul bersama keluarga.", rating:5 },
            { id:"2", name:"Tamu Paradise", message:"Menu ikan bakarnya mantap. Cocok untuk makan ramai-ramai.", rating:5 },
            { id:"3", name:"Komunitas Lokal", message:"Enak untuk rapat dan kegiatan bersama karena suasananya santai.", rating:5 }
          ]).map((t) => (
            <article className="testimonial" key={t.id}><Quote size={28}/><div className="stars">{"★".repeat(t.rating)}</div><p>{t.message}</p><strong>{t.name}</strong></article>
          ))}
        </div>
      </section>

      <section id="kontak" className="section contact-section">
        <div className="contact-copy">
          <div className="section-kicker">COME VISIT US</div>
          <h2>Temui kami di <span>Keling.</span></h2>
          <p>{ADDRESS}</p>
          <div className="contact-actions">
            <button className="button primary" onClick={() => setBookingOpen(true)}><CalendarCheck size={18}/> Booking Tempat</button>
            <a className="button outline" href={`tel:${PHONE_DISPLAY}`}><Phone size={18}/> {PHONE_DISPLAY}</a>
            <button className="button outline" onClick={() => setComplaintOpen(true)}>Pengaduan</button>
          </div>
        </div>
        <div className="map-card">
          <iframe title="Lokasi Paradise Cafe & Billiard" src="https://www.google.com/maps?q=-7.7888395,112.2589127&z=16&output=embed" loading="lazy" />
          <a href={MAP_URL} target="_blank" rel="noreferrer">Buka Google Maps <ArrowRight size={15}/></a>
        </div>
      </section>

      <footer className="footer">
        <div><img src="/images/logo-paradise.jpg" alt="" /><div><strong>PARADISE CAFE & BILLIARD</strong><span>Eat. Play. Gather.</span></div></div>
        <div className="footer-links"><a href={waLink("Halo Paradise Cafe & Billiard.")}>WhatsApp</a><a href="#menu">Menu</a><a href="#galeri">Galeri</a><a href="#kontak">Lokasi</a><a href="/admin">Admin</a></div>
        <small>© {new Date().getFullYear()} Paradise Cafe & Billiard. All rights reserved.</small>
      </footer>

      {bookingOpen && <Modal title="Booking Tempat" onClose={() => setBookingOpen(false)}><p>Untuk booking billiard, karaoke, pengajian, atau rapat, silakan lanjutkan melalui WhatsApp agar jadwal dapat dikonfirmasi langsung.</p><a className="button primary full" href={waLink("Halo Paradise Cafe & Billiard, saya ingin booking tempat. Jenis kegiatan: ")}>Lanjut ke WhatsApp <MessageCircle size={18}/></a></Modal>}

      {complaintOpen && <Modal title="Pengaduan & Masukan" onClose={() => setComplaintOpen(false)}><form onSubmit={submitComplaint} className="form"><input name="name" placeholder="Nama" required/><input name="contact" placeholder="No. WhatsApp / kontak" required/><textarea name="message" placeholder="Ceritakan pengaduan atau masukan Anda..." rows={5} required/><button className="button primary full">Kirim Pengaduan</button></form></Modal>}

      {testimonialOpen && <Modal title="Tulis Testimoni" onClose={() => setTestimonialOpen(false)}><form onSubmit={submitTestimonial} className="form"><input name="name" placeholder="Nama" required/><select name="rating" defaultValue="5"><option value="5">★★★★★ — Sangat puas</option><option value="4">★★★★☆ — Puas</option><option value="3">★★★☆☆ — Cukup</option></select><textarea name="message" placeholder="Bagikan pengalaman Anda..." rows={5} required/><button className="button primary full">Kirim Testimoni</button></form></Modal>}
    </main>
  );
}

function Modal({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  return <div className="modal-backdrop" onMouseDown={onClose}><div className="modal" onMouseDown={e => e.stopPropagation()}><button className="modal-close" onClick={onClose}><X /></button><div className="section-kicker">PARADISE</div><h2>{title}</h2>{children}</div></div>;
}