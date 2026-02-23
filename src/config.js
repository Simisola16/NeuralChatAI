// =============================================================================
// Site Configuration
// Edit ONLY this file to customize all content across the site.
// All animations, layouts, and styles are controlled by the components.
// =============================================================================

// -- Site-wide settings -------------------------------------------------------
export const siteConfig = {
  title: "NeuralChat AI - Enterprise Conversational Intelligence",
  description: "Enterprise-grade AI chatbot platform powering Fortune 500 companies. Advanced NLP, seamless integrations, and 99.99% uptime SLA.",
  language: "en",
};

// -- Hero Section -------------------------------------------------------------
export const heroConfig = {
  backgroundImage: "/hero-bg.jpg",
  brandName: "NeuralChat AI",
  decodeText: "ENTERPRISE AI",
  decodeChars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*",
  subtitle: "The world's most advanced conversational AI platform. Trusted by Fortune 500 companies.",
  ctaPrimary: "Request Demo",
  ctaPrimaryTarget: "contact",
  ctaSecondary: "View Pricing",
  ctaSecondaryTarget: "pricing",
  cornerLabel: "ENTERPRISE-GRADE",
  cornerDetail: "v3.0 Now Available",
  navItems: [
    { label: "Features", sectionId: "features", icon: "disc" },
    { label: "Solutions", sectionId: "solutions", icon: "play" },
    { label: "Pricing", sectionId: "pricing", icon: "calendar" },
    { label: "Contact", sectionId: "contact", icon: "music" },
  ],
};

// -- Album Cube Section -------------------------------------------------------
export const albumCubeConfig = {
  albums: [
    { id: 1, title: "NEURAL CORE", subtitle: "INTELLIGENCE", image: "/cube-1.jpg" },
    { id: 2, title: "CHAT MIND", subtitle: "CONVERSATION", image: "/cube-2.jpg" },
    { id: 3, title: "CODE BASE", subtitle: "FOUNDATION", image: "/cube-3.jpg" },
    { id: 4, title: "PROCESSOR", subtitle: "COMPUTATION", image: "/cube-4.jpg" },
  ],
  cubeTextures: [
    "/cube-1.jpg", // right
    "/cube-2.jpg", // left
    "/cube-3.jpg", // top
    "/cube-4.jpg", // bottom
    "/cube-5.jpg", // front
    "/cube-6.jpg", // back
  ],
  scrollHint: "Scroll to explore our AI capabilities",
};

// -- Features Section (New) ---------------------------------------------------
export const featuresConfig = {
  sectionLabel: "PLATFORM FEATURES",
  sectionTitle: "Built for Enterprise Scale",
  features: [
    {
      id: 1,
      title: "Advanced NLP",
      description: "State-of-the-art natural language processing with 95%+ intent recognition accuracy.",
      icon: "brain",
    },
    {
      id: 2,
      title: "Multi-Channel",
      description: "Deploy across web, mobile, WhatsApp, Slack, Teams, and 50+ platforms.",
      icon: "globe",
    },
    {
      id: 3,
      title: "Enterprise Security",
      description: "SOC 2 Type II, GDPR, HIPAA compliant with end-to-end encryption.",
      icon: "shield",
    },
    {
      id: 4,
      title: "Real-time Analytics",
      description: "Comprehensive dashboards with conversation insights and performance metrics.",
      icon: "chart",
    },
    {
      id: 5,
      title: "Custom Training",
      description: "Fine-tune models on your proprietary data for industry-specific responses.",
      icon: "cpu",
    },
    {
      id: 6,
      title: "24/7 Support",
      description: "Dedicated account managers and technical support with 15-min response time.",
      icon: "headphones",
    },
  ],
};

// -- Solutions Section (New) --------------------------------------------------
export const solutionsConfig = {
  sectionLabel: "INDUSTRY SOLUTIONS",
  sectionTitle: "Tailored for Your Industry",
  solutions: [
    {
      id: 1,
      title: "E-Commerce",
      description: "Boost conversions with personalized product recommendations and instant support.",
      metrics: "40% increase in sales",
      image: "/gallery-1.jpg",
    },
    {
      id: 2,
      title: "Healthcare",
      description: "HIPAA-compliant patient engagement and appointment scheduling.",
      metrics: "60% reduction in call volume",
      image: "/gallery-2.jpg",
    },
    {
      id: 3,
      title: "Financial Services",
      description: "Secure customer onboarding, KYC verification, and fraud detection.",
      metrics: "99.9% fraud detection rate",
      image: "/gallery-3.jpg",
    },
    {
      id: 4,
      title: "SaaS",
      description: "Reduce churn with proactive customer success and onboarding automation.",
      metrics: "25% reduction in churn",
      image: "/gallery-4.jpg",
    },
  ],
};

