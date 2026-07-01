import React, { useState, useEffect, useRef, useMemo, memo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  Building2, HardHat, Paintbrush, ShieldCheck, ArrowUpRight, Phone, MapPin,
  Menu, X, CheckCircle2, Star, Play, Layers, Compass, Ruler, Key, FileText,
  Upload, Image as ImageIcon, MessageCircle, Clock, ChevronRight, Shield,
  Trash2, Calendar, Eye, Mail, Linkedin, Users, Award, Wrench, TrendingUp,
  Home, Zap, ChevronDown, ArrowRight, Quote
} from 'lucide-react';

/* ================================================================
   IMAGES — All premium, high-res, no repeats
================================================================ */
const IMG = {
  hero:        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1800&q=85',
  heroMob:     'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
  ext1:        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80',
  ext2:        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80',
  loft1:       'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=900&q=80',
  kitchen1:    'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=900&q=80',
  kitchen2:    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=900&q=80',
  bath1:       'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=900&q=80',
  bath2:       'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=900&q=80',
  roof1:       'https://images.unsplash.com/photo-1632759145351-1d592919f522?auto=format&fit=crop&w=900&q=80',
  commercial1: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80',
  commercial2: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80',
  civil1:      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=900&q=80',
  landscape1:  'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=80',
  landscape2:  'https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=900&q=80',
  driveway1:   'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=900&q=80',
  interior1:   'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80',
  workers1:    'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80',
  luxury1:     'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=900&q=80',
  luxury2:     'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80',
  luxury3:     'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=900&q=80',
  bfKitchenB:  'https://images.unsplash.com/photo-1565183997392-2f6f122e5912?auto=format&fit=crop&w=1200&q=80',
  bfKitchenA:  'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
  bfBathB:     'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
  bfBathA:     'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1200&q=80',
  bfRoofB:     'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80',
  bfRoofA:     'https://images.unsplash.com/photo-1632759145351-1d592919f522?auto=format&fit=crop&w=1200&q=80',
  bfExtB:      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80',
  bfExtA:      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  ceo:         'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=500&q=80',
  pm:          'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=500&q=80',
  eng:         'https://images.unsplash.com/photo-1581091870622-1c6f6e3f5b66?auto=format&fit=crop&w=500&q=80',
  arch:        'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=500&q=80',
  sup:         'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=500&q=80',
  t1:          'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=200&q=80',
  t2:          'https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=200&q=80',
  t3:          'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
};

/* ================================================================
   DATA
================================================================ */
const TRUST_LOGOS = [
  { name: 'Gas Safe', desc: 'Registered' },
  { name: 'TrustMark', desc: 'Government Endorsed' },
  { name: 'FMB Member', desc: 'Master Builders' },
  { name: 'Checkatrade', desc: 'Vetted & Approved 9.9/10' },
  { name: 'NICEIC', desc: 'Electrical Certified' },
  { name: '£10M Insured', desc: 'Public Liability' },
  { name: 'NHBC Member', desc: 'New Homes Warranty' },
  { name: 'Google', desc: '4.9 ★ 180+ Reviews' },
];

const GALLERY_ITEMS = [
  { id:1, cat:'Extension', title:'The Glass Pavilion Rear Extension', loc:'Kensington, London', year:'2025', img:IMG.ext1, desc:'Double-storey glass extension with bifold doors.' },
  { id:2, cat:'Kitchen',   title:'Architectural Culinary Hub', loc:'Chelsea, London', year:'2026', img:IMG.kitchen1, desc:'Open-plan kitchen with Corian worktops and island.' },
  { id:3, cat:'Bathroom',  title:'Spa-Grade Wellness Retreat', loc:'Belgravia, London', year:'2025', img:IMG.bath1, desc:'Full wet room with underfloor heating and feature wall.' },
  { id:4, cat:'House',     title:'Masterwork Residential Conversion', loc:'Richmond, London', year:'2025', img:IMG.luxury1, desc:'Full modernisation of a 1930s semi-detached home.' },
  { id:5, cat:'Roof',      title:'High-Performance Slate Re-roof', loc:'Hampstead, London', year:'2025', img:IMG.roof1, desc:'Full structural re-roof using Welsh slate.' },
  { id:6, cat:'Commercial',title:'Grade-A Corporate Headquarters', loc:'City of London', year:'2026', img:IMG.commercial1, desc:'Cat-B office fit-out across 4 floors.' },
  { id:7, cat:'Landscaping',title:'Luxury Garden Transformation', loc:'Wimbledon, London', year:'2026', img:IMG.landscape1, desc:'Full garden redesign with outdoor kitchen.' },
  { id:8, cat:'Extension', title:'Side Return & Loft Double-Up', loc:'Islington, London', year:'2025', img:IMG.ext2, desc:'Side return plus loft on a Victorian terrace.' },
  { id:9, cat:'Interior',  title:'Luxury Interior Full Refresh', loc:'Mayfair, London', year:'2026', img:IMG.interior1, desc:'Full interior specification and project management.' },
  { id:10, cat:'Commercial',title:'Modern Retail Showroom', loc:'Canary Wharf', year:'2025', img:IMG.commercial2, desc:'Premium retail fit-out with bespoke joinery.' },
  { id:11, cat:'House',    title:'Contemporary New Build', loc:'Surrey', year:'2026', img:IMG.luxury2, desc:'5-bed contemporary new build, turnkey.' },
  { id:12, cat:'Landscaping',title:'Patio & Driveway Complete', loc:'Hertfordshire', year:'2025', img:IMG.driveway1, desc:'Block paving driveway and Indian stone patio.' },
  { id:13, cat:'Kitchen',  title:'Bifold-Opening Kitchen Diner', loc:'Brighton', year:'2025', img:IMG.kitchen2, desc:'Rear extension with bifold kitchen diner layout.' },
  { id:14, cat:'Bathroom', title:'Art Deco Master En-suite', loc:'Bath', year:'2026', img:IMG.bath2, desc:'Art deco inspired en-suite with freestanding bath.' },
  { id:15, cat:'House',    title:'Full Victorian Terrace Renovation', loc:'Bristol', year:'2026', img:IMG.luxury3, desc:'Gut renovation of a 3-storey Victorian terrace.' },
];

const BEFORE_AFTER_DATA = [
  { id:'kitchen', label:'Kitchen Renovation', before:IMG.bfKitchenB, after:IMG.bfKitchenA },
  { id:'bathroom', label:'Bathroom Transformation', before:IMG.bfBathB, after:IMG.bfBathA },
  { id:'roof', label:'Roof Structural Rebuild', before:IMG.bfRoofB, after:IMG.bfRoofA },
  { id:'extension', label:'Rear Extension', before:IMG.bfExtB, after:IMG.bfExtA },
];

const CASE_STUDIES = [
  { img:IMG.ext1, client:'Sarah & Tom Fletcher', type:'Rear Extension', loc:'Wandsworth, London', challenge:'Victorian terrace with a dark cramped kitchen — no natural light.', solution:'Double-storey glass extension with bifold doors, steel RSJs and a lantern roof light.', timeline:'10 weeks', outcome:'Property value increased by £120,000. Flooded with natural light year-round.', rating:5 },
  { img:IMG.kitchen2, client:'The Patel Family', type:'Kitchen Renovation', loc:'Finchley, London', challenge:'Closed-plan 1970s kitchen — unusable for a family of five.', solution:'Removed load-bearing wall, installed steel beam, full open-plan kitchen-diner with island.', timeline:'6 weeks', outcome:'Completely transformed daily family life. Resale value up £75K.', rating:5 },
  { img:IMG.loft1, client:'Mr J. Harrison', type:'Loft Conversion', loc:'Streatham, London', challenge:'Wasted roof space. Client needed a home office and a 4th bedroom.', solution:'Full dormer loft conversion with Velux rooflights, ensuite and bespoke storage.', timeline:'8 weeks', outcome:'Added 2 rooms and £95,000 to the property. Planning approved in 6 weeks.', rating:5 },
  { img:IMG.bath1, client:'Olivia Bennett', type:'Bathroom & Ensuite', loc:'Richmond, Surrey', challenge:'Dated avocado bathroom with no ensuite. Client wanted spa-grade wet room.', solution:'Full strip-out, tanking, underfloor heating, feature wall tiles and a freestanding bath.', timeline:'4 weeks', outcome:'Immaculate finish. Client described it as "better than a 5-star hotel".', rating:5 },
  { img:IMG.commercial1, client:'TechStart Ltd', type:'Office Fit-Out', loc:'Shoreditch, London', challenge:'Raw shell office space needed full Cat B fit-out for 80 staff in 8 weeks.', solution:'Partitioned layout, meeting pods, kitchen, AV, M&E, decorating and furniture install.', timeline:'7 weeks', outcome:'Delivered on time and on budget. Staff capacity from 0 to 80 within deadline.', rating:5 },
  { img:IMG.landscape2, client:'Mr & Mrs Sharma', type:'Garden & Patio', loc:'Esher, Surrey', challenge:'Overgrown rear garden with no usable outdoor living area.', solution:'Full landscaping, Indian stone patio, outdoor kitchen, lighting and planting scheme.', timeline:'5 weeks', outcome:'Stunning outdoor space. Used year-round. Client threw a garden party the following weekend.', rating:5 },
  { img:IMG.luxury2, client:'Windermere Homes', type:'New Build', loc:'Guildford, Surrey', challenge:'Developer needed a turnkey 5-bedroom new build with planning in 18 months.', solution:'Architectural drawings, planning, groundworks, frame, fit-out and landscaping end-to-end.', timeline:'16 months', outcome:'Sold for £1.85M within 3 weeks of completion. Developer now on 3rd project with us.', rating:5 },
  { img:IMG.driveway1, client:'Dr A. Williams', type:'Driveway & Garage', loc:'Cobham, Surrey', challenge:'Broken tarmac driveway and a detached garage in disrepair.', solution:'Full resin-bound driveway, block edging, new up-and-over electric garage door, LED bollards.', timeline:'3 weeks', outcome:'Kerb appeal transformed. Neighbour booked the same week.', rating:5 },
];

