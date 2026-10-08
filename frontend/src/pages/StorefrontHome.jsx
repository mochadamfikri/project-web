import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Smartphone, Store, Headphones, ArrowRight } from "lucide-react";

export default function StorefrontHome() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-slate-100">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-5 h-14">
          <Link to="/" className="font-heading font-bold text-lg flex items-center gap-2">
            <span className="w-7 h-7 rounded-md bg-slate-900 text-white flex items-center justify-center text-xs">TH</span>
            Toko HP
          </Link>
          <Link to="/masuk">
            <Button variant="outline" size="sm" data-testid="btn-admin-login">Panel Admin</Button>
          </Link>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-5 py-14 md:py-20 grid md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-7">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500 mb-3">Toko Smartphone Terpercaya</p>
          <h1 className="font-heading font-bold text-4xl md:text-6xl leading-[1.05] tracking-tight">
            Smartphone resmi & inter, <br />
            <span className="text-[#FF5722]">dengan garansi toko.</span>
          </h1>
          <p className="mt-5 text-slate-600 max-w-xl text-base md:text-lg">
            Katalog, pemesanan online, dan pelacakan pesanan sedang kami bangun.
            Untuk sementara, hubungi kami via WhatsApp untuk pertanyaan stok dan harga.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button className="bg-slate-900 hover:bg-slate-800 h-11 px-6" data-testid="btn-wa-contact">
              Hubungi via WhatsApp <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Link to="/masuk">
              <Button variant="outline" className="h-11 px-6" data-testid="btn-login-cta">Masuk Admin</Button>
            </Link>
          </div>
          <div className="mt-8 flex items-center gap-6 text-sm text-slate-500">
            <span className="inline-flex items-center gap-1.5"><ShieldCheck className="w-4 h-4" /> IMEI terverifikasi</span>
            <span className="inline-flex items-center gap-1.5"><Store className="w-4 h-4" /> Unit asli</span>
            <span className="inline-flex items-center gap-1.5"><Headphones className="w-4 h-4" /> Layanan servis</span>
          </div>
        </div>
        <div className="md:col-span-5 relative">
          <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-xl bg-slate-100">
            <img
              src="https://images.unsplash.com/photo-1777028773178-7c7e991646d7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODF8MHwxfHNlYXJjaHw0fHxwcmVtaXVtJTIwc21hcnRwaG9uZSUyMGNsb3NlJTIwdXB8ZW58MHx8fHwxNzkxNDgyNjQ2fDA&ixlib=rb-4.1.0&q=85"
              alt="Smartphone"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-5 -left-5 bg-white border border-slate-100 rounded-xl p-4 shadow-lg hidden md:block">
            <p className="text-xs uppercase tracking-widest text-slate-500">Fase 1 Aktif</p>
            <p className="font-heading font-bold text-lg">Panel Admin & Inventaris</p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { icon: Smartphone, title: "Katalog Produk", desc: "Dalam pengembangan - Fase 2.", testId: "feat-catalog" },
            { icon: Store, title: "Checkout Online", desc: "Dalam pengembangan - Fase 3.", testId: "feat-checkout" },
            { icon: ShieldCheck, title: "Pelacakan Pesanan", desc: "Dalam pengembangan - Fase 3.", testId: "feat-tracking" },
          ].map((f) => (
            <div key={f.title} className="rounded-xl border border-slate-100 bg-white p-5" data-testid={f.testId}>
              <div className="w-9 h-9 rounded-md bg-slate-900 text-white flex items-center justify-center mb-3">
                <f.icon className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-semibold">{f.title}</h3>
              <p className="text-sm text-slate-500 mt-1">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-slate-100 py-8 mt-10">
        <div className="max-w-6xl mx-auto px-5 text-sm text-slate-500 flex items-center justify-between flex-wrap gap-2">
          <span>© {new Date().getFullYear()} Toko HP · Fase 1</span>
          <span>Semua perhitungan diverifikasi di server.</span>
        </div>
      </footer>
    </div>
  );
}