// -- Stats Section (New) ------------------------------------------------------
export const statsConfig = {
  stats: [
    { value: "500+", label: "Enterprise Clients" },
    { value: "1B+", label: "Conversations Monthly" },
    { value: "99.99%", label: "Uptime SLA" },
    { value: "50+", label: "Languages Supported" },
    { value: "15min", label: "Support Response" },
    { value: "95%", label: "Intent Accuracy" },
  ],
};

// -- Parallax Gallery Section -------------------------------------------------
export const parallaxGalleryConfig = {
  sectionLabel: "AI CAPABILITIES",
  sectionTitle: "Powerful Features",
  galleryLabel: "SHOWCASE",
  galleryTitle: "Experience the Future",
  marqueeTexts: [
    "NATURAL LANGUAGE PROCESSING",
    "24/7 CUSTOMER SUPPORT",
    "MULTILINGUAL SUPPORT",
    "SEAMLESS INTEGRATION",
    "REAL-TIME ANALYTICS",
    "CUSTOM TRAINING",
  ],
  endCtaText: "Start Your Free Trial",
  parallaxImagesTop: [
    { id: 1, src: "/parallax-1.jpg", alt: "AI Chat Interface" },
    { id: 2, src: "/parallax-2.jpg", alt: "Language Processing" },
    { id: 3, src: "/parallax-3.jpg", alt: "Automation Flow" },
    { id: 4, src: "/parallax-4.jpg", alt: "API Integration" },
    { id: 5, src: "/gallery-1.jpg", alt: "Customer Service" },
    { id: 6, src: "/gallery-2.jpg", alt: "Voice Assistant" },
  ],
  parallaxImagesBottom: [
    { id: 1, src: "/gallery-3.jpg", alt: "Neural Network" },
    { id: 2, src: "/gallery-4.jpg", alt: "Security Shield" },
    { id: 3, src: "/gallery-5.jpg", alt: "Analytics Dashboard" },
    { id: 4, src: "/gallery-6.jpg", alt: "AI Robot Assistant" },
    { id: 5, src: "/cube-1.jpg", alt: "Neural Core" },
    { id: 6, src: "/cube-2.jpg", alt: "Chat Mind" },
  ],
  galleryImages: [
    { id: 1, src: "/gallery-1.jpg", title: "Customer Support", date: "Instant Response" },
    { id: 2, src: "/gallery-2.jpg", title: "Voice AI", date: "Natural Speech" },
    { id: 3, src: "/gallery-3.jpg", title: "Machine Learning", date: "Continuous Improvement" },
    { id: 4, src: "/gallery-4.jpg", title: "Enterprise Security", date: "Data Protection" },
    { id: 5, src: "/gallery-5.jpg", title: "Business Intelligence", date: "Smart Analytics" },
    { id: 6, src: "/gallery-6.jpg", title: "AI Assistant", date: "Always Available" },
  ],
};

// -- Pricing Section ----------------------------------------------------------
export const pricingConfig = {
  sectionLabel: "ENTERPRISE PRICING",
  sectionTitle: "Scale with Confidence",
  bottomNote: "All plans include dedicated onboarding, 99.99% uptime SLA, and 24/7 premium support.",
  bottomCtaText: "Contact Sales for Custom Quote",
  statusLabels: {
    popular: "MOST POPULAR",
    enterprise: "ENTERPRISE",
    custom: "CUSTOM",
  },
  plans: [
    {
      id: 1,
      name: "Chat plugins",
      price: "£1,400",
      period: "one-time setup fee (excl. VAT)",
      description: "For growing businesses",
      features: [
        "Up to 50,000 conversations/month",
        "5 team members",
        "Standard analytics",
        "Email & chat support",
        "50+ integrations",
        "Basic custom training",
        "instant download after payment",
        "Free New features updates",
      ],
      cta: "Click to Pay",
      paymentUrl: "https://www.paypal.com",
      status: "",
      highlighted: false,
    },
    {
      id: 2,
      name: "AI PLUGINS SUPPORTS",
      price: "£2,599",
      period: "one time setup fee (excl. VAT)",
      description: "For established companies",
      features: [
        "Unlimited conversations",
        "Unlimited team members",
        "Advanced analytics & reporting",
        "All integrations + API access",
        "Advanced custom training",
        "Dedicated account manager",
        "24/7 dedicated support",
        "Full API & webhook access",
        "SSO & advanced security",
        "instant download after payment",
        "Free New features updates",

      ],
      cta: "Click to Pay",
      paymentUrl: "https://www.paypal.com",
      status: "popular",
      highlighted: true,
    },
    {
      id: 3,
      name: "ENTERPRISE",
      price: "£4,599",
      period: "one time setup fee (excl. VAT)",
      description: "For large organizations",
      features: [
        "Unlimited conversations",
        "Unlimited team members",
        "Enterprise analytics suite",
        "24/7 dedicated support",
        "Full API & webhook access",
        "Custom AI model training",
        "Dedicated infrastructure",
        "SSO & advanced security",
        "instant download after payment",
        "Free New features updates",
      ],
      cta: "Click to Pay",
      paymentUrl: "https://www.paypal.com",
      status: "enterprise",
      highlighted: false,
    },
    {
      id: 4,
      name: "CUSTOM",
      price: "Let's Talk",
      period: "",
      description: "For unique requirements",
      features: [
        "Everything in Enterprise",
        "Multi-region deployment",
        "Custom SLA guarantees",
        "White-label options",
        "On-premise deployment",
        "Custom AI development",
        "Executive business reviews",
      ],
      cta: "Contact Us",
      status: "custom",
      highlighted: false,
    },
  ],
};

