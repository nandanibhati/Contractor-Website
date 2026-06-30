import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Building2, HardHat, Paintbrush, ShieldCheck, 
  ArrowUpRight, Phone, Mail, MapPin, Menu, X, 
  CheckCircle2, Star, Play, Calculator, 
  Layers, Compass, Ruler, Key, FileText
} from 'lucide-react';

// --- STYLING CONFIG ---
const THEME = {
  colors: {
    bgWarm: '#F8FAFC',
    secondaryBg: '#EEF2F7',
    gold: '#F4B400',
    steelBlue: '#2563EB',
    dark: '#0F172A',
    textMain: '#111827',
    emerald: '#22C55E'
  }
};

// --- DATA CONFIGURATIONS ---
const SERVICES_DATA = [
  { id: 'ext', title: 'Luxury House Extensions', icon: Building2, desc: 'Bespoke architectural expansions tailored to high-end residential parameters.', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80' },
  { id: 'loft', title: 'Premium Loft Conversions', icon: Layers, desc: 'Transforming structural voids into masterfully engineered living experiences.', img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80' },
  { id: 'kit', title: 'Architectural Kitchens', icon: Paintbrush, desc: 'State-of-the-art culinary hubs combining flawless ergonomics with luxury surfaces.', img: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80' },
  { id: 'bath', title: 'Wellness Bathrooms', icon: Compass, desc: 'Spa-grade structural sanctuaries constructed with premium water systems.', img: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=800&q=80' },
  { id: 'roof', title: 'High-Performance Roofing', icon: ShieldCheck, desc: 'Advanced weatherproofing and sustainable industrial roofing solutions.', img: 'https://images.unsplash.com/photo-1632759145351-1d592919f522?auto=format&fit=crop&w=800&q=80' },
  { id: 'comm', title: 'Commercial Development', icon: Building2, desc: 'Grade-A corporate environments built to complex regulatory specifications.', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80' },
];

const PROJECTS_DATA = [
  { title: 'The Mayfair Residence', loc: 'Mayfair, London', budget: '£2.4M', time: '14 Months', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80' },
  { title: 'Cotswolds Barn Conversion', loc: 'Chipping Campden', budget: '£1.8M', time: '11 Months', img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80' },
  { title: 'The Cheshire Glasshouse', loc: 'Alderley Edge', budget: '£3.1M', time: '18 Months', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80' }
];

const PROCESS_STEPS = [
  { phase: '01', title: 'Architectural Consultation', desc: 'Rigorous appraisal of programmatic needs, structural limitations, and master budget layouts.', icon: Ruler },
  { phase: '02', title: 'Planning & Engineering Validation', desc: 'Liaising seamlessly with UK local authorities to fast-track structural approvals and compliance.', icon: Compass },
  { phase: '03', title: 'Transparent Guaranteed Quotation', desc: 'Fully line-itemed commercial breakdown with integrated real-time global supply chain risk analysis.', icon: FileText },
  { phase: '04', title: 'Precision Construction Phase', desc: 'Execution by elite certified structural engineers utilizing world-class modern equipment.', icon: HardHat },
  { phase: '05', title: 'Strict Handover & Commissioning', desc: 'Multi-point performance inspections culminating in full warranty issuances and absolute client satisfaction.', icon: Key }
];

const MAP_PINS = [
  { city: 'London', status: '12 Active / 142 Completed', x: '72%', y: '82%' },
  { city: 'Manchester', status: '8 Active / 94 Completed', x: '52%', y: '50%' },
  { city: 'Birmingham', status: '6 Active / 76 Completed', x: '58%', y: '65%' },
  { city: 'Bristol', status: '4 Active / 48 Completed', x: '45%', y: '78%' },
  { city: 'Leeds', status: '5 Active / 63 Completed', x: '60%', y: '44%' }
];

// Custom inline SVG assets for premium architectural linework
function BlueprintGrid() {
  return (
    <div className="absolute inset-0 opacity-[0.015] pointer-events-none select-none mix-blend-overlay overflow-hidden">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
}

// --- MAIN APPLICATION HOOK ---
export default function PremiumConstructionWebsite() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [videoModal, setVideoModal] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#111827] font-sans antialiased selection:bg-[#F4B400] selection:text-[#0F172A] overflow-x-hidden relative">
      <BlueprintGrid />
      
      {/* GLOBAL NAVBAR */}
      <Navbar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      {/* HERO SECTION */}
      <Hero setVideoModal={setVideoModal} />

      {/* EXPERT METRICS STRIP */}
      <MetricsStrip />

      {/* LUXURY SERVICES CARD GRID */}
      <ServicesSection />

      {/* PREMIUM INTERACTIVE PROJECT SHOWCASE */}
      <ProjectShowcase />

      {/* INTERACTIVE ESTIMATOR & CALCULATOR */}
      <CalculatorSection />

      {/* STRUCTURAL ENGINEERING ARCHITECTURAL PROCESS */}
      <ProcessSection />

      {/* MAP PINS & REGIONAL DISTRIBUTION */}
      <MapSection />

      {/* TESTIMONIALS & TRUST MARKS */}
      <TestimonialsSection />

      {/* HIGH-CONVERSION CONTACT ARCHITECTURAL PORTAL */}
      <ContactSection />

      {/* FOOTER */}
      <Footer />

      {/* VIDEO LIGHTBOX MODAL */}
      <AnimatePresence>
        {videoModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setVideoModal(false)}
            className="fixed inset-0 bg-[#0F172A]/95 z-[9999] flex items-center justify-center p-4 backdrop-blur-xl"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="w-full max-w-5xl aspect-video bg-[#0F172A] rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setVideoModal(false)}
                className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white backdrop-blur-md transition-all z-10"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="w-full h-full flex flex-col items-center justify-center text-white p-8 text-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-[#F4B400]/20 flex items-center justify-center border border-[#F4B400]">
                  <HardHat className="w-10 h-10 text-[#F4B400] animate-pulse" />
                </div>
                <h3 className="text-2xl font-semibold tracking-tight">Vanguard Engineering Realization Cinematic</h3>
                <p className="text-gray-400 max-w-md text-sm">Interactive cinematic walk-through of current high-profile London commercial development sites.</p>
                <span className="text-xs tracking-widest text-[#F4B400] bg-[#F4B400]/10 px-3 py-1 rounded-full border border-[#F4B400]/20 uppercase font-medium">Stream Active</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- COMPONENT BLOCKS ---

function Navbar({ mobileMenuOpen, setMobileMenuOpen }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = ['Services', 'Projects', 'Process', 'Estimator', 'Testimonials', 'Contact'];

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-[#0F172A]/85 backdrop-blur-xl border-b border-white/5 py-4 shadow-xl' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center space-x-3 group">
          <div className="w-11 h-11 bg-gradient-to-tr from-[#F4B400] to-[#2563EB] rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-105">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight uppercase leading-none text-white">VANGUARD</span>
            <span className="text-[10px] tracking-[0.25em] font-medium text-[#F4B400] uppercase leading-none mt-1">Contractors UK</span>
          </div>
        </a>

        <div className="hidden lg:flex items-center space-x-1">
          {links.map((link) => (
            <a 
              key={link} 
              href={`#${link.toLowerCase()}`}
              className="text-sm font-medium tracking-wide text-white/80 hover:text-[#F4B400] px-4 py-2 rounded-lg transition-all hover:bg-white/5"
            >
              {link}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center space-x-4">
          <a href="tel:+442079460958" className="flex items-center space-x-2 text-white/90 text-sm font-medium hover:text-[#F4B400] transition-colors">
            <Phone className="w-4 h-4 text-[#F4B400]" />
            <span>+44 20 7946 0958</span>
          </a>
          <a href="#contact" className="relative inline-flex items-center justify-center px-5 py-2.5 rounded-xl font-semibold text-xs tracking-wider uppercase bg-[#F4B400] text-[#0F172A] hover:bg-[#F4B400]/90 transition-all shadow-lg hover:shadow-[#F4B400]/20 transform hover:-translate-y-0.5">
            Procure Consultation
          </a>
        </div>

        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden w-10 h-10 flex items-center justify-center bg-white/10 rounded-xl border border-white/10 text-white"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full inset-x-0 bg-[#0F172A] border-b border-white/10 shadow-2xl overflow-hidden lg:hidden"
          >
            <div className="px-6 py-8 flex flex-col space-y-4">
              {links.map((link) => (
                <a 
                  key={link} 
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-medium text-white/90 hover:text-[#F4B400] transition-colors"
                >
                  {link}
                </a>
              ))}
              <hr className="border-white/10 my-2" />
              <div className="flex flex-col space-y-4 pt-2">
                <a href="tel:+442079460958" className="flex items-center space-x-3 text-white/80">
                  <Phone className="w-5 h-5 text-[#F4B400]" />
                  <span className="text-sm font-medium">+44 20 7946 0958</span>
                </a>
                <a 
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3.5 bg-[#F4B400] text-[#0F172A] font-semibold rounded-xl text-sm tracking-wider uppercase shadow-lg"
                >
                  Procure Consultation
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function Hero({ setVideoModal }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);

  return (
    <section ref={containerRef} className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#0F172A] pt-24">
      {/* CINEMATIC BACKGROUND PARALLAX LAYERING */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0 select-none pointer-events-none scale-105">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/70 via-[#0F172A]/50 to-[#0F172A] z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-transparent to-[#0F172A]/40 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=2000&q=90" 
          alt="Premium construction site asset" 
          className="w-full h-full object-cover filter brightness-[0.65] contrast-[1.05]"
        />
      </motion.div>

      {/* FLOATING GEOMETRIC LUXURY LIGHT ACCENTS */}
      <div className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-[#2563EB]/10 rounded-full blur-[160px] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[35rem] h-[35rem] bg-[#F4B400]/5 rounded-full blur-[140px] mix-blend-screen pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-20 pt-12 pb-24">
        <motion.div style={{ y: textY }} className="max-w-4xl space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 backdrop-blur-md px-4 py-2 rounded-full shadow-inner"
          >
            <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
            <span className="text-white/80 font-medium tracking-wide text-xs uppercase">Elite Tier UK Main Contractor</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl sm:text-6xl lg:text-8xl font-extrabold text-white tracking-tight leading-[1.05]"
          >
            Building Tomorrow, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F4B400] via-[#F5C242] to-white">
              With Excellence Today.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg sm:text-xl text-gray-300 max-w-2xl leading-relaxed font-light"
          >
            Premium construction, structural engineering, high-end renovations, and architectural extensions delivered across London and the Home Counties to institutional parameters.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4"
          >
            <a href="#contact" className="group relative inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#F4B400] text-[#0F172A] font-bold tracking-wide uppercase text-xs shadow-xl shadow-[#F4B400]/10 hover:shadow-[#F4B400]/20 hover:bg-[#F4B400]/90 transition-all transform hover:-translate-y-0.5">
              <span>Initiate Free Estimate</span>
              <ArrowUpRight className="w-4 h-4 ml-2 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <a href="#projects" className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 backdrop-blur-md text-white font-bold tracking-wide uppercase text-xs transition-all">
              Examine Portfolios
            </a>
            <button 
              type="button"
              onClick={() => setVideoModal(true)}
              className="inline-flex items-center justify-center space-x-3 text-white hover:text-[#F4B400] group transition-colors px-4 py-2"
            >
              <div className="w-11 h-11 rounded-full bg-white/5 border border-white/10 group-hover:border-[#F4B400] flex items-center justify-center backdrop-blur-md transition-all">
                <Play className="w-4 h-4 fill-current text-white group-hover:text-[#F4B400] ml-0.5 transition-colors" />
              </div>
              <span className="text-xs font-bold tracking-widest uppercase">Play Site Reel</span>
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* RE-ENTRANT EDGE CURVATURE OVERLAY */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#F8FAFC] to-transparent pointer-events-none" />
    </section>
  );
}

function MetricsStrip() {
  const metrics = [
    { value: '20+', label: 'Years Structural Experience' },
    { value: '650+', label: 'Elite Projects Commissioned' },
    { value: '98%', label: 'Audited Client Satisfaction' },
    { value: '£50M+', label: 'Capital Delivery Insured' }
  ];

  return (
    <div className="relative z-30 -mt-16 max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 bg-white border border-gray-200/60 p-6 sm:p-8 rounded-3xl shadow-xl backdrop-blur-xl">
        {metrics.map((m, idx) => (
          <div key={idx} className="flex flex-col space-y-1 p-4 rounded-2xl hover:bg-[#EEF2F7]/50 transition-colors">
            <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A] font-mono">{m.value}</span>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{m.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ServicesSection() {
  return (
    <section id="services" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
          <div className="space-y-4 max-w-2xl">
            <span className="text-xs font-bold tracking-[0.25em] text-[#2563EB] uppercase block">Core Competencies</span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#0F172A] tracking-tight">Integrated Construction Architecture</h2>
          </div>
          <p className="text-gray-500 max-w-md font-light text-base leading-relaxed">
            Delivering multidisciplinary structural engineering, luxury residential transformations, and grade-A commercial environments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_DATA.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div 
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                className="group bg-white rounded-3xl border border-gray-200/70 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col justify-between"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity z-10" />
                  <img 
                    src={service.img} 
                    alt={service.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 filter brightness-[0.95]"
                  />
                  <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-white/90 backdrop-blur-md shadow-lg flex items-center justify-center z-20 text-[#0F172A] group-hover:bg-[#0F172A] group-hover:text-white transition-all">
                    <IconComponent className="w-5 h-5" />
                  </div>
                </div>

                <div className="p-8 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold tracking-tight text-[#0F172A] group-hover:text-[#2563EB] transition-colors">{service.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed font-light">{service.desc}</p>
                  </div>
                  
                  <div className="pt-4 flex items-center justify-between border-t border-gray-100 mt-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#0F172A]/70 group-hover:text-[#F4B400] transition-colors">Specifications</span>
                    <div className="w-8 h-8 rounded-full bg-[#EEF2F7] flex items-center justify-center text-[#0F172A] group-hover:bg-[#F4B400] group-hover:text-[#0F172A] transition-all">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProjectShowcase() {
  return (
    <section id="projects" className="py-32 bg-[#0F172A] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,243,0.08),transparent_45%)]" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div className="space-y-4">
            <span className="text-xs font-bold tracking-[0.25em] text-[#F4B400] uppercase block">Selected Legacy Folio</span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight">Monuments of Architectural Integrity</h2>
          </div>
          <p className="text-gray-400 max-w-sm font-light text-sm leading-relaxed">
            A precise exploration into real property assets deployed under our strict engineering stewardship across high-value markets.
          </p>
        </div>

        <div className="space-y-16">
          {PROJECTS_DATA.map((proj, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="group relative bg-white/5 border border-white/10 rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0 hover:border-white/20 transition-all duration-500"
            >
              <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto w-full overflow-hidden bg-white/5">
                <img 
                  src={proj.img} 
                  alt={proj.title} 
                  className="w-full h-full object-cover transform group-hover:scale-102 transition-transform duration-700"
                />
              </div>

              <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between space-y-8 backdrop-blur-md">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-xs font-medium text-[#F4B400] uppercase tracking-widest">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{proj.loc}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white group-hover:text-[#F4B400] transition-colors">{proj.title}</h3>
                </div>

                <div className="grid grid-cols-2 gap-6 py-6 border-y border-white/10">
                  <div className="space-y-1">
                    <span className="text-[10px] tracking-widest text-gray-400 uppercase font-medium">Capital Cost Allocation</span>
                    <p className="text-xl font-bold text-white font-mono">{proj.budget}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] tracking-widest text-gray-400 uppercase font-medium">Delivery Metrics</span>
                    <p className="text-xl font-bold text-white font-mono">{proj.time}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-wider text-gray-300 uppercase">Examine Full Case Audit</span>
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-[#F4B400] group-hover:text-[#0F172A] transition-all">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CalculatorSection() {
  const [service, setService] = useState('ext');
  const [sqm, setSqm] = useState(60);
  const [spec, setSpec] = useState('luxury');
  const [estimate, setEstimate] = useState({ low: 0, high: 0 });

  useEffect(() => {
    let baseRate = 1850; 
    if (service === 'loft') baseRate = 1600;
    if (service === 'kit') baseRate = 2200;
    if (service === 'comm') baseRate = 3100;

    let specMultiplier = 1.0;
    if (spec === 'ultra') specMultiplier = 1.45;
    if (spec === 'standard') specMultiplier = 0.85;

    const computedBase = sqm * baseRate * specMultiplier;
    setEstimate({
      low: Math.round((computedBase * 0.9) / 5000) * 5000,
      high: Math.round((computedBase * 1.15) / 5000) * 5000
    });
  }, [service, sqm, spec]);

  return (
    <section id="estimator" className="py-32 relative bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <span className="text-xs font-bold tracking-[0.25em] text-[#2563EB] uppercase block">Parametric Modeler</span>
          <h2 className="text-3xl sm:text-5xl font-black text-[#0F172A] tracking-tight">Instant Commercial Capital Modeler</h2>
          <p className="text-gray-500 font-light text-base max-w-xl mx-auto">
            Acquire a calibrated real-time estimation baseline of algorithmic building budgets based on current UK supply constraints.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-white rounded-3xl border border-gray-200/80 shadow-xl overflow-hidden p-8 sm:p-12">
          {/* CONTROL RENDERER */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">Structural Scope Parameter</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'ext', label: 'House Extension' },
                  { id: 'loft', label: 'Loft Conversion' },
                  { id: 'kit', label: 'Kitchen Archetype' },
                  { id: 'comm', label: 'Commercial Structural' }
                ].map((opt) => (
                  <button 
                    key={opt.id}
                    type="button"
                    onClick={() => setService(opt.id)}
                    className={`p-4 rounded-xl text-left text-sm font-semibold border transition-all ${
                      service === opt.id 
                        ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-md' 
                        : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">Target Internal Area Allocation</label>
                <span className="text-sm font-bold font-mono text-[#2563EB]">{sqm} m²</span>
              </div>
              <input 
                type="range" 
                min="15" 
                max="300" 
                value={sqm} 
                onChange={(e) => setSqm(Number(e.target.value))}
                className="w-full accent-[#2563EB] h-2 bg-gray-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                <span>15 m²</span>
                <span>150 m²</span>
                <span>300 m²</span>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">Specification Tier Level</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'standard', title: 'Grade-B Premium', desc: 'Superior fitout' },
                  { id: 'luxury', title: 'High-End Luxury', desc: 'Architectural spec' },
                  { id: 'ultra', title: 'Ultra Exclusive', desc: 'One-off masterwork' }
                ].map((tier) => (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setSpec(tier.id)}
                    className={`p-4 rounded-xl text-left border flex flex-col transition-all ${
                      spec === tier.id 
                        ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-md' 
                        : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <span className="text-sm font-bold leading-none">{tier.title}</span>
                    <span className={`text-[10px] mt-1 opacity-80 ${spec === tier.id ? 'text-white' : 'text-gray-400'}`}>{tier.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ESTIMATION BOX OUTPUT */}
          <div className="lg:col-span-5 bg-[#EEF2F7] rounded-2xl p-8 flex flex-col justify-between border border-gray-300/40 relative overflow-hidden">
            <div className="space-y-6 relative z-10">
              <div className="inline-flex items-center space-x-2 bg-[#0F172A]/5 border border-[#0F172A]/10 px-3 py-1 rounded-full">
                <Calculator className="w-3.5 h-3.5 text-[#2563EB]" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0F172A]/80">Algorithmic Budget Baseline</span>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold block">Estimated Capital Range</span>
                <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A] font-mono">
                  £{estimate.low.toLocaleString()} – £{estimate.high.toLocaleString()}
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-gray-300/60">
                <div className="flex items-start space-x-2 text-xs text-gray-500">
                  <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
                  <span>Includes dynamic materials procurement validation.</span>
                </div>
                <div className="flex items-start space-x-2 text-xs text-gray-500">
                  <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
                  <span>Subject to physical topographic site exploration variables.</span>
                </div>
              </div>
            </div>

            <div className="pt-8 relative z-10">
              <a href="#contact" className="w-full text-center inline-flex items-center justify-center py-4 bg-[#0F172A] text-white hover:bg-[#0F172A]/90 font-bold rounded-xl text-xs tracking-widest uppercase shadow-xl transition-all transform hover:-translate-y-0.5">
                Lock In Structural Quote Audit
              </a>
              <p className="text-[10px] text-center text-gray-400 mt-3 font-medium tracking-wide">
                Guaranteed response timelines under strict nondisclosure frameworks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section id="process" className="py-32 bg-[#0F172A] text-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-24 space-y-4">
          <span className="text-xs font-bold tracking-[0.25em] text-[#F4B400] uppercase block">Rigorous Delivery Architecture</span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight">The Lifecycle of Absolute Certainty</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 relative">
          {PROCESS_STEPS.map((step, idx) => {
            const IconComp = step.icon;
            return (
              <div key={idx} className="space-y-6 relative group">
                <div className="flex items-baseline justify-between">
                  <span className="text-4xl font-black font-mono tracking-tight text-white/10 group-hover:text-[#F4B400]/20 transition-colors">{step.phase}</span>
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#F4B400] group-hover:bg-[#F4B400] group-hover:text-[#0F172A] transition-all">
                    <IconComp className="w-4 h-4" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold tracking-tight text-white">{step.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed font-light">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function MapSection() {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-bold tracking-[0.25em] text-[#2563EB] uppercase block">Regional Ubiquity</span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#0F172A] tracking-tight leading-tight">Geographic Domain & Coverage</h2>
            <p className="text-gray-500 font-light text-base leading-relaxed">
              We manage dedicated operational logisticians situated within critical regional infrastructure centers, securing fast equipment deployment.
            </p>
            <div className="space-y-4 pt-4">
              {['Greater London Operations Hub', 'Midlands & Northwest Civil Grid', 'Southern Regional Engineering Council'].map((item, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <div className="w-5 h-5 rounded-full bg-[#2563EB]/10 flex items-center justify-center text-[#2563EB]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm font-semibold text-[#0F172A]">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#EEF2F7] rounded-3xl p-8 border border-gray-300/40 relative aspect-square max-w-xl mx-auto w-full flex items-center justify-center">
            {/* STYLIZED ABSTRACT ARCHITECTURAL UK MAP PLACEHOLDER */}
            <div className="absolute inset-8 rounded-2xl border border-dashed border-gray-400/50 flex items-center justify-center">
              <span className="text-[10px] tracking-[0.3em] font-bold text-gray-400 uppercase select-none">UK Civil Grid Matrix</span>
            </div>
            
            {MAP_PINS.map((pin, i) => (
              <div 
                key={i} 
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                style={{ left: pin.x, top: pin.y }}
              >
                <div className="w-4 h-4 rounded-full bg-[#2563EB] flex items-center justify-center shadow-lg relative cursor-pointer transform group-hover:scale-125 transition-transform">
                  <span className="absolute inset-0 rounded-full bg-[#2563EB] opacity-70 animate-ping" />
                </div>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-[#0F172A] text-white text-[10px] font-bold px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl border border-white/10">
                  <p className="text-white">{pin.city}</p>
                  <p className="text-gray-400 text-[9px] font-normal">{pin.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const reviews = [
    { name: 'Sir Alistair Vance', role: 'Vance Property Group', text: 'Vanguard completed our Mayfair portfolio refurbishment ahead of timeline requirements. Their technical parameters are flawless.', rating: 5 },
    { name: 'Dr. Helena Roy', role: 'Residential Commission', text: 'The structural glasshouse engineering demands were immense. Vanguard operated with perfect architectural precision throughout.', rating: 5 }
  ];

  return (
    <section id="testimonials" className="py-32 bg-[#F8FAFC] relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-20 space-y-4">
          <span className="text-xs font-bold tracking-[0.25em] text-[#2563EB] uppercase block">Independent Appraisals</span>
          <h2 className="text-3xl sm:text-5xl font-black text-[#0F172A] tracking-tight">Verified Institutional Trust</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {reviews.map((rev, idx) => (
            <div key={idx} className="bg-white p-8 sm:p-10 rounded-3xl border border-gray-200/80 shadow-md flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-1">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-[#F4B400]" />
                  ))}
                </div>
                <p className="text-gray-600 text-base font-light italic leading-relaxed">"{rev.text}"</p>
              </div>
              <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                <div>
                  <h4 className="text-sm font-bold text-[#0F172A]">{rev.name}</h4>
                  <p className="text-xs text-gray-400 font-medium">{rev.role}</p>
                </div>
                <span className="text-[10px] tracking-widest uppercase font-bold text-[#22C55E] bg-[#22C55E]/10 px-2.5 py-1 rounded-md">Verified Account</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="py-32 bg-[#0F172A] text-white relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-bold tracking-[0.25em] text-[#F4B400] uppercase block">Procurement Inquiries</span>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-none">Initiate Your Commission</h2>
              <p className="text-gray-400 font-light text-sm max-w-sm leading-relaxed">
                Connect directly with our engineering estimation council for premium structural deployments.
              </p>
            </div>

            <div className="space-y-4 pt-4">
              <div className="flex items-center space-x-4">
                <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center text-[#F4B400]">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Secure Wire Link</p>
                  <p className="text-sm font-semibold text-white">tenders@vanguardcontractors.co.uk</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center text-[#F4B400]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Corporate Secretariat</p>
                  <p className="text-sm font-semibold text-white">One Canada Square, Canary Wharf, London</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <form onSubmit={(e) => e.preventDefault()} className="bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-10 space-y-6 backdrop-blur-xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-gray-300">Principal Name</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F4B400] transition-colors" placeholder="e.g. Alistair Vance" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-gray-300">Corporate Entity</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F4B400] transition-colors" placeholder="Optional" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-gray-300">Secure Correspondence Email</label>
                  <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F4B400] transition-colors" placeholder="vance@corporation.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-gray-300">Project Budget Range</label>
                  <select className="w-full bg-[#0F172A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F4B400] transition-colors appearance-none">
                    <option>£100k – £500k</option>
                    <option>£500k – £2M</option>
                    <option>£2M – £10M+</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-wider text-gray-300">Project Structural Parameters & Scope</label>
                <textarea rows="4" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F4B400] transition-colors resize-none" placeholder="Detail parameters, schedules, site realities..."></textarea>
              </div>

              <button type="submit" className="w-full py-4 bg-[#F4B400] text-[#0F172A] font-bold rounded-xl text-xs tracking-widest uppercase shadow-xl hover:bg-[#F4B400]/90 transition-all transform hover:-translate-y-0.5">
                Transmit Dossier to Estimation Council
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#0F172A] text-white pt-16 pb-12 border-t border-white/5 relative z-20">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-12 border-b border-white/5">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#F4B400] rounded-xl flex items-center justify-center">
              <Building2 className="w-5 h-5 text-[#0F172A]" />
            </div>
            <div>
              <span className="text-base font-bold tracking-tight uppercase block">VANGUARD</span>
              <span className="text-[9px] tracking-widest text-[#F4B400] font-semibold uppercase">Contractors United Kingdom</span>
            </div>
          </div>
          <p className="text-xs text-gray-400 font-light max-w-xs md:text-right">
            Premium corporate master-builders registered under regulatory frameworks of England and Wales.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-gray-500 font-medium tracking-wider uppercase">
          <p>© 2026 Vanguard Main Contractors UK Ltd. All Engineering Rights Reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">Regulatory Frameworks</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Allocation</a>
          </div>
        </div>
      </div>
    </footer>
  );
}