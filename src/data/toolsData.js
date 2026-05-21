export const categories = [
  {
    id: 'security',
    name: 'Security Tools',
    description: 'Keep your digital footprint safe with robust keys, passwords, and authenticators.',
    icon: 'FaShieldAlt',
    gradient: 'from-violet-500 to-indigo-600',
    hoverGradient: 'hover:shadow-violet-500/20',
  },
  {
    id: 'creative',
    name: 'Creative Tools',
    description: 'Overcome writer\'s block with creative names, headlines, and business ideas.',
    icon: 'FaLightbulb',
    gradient: 'from-pink-500 to-rose-500',
    hoverGradient: 'hover:shadow-pink-500/20',
  },
  {
    id: 'utility',
    name: 'Utility Tools',
    description: 'Handy generation utilities including custom QR codes, barcodes, and random numbers.',
    icon: 'FaSlidersH',
    gradient: 'from-blue-500 to-cyan-500',
    hoverGradient: 'hover:shadow-blue-500/20',
  },
  {
    id: 'social',
    name: 'Social Tools',
    description: 'Grow your social presence with usernames, gaming handles, and viral hashtags.',
    icon: 'FaShareAlt',
    gradient: 'from-emerald-500 to-teal-500',
    hoverGradient: 'hover:shadow-emerald-500/20',
  },
  {
    id: 'developer',
    name: 'Developer Tools',
    description: 'Format code payloads, encode/decode strings, and generate secure developer credentials.',
    icon: 'FaCode',
    gradient: 'from-amber-500 to-orange-600',
    hoverGradient: 'hover:shadow-amber-500/20',
  }
];