// -- Testimonials Section (New) -----------------------------------------------
export const testimonialsConfig = {
  sectionLabel: "CLIENT SUCCESS",
  sectionTitle: "Trusted by Industry Leaders",
  testimonials: [
    {
      id: 1,
      quote: "NeuralChat AI transformed our customer support. We reduced response times by 80% while improving customer satisfaction scores.",
      author: "Sarah Chen",
      role: "VP of Customer Experience",
      company: "TechCorp Global",
      image: "/cube-2.jpg",
    },
    {
      id: 2,
      quote: "The ROI was incredible. Within 3 months, we saw a 300% increase in qualified leads and reduced operational costs significantly.",
      author: "Michael Rodriguez",
      role: "Chief Digital Officer",
      company: "FinanceHub Inc",
      image: "/cube-3.jpg",
    },
    {
      id: 3,
      quote: "Enterprise-grade security and compliance made NeuralChat AI the clear choice for our healthcare organization.",
      author: "Dr. Emily Watson",
      role: "CTO",
      company: "MedCare Systems",
      image: "/cube-4.jpg",
    },
  ],
};

// -- Footer Section -----------------------------------------------------------
export const footerConfig = {
  portraitImage: "/footer-portrait.jpg",
  portraitAlt: "NeuralChat AI Assistant",
  heroTitle: "NEURALCHAT",
  heroSubtitle: "The Future of Enterprise Conversations",
  artistLabel: "POWERED BY",
  artistName: "ADVANCED AI",
  artistSubtitle: "Machine Learning & NLP",
  brandName: "NeuralChat AI",
  brandDescription: "Empowering Fortune 500 companies with intelligent conversational AI. Build meaningful connections with your customers through natural, human-like interactions at enterprise scale.",
  quickLinksTitle: "Quick Links",
  quickLinks: ["Features", "Pricing", "Documentation", "API Reference", "Blog", "Careers"],
  contactTitle: "Contact Us",
  emailLabel: "Email",
  email: "enterprise@neuralchat.ai",
  phoneLabel: "Phone",
  phone: "+1 (888) 123-4567",
  addressLabel: "Headquarters",
  address: "500 AI Plaza, Suite 1000, San Francisco, CA 94105",
  newsletterTitle: "Enterprise Insights",
  newsletterDescription: "Subscribe to receive the latest AI trends, case studies, and product updates.",
  newsletterButtonText: "Subscribe",
  subscribeAlertMessage: "Thank you for subscribing! You'll receive our enterprise insights newsletter.",
  copyrightText: "© 2026 NeuralChat AI. All rights reserved.",
  bottomLinks: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Security"],
  socialLinks: [
    { icon: "twitter", label: "Twitter", href: "https://twitter.com/neuralchat" },
    { icon: "youtube", label: "YouTube", href: "https://youtube.com/neuralchat" },
    { icon: "instagram", label: "LinkedIn", href: "https://linkedin.com/company/neuralchat" },
    { icon: "music", label: "GitHub", href: "https://github.com/neuralchat" },
  ],
  galleryImages: [
    { id: 1, src: "/gallery-1.jpg" },
    { id: 2, src: "/gallery-2.jpg" },
    { id: 3, src: "/gallery-3.jpg" },
    { id: 4, src: "/gallery-4.jpg" },
  ],
};
