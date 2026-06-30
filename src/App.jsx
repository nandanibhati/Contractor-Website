import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue } from 'framer-motion';
import { 
  Building2, HardHat, Paintbrush, ShieldCheck, 
  ArrowUpRight, Phone, Mail, MapPin, Menu, X, 
  CheckCircle2, Star, Play, Layers, Compass, 
  Ruler, Key, FileText, Upload, Image as ImageIcon, 
  MessageSquare, MessageCircle, Clock, ChevronRight, 
  Sliders, Shield, Award, Users, RefreshCw
} from 'lucide-react';

// --- STYLING CONFIG (Tailwind v4 tokens referenced inline) ---
const THEME = {
  colors: {
    bgWarm: '#FDFBF7', // Premium warm ivory/white
    secondaryBg: '#F4F2EE', 
    gold: '#D4AF37', // Refined luxury gold
    steelBlue: '#1E3A8A', 
    dark: '#0B0F19'
  }
};

// --- DATA CONFIGURATIONS ---
const SERVICES_DATA = [
  { id: 'ext', title: 'Luxury House Extensions', icon: Building2, desc: 'Bespoke architectural expansions tailored to high-end residential parameters.', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', loc: 'Kensington', year: '2025' },
  { id: 'loft', title: 'Premium Loft Conversions', icon: Layers, desc: 'Transforming structural voids into masterfully engineered living experiences.', img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80', loc: 'Richmond', year: '2025' },
  { id: 'kit', title: 'Architectural Kitchens', icon: Paintbrush, desc: 'State-of-the-art culinary hubs combining flawless ergonomics with luxury surfaces.', img: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80', loc: 'Chelsea', year: '2026' },
  { id: 'bath', title: 'Wellness Bathrooms', icon: Compass, desc: 'Spa-grade structural sanctuaries constructed with premium water systems.', img: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=800&q=80', loc: 'Mayfair', year: '2024' },
  { id: 'roof', title: 'High-Performance Roofing', icon: ShieldCheck, desc: 'Advanced weatherproofing and sustainable industrial roofing solutions.', img: 'https://images.unsplash.com/photo-1632759145351-1d592919f522?auto=format&fit=crop&w=800&q=80', loc: 'Hampstead', year: '2025' },
  { id: 'comm', title: 'Commercial Development', icon: Building2, desc: 'Grade-A corporate environments built to complex regulatory specifications.', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80', loc: 'City of London', year: '2026' },
];

const BEFORE_AFTER_DATA = [
  { id: 'kit', label: 'Kitchen Archetype', before: 'https://images.unsplash.com/photo-1565183997392-2f6f122e5912?auto=format&fit=crop&w=1200&q=80', after: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80' },
  { id: 'bath', label: 'Wellness Bathroom', before: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80', after: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1200&q=80' },
  { id: 'roof', label: 'High-Performance Roof', before: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80', after: 'https://images.unsplash.com/photo-1632759145351-1d592919f522?auto=format&fit=crop&w=1200&q=80' },
  { id: 'ext', label: 'House Extension', before: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80', after: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80' },
  { id: 'loft', label: 'Loft Conversion', before: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80', after: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80' }
];

const PROCESS_STEPS = [
  { phase: '01', title: 'Book Survey', desc: 'Secure an on-site evaluation appointment via our premium structural portal or direct concierge ring.', icon: CalendarCheck },
  { phase: '02', title: 'Site Visit', desc: 'Rigorous engineering appraisal of programmatic constraints, dimensions, and spatial goals.', icon: Ruler },
  { phase: '03', title: 'Quotation', desc: 'A transparent, highly line-itemed commercial guaranteed breakdown with comprehensive supply cost metrics.', icon: FileText },
  { phase: '04', title: 'Planning & Legal', desc: 'Liaising with UK local authorities to secure structural approvals, permitted development rights, and full compliance.', icon: Compass },
  { phase: '05', title: 'Construction Phase', desc: 'Flawless execution by elite certified structural teams utilizing premier materials and precision methods.', icon: HardHat },
  { phase: '06', title: 'Final Inspection', desc: 'Multi-point architectural engineering quality audit to satisfy absolute compliance thresholds.', icon: ShieldCheck },
  { phase: '07', title: 'Aftercare & Support', desc: 'Full issuance of our comprehensive 15-year masterwork warranty structures alongside long-term structural concierge backup.', icon: Key }
];

const GOOGLE_REVIEWS_DATA = [
  { name: 'Sir Alistair Vance', date: '2 weeks ago', text: 'Vanguard completed our residential portfolio extension ahead of schedule. Their spatial engineering parameters are flawless and the project execution was incredibly tidy.', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80' },
  { name: 'Dr. Helena Roy', date: '1 month ago', text: 'The structural glasshouse extension requirements were immense. Vanguard operated with perfect architectural precision throughout. Truly verified professionals.', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80' },
  { name: 'Julian Mercer', date: '3 months ago', text: 'Exceptional premium loft transformation in Richmond. Absolute transparency regarding timelines and materials procurement logistics. Highly recommended.', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80' }
];

const TRUST_BADGES = [
  { title: 'Fully Insured', desc: '£10M Public Liability Guarantee' },
  { title: 'Gas Safe Registered', desc: 'Certified Utility Infrastructure' },
  { title: 'NICEIC Approved', desc: 'Elite Electrical Validation' },
  { title: 'FMB Member', desc: 'Federation of Master Builders' },
  { title: 'TrustMark Accredited', desc: 'Government Endorsed Quality' },
  { title: 'Checkatrade Vetted', desc: '9.9/10 Independent Standard' },
  { title: 'Rated People Approved', desc: 'Verified Local Track Record' },
  { title: 'Google Guaranteed', desc: 'Backed Corporate Credentials' }
];

function CalendarCheck(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="m9 16 2 2 4-4"/>
    </svg>
  );
}

function BlueprintGrid() {
  return (
    <div className="absolute inset-0 opacity-[0.02] pointer-events-none select-none mix-blend-overlay overflow-hidden">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1E3A8A" strokeWidth="1" />
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
  const [surveyModal, setSurveyModal] = useState(false);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#111827] font-sans antialiased selection:bg-[#D4AF37] selection:text-[#0B0F19] overflow-x-hidden relative">
      <BlueprintGrid />
      
      {/* GLOBAL NAVBAR */}
      <Navbar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} setSurveyModal={setSurveyModal} />

      {/* HERO SECTION */}
      <Hero setVideoModal={setVideoModal} setSurveyModal={setSurveyModal} />

      {/* WHY CLIENTS CHOOSE US (ANIMATED STATS STRIP) */}
      <WhyChooseUs />

      {/* TRUST MARKS EMBED */}
      <TrustBadgesSection />

      {/* MASONRY PROJECT GALLERY */}
      <ProjectGallery />

      {/* INTERACTIVE BEFORE & AFTER SLIDER */}
      <BeforeAfterSection />

      {/* HIGH CONVERSION PHOTO UPLOAD SURVEY PORTAL */}
      <PhotoUploadSurveySection />

      {/* CORE CAPABILITIES RENDERER */}
      <ServicesSection />

      {/* MODERN ARCHITECTURAL PROCESS LIFECYCLE */}
      <ProcessSection />

      {/* AUTHENTIC GOOGLE BUSINESS REVIEWS BRANDING */}
      <GoogleReviewsSection />

      {/* CALL BACK & DUAL METHOD CONTACT MATRIX */}
      <ContactSection setSurveyModal={setSurveyModal} />

      {/* FOOTER */}
      <Footer />

      {/* STICKY CTA WIDGET ARCHITECTURE */}
      <StickyCTABars setSurveyModal={setSurveyModal} />

      {/* MODAL ARCHITECTURE POOLS */}
      <VideoModal videoModal={videoModal} setVideoModal={setVideoModal} />
      <SurveyModal surveyModal={surveyModal} setSurveyModal={setSurveyModal} />
    </div>
  );
}

// --- COMPONENTS ---

function Navbar({ mobileMenuOpen, setMobileMenuOpen, setSurveyModal }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = ['Gallery', 'Transformation', 'Survey', 'Services', 'Process', 'Reviews', 'Contact'];

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-[#0B0F19]/90 backdrop-blur-xl border-b border-white/5 py-3 shadow-xl' 
          : 'bg-gradient-to-b from-[#0B0F19]/80 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 bg-gradient-to-tr from-[#D4AF37] to-[#1E3A8A] rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-105">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight uppercase leading-none text-white">VANGUARD</span>
            <span className="text-[9px] tracking-[0.25em] font-semibold text-[#D4AF37] uppercase leading-none mt-1">Contractors UK</span>
          </div>
        </a>

        <div className="hidden xl:flex items-center space-x-1">
          {links.map((link) => (
            <a 
              key={link} 
              href={`#${link.toLowerCase()}`}
              className="text-xs font-semibold tracking-wider uppercase text-white/80 hover:text-[#D4AF37] px-3.5 py-2 rounded-lg transition-all hover:bg-white/5"
            >
              {link}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center space-x-5">
          <a href="tel:+442079460958" className="flex items-center space-x-2 text-white/90 text-xs font-bold uppercase tracking-wider hover:text-[#D4AF37] transition-colors">
            <Phone className="w-4 h-4 text-[#D4AF37]" />
            <span>+44 20 7946 0958</span>
          </a>
          <button 
            type="button"
            onClick={() => setSurveyModal(true)} 
            className="cursor-pointer relative inline-flex items-center justify-center px-5 py-2.5 rounded-xl font-bold text-xs tracking-widest uppercase bg-[#D4AF37] text-[#0B0F19] hover:bg-[#D4AF37]/90 transition-all shadow-md hover:shadow-[#D4AF37]/20 transform hover:-translate-y-0.5"
          >
            Request Quote
          </button>
        </div>

        <button 
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="xl:hidden w-10 h-10 flex items-center justify-center bg-white/10 rounded-xl border border-white/10 text-white"
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
            className="absolute top-full inset-x-0 bg-[#0B0F19] border-b border-white/10 shadow-2xl overflow-hidden xl:hidden"
          >
            <div className="px-6 py-8 flex flex-col space-y-4">
              {links.map((link) => (
                <a 
                  key={link} 
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-semibold tracking-wide text-white/90 hover:text-[#D4AF37] transition-colors uppercase"
                >
                  {link}
                </a>
              ))}
              <hr className="border-white/10 my-2" />
              <div className="flex flex-col space-y-4 pt-2">
                <a href="tel:+442079460958" className="flex items-center space-x-3 text-white/80 font-bold uppercase tracking-wider text-xs">
                  <Phone className="w-5 h-5 text-[#D4AF37]" />
                  <span>+44 20 7946 0958</span>
                </a>
                <button 
                  type="button"
                  onClick={() => { setMobileMenuOpen(false); setSurveyModal(true); }}
                  className="w-full text-center py-3.5 bg-[#D4AF37] text-[#0B0F19] font-bold rounded-xl text-xs tracking-widest uppercase shadow-lg"
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

function Hero({ setVideoModal, setSurveyModal }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  return (
    <section ref={containerRef} className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#0B0F19] pt-24">
      {/* CINEMATIC VIDEO BACKGROUND ACCENT OVERLAY */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0 scale-105 select-none pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F19]/90 via-[#0B0F19]/40 to-[#0B0F19] z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F19] via-transparent to-[#0B0F19]/60 z-10" />
        <div className="absolute inset-0 bg-[#1E3A8A]/10 mix-blend-color z-10" />
        <img 
          src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=2000&q=90" 
          alt="Premium UK construction environment site asset" 
          className="w-full h-full object-cover filter brightness-[0.55] contrast-[1.10]"
        />
      </motion.div>

      {/* LUXURY RADIAL AMBIENCE */}
      <div className="absolute top-1/4 left-1/4 w-[45rem] h-[45rem] bg-[#1E3A8A]/15 rounded-full blur-[140px] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[40rem] h-[40rem] bg-[#D4AF37]/5 rounded-full blur-[160px] mix-blend-screen pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-20 pt-16 pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* HERO TEXT HIERARCHY */}
          <motion.div style={{ y: textY }} className="lg:col-span-7 space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center space-x-2.5 bg-white/5 border border-white/10 backdrop-blur-md px-4 py-2 rounded-full shadow-inner"
            >
              <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
              <span className="text-white/90 font-bold tracking-widest text-[10px] uppercase">Elite Tier UK Main Contractor</span>
            </motion.div>

            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black text-white tracking-tight leading-[1.05]">
              Building Tomorrow, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F5C242] to-white">
                With Excellence Today.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-gray-300 max-w-xl leading-relaxed font-light">
              Premium construction, structural engineering, and luxury residential transformations delivered across London and the Home Counties to verified institutional standards.
            </p>

            {/* BUTTON HIERARCHY ACCELERATORS */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <button 
                type="button"
                onClick={() => setSurveyModal(true)}
                className="cursor-pointer group relative inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#D4AF37] text-[#0B0F19] font-bold tracking-widest uppercase text-xs shadow-xl shadow-[#D4AF37]/10 hover:shadow-[#D4AF37]/30 hover:bg-[#D4AF37]/90 transition-all transform hover:-translate-y-0.5"
              >
                <span>Book Free Site Visit</span>
                <ArrowUpRight className="w-4 h-4 ml-2 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
              
              <a 
                href="#survey" 
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 backdrop-blur-md text-white font-bold tracking-widest uppercase text-xs transition-all"
              >
                Request Consultation
              </a>

              <button 
                type="button"
                onClick={() => setVideoModal(true)}
                className="cursor-pointer inline-flex items-center justify-center space-x-2.5 text-white/80 hover:text-[#D4AF37] group transition-colors px-3 py-2"
              >
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 group-hover:border-[#D4AF37] flex items-center justify-center backdrop-blur-md transition-all">
                  <Play className="w-3.5 h-3.5 fill-current text-white group-hover:text-[#D4AF37] ml-0.5 transition-colors" />
                </div>
                <span className="text-[10px] font-bold tracking-widest uppercase">Site Reel</span>
              </button>
            </div>
          </motion.div>

          {/* FLOATING SOCIAL PROOF BADGES */}
          <div className="lg:col-span-5 relative hidden lg:flex flex-col items-end space-y-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-[#0B0F19]/70 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl flex items-center space-x-4 max-w-xs transform hover:scale-102 transition-transform"
            >
              <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white text-xs font-bold uppercase tracking-wider">Structural Insurance</h4>
                <p className="text-gray-400 text-[11px] mt-0.5">£10M Comprehensive Liability Protection</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-[#0B0F19]/70 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl flex items-center space-x-4 max-w-xs transform hover:scale-102 transition-transform"
            >
              <div className="w-10 h-10 rounded-xl bg-[#22C55E]/10 flex items-center justify-center text-[#22C55E]">
                <Star className="w-5 h-5 fill-current" />
              </div>
              <div>
                <h4 className="text-white text-xs font-bold uppercase tracking-wider">Top-Rated Status</h4>
                <p className="text-gray-400 text-[11px] mt-0.5">4.9/5 Based on 180+ Real UK Reviews</p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#FDFBF7] to-transparent pointer-events-none" />
    </section>
  );
}

function WhyChooseUs() {
  const stats = [
    { value: '20+', label: 'Years Experience', desc: 'Structural mastery', icon: Shield },
    { value: '650+', label: 'Elite Projects', desc: 'Commissioned across UK', icon: HardHat },
    { value: '4.9', label: 'Google Rating', desc: '180+ verified reviews', icon: Star, highlight: true },
    { value: '98%', label: 'Repeat Customers', desc: 'Unmatched client trust', icon: Users },
    { value: '15 Yr', label: 'Master Guarantee', desc: 'Full architectural backup', icon: Award }
  ];

  return (
    <section className="relative z-30 -mt-16 max-w-7xl mx-auto px-6">
      <div className="bg-white border border-gray-200/80 rounded-3xl shadow-xl p-8 sm:p-10 backdrop-blur-xl">
        <div className="text-center mb-8">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#1E3A8A]">Audited Track Record</span>
          <h3 className="text-xl font-black text-[#0B0F19] tracking-tight mt-1">Why Discerning Clients Choose Vanguard</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="flex flex-col items-center text-center p-4 rounded-2xl hover:bg-[#F4F2EE]/50 transition-colors border border-transparent hover:border-gray-100"
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${s.highlight ? 'bg-[#D4AF37]/10 text-[#D4AF37]' : 'bg-[#1E3A8A]/5 text-[#1E3A8A]'}`}>
                  <Icon className="w-4 h-4 fill-none" />
                </div>
                <span className="text-2xl sm:text-3xl font-black tracking-tight text-[#0B0F19] font-mono">{s.value}</span>
                <span className="text-xs font-bold text-gray-800 mt-1">{s.label}</span>
                <span className="text-[10px] text-gray-400 mt-0.5 leading-none">{s.desc}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TrustBadgesSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-[#FDFBF7] to-[#F4F2EE]/40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#1E3A8A]">Compliance & Vetting</span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0B0F19] tracking-tight">Accredited Member Credentials</h2>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {TRUST_BADGES.map((badge, idx) => (
            <div 
              key={idx} 
              className="bg-white border border-gray-200/60 p-5 rounded-2xl shadow-xs hover:shadow-md hover:border-gray-300 transition-all flex items-center space-x-3.5 group"
            >
              <div className="w-8 h-8 rounded-lg bg-[#F4F2EE] group-hover:bg-[#1E3A8A]/5 flex items-center justify-center text-[#1E3A8A] transition-colors shrink-0">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#0B0F19] leading-tight">{badge.title}</h4>
                <p className="text-[10px] text-gray-400 font-medium mt-0.5 leading-none">{badge.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectGallery() {
  const filters = ['All', 'Extensions', 'Bathrooms', 'Kitchens', 'Roofing', 'Commercial', 'Lofts'];
  const [activeFilter, setActiveFilter] = useState('All');

  const galleryItems = [
    { cat: 'Extensions', loc: 'Mayfair Residence', year: '2025', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80', size: 'large' },
    { cat: 'Kitchens', loc: 'Chelsea Culinary Hub', year: '2026', img: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80', size: 'small' },
    { cat: 'Bathrooms', loc: 'Belgravia Sanctuary', year: '2024', img: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=600&q=80', size: 'small' },
    { cat: 'Lofts', loc: 'Richmond Structural Void', year: '2025', img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=80', size: 'large' },
    { cat: 'Roofing', loc: 'Hampstead Waterproofing', year: '2025', img: 'https://images.unsplash.com/photo-1632759145351-1d592919f522?auto=format&fit=crop&w=600&q=80', size: 'small' },
    { cat: 'Commercial', loc: 'Canary Wharf Grade-A', year: '2026', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80', size: 'large' },
  ];

  const filteredItems = activeFilter === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.cat === activeFilter);

  return (
    <section id="gallery" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#1E3A8A] block">Monuments of Execution</span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#0B0F19] tracking-tight">Premium Project Gallery</h2>
          </div>
          
          {/* CATEGORY FILTERS */}
          <div className="flex flex-wrap gap-1.5 bg-[#F4F2EE] p-1.5 rounded-xl overflow-x-auto max-w-full">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setActiveFilter(f)}
                className={`text-[11px] font-bold tracking-wider px-4 py-2 rounded-lg uppercase transition-all whitespace-nowrap cursor-pointer ${
                  activeFilter === f 
                    ? 'bg-[#0B0F19] text-white shadow-sm' 
                    : 'text-gray-500 hover:text-[#0B0F19]'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* MASONRY GRID LAYOUT */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                layout
                key={item.loc}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="break-inside-avoid relative rounded-3xl overflow-hidden border border-gray-100 shadow-xs group bg-[#FDFBF7]"
              >
                <div className="relative overflow-hidden w-full cursor-zoom-in">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/80 via-[#0B0F19]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-10 flex flex-col justify-end p-6" />
                  <img 
                    src={item.img} 
                    alt={item.loc} 
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500 filter brightness-[0.98]"
                  />
                  
                  {/* HOVER SPECIFICATIONS DETAILS LAYER */}
                  <div className="absolute inset-x-0 bottom-0 z-20 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex justify-between items-end text-white pointer-events-none">
                    <div className="space-y-1">
                      <span className="text-[9px] tracking-widest text-[#D4AF37] font-bold uppercase">{item.cat}</span>
                      <h4 className="text-sm font-bold tracking-tight">{item.loc}</h4>
                    </div>
                    <span className="text-[10px] font-mono text-gray-300 bg-white/10 backdrop-blur-md px-2 py-1 rounded-md">{item.year}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function BeforeAfterSection() {
  const [activeTab, setActiveTab] = useState('kit');
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef(null);

  const currentPair = BEFORE_AFTER_DATA.find(d => d.id === activeTab) || BEFORE_AFTER_DATA[0];

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let position = (x / rect.width) * 100;
    if (position < 0) position = 0;
    if (position > 100) position = 100;
    setSliderPosition(position);
  };

  const onTouchMove = (e) => handleMove(e.touches[0].clientX);
  const onMouseMove = (e) => {
    if (e.buttons === 1) handleMove(e.clientX);
  };

  return (
    <section id="transformation" className="py-32 bg-[#F4F2EE]/50 border-y border-gray-200/60 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#1E3A8A] block">Before & After Showcase</span>
          <h2 className="text-3xl sm:text-5xl font-black text-[#0B0F19] tracking-tight">Interactive Transformation Sliders</h2>
          <p className="text-gray-500 font-light text-sm max-w-md mx-auto">
            Drag the central divider line to inspect the stark delta between original structural states and our complete luxury handovers.
          </p>

          <div className="flex flex-wrap justify-center gap-1.5 pt-4">
            {BEFORE_AFTER_DATA.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => { setActiveTab(tab.id); setSliderPosition(50); }}
                className={`text-[10px] font-bold uppercase tracking-wider px-4 py-2 rounded-xl border transition-all cursor-pointer ${
                  activeTab === tab.id 
                    ? 'bg-[#0B0F19] text-white border-[#0B0F19]' 
                    : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* SLIDER WRAPPER */}
        <div 
          ref={containerRef}
          onMouseMove={onMouseMove}
          onTouchMove={onTouchMove}
          className="relative max-w-4xl mx-auto aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl border border-gray-200 bg-[#0B0F19] select-none cursor-ew-resize"
        >
          {/* BEFORE IMAGE (BOTTOM) */}
          <img src={currentPair.before} alt="Original state" className="absolute inset-0 w-full h-full object-cover filter brightness-[0.75]" />
          <div className="absolute top-4 left-4 z-20 bg-[#0B0F19]/60 backdrop-blur-md px-3 py-1.5 rounded-lg text-[10px] font-bold text-white uppercase tracking-widest">Original State</div>

          {/* AFTER IMAGE (TOP LAYER CLIPPED) */}
          <div 
            className="absolute inset-y-0 left-0 right-0 z-10 pointer-events-none overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <img src={currentPair.after} alt="Handover architectural finish" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute top-4 right-4 z-20 bg-[#D4AF37] px-3 py-1.5 rounded-lg text-[10px] font-bold text-[#0B0F19] uppercase tracking-widest">Vanguard Handover</div>
          </div>

          {/* DRAGGABLE BAR DIVIDER */}
          <div 
            className="absolute inset-y-0 z-30 w-1 bg-white cursor-ew-resize"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-white text-[#0B0F19] rounded-full shadow-2xl flex items-center justify-center border-2 border-[#D4AF37]">
              <Sliders className="w-4 h-4 text-[#0B0F19]" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

function PhotoUploadSurveySection() {
  const [submitted, setSubmitted] = useState(false);
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFiles([...files, ...Array.from(e.target.files)]);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="survey" className="py-32 relative bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#1E3A8A] block">Virtual Verification</span>
          <h2 className="text-3xl sm:text-5xl font-black text-[#0B0F19] tracking-tight">Request a Free Site Survey</h2>
          <p className="text-gray-500 font-light text-sm max-w-lg mx-auto">
            Upload current site photos below. Our technical surveying council will review dimensions and provide a guaranteed blueprint overview proposal.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white border border-gray-200/80 rounded-3xl shadow-xl overflow-hidden p-8 sm:p-12 relative">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form 
                key="form"
                onSubmit={handleFormSubmit}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                {/* PHOTO DRAG CARD GRID */}
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#0B0F19]">1. Select Applicable Project Photo Zones (Multiple Allowed)</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    {['House Photos', 'Garden Area', 'Roof Structure', 'Bathroom Hub', 'Kitchen Space', 'Extension Area'].map((zone, idx) => (
                      <div key={idx} className="relative group border border-gray-200 hover:border-[#D4AF37] rounded-xl p-4 flex flex-col items-center justify-center text-center bg-[#F4F2EE]/30 hover:bg-white transition-all cursor-pointer">
                        <ImageIcon className="w-5 h-5 text-gray-400 group-hover:text-[#D4AF37] mb-2" />
                        <span className="text-[10px] font-bold text-gray-700 leading-tight">{zone}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* LUXURY DRAG & DROP CARDS FRAME */}
                <div className="border-2 border-dashed border-gray-300 hover:border-[#D4AF37] bg-[#F4F2EE]/20 rounded-2xl p-8 text-center transition-all relative group">
                  <input 
                    type="file" 
                    multiple 
                    onChange={handleFileChange} 
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" 
                  />
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-gray-200 flex items-center justify-center text-gray-400 group-hover:text-[#D4AF37] transition-colors">
                      <Upload className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-bold text-gray-800">Drag & drop raw files here or click to browse</p>
                    <p className="text-[10px] text-gray-400">Supports high-res PNG, JPG, JPEG architectural imagery</p>
                  </div>
                  {files.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2 justify-center">
                      {files.map((f, i) => (
                        <span key={i} className="text-[9px] font-mono font-bold bg-[#0B0F19] text-white px-2.5 py-1 rounded-md">{f.name}</span>
                      ))}
                    </div>
                  )}
                </div>

                {/* FIELDS ARCHITECTURE MATRICES */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-gray-700">Full Name</label>
                    <input required type="text" className="w-full bg-[#F4F2EE]/40 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1E3A8A] transition-colors" placeholder="Sir Alistair Vance" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-gray-700">Contact Phone Number</label>
                    <input required type="tel" className="w-full bg-[#F4F2EE]/40 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1E3A8A] transition-colors" placeholder="+44 7700 900077" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-gray-700">Secure Email Address</label>
                    <input required type="email" className="w-full bg-[#F4F2EE]/40 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1E3A8A] transition-colors" placeholder="vance@vancegroup.co.uk" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-gray-700">Property Address</label>
                    <input required type="text" className="w-full bg-[#F4F2EE]/40 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1E3A8A] transition-colors" placeholder="Mayfair, London W1J" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-gray-700">Project Type</label>
                    <select className="w-full bg-[#F4F2EE]/40 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1E3A8A] transition-colors appearance-none">
                      <option>Luxury House Extension</option>
                      <option>Premium Loft Conversion</option>
                      <option>Architectural Kitchen</option>
                      <option>Wellness Bathroom</option>
                      <option>High-Performance Roofing</option>
                      <option>Commercial Development</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-gray-700">Preferred Contact Method</label>
                    <select className="w-full bg-[#F4F2EE]/40 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1E3A8A] transition-colors appearance-none">
                      <option>Direct Phone Call</option>
                      <option>WhatsApp Secure Text</option>
                      <option>Secure Email Loop</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-gray-700">Preferred Call Time</label>
                    <select className="w-full bg-[#F4F2EE]/40 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1E3A8A] transition-colors appearance-none">
                      <option>Morning (08:00 - 12:00)</option>
                      <option>Afternoon (12:00 - 17:00)</option>
                      <option>Evening Concierge Window</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-baseline">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-gray-700">Target Budget Parameters <span className="text-gray-400 font-normal">(Optional)</span></label>
                  </div>
                  <select className="w-full bg-[#F4F2EE]/40 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1E3A8A] transition-colors appearance-none">
                    <option>Not Disclosed / Custom Baseline</option>
                    <option>£150,000 – £250,000</option>
                    <option>£250,000 – £500,000</option>
                    <option>£500,000 – £1,500,000+</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-gray-700">Project Description & Scope Details</label>
                  <textarea rows="4" className="w-full bg-[#F4F2EE]/40 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1E3A8A] transition-colors resize-none" placeholder="Provide details regarding programmatic structural constraints, target completion timelines..."></textarea>
                </div>

                <button 
                  type="submit" 
                  className="w-full py-4 bg-[#D4AF37] text-[#0B0F19] font-black rounded-xl text-xs tracking-widest uppercase shadow-xl hover:bg-[#D4AF37]/90 transition-all transform hover:-translate-y-0.5 cursor-pointer"
                >
                  Book Free Site Visit
                </button>
              </motion.form>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 flex flex-col items-center justify-center text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-[#22C55E]/10 flex items-center justify-center border border-[#22C55E]/30 text-[#22C55E] mb-2">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-[#0B0F19] tracking-tight">Transmission Authenticated</h3>
                <p className="text-gray-500 text-sm max-w-md font-light leading-relaxed">
                  Thank you. Our survey team will review your photos and contact you within 24 hours with a personalised quotation.
                </p>
                <button 
                  type="button"
                  onClick={() => { setFiles([]); setSubmitted(false); }}
                  className="mt-4 px-6 py-2 border border-gray-200 hover:border-gray-400 text-xs font-bold uppercase tracking-wider rounded-xl transition-all text-gray-600"
                >
                  Submit Alternative Site Photos
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section id="services" className="py-32 relative bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#1E3A8A] uppercase block">Core Competencies</span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#0B0F19] tracking-tight">Integrated Construction Architecture</h2>
          </div>
          <p className="text-gray-500 max-w-sm font-light text-sm leading-relaxed">
            Delivering multidisciplinary structural engineering, luxury residential transformations, and grade-A commercial environments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_DATA.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div 
                key={service.id}
                className="group bg-[#FDFBF7] rounded-3xl border border-gray-200/60 shadow-xs hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col justify-between"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity z-10" />
                  <img 
                    src={service.img} 
                    alt={service.title} 
                    className="w-full h-full object-cover transform group-hover:scale-103 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 w-11 h-11 rounded-xl bg-white/95 backdrop-blur-md shadow-lg flex items-center justify-center z-20 text-[#0B0F19] group-hover:bg-[#0B0F19] group-hover:text-white transition-all">
                    <IconComponent className="w-5 h-5" />
                  </div>
                </div>

                <div className="p-8 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold tracking-tight text-[#0B0F19] group-hover:text-[#1E3A8A] transition-colors">{service.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed font-light">{service.desc}</p>
                  </div>
                  
                  <div className="pt-4 flex items-center justify-between border-t border-gray-100 mt-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Structural Specs</span>
                    <div className="w-8 h-8 rounded-full bg-[#F4F2EE] flex items-center justify-center text-[#0B0F19] group-hover:bg-[#D4AF37] group-hover:text-[#0B0F19] transition-all">
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

function ProcessSection() {
  return (
    <section id="process" className="py-32 bg-[#0B0F19] text-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-24 space-y-3">
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#D4AF37] uppercase block">Rigorous Delivery Architecture</span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight">The Lifecycle of Absolute Certainty</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-6 relative">
          {PROCESS_STEPS.map((step, idx) => {
            const IconComp = step.icon;
            return (
              <div key={idx} className="space-y-5 relative group border border-white/5 bg-white/[0.02] p-5 rounded-2xl hover:bg-white/[0.04] transition-all">
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-black font-mono tracking-tight text-white/10 group-hover:text-[#D4AF37]/20 transition-colors">{step.phase}</span>
                  <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#0B0F19] transition-all">
                    <IconComp className="w-4 h-4" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-sm font-bold tracking-tight text-white">{step.title}</h3>
                  <p className="text-[11px] text-gray-400 leading-relaxed font-light">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function GoogleReviewsSection() {
  return (
    <section id="reviews" className="py-32 bg-[#F4F2EE]/40 border-b border-gray-200/60">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* GOOGLE HUB HEADER MARKS */}
        <div className="max-w-xl mx-auto text-center mb-16 space-y-4">
          <div className="flex items-center justify-center space-x-2">
            {/* GOOGLE BRANDED SCRIPT VECTOR WRAPPER */}
            <svg className="w-20 h-auto" viewBox="0 0 74 24" fill="currentColor">
              <path d="M12.2 4.4C10 4.4 7.9 5.3 6.3 6.9c-3.2 3.2-3.2 8.5 0 11.7 1.6 1.6 3.7 2.5 5.9 2.5 4.3 0 7.7-3 8.3-7.1h-8.3v-3.3h11.7c.1.6.2 1.2.2 1.9 0 3.6-1.3 7-3.6 9.4-2.3 2.3-5.5 3.6-8.5 3.6-3.3 0-6.4-1.3-8.7-3.6C.9 17.6.9 10.4 5.4 5.9c2.3-2.3 5.4-3.6 8.7-3.6 3.1 0 6 1.1 8.3 3.2L20 7.9c-1.5-1.4-3.5-2.2-5.5-2.2z" fill="#4285F4"/>
              <path d="M31.2 8.2c4.4 0 7.9 3.5 7.9 7.9s-3.5 7.9-7.9 7.9-7.9-3.5-7.9-7.9 3.5-7.9 7.9-7.9zm0 12.4c2.5 0 4.5-2 4.5-4.5s-2-4.5-4.5-4.5-4.5 2-4.5 4.5 2 4.5 4.5 4.5z" fill="#EA4335"/>
              <path d="M48.2 8.2c4.4 0 7.9 3.5 7.9 7.9s-3.5 7.9-7.9 7.9-7.9-3.5-7.9-7.9 3.5-7.9 7.9-7.9zm0 12.4c2.5 0 4.5-2 4.5-4.5s-2-4.5-4.5-4.5-4.5 2-4.5 4.5 2 4.5 4.5 4.5z" fill="#FBBC05"/>
              <path d="M64.9 8.2c4.1 0 7.2 3.2 7.7 7.2h-12c.4 2.4 2.5 4.1 4.9 4.1 1.8 0 3.3-.9 4.1-2.4l2.9 1.5c-1.4 2.6-4.1 4.3-7 4.3-4.4 0-7.9-3.5-7.9-7.9s3.5-7.9 7.3-7.9zm-4.2 6.1h8.3c-.3-1.9-1.9-3.2-3.9-3.2-2.1-.1-3.9 1.2-4.4 3.2z" fill="#4285F4"/>
            </svg>
            <span className="text-sm font-bold text-gray-500 tracking-wider">Business Trust</span>
          </div>

          <div className="bg-white px-5 py-3 rounded-2xl border border-gray-200 inline-flex items-center space-x-4 shadow-xs">
            <div className="text-left">
              <div className="flex items-center text-[#FBBC05] space-x-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-xs font-bold text-[#0B0F19] mt-0.5">★★★★★ 4.9 / 5.0</p>
            </div>
            <div className="w-px h-8 bg-gray-200" />
            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Based on 180+ Active Reviews</p>
          </div>
        </div>

        {/* REVIEWS GRID FRAME */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {GOOGLE_REVIEWS_DATA.map((rev, idx) => (
            <div key={idx} className="bg-white border border-gray-200/80 p-6 rounded-2xl shadow-xs flex flex-col justify-between space-y-4 relative">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img src={rev.photo} alt={rev.name} className="w-9 h-9 rounded-full object-cover border border-gray-100" />
                    <div>
                      <h4 className="text-xs font-bold text-[#0B0F19] flex items-center">{rev.name}</h4>
                      <p className="text-[10px] text-gray-400 mt-0.5">{rev.date}</p>
                    </div>
                  </div>
                  {/* GOOGLE ICON G GRAPHIC STAMP */}
                  <svg className="w-4 h-4 text-gray-300" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                  </svg>
                </div>

                <div className="flex items-center text-[#FBBC05] space-x-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                </div>

                <p className="text-xs text-gray-600 font-light leading-relaxed">"{rev.text}"</p>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[9px] tracking-widest font-bold uppercase text-[#22C55E] bg-[#22C55E]/10 px-2 py-0.5 rounded-sm">Verified Customer</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a 
            href="https://google.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-200 hover:border-gray-400 bg-white rounded-xl text-xs font-bold uppercase tracking-wider text-gray-700 transition-all shadow-xs"
          >
            <span>Read More Reviews</span>
            <ChevronRight className="w-3.5 h-3.5 ml-1.5" />
          </a>
        </div>

      </div>
    </section>
  );
}

function ContactSection({ setSurveyModal }) {
  const [callbackRequested, setCallbackRequested] = useState(false);

  return (
    <section id="contact" className="py-32 bg-[#0B0F19] text-white relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="text-[10px] font-bold tracking-[0.25em] text-[#D4AF37] uppercase block">Procurement Gateways</span>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-none">Initiate Modern Consultation</h2>
              <p className="text-gray-400 font-light text-sm max-w-xs leading-relaxed">
                Connect directly with our engineering estimation council or trigger immediate phone callbacks.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <a href="tel:+442079460958" className="flex items-center space-x-4 bg-white/[0.02] border border-white/5 hover:border-white/10 p-4 rounded-2xl transition-colors group">
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[9px] uppercase font-bold text-gray-400 tracking-wider">Call Now Concierge</p>
                  <p className="text-sm font-semibold text-white group-hover:text-[#D4AF37] transition-colors">+44 20 7946 0958</p>
                </div>
              </a>

              <a href="https://wa.me/442079460958" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 bg-white/[0.02] border border-white/5 hover:border-white/10 p-4 rounded-2xl transition-colors group">
                <div className="w-10 h-10 rounded-xl bg-[#22C55E]/10 flex items-center justify-center text-[#22C55E]">
                  <MessageCircle className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <p className="text-[9px] uppercase font-bold text-gray-400 tracking-wider">WhatsApp Secure Link</p>
                  <p className="text-sm font-semibold text-white group-hover:text-[#22C55E] transition-colors">Instant Mobile Text Chat</p>
                </div>
              </a>

              <div className="flex items-center space-x-4 bg-white/[0.02] border border-white/5 p-4 rounded-2xl">
                <div className="w-10 h-10 rounded-xl bg-[#1E3A8A]/20 flex items-center justify-center text-[#1E3A8A]">
                  <Mail className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <p className="text-[9px] uppercase font-bold text-gray-400 tracking-wider">Direct Tenders Repository</p>
                  <p className="text-sm font-semibold text-white">tenders@vanguardcontractors.co.uk</p>
                </div>
              </div>
            </div>
          </div>

          {/* REQUEST CALLBACK FORM BLOCK */}
          <div className="lg:col-span-7">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-10 space-y-6 backdrop-blur-xl">
              <div className="space-y-1">
                <h3 className="text-xl font-bold tracking-tight">Request an Immediate Callback</h3>
                <p className="text-xs text-gray-400 font-light">Provide credentials below to link with structural engineering supervisors.</p>
              </div>

              <AnimatePresence mode="wait">
                {!callbackRequested ? (
                  <form onSubmit={(e) => { e.preventDefault(); setCallbackRequested(true); }} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[9px] uppercase font-bold tracking-wider text-gray-300">Your Name</label>
                        <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]" placeholder="e.g. Alistair Vance" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[9px] uppercase font-bold tracking-wider text-gray-300">Phone Number</label>
                        <input required type="tel" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]" placeholder="+44" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[9px] uppercase font-bold tracking-wider text-gray-300">Scope Summary</label>
                      <select className="w-full bg-[#0B0F19] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]">
                        <option>Immediate House Extension Survey</option>
                        <option>Premium Loft Conversion Assessment</option>
                        <option>Architectural Renovation Query</option>
                      </select>
                    </div>
                    <button type="submit" className="w-full py-3.5 bg-[#D4AF37] text-[#0B0F19] font-bold rounded-xl text-xs tracking-widest uppercase transition-all transform hover:-translate-y-0.5 cursor-pointer">
                      Request Callback
                    </button>
                    <button 
                      type="button"
                      onClick={() => setSurveyModal(true)}
                      className="w-full py-3.5 bg-white/5 border border-white/10 text-white font-bold rounded-xl text-xs tracking-widest uppercase hover:bg-white/10 transition-all text-center block"
                    >
                      Launch Photo Survey Portal Instead
                    </button>
                  </form>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="py-8 text-center space-y-3"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E] mx-auto flex items-center justify-center">
                      <Clock className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold">Callback Routing Authorized</h4>
                    <p className="text-xs text-gray-400 max-w-xs mx-auto font-light">An engineer will prompt your mobile network within 15 minutes.</p>
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

function Footer() {
  return (
    <footer className="bg-[#0B0F19] text-white pt-16 pb-28 lg:pb-12 border-t border-white/5 relative z-20">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-12 border-b border-white/5">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-[#D4AF37] rounded-xl flex items-center justify-center">
              <Building2 className="w-5 h-5 text-[#0B0F19]" />
            </div>
            <div>
              <span className="text-sm font-bold tracking-tight uppercase block">VANGUARD</span>
              <span className="text-[8px] tracking-widest text-[#D4AF37] font-semibold uppercase">Contractors United Kingdom</span>
            </div>
          </div>
          <p className="text-xs text-gray-400 font-light max-w-xs md:text-right">
            Premium corporate master-builders registered under regulatory frameworks of England and Wales.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-gray-500 font-medium tracking-wider uppercase">
          <p>© 2026 Vanguard Main Contractors UK Ltd. All Engineering Rights Reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">Regulatory Compliance</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Parameters</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function StickyCTABars({ setSurveyModal }) {
  return (
    <>
      {/* DESKTOP PERMANENT UPPER RENDER LAYER */}
      <div className="hidden lg:flex fixed bottom-6 right-6 z-[999] items-center space-x-3 pointer-events-auto">
        <button
          type="button"
          onClick={() => setSurveyModal(true)}
          className="bg-[#0B0F19] hover:bg-[#1E3A8A] text-white border border-white/10 px-6 py-3.5 rounded-xl text-xs font-black tracking-widest uppercase shadow-2xl transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center space-x-2"
        >
          <FileText className="w-4 h-4 text-[#D4AF37]" />
          <span>Request Quote</span>
        </button>
      </div>

      {/* MOBILE FLOATING TAB DUAL BAR TRACK */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 h-16 bg-[#0B0F19]/90 backdrop-blur-xl border-t border-white/10 z-[9999] grid grid-cols-2 gap-px divide-x divide-white/10">
        <a 
          href="tel:+442079460958" 
          className="flex items-center justify-center space-x-2 text-white font-bold text-xs uppercase tracking-wider active:bg-white/5"
        >
          <Phone className="w-4 h-4 text-[#D4AF37]" />
          <span>Call Now</span>
        </a>
        <a 
          href="https://wa.me/442079460958" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center space-x-2 text-white font-bold text-xs uppercase tracking-wider active:bg-white/5"
        >
          <MessageCircle className="w-4 h-4 text-[#22C55E] fill-current" />
          <span>WhatsApp</span>
        </a>
      </div>
    </>
  );
}

function VideoModal({ videoModal, setVideoModal }) {
  return (
    <AnimatePresence>
      {videoModal && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setVideoModal(false)}
          className="fixed inset-0 bg-[#0B0F19]/95 z-[99999] flex items-center justify-center p-4 backdrop-blur-xl"
        >
          <motion.div 
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            className="w-full max-w-4xl aspect-video bg-[#0B0F19] rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative flex flex-col items-center justify-center text-center p-8 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              type="button"
              onClick={() => setVideoModal(false)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-16 h-16 rounded-full bg-[#D4AF37]/10 flex items-center justify-center border border-[#D4AF37]/30">
              <HardHat className="w-8 h-8 text-[#D4AF37] animate-pulse" />
            </div>
            <h3 className="text-xl font-bold">Vanguard Site Operations Reel</h3>
            <p className="text-gray-400 text-xs max-w-sm font-light">Cinematic overview feed tracking live luxury developments in Kensington and Mayfair sectors.</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SurveyModal({ surveyModal, setSurveyModal }) {
  const [submitted, setSubmitted] = useState(false);
  const [files, setFiles] = useState([]);

  return (
    <AnimatePresence>
      {surveyModal && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSurveyModal(false)}
          className="fixed inset-0 bg-[#0B0F19]/80 z-[99999] flex items-center justify-center p-4 backdrop-blur-md overflow-y-auto"
        >
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            className="w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100 relative p-6 sm:p-10 my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              type="button"
              onClick={() => { setSurveyModal(false); setSubmitted(false); }}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 cursor-pointer z-50"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <h3 className="text-xl font-black text-[#0B0F19] tracking-tight">Request Personalised Site Survey Proposal</h3>
              <p className="text-xs text-gray-400 font-light mt-1">Provide data blocks to schedule physical or photo-analyzed asset appraisal.</p>
            </div>

            {!submitted ? (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input required type="text" className="w-full bg-[#F4F2EE]/60 border border-gray-200 rounded-xl px-4 py-3 text-xs focus:outline-none" placeholder="Name" />
                  <input required type="tel" className="w-full bg-[#F4F2EE]/60 border border-gray-200 rounded-xl px-4 py-3 text-xs focus:outline-none" placeholder="Phone Number" />
                </div>
                <input required type="email" className="w-full bg-[#F4F2EE]/60 border border-gray-200 rounded-xl px-4 py-3 text-xs focus:outline-none" placeholder="Email Address" />
                <input required type="text" className="w-full bg-[#F4F2EE]/60 border border-gray-200 rounded-xl px-4 py-3 text-xs focus:outline-none" placeholder="Property Location Address" />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <select className="w-full bg-[#F4F2EE]/60 border border-gray-200 rounded-xl px-4 py-3 text-xs focus:outline-none appearance-none">
                    <option>Extension Portfolio Scope</option>
                    <option>Premium Loft Conversion</option>
                    <option>Wellness Bathroom Archetype</option>
                  </select>
                  <select className="w-full bg-[#F4F2EE]/60 border border-gray-200 rounded-xl px-4 py-3 text-xs focus:outline-none appearance-none">
                    <option>Direct Mobile Call Loop</option>
                    <option>WhatsApp Messaging Only</option>
                  </select>
                </div>

                <div className="border-2 border-dashed border-gray-200 p-6 text-center rounded-xl bg-gray-50/50">
                  <Upload className="w-5 h-5 text-gray-400 mx-auto mb-2" />
                  <p className="text-[11px] font-bold text-gray-700">Click or Drop Site Images here</p>
                </div>

                <textarea rows="3" className="w-full bg-[#F4F2EE]/60 border border-gray-200 rounded-xl px-4 py-3 text-xs focus:outline-none resize-none" placeholder="Project Description details..."></textarea>
                
                <button type="submit" className="w-full py-3.5 bg-[#D4AF37] text-[#0B0F19] font-black rounded-xl text-xs tracking-widest uppercase shadow-md cursor-pointer">
                  Request Consultation
                </button>
              </form>
            ) : (
              <div className="py-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/20 text-[#22C55E] mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-[#0B0F19]">Submission Authenticated</h4>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">Thank you. Our survey team will review your photos and contact you within 24 hours with a personalised quotation.</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}