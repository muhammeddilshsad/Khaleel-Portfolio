import { useState, useRef } from "react";
import { Play, X, ZoomIn, ExternalLink, Film } from "lucide-react";

// ============================================================
//  AUTO IMAGE LOADER — Vite's import.meta.glob scans the entire
//  Assets folder tree at build time. You NEVER need to add an
//  import statement for a new image again.
// ============================================================
const _glob = import.meta.glob(
  [
    "./figma/Assets/**/*.jpg",
    "./figma/Assets/**/*.JPG",
    "./figma/Assets/**/*.jpeg",
    "./figma/Assets/**/*.JPEG",
    "./figma/Assets/**/*.png",
    "./figma/Assets/**/*.PNG",
    "./figma/Assets/**/*.webp",
    "./figma/Assets/**/*.gif",
  ],
  { eager: true },
) as Record<string, { default: string }>;

// Build a filename → URL lookup so items only need a short path.
// Key format:  "FolderName/filename.ext"
const IMG: Record<string, string> = {};
for (const [fullPath, mod] of Object.entries(_glob)) {
  // fullPath looks like: "./figma/Assets/Social_media/image.jpg"
  // We strip the prefix so users reference: "Social_media/image.jpg"
  const key = fullPath.replace(/^\.\/figma\/Assets\//, "");
  IMG[key] = mod.default;
}

// ── Helper — pass a short path and get the resolved image URL ─
// Also handles external URLs (http:// or https://)
function img(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return IMG[path] ?? "";
}

// ============================================================
//  AUTO VIDEO LOADER — Identical glob pattern for video files.
//
//  Supported formats (any capitalisation):
//    .mp4  .webm  .ogg  .mov  .avi  .mkv
//
//  HOW TO USE:
//  1. Drop a video into: /src/app/components/figma/Assets/video/
//  2. Reference it in videoItems as:  src: "video/my-clip.mp4"
//     — NO import statement needed.
// ============================================================
const _videoGlob = import.meta.glob(
  [
    "./figma/Assets/**/*.mp4",
    "./figma/Assets/**/*.MP4",
    "./figma/Assets/**/*.webm",
    "./figma/Assets/**/*.WEBM",
    "./figma/Assets/**/*.ogg",
    "./figma/Assets/**/*.OGG",
    "./figma/Assets/**/*.mov",
    "./figma/Assets/**/*.MOV",
    "./figma/Assets/**/*.avi",
    "./figma/Assets/**/*.AVI",
    "./figma/Assets/**/*.mkv",
    "./figma/Assets/**/*.MKV",
  ],
  { eager: true },
) as Record<string, { default: string }>;

// Build a filename → URL lookup identical to IMG above.
const VID: Record<string, string> = {};
for (const [fullPath, mod] of Object.entries(_videoGlob)) {
  const key = fullPath.replace(/^\.\/figma\/Assets\//, "");
  VID[key] = mod.default;
}

// ── Helper — pass a short path and get the resolved video URL ─
// Also handles full external URLs (http/https).
function vid(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return VID[path] ?? "";
}

// ── Detect MIME type from file extension ─────────────────────
function videoMime(path: string): string {
  const ext = path.split(".").pop()?.toLowerCase() ?? "";
  const map: Record<string, string> = {
    mp4: "video/mp4",
    webm: "video/webm",
    ogg: "video/ogg",
    ogv: "video/ogg",
    mov: "video/quicktime",
    avi: "video/x-msvideo",
    mkv: "video/x-matroska",
  };
  return map[ext] ?? "video/mp4";
}

// ============================================================
//  CATEGORY DEFINITIONS
//  To add a new category: { id, label, color }
//  Then use that id as the `category` field on your items.
// ============================================================
const CATEGORIES = [
  { id: "all", label: "All", color: "#00e5cc" },
  { id: "social", label: "Social Media", color: "#ff2d78" },
  { id: "print", label: "Print & Flyers", color: "#9b30ff" },
  { id: "branding", label: "Branding", color: "#00e5cc" },
  { id: "packaging", label: "Packaging", color: "#00bfff" },
  { id: "videos", label: "Video Projects", color: "#ff9a00" },
];

// ============================================================
//  IMAGE PORTFOLIO ITEMS
//
//  HOW TO ADD A NEW IMAGE:
//  1. Drop the file into:  /src/app/components/figma/Assets/<SubFolder>/
//  2. Add one object here — NO import statement needed.
//
//  Shape:
//  {
//    id:          unique string              (e.g. "social-28")
//    category:    must match a CATEGORIES id (e.g. "social")
//    title:       card title
//    description: text shown in the lightbox
//    src:         path inside Assets/        (e.g. "Social_media/my-file.jpg")
//               OR a full https:// URL for external images
//    link?:       optional external URL shown as "View Project" button
//  }
// ============================================================
const portfolioItems: {
  id: string;
  category: string;
  title: string;
  description: string;
  src: string;
  link?: string;
}[] = [
  // ── Social Media ─────────────────────────────────────────
  {
    id: "social-01",
    category: "social",
    title: "Olio — Love for Royals",
    description:
      "Social media post celebrating the royal love of Olio's brand identity.",
    src: "Social_media/Olio_love for royals.jpg",
  },
  {
    id: "social-02",
    category: "social",
    title: "Olio × RR Post",
    description:
      "Olio's collaboration post with Rajasthan Royals for the IPL campaign.",
    src: "Social_media/Olio-RR-Post_V1.jpg",
  },
  {
    id: "social-04",
    category: "social",
    title: "We're RR Fans",
    description:
      "Fan engagement post supporting Rajasthan Royals during the IPL season.",
    src: "Social_media/We're-RR-fans.jpg",
  },
  {
    id: "social-05",
    category: "social",
    title: "Do It for RR",
    description:
      "Motivational match-day social creative for the Rajasthan Royals fanbase.",
    src: "Social_media/do-it-for-rr.jpg",
  },
  {
    id: "social-06",
    category: "social",
    title: "Excuses to Watch the Match",
    description:
      "Witty social media post encouraging fans to find reasons to watch the game.",
    src: "Social_media/excuses-to-watch-the-match.jpg",
  },
    {
    id: "social-06",
    category: "social",
    title: "Excuses to Watch the Match",
    description:
      "Witty social media post encouraging fans to find reasons to watch the game.",
    src: "Social_media/excuses-to-watch-the-match.jpg",
  },
  {
    id: "social-07",
    category: "social",
    title: "OLIO × BFC — The Blues Won",
    description:
      "Victory post for OLIO's collaboration with Bengaluru FC celebrating the win.",
    src: "Social_media/OLIO-X-BFC_The-Blues-won-this-battle_V1.png",
  },
  {
    id: "social-08",
    category: "social",
    title: "Olio Manipal — Contest Alert",
    description:
      "Contest announcement creative for Olio's Manipal campus campaign.",
    src: "Social_media/olio-manipal-contest-alert_1.jpg",
  },
  {
    id: "social-09",
    category: "social",
    title: "Olio & Juliet — Pizza",
    description:
      "Romantic themed pizza social creative for Olio's Valentine's Day campaign.",
    src: "Social_media/olio-and-juliet_Pizza_aw_v1.jpg",
  },
  {
    id: "social-10",
    category: "social",
    title: "Desi Burgers",
    description:
      "Bold food photography social post highlighting Olio's desi burger range.",
    src: "Social_media/desi-burgers_aw_v1.jpg",
  },
  {
    id: "social-11",
    category: "social",
    title: "Garlic Knots — Vol.1",
    description:
      "Appetising social media visual for Olio's garlic knots menu launch.",
    src: "Social_media/Olio_garlic knots_sm_v2-01.jpg",
  },
  {
    id: "social-12",
    category: "social",
    title: "Garlic Knots — Vol.2",
    description: "Second social creative in the garlic knots series for Olio.",
    src: "Social_media/Olio_garlic knots_sm_v2-02.jpg",
  },
  {
    id: "social-14",
    category: "social",
    title: "Pick Your Pizza",
    description:
      "Interactive social post inviting audiences to choose their favourite Olio pizza.",
    src: "Social_media/Pick_Your_pizza_olio_v2-02.jpg",
  },
  {
    id: "social-15",
    category: "social",
    title: "Name This Burrito Bowl",
    description:
      "UGC-style engagement post asking followers to name Olio's new burrito bowl.",
    src: "Social_media/Name-this-burrito-bowl_v1.jpg",
  },
  {
    id: "social-16",
    category: "social",
    title: "The Perfect Start to Your Day",
    description:
      "Morning-vibes breakfast social creative for Olio's day-starter menu.",
    src: "Social_media/The-Perfect-start-to-your-day_aw_v1_2.jpg",
  },
  {
    id: "social-17",
    category: "social",
    title: "Chilli Oil",
    description:
      "Minimal product social post showcasing Olio's signature chilli oil offering.",
    src: "Social_media/MC_Olio_Chilli-oil_V1 (1).png",
  },
  {
    id: "social-18",
    category: "social",
    title: "Pop of Colour & Freshness",
    description:
      "Vibrant social creative celebrating Olio's fresh and colourful menu.",
    src: "Social_media/pop-of-colour&-freshness_1.jpg",
  },
  {
    id: "social-19",
    category: "social",
    title: "EatFit — Fun-tastic Performances",
    description:
      "Social media creative for EatFit's campaign tying nutrition with performance.",
    src: "Social_media/Eatfit_Fun-tastic performances_v1-02.jpg",
  },
  {
    id: "social-20",
    category: "social",
    title: "Husl Bar — What's in My Bag?",
    description:
      "Lifestyle social post for Husl Bar's audience engagement series.",
    src: "Social_media/Husl-bar_Whats-in-my-bag.jpg",
  },
  {
    id: "social-22",
    category: "social",
    title: "KOE — Varun Dhawan",
    description:
      "Celebrity-driven social creative for the Kingdom of Entertainment brand.",
    src: "Social_media/KOE_Varun dhavan-04.jpg",
  },
  {
    id: "social-23",
    category: "social",
    title: "Krish Mask",
    description:
      "Superhero-themed social post inspired by the Krish franchise.",
    src: "Social_media/Krish-mask_v1.jpg",
  },
  {
    id: "social-25",
    category: "social",
    title: "The KB 2.0",
    description:
      "Brand refresh social post for The KB, spotlighting the updated identity.",
    src: "Social_media/The-KB-2.0.jpg",
  },
  {
    id: "social-26",
    category: "social",
    title: "Design Work I",
    description: "Creative graphic design work from the portfolio collection.",
    src: "Social_media/IMG_5558.JPG",
  },
  {
    id: "social-27",
    category: "social",
    title: "Design Work II",
    description: "Creative graphic design work from the portfolio collection.",
    src: "Social_media/IMG_5559.JPG",
  },
  
  // ── Print & Flyers ─────────────────────────────────────────
  {
    id: "flyer-01",
    category: "print",
    title: "CakeZone — Lucknow Launch Flyer",
    description:
      "Print flyer designed for the CakeZone store launch in Lucknow.",
    src: "Flyer/cakezone_lucknow flyer-01.jpg",
  },
  {
    id: "flyer-02",
    category: "print",
    title: "CakeZone — Dessert Cup Flyer",
    description:
      "Product launch flyer showcasing CakeZone's signature dessert cup range.",
    src: "Flyer/CZ_Dessrt cup_flyer_v1-01.jpg",
  },
  {
    id: "flyer-03",
    category: "print",
    title: "CakeZone — Diwali Flyer",
    description:
      "Festive A5 print flyer for CakeZone's Diwali promotional campaign.",
    src: "Flyer/CZ-Diwali-A5_v1.jpg",
  },
  {
    id: "flyer-04",
    category: "print",
    title: "Nature Conservation Brochure",
    description:
      "Environmental awareness brochure featuring tree conservation messaging and natural design elements.",
    src: "Flyer/IMG_5564.JPG", // ← fixed: use short Assets-relative path
  },
  {
    id: "flyer-04b",
    category: "print",
    title: "Design Flyer V2",
    description:
      "Creative print design from the portfolio flyer collection.",
    src: "Flyer/IMG_5567.JPG", // ← newly added flyer
  },
  
  // ── Branding ──────────────────────────────────────────────
  {
    id: "brand-01",
    category: "branding",
    title: "Best Logo — Yellow Branding",
    description:
      "Bold yellow and red brand identity design featuring the 'best' wordmark on vibrant background.",
    src: "https://res.cloudinary.com/dlgpvmgkn/image/upload/v1776238364/KK_Winter-is-coming_Grid-post-V1_amw9ms.jpg",
  },
  {
    id: "brand-02",
    category: "branding",
    title: "Cesar's Puff Palace Identity",
    description:
      "Classical meets modern branding featuring Roman bust imagery and contemporary signage design.",
    src: "https://images.unsplash.com/photo-1762787863004-767d5d7eac07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxicmFuZGluZyUyMGxvZ28lMjBpZGVudGl0eSUyMGRlc2lnbnxlbnwxfHx8fDE3NzYwNzcyODR8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "brand-03",
    category: "branding",
    title: "Kraft Brand Identity",
    description:
      "Minimalist logo design with high contrast black background showcasing the Kraft wordmark.",
    src: "https://images.unsplash.com/photo-1765448808249-a3610f38e612?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxicmFuZGluZyUyMGxvZ28lMjBpZGVudGl0eSUyMGRlc2lnbnxlbnwxfHx8fDE3NzYwNzcyODR8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "brand-04",
    category: "branding",
    title: "CUF — Illuminated Signage",
    description:
      "Architectural branding featuring illuminated CUF logo at night with premium lighting treatment.",
    src: "https://images.unsplash.com/photo-1764383381195-5daa5902c3f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxicmFuZGluZyUyMGxvZ28lMjBpZGVudGl0eSUyMGRlc2lnbnxlbnwxfHx8fDE3NzYwNzcyODR8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "brand-05",
    category: "branding",
    title: "Audible — Neon Brand Identity",
    description:
      "Modern neon-lit Audible logo showcasing vibrant brand colors and contemporary signage design.",
    src: "https://images.unsplash.com/photo-1760386129108-d17b9cdfc4fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxicmFuZGluZyUyMGxvZ28lMjBpZGVudGl0eSUyMGRlc2lnbnxlbnwxfHx8fDE3NzYwNzcyODR8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "brand-06",
    category: "branding",
    title: "Poster House — Light Projection",
    description:
      "Experimental branding using blue light projection to create atmospheric brand presence.",
    src: "https://images.unsplash.com/photo-1774751006577-41afbfa6a5c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw2fHxicmFuZGluZyUyMGxvZ28lMjBpZGVudGl0eSUyMGRlc2lnbnxlbnwxfHx8fDE3NzYwNzcyODR8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "brand-07",
    category: "branding",
    title: "Leut Specialty Coffee",
    description:
      "Boutique coffee brand identity with elegant window signage and sophisticated typography.",
    src: "https://images.unsplash.com/photo-1769984867572-10dea95bd4f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw3fHxicmFuZGluZyUyMGxvZ28lMjBpZGVudGl0eSUyMGRlc2lnbnxlbnwxfHx8fDE3NzYwNzcyODR8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "brand-08",
    category: "branding",
    title: "Apple Sports — Dark Theme Logo",
    description:
      "Sleek Apple Sports brand identity showcasing minimalist design on dark background.",
    src: "https://images.unsplash.com/photo-1760037034804-2dce280659e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw4fHxicmFuZGluZyUyMGxvZ28lMjBpZGVudGl0eSUyMGRlc2lnbnxlbnwxfHx8fDE3NzYwNzcyODR8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "brand-09",
    category: "branding",
    title: "Apple Sports — Variant II",
    description:
      "Alternative Apple Sports brand treatment with refined logo presentation and dark aesthetic.",
    src: "https://images.unsplash.com/photo-1760037034697-eee0b07ae072?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw5fHxicmFuZGluZyUyMGxvZ28lMjBpZGVudGl0eSUyMGRlc2lnbnxlbnwxfHx8fDE3NzYwNzcyODR8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "brand-10",
    category: "branding",
    title: "Apple Sports — Variant III",
    description:
      "Third iteration of Apple Sports branding showcasing consistent brand system and visual identity.",
    src: "https://images.unsplash.com/photo-1760037028636-6f42428aeeee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxMHx8YnJhbmRpbmclMjBsb2dvJTIwaWRlbnRpdHklMjBkZXNpZ258ZW58MXx8fHwxNzc2MDc3Mjg0fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },

  // ── Packaging ─────────────────────────────────────────────
  {
    id: "pack-01",
    category: "packaging",
    title: "Anti-Aging Face Mask Packaging",
    description:
      "Clean skincare product packaging design featuring minimalist layout and product photography.",
    src: "https://images.unsplash.com/photo-1751991713869-7e5ae07db1fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwcGFja2FnaW5nJTIwYm94JTIwZGVzaWdufGVufDF8fHx8MTc3NjA3NzI4NXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "pack-02",
    category: "packaging",
    title: "Face Mask Collection Box Set",
    description:
      "Multi-product packaging system for skincare line featuring organized grid layout and color coding.",
    src: "https://images.unsplash.com/photo-1753758541974-e9e1d66cfbd9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxwcm9kdWN0JTIwcGFja2FnaW5nJTIwYm94JTIwZGVzaWdufGVufDF8fHx8MTc3NjA3NzI4NXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "pack-03",
    category: "packaging",
    title: "Editorial Calendar Design",
    description:
      "Innovative calendar packaging with modern typography and editorial design approach.",
    src: "https://images.unsplash.com/photo-1655568560367-c146c7b61912?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxwcm9kdWN0JTIwcGFja2FnaW5nJTIwYm94JTIwZGVzaWdufGVufDF8fHx8MTc3NjA3NzI4NXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "pack-04",
    category: "packaging",
    title: "Vintage Breakfast Tin",
    description:
      "Retro-inspired food packaging with nostalgic tin design and classic branding treatment.",
    src: "https://images.unsplash.com/photo-1746422029285-e81d6650f17f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxwcm9kdWN0JTIwcGFja2FnaW5nJTIwYm94JTIwZGVzaWdufGVufDF8fHx8MTc3NjA3NzI4NXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "pack-05",
    category: "packaging",
    title: "Dior Luxury Gift Box",
    description:
      "Premium luxury packaging featuring Christian Dior gift box with ribbon detail and wax seal.",
    src: "https://images.unsplash.com/photo-1759563874663-1c8f3ef40302?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxwcm9kdWN0JTIwcGFja2FnaW5nJTIwYm94JTIwZGVzaWdufGVufDF8fHx8MTc3NjA3NzI4NXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "pack-06",
    category: "packaging",
    title: "Daylight Cardboard Box Design",
    description:
      "Unfolded cardboard packaging showcasing sustainable design and Daylight brand identity.",
    src: "https://images.unsplash.com/photo-1771255217872-99fe6c876e45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw2fHxwcm9kdWN0JTIwcGFja2FnaW5nJTIwYm94JTIwZGVzaWdufGVufDF8fHx8MTc3NjA3NzI4NXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "pack-07",
    category: "packaging",
    title: "Vintage Coffee Can",
    description:
      "Heritage-inspired coffee packaging with retro tin design and nostalgic branding elements.",
    src: "https://images.unsplash.com/photo-1746422029252-de9841a2ef79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw3fHxwcm9kdWN0JTIwcGFja2FnaW5nJTIwYm94JTIwZGVzaWdufGVufDF8fHx8MTc3NjA3NzI4NXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "pack-08",
    category: "packaging",
    title: "Cetaphil Skincare Box",
    description:
      "Professional pharmaceutical packaging design for Cetaphil skincare product line.",
    src: "https://images.unsplash.com/photo-1750085036829-ae889357991f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw4fHxwcm9kdWN0JTIwcGFja2FnaW5nJTIwYm94JTIwZGVzaWdufGVufDF8fHx8MTc3NjA3NzI4NXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "pack-09",
    category: "packaging",
    title: "Cologne Bottle & Packaging",
    description:
      "Elegant fragrance packaging featuring wooden display table and premium bottle presentation.",
    src: "https://images.unsplash.com/photo-1688413580186-fdec38c39553?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw5fHxwcm9kdWN0JTIwcGFja2FnaW5nJTIwYm94JTIwZGVzaWdufGVufDF8fHx8MTc3NjA3NzI4NXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "pack-10",
    category: "packaging",
    title: "Latte-Themed Container",
    description:
      "Modern beverage packaging with coffee-inspired design and minimalist product photography.",
    src: "https://images.unsplash.com/photo-1746422029443-7bb5746f6209?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxMHx8cHJvZHVjdCUyMHBhY2thZ2luZyUyMGJveCUyMGRlc2lnbnxlbnwxfHx8fDE3NzYwNzcyODV8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
   {
    id: "pack-1200",
    category: "packaging",
    title: "Latte-Themed Containerfdsfc",
    description:
      "Modern beverage packaging with coffee-inspired design and minimalist product photography.",
    src: "https://images.unsplash.com/photo-1746422029443-7bb5746f6209?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxMHx8cHJvZHVjdCUyMHBhY2thZ2luZyUyMGJveCUyMGRlc2lnbnxlbnwxfHx8fDE3NzYwNzcyODV8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
   {
    id: "pack-1200",
    category: "packaging",
    title: "Latte-Themed Containerfdsffdfefedfrefrc",
    description:
      "Modern beverage packaging with coffee-inspired design and minimalist product photography.",
    src: "https://images.unsplash.com/photo-1746422029443-7bb5746f6209?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxMHx8cHJvZHVjdCUyMHBhY2thZ2luZyUyMGJveCUyMGRlc2lnbnxlbnwxfHx8fDE3NzYwNzcyODV8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
     {
    id: "pack-1200",
    category: "packaging",
    title: "Latte-Themed Containerfdsffdfefedfrefrc",
    description:
      "Modern beverage packaging with coffee-inspired design and minimalist product photography.",
       src: "Flyer/image.jpg",
   },

];

// ============================================================
//  VIDEO ITEMS
//
//  ── HOW TO ADD A LOCAL VIDEO FILE ──
//  1. Drop the file into:  /src/app/components/figma/Assets/video/
//     Supported formats (any capitalisation):
//       .mp4  .webm  .ogg  .mov  .avi  .mkv
//  2. Add one object below:
//     {
//       id:           unique string           (e.g. "vid-05")
//       title:        card title
//       description:  short description
//       type:         "local"
//       src:          "video/my-clip.mp4"     ← path inside Assets/
//       thumbnail?:   optional poster image
//                     — short path:  "Social_media/poster.jpg"
//                     — or URL:      "https://..."
//     }
//
//  ── HOW TO ADD A YOUTUBE / VIMEO / EXTERNAL MP4 ──
//     { ..., type: "youtube", src: "VIDEO_ID" }
//     { ..., type: "vimeo",   src: "VIDEO_ID" }
//     { ..., type: "mp4",     src: "https://full-url-to-video.mp4" }
// ============================================================
const videoItems: {
  id: string;
  title: string;
  description: string;
  type: "youtube" | "vimeo" | "mp4" | "local";
  src: string;
  thumbnail?: string;
}[] = [
  {
    id: "vid-01",
    title: "Motion Graphics Showreel",
    description:
      "Dynamic motion graphics and visual effects compilation showcasing creative animations.",
    type: "youtube",
    src: "dQw4w9WgXcQ", // ← Replace with your YouTube video ID
    thumbnail:
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=450&fit=crop",
  },
  {
    id: "vid-02",
    title: "Video Editing Portfolio",
    description:
      "Professional video editing work featuring transitions, color grading, and storytelling.",
    type: "youtube",
    src: "dQw4w9WgXcQ", // ← Replace with your YouTube video ID
    thumbnail:
      "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&h=450&fit=crop",
  },
  {
    id: "vid-03",
    title: "AI Video Creation",
    description:
      "AI-powered video creation and enhancement showcasing cutting-edge techniques.",
    type: "youtube",
    src: "dQw4w9WgXcQ", // ← Replace with your YouTube video ID
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
  },
  // ↓↓↓ ADD MORE VIDEO ITEMS HERE ↓↓↓
  // LOCAL EXAMPLE:
  // { id: "vid-04", title: "Brand Reel", description: "...", type: "local", src: "video/brand-reel.mp4" },
  // { id: "vid-05", title: "AI Reel", description: "...",   type: "local", src: "video/ai-reel.webm", thumbnail: "Social_media/poster.jpg" },
  // YOUTUBE EXAMPLE:
  // { id: "vid-06", title: "My Channel", description: "...", type: "youtube", src: "YOUR_YT_VIDEO_ID" },
];

// ============================================================

type LightboxState =
  | { type: "image"; item: (typeof portfolioItems)[0] }
  | { type: "video"; item: (typeof videoItems)[0] }
  | null;

// ── LocalVideoCard — renders a muted <video> as its own thumbnail
function LocalVideoCard({ src, title }: { src: string; title: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const resolvedSrc = vid(src);

  return resolvedSrc ? (
    <video
      ref={videoRef}
      src={resolvedSrc}
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      muted
      playsInline
      preload="metadata"
      onLoadedMetadata={(e) => {
        // Jump to first frame so the poster is visible
        (e.target as HTMLVideoElement).currentTime = 0.1;
      }}
      aria-label={title}
    />
  ) : null;
}

export function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightbox, setLightbox] = useState<LightboxState>(null);

  const activeCat = CATEGORIES.find((c) => c.id === activeFilter)!;

  const filteredImages =
    activeFilter === "all"
      ? portfolioItems
      : activeFilter === "videos"
        ? []
        : portfolioItems.filter((item) => item.category === activeFilter);

  const showVideos = activeFilter === "all" || activeFilter === "videos";
  const filteredVideos = showVideos ? videoItems : [];

  const getCat = (id: string) =>
    CATEGORIES.find((c) => c.id === id) ?? CATEGORIES[0];

  return (
    <section id="portfolio" className="py-20 relative bg-[#0a0a14]">
      {/* Background glows */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(ellipse at 100% 40%, rgba(255,45,120,0.05) 0%, transparent 55%),
            radial-gradient(ellipse at 0% 60%, rgba(0,191,255,0.05) 0%, transparent 55%)
          `,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-12">
          <p className="font-['Space_Grotesk'] text-xs tracking-[0.3em] uppercase mb-3 text-[#00e5cc]">
            Creative Work
          </p>
          <h2
            className="font-['Orbitron'] font-bold"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              color: "#ffffff",
              textShadow: "0 0 20px rgba(0,229,204,0.2)",
            }}
          >
            Portfolio
          </h2>
          <div
            className="h-px w-24 mx-auto mt-4"
            style={{
              background:
                "linear-gradient(90deg, transparent, #00e5cc, transparent)",
            }}
          />
        </div>

        {/* ── Filter tabs ── */}
        <div
          className="flex flex-wrap justify-center gap-2 mb-10 p-2 rounded-2xl mx-auto w-fit"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className="px-5 py-2 rounded-xl text-sm font-['Space_Grotesk'] font-medium transition-all duration-200"
              style={
                activeFilter === cat.id
                  ? {
                      background: `rgba(${hexToRgb(cat.color)}, 0.18)`,
                      color: cat.color,
                      boxShadow: `0 0 14px ${cat.color}40`,
                      border: `1px solid ${cat.color}60`,
                    }
                  : {
                      background: "transparent",
                      color: "#666",
                      border: "1px solid transparent",
                    }
              }
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* ── Portfolio Grid ── */}
        {filteredImages.length === 0 && filteredVideos.length === 0 ? (
          <EmptyState
            color={activeCat?.color ?? "#00e5cc"}
            isVideos={activeFilter === "videos"}
          />
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
            {/* Image cards */}
            {filteredImages.map((item) => {
              const cat = getCat(item.category);
              const imgSrc = img(item.src);
              return (
                <div key={item.id} className="break-inside-avoid">
                  <div
                    className="group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
                    style={{
                      background: "#111120",
                      border: `1px solid ${cat.color}18`,
                      boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
                    }}
                    onClick={() => setLightbox({ type: "image", item })}
                  >
                    {imgSrc ? (
                      <img
                        src={imgSrc}
                        alt={item.title}
                        className="w-full object-cover block transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div
                        className="w-full h-48 flex items-center justify-center"
                        style={{
                          background: `rgba(${hexToRgb(cat.color)},0.05)`,
                        }}
                      >
                        <span className="font-['Space_Grotesk'] text-xs text-gray-600">
                          {item.src}
                        </span>
                      </div>
                    )}

                    {/* Hover overlay */}
                    <div
                      className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background:
                          "linear-gradient(0deg, rgba(5,5,18,0.95) 0%, rgba(5,5,18,0.6) 60%, transparent 100%)",
                      }}
                    >
                      <span
                        className="inline-block px-2 py-0.5 rounded-full text-xs font-['Space_Grotesk'] font-semibold mb-2 w-fit"
                        style={{
                          background: `rgba(${hexToRgb(cat.color)}, 0.2)`,
                          color: cat.color,
                          border: `1px solid ${cat.color}50`,
                        }}
                      >
                        {cat.label}
                      </span>
                      <h4 className="font-['Space_Grotesk'] font-semibold text-sm text-white mb-1">
                        {item.title}
                      </h4>
                      <p className="font-['Space_Grotesk'] text-xs text-gray-400 leading-snug line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    {/* Zoom icon */}
                    <div
                      className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100"
                      style={{
                        background: "rgba(255,255,255,0.15)",
                        backdropFilter: "blur(6px)",
                        border: "1px solid rgba(255,255,255,0.2)",
                      }}
                    >
                      <ZoomIn size={14} className="text-white" />
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Video cards */}
            {filteredVideos.map((vidItem) => (
              <div key={vidItem.id} className="break-inside-avoid">
                <div
                  className="group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
                  style={{
                    background: "#111120",
                    border: "1px solid rgba(255,154,0,0.18)",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
                    aspectRatio: "16/9",
                  }}
                  onClick={() => setLightbox({ type: "video", item: vidItem })}
                >
                  {/* ── Thumbnail layer ── */}
                  {vidItem.type === "local" && !vidItem.thumbnail ? (
                    // Use <video> as its own animated poster
                    <LocalVideoCard src={vidItem.src} title={vidItem.title} />
                  ) : vidItem.thumbnail ? (
                    <img
                      src={
                        vidItem.thumbnail.startsWith("http")
                          ? vidItem.thumbnail
                          : img(vidItem.thumbnail)
                      }
                      alt={vidItem.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(255,154,0,0.1), rgba(155,48,255,0.1))",
                      }}
                    />
                  )}

                  {/* Dark overlay */}
                  <div
                    className="absolute inset-0"
                    style={{ background: "rgba(5,5,18,0.55)" }}
                  />

                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{
                        background: "rgba(255,154,0,0.2)",
                        border: "2px solid #ff9a00",
                        boxShadow: "0 0 28px rgba(255,154,0,0.5)",
                      }}
                    >
                      <Play
                        size={26}
                        style={{ color: "#ff9a00" }}
                        fill="#ff9a00"
                      />
                    </div>
                  </div>

                  {/* LOCAL badge */}
                  {vidItem.type === "local" && (
                    <div
                      className="absolute top-3 left-3 flex items-center gap-1 px-2 py-0.5 rounded-full"
                      style={{
                        background: "rgba(255,154,0,0.18)",
                        border: "1px solid rgba(255,154,0,0.4)",
                      }}
                    >
                      <Film size={10} style={{ color: "#ff9a00" }} />
                      <span
                        className="font-['Space_Grotesk'] text-[10px] font-semibold"
                        style={{ color: "#ff9a00" }}
                      >
                        LOCAL
                      </span>
                    </div>
                  )}

                  {/* Hover info */}
                  <div
                    className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background:
                        "linear-gradient(0deg, rgba(5,5,18,0.95) 0%, transparent 100%)",
                    }}
                  >
                    <span
                      className="inline-block px-2 py-0.5 rounded-full text-xs font-['Space_Grotesk'] font-semibold mb-1 w-fit"
                      style={{
                        background: "rgba(255,154,0,0.2)",
                        color: "#ff9a00",
                        border: "1px solid rgba(255,154,0,0.5)",
                      }}
                    >
                      Video Project
                    </span>
                    <h4 className="font-['Space_Grotesk'] font-semibold text-sm text-white">
                      {vidItem.title}
                    </h4>
                    <p className="font-['Space_Grotesk'] text-xs text-gray-400 mt-0.5 line-clamp-1">
                      {vidItem.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Item count */}
        {(filteredImages.length > 0 || filteredVideos.length > 0) && (
          <p className="text-center font-['Space_Grotesk'] text-xs text-gray-600 mt-8">
            Showing {filteredImages.length + filteredVideos.length} project
            {filteredImages.length + filteredVideos.length !== 1 ? "s" : ""}
          </p>
        )}
      </div>

      {/* ── LIGHTBOX MODAL ── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{
            background: "rgba(0,0,0,0.92)",
            backdropFilter: "blur(8px)",
          }}
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative w-full max-w-4xl rounded-3xl overflow-hidden"
            style={{
              background: "#0d0d1a",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 0 60px rgba(0,229,204,0.12)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              <X size={16} className="text-white" />
            </button>

            {/* ── Image lightbox ── */}
            {lightbox.type === "image" &&
              (() => {
                const cat = getCat(lightbox.item.category);
                return (
                  <>
                    <img
                      src={img(lightbox.item.src)}
                      alt={lightbox.item.title}
                      className="w-full max-h-[75vh] object-contain"
                    />
                    <div className="px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
                      <div>
                        <span
                          className="inline-block px-2 py-0.5 rounded-full text-xs font-['Space_Grotesk'] font-semibold mb-2"
                          style={{
                            background: `rgba(${hexToRgb(cat.color)}, 0.18)`,
                            color: cat.color,
                            border: `1px solid ${cat.color}50`,
                          }}
                        >
                          {cat.label}
                        </span>
                        <h3 className="font-['Space_Grotesk'] font-semibold text-base text-white">
                          {lightbox.item.title}
                        </h3>
                        <p className="font-['Space_Grotesk'] text-xs text-gray-400 mt-1">
                          {lightbox.item.description}
                        </p>
                      </div>
                      {lightbox.item.link && (
                        <a
                          href={lightbox.item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-['Space_Grotesk'] font-semibold transition-all duration-200 hover:scale-105"
                          style={{
                            background: "rgba(0,229,204,0.12)",
                            border: "1px solid rgba(0,229,204,0.4)",
                            color: "#00e5cc",
                          }}
                        >
                          View Project <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                  </>
                );
              })()}

            {/* ── Video lightbox ── */}
            {lightbox.type === "video" && (
              <div>
                <div
                  className="relative w-full"
                  style={{ aspectRatio: "16/9" }}
                >
                  {/* YouTube */}
                  {lightbox.item.type === "youtube" && (
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${lightbox.item.src}?autoplay=1`}
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      title={lightbox.item.title}
                    />
                  )}

                  {/* Vimeo */}
                  {lightbox.item.type === "vimeo" && (
                    <iframe
                      className="w-full h-full"
                      src={`https://player.vimeo.com/video/${lightbox.item.src}?autoplay=1`}
                      allow="autoplay; fullscreen"
                      allowFullScreen
                      title={lightbox.item.title}
                    />
                  )}

                  {/* External MP4 URL */}
                  {lightbox.item.type === "mp4" && (
                    <video
                      className="w-full h-full object-cover"
                      poster={lightbox.item.thumbnail}
                      controls
                      autoPlay
                    >
                      <source
                        src={lightbox.item.src}
                        type={videoMime(lightbox.item.src)}
                      />
                      Your browser does not support this video format.
                    </video>
                  )}

                  {/* Local file — resolved via VID glob lookup */}
                  {lightbox.item.type === "local" && (
                    <video
                      className="w-full h-full object-contain bg-black"
                      poster={
                        lightbox.item.thumbnail
                          ? lightbox.item.thumbnail.startsWith("http")
                            ? lightbox.item.thumbnail
                            : img(lightbox.item.thumbnail)
                          : undefined
                      }
                      controls
                      autoPlay
                    >
                      <source
                        src={vid(lightbox.item.src)}
                        type={videoMime(lightbox.item.src)}
                      />
                      Your browser does not support this video format.
                    </video>
                  )}
                </div>

                <div className="px-6 py-4">
                  <span
                    className="inline-block px-2 py-0.5 rounded-full text-xs font-['Space_Grotesk'] font-semibold mb-2"
                    style={{
                      background: "rgba(255,154,0,0.18)",
                      color: "#ff9a00",
                      border: "1px solid rgba(255,154,0,0.5)",
                    }}
                  >
                    Video Project
                  </span>
                  <h3 className="font-['Space_Grotesk'] font-semibold text-base text-white">
                    {lightbox.item.title}
                  </h3>
                  <p className="font-['Space_Grotesk'] text-xs text-gray-400 mt-1">
                    {lightbox.item.description}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

// ── Helpers ──────────────────────────────────────────────────

function EmptyState({
  color,
  isVideos,
}: {
  color: string;
  isVideos: boolean;
}) {
  return (
    <div
      className="rounded-3xl p-16 text-center mx-auto max-w-lg"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: `1px dashed ${color}30`,
      }}
    >
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
        style={{
          background: `rgba(${hexToRgb(color)}, 0.08)`,
          border: `2px dashed ${color}40`,
          boxShadow: `0 0 20px ${color}18`,
        }}
      >
        {isVideos ? (
          <Play size={32} style={{ color }} />
        ) : (
          <ZoomIn size={32} style={{ color }} />
        )}
      </div>
      <h3
        className="font-['Orbitron'] font-bold text-base mb-3"
        style={{ color }}
      >
        {isVideos
          ? "Video Projects Coming Soon"
          : "No Items in This Category"}
      </h3>
      <p className="font-['Space_Grotesk'] text-sm text-gray-500">
        {isVideos
          ? "Add entries to videoItems in Portfolio.tsx. Supports YouTube, Vimeo, external MP4, and local files (.mp4 .webm .ogg .mov .avi .mkv) dropped in Assets/video/."
          : "Add entries to portfolioItems in Portfolio.tsx with a matching category id."}
      </p>
    </div>
  );
}

function hexToRgb(hex: string): string {
  const result =
    /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return "0,0,0";
  return `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(
    result[3],
    16,
  )}`;
}