const PROCESS_STEPS = [
  { phase:'01', title:'Free Survey', desc:'We visit your property at no cost, assess the scope and listen to your vision.', icon:FileText },
  { phase:'02', title:'Planning', desc:'Architectural drawings, planning applications and building control handled for you.', icon:Compass },
  { phase:'03', title:'Quotation', desc:'A clear, itemised fixed-price quote — no hidden charges, ever.', icon:Ruler },
  { phase:'04', title:'Construction', desc:'Dedicated site manager. Daily updates. Professional, tidy team on-site.', icon:HardHat },
  { phase:'05', title:'Inspection', desc:'Independent structural sign-off and building control approval at every stage.', icon:ShieldCheck },
  { phase:'06', title:'Completion', desc:'Final walkthrough with you. Snag list actioned before we hand over keys.', icon:Key },
  { phase:'07', title:'Aftercare', desc:'15-year structural warranty and dedicated aftercare contact for life.', icon:Shield },
];

const TEAM = [
  { name:'James Whitfield', role:'Managing Director', exp:'22 yrs', bio:'Founded Vanguard in 2003. Oversees every major project personally.', img:IMG.ceo },
  { name:'Sarah Patel', role:'Head of Projects', exp:'14 yrs', bio:'RICS qualified. Manages all project timelines and client communication.', img:IMG.pm },
  { name:'Marcus Owusu', role:'Structural Engineer', exp:'17 yrs', bio:'CEng MIStructE. Specialises in steel and complex structural alterations.', img:IMG.eng },
  { name:'Eleanor Bright', role:'Principal Architect', exp:'12 yrs', bio:'ARB registered. Produces all planning drawings and specifications in-house.', img:IMG.arch },
  { name:'Dean Harrington', role:'Site Supervisor', exp:'18 yrs', bio:'CSCS Gold Card holder. Runs our on-site teams across London and Surrey.', img:IMG.sup },
];

const REVIEWS_DATA = [
  { id:1, name:'Lord Sterling Thorne', date:'6 days ago', text:'Vanguard completed our rear extension two weeks ahead of schedule. The quality of finish is genuinely exceptional — we have used many contractors over the years and these are the best.', photo:IMG.t1, helpful:14, rating:5 },
  { id:2, name:'Lady Genevieve Rose', date:'3 weeks ago', text:'Our glasshouse extension required real structural ingenuity. Vanguard obtained planning in 5 weeks and completed the build within budget. Their communication throughout was outstanding.', photo:IMG.t2, helpful:8, rating:5 },
  { id:3, name:'Alistair Vance', date:'1 month ago', text:'Outstanding loft conversion in Richmond. We now have a stunning master suite with an ensuite and walk-in wardrobe. Completed on time, on budget, fully building control approved.', photo:IMG.t3, helpful:22, rating:5 },
];

const WHY_US = [
  { icon:Award,     title:'20+ Years Experience', desc:'Established 2003. Over two decades building across London and the South East.' },
  { icon:Building2, title:'1,000+ Projects', desc:'From single bathroom renovations to £2M commercial builds.' },
  { icon:ShieldCheck,title:'Fully Insured', desc:'£10M public liability. All work covered by insurance-backed warranty.' },
  { icon:FileText,  title:'Free Site Survey', desc:'No-obligation survey and written quotation at no cost to you.' },
  { icon:TrendingUp,title:'Fixed Pricing', desc:'Your quote is your price. No surprise invoices or hidden extras.' },
  { icon:Users,     title:'Qualified In-House Team', desc:'CSCS, RICS, ARB, CEng and Gas Safe registered professionals.' },
  { icon:Wrench,    title:'Modern Equipment', desc:'Latest-generation plant and machinery on every site.' },
  { icon:Compass,   title:'Planning Assistance', desc:'We handle all planning and building control applications for you.' },
  { icon:Key,       title:'15-Year Warranty', desc:'Industry-leading structural warranty on every project.' },
  { icon:Phone,     title:'24/7 Emergency Line', desc:'Something urgent? Our emergency team picks up around the clock.' },
];

const GALLERY_FILTERS = ['All','House','Extension','Kitchen','Bathroom','Roof','Commercial','Landscaping','Interior'];


/* ================================================================
   SHARED UTILITIES
================================================================ */
const fadeUp = { hidden:{opacity:0,y:24}, show:{opacity:1,y:0,transition:{duration:0.65,ease:[0.22,1,0.36,1]}} };
const stagger = { show:{transition:{staggerChildren:0.09}} };

function useInView(threshold=0.18){
  const ref=useRef(null);
  const [v,setV]=useState(false);
  useEffect(()=>{
    const o=new IntersectionObserver(([e])=>e.isIntersecting&&setV(true),{threshold});
    if(ref.current)o.observe(ref.current);
    return()=>o.disconnect();
  },[threshold]);
  return [ref,v];
}

function Section({children,className=''}){
  const [ref,v]=useInView(0.1);
  return(
    <motion.section ref={ref} variants={stagger} initial="hidden" animate={v?'show':'hidden'} className={className}>
      {children}
    </motion.section>
  );
}

function FV({children,className='',delay=0}){
  return(
    <motion.div variants={fadeUp} transition={{delay}} className={className}>
      {children}
    </motion.div>
  );
}

const TrustTicker = memo(()=>(
  <div className="w-full bg-white border-y border-gray-200/80 py-7 overflow-hidden relative select-none">
    <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"/>
    <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"/>
    <div className="flex whitespace-nowrap items-center">
      <div className="flex space-x-8 animate-marquee">
        {[...TRUST_LOGOS,...TRUST_LOGOS].map((logo,idx)=>(
          <div key={idx} className="inline-flex flex-col items-center justify-center min-w-[190px] bg-gray-50 border border-gray-200 rounded-xl px-5 py-3 hover:border-[#D4AF37] transition-colors">
            <span className="text-[11px] font-black tracking-wider text-[#0B0F19] uppercase">{logo.name}</span>
            <span className="text-[9px] text-[#D4AF37] tracking-widest font-bold uppercase mt-0.5">{logo.desc}</span>
          </div>
        ))}
      </div>
    </div>
    <style>{`
      @keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
      .animate-marquee{animation:marquee 38s linear infinite;display:flex}
    `}</style>
  </div>
));

/* ================================================================
   NAVBAR
================================================================ */
function Navbar({setSurveyModal}){
  const [scrolled,setScrolled]=useState(false);
  const [open,setOpen]=useState(false);
  useEffect(()=>{
    const h=()=>setScrolled(window.scrollY>50);
    window.addEventListener('scroll',h,{passive:true});
    return()=>window.removeEventListener('scroll',h);
  },[]);
  const links=['Gallery','Transformation','Survey','Services','Process','Team','Reviews','Contact'];
  return(
    <motion.nav initial={{y:-30,opacity:0}} animate={{y:0,opacity:1}}
      className={`fixed top-0 inset-x-0 z-[999] transition-all duration-500 ${scrolled?'bg-[#0B0F19]/96 backdrop-blur-2xl border-b border-white/10 py-3 shadow-2xl':'bg-gradient-to-b from-[#0B0F19]/85 to-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-5 flex items-center justify-between">
        <a href="#" className="flex items-center space-x-2.5 group">
          <div className="w-10 h-10 bg-gradient-to-tr from-[#D4AF37] to-[#1E3A8A] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <Building2 className="w-5 h-5 text-white"/>
          </div>
          <div>
            <span className="text-base font-black tracking-tight text-white uppercase leading-none block">VANGUARD</span>
            <span className="text-[8px] tracking-[0.28em] font-bold text-[#D4AF37] uppercase leading-none">Contractors UK</span>
          </div>
        </a>
        <div className="hidden xl:flex items-center space-x-0.5">
          {links.map(l=>(
            <a key={l} href={`#${l.toLowerCase()}`}
              className="text-[11px] font-bold tracking-widest uppercase text-white/75 hover:text-[#D4AF37] px-3.5 py-2.5 rounded-xl transition-all hover:bg-white/5">
              {l}
            </a>
          ))}
        </div>
        <div className="hidden lg:flex items-center space-x-5">
          <a href="tel:+442079460958" className="flex items-center space-x-2 text-white hover:text-[#D4AF37] transition-colors text-xs font-black uppercase tracking-wider">
            <Phone className="w-3.5 h-3.5 text-[#D4AF37]"/>
            <span>020 7946 0958</span>
          </a>
          <button onClick={()=>setSurveyModal(true)}
            className="px-5 py-2.5 rounded-xl font-black text-[11px] tracking-widest uppercase bg-[#D4AF37] text-[#0B0F19] hover:bg-white transition-all duration-300 shadow-lg hover:-translate-y-0.5">
            Free Quote
          </button>
        </div>
        <button onClick={()=>setOpen(!open)} className="xl:hidden w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl text-white backdrop-blur">
          {open?<X className="w-5 h-5"/>:<Menu className="w-5 h-5"/>}
        </button>
      </div>
      <AnimatePresence>
        {open&&(
          <motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}} exit={{opacity:0,height:0}}
            className="absolute top-full inset-x-0 bg-[#0B0F19]/98 border-b border-white/10 xl:hidden overflow-hidden backdrop-blur-3xl">
            <div className="px-6 py-8 flex flex-col space-y-3">
              {links.map(l=>(
                <a key={l} href={`#${l.toLowerCase()}`} onClick={()=>setOpen(false)}
                  className="text-xs font-bold tracking-widest text-white/85 hover:text-[#D4AF37] uppercase py-2 border-b border-white/5">
                  {l}
                </a>
              ))}
              <button onClick={()=>{setOpen(false);setSurveyModal(true);}}
                className="w-full py-4 bg-[#D4AF37] text-[#0B0F19] font-black rounded-xl text-xs tracking-widest uppercase mt-2">
                Free Quote
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ================================================================
   HERO  — full-screen premium image, parallax, 35–40% overlay
================================================================ */
function Hero({setSurveyModal,setVideoModal}){
  const ref=useRef(null);
  const {scrollYProgress}=useScroll({target:ref,offset:['start start','end start']});
  const imgY=useTransform(scrollYProgress,[0,1],['0%','18%']);
  const fade=useTransform(scrollYProgress,[0,0.75],[1,0]);

  const chips=[
    {t:'20+ Years', s:'Engineering Excellence'},
    {t:'1,000+ Projects', s:'Across London & South East'},
    {t:'4.9 Google Rating', s:'180+ Verified Reviews'},
    {t:'15-Year Warranty', s:'On Every Build'},
    {t:'Free Site Survey', s:'No Obligation'},
  ];

  return(
    <section ref={ref} id="home" className="relative w-full min-h-screen flex items-center justify-end overflow-hidden bg-[#0B0F19]">
      {/* PARALLAX IMAGE */}
      <motion.div style={{y:imgY}} className="absolute inset-0 z-0 scale-110 pointer-events-none">
        <div className="absolute inset-0 z-10"
          style={{background:'linear-gradient(to bottom, rgba(11,15,25,0.62) 0%, rgba(11,15,25,0.28) 45%, rgba(11,15,25,0.72) 100%)'}}/>
        <div className="absolute inset-0 z-10"
          style={{background:'linear-gradient(to right, rgba(11,15,25,0.92) 0%, rgba(11,15,25,0.35) 55%, rgba(11,15,25,0.55) 100%)'}}/>
        <img src={IMG.hero} alt="Luxury UK construction project" className="w-full h-full object-cover"/>
      </motion.div>

      {/* GOLD AMBIENT GLOW */}
      <div className="absolute top-1/3 left-1/4 w-[32rem] h-[32rem] bg-[#D4AF37]/6 rounded-full blur-[120px] pointer-events-none z-[1]"/>

      <div className="relative z-20 max-w-7xl mx-auto px-5 lg:px-8 w-full pb-20 pt-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">

          {/* HEADLINE COLUMN */}
          <motion.div style={{opacity:fade}} className="lg:col-span-7 space-y-7">
            <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:0.1}}
              className="inline-flex items-center space-x-2.5 bg-white/8 border border-white/12 backdrop-blur-xl px-4 py-2 rounded-full">
              <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse"/>
              <span className="text-white/90 font-black tracking-[0.18em] text-[10px] uppercase">Premium UK Construction Specialists</span>
            </motion.div>

            <motion.h1 initial={{opacity:0,y:22}} animate={{opacity:1,y:0}} transition={{delay:0.18}}
              className="text-5xl sm:text-6xl xl:text-7xl font-black text-white tracking-tight leading-[1.05]">
              Building Beautiful<br/>
              <span className="text-transparent bg-clip-text" style={{backgroundImage:'linear-gradient(135deg, #D4AF37 0%, #F5C242 45%, #fff 100%)'}}>
                Homes. Built to Last.
              </span>
            </motion.h1>

            <motion.p initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{delay:0.26}}
              className="text-base text-gray-300 max-w-lg font-light leading-relaxed">
              Award-winning construction, extensions, renovations and commercial fit-outs across London and the South East — delivered on time and on budget since 2003.
            </motion.p>

            <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.34}}
              className="flex flex-col sm:flex-row gap-3 pt-2">
              <button onClick={()=>setSurveyModal(true)}
                className="group inline-flex items-center justify-center px-7 py-4 rounded-xl bg-[#D4AF37] text-[#0B0F19] font-black tracking-widest uppercase text-xs shadow-[0_14px_32px_rgba(212,175,55,0.35)] hover:bg-white hover:-translate-y-0.5 transition-all">
                Book Free Site Survey <ArrowUpRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"/>
              </button>
              <a href="#gallery" className="inline-flex items-center justify-center px-7 py-4 rounded-xl bg-white/8 border border-white/14 hover:bg-white/14 backdrop-blur-xl text-white font-black tracking-widest uppercase text-xs transition-all">
                View Our Work
              </a>
              <button onClick={()=>setVideoModal(true)} className="inline-flex items-center space-x-2.5 text-white/75 hover:text-[#D4AF37] group transition-colors py-2">
                <span className="w-11 h-11 rounded-full bg-white/8 border border-white/12 group-hover:border-[#D4AF37] flex items-center justify-center backdrop-blur-xl transition-all">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5"/>
                </span>
                <span className="text-[10px] font-black tracking-widest uppercase">Watch Showreel</span>
              </button>
            </motion.div>
          </motion.div>

          {/* STACKED CHIPS */}
          <div className="lg:col-span-5 flex flex-col space-y-3 lg:items-end">
            {chips.map((c,i)=>(
              <motion.div key={i} initial={{opacity:0,x:40}} animate={{opacity:1,x:0}} transition={{delay:0.2+i*0.08,type:'spring',stiffness:90}}
                whileHover={{scale:1.03,x:-6}}
                className="bg-white/5 border border-white/10 backdrop-blur-xl p-4 rounded-2xl flex items-center space-x-4 w-full max-w-xs group hover:border-[#D4AF37]/50 transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#0B0F19] transition-all shrink-0">
                  <CheckCircle2 className="w-5 h-5"/>
                </div>
                <div>
                  <p className="text-white text-xs font-black uppercase tracking-wider">{c.t}</p>
                  <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest mt-0.5">{c.s}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* SCROLL HINT */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 z-20 animate-bounce">
        <ChevronDown className="w-5 h-5"/>
      </div>
    </section>
  );
}

/* ================================================================
   GALLERY — 15 projects, masonry, filter, lightbox
================================================================ */
function Gallery({setLightboxImage}){
  const [active,setActive]=useState('All');
  const items=useMemo(()=>active==='All'?GALLERY_ITEMS:GALLERY_ITEMS.filter(i=>i.cat===active),[active]);
  return(
    <Section id="gallery" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex flex-col xl:flex-row xl:items-end justify-between mb-14 gap-6">
          <FV>
            <span className="text-[10px] font-black uppercase tracking-[0.22em] text-[#1E3A8A] block mb-2">Our Work</span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#0B0F19] tracking-tight">Our Projects</h2>
          </FV>
          <FV>
            <div className="flex flex-wrap gap-1.5 bg-gray-100 p-1.5 rounded-2xl">
              {GALLERY_FILTERS.map(f=>(
                <button key={f} onClick={()=>setActive(f)}
                  className={`text-[10px] font-black tracking-widest px-4 py-2.5 rounded-xl uppercase transition-all whitespace-nowrap ${active===f?'bg-[#0B0F19] text-white shadow':'text-gray-500 hover:text-[#0B0F19]'}`}>
                  {f}
                </button>
              ))}
            </div>
          </FV>
        </div>

        <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          <AnimatePresence mode="popLayout">
            {items.map(item=>(
              <motion.div layout key={item.id} initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0.95}} transition={{duration:0.35}}
                className="break-inside-avoid relative rounded-2xl overflow-hidden border border-gray-100 shadow-sm group bg-gray-50 cursor-pointer"
                onClick={()=>setLightboxImage(item.img)}>
                <div className="relative w-full overflow-hidden aspect-[4/3]">
                  <img src={item.img} alt={item.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-107 transition-transform duration-700 ease-out"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/90 via-[#0B0F19]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400"/>
                  <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 shadow">
                    <Eye className="w-4 h-4 text-[#0B0F19]"/>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-400 pointer-events-none">
                    <span className="text-[9px] tracking-widest text-[#D4AF37] font-black uppercase">{item.cat}</span>
                    <h4 className="text-sm font-bold mt-0.5 leading-tight">{item.title}</h4>
                    <p className="text-xs text-gray-300 flex items-center mt-1"><MapPin className="w-3 h-3 mr-1 text-[#D4AF37]"/>{item.loc}</p>
                    <p className="text-[10px] text-gray-400 mt-1">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </Section>
  );
}

/* ================================================================
   BEFORE / AFTER SLIDER
================================================================ */
function BeforeAfter(){
  const [tab,setTab]=useState('kitchen');
  const [pos,setPos]=useState(50);
  const cRef=useRef(null);
  const pair=useMemo(()=>BEFORE_AFTER_DATA.find(d=>d.id===tab)||BEFORE_AFTER_DATA[0],[tab]);

  const handleMove=(cx)=>{
    if(!cRef.current)return;
    const r=cRef.current.getBoundingClientRect();
    let p=Math.max(0,Math.min(100,((cx-r.left)/r.width)*100));
    setPos(p);
  };

  return(
    <Section id="transformation" className="py-28 bg-[#F4F2EE]/40 border-y border-gray-200/60">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <FV><span className="text-[10px] font-black uppercase tracking-[0.22em] text-[#1E3A8A] block">Before & After</span></FV>
          <FV delay={0.08}><h2 className="text-3xl sm:text-5xl font-black text-[#0B0F19] tracking-tight">Real Renovations. Remarkable Results.</h2></FV>
          <FV delay={0.14}><p className="text-gray-500 text-sm font-light max-w-md mx-auto">Drag the handle to compare before and after on real client projects.</p></FV>
          <FV delay={0.18}>
            <div className="flex flex-wrap justify-center gap-2 pt-4">
              {BEFORE_AFTER_DATA.map(t=>(
                <button key={t.id} onClick={()=>{setTab(t.id);setPos(50);}}
                  className={`text-[10px] font-black uppercase tracking-widest px-4 py-2.5 rounded-xl border transition-all ${tab===t.id?'bg-[#0B0F19] text-white border-[#0B0F19] shadow':'bg-white text-gray-500 border-gray-200 hover:border-gray-400'}`}>
                  {t.label}
                </button>
              ))}
            </div>
          </FV>
        </div>

        <FV>
          <div ref={cRef}
            onMouseMove={e=>{if(e.buttons===1)handleMove(e.clientX);}}
            onTouchMove={e=>handleMove(e.touches[0].clientX)}
            className="relative max-w-4xl mx-auto aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl border border-gray-200 select-none cursor-ew-resize">
            <img src={pair.before} alt="Before" className="absolute inset-0 w-full h-full object-cover brightness-75"/>
            <div className="absolute top-4 left-4 z-20 bg-[#0B0F19]/75 backdrop-blur px-3 py-1.5 rounded-lg text-[10px] font-black text-white uppercase tracking-widest">Before</div>

            <div className="absolute inset-0 overflow-hidden z-10 pointer-events-none" style={{clipPath:`inset(0 ${100-pos}% 0 0)`}}>
              <img src={pair.after} alt="After" className="absolute inset-0 w-full h-full object-cover"/>
              <div className="absolute top-4 right-4 bg-[#D4AF37] px-3 py-1.5 rounded-lg text-[10px] font-black text-[#0B0F19] uppercase tracking-widest shadow">After</div>
            </div>

            <div className="absolute inset-y-0 z-30 w-1 bg-white shadow-2xl" style={{left:`${pos}%`}}>
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-14 h-9 bg-white text-[#0B0F19] rounded-full shadow-2xl flex items-center justify-center border-2 border-[#D4AF37]">
                <span className="text-[8px] font-black uppercase tracking-tighter">Drag</span>
              </div>
            </div>
          </div>
        </FV>
      </div>
    </Section>
  );
}


/* ================================================================
   PHOTO UPLOAD SURVEY SECTION
================================================================ */
function SurveySection(){
  const [submitted,setSubmitted]=useState(false);
  const [files,setFiles]=useState([]);
  const [uploading,setUploading]=useState(false);
  const [progress,setProgress]=useState(0);
  const [zone,setZone]=useState('Extension');
  const zones=['House','Roof','Kitchen','Bathroom','Garden','Extension','Garage','Commercial'];

  const handleFiles=(newFiles)=>{
    if(!newFiles.length)return;
    setUploading(true);setProgress(15);
    const t=setInterval(()=>{
      setProgress(p=>{
        if(p>=100){clearInterval(t);setUploading(false);
          const f=Array.from(newFiles).map(f=>({name:f.name,preview:URL.createObjectURL(f)}));
          setFiles(prev=>[...prev,...f]);return 0;}
        return p+25;
      });
    },200);
  };

  return(
    <Section id="survey" className="py-28 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-14 space-y-3">
          <FV><span className="text-[10px] font-black uppercase tracking-[0.22em] text-[#1E3A8A] block">Virtual Survey Portal</span></FV>
          <FV delay={0.08}><h2 className="text-3xl sm:text-5xl font-black text-[#0B0F19] tracking-tight">Request a Free Site Survey</h2></FV>
          <FV delay={0.14}><p className="text-gray-500 text-sm font-light max-w-lg mx-auto">Upload photos of your property and we'll send a full survey report within 24 hours — completely free, no obligation.</p></FV>
        </div>

        <FV>
          <div className="max-w-4xl mx-auto bg-white border border-gray-200/80 rounded-3xl shadow-2xl p-8 sm:p-12 relative overflow-hidden">
            <AnimatePresence mode="wait">
              {!submitted?(
                <motion.form key="form" onSubmit={e=>{e.preventDefault();setSubmitted(true);}} className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#0B0F19]">1. Select Project Type</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {zones.map(z=>(
                        <div key={z} onClick={()=>setZone(z)} className={`border rounded-xl p-3.5 flex flex-col items-center text-center cursor-pointer transition-all group ${zone===z?'bg-[#0B0F19] border-[#0B0F19] text-white shadow':'border-gray-200 bg-gray-50 hover:border-[#D4AF37] text-[#111827]'}`}>
                          <ImageIcon className={`w-4 h-4 mb-1.5 ${zone===z?'text-[#D4AF37]':'text-gray-400 group-hover:text-[#D4AF37]'} transition-colors`}/>
                          <span className="text-[10px] font-bold uppercase tracking-wider">{z}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="relative border-2 border-dashed border-gray-300 hover:border-[#D4AF37] bg-gray-50/50 rounded-2xl p-8 text-center transition-all group">
                    <input type="file" multiple onChange={e=>handleFiles(e.target.files)} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-20"/>
                    <div className="flex flex-col items-center space-y-3">
                      <div className="w-14 h-14 rounded-xl bg-white border border-gray-200 shadow flex items-center justify-center text-gray-400 group-hover:text-[#D4AF37] transition-all group-hover:scale-105">
                        <Upload className="w-6 h-6"/>
                      </div>
                      <p className="text-xs font-bold text-gray-700">Drag & drop photos of your property or click to upload</p>
                      <p className="text-[10px] text-gray-400">Supports PNG, JPG, JPEG</p>
                    </div>
                    {uploading&&(
                      <div className="absolute inset-0 bg-white/95 z-30 flex flex-col items-center justify-center px-12 space-y-3">
                        <div className="w-full max-w-xs bg-gray-100 rounded-full h-2 overflow-hidden">
                          <div className="bg-[#D4AF37] h-full transition-all duration-150" style={{width:`${progress}%`}}/>
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-[#0B0F19]">Uploading… {progress}%</p>
                      </div>
                    )}
                  </div>

                  {files.length>0&&(
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                      {files.map((f,i)=>(
                        <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-gray-200 bg-gray-50 group">
                          <img src={f.preview} alt="" className="w-full h-full object-cover"/>
                          <button type="button" onClick={()=>setFiles(files.filter((_,j)=>j!==i))}
                            className="absolute top-1.5 right-1.5 w-6 h-6 bg-red-600 rounded-lg text-white flex items-center justify-center shadow">
                            <Trash2 className="w-3 h-3"/>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div><label className="text-[10px] uppercase font-black tracking-widest text-gray-600 block mb-2">Full Name</label>
                      <input required type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1E3A8A] transition-colors" placeholder="e.g. James Whitfield"/></div>
                    <div><label className="text-[10px] uppercase font-black tracking-widest text-gray-600 block mb-2">Phone Number</label>
                      <input required type="tel" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1E3A8A] transition-colors" placeholder="e.g. 07700 900000"/></div>
                    <div><label className="text-[10px] uppercase font-black tracking-widest text-gray-600 block mb-2">Email Address</label>
                      <input required type="email" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1E3A8A] transition-colors" placeholder="hello@example.co.uk"/></div>
                    <div><label className="text-[10px] uppercase font-black tracking-widest text-gray-600 block mb-2">Property Address</label>
                      <input required type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1E3A8A] transition-colors" placeholder="e.g. 12 Oak Road, London"/></div>
                  </div>

                  <div className="bg-[#F4F2EE]/50 rounded-2xl p-4 flex flex-wrap gap-4 items-center justify-center border border-gray-200/60">
                    {['Free Consultation','Free Site Visit','No Obligation Quote'].map(s=>(
                      <span key={s} className="text-[10px] font-black text-gray-700 flex items-center"><CheckCircle2 className="w-4 h-4 text-green-600 mr-1.5"/>{s}</span>
                    ))}
                  </div>

                  <button type="submit" className="w-full py-4 bg-[#D4AF37] text-[#0B0F19] font-black rounded-xl text-xs tracking-widest uppercase shadow-xl hover:bg-[#0B0F19] hover:text-white transition-all hover:-translate-y-0.5">
                    Book Free Site Survey
                  </button>
                </motion.form>
              ):(
                <motion.div key="success" initial={{opacity:0,scale:0.97}} animate={{opacity:1,scale:1}} className="py-16 text-center space-y-4 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-green-50 text-green-600 flex items-center justify-center border border-green-200 shadow">
                    <CheckCircle2 className="w-8 h-8"/>
                  </div>
                  <h3 className="text-2xl font-black text-[#0B0F19]">Booking Confirmed</h3>
                  <p className="text-gray-500 text-sm max-w-md font-light leading-relaxed">Thank you. Our survey team will review your photos and be in touch within 24 hours to arrange your free site visit.</p>
                  <button type="button" onClick={()=>{setSubmitted(false);setFiles([]);}} className="mt-4 text-xs font-black uppercase tracking-wider text-gray-500 underline">
                    Submit Another Property
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </FV>
      </div>
    </Section>
  );
}

/* ================================================================
   SERVICES
================================================================ */
function Services(){
  const services=[
    {title:'Luxury House Extensions',desc:'Single and double-storey extensions that add space and value.',icon:Building2,img:IMG.ext1},
    {title:'Premium Loft Conversions',desc:'Transform your roof space into a stunning bedroom or studio.',icon:Layers,img:IMG.loft1},
    {title:'Architectural Kitchens',desc:'Open-plan kitchen-diners combining luxury finishes with smart layouts.',icon:Paintbrush,img:IMG.kitchen1},
    {title:'Bathroom Renovations',desc:'Spa-grade wet rooms and bathrooms, built to the highest standard.',icon:Home,img:IMG.bath1},
    {title:'Roofing',desc:'Full re-roofs, repairs and flat roofing in premium materials.',icon:Shield,img:IMG.roof1},
    {title:'Commercial Fit-Outs',desc:'Office, retail and light industrial builds delivered on time.',icon:Building2,img:IMG.commercial1},
  ];
  return(
    <Section id="services" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
          <FV>
            <span className="text-[10px] font-black tracking-[0.22em] text-[#1E3A8A] uppercase block mb-2">What We Build</span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#0B0F19] tracking-tight">Our Services</h2>
          </FV>
          <FV delay={0.1}>
            <p className="text-gray-500 max-w-xs font-light text-sm leading-relaxed">Everything from a single bathroom to a £2M commercial project — managed in-house, delivered on time.</p>
          </FV>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s,i)=>{
            const Icon=s.icon;
            return(
              <FV key={s.title} delay={i*0.07}>
                <div className="group bg-[#FDFBF7] rounded-3xl border border-gray-200/60 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 flex flex-col h-full">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/60 to-transparent z-10"/>
                    <img src={s.img} alt={s.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"/>
                    <div className="absolute top-4 left-4 w-11 h-11 rounded-xl bg-white shadow flex items-center justify-center z-20 group-hover:bg-[#0B0F19] group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5"/>
                    </div>
                  </div>
                  <div className="p-7 flex-1 flex flex-col justify-between space-y-5">
                    <div>
                      <h3 className="text-lg font-bold text-[#0B0F19] tracking-tight">{s.title}</h3>
                      <p className="text-xs text-gray-500 font-light leading-relaxed mt-2">{s.desc}</p>
                    </div>
                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider">View Projects</span>
                      <div className="w-8 h-8 rounded-full bg-gray-100 text-[#0B0F19] group-hover:bg-[#D4AF37] flex items-center justify-center transition-colors">
                        <ArrowUpRight className="w-4 h-4"/>
                      </div>
                    </div>
                  </div>
                </div>
              </FV>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

/* ================================================================
   CASE STUDIES
================================================================ */
function CaseStudies(){
  const [open,setOpen]=useState(null);
  return(
    <Section className="py-28 bg-[#F4F2EE]/30 border-y border-gray-200/60">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="max-w-xl mb-14">
          <FV><span className="text-[10px] font-black uppercase tracking-[0.22em] text-[#1E3A8A] block mb-2">Client Success Stories</span></FV>
          <FV delay={0.08}><h2 className="text-3xl sm:text-5xl font-black text-[#0B0F19] tracking-tight">Real Projects. Real Transformations.</h2></FV>
          <FV delay={0.14}><p className="text-gray-500 text-sm font-light mt-3 leading-relaxed">Every project tells a story. Here are eight recent ones.</p></FV>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {CASE_STUDIES.map((c,i)=>(
            <FV key={i} delay={i*0.06}>
              <div className="group bg-white rounded-3xl border border-gray-200/70 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-400 flex flex-col h-full">
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/60 to-transparent z-10"/>
                  <img src={c.img} alt={c.type} loading="lazy" className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"/>
                  <div className="absolute top-3 left-3 z-20 bg-[#D4AF37] px-2.5 py-1 rounded-lg text-[9px] font-black text-[#0B0F19] uppercase tracking-widest">{c.type}</div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-0.5 mb-2">
                      {[...Array(c.rating)].map((_,s)=><Star key={s} className="w-3 h-3 fill-[#D4AF37] text-[#D4AF37]"/>)}
                    </div>
                    <h4 className="text-sm font-bold text-[#0B0F19]">{c.client}</h4>
                    <p className="text-[10px] text-gray-400 flex items-center mt-0.5"><MapPin className="w-3 h-3 mr-1 text-[#D4AF37]"/>{c.loc}</p>
                  </div>
                  <p className="text-xs text-gray-600 font-light leading-relaxed"><span className="font-bold text-[#0B0F19]">Challenge: </span>{c.challenge}</p>
                  <AnimatePresence>
                    {open===i&&(
                      <motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}} exit={{opacity:0,height:0}} className="space-y-2 overflow-hidden">
                        <p className="text-xs text-gray-600 font-light leading-relaxed"><span className="font-bold text-[#0B0F19]">Solution: </span>{c.solution}</p>
                        <p className="text-xs text-gray-600 font-light"><span className="font-bold text-[#0B0F19]">Timeline: </span>{c.timeline}</p>
                        <p className="text-xs text-gray-600 font-light leading-relaxed"><span className="font-bold text-green-600]">Outcome: </span>{c.outcome}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <span className="text-[10px] text-gray-400 font-mono">{c.timeline}</span>
                    <button onClick={()=>setOpen(open===i?null:i)} className="text-[10px] font-black uppercase tracking-wider text-[#1E3A8A] flex items-center gap-1 hover:text-[#D4AF37] transition-colors">
                      {open===i?'Less':'Full Story'}<ChevronRight className={`w-3.5 h-3.5 transition-transform ${open===i?'rotate-90':''}`}/>
                    </button>
                  </div>
                </div>
              </div>
            </FV>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ================================================================
   WHY CHOOSE US
================================================================ */
function WhyUs(){
  return(
    <Section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="max-w-xl mb-14">
          <FV><span className="text-[10px] font-black uppercase tracking-[0.22em] text-[#1E3A8A] block mb-2">Why Vanguard</span></FV>
          <FV delay={0.08}><h2 className="text-3xl sm:text-5xl font-black text-[#0B0F19] tracking-tight">Built Different. Built Better.</h2></FV>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {WHY_US.map((w,i)=>{
            const Icon=w.icon;
            return(
              <FV key={w.title} delay={i*0.05}>
                <div className="group p-5 rounded-2xl bg-[#FDFBF7] border border-gray-200/60 hover:border-[#D4AF37]/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full">
                  <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center mb-4 group-hover:bg-[#D4AF37] transition-colors">
                    <Icon className="w-5 h-5 text-[#D4AF37] group-hover:text-[#0B0F19] transition-colors"/>
                  </div>
                  <h3 className="text-xs font-bold text-[#0B0F19] mb-1.5">{w.title}</h3>
                  <p className="text-[11px] text-gray-500 font-light leading-relaxed">{w.desc}</p>
                </div>
              </FV>
            );
          })}
        </div>
      </div>
    </Section>
  );
}


/* ================================================================
   PROCESS TIMELINE
================================================================ */
const PROCESS_V2 = [
  {
    num: '01', title: 'Free Site Survey',
    desc: 'We visit your property, listen to what you have in mind, and assess the best way to make it happen — completely free.',
    icon: FileText,
    accent: '#D4AF37',
    img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=120&q=80',
    imgAlt: 'Site survey',
  },
  {
    num: '02', title: 'Planning & Design',
    desc: 'Our in-house architect draws up your plans and we handle all planning permission and building control applications for you.',
    icon: Compass,
    accent: '#3B82F6',
    img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=120&q=80',
    imgAlt: 'Blueprint planning',
  },
  {
    num: '03', title: 'Your Fixed Quote',
    desc: 'You receive a clear, itemised quote with a fixed price. No hidden costs, no surprises — what we quote is what you pay.',
    icon: Ruler,
    accent: '#22C55E',
    img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=120&q=80',
    imgAlt: 'Quotation document',
  },
  {
    num: '04', title: 'Construction Begins',
    desc: 'Our experienced team gets to work using premium materials. Your dedicated site manager keeps you updated every step of the way.',
    icon: HardHat,
    accent: '#F59E0B',
    img: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=120&q=80',
    imgAlt: 'Construction in progress',
  },
  {
    num: '05', title: 'Quality Inspection',
    desc: 'Every detail is checked against our quality standards before we consider the work complete. Nothing is signed off until it\'s right.',
    icon: ShieldCheck,
    accent: '#8B5CF6',
    img: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=120&q=80',
    imgAlt: 'Quality inspection',
  },
  {
    num: '06', title: 'Project Handover',
    desc: 'We do a final walkthrough with you. Any snags are fixed before we hand over the keys to your beautifully finished project.',
    icon: Key,
    accent: '#D4AF37',
    img: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=120&q=80',
    imgAlt: 'Project handover keys',
  },
  {
    num: '07', title: 'Aftercare & Warranty',
    desc: 'Our relationship doesn\'t end at handover. We provide a 15-year structural warranty and ongoing support whenever you need us.',
    icon: Shield,
    accent: '#22C55E',
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=120&q=80',
    imgAlt: 'Finished luxury home',
  },
];

function Process(){
  const [active, setActive] = useState(null);
  return(
    <Section id="process" className="py-28 text-white" style={{background:'#1A2233'}}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8">

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div className="space-y-3 max-w-xl">
            <FV>
              <span className="text-[10px] font-black tracking-[0.22em] text-[#D4AF37] uppercase block">
                Simple &amp; Transparent Process
              </span>
            </FV>
            <FV delay={0.08}>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">Our Process</h2>
            </FV>
            <FV delay={0.14}>
              <p className="text-gray-400 text-sm font-light leading-relaxed">
                From your first call to your finished project — a clear, simple process with no jargon and no surprises.
              </p>
            </FV>
          </div>
          <FV delay={0.18}>
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-sm">
              <CheckCircle2 className="w-5 h-5 text-[#22C55E] shrink-0"/>
              <span className="text-gray-300 font-medium">Average project start: <span className="text-white font-bold">within 2 weeks</span></span>
            </div>
          </FV>
        </div>

        {/* DESKTOP: alternating timeline layout */}
        <div className="hidden lg:block relative">
          {/* vertical spine */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#D4AF37]/40 via-white/10 to-[#22C55E]/40 z-0"/>

          <div className="space-y-6">
            {PROCESS_V2.map((s, i) => {
              const Icon = s.icon;
              const isLeft = i % 2 === 0;
              return(
                <FV key={i} delay={i * 0.07}>
                  <div className={`relative grid grid-cols-2 gap-0 items-center ${isLeft ? '' : ''}`}>

                    {/* LEFT CONTENT */}
                    <div className={`pr-14 ${isLeft ? 'text-right' : 'order-2 pl-14 pr-0 text-left'}`}>
                      {isLeft ? (
                        <div
                          className="inline-block group cursor-pointer"
                          onMouseEnter={()=>setActive(i)}
                          onMouseLeave={()=>setActive(null)}
                        >
                          <div className={`bg-white/[0.04] border border-white/10 rounded-3xl p-6 text-right hover:bg-white/[0.08] hover:border-white/20 hover:-translate-y-1 transition-all duration-300 shadow-lg ${active===i?'border-white/25 bg-white/[0.09]':''}`}
                            style={active===i?{boxShadow:`0 20px 48px ${s.accent}18`}:{}}>
                            <div className="flex items-center justify-end gap-3 mb-4">
                              <div>
                                <p className="text-xs font-black text-white uppercase tracking-wider">{s.title}</p>
                              </div>
                              <div className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300"
                                style={{background:`${s.accent}18`, border:`1px solid ${s.accent}33`}}>
                                <Icon className="w-5 h-5" style={{color:s.accent}}/>
                              </div>
                            </div>
                            <p className="text-sm text-gray-400 font-light leading-relaxed">{s.desc}</p>
                            {/* small decorative image */}
                            <div className="mt-4 flex justify-end">
                              <img src={s.img} alt={s.imgAlt} loading="lazy"
                                className="w-16 h-16 rounded-xl object-cover opacity-60 group-hover:opacity-90 transition-opacity border border-white/10"/>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div/>
                      )}
                    </div>

                    {/* CENTRE BUBBLE */}
                    <div className="absolute left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
                      <div className="w-14 h-14 rounded-full flex items-center justify-center font-black text-base border-2 transition-all duration-300 shadow-xl"
                        style={{
                          background: active===i ? s.accent : '#1A2233',
                          borderColor: s.accent,
                          color: active===i ? '#0B0F19' : s.accent,
                          boxShadow: active===i ? `0 0 28px ${s.accent}55` : 'none',
                        }}>
                        {s.num}
                      </div>
                    </div>

                    {/* RIGHT CONTENT */}
                    <div className={`pl-14 ${isLeft ? 'order-2' : 'order-1 pr-14 pl-0 text-right'}`}>
                      {!isLeft ? (
                        <div
                          className="inline-block group cursor-pointer w-full"
                          onMouseEnter={()=>setActive(i)}
                          onMouseLeave={()=>setActive(null)}
                        >
                          <div className={`bg-white/[0.04] border border-white/10 rounded-3xl p-6 hover:bg-white/[0.08] hover:border-white/20 hover:-translate-y-1 transition-all duration-300 shadow-lg text-right ${active===i?'border-white/25 bg-white/[0.09]':''}`}
                            style={active===i?{boxShadow:`0 20px 48px ${s.accent}18`}:{}}>
                            <div className="flex items-center justify-end gap-3 mb-4">
                              <div>
                                <p className="text-xs font-black text-white uppercase tracking-wider">{s.title}</p>
                              </div>
                              <div className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
                                style={{background:`${s.accent}18`, border:`1px solid ${s.accent}33`}}>
                                <Icon className="w-5 h-5" style={{color:s.accent}}/>
                              </div>
                            </div>
                            <p className="text-sm text-gray-400 font-light leading-relaxed">{s.desc}</p>
                            <div className="mt-4 flex justify-end">
                              <img src={s.img} alt={s.imgAlt} loading="lazy"
                                className="w-16 h-16 rounded-xl object-cover opacity-60 group-hover:opacity-90 transition-opacity border border-white/10"/>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div/>
                      )}
                    </div>
                  </div>
                </FV>
              );
            })}
          </div>
        </div>

        {/* MOBILE: vertical stacked cards */}
        <div className="lg:hidden relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#D4AF37]/50 via-white/10 to-[#22C55E]/50 z-0"/>
          <div className="space-y-4">
            {PROCESS_V2.map((s, i) => {
              const Icon = s.icon;
              return(
                <FV key={i} delay={i*0.06}>
                  <div className="relative flex gap-5 pl-16">
                    {/* bubble */}
                    <div className="absolute left-0 top-5 w-12 h-12 rounded-full flex items-center justify-center font-black text-sm border-2 z-10 shrink-0"
                      style={{background:'#1A2233', borderColor:s.accent, color:s.accent}}>
                      {s.num}
                    </div>
                    {/* card */}
                    <div className="flex-1 bg-white/[0.04] border border-white/10 rounded-2xl p-5 hover:bg-white/[0.07] hover:border-white/20 transition-all duration-300">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                              style={{background:`${s.accent}18`}}>
                              <Icon className="w-4 h-4" style={{color:s.accent}}/>
                            </div>
                            <p className="text-xs font-black text-white uppercase tracking-wider">{s.title}</p>
                          </div>
                          <p className="text-xs text-gray-400 font-light leading-relaxed">{s.desc}</p>
                        </div>
                        <img src={s.img} alt={s.imgAlt} loading="lazy"
                          className="w-14 h-14 rounded-xl object-cover opacity-60 shrink-0 border border-white/10"/>
                      </div>
                    </div>
                  </div>
                </FV>
              );
            })}
          </div>
        </div>

        {/* BOTTOM CTA */}
        <FV delay={0.4}>
          <div className="mt-16 text-center">
            <p className="text-gray-400 text-sm font-light mb-5">Ready to get started? Your free survey is just one click away.</p>
            <a href="#survey"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#D4AF37] text-[#0B0F19] font-black text-xs tracking-widest uppercase shadow-[0_12px_32px_rgba(212,175,55,0.3)] hover:bg-white hover:-translate-y-0.5 transition-all">
              Book Free Site Survey <ArrowUpRight className="w-4 h-4"/>
            </a>
          </div>
        </FV>

      </div>
    </Section>
  );
}

/* ================================================================
   TEAM
================================================================ */
function Team(){
  return(
    <Section id="team" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="max-w-xl mb-14">
          <FV><span className="text-[10px] font-black uppercase tracking-[0.22em] text-[#1E3A8A] block mb-2">The People Behind the Work</span></FV>
          <FV delay={0.08}><h2 className="text-3xl sm:text-5xl font-black text-[#0B0F19] tracking-tight">Meet Our Team</h2></FV>
          <FV delay={0.14}><p className="text-gray-500 text-sm font-light mt-3 leading-relaxed">Qualified, experienced and genuinely passionate about building great homes.</p></FV>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-5">
          {TEAM.map((m,i)=>(
            <FV key={m.name} delay={i*0.07}>
              <div className="group relative rounded-3xl overflow-hidden bg-white border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-400">
                <div className="h-64 overflow-hidden">
                  <img src={m.img} alt={m.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-107 transition-transform duration-700"/>
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0B0F19]/95 via-[#0B0F19]/70 to-transparent p-5 text-white translate-y-2 group-hover:translate-y-0 transition-transform">
                  <p className="text-xs font-bold">{m.name}</p>
                  <p className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-wider mt-0.5">{m.role}</p>
                  <p className="text-[10px] text-gray-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity leading-relaxed">{m.bio}</p>
                  <p className="text-[10px] text-gray-500 mt-1">{m.exp} experience</p>
                  <div className="flex gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center hover:bg-[#D4AF37] transition-colors cursor-pointer"><Linkedin className="w-3 h-3"/></div>
                    <div className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center hover:bg-[#D4AF37] transition-colors cursor-pointer"><Mail className="w-3 h-3"/></div>
                  </div>
                </div>
              </div>
            </FV>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ================================================================
   GOOGLE REVIEWS
================================================================ */
function Reviews(){
  return(
    <Section id="reviews" className="py-28 bg-[#F4F2EE]/30 border-b border-gray-200/80">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="max-w-xl mx-auto text-center mb-14 space-y-4">
          <FV><span className="text-[10px] font-black uppercase tracking-[0.22em] text-[#1E3A8A] block">Client Reviews</span></FV>
          <FV delay={0.08}><h2 className="text-3xl sm:text-5xl font-black text-[#0B0F19] tracking-tight">What Our Clients Say</h2></FV>
          <FV delay={0.14}>
            <div className="inline-flex items-center gap-5 bg-white border border-gray-200 p-4 rounded-2xl shadow-sm">
              <div className="text-left">
                <div className="flex text-[#FBBC05] gap-0.5">{[...Array(5)].map((_,i)=><Star key={i} className="w-4 h-4 fill-current"/>)}</div>
                <p className="text-xs font-black text-[#0B0F19] mt-0.5">4.9 / 5.0 on Google</p>
              </div>
              <div className="w-px h-8 bg-gray-200"/>
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">180+ Verified Reviews</p>
            </div>
          </FV>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS_DATA.map((r,i)=>(
            <FV key={r.id} delay={i*0.08}>
              <div className="bg-white border border-gray-200/80 p-7 rounded-2xl shadow-sm flex flex-col justify-between space-y-5 h-full">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={r.photo} alt={r.name} loading="lazy" className="w-10 h-10 rounded-full object-cover border border-gray-100"/>
                      <div>
                        <p className="text-xs font-bold text-[#0B0F19]">{r.name}</p>
                        <p className="text-[9px] font-medium text-gray-400 uppercase tracking-wider mt-0.5">{r.date}</p>
                      </div>
                    </div>
                    <div className="flex text-[#FBBC05] gap-0.5">{[...Array(r.rating)].map((_,i)=><Star key={i} className="w-3 h-3 fill-current"/>)}</div>
                  </div>
                  <div className="flex text-[#FBBC05] gap-0.5">{[...Array(r.rating)].map((_,i)=><Star key={i} className="w-3 h-3 fill-current"/>)}</div>
                  <p className="text-xs text-gray-600 font-light leading-relaxed">"{r.text}"</p>
                </div>
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[8px] font-black tracking-widest uppercase text-green-600 bg-green-50 px-2 py-0.5 rounded border border-green-200/50">Verified Google Review</span>
                  <span className="text-[10px] font-bold text-gray-400">Helpful ({r.helpful})</span>
                </div>
              </div>
            </FV>
          ))}
        </div>
        <FV delay={0.3}>
          <div className="text-center mt-10">
            <a href="https://google.com" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 border border-gray-200 hover:border-gray-400 bg-white rounded-xl text-xs font-black uppercase tracking-wider text-gray-700 transition-all shadow-sm">
              View All Google Reviews <ChevronRight className="w-4 h-4"/>
            </a>
          </div>
        </FV>
      </div>
    </Section>
  );
}

/* ================================================================
   CONTACT
================================================================ */
function Contact({setSurveyModal}){
  const [cb,setCb]=useState(false);
  return(
    <Section id="contact" className="py-28 bg-[#0B0F19] text-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14">
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <FV><span className="text-[10px] font-black tracking-[0.22em] text-[#D4AF37] uppercase block">Get In Touch</span></FV>
              <FV delay={0.08}><h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-none">Let's Build Something Remarkable.</h2></FV>
              <FV delay={0.14}><p className="text-gray-400 font-light text-sm max-w-xs leading-relaxed">Speak to our team or book a free, no-obligation site survey today.</p></FV>
            </div>
            <div className="space-y-3">
              {[
                {icon:Phone,label:'Call Us',val:'020 7946 0958',href:'tel:+442079460958',col:'text-[#D4AF37]'},
                {icon:MessageCircle,label:'WhatsApp',val:'Message us instantly',href:'https://wa.me/442079460958',col:'text-[#22C55E]'},
                {icon:Mail,label:'Email',val:'hello@vanguarduk.co.uk',href:'mailto:hello@vanguarduk.co.uk',col:'text-[#D4AF37]'},
                {icon:MapPin,label:'Office',val:'14 Forge Street, London EC2A 4BX',href:'#',col:'text-[#D4AF37]'},
              ].map(c=>{
                const Icon=c.icon;
                return(
                  <FV key={c.label}>
                    <a href={c.href} target={c.href.startsWith('http')?'_blank':undefined} rel="noopener noreferrer"
                      className="flex items-center gap-3.5 bg-white/[0.03] border border-white/8 hover:border-white/16 p-4 rounded-2xl transition-all group">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                        <Icon className={`w-4 h-4 ${c.col}`}/>
                      </div>
                      <div>
                        <p className="text-[9px] uppercase font-black text-gray-500 tracking-widest">{c.label}</p>
                        <p className={`text-sm font-bold text-white group-hover:${c.col} transition-colors`}>{c.val}</p>
                      </div>
                    </a>
                  </FV>
                );
              })}
            </div>
            <FV delay={0.2}>
              <div className="space-y-1.5">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Opening Hours</p>
                <p className="text-xs text-gray-400">Mon – Fri: 07:30 – 18:00 &nbsp;|&nbsp; Sat: 08:00 – 14:00</p>
                <p className="text-[10px] text-red-400 font-black uppercase tracking-wider mt-2">⚠ 24/7 Emergency: 020 7946 9911</p>
              </div>
            </FV>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-5">
            <FV>
              <div className="rounded-3xl overflow-hidden h-48 border border-white/5 opacity-80 hover:opacity-100 transition-opacity">
                <iframe title="Vanguard Contractors London"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.5404230509424!2d-0.1440786!3d51.4947948!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604c27a92ad1b%3A0x4720996457855658!2sBelgravia%2C%20London!5e0!3m2!1sen!2suk!4v1625000000000"
                  className="w-full h-full border-0 filter invert hue-rotate-180" allowFullScreen="" loading="lazy"/>
              </div>
            </FV>
            <FV delay={0.1}>
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-5 backdrop-blur-2xl">
                <div>
                  <h3 className="text-lg font-bold tracking-tight">Request a Callback</h3>
                  <p className="text-xs text-gray-400 font-light mt-1">We'll call you back within 15 minutes during business hours.</p>
                </div>
                <AnimatePresence mode="wait">
                  {!cb?(
                    <motion.form key="cbform" onSubmit={e=>{e.preventDefault();setCb(true);}} className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-[#D4AF37] transition-colors" placeholder="Your Name"/>
                        <input required type="tel" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-[#D4AF37] transition-colors" placeholder="Phone Number"/>
                      </div>
                      <button type="submit" className="w-full py-3.5 bg-[#D4AF37] text-[#0B0F19] font-black rounded-xl text-xs tracking-widest uppercase hover:-translate-y-0.5 transition-all">
                        Request Callback
                      </button>
                      <button type="button" onClick={()=>setSurveyModal(true)} className="w-full text-center py-2.5 text-xs font-black uppercase text-gray-500 hover:text-white transition-colors">
                        Or Book a Free Site Survey →
                      </button>
                    </motion.form>
                  ):(
                    <motion.div key="cbdone" initial={{opacity:0}} animate={{opacity:1}} className="py-6 text-center space-y-3">
                      <div className="w-12 h-12 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 mx-auto flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5"/>
                      </div>
                      <h4 className="text-sm font-bold">Callback Requested</h4>
                      <p className="text-xs text-gray-400 max-w-xs mx-auto">Our team will call you back within 15 minutes.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FV>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ================================================================
   FOOTER
================================================================ */
function Footer(){
  const services=['House Extensions','Loft Conversions','Kitchen Renovation','Bathroom Renovation','Roofing','Commercial Fit-Outs','Landscaping','Driveways'];
  return(
    <footer className="bg-[#0B0F19] text-white pt-20 pb-28 lg:pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-white/5">
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 bg-[#D4AF37] rounded-xl flex items-center justify-center"><Building2 className="w-5 h-5 text-[#0B0F19]"/></div>
              <div><span className="text-base font-black uppercase tracking-tight block text-white">VANGUARD</span><span className="text-[8px] tracking-[0.25em] text-[#D4AF37] font-bold uppercase">Contractors UK</span></div>
            </div>
            <p className="text-xs text-gray-400 font-light leading-relaxed max-w-sm">Award-winning construction, extensions and commercial fit-outs across London and the South East since 2003.</p>
            <div className="flex gap-2">
              {['Gas Safe','FMB','TrustMark','NHBC'].map(b=>(
                <span key={b} className="text-[8px] font-black uppercase tracking-wider bg-white/5 border border-white/8 px-2 py-1.5 rounded-lg text-gray-300">{b}</span>
              ))}
            </div>
          </div>
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-[#D4AF37]">Services</h4>
            <div className="flex flex-col gap-2 text-xs text-gray-400">
              {services.slice(0,5).map(s=><a key={s} href="#services" className="hover:text-white transition-colors">{s}</a>)}
            </div>
          </div>
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-[#D4AF37]">Company</h4>
            <div className="flex flex-col gap-2 text-xs text-gray-400">
              {['Gallery','Our Process','Meet the Team','Client Reviews','Contact Us'].map(l=>(
                <a key={l} href={`#${l.toLowerCase().replace(/\s+/g,'-')}`} className="hover:text-white transition-colors">{l}</a>
              ))}
            </div>
          </div>
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-[#D4AF37]">Opening Hours</h4>
            <div className="space-y-2 text-xs text-gray-400">
              <div className="flex justify-between"><span>Mon – Fri</span><span className="font-mono text-white">07:30 – 18:00</span></div>
              <div className="flex justify-between"><span>Saturday</span><span className="font-mono text-white">08:00 – 14:00</span></div>
              <div className="flex justify-between"><span>Sunday</span><span className="text-red-400 font-bold text-[10px] uppercase">Closed</span></div>
            </div>
            <div className="pt-2"><p className="text-[10px] font-mono text-red-400 font-bold uppercase tracking-wider">⚠ Emergency</p><p className="text-sm font-bold text-white mt-0.5">020 7946 9911</p></div>
          </div>
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-[#D4AF37]">Contact</h4>
            <div className="space-y-2 text-xs text-gray-400">
              <p>14 Forge Street</p><p>London EC2A 4BX</p>
              <a href="tel:+442079460958" className="hover:text-white transition-colors block">020 7946 0958</a>
              <a href="mailto:hello@vanguarduk.co.uk" className="hover:text-white transition-colors block">hello@vanguarduk.co.uk</a>
            </div>
          </div>
        </div>
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
          <p>© 2026 Vanguard Main Contractors UK Ltd. All Rights Reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ================================================================
   STICKY CTAs
================================================================ */
function StickyCTAs({setSurveyModal}){
  return(
    <>
      <div className="hidden lg:flex fixed bottom-6 right-6 z-[999] items-center gap-3">
        <a href="tel:+442079460958" className="flex items-center gap-2 bg-white text-[#0B0F19] border border-gray-200 px-5 py-3.5 rounded-xl text-xs font-black tracking-widest uppercase shadow-xl hover:-translate-y-0.5 transition-all">
          <Phone className="w-4 h-4 text-[#D4AF37]"/> Call Now
        </a>
        <button onClick={()=>setSurveyModal(true)} className="flex items-center gap-2 bg-[#D4AF37] text-[#0B0F19] px-5 py-3.5 rounded-xl text-xs font-black tracking-widest uppercase shadow-xl hover:bg-[#0B0F19] hover:text-white hover:-translate-y-0.5 transition-all">
          <FileText className="w-4 h-4"/> Free Survey
        </button>
      </div>
      <div className="lg:hidden fixed bottom-0 inset-x-0 h-16 bg-[#0B0F19]/96 backdrop-blur-xl border-t border-white/10 z-[9999] grid grid-cols-3 divide-x divide-white/5">
        <a href="tel:+442079460958" className="flex flex-col items-center justify-center text-white font-bold text-[10px] uppercase tracking-wider gap-1 active:bg-white/5">
          <Phone className="w-4 h-4 text-[#D4AF37]"/><span>Call Now</span>
        </a>
        <a href="https://wa.me/442079460958" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center text-white font-bold text-[10px] uppercase tracking-wider gap-1 active:bg-white/5">
          <MessageCircle className="w-4 h-4 text-[#22C55E] fill-current"/><span>WhatsApp</span>
        </a>
        <button onClick={()=>setSurveyModal(true)} className="flex flex-col items-center justify-center text-white font-bold text-[10px] uppercase tracking-wider gap-1 active:bg-white/5">
          <Calendar className="w-4 h-4 text-blue-400"/><span>Book Survey</span>
        </button>
      </div>
    </>
  );
}

/* ================================================================
   MODALS
================================================================ */
function VideoModal({open,setOpen}){
  return(
    <AnimatePresence>
      {open&&(
        <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setOpen(false)}
          className="fixed inset-0 bg-[#0B0F19]/95 z-[99999] flex items-center justify-center p-4 backdrop-blur-xl">
          <motion.div initial={{scale:0.96}} animate={{scale:1}} exit={{scale:0.96}} onClick={e=>e.stopPropagation()}
            className="w-full max-w-4xl aspect-video bg-[#0B0F19] rounded-3xl overflow-hidden border border-white/10 relative flex flex-col items-center justify-center text-center space-y-4 p-8">
            <button onClick={()=>setOpen(false)} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-white"><X className="w-5 h-5"/></button>
            <div className="w-14 h-14 rounded-full bg-[#D4AF37]/10 flex items-center justify-center border border-[#D4AF37]/20"><HardHat className="w-6 h-6 text-[#D4AF37]"/></div>
            <h3 className="text-xl font-bold text-white">Vanguard Showreel 2026</h3>
            <p className="text-gray-400 text-xs max-w-xs font-light">A cinematic tour of our latest projects across London and the South East.</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SurveyModal({open,setOpen}){
  const [done,setDone]=useState(false);
  return(
    <AnimatePresence>
      {open&&(
        <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setOpen(false)}
          className="fixed inset-0 bg-[#0B0F19]/80 z-[99999] flex items-center justify-center p-4 backdrop-blur-md overflow-y-auto">
          <motion.div initial={{y:20,opacity:0}} animate={{y:0,opacity:1}} exit={{y:20,opacity:0}} onClick={e=>e.stopPropagation()}
            className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-100 relative p-7 sm:p-10 my-8">
            <button onClick={()=>{setOpen(false);setDone(false);}} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700"><X className="w-5 h-5"/></button>
            <div className="mb-6">
              <h3 className="text-xl font-black text-[#0B0F19] tracking-tight">Book Your Free Site Survey</h3>
              <p className="text-xs text-gray-400 font-light mt-1">No obligation. We visit, assess, and give you a written quote for free.</p>
            </div>
            {!done?(
              <form onSubmit={e=>{e.preventDefault();setDone(true);}} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input required type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-xs focus:outline-none placeholder:text-gray-400" placeholder="Full Name"/>
                  <input required type="tel" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-xs focus:outline-none placeholder:text-gray-400" placeholder="Phone Number"/>
                </div>
                <input required type="email" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-xs focus:outline-none placeholder:text-gray-400" placeholder="Email Address"/>
                <input required type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-xs focus:outline-none placeholder:text-gray-400" placeholder="Property Address"/>
                <div className="bg-gray-50 rounded-2xl p-4 flex flex-wrap gap-4 justify-between border border-gray-200/60 text-[10px] font-black uppercase text-gray-700">
                  <span>✓ Free Consultation</span><span>✓ Free Site Visit</span><span>✓ No Obligation</span>
                </div>
                <button type="submit" className="w-full py-4 bg-[#D4AF37] text-[#0B0F19] font-black rounded-xl text-xs tracking-widest uppercase shadow hover:-translate-y-0.5 transition-all">
                  Submit Booking
                </button>
              </form>
            ):(
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 border border-green-200 mx-auto flex items-center justify-center"><CheckCircle2 className="w-5 h-5"/></div>
                <h4 className="text-lg font-black text-[#0B0F19]">Booking Confirmed</h4>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">Thank you. Our team will be in touch within 24 hours to arrange your free site visit.</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function LightboxModal({img,setImg}){
  return(
    <AnimatePresence>
      {img&&(
        <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setImg(null)}
          className="fixed inset-0 bg-[#0B0F19]/95 z-[999999] flex items-center justify-center p-4 backdrop-blur-md">
          <button onClick={()=>setImg(null)} className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center z-10"><X className="w-6 h-6"/></button>
          <motion.img initial={{scale:0.97}} animate={{scale:1}} exit={{scale:0.97}} src={img} alt="Project" className="max-w-full max-h-[90vh] rounded-2xl object-contain shadow-2xl" onClick={e=>e.stopPropagation()}/>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ================================================================
   ROOT APP
================================================================ */
export default function App(){
  const [surveyModal,setSurveyModal]=useState(false);
  const [videoModal,setVideoModal]=useState(false);
  const [lightboxImage,setLightboxImage]=useState(null);
  return(
    <div className="min-h-screen bg-[#FDFBF7] text-[#111827] antialiased selection:bg-[#D4AF37] selection:text-[#0B0F19] overflow-x-hidden">
      <Navbar setSurveyModal={setSurveyModal}/>
      <Hero setSurveyModal={setSurveyModal} setVideoModal={setVideoModal}/>
      <TrustTicker/>
      <Gallery setLightboxImage={setLightboxImage}/>
      <BeforeAfter/>
      <SurveySection/>
      <Services/>
      <CaseStudies/>
      <WhyUs/>
      <Process/>
      <Team/>
      <Reviews/>
      <Contact setSurveyModal={setSurveyModal}/>
      <Footer/>
      <StickyCTAs setSurveyModal={setSurveyModal}/>
      <VideoModal open={videoModal} setOpen={setVideoModal}/>
      <SurveyModal open={surveyModal} setOpen={setSurveyModal}/>
      <LightboxModal img={lightboxImage} setImg={setLightboxImage}/>
    </div>
  );
}

