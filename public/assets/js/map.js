/**
 * Eventina Organisers — Interactive Event Locations Map & Preview Drawer
 * Leaflet.js Custom Integration with Haute-Couture Light & Fresh Theme
 * Pure Vanilla JavaScript (Zero npm Dependencies)
 */

(() => {
  'use strict';

  // 1. CURATED PAN-INDIA LUXURY VENUES DATASET
  const LOCATIONS_DATA = [
    {
      id: 'udaipur-jagmandir',
      title: 'Jagmandir Island Palace Wedding',
      venue: 'Jagmandir Island Palace & The Leela Palace',
      city: 'Udaipur',
      state: 'Rajasthan',
      region: 'rajasthan',
      coords: [24.5684, 73.6781],
      eventType: '3-Day Royal Destination Wedding',
      guests: '450 Guests',
      season: 'Winter Season',
      heroImg: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80&auto=format&fit=crop',
      photos: [
        {
          url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80&auto=format&fit=crop',
          caption: 'Palace courtyard banquet under antique crystal chandeliers'
        },
        {
          url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&q=80&auto=format&fit=crop',
          caption: 'Lake Pichola floating mandap adorned with white orchids'
        },
        {
          url: 'https://images.unsplash.com/photo-1544077960-604201fe74bc?w=1200&q=80&auto=format&fit=crop',
          caption: 'Illuminated marble arches and twilight floating candles'
        },
        {
          url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1200&q=80&auto=format&fit=crop',
          caption: 'Flotilla guest arrival with traditional Rajasthani horn fanfare'
        }
      ],
      excerpt: 'A majestic 3-day royal union orchestrated over Lake Pichola, featuring floating mandap scenography, royal boat flotilla guest arrival, and an illuminated palace facade.',
      narrative: 'Produced in the heart of Lake Pichola, this multi-day wedding transformed Jagmandir Island into a floating fairytale. Eventina managed all waterborne logistics, private jetty coordination for 450 global dignitaries, acoustic dampening inside historic marble courtyards, and a synchronized fireworks finale across the water horizon.',
      highlights: [
        'Private royal boat flotilla transfers from City Palace jetty',
        'Custom floating mandap engineered with zero water footprint',
        '360-degree architectural projection mapping on palace bastions',
        'Couture royal banquet catering for 450 guests'
      ]
    },
    {
      id: 'jaipur-rambagh',
      title: 'Rambagh Heritage Sangeet & Nuptials',
      venue: 'Rambagh Palace & Fairmont',
      city: 'Jaipur',
      state: 'Rajasthan',
      region: 'rajasthan',
      coords: [26.8978, 75.8080],
      eventType: 'Grand Regal Sangeet & Gala',
      guests: '650 Guests',
      season: 'Autumn / Winter',
      heroImg: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80&auto=format&fit=crop',
      photos: [
        {
          url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80&auto=format&fit=crop',
          caption: 'Palace gardens illuminated with over 20,000 glass candles'
        },
        {
          url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&q=80&auto=format&fit=crop',
          caption: 'Sangeet main stage featuring brass Mughal latticework'
        },
        {
          url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80&auto=format&fit=crop',
          caption: 'Royal dinner reception across manicured lawns'
        },
        {
          url: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=1200&q=80&auto=format&fit=crop',
          caption: 'Heritage baraat procession with caparisoned elephants'
        }
      ],
      excerpt: 'Grand celebration spanning the historic lawns of Rambagh Palace, featuring hand-crafted brass pavilions, sufi musical evenings, and royal ceremonial dining.',
      narrative: 'A masterclass in regal grandeur. Eventina engineered a 200-foot wide Mughal garden amphitheatre, installed custom sound baffling across heritage sandstone walls, and coordinated a 100-artist live sangeet production without disturbing the heritage palace fabric.',
      highlights: [
        'Custom hand-beaten brass Mughal pavilion structures',
        'Concert-grade sound staging designed for zero acoustic echo',
        '20,000 hand-poured soy wax candles across royal gardens',
        'Dedicated VIP security & concierge desk for international travelers'
      ]
    },
    {
      id: 'jodhpur-umaid',
      title: 'Umaid Bhawan Art Deco Gala',
      venue: 'Umaid Bhawan Palace',
      city: 'Jodhpur',
      state: 'Rajasthan',
      region: 'rajasthan',
      coords: [26.2808, 73.0483],
      eventType: 'Black-Tie Palatial Gala',
      guests: '350 Guests',
      season: 'Winter Season',
      heroImg: 'https://images.unsplash.com/photo-1544077960-604201fe74bc?w=1200&q=80&auto=format&fit=crop',
      photos: [
        {
          url: 'https://images.unsplash.com/photo-1544077960-604201fe74bc?w=1200&q=80&auto=format&fit=crop',
          caption: 'Art deco central dome illuminated in warm amber gold'
        },
        {
          url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&q=80&auto=format&fit=crop',
          caption: 'Symphonic sitar and cello ensemble on palace terrace'
        },
        {
          url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80&auto=format&fit=crop',
          caption: 'Mirrored banquet tables and gilded tableware'
        },
        {
          url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80&auto=format&fit=crop',
          caption: 'Mehrangarh Fort view fireworks pyrotechnics'
        }
      ],
      excerpt: 'Intimate yet regal evening under the golden sandstone cupola of Umaid Bhawan, pairing Art Deco scenography with orchestral sitar ensembles.',
      narrative: 'Set against Chittar sandstone architecture, this black-tie gala blended high-fashion aesthetic with Marwar heritage. Eventina curated customized crystal dining scenography, synchronized illumination on the palace dome, and a private orchestral performance under the stars.',
      highlights: [
        'Art Deco inspired mirrored banquet staging',
        'Acoustically calibrated dome lighting & audio rig',
        'Custom 7-course royal tasting dinner curation',
        'Private airport tarmac welcome protocols'
      ]
    },
    {
      id: 'goa-taj-exotica',
      title: 'Sunset Barefoot Coastal Vows',
      venue: 'Taj Exotica Resort & Private Beach',
      city: 'Benaulim',
      state: 'Goa',
      region: 'coastal',
      coords: [15.2505, 73.9318],
      eventType: 'Barefoot Luxury Beach Wedding',
      guests: '280 Guests',
      season: 'Spring / Sunset Window',
      heroImg: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&q=80&auto=format&fit=crop',
      photos: [
        {
          url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&q=80&auto=format&fit=crop',
          caption: 'Natural driftwood mandap adorned with pampas and white flora'
        },
        {
          url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1200&q=80&auto=format&fit=crop',
          caption: 'Seaside sundowner cocktail lounge with rattan pavilions'
        },
        {
          url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&q=80&auto=format&fit=crop',
          caption: 'Barefoot dancefloor under open-sky fairy light canopies'
        },
        {
          url: 'https://images.unsplash.com/photo-1544077960-604201fe74bc?w=1200&q=80&auto=format&fit=crop',
          caption: 'Illuminated coconut grove dining setup'
        }
      ],
      excerpt: 'Bespoke coastal wedding set on the pristine sands of South Goa, featuring sculptural driftwood mandaps, acoustic saxophone sundowners, and an open-sky reception.',
      narrative: 'A celebration crafted around the rhythms of the Arabian Sea. Eventina solved coastal tides and moisture challenges with elevated reinforced timber decking, wind-resistant floral architecture, and subtle warm ambient illumination that preserved the starry coastal sky.',
      highlights: [
        'Tide-calibrated wooden decking and barefoot boardwalks',
        'Wind-resistant natural driftwood & botanical archway',
        'Live acoustic percussion & saxophone sundowner sessions',
        'Silent generator power stations for quiet ocean ambiance'
      ]
    },
    {
      id: 'goa-w-hotel',
      title: 'Cliffside Neon Sundowner & Afterparty',
      venue: 'W Goa & Vagator Cliff',
      city: 'Vagator',
      state: 'Goa',
      region: 'coastal',
      coords: [15.5978, 73.7447],
      eventType: 'Modern Sangeet & Neon Afterparty',
      guests: '400 Guests',
      season: 'Winter / Spring',
      heroImg: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&q=80&auto=format&fit=crop',
      photos: [
        {
          url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&q=80&auto=format&fit=crop',
          caption: 'Cliffside festival stage with dynamic kinetic lighting'
        },
        {
          url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&q=80&auto=format&fit=crop',
          caption: 'VIP cabanas with champagne hospitality towers'
        },
        {
          url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&q=80&auto=format&fit=crop',
          caption: 'Neon art tunnel entrance overlooking Vagator beach'
        },
        {
          url: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=1200&q=80&auto=format&fit=crop',
          caption: 'World-class DJ console with CO2 and cold spark effects'
        }
      ],
      excerpt: 'High-octane cliffside celebration overlooking the rocky shores of Vagator, featuring festival-grade production, laser choreography, and global DJ sets.',
      narrative: 'A fusion of electronic music culture and luxury hospitality. Eventina designed a bespoke tiered amphitheatre on the cliff edge, equipped with sound-directional line arrays to honor local sound curfews while delivering club-level energy to guests until dawn.',
      highlights: [
        'Directional sound baffles adhering to coastal environmental regulations',
        'Custom illuminated acrylic infinity stage over cliffside pool',
        'International artist hospitality rider fulfillment',
        'Hydration bars & artisan midnight cocktail stations'
      ]
    },
    {
      id: 'bengaluru-leela',
      title: 'Global Tech Conclave & Leadership Gala',
      venue: 'The Leela Palace Bengaluru',
      city: 'Bengaluru',
      state: 'Karnataka',
      region: 'metro',
      coords: [12.9606, 77.6484],
      eventType: 'Corporate Summit & Plenary Gala',
      guests: '1,200 Guests',
      season: 'Year-Round',
      heroImg: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&q=80&auto=format&fit=crop',
      photos: [
        {
          url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&q=80&auto=format&fit=crop',
          caption: 'Grand Ballroom 60-foot curved LED broadcast plenary stage'
        },
        {
          url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80&auto=format&fit=crop',
          caption: 'Leadership awards banquet with royal Mysore motifs'
        },
        {
          url: 'https://images.unsplash.com/photo-1544077960-604201fe74bc?w=1200&q=80&auto=format&fit=crop',
          caption: 'Interactive product launch display & holographic pods'
        },
        {
          url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80&auto=format&fit=crop',
          caption: 'VIP networking lounge with customized lighting'
        }
      ],
      excerpt: 'Flagship enterprise summit bringing together global technology founders and delegates in an impeccably executed high-tech plenary and awards gala.',
      narrative: 'Eventina delivered end-to-end production for this 1,200-delegate conclave. Features included a 60-foot ultra-wide seamless LED stage, redundant fiber optic streaming, simultaneous translation booths, and a five-star dining turnaround in under 45 minutes.',
      highlights: [
        'Ultra-wide 8K curved LED stage with synchronized cue automation',
        'Broadcast-quality multicam live stream infrastructure',
        'VIP green rooms and high-security protocol escort services',
        'Flawless minute-by-minute stage direction and timing control'
      ]
    },
    {
      id: 'mumbai-taj-mahal',
      title: 'Harbour Ballroom Haute Couture Launch',
      venue: 'The Taj Mahal Palace & Tower',
      city: 'Mumbai',
      state: 'Maharashtra',
      region: 'metro',
      coords: [18.9217, 72.8332],
      eventType: 'Luxury Brand Activation & Soirée',
      guests: '500 Guests',
      season: 'Winter Season',
      heroImg: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=1200&q=80&auto=format&fit=crop',
      photos: [
        {
          url: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=1200&q=80&auto=format&fit=crop',
          caption: 'Crystal ballroom runway framed with white florals'
        },
        {
          url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80&auto=format&fit=crop',
          caption: 'VIP red carpet entry overlooking the Gateway of India'
        },
        {
          url: 'https://images.unsplash.com/photo-1544077960-604201fe74bc?w=1200&q=80&auto=format&fit=crop',
          caption: 'Jewellery display showcases with fiber-optic micro-spots'
        },
        {
          url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&q=80&auto=format&fit=crop',
          caption: 'Midnight champagne and caviar reception salon'
        }
      ],
      excerpt: 'Exclusive luxury activation facing the Gateway of India, orchestrating a bespoke runway showcase, high-jewelry exhibit, and celebrity gala banquet.',
      narrative: 'Precision scenography in India’s most iconic hospitality landmark. Eventina transformed the Ballrooms with floating glass runways, calibrated museum lighting for diamond and couture showcases, and seamless media red-carpet management.',
      highlights: [
        'Zero-glare high-CRI lighting design for diamond showcases',
        'High-security biometric access and celebrity chaperone logistics',
        'Seamless media lounge and private step-and-repeat staging',
        'Custom champagne towers and bespoke dessert bar scenography'
      ]
    },
    {
      id: 'delhi-itc-bharat',
      title: 'Aravalli Estate Marquee Nuptials',
      venue: 'ITC Grand Bharat, Gurugram',
      city: 'Delhi NCR',
      state: 'Haryana',
      region: 'metro',
      coords: [28.3283, 76.9941],
      eventType: 'Multi-Day Bespoke Marquee Wedding',
      guests: '550 Guests',
      season: 'Winter Season',
      heroImg: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1200&q=80&auto=format&fit=crop',
      photos: [
        {
          url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1200&q=80&auto=format&fit=crop',
          caption: 'Grand climate-controlled glass marquee surrounded by greenery'
        },
        {
          url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80&auto=format&fit=crop',
          caption: 'Lotus pavilion mandap set in the reflection pool'
        },
        {
          url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&q=80&auto=format&fit=crop',
          caption: 'Sufi night lounge with velvet bolsters and brass lanterns'
        },
        {
          url: 'https://images.unsplash.com/photo-1544077960-604201fe74bc?w=1200&q=80&auto=format&fit=crop',
          caption: 'Royal dinner court with live tandoor and artisanal bread ovens'
        }
      ],
      excerpt: 'Sprawling estate celebration nestled in the Aravalli hills, featuring a custom glass marquee, reflection pool lotus mandap, and opulent sufi night.',
      narrative: 'Constructing a temporary 15,000 sq ft glasshouse ballroom on the golf greens of ITC Grand Bharat, Eventina created a winter retreat complete with underfloor climate control, hanging floral chandeliers, and an uninterrupted panorama of the surrounding Aravalli range.',
      highlights: [
        '15,000 sq ft climate-controlled European glasshouse marquee',
        'Lotus pavilion mandap anchored in central reflection pond',
        'Sufi night musical arrangement featuring heritage acoustic artists',
        'Golf buggy fleet management for 550 guest transit across estate'
      ]
    },
    {
      id: 'mussoorie-marriott',
      title: 'Himalayan Ridge Glasshouse Nuptials',
      venue: 'JW Marriott Walnut Grove Resort',
      city: 'Mussoorie',
      state: 'Uttarakhand',
      region: 'hills',
      coords: [30.4598, 78.0644],
      eventType: 'Mountain Retreat Wedding',
      guests: '220 Guests',
      season: 'Spring / Autumn',
      heroImg: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&q=80&auto=format&fit=crop',
      photos: [
        {
          url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&q=80&auto=format&fit=crop',
          caption: 'Mountain amphitheatre ceremony with Himalayan backdrop'
        },
        {
          url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80&auto=format&fit=crop',
          caption: 'Pine forest long-table family dining under fairy lights'
        },
        {
          url: 'https://images.unsplash.com/photo-1544077960-604201fe74bc?w=1200&q=80&auto=format&fit=crop',
          caption: 'Cozy fireplace lounge with cashmere throws and hot spiced cocktails'
        },
        {
          url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1200&q=80&auto=format&fit=crop',
          caption: 'Sunset cocktail deck overlooking Doon valley mist'
        }
      ],
      excerpt: 'Intimate, mist-clad celebration perched on high mountain ridges, featuring pine forest candlelit dining, alpine floral palettes, and warm fireplace soirees.',
      narrative: 'High-altitude production executed with supreme elegance. Eventina handled hill logistics from Dehradun airport, designed wind-resistant terrace structures, and staged unforgettable dinners amidst towering cedar and walnut trees.',
      highlights: [
        'Dedicated Dehradun airport convoy with private luxury shuttles',
        'Outdoor mountain heating and thermal comfort styling',
        'Himalayan botanical floral installations with sustainable greens',
        'Acoustic folk and acoustic guitar sunset serenades'
      ]
    },
    {
      id: 'hyderabad-falaknuma',
      title: 'Nizami 101-Seater Royal Banquet',
      venue: 'Taj Falaknuma Palace',
      city: 'Hyderabad',
      state: 'Telangana',
      region: 'south',
      coords: [17.3312, 78.4682],
      eventType: 'Nizami Heritage Soirée & Nuptials',
      guests: '300 Guests',
      season: 'Winter Season',
      heroImg: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80&auto=format&fit=crop',
      photos: [
        {
          url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80&auto=format&fit=crop',
          caption: 'World-famous 101-seater dining hall prepared for state banquet'
        },
        {
          url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80&auto=format&fit=crop',
          caption: 'Horse-drawn royal carriage guest arrival at palace entrance'
        },
        {
          url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&q=80&auto=format&fit=crop',
          caption: 'Live ghazal mehfil on the Rajasthani marble courtyard terrace'
        },
        {
          url: 'https://images.unsplash.com/photo-1544077960-604201fe74bc?w=1200&q=80&auto=format&fit=crop',
          caption: 'City of Pearls panorama view under candlelit chandeliers'
        }
      ],
      excerpt: 'Opulent Nizami evening high above Hyderabad, featuring royal horse-drawn carriage arrivals, acoustic qawwali ensembles, and dining at the historic 101-seater table.',
      narrative: 'A celebration wrapped in Nizami opulence. Eventina orchestrated private horse-carriage arrivals up the palace hill, curated bespoke silver-embossed menu folios, and staged a candlelit qawwali night that echoed across the historic ramparts.',
      highlights: [
        'Horse-drawn royal carriage procession for guest arrivals',
        'State dining curation at the historic 101-seater palace table',
        'Acoustically engineered qawwali & sitar mehfil staging',
        'Preservation protocols protecting priceless Belgian chandeliers'
      ]
    },
    {
      id: 'kerala-kumarakom',
      title: 'Backwaters Emerald Lagoon Nuptials',
      venue: 'Kumarakom Lake Resort & Grand Hyatt',
      city: 'Kottayam / Kochi',
      state: 'Kerala',
      region: 'south',
      coords: [9.6175, 76.4301],
      eventType: 'Serene Backwaters Wedding',
      guests: '250 Guests',
      season: 'Autumn / Winter',
      heroImg: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1200&q=80&auto=format&fit=crop',
      photos: [
        {
          url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1200&q=80&auto=format&fit=crop',
          caption: 'Floating houseboat mandap set against the emerald backwaters'
        },
        {
          url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&q=80&auto=format&fit=crop',
          caption: 'Coconut grove banquet adorned with 5,000 brass nilavilakku lamps'
        },
        {
          url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80&auto=format&fit=crop',
          caption: 'Traditional Chenda Melam percussion welcome on arrival jetty'
        },
        {
          url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&q=80&auto=format&fit=crop',
          caption: 'Sunset water-lantern release into Lake Vembanad'
        }
      ],
      excerpt: 'Poetic waterside union on the banks of Lake Vembanad, featuring floating houseboat stages, Chenda Melam percussion greetings, and glowing nilavilakku oil lamps.',
      narrative: 'A tranquil, soul-stirring retreat where Kerala’s lush greenery met palatial decor. Eventina engineered stable floating mandap pontoons on the lagoon, curated traditional temple artisan floral designs, and managed scenic water-taxi guest transfers.',
      highlights: [
        'Floating pontoon mandap engineered for calm lagoon stability',
        'Traditional brass nilavilakku lamp illumination (no open flames)',
        'Chenda Melam and Kathakali cultural welcoming choreography',
        'Scenic houseboat cruise cocktails for bridal party'
      ]
    }
  ];

  // 2. DOM REFERENCES
  const mapElement = document.getElementById('map-container');
  const countBadge = document.getElementById('locations-count');
  const resetBtn = document.getElementById('map-reset-btn');
  const filterButtons = document.querySelectorAll('[data-filter]');
  const locationCards = document.querySelectorAll('.location-card');

  // Drawer Elements
  const drawerBackdrop = document.getElementById('location-drawer-backdrop');
  const drawer = document.getElementById('location-drawer');
  const drawerCloseBtn = document.getElementById('location-drawer-close');
  const drawerCity = document.getElementById('drawer-city');
  const drawerTitle = document.getElementById('drawer-title');
  const drawerMainImg = document.getElementById('drawer-main-img');
  const drawerPhotoCounter = document.getElementById('drawer-photo-counter');
  const drawerThumbsRow = document.getElementById('drawer-thumbs-row');
  const drawerEventType = document.getElementById('drawer-event-type');
  const drawerVenue = document.getElementById('drawer-venue');
  const drawerGuests = document.getElementById('drawer-guests');
  const drawerSeason = document.getElementById('drawer-season');
  const drawerNarrative = document.getElementById('drawer-narrative');
  const drawerHighlights = document.getElementById('drawer-highlights');
  const drawerEnquiryBtn = document.getElementById('drawer-enquiry-btn');

  let map = null;
  const markersMap = new Map(); // id -> L.marker
  let activeLocationId = null;
  let activeFilter = 'all';
  let lastFocusedTrigger = null;

  // 3. INITIALIZE LEAFLET MAP
  function initMap() {
    if (!mapElement || typeof L === 'undefined') return;

    // Center over India
    const initialCenter = [21.8, 78.5];
    const initialZoom = window.innerWidth < 768 ? 4 : 5;

    map = L.map('map-container', {
      center: initialCenter,
      zoom: initialZoom,
      minZoom: 4,
      maxZoom: 16,
      scrollWheelZoom: false // Prevent unwanted page scroll trapping
    });

    // CartoDB Positron Light Tiles (Zero API key, elegant light paper palette)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions" target="_blank" rel="noopener">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    // Create Custom Gold Markers
    LOCATIONS_DATA.forEach(loc => {
      const customIcon = L.divIcon({
        className: 'custom-gold-marker',
        html: `
          <div class="marker-pulse-ring" aria-hidden="true"></div>
          <div class="marker-pin-outer">
            <div class="marker-pin-inner"></div>
          </div>
        `,
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [0, -38]
      });

      const marker = L.marker(loc.coords, {
        icon: customIcon,
        title: `${loc.title} — ${loc.city}`
      });

      // Accessible Popup
      const popupHtml = `
        <div class="map-popup-card">
          <img src="${loc.heroImg}" alt="${loc.title}" class="map-popup-img" loading="lazy">
          <div class="map-popup-body">
            <span class="map-popup-category">${loc.eventType}</span>
            <h4 class="map-popup-title">${loc.title}</h4>
            <div class="map-popup-location">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>${loc.venue}, ${loc.city}</span>
            </div>
            <button type="button" class="map-popup-btn" data-open-drawer="${loc.id}">
              Explore Event Showcase &rarr;
            </button>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml, {
        maxWidth: 280,
        className: 'custom-leaflet-popup'
      });

      marker.on('click', () => {
        // Automatically focus on pin
        map.panTo(loc.coords, { animate: true, duration: 0.6 });
      });

      marker.addTo(map);
      markersMap.set(loc.id, marker);
    });

    // Delegate popup button click to open drawer
    map.on('popupopen', (e) => {
      const popupNode = e.popup.getElement();
      if (!popupNode) return;
      const openBtn = popupNode.querySelector('[data-open-drawer]');
      if (openBtn) {
        openBtn.addEventListener('click', () => {
          const locId = openBtn.getAttribute('data-open-drawer');
          openDrawer(locId);
        });
      }
    });

    updateCounters();
  }

  // 4. FILTERING SYSTEM
  function applyFilter(filterKey) {
    activeFilter = filterKey;

    // Update filter button states
    filterButtons.forEach(btn => {
      const isSelected = btn.getAttribute('data-filter') === filterKey;
      btn.classList.toggle('is-active', isSelected);
      btn.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
    });

    let visibleCount = 0;
    const visibleCoords = [];

    // Filter Map Markers
    LOCATIONS_DATA.forEach(loc => {
      const marker = markersMap.get(loc.id);
      const isMatch = filterKey === 'all' || loc.region === filterKey;

      if (marker && map) {
        if (isMatch) {
          if (!map.hasLayer(marker)) map.addLayer(marker);
          visibleCoords.push(loc.coords);
          visibleCount++;
        } else {
          if (map.hasLayer(marker)) map.removeLayer(marker);
        }
      }
    });

    // Filter Directory Cards Below Map
    locationCards.forEach(card => {
      const cardRegion = card.getAttribute('data-region');
      const isCardMatch = filterKey === 'all' || cardRegion === filterKey;

      if (isCardMatch) {
        card.style.display = '';
        card.removeAttribute('hidden');
      } else {
        card.style.display = 'none';
        card.setAttribute('hidden', '');
      }
    });

    // Pan map to fit visible bounds
    if (map && visibleCoords.length > 0) {
      if (filterKey === 'all') {
        map.setView([21.8, 78.5], window.innerWidth < 768 ? 4 : 5, { animate: true });
      } else {
        const bounds = L.latLngBounds(visibleCoords);
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 8, animate: true });
      }
    }

    updateCounters(visibleCount);
  }

  function updateCounters(count) {
    const total = typeof count === 'number' ? count : LOCATIONS_DATA.length;
    if (countBadge) {
      countBadge.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
        <span>Showing ${total} Destination${total === 1 ? '' : 's'}</span>
      `;
    }
  }

  // 5. PREVIEW DRAWER (SLIDE-IN MODAL)
  function openDrawer(locationId) {
    const loc = LOCATIONS_DATA.find(item => item.id === locationId);
    if (!loc || !drawer) return;

    lastFocusedTrigger = document.activeElement;
    activeLocationId = locationId;

    // Highlight Marker on Map
    markersMap.forEach((marker, id) => {
      const iconEl = marker.getElement();
      if (iconEl) {
        iconEl.classList.toggle('is-active', id === locationId);
      }
    });

    if (map) {
      map.setView(loc.coords, Math.max(map.getZoom(), 8), { animate: true });
    }

    // Populate Drawer Content
    if (drawerCity) drawerCity.textContent = `${loc.city}, ${loc.state}`;
    if (drawerTitle) drawerTitle.textContent = loc.title;
    if (drawerEventType) drawerEventType.textContent = loc.eventType;
    if (drawerVenue) drawerVenue.textContent = loc.venue;
    if (drawerGuests) drawerGuests.textContent = loc.guests;
    if (drawerSeason) drawerSeason.textContent = loc.season;
    if (drawerNarrative) drawerNarrative.textContent = loc.narrative;

    // Highlights Checklist
    if (drawerHighlights) {
      drawerHighlights.innerHTML = loc.highlights.map(h => `
        <li>
          <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
          <span>${h}</span>
        </li>
      `).join('');
    }

    // Gallery Setup
    if (drawerMainImg && loc.photos.length > 0) {
      drawerMainImg.src = loc.photos[0].url;
      drawerMainImg.alt = loc.photos[0].caption;
      if (drawerPhotoCounter) drawerPhotoCounter.textContent = `1 of ${loc.photos.length}`;
    }

    // Thumbnails
    if (drawerThumbsRow) {
      drawerThumbsRow.innerHTML = loc.photos.map((photo, index) => `
        <button type="button" 
                class="drawer-thumb-btn ${index === 0 ? 'is-active' : ''}" 
                data-photo-index="${index}" 
                aria-label="View photo ${index + 1}: ${photo.caption}">
          <img src="${photo.url}" alt="${photo.caption}" loading="lazy">
        </button>
      `).join('');

      // Thumbnail Click Handler
      drawerThumbsRow.querySelectorAll('.drawer-thumb-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.getAttribute('data-photo-index'), 10);
          const selectedPhoto = loc.photos[idx];
          if (selectedPhoto && drawerMainImg) {
            drawerMainImg.style.opacity = '0.4';
            setTimeout(() => {
              drawerMainImg.src = selectedPhoto.url;
              drawerMainImg.alt = selectedPhoto.caption;
              drawerMainImg.style.opacity = '1';
            }, 120);

            if (drawerPhotoCounter) drawerPhotoCounter.textContent = `${idx + 1} of ${loc.photos.length}`;

            drawerThumbsRow.querySelectorAll('.drawer-thumb-btn').forEach(b => b.classList.remove('is-active'));
            btn.classList.add('is-active');
          }
        });
      });
    }

    // Update Direct Enquiry Button
    if (drawerEnquiryBtn) {
      drawerEnquiryBtn.href = `/enquiry?destination=${encodeURIComponent(loc.city + ' — ' + loc.venue)}`;
    }

    // Show Drawer
    drawerBackdrop?.classList.add('is-open');
    drawer.classList.add('is-open');
    drawer.removeAttribute('inert');
    drawer.setAttribute('aria-hidden', 'false');
    drawerBackdrop?.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus close button
    setTimeout(() => {
      drawerCloseBtn?.focus();
    }, 50);

    document.addEventListener('keydown', handleDrawerKeydown);
  }

  function closeDrawer() {
    if (!drawer || !drawer.classList.contains('is-open')) return;

    drawerBackdrop?.classList.remove('is-open');
    drawer.classList.remove('is-open');
    drawer.setAttribute('inert', '');
    drawer.setAttribute('aria-hidden', 'true');
    drawerBackdrop?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    // Clear marker highlight
    markersMap.forEach(marker => {
      marker.getElement()?.classList.remove('is-active');
    });

    document.removeEventListener('keydown', handleDrawerKeydown);

    if (lastFocusedTrigger && typeof lastFocusedTrigger.focus === 'function') {
      lastFocusedTrigger.focus();
    }
  }

  function handleDrawerKeydown(event) {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeDrawer();
    }
  }

  // 6. EVENT LISTENERS
  // Filter button clicks
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filterKey = btn.getAttribute('data-filter') || 'all';
      applyFilter(filterKey);
    });
  });

  // Reset map view button
  resetBtn?.addEventListener('click', () => {
    applyFilter('all');
    if (map) {
      map.setView([21.8, 78.5], window.innerWidth < 768 ? 4 : 5, { animate: true });
    }
  });

  // Drawer Close triggers
  drawerCloseBtn?.addEventListener('click', closeDrawer);
  drawerBackdrop?.addEventListener('click', closeDrawer);

  // Card Buttons in Directory Grid
  document.querySelectorAll('[data-open-location]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const locId = btn.getAttribute('data-open-location');
      // Scroll smoothly to map
      mapElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => {
        openDrawer(locId);
      }, 400);
    });
  });

  // DOMContentLoaded / Script Load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMap);
  } else {
    initMap();
  }

})();
