import React, { useState, useEffect, useRef, useMemo, memo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Building2, HardHat, Paintbrush, ShieldCheck, 
  ArrowUpRight, Phone, MapPin, Menu, X, 
  CheckCircle2, Star, Play, Layers, Compass, 
  Ruler, Key, FileText, Upload, Image as ImageIcon, 
  MessageCircle, Clock, ChevronRight, Shield, Trash2, Calendar,
  Eye
} from 'lucide-react';

// ==========================================
// PREMIUM CONSTANTS & BRAND ASSETS
// ==========================================

const TRUST_LOGOS = [
  { name: 'Gas Safe', desc: 'Registered Infrastructure' },
  { name: 'TrustMark', desc: 'Government Endorsed' },
  { name: 'FMB Member', desc: 'Master Builders Federation' },
  { name: 'Checkatrade', desc: 'Vetted & Approved 9.9/10' },
  { name: 'Rated People', desc: 'Quality Authenticated' },
  { name: 'Google Guaranteed', desc: 'Corporate Backed Protection' },
  { name: 'NICEIC', desc: 'Elite Electrical Certified' },
  { name: 'Public Liability', desc: '£10M Comprehensive Insurance' }
];

const GALLERY_ITEMS = [
  { id: 1, cat: 'Extension', title: 'The Glasshouse Pavilions', loc: 'Kensington, London', year: '2025', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', aspect: 'aspect-[4/5]' },
  { id: 2, cat: 'Kitchen', title: 'Architectural Culinary Hub', loc: 'Chelsea, London', year: '2026', img: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80', aspect: 'aspect-[4/3]' },
  { id: 3, cat: 'Bathroom', title: 'Wellness Structural Sanctuary', loc: 'Belgravia, London', year: '2025', img: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=800&q=80', aspect: 'aspect-[1/1]' },
  { id: 4, cat: 'House', title: 'Masterwork Residential Conversion', loc: 'Richmond, London', year: '2025', img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80', aspect: 'aspect-[4/5]' },
  { id: 5, cat: 'Roof', title: 'High-Performance Slate Engineering', loc: 'Hampstead, London', year: '2025', img: 'https://images.unsplash.com/photo-1632759145351-1d592919f522?auto=format&fit=crop&w=800&q=80', aspect: 'aspect-[4/3]' },
  { id: 6, cat: 'Commercial', title: 'Grade-A Corporate Workspace', loc: 'City of London', year: '2026', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80', aspect: 'aspect-[16/9]' },
];

const BEFORE_AFTER_DATA = [
  { id: 'kitchen', label: 'Kitchen Transformation', before: 'https://images.unsplash.com/photo-1565183997392-2f6f122e5912?auto=format&fit=crop&w=1200&q=80', after: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80' },
  { id: 'bathroom', label: 'Bathroom Transformation', before: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80', after: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1200&q=80' },
  { id: 'roof', label: 'Roof Structural Rebuild', before: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80', after: 'https://images.unsplash.com/photo-1632759145351-1d592919f522?auto=format&fit=crop&w=1200&q=80' },
  { id: 'extension', label: 'Bespoke Ground Extension', before: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80', after: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80' }
];

const PROCESS_STEPS = [
  { phase: '01', title: 'Book Survey', desc: 'Secure an architectural evaluation via our digital platform or direct phone loops.', icon: FileText },
  { phase: '02', title: 'Site Visit', desc: 'Rigorous physical assessment of spatial parameters, metrics, and structural boundaries.', icon: Ruler },
  { phase: '03', title: 'Quotation', desc: 'Comprehensive, itemised guaranteed cost layout without hidden contingencies.', icon: Compass },
  { phase: '04', title: 'Planning Compliance', desc: 'Liaising natively with UK local authorities to secure full structural compliance.', icon: ShieldCheck },
  { phase: '05', title: 'Construction Phase', desc: 'Flawless execution under elite engineering supervisors using superior materials.', icon: HardHat },
  { phase: '06', title: 'Rigorous Inspection', desc: 'Multi-tiered structural testing metrics to secure absolute sign-off validation.', icon: Shield },
  { phase: '07', title: 'Premium Aftercare', desc: 'Handover of our 15-year platinum master warranty alongside post-build backup.', icon: Key }
];

const REVIEWS_DATA = [
  { id: 1, name: 'Lord Sterling Thorne', date: '6 days ago', text: 'Vanguard completed our residential extension ahead of schedule. Their technical precision is unmatched and the site logistics execution was flawlessly clean.', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80', helpfulCount: 14, verified: true },
  { id: 2, name: 'Lady Genevieve Rose', date: '3 weeks ago', text: 'The structural glasshouse parameters required deep architectural ingenuity. Vanguard operated with absolute compliance thresholds. Truly a premium £15k+ caliber build.', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80', helpfulCount: 8, verified: true },
  { id: 3, name: 'Alistair Vance Esq.', date: '1 month ago', text: 'Outstanding loft conversion engineering in Richmond. Perfect transparency on materials workflows and structural execution time frames. Fully verified master-builders.', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80', helpfulCount: 22, verified: true }
];

// ==========================================
// PERFORMANCE OPTIMISED TICKER (MEMOIZED)
// ==========================================

const TrustTicker = memo(() => {
  return (
    <div className="w-full bg-white border-y border-gray-200/80 py-8 overflow-hidden relative select-none">
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#FDFBF7] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#FDFBF7] to-transparent z-10 pointer-events-none" />
      <div className="flex whitespace-nowrap items-center group">
        <div className="flex space-x-12 animate-marquee inline-block group-hover:[animation-play-state:paused]">
          {[...TRUST_LOGOS, ...TRUST_LOGOS].map((logo, idx) => (
            <div key={idx} className="inline-flex flex-col items-center justify-center min-w-[200px] bg-[#F4F2EE]/40 border border-gray-200/60 rounded-xl px-5 py-3 shadow-xs hover:border-[#D4AF37] transition-colors duration-300">
              <span className="text-xs font-black tracking-wider text-[#0B0F19] uppercase">{logo.name}</span>
              <span className="text-[9px] text-[#D4AF37] tracking-widest font-bold uppercase mt-0.5">{logo.desc}</span>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes bounceSubtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .animate-marquee {
          display: flex;
          animation: marquee 35s linear infinite;
        }
        .animate-bounce-subtle {
          animation: bounceSubtle 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
});
TrustTicker.displayName = "TrustTicker";

// ==========================================
// MAIN RE-ARCHITECTED ARCHITECTURAL LAYER
// ==========================================

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [videoModal, setVideoModal] = useState(false);
  const [surveyModal, setSurveyModal] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#111827] font-sans antialiased selection:bg-[#D4AF37] selection:text-[#0B0F19] overflow-x-hidden relative">
      
      {/* PERSISTENT HEADER NAVIGATION */}
      <Navbar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} setSurveyModal={setSurveyModal} />

      {/* ULTRA-PREMIUM PARALLAX VIDEO HERO */}
      <Hero setVideoModal={setVideoModal} setSurveyModal={setSurveyModal} />

      {/* PREMIUM TRUST MARQUEE */}
      <TrustTicker />

      {/* RE-ARCHITECTED MASONRY PROJECT GALLERY */}
      <ProjectGallery setLightboxImage={setLightboxImage} />

      {/* INTERACTIVE COMPONENT BEFORE/AFTER TRANSFORMER */}
      <BeforeAfterSection />

      {/* ENHANCED DRAG & DROP PHOTO PORTAL PORTAL */}
      <PhotoUploadSurveySection />

      {/* CAPABILITIES & SERVICES SPECIFICATION MAP */}
      <ServicesSection />

      {/* SEVEN PHASE LIFECYCLE TIMELINE */}
      <ProcessSection />

      {/* GOOGLE BUSINESS CONVERSION FEED */}
      <GoogleReviewsSection />

      {/* CONVERSION-OPTIMIZED CONTACT ARCHITECTURE */}
      <ContactSection setSurveyModal={setSurveyModal} />

      {/* EXPANDED LUXURY FOOTER ENGINE */}
      <Footer />

      {/* PERSISTENT HIGH-CONVERSION CTA SYSTEMS */}
      <StickyCTABars setSurveyModal={setSurveyModal} />

      {/* SYSTEM ARCHITECTURE INTERACTIVE MODAL POOLS */}
      <VideoModal videoModal={videoModal} setVideoModal={setVideoModal} />
      <SurveyModal surveyModal={surveyModal} setSurveyModal={setSurveyModal} />
      <LightboxImage lightboxImage={lightboxImage} setLightboxImage={setLightboxImage} />
    </div>
  );
}

// ==========================================
// NAVIGATION BACKBONE COMPONENT
// ==========================================

function Navbar({ mobileMenuOpen, setMobileMenuOpen, setSurveyModal }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = ['Gallery', 'Transformation', 'Survey', 'Services', 'Process', 'Reviews', 'Contact'];

  return (
    <motion.nav 
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed top-0 inset-x-0 z-[999] transition-all duration-500 ${
        scrolled 
          ? 'bg-[#0B0F19]/95 backdrop-blur-2xl border-b border-white/10 py-3 shadow-xl' 
          : 'bg-gradient-to-b from-[#0B0F19]/90 via-[#0B0F19]/30 to-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center space-x-3 group">
          <div className="w-11 h-11 bg-gradient-to-tr from-[#D4AF37] to-[#1E3A8A] rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-105">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-black tracking-tight text-white uppercase leading-none">VANGUARD</span>
            <span className="text-[9px] tracking-[0.3em] font-bold text-[#D4AF37] uppercase leading-none mt-1">Contractors UK</span>
          </div>
        </a>

        <div className="hidden xl:flex items-center space-x-1">
          {links.map((link) => (
            <a 
              key={link} 
              href={`#${link.toLowerCase()}`}
              className="text-[11px] font-bold tracking-widest uppercase text-white/80 hover:text-[#D4AF37] px-4 py-2.5 rounded-xl transition-all hover:bg-white/5"
            >
              {link}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center space-x-6">
          <a href="tel:+442079460958" className="flex items-center space-x-2 text-white hover:text-[#D4AF37] transition-colors text-xs font-black uppercase tracking-wider">
            <Phone className="w-4 h-4 text-[#D4AF37] animate-pulse" />
            <span>+44 20 7946 0958</span>
          </a>
          <button 
            type="button"
            onClick={() => setSurveyModal(true)} 
            className="cursor-pointer relative inline-flex items-center justify-center px-6 py-3 rounded-xl font-black text-[11px] tracking-widest uppercase bg-[#D4AF37] text-[#0B0F19] hover:bg-white hover:text-[#0B0F19] transition-all duration-300 shadow-md hover:shadow-[#D4AF37]/20 transform hover:-translate-y-0.5"
          >
            Request Quote
          </button>
        </div>

        <button 
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="xl:hidden w-11 h-11 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl text-white backdrop-blur-md"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full inset-x-0 bg-[#0B0F19]/98 border-b border-white/10 shadow-2xl overflow-hidden xl:hidden backdrop-blur-3xl"
          >
            <div className="px-6 py-8 flex flex-col space-y-4">
              {links.map((link) => (
                <a 
                  key={link} 
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs font-bold tracking-widest text-white/90 hover:text-[#D4AF37] transition-colors uppercase py-2"
                >
                  {link}
                </a>
              ))}
              <hr className="border-white/5 my-2" />
              <div className="flex flex-col space-y-4 pt-2">
                <a href="tel:+442079460958" className="flex items-center space-x-3 text-white font-bold uppercase tracking-wider text-xs">
                  <Phone className="w-4 h-4 text-[#D4AF37]" />
                  <span>+44 20 7946 0958</span>
                </a>
                <button 
                  type="button"
                  onClick={() => { setMobileMenuOpen(false); setSurveyModal(true); }}
                  className="w-full text-center py-4 bg-[#D4AF37] text-[#0B0F19] font-black rounded-xl text-xs tracking-widest uppercase shadow-lg"
                >
                  Request Quote
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// ==========================================
// HERO SECTION SYSTEM WITH OVERLAY & ANIMATION
// ==========================================

function Hero({ setVideoModal, setSurveyModal }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const cards = [
    { text: '20+ Years Experience', detail: 'Master Engineering' },
    { text: '650+ Completed Projects', detail: 'Executed Across UK' },
    { text: '4.9 Google Rating', detail: '180+ Audited Reviews' },
    { text: 'Fully Insured', detail: '£10M Comprehensive Cover' },
    { text: 'Free Site Survey', detail: 'Zero Structural Obligation' }
  ];

  return (
    <section ref={containerRef} className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#0B0F19] pt-20">
      
      {/* CINEMATIC VIDEO LAYERING ENGINE */}
      <motion.div style={{ y: videoY, opacity: opacityFade }} className="absolute inset-0 z-0 scale-102 select-none pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F19]/95 via-[#0B0F19]/40 to-[#0B0F19] z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F19] via-transparent to-[#0B0F19]/80 z-10" />
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover filter brightness-[0.38] contrast-[1.05]"
          poster="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-architect-drawing-a-blueprint-layout-42174-large.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* LUXURY NEON LIGHT EMISSION PLACEMENT */}
      <div className="absolute top-1/4 left-1/4 w-[45rem] h-[45rem] bg-[#1E3A8A]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[35rem] h-[35rem] bg-[#D4AF37]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-20 pt-12 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          <div className="lg:col-span-7 space-y-8 text-left">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center space-x-2.5 bg-white/5 border border-white/10 backdrop-blur-xl px-4 py-2 rounded-full shadow-inner"
            >
              <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-ping" />
              <span className="text-white/90 font-black tracking-widest text-[10px] uppercase">Elite Tier Corporate Contractor</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-6xl xl:text-7xl font-black text-white tracking-tight leading-[1.05]"
            >
              Building Tomorrow, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F5C242] to-white">
                With Excellence Today.
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg text-gray-300 max-w-xl font-light leading-relaxed"
            >
              Premium construction, structural engineering, and master residential transformations executed to verified institutional parameters across the UK.
            </motion.p>

            {/* HIGH CONVERSION TRIGGER MATRIX */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4"
            >
              <button 
                type="button"
                onClick={() => setSurveyModal(true)}
                className="cursor-pointer group relative inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#D4AF37] text-[#0B0F19] font-black tracking-widest uppercase text-xs shadow-xl hover:bg-white hover:text-[#0B0F19] transition-all transform hover:-translate-y-0.5"
              >
                <span>Book Free Site Visit</span>
                <ArrowUpRight className="w-4 h-4 ml-2 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
              
              <a 
                href="#survey" 
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 backdrop-blur-xl text-white font-black tracking-widest uppercase text-xs transition-all"
              >
                Request Consultation
              </a>

              <button 
                type="button"
                onClick={() => setVideoModal(true)}
                className="cursor-pointer inline-flex items-center justify-center space-x-2 text-white/80 hover:text-[#D4AF37] group transition-colors py-2"
              >
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 group-hover:border-[#D4AF37] flex items-center justify-center backdrop-blur-xl transition-all">
                  <Play className="w-3.5 h-3.5 fill-current text-white group-hover:text-[#D4AF37] ml-0.5" />
                </div>
                <span className="text-[10px] font-black tracking-widest uppercase">Site Reel</span>
              </button>
            </motion.div>
          </div>

          {/* STACKED HIGH-END GLASSMORPHISM CARD COMPONENT INTERACTION */}
          <div className="lg:col-span-5 relative flex flex-col space-y-4 justify-center lg:items-end">
            {cards.map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + idx * 0.08, type: 'spring', stiffness: 90 }}
                whileHover={{ scale: 1.03, x: -8 }}
                className="bg-white/[0.03] border border-white/10 backdrop-blur-xl p-4 rounded-2xl shadow-2xl flex items-center space-x-4 w-full max-w-sm transition-all duration-300 group hover:border-[#D4AF37]/40"
              >
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#0B0F19] transition-all">
                  <CheckCircle2 className="w-5 h-5 fill-none" />
                </div>
                <div>
                  <h4 className="text-white text-xs font-black uppercase tracking-wider">{card.text}</h4>
                  <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest mt-0.5">{card.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

// ==========================================
// TRUE MASONRY PROJECT GALLERY COMPONENT
// ==========================================

function ProjectGallery({ setLightboxImage }) {
  const filters = ['All', 'House', 'Roof', 'Kitchen', 'Bathroom', 'Garden', 'Extension', 'Garage', 'Commercial'];
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredItems = useMemo(() => {
    if (activeFilter === 'All') return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter(item => item.cat === activeFilter);
  }, [activeFilter]);

  return (
    <section id="gallery" className="py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex flex-col xl:flex-row xl:items-end justify-between mb-16 gap-8">
          <div className="space-y-3">
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#1E3A8A] block">Monuments of Execution</span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#0B0F19] tracking-tight">Premium Project Gallery</h2>
          </div>
          
          <div className="flex flex-wrap gap-1.5 bg-[#F4F2EE] p-1.5 rounded-2xl overflow-x-auto max-w-full">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setActiveFilter(f)}
                className={`text-[10px] font-black tracking-widest px-4 py-2.5 rounded-xl uppercase transition-all whitespace-nowrap cursor-pointer ${
                  activeFilter === f 
                    ? 'bg-[#0B0F19] text-white shadow-md' 
                    : 'text-gray-500 hover:text-[#0B0F19]'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* MASONRY SYSTEM IMPLEMENTATION LAYOUT RULES */}
        <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className={`break-inside-avoid relative rounded-3xl overflow-hidden border border-gray-100 shadow-md group bg-[#FDFBF7] ${item.aspect}`}
              >
                <div className="relative w-full h-full overflow-hidden cursor-pointer" onClick={() => setLightboxImage(item.img)}>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/95 via-[#0B0F19]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-10 flex flex-col justify-end p-8" />
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    loading="lazy"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  
                  <div className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-lg transform translate-y-2 group-hover:translate-y-0 text-[#0B0F19]">
                    <Eye className="w-4 h-4" />
                  </div>

                  <div className="absolute inset-x-0 bottom-0 z-20 p-8 opacity-0 group-hover:opacity-100 transition-all duration-400 transform translate-y-4 group-hover:translate-y-0 flex justify-between items-end text-white pointer-events-none">
                    <div className="space-y-1.5">
                      <span className="text-[9px] tracking-widest text-[#D4AF37] font-black uppercase">{item.cat}</span>
                      <h4 className="text-base font-bold tracking-tight leading-tight">{item.title}</h4>
                      <p className="text-xs text-gray-300 font-light flex items-center"><MapPin className="w-3 h-3 mr-1 text-[#D4AF37]" /> {item.loc}</p>
                    </div>
                    <span className="text-[10px] font-mono font-bold tracking-wider text-gray-300 bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-lg">{item.year}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

// ==========================================
// BEFORE/AFTER ENHANCED INTERACTIVE SLIDER
// ==========================================

function BeforeAfterSection() {
  const [activeTab, setActiveTab] = useState('kitchen');
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef(null);

  const currentPair = useMemo(() => BEFORE_AFTER_DATA.find(d => d.id === activeTab) || BEFORE_AFTER_DATA[0], [activeTab]);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let position = (x / rect.width) * 100;
    if (position < 0) position = 0;
    if (position > 100) position = 100;
    setSliderPosition(position);
  };

  return (
    <section id="transformation" className="py-32 bg-[#F4F2EE]/40 border-y border-gray-200/60 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#1E3A8A] block">Before & After Showcase</span>
          <h2 className="text-3xl sm:text-5xl font-black text-[#0B0F19] tracking-tight">Interactive Transformation Sliders</h2>
          <p className="text-gray-500 font-light text-sm max-w-md mx-auto">
            Drag the central tracking handle to inspect our precision engineered structural handovers.
          </p>

          <div className="flex flex-wrap justify-center gap-1.5 pt-6">
            {BEFORE_AFTER_DATA.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => { setActiveTab(tab.id); setSliderPosition(50); }}
                className={`text-[10px] font-black uppercase tracking-widest px-4 py-2.5 rounded-xl border transition-all cursor-pointer ${
                  activeTab === tab.id 
                    ? 'bg-[#0B0F19] text-white border-[#0B0F19] shadow-md' 
                    : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div 
          ref={containerRef}
          onMouseMove={(e) => { if (e.buttons === 1) handleMove(e.clientX); }}
          onTouchMove={(e) => handleMove(e.touches[0].clientX)}
          className="relative max-w-4xl mx-auto aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl border border-gray-200 bg-[#0B0F19] select-none cursor-ew-resize group"
        >
          <img src={currentPair.before} alt="Original phase structure layout" className="absolute inset-0 w-full h-full object-cover filter brightness-75" />
          <div className="absolute top-4 left-4 z-20 bg-[#0B0F19]/70 backdrop-blur-md px-3.5 py-2 rounded-xl text-[10px] font-black text-white uppercase tracking-widest border border-white/5">Before</div>

          <div 
            className="absolute inset-y-0 left-0 right-0 z-10 pointer-events-none overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <img src={currentPair.after} alt="Final building infrastructure delivery" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute top-4 right-4 z-20 bg-[#D4AF37] px-3.5 py-2 rounded-xl text-[10px] font-black text-[#0B0F19] uppercase tracking-widest shadow-lg">After</div>
          </div>

          {/* DELTA TRACKING SEPARATOR SLIDER EDGE */}
          <div 
            className="absolute inset-y-0 z-30 w-1 bg-white"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-16 h-10 bg-white text-[#0B0F19] rounded-full shadow-2xl flex flex-col items-center justify-center border-2 border-[#D4AF37] z-40 transition-transform group-hover:scale-105">
              <span className="text-[8px] font-black uppercase tracking-tighter text-[#0B0F19] animate-pulse">Drag Me</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

// ==========================================
// PREMIUM DRAG & DROP PHOTO PORTAL PORTAL
// ==========================================

function PhotoUploadSurveySection() {
  const [submitted, setSubmitted] = useState(false);
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedZone, setSelectedZone] = useState('Extension');

  const zones = ['House', 'Roof', 'Kitchen', 'Bathroom', 'Garden', 'Extension', 'Garage', 'Commercial'];

  const handleFiles = (newFiles) => {
    if (newFiles.length === 0) return;
    setIsUploading(true);
    setUploadProgress(15);
    
    const timer = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsUploading(false);
          const processed = Array.from(newFiles).map(f => ({
            name: f.name,
            preview: URL.createObjectURL(f)
          }));
          setFiles(prevFiles => [...prevFiles, ...processed]);
          return 0;
        }
        return prev + 25;
      });
    }, 200);
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <section id="survey" className="py-32 relative bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-3">
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#1E3A8A] block">Virtual Diagnostics Portal</span>
          <h2 className="text-3xl sm:text-5xl font-black text-[#0B0F19] tracking-tight">Request a Free Site Survey</h2>
          <p className="text-gray-500 font-light text-sm max-w-lg mx-auto">
            Upload current space snapshots. Our surveying engineers will map configurations and deliver a structural report with no obligation.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white border border-gray-200/80 rounded-3xl shadow-2xl p-8 sm:p-12 relative overflow-hidden">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form key="form-survey" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-8">
                
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#0B0F19]">1. Select Project Allocation Zone</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {zones.map((zone, idx) => (
                      <div 
                        key={idx} 
                        onClick={() => setSelectedZone(zone)}
                        className={`border rounded-xl p-4 flex flex-col items-center justify-center text-center transition-all cursor-pointer group ${
                          selectedZone === zone 
                            ? 'bg-[#0B0F19] border-[#0B0F19] text-white shadow-md' 
                            : 'border-gray-200/80 bg-[#F4F2EE]/20 hover:bg-white text-[#111827] hover:border-[#D4AF37]'
                        }`}
                      >
                        <ImageIcon className={`w-5 h-5 mb-2 transition-colors ${selectedZone === zone ? 'text-[#D4AF37]' : 'text-gray-400 group-hover:text-[#D4AF37]'}`} />
                        <span className="text-[10px] font-bold uppercase tracking-wider">{zone} Area</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* DRAG & DROP AREA WITH ANIMATED PROCESS TRACKS */}
                <div className="border-2 border-dashed border-gray-300 hover:border-[#D4AF37] bg-[#F4F2EE]/10 rounded-2xl p-8 text-center transition-all relative group">
                  <input 
                    type="file" 
                    multiple 
                    onChange={(e) => handleFiles(e.target.files)} 
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-20" 
                  />
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="w-14 h-14 rounded-xl bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-400 group-hover:text-[#D4AF37] transition-all transform group-hover:scale-105">
                      <Upload className="w-6 h-6" />
                    </div>
                    <p className="text-xs font-bold text-gray-800">Drag & drop asset blueprints or click to select files</p>
                    <p className="text-[10px] text-gray-400">Supports secure imagery parameter uploads (PNG, JPG, JPEG)</p>
                  </div>

                  {isUploading && (
                    <div className="absolute inset-0 bg-white/95 backdrop-blur-xs z-30 flex flex-col items-center justify-center px-12 space-y-3">
                      <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden max-w-xs border border-gray-200">
                        <div className="bg-[#D4AF37] h-full transition-all duration-150" style={{ width: `${uploadProgress}%` }} />
                      </div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#0B0F19]">Syncing Structural Files ({uploadProgress}%)</p>
                    </div>
                  )}
                </div>

                {/* FILE STAGING IMAGERY PREVIEWS */}
                {files.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-[#0B0F19]">Staged Asset Documents ({files.length})</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {files.map((file, i) => (
                        <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-gray-200 bg-gray-50 group">
                          <img src={file.preview} alt="Staged project spec profile" className="w-full h-full object-cover" />
                          <button 
                            type="button"
                            onClick={() => removeFile(i)}
                            className="absolute top-2 right-2 w-7 h-7 bg-red-600 hover:bg-red-700 rounded-lg text-white flex items-center justify-center shadow-lg transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-black tracking-widest text-gray-700">Full Name</label>
                    <input required type="text" className="w-full bg-[#F4F2EE]/40 border border-gray-200/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1E3A8A] transition-colors" placeholder="e.g. Sir Reginald Sterling" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-black tracking-widest text-gray-700">Contact Number</label>
                    <input required type="tel" className="w-full bg-[#F4F2EE]/40 border border-gray-200/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1E3A8A] transition-colors" placeholder="e.g. +44 7700 900077" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-black tracking-widest text-gray-700">Email Address</label>
                    <input required type="email" className="w-full bg-[#F4F2EE]/40 border border-gray-200/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1E3A8A] transition-colors" placeholder="e.g. sterling@london.co.uk" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-black tracking-widest text-gray-700">Property Address</label>
                    <input required type="text" className="w-full bg-[#F4F2EE]/40 border border-gray-200/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1E3A8A] transition-colors" placeholder="e.g. Belgravia, London SW1X" />
                  </div>
                </div>

                {/* EXPLICIT NO PRICING / NO ESTIMATE CONVERSION STATEMENTS */}
                <div className="bg-[#F4F2EE]/30 rounded-2xl p-4 flex flex-wrap gap-6 items-center justify-center border border-gray-200/50">
                  <span className="text-[10px] font-black text-gray-800 flex items-center"><CheckCircle2 className="w-4 h-4 text-green-600 mr-1.5" /> Free Consultation</span>
                  <span className="text-[10px] font-black text-gray-800 flex items-center"><CheckCircle2 className="w-4 h-4 text-green-600 mr-1.5" /> Free Site Visit</span>
                  <span className="text-[10px] font-black text-gray-800 flex items-center"><CheckCircle2 className="w-4 h-4 text-green-600 mr-1.5" /> No Obligation Quote</span>
                </div>

                <button 
                  type="submit" 
                  className="w-full py-4 bg-[#D4AF37] text-[#0B0F19] font-black rounded-xl text-xs tracking-widest uppercase shadow-xl hover:bg-[#0B0F19] hover:text-white transition-all transform hover:-translate-y-0.5 cursor-pointer"
                >
                  Book Free Site Visit
                </button>
              </motion.form>
            ) : (
              <motion.div 
                key="success-survey"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-16 text-center space-y-4 flex flex-col items-center justify-center"
              >
                <div className="w-16 h-16 rounded-full bg-green-50 text-green-600 flex items-center justify-center border border-green-200 shadow-sm mb-2">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-[#0B0F19] tracking-tight">Transmission Authenticated</h3>
                <p className="text-gray-500 text-sm max-w-md font-light leading-relaxed">
                  Thank you. Our survey engineering team will evaluate your uploaded files and touch base within 24 hours.
                </p>
                <button 
                  type="button" 
                  onClick={() => { setSubmitted(false); setFiles([]); }}
                  className="mt-4 text-xs font-black uppercase tracking-wider text-gray-600 underline"
                >
                  Upload Alternate Project Blueprints
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// CAPABILITIES SPECIFICATIONS MAP COMPONENT
// ==========================================

function ServicesSection() {
  const services = [
    { title: 'Luxury House Extensions', desc: 'Bespoke expansions tailored to modern high-end residential parameters.', icon: Building2, img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80' },
    { title: 'Premium Loft Conversions', desc: 'Transforming structural voids into engineered luxury living experiences.', icon: Layers, img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80' },
    { title: 'Architectural Kitchens', desc: 'Flawless culinary environments combining deep layout ergonomics with luxury surfaces.', icon: Paintbrush, img: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80' },
  ];

  return (
    <section id="services" className="py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
          <div className="space-y-3">
            <span className="text-[10px] font-black tracking-[0.25em] text-[#1E3A8A] uppercase block">Core Competencies</span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#0B0F19] tracking-tight">Integrated Construction Architecture</h2>
          </div>
          <p className="text-gray-500 max-w-xs font-light text-sm leading-relaxed">
            Delivering multidisciplinary engineering, structural modifications, and premium utility protections across England.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((ser, i) => {
            const Icon = ser.icon;
            return (
              <div key={i} className="group bg-[#FDFBF7] rounded-3xl border border-gray-200/60 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between">
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/60 to-transparent z-10" />
                  <img src={ser.img} alt={ser.title} loading="lazy" className="w-full h-full object-cover transform group-hover:scale-103 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-white shadow-md flex items-center justify-center text-[#0B0F19] z-20 group-hover:bg-[#0B0F19] group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-[#0B0F19] tracking-tight">{ser.title}</h3>
                    <p className="text-xs text-gray-500 font-light leading-relaxed">{ser.desc}</p>
                  </div>
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Specifications Mapping</span>
                    <div className="w-8 h-8 rounded-full bg-[#F4F2EE] text-[#0B0F19] group-hover:bg-[#D4AF37] flex items-center justify-center transition-colors">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// SEVEN PHASE DELIVERY LIFECYCLE TIMELINE
// ==========================================

function ProcessSection() {
  return (
    <section id="process" className="py-32 bg-[#0B0F19] text-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-24 space-y-3">
          <span className="text-[10px] font-black tracking-[0.25em] text-[#D4AF37] uppercase block">Rigorous Delivery Architecture</span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight">The Lifecycle of Absolute Certainty</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-7 gap-6">
          {PROCESS_STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="bg-white/[0.02] border border-white/5 hover:border-white/10 p-5 rounded-2xl transition-all group flex flex-col justify-between space-y-6">
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-mono font-black text-white/10 group-hover:text-[#D4AF37]/20 transition-colors">{step.phase}</span>
                  <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#0B0F19] transition-all">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white">{step.title}</h4>
                  <p className="text-[11px] text-gray-400 font-light leading-relaxed">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// REAL GOOGLE BUSINESS PROFILE REVIEW COMPONENT
// ==========================================

function GoogleReviewsSection() {
  return (
    <section id="reviews" className="py-32 bg-[#F4F2EE]/30 border-b border-gray-200/80">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* TRUE GOOGLE BUSINESS ACCREDITED SCORECARD */}
        <div className="max-w-xl mx-auto text-center mb-16 space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <svg className="w-20 h-auto" viewBox="0 0 74 24" fill="currentColor">
              <path d="M12.2 4.4C10 4.4 7.9 5.3 6.3 6.9c-3.2 3.2-3.2 8.5 0 11.7 1.6 1.6 3.7 2.5 5.9 2.5 4.3 0 7.7-3 8.3-7.1h-8.3v-3.3h11.7c.1.6.2 1.2.2 1.9 0 3.6-1.3 7-3.6 9.4-2.3 2.3-5.5 3.6-8.5 3.6-3.3 0-6.4-1.3-8.7-3.6C.9 17.6.9 10.4 5.4 5.9c2.3-2.3 5.4-3.6 8.7-3.6 3.1 0 6 1.1 8.3 3.2L20 7.9c-1.5-1.4-3.5-2.2-5.5-2.2z" fill="#4285F4"/>
              <path d="M31.2 8.2c4.4 0 7.9 3.5 7.9 7.9s-3.5 7.9-7.9 7.9-7.9-3.5-7.9-7.9 3.5-7.9 7.9-7.9zm0 12.4c2.5 0 4.5-2 4.5-4.5s-2-4.5-4.5-4.5-4.5 2-4.5 4.5 2 4.5 4.5 4.5z" fill="#EA4335"/>
              <path d="M48.2 8.2c4.4 0 7.9 3.5 7.9 7.9s-3.5 7.9-7.9 7.9-7.9-3.5-7.9-7.9 3.5-7.9 7.9-7.9zm0 12.4c2.5 0 4.5-2 4.5-4.5s-2-4.5-4.5-4.5-4.5 2-4.5 4.5 2 4.5 4.5 4.5z" fill="#FBBC05"/>
              <path d="M64.9 8.2c4.1 0 7.2 3.2 7.7 7.2h-12c.4 2.4 2.5 4.1 4.9 4.1 1.8 0 3.3-.9 4.1-2.4l2.9 1.5c-1.4 2.6-4.1 4.3-7 4.3-4.4 0-7.9-3.5-7.9-7.9s3.5-7.9 7.3-7.9zm-4.2 6.1h8.3c-.3-1.9-1.9-3.2-3.9-3.2-2.1-.1-3.9 1.2-4.4 3.2z" fill="#4285F4"/>
            </svg>
            <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Business Matrix</span>
          </div>

          <div className="bg-white border border-gray-200 p-4 rounded-2xl inline-flex items-center space-x-5 shadow-sm">
            <div className="text-left">
              <div className="flex items-center text-[#FBBC05] space-x-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-xs font-black text-[#0B0F19] mt-0.5">★★★★★ 4.9 / 5.0</p>
            </div>
            <div className="w-px h-8 bg-gray-200" />
            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Based on 180+ Audited Reviews</p>
          </div>
        </div>

        {/* HORIZONTAL SWIPE GRIDS TAILORED FOR MOBILE CONSTRAINTS */}
        <div 
          className="flex overflow-x-auto pb-8 xl:grid xl:grid-cols-3 gap-6 snap-x snap-mandatory px-4 -mx-4 xl:mx-auto max-w-6xl"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {REVIEWS_DATA.map((rev) => (
            <div key={rev.id} className="min-w-[85vw] sm:min-w-[48vw] xl:min-w-0 snap-start bg-white border border-gray-200/80 p-6 rounded-2xl shadow-sm flex flex-col justify-between space-y-6 relative">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img src={rev.photo} alt={rev.name} loading="lazy" className="w-10 h-10 rounded-full object-cover border border-gray-100" />
                    <div>
                      <h4 className="text-xs font-bold text-[#0B0F19] flex items-center">{rev.name}</h4>
                      <p className="text-[9px] font-medium text-gray-400 uppercase tracking-wider mt-0.5">{rev.date}</p>
                    </div>
                  </div>
                  <svg className="w-4 h-4 text-gray-300" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  </svg>
                </div>

                <div className="flex items-center text-[#FBBC05] space-x-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                </div>

                <p className="text-xs text-gray-600 font-light leading-relaxed">"{rev.text}"</p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[8px] font-black tracking-widest uppercase text-green-600 bg-green-50 px-2 py-0.5 rounded-sm border border-green-200/50">Verified Profile</span>
                <button type="button" className="inline-flex items-center space-x-1.5 text-[10px] font-bold text-gray-400 hover:text-[#1E3A8A] transition-colors cursor-pointer">
                  <span>Helpful</span>
                  <span className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-md font-mono text-[9px]">{rev.helpfulCount}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <a 
            href="https://google.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center justify-center px-6 py-3.5 border border-gray-200 hover:border-gray-400 bg-white rounded-xl text-xs font-black uppercase tracking-wider text-gray-700 transition-all shadow-xs"
          >
            <span>View All Google Reviews</span>
            <ChevronRight className="w-4 h-4 ml-1" />
          </a>
        </div>

      </div>
    </section>
  );
}

// ==========================================
// CONVERSION INTEGRATED CONTACT COMPONENT
// ==========================================

function ContactSection({ setSurveyModal }) {
  const [callbackState, setCallbackState] = useState(false);

  return (
    <section id="contact" className="py-32 bg-[#0B0F19] text-white relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="text-[10px] font-black tracking-[0.25em] text-[#D4AF37] uppercase block">Procurement Gateways</span>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-none">Initiate Modern Consultation</h2>
              <p className="text-gray-400 font-light text-sm max-w-xs leading-relaxed">
                Connect natively with our structural estimations panel or trigger instant telephone routing steps.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <a href="tel:+442079460958" className="flex items-center space-x-4 bg-white/[0.02] border border-white/5 hover:border-white/10 p-4 rounded-2xl transition-all group">
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[9px] uppercase font-black text-gray-400 tracking-widest">Call Concierge</p>
                  <p className="text-sm font-bold text-white group-hover:text-[#D4AF37] transition-colors">+44 20 7946 0958</p>
                </div>
              </a>

              <a href="https://wa.me/442079460958" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 bg-white/[0.02] border border-white/5 hover:border-white/10 p-4 rounded-2xl transition-all group">
                <div className="w-10 h-10 rounded-xl bg-[#22C55E]/10 flex items-center justify-center text-[#22C55E]">
                  <MessageCircle className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <p className="text-[9px] uppercase font-black text-gray-400 tracking-widest">WhatsApp Secure Protocol</p>
                  <p className="text-sm font-bold text-white group-hover:text-[#22C55E] transition-colors">Instant Mobile Chat Sync</p>
                </div>
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-10 space-y-6 backdrop-blur-2xl shadow-2xl">
              <div className="space-y-1">
                <h3 className="text-xl font-bold tracking-tight">Request an Immediate Callback</h3>
                <p className="text-xs text-gray-400 font-light">Provide contact matrix parameters to queue an architectural verification loop.</p>
              </div>

              <AnimatePresence mode="wait">
                {!callbackState ? (
                  <form onSubmit={(e) => { e.preventDefault(); setCallbackState(true); }} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]" placeholder="Your Name" />
                      <input required type="tel" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]" placeholder="Phone Number" />
                    </div>
                    <button type="submit" className="w-full py-4 bg-[#D4AF37] text-[#0B0F19] font-black rounded-xl text-xs tracking-widest uppercase shadow-xl transition-all transform hover:-translate-y-0.5 cursor-pointer">
                      Trigger Immediate Call
                    </button>
                    <button type="button" onClick={() => setSurveyModal(true)} className="w-full text-center py-3 text-xs font-black uppercase text-gray-400 hover:text-white transition-colors">
                      Or Open Virtual Photo Survey Link
                    </button>
                  </form>
                ) : (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-6 text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 mx-auto flex items-center justify-center">
                      <Clock className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-bold">Callback Verified</h4>
                    <p className="text-xs text-gray-400 max-w-xs mx-auto">A technician will establish connectivity within 15 minutes.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ==========================================
// EXPANDED LUXURY FOOTER ENGINE
// ==========================================

function Footer() {
  return (
    <footer className="bg-[#0B0F19] text-white pt-20 pb-28 lg:pb-12 border-t border-white/5 relative z-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/5">
        
        <div className="lg:col-span-4 space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#D4AF37] rounded-xl flex items-center justify-center">
              <Building2 className="w-5 h-5 text-[#0B0F19]" />
            </div>
            <div>
              <span className="text-base font-black tracking-tight block uppercase text-white">VANGUARD</span>
              <span className="text-[8px] tracking-[0.25em] text-[#D4AF37] font-bold uppercase">Contractors UK</span>
            </div>
          </div>
          <p className="text-xs text-gray-400 font-light leading-relaxed max-w-sm">
            Premium corporate general builders and civil masterworks operating to regulatory specifications across England.
          </p>
          <div className="space-y-1 pt-2">
            <p className="text-[10px] font-mono text-red-400 font-bold uppercase tracking-wider">⚠️ 24/7 Emergency Line</p>
            <p className="text-sm font-bold text-white">+44 20 7946 9911</p>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-xs font-black uppercase tracking-widest text-[#D4AF37]">Company</h4>
          <div className="flex flex-col space-y-2.5 text-xs text-gray-400">
            <a href="#gallery" className="hover:text-white transition-colors">Our Portfolios</a>
            <a href="#process" className="hover:text-white transition-colors">Operational Framework</a>
            <a href="#reviews" className="hover:text-white transition-colors">Client Reviews</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact Hub</a>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-4">
          <h4 className="text-xs font-black uppercase tracking-widest text-[#D4AF37]">Opening Hours</h4>
          <div className="space-y-2 text-xs text-gray-400 font-light">
            <p className="flex justify-between"><span>Mon - Fri</span> <span className="font-mono text-white">07:30 - 18:00</span></p>
            <p className="flex justify-between"><span>Saturday</span> <span className="font-mono text-white">08:00 - 14:00</span></p>
            <p className="flex justify-between"><span>Sunday</span> <span className="text-red-400 uppercase font-bold text-[10px]">Closed (Emergency Only)</span></p>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-4">
          <h4 className="text-xs font-black uppercase tracking-widest text-[#D4AF37]">Corporate Location</h4>
          <div className="rounded-2xl overflow-hidden h-28 border border-white/5 opacity-80 hover:opacity-100 transition-opacity">
            <iframe 
              title="Vanguard Contractors Corporate UK Address Mapping"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.5404230509424!2d-0.1440786!3d51.4947948!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604c27a92ad1b%3A0x4720996457855658!2sBelgravia%2C%20London!5e0!3m2!1sen!2suk!4v1625000000000!5m2!1sen!2suk"
              className="w-full h-full border-0 filter invert-[0.9] hue-rotate-180"
              allowFullScreen="" 
              loading="lazy"
            />
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
        <p>© 2026 Vanguard Main Contractors UK Ltd. All Structural Engineering Rights Reserved.</p>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-white transition-colors">Regulatory Compliance</a>
          <a href="#" className="hover:text-white transition-colors">Privacy Infrastructure</a>
        </div>
      </div>
    </footer>
  );
}

// ==========================================
// PERSISTENT HIGH-CONVERSION CTA BARS
// ==========================================

function StickyCTABars({ setSurveyModal }) {
  return (
    <>
      {/* DESKTOP FLOATING CTA */}
      <div className="hidden lg:flex fixed bottom-6 right-6 z-[999] items-center space-x-3">
        <button
          type="button"
          onClick={() => setSurveyModal(true)}
          className="bg-[#0B0F19] hover:bg-[#1E3A8A] text-white border border-white/10 px-6 py-4 rounded-xl text-xs font-black tracking-widest uppercase shadow-2xl transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center space-x-2 animate-bounce-subtle"
        >
          <FileText className="w-4 h-4 text-[#D4AF37]" />
          <span>Book Free Survey</span>
        </button>
      </div>

      {/* MOBILE ADAPTIVE SPLIT BAR */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 h-16 bg-[#0B0F19]/95 backdrop-blur-xl border-t border-white/10 z-[9999] grid grid-cols-3 gap-px divide-x divide-white/5">
        <a href="tel:+442079460958" className="flex flex-col items-center justify-center space-y-1 text-white font-bold text-[10px] uppercase tracking-wider active:bg-white/5">
          <Phone className="w-4 h-4 text-[#D4AF37]" />
          <span>Call Now</span>
        </a>
        <a href="https://wa.me/442079460958" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center space-y-1 text-white font-bold text-[10px] uppercase tracking-wider active:bg-white/5">
          <MessageCircle className="w-4 h-4 text-[#22C55E] fill-current" />
          <span>WhatsApp</span>
        </a>
        <button type="button" onClick={() => setSurveyModal(true)} className="flex flex-col items-center justify-center space-y-1 text-white font-bold text-[10px] uppercase tracking-wider active:bg-white/5 cursor-pointer">
          <Calendar className="w-4 h-4 text-blue-400" />
          <span>Book Survey</span>
        </button>
      </div>
    </>
  );
}

// ==========================================
// ARCHITECTURAL INTERACTIVE MODAL POOLS
// ==========================================

function VideoModal({ videoModal, setVideoModal }) {
  return (
    <AnimatePresence>
      {videoModal && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setVideoModal(false)} className="fixed inset-0 bg-[#0B0F19]/95 z-[99999] flex items-center justify-center p-4 backdrop-blur-xl">
          <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="w-full max-w-4xl aspect-video bg-[#0B0F19] rounded-3xl overflow-hidden border border-white/10 relative p-8 flex flex-col items-center justify-center text-center space-y-4" onClick={(e) => e.stopPropagation()}>
            <button type="button" onClick={() => setVideoModal(false)} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white cursor-pointer"><X className="w-5 h-5" /></button>
            <div className="w-14 h-14 rounded-full bg-[#D4AF37]/10 flex items-center justify-center border border-[#D4AF37]/20"><HardHat className="w-6 h-6 text-[#D4AF37] " /></div>
            <h3 className="text-xl font-bold text-white">Vanguard Master Operations Feed</h3>
            <p className="text-gray-400 text-xs max-w-xs font-light">Cinematic tracking mapping real luxury updates across key sectors.</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SurveyModal({ surveyModal, setSurveyModal }) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <AnimatePresence>
      {surveyModal && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSurveyModal(false)} className="fixed inset-0 bg-[#0B0F19]/80 z-[99999] flex items-center justify-center p-4 backdrop-blur-md overflow-y-auto">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} className="w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100 relative p-6 sm:p-10 my-8" onClick={(e) => e.stopPropagation()}>
            <button type="button" onClick={() => { setSurveyModal(false); setSubmitted(false); }} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 cursor-pointer"><X className="w-5 h-5" /></button>

            <div className="mb-6">
              <h3 className="text-xl font-black text-[#0B0F19] tracking-tight">Request Personalised Site Survey Proposal</h3>
              <p className="text-xs text-gray-400 font-light mt-1">Provide details to map out an architectural structural assessment report.</p>
            </div>

            {!submitted ? (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input required type="text" className="w-full bg-[#F4F2EE]/50 border border-gray-200 rounded-xl px-4 py-3 text-xs focus:outline-none placeholder:text-gray-400" placeholder="Your Name" />
                  <input required type="tel" className="w-full bg-[#F4F2EE]/50 border border-gray-200 rounded-xl px-4 py-3 text-xs focus:outline-none placeholder:text-gray-400" placeholder="Phone Number" />
                </div>
                <input required type="email" className="w-full bg-[#F4F2EE]/50 border border-gray-200 rounded-xl px-4 py-3 text-xs focus:outline-none placeholder:text-gray-400" placeholder="Email Address" />
                <input required type="text" className="w-full bg-[#F4F2EE]/50 border border-gray-200 rounded-xl px-4 py-3 text-xs focus:outline-none placeholder:text-gray-400" placeholder="Property Address" />
                
                <div className="bg-[#F4F2EE]/30 rounded-2xl p-4 flex justify-between border border-gray-200/50 text-[10px] font-black uppercase text-gray-700">
                  <span>✓ Free Consultation</span>
                  <span>✓ Free Site Visit</span>
                  <span>✓ No Obligation Quote</span>
                </div>

                <button type="submit" className="w-full py-4 bg-[#D4AF37] text-[#0B0F19] font-black rounded-xl text-xs tracking-widest uppercase shadow-md cursor-pointer">Submit Booking</button>
              </form>
            ) : (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 border border-green-200 mx-auto flex items-center justify-center"><CheckCircle2 className="w-5 h-5" /></div>
                <h4 className="text-lg font-black text-[#0B0F19]">Submission Authenticated</h4>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">Thank you. Our survey team will review your profile metrics and connect within 24 hours.</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function LightboxImage({ lightboxImage, setLightboxImage }) {
  return (
    <AnimatePresence>
      {lightboxImage && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          onClick={() => setLightboxImage(null)} 
          className="fixed inset-0 bg-[#0B0F19]/95 z-[999999] flex items-center justify-center p-4 backdrop-blur-md"
        >
          <button type="button" onClick={() => setLightboxImage(null)} className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center shadow-2xl cursor-pointer z-[9999999]"><X className="w-6 h-6" /></button>
          <motion.img 
            initial={{ scale: 0.97 }} 
            animate={{ scale: 1 }} 
            exit={{ scale: 0.97 }} 
            src={lightboxImage} 
            alt="High definition architecture snapshot layout" 
            className="max-w-full max-h-[90vh] rounded-2xl object-contain shadow-2xl" 
            onClick={(e) => e.stopPropagation()} 
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}