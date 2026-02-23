import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Sparkles, ArrowRight, Building2, CreditCard, FileText, Send } from 'lucide-react';
import { pricingConfig, emailConfig } from '../config';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

gsap.registerPlugin(ScrollTrigger);

const Pricing = () => {
  const sectionRef = useRef(null);
  const pricingRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // Dialog state
  const [selectionDialogOpen, setSelectionDialogOpen] = useState(false);
  const [invoiceDialogOpen, setInvoiceDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  
  // Invoice form state
  const [invoiceForm, setInvoiceForm] = useState({
    name: '',
    company: '',
    email: '',
    contactPerson: '',
    phoneNumber: '',
    package: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 85%',
      onEnter: () => setIsVisible(true),
    });

    return () => {
      st.kill();
    };
  }, []);

  useEffect(() => {
    if (!isVisible || !pricingRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        pricingRef.current.querySelectorAll('.pricing-card'),
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isVisible]);

  const handlePlanClick = (plan) => {
    if (plan.name === 'CUSTOM' || plan.name === 'ENTERPRISE') {
      // Scroll to contact section
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      alert(`Starting free trial for ${plan.name} plan. Our team will contact you shortly!`);
    }
  };

  const handleContactSales = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle click on "Click to Pay" button
  const handlePayClick = (plan) => {
    setSelectedPlan(plan);
    setSelectionDialogOpen(true);
  };

  // Handle Pay Online option
  const handlePayOnline = () => {
    if (selectedPlan && selectedPlan.paymentUrl) {
      window.open(selectedPlan.paymentUrl, '_blank');
    }
    setSelectionDialogOpen(false);
  };

  // Handle Request Invoice option
  const handleRequestInvoice = () => {
    setInvoiceForm({
      ...invoiceForm,
      package: selectedPlan ? `${selectedPlan.name} - ${selectedPlan.price}` : ''
    });
    setSelectionDialogOpen(false);
    setInvoiceDialogOpen(true);
  };

  // Handle invoice form input change
  const handleInvoiceChange = (e) => {
    const { name, value } = e.target;
    setInvoiceForm(prev => ({ ...prev, [name]: value }));
  };

  // Handle invoice form submission
  const handleInvoiceSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Construct email body
    const emailBody = `
Name: ${invoiceForm.name}
Company: ${invoiceForm.company}
Email: ${invoiceForm.email}
Contact Person: ${invoiceForm.contactPerson}
Phone Number: ${invoiceForm.phoneNumber}
Package: ${invoiceForm.package}

Message:
${invoiceForm.message || 'No additional message provided'}
    `.trim();
    
    // Construct mailto URL
    const mailtoUrl = `mailto:${emailConfig.recipient}?subject=${encodeURIComponent(emailConfig.subjects.invoice)}&body=${encodeURIComponent(emailBody)}`;
    
    // Open default email client
    window.open(mailtoUrl, '_blank');
    
    // Show success message and reset form
    setTimeout(() => {
      alert('Thank you! Your email client has been opened with the invoice request details. Please send the email to complete your submission.');
      setInvoiceForm({
        name: '',
        company: '',
        email: '',
        contactPerson: '',
        phoneNumber: '',
        package: '',
        message: ''
      });
      setInvoiceDialogOpen(false);
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <>
      <section
        id="pricing"
        ref={sectionRef}
        className="relative w-full py-16 md:py-24 bg-void-black overflow-hidden"
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-void-black via-void-dark/50 to-void-black" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          {/* Section header */}
          <div className="text-center mb-10 md:mb-16">
            <p className="font-mono-custom text-[10px] sm:text-xs text-neon-soft/60 uppercase tracking-wider mb-3 md:mb-4">
              {pricingConfig.sectionLabel}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-3 md:mb-4">
              {pricingConfig.sectionTitle}
            </h2>
            <p className="text-sm md:text-base text-white/50 max-w-2xl mx-auto px-4">
              Choose the plan that fits your business needs. All plans include our core AI capabilities.
            </p>
          </div>

          {/* Pricing cards */}
          <div
            ref={pricingRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          >
            {pricingConfig.plans.map((plan) => (
              <div
                key={plan.id}
                className={`pricing-card relative p-5 md:p-6 rounded-xl md:rounded-2xl border transition-all duration-300 ${
                  plan.highlighted
                    ? 'bg-gradient-to-b from-neon-cyan/10 to-transparent border-neon-cyan/30 sm:scale-105'
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                }`}
              >
                {/* Status badge */}
                {plan.status && (
                  <div className="absolute -top-2.5 md:-top-3 left-1/2 -translate-x-1/2">
                    <span className={`px-2.5 md:px-3 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-mono-custom uppercase tracking-wider ${
                      plan.status === 'popular'
                        ? 'bg-neon-cyan text-void-black'
                        : plan.status === 'enterprise'
                        ? 'bg-purple-500 text-white'
                        : 'bg-white/20 text-white'
                    }`}>
                      {pricingConfig.statusLabels[plan.status]}
                    </span>
                  </div>
                )}

                {/* Plan header */}
                <div className="mb-4 md:mb-6">
                  <h3 className="font-display text-sm md:text-lg text-white/60 uppercase tracking-wider mb-1 md:mb-2">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-3xl md:text-4xl text-white">{plan.price}</span>
                    {plan.period && (
                      <span className="text-white/50 text-xs md:text-sm">{plan.period}</span>
                    )}
                  </div>
                  <p className="text-xs md:text-sm text-white/40 mt-1 md:mt-2">{plan.description}</p>
                </div>

                {/* Features list */}
                <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 md:gap-3">
                      <Check className="w-3.5 h-3.5 md:w-4 md:h-4 text-neon-cyan flex-shrink-0 mt-0.5" />
                      <span className="text-xs md:text-sm text-white/70">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                {plan.cta === "Click to Pay" ? (
                  <button
                    onClick={() => handlePayClick(plan)}
                    className={`w-full py-2.5 md:py-3 rounded-full font-display text-xs md:text-sm uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 ${
                      plan.highlighted
                        ? 'bg-neon-cyan text-void-black hover:bg-neon-soft'
                        : 'border border-white/20 text-white hover:border-neon-cyan hover:text-neon-cyan'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    {plan.cta}
                  </button>
                ) : (
                  <button
                    onClick={() => handlePlanClick(plan)}
                    className={`w-full py-2.5 md:py-3 rounded-full font-display text-xs md:text-sm uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 ${
                      plan.highlighted
                        ? 'bg-neon-cyan text-void-black hover:bg-neon-soft'
                        : 'border border-white/20 text-white hover:border-neon-cyan hover:text-neon-cyan'
                    }`}
                  >
                    {plan.name === 'CUSTOM' || plan.name === 'ENTERPRISE' ? (
                      <>
                        <Building2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        {plan.cta}
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        {plan.cta}
                      </>
                    )}
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Bottom note */}
          <div className="mt-10 md:mt-16 text-center">
            <p className="font-mono-custom text-xs md:text-sm text-white/40 mb-4 md:mb-6 px-4">
              {pricingConfig.bottomNote}
            </p>
            <button
              onClick={handleContactSales}
              className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 border border-white/20 text-white rounded-full hover:border-neon-cyan hover:text-neon-cyan transition-colors active:scale-95"
            >
              <span className="font-display text-xs md:text-sm uppercase tracking-wider">
                {pricingConfig.bottomCtaText}
              </span>
              <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Selection Dialog */}
      <Dialog open={selectionDialogOpen} onOpenChange={setSelectionDialogOpen}>
        <DialogContent className="bg-void-dark border border-white/20 text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-display text-white">Choose Payment Option</DialogTitle>
            <DialogDescription className="text-white/50">
              How would you like to proceed with your purchase?
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <button
              onClick={handlePayOnline}
              className="flex items-center justify-center gap-3 p-4 rounded-xl bg-neon-cyan text-void-black font-display uppercase tracking-wider hover:bg-neon-soft transition-colors active:scale-95"
            >
              <CreditCard className="w-5 h-5" />
              Pay Online
            </button>
            <button
              onClick={handleRequestInvoice}
              className="flex items-center justify-center gap-3 p-4 rounded-xl border border-white/20 text-white font-display uppercase tracking-wider hover:border-neon-cyan hover:text-neon-cyan transition-colors active:scale-95"
            >
              <FileText className="w-5 h-5" />
              Request for Invoice
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Invoice Request Dialog */}
      <Dialog open={invoiceDialogOpen} onOpenChange={setInvoiceDialogOpen}>
        <DialogContent className="bg-void-dark border border-white/20 text-white sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-display text-white">Request for Invoice</DialogTitle>
            <DialogDescription className="text-white/50">
              Fill in the details below and we'll send you an invoice.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleInvoiceSubmit} className="space-y-4 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-white/70 text-sm mb-2 block">Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={invoiceForm.name}
                  onChange={handleInvoiceChange}
                  required
                  placeholder="Your name"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                />
              </div>
              <div>
                <Label htmlFor="company" className="text-white/70 text-sm mb-2 block">Company *</Label>
                <Input
                  id="company"
                  name="company"
                  value={invoiceForm.company}
                  onChange={handleInvoiceChange}
                  required
                  placeholder="Company name"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email" className="text-white/70 text-sm mb-2 block">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={invoiceForm.email}
                  onChange={handleInvoiceChange}
                  required
                  placeholder="your@email.com"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                />
              </div>
              <div>
                <Label htmlFor="contactPerson" className="text-white/70 text-sm mb-2 block">Contact Person *</Label>
                <Input
                  id="contactPerson"
                  name="contactPerson"
                  value={invoiceForm.contactPerson}
                  onChange={handleInvoiceChange}
                  required
                  placeholder="Contact person name"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phoneNumber" className="text-white/70 text-sm mb-2 block">Phone Number *</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  value={invoiceForm.phoneNumber}
                  onChange={handleInvoiceChange}
                  required
                  placeholder="+1 (555) 000-0000"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                />
              </div>
              <div>
                <Label htmlFor="package" className="text-white/70 text-sm mb-2 block">Package</Label>
                <Input
                  id="package"
                  name="package"
                  value={invoiceForm.package}
                  onChange={handleInvoiceChange}
                  readOnly
                  className="bg-white/10 border-white/10 text-white/70 cursor-not-allowed"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="message" className="text-white/70 text-sm mb-2 block">Message (Optional)</Label>
              <textarea
                id="message"
                name="message"
                value={invoiceForm.message}
                onChange={handleInvoiceChange}
                rows={3}
                placeholder="Any additional information..."
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-neon-cyan/50 transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-neon-cyan text-void-black font-display text-sm uppercase tracking-wider rounded-full hover:bg-neon-soft transition-colors active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                'Submitting...'
              ) : (
                <>
                  Submit Request
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Pricing;