export const tools = [
  // Security Tools
  {
    id: 'password-generator',
    category: 'security',
    name: 'Password Generator',
    description: 'Generate strong, secure, and customizable passwords to protect your online accounts.',
    icon: 'FaKey',
    trending: true,
    features: [
      'Password length slider (8-64 characters)',
      'Uppercase & lowercase letters toggles',
      'Numbers and special symbols toggles',
      'Live password strength visual indicator',
      'One-click clipboard copy feature',
      'Completely client-side generation'
    ]
  },
  {
    id: 'otp-generator',
    category: 'security',
    name: 'OTP Generator',
    description: 'Create random 4-digit or 6-digit One-Time Passwords for multi-factor authentication testing.',
    icon: 'FaMobileAlt',
    trending: false,
    features: [
      'Toggle between 4-digit and 6-digit PIN formats',
      'Instant regeneration button',
      'One-click clipboard copy feature',
      'Visual timer mock or manual refresh'
    ]
  },
  {
    id: 'encryption-key-generator',
    category: 'security',
    name: 'Encryption Key Generator',
    description: 'Generate high-entropy cryptographic keys (128-bit, 256-bit, 512-bit) in Hex or Base64 format.',
    icon: 'FaLock',
    trending: true,
    features: [
      'Multiple key sizes: 128, 256, 512 bits',
      'Output formats: Hexadecimal and Base64',
      'High-entropy cryptographically secure generation',
      'One-click copy function'
    ]
  },
  {
    id: 'password-strength-checker',
    category: 'security',
    name: 'Password Strength Checker',
    description: 'Analyze password strength, entropy bits, character variance, and estimated crack times.',
    icon: 'FaShieldAlt',
    trending: false,
    features: [
      'Interactive real-time strength meter',
      'Detailed checklist of character requirements',
      'Calculates entropy value (bits of security)',
      'Estimated brute-force crack time calculation',
      'Zero server dependencies or transmission'
    ]
  },
  {
    id: 'text-encrypt-decrypt',
    category: 'security',
    name: 'Text Encrypt & Decrypt',
    description: 'Encrypt and decrypt text inputs locally in your browser using secure AES-GCM cryptography.',
    icon: 'FaLock',
    trending: false,
    features: [
      'Natively secure AES-GCM encryption',
      'Password-derived key derivation (PBKDF2)',
      'Custom salt and Initialization Vectors (IV)',
      'Easy Base64 output format for sharing',
      '100% offline client-side computation'
    ]
  },
  
  // Creative Tools
  {
    id: 'name-generator',
    category: 'creative',
    name: 'Name Generator',
    description: 'Instantly generate brand, business, or character names using prefix and suffix formulas.',
    icon: 'FaTag',
    trending: true,
    features: [
      'Business name generation mode',
      'Brand name generation mode',
      'Character & gaming name generation mode',
      'Keyword prefix/suffix blending options'
    ]
  },
  {
    id: 'story-title-generator',
    category: 'creative',
    name: 'Story / Title Generator',
    description: 'Get inspired by blog headlines, book titles, and dramatic story ideas categorized by genre.',
    icon: 'FaBookOpen',
    trending: false,
    features: [
      'Multiple genres: Blog/Tech, Mystery/Thriller, Fantasy/Sci-Fi',
      'Generate blog post headlines',
      'Generate fiction book/story titles',
      'One-click copy title'
    ]
  },
  {
    id: 'idea-generator',
    category: 'creative',
    name: 'Startup & Idea Generator',
    description: 'Find inspiration with curated startup ideas, marketing strategies, and content themes.',
    icon: 'FaCompass',
    trending: false,
    features: [
      'Startup company concept generator',
      'Viral marketing ideas generator',
      'Social content themes (YouTube, Blog) generator',
      'Random brainstorming deck cards'
    ]
  },
  
  // Utility Tools
  {
    id: 'qr-code-generator',
    category: 'utility',
    name: 'QR Code Generator',
    description: 'Convert web addresses, text snippets, or contacts into download-ready QR codes.',
    icon: 'FaQrcode',
    trending: true,
    features: [
      'Convert text, URLs, email, or WiFi details into QR codes',
      'Real-time SVG/Canvas rendering preview',
      'High-quality PNG download capabilities',
      'Adjustable foreground and background colors'
    ]
  },
  {
    id: 'barcode-generator',
    category: 'utility',
    name: 'Barcode Generator',
    description: 'Generate standard barcodes (CODE128, EAN, UPC) with custom alphanumeric codes.',
    icon: 'FaBarcode',
    trending: false,
    features: [
      'Supports CODE128 format',
      'Live barcode canvas rendering',
      'High-quality image download',
      'Validates alphanumeric characters'
    ]
  },
  {
    id: 'random-number-generator',
    category: 'utility',
    name: 'Random Number Generator',
    description: 'Roll dice, pick lottery options, or select range-bound integers for statistics and games.',
    icon: 'FaDice',
    trending: false,
    features: [
      'Define min and max ranges',
      'Option to generate a list of multiple non-repeating numbers',
      'Visual dice-rolling / picker feedback'
    ]
  },
  
  // Social Tools
  {
    id: 'username-generator',
    category: 'social',
    name: 'Username Generator',
    description: 'Create unique, cool, and catchy usernames for any gaming console or online profile.',
    icon: 'FaUserAlt',
    trending: true,
    features: [
      'Keyword-based blends',
      'Prefix/suffix styling options (leet-speak, numbers, suffixes)',
      'Availability style variations'
    ]
  },
  {
    id: 'hashtag-generator',
    category: 'social',
    name: 'Hashtag Generator',
    description: 'Generate popular and relevant tags for Instagram, TikTok, or YouTube based on keywords.',
    icon: 'FaHashtag',
    trending: false,
    features: [
      'Input primary keywords to generate relevant tags',
      'Categorizes by Popular, Niche, and Trending tags',
      'Quick copy all tags in one click'
    ]
  },
  {
    id: 'social-media-name-generator',
    category: 'social',
    name: 'Channel Name Generator',
    description: 'Get specialized channel name suggestions tailored for Instagram, YouTube, and Twitch niches.',
    icon: 'FaTv',
    trending: false,
    features: [
      'Targeted for YouTube, Instagram, and Gaming handles',
      'Industry niches: Tech, Gaming, Vlog, Cooking, Fitness',
      'Sleek suggestion table view with copy features'
    ]
  },
  
  // Developer Tools
  {
    id: 'json-formatter',
    category: 'developer',
    name: 'JSON Formatter',
    description: 'Format, validate, prettify, and minify your JSON data objects instantly.',
    icon: 'FaFileCode',
    trending: true,
    features: [
      'Prettify/Format raw JSON strings',
      'Custom tab indentation sizes (2, 4, 8 spaces)',
      'Compact JSON minification output',
      'Built-in real-time validation and error reports',
      'Instant copy-to-clipboard actions',
      'Payload sizing and key-counting stats'
    ]
  },
  {
    id: 'base64-encoder-decoder',
    category: 'developer',
    name: 'Base64 Encoder/Decoder',
    description: 'Safely encode plain text to Base64 or decode Base64 back with URL-safe support.',
    icon: 'FaExchangeAlt',
    trending: false,
    features: [
      'Safe UTF-8 unicode encoding support',
      'Decode standard and URL-Safe Base64 strings',
      'Fast input and output swap options',
      'Real-time conversion as you type',
      'Character count and sizing indicators'
    ]
  },
  {
    id: 'api-key-generator',
    category: 'developer',
    name: 'API Key Generator',
    description: 'Generate high-entropy API keys, UUID tokens, or random secrets for application credentials.',
    icon: 'FaServer',
    trending: true,
    features: [
      'Cryptographically secure generation (window.crypto)',
      'Multiple encoding formats (Base64Url, Hex, Alphanumeric)',
      'Compliance with UUID v4 formatting standard',
      'Custom key prefixes and batch quantity control',
      'Individual key copy and copy all actions'
    ]
  }
];
