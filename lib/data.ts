export type MenuItem = {
  name: string;
  price: string;
  category: string;
  description?: string;
};

export const menuItems: MenuItem[] = [
  { name: "Ayam Kampung Panggang", price: "Rp115.000", category: "Spesial Ikan Bakar" },
  { name: "Gurame Bakar", price: "Rp60.000", category: "Spesial Ikan Bakar" },
  { name: "Bandeng Bakar", price: "Rp60.000", category: "Spesial Ikan Bakar" },
  { name: "Rahang Tuna", price: "Rp13.000/ons", category: "Spesial Ikan Bakar" },
  { name: "Cah Kangkung", price: "Rp8.000", category: "Spesial Ikan Bakar" },
  { name: "Sambal Limo", price: "Rp5.000", category: "Sambal" },
  { name: "Sambal Colo-Colo", price: "Rp5.000", category: "Sambal" },
  { name: "Sambal Dabu-Dabu", price: "Rp5.000", category: "Sambal" },
  { name: "Krengsengan Daging", price: "Rp30.000", category: "Menu Utama" },
  { name: "Rica-Rica Mentok", price: "Rp25.000", category: "Menu Utama" },
  { name: "Lalapan Ayam Kampung", price: "Rp30.000", category: "Menu Utama" },
  { name: "Nasi Goreng Telur", price: "Rp18.000", category: "Menu Utama" },
  { name: "Ayam Geprek", price: "Rp17.000", category: "Menu Utama" },
  { name: "Tahu Telur", price: "Rp15.000", category: "Menu Utama" },
  { name: "Seblak Dumpling", price: "Rp18.000", category: "Menu Utama" },
  { name: "Mie Nyemek", price: "Rp16.000", category: "Menu Utama" },
  { name: "Mie Goreng", price: "Rp16.000", category: "Menu Utama" }
];

export const gallerySeed = [
  { src: "/images/display-1.jpg", title: "Hidangan Paradise", caption: "Sajian untuk makan bersama." },
  { src: "/images/display-2.jpg", title: "Ikan Bakar Paradise", caption: "Menu ikan bakar dan sambal." },
  { src: "/images/menu-1.jpg", title: "Menu Spesial", caption: "Pilihan menu favorit pelanggan." },
  { src: "/images/menu-2.jpg", title: "Menu Paradise", caption: "Pilihan hidangan harian." }
];

export const facilities = [
  { title: "Cafe & Kuliner", icon: "Utensils", text: "Menu nusantara, ikan bakar, sambal, nasi, mie dan hidangan untuk keluarga." },
  { title: "Billiard", icon: "CircleDot", text: "Area santai untuk bermain dan berkumpul bersama teman." },
  { title: "Karaoke", icon: "Mic2", text: "Ruang hiburan untuk bernyanyi dan menikmati waktu bersama." },
  { title: "Pengajian", icon: "HeartHandshake", text: "Tempat yang dapat digunakan untuk kegiatan pengajian dan acara komunitas." },
  { title: "Rapat", icon: "Users", text: "Ruang dan suasana nyaman untuk rapat, diskusi, dan pertemuan." }
];

export const WHATSAPP = "6281575086999";
export const PHONE_DISPLAY = "0815-7508-6999";
export const MAP_URL = "https://www.google.com/maps/place/Paradise+Cafe+dan+Billiard/@-7.7888395,112.2589127,671m/data=!3m2!1e3!4b1!4m6!3m5!1s0x2e7861c31e21214f:0x32a5a9bf3cf95db2!8m2!3d-7.7888395!4d112.2589127!16s%2Fg%2F11yf438j_k";
export const ADDRESS = "Dusun Jl. Jegles, RT.001/RW.001, Kecik, Keling, Kec. Kepung, Kabupaten Kediri, Jawa Timur 64293";
