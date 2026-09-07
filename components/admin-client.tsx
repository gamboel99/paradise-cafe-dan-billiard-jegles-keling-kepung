/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { ImagePlus, LogIn, LogOut, Trash2, Upload, RefreshCw } from "lucide-react";

type Gallery = { id: string; image_url: string; title: string; caption: string; created_at?: string | null };

export default function AdminClient() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [gallery, setGallery] = useState<Gallery[]>([]);
  const [busy, setBusy] = useState(false);
  const [checking, setChecking] = useState(true);

  async function load() {
    const response = await fetch("/api/gallery", { cache: "no-store" });
    const data = await response.json();
    if (response.ok) setGallery(data.items || []);
  }

  useEffect(() => {
    fetch("/api/admin/status", { cache: "no-store" }).then(r => r.json()).then(data => {
      setLoggedIn(Boolean(data.authenticated));
      setChecking(false);
    }).catch(() => setChecking(false));
  }, []);

  useEffect(() => { if (loggedIn) load(); }, [loggedIn]);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const response = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
    const data = await response.json();
    setBusy(false);
    if (!response.ok) return alert(data.error || "Login gagal.");
    setPassword("");
    setLoggedIn(true);
  }

  async function uploadImages(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    if (files.some(file => file.size > 8 * 1024 * 1024)) {
      alert("Setiap foto maksimal 8MB.");
      e.target.value = "";
      return;
    }
    setBusy(true);
    const form = new FormData();
    files.forEach(file => form.append("files", file));
    const response = await fetch("/api/gallery", { method: "POST", body: form });
    const data = await response.json();
    setBusy(false);
    if (!response.ok) alert(data.error || "Upload gagal.");
    else await load();
    e.target.value = "";
  }

  async function removeItem(item: Gallery) {
    if (!confirm(`Hapus foto “${item.title}”?`)) return;
    setBusy(true);
    const response = await fetch("/api/gallery", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ public_id: item.id }) });
    const data = await response.json();
    setBusy(false);
    if (!response.ok) return alert(data.error || "Foto gagal dihapus.");
    setGallery(items => items.filter(x => x.id !== item.id));
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setLoggedIn(false);
    setGallery([]);
  }

  if (checking) return <main className="admin-page"><div className="admin-login"><p>Memeriksa akses admin…</p></div></main>;

  if (!loggedIn) {
    return <main className="admin-page"><div className="admin-login"><img src="/images/logo-paradise.jpg" alt="Paradise"/><div className="section-kicker">PRIVATE AREA</div><h1>Paradise Admin</h1><p>Kelola foto galeri langsung dari HP atau komputer. Tidak perlu GitHub dan tidak perlu mengubah kode.</p><form onSubmit={login} className="form"><input type="password" placeholder="Password admin" value={password} onChange={e => setPassword(e.target.value)} required autoFocus/><button className="button primary full" disabled={busy}><LogIn size={17}/> {busy ? "Memproses…" : "Masuk"}</button></form><a href="/" className="text-link">← Kembali ke website</a></div></main>;
  }

  return <main className="admin-page"><div className="admin-wrap"><header className="admin-head"><div><div className="section-kicker">PARADISE CMS • CLOUDINARY</div><h1>Kelola Galeri</h1><p>Upload foto langsung dari browser. Foto otomatis tampil di website.</p></div><button className="button outline" onClick={logout}><LogOut size={17}/> Keluar</button></header>
    <section className="upload-box"><ImagePlus size={36}/><h2>Tambah foto</h2><p>Pilih satu atau banyak foto. JPG/PNG/WebP, maksimal 8MB per foto.</p><label className="button primary"><Upload size={17}/> {busy ? "Memproses…" : "Pilih Foto"}<input type="file" accept="image/jpeg,image/png,image/webp" multiple hidden onChange={uploadImages} disabled={busy}/></label><button className="button outline" onClick={load} disabled={busy}><RefreshCw size={16}/> Segarkan</button></section>
    <section><div className="admin-grid">{gallery.map(item => <article className="admin-card" key={item.id}><img src={item.image_url} alt={item.title}/><div><strong>{item.title}</strong><button onClick={() => removeItem(item)} aria-label="Hapus foto" disabled={busy}><Trash2 size={17}/></button></div></article>)}</div>{gallery.length === 0 && <div className="empty"><ImagePlus size={25}/> Belum ada foto tambahan di Cloudinary.</div>}</section>
    <a href="/" className="text-link">← Lihat website</a></div></main>;
}
