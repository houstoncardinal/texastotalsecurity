import { useState, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send, CheckCircle, Upload, X, File, Image, Video,
  FileText, Plus, Trash2, Cloud, Shield, Phone, Mail,
  MapPin, Clock, AlertCircle, Check, ChevronDown, Loader2,
  Camera, Home, Building2, Users, Wifi, Wrench, Sparkles, ArrowRight, ArrowLeft, Star
} from "lucide-react";
import { saveWebsiteLead } from "@/lib/leadSubmissions";

interface LeadFormProps {
  title?: string;
  subtitle?: string;
  showServiceType?: boolean;
  defaultServiceType?: string;
  defaultPropertyType?: string;
  defaultCity?: string;
  defaultZip?: string;
  referringPage?: string;
  areaName?: string;
  areaSlug?: string;
  areaZip?: string;
  formContext?: string;
  compact?: boolean;
  className?: string;
}

interface UploadedFile {
  id: string;
  file: File;
  preview?: string;
  type: 'image' | 'video' | 'document' | 'other';
}

const serviceTypes = [
  { value: "alarm",               label: "Alarm System Installation",         icon: Shield   },
  { value: "cameras",             label: "Security Camera Installation",       icon: Camera   },
  { value: "monitoring",          label: "24/7 Alarm Monitoring",              icon: Wifi     },
  { value: "takeover",            label: "System Takeover / Switch Provider",  icon: Wrench   },
  { value: "hoa",                 label: "HOA / Gate Cameras",                 icon: Users    },
  { value: "property-management", label: "Property Management Security",       icon: Building2 },
  { value: "commercial",          label: "Commercial Security",                icon: Building2 },
  { value: "residential",         label: "Residential Security",               icon: Home     },
  { value: "other",               label: "Other",                              icon: Plus     },
];

const propertyTypes = [
  { value: "residential", label: "Residential Home",           icon: Home      },
  { value: "condo",       label: "Condo / Townhome",           icon: Building2 },
  { value: "multifamily", label: "Multi-Family / Apartment",   icon: Building2 },
  { value: "commercial",  label: "Commercial Business",        icon: Building2 },
  { value: "hoa",         label: "HOA / Community",            icon: Users     },
  { value: "industrial",  label: "Industrial / Warehouse",     icon: Building2 },
  { value: "other",       label: "Other",                      icon: Plus      },
];

const LeadForm = ({
  title = "Request Your Free Security Analysis",
  subtitle = "Fill out the form below and a security specialist will contact you within 24 hours.",
  showServiceType = true,
  defaultServiceType = "",
  defaultPropertyType = "",
  defaultCity = "",
  defaultZip = "",
  referringPage,
  areaName,
  areaSlug,
  areaZip,
  formContext,
  compact = false,
  className = "",
}: LeadFormProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: defaultCity,
    state: "TX",
    zip: defaultZip,
    serviceType: defaultServiceType,
    propertyType: defaultPropertyType,
    propertySize: "",
    currentSystem: "",
    timeline: "",
    budget: "",
    notes: "",
    agreeToContact: false,
    subscribeNewsletter: false,
  });
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [guidedOpen, setGuidedOpen] = useState(false);
  const [guidedStep, setGuidedStep] = useState(0);
  const [guidedAnswers, setGuidedAnswers] = useState({
    goal: "",
    currentIssue: "",
    existingProvider: "",
    bestTime: "",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Get file type
  const getFileType = (file: File): 'image' | 'video' | 'document' | 'other' => {
    if (file.type.startsWith('image/')) return 'image';
    if (file.type.startsWith('video/')) return 'video';
    if (file.type.includes('pdf') || file.type.includes('document') || file.type.includes('text')) return 'document';
    return 'other';
  };

  // Handle file upload
  const handleFileUpload = useCallback((files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const newFiles: UploadedFile[] = fileArray.slice(0, 10 - uploadedFiles.length).map(file => ({
      id: Math.random().toString(36).substring(7),
      file,
      type: getFileType(file),
    }));

    // Generate preview for images
    newFiles.forEach(fileData => {
      if (fileData.type === 'image') {
        const reader = new FileReader();
        reader.onload = (e) => {
          setUploadedFiles(prev => prev.map(f => 
            f.id === fileData.id ? { ...f, preview: e.target?.result as string } : f
          ));
        };
        reader.readAsDataURL(fileData.file);
      }
    });

    setUploadedFiles(prev => [...prev, ...newFiles]);
  }, [uploadedFiles.length]);

  // Remove file
  const removeFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== id));
  };

  // Drag and drop handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  // Form input handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle submit — posts to Netlify forms
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const pageRef = referringPage ?? (typeof window !== "undefined" ? window.location.href : "");
    saveWebsiteLead({
      sourcePage: pageRef,
      mode: "quick",
      firstName: formData.firstName,
      lastName: formData.lastName,
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      zip: formData.zip,
      serviceType: formData.serviceType,
      propertyType: formData.propertyType,
      currentSystem: formData.currentSystem,
      timeline: formData.timeline,
      notes: formData.notes,
      agreeToContact: formData.agreeToContact,
      subscribeNewsletter: formData.subscribeNewsletter,
      areaName,
      areaSlug,
      areaZip,
      formContext,
      formTitle: title,
    });

    const body = new URLSearchParams({
      "form-name": "lead-form",
      "bot-field": "",
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      zip: formData.zip,
      serviceType: formData.serviceType,
      propertyType: formData.propertyType,
      propertySize: formData.propertySize,
      currentSystem: formData.currentSystem,
      timeline: formData.timeline,
      budget: formData.budget,
      notes: formData.notes,
      referringPage: pageRef,
      areaName: areaName || "",
      areaSlug: areaSlug || "",
      areaZip: areaZip || "",
      formContext: formContext || "",
      formTitle: title,
      agreeToContact: formData.agreeToContact ? "yes" : "no",
      subscribeNewsletter: formData.subscribeNewsletter ? "yes" : "no",
    });

    if (!import.meta.env.DEV) {
      try {
        await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: body.toString(),
        });
      } catch (_) {
        // Submission failed silently — still show success to user
      }
    }

    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleGuidedSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const pageRef = referringPage ?? (typeof window !== "undefined" ? window.location.href : "");
    saveWebsiteLead({
      sourcePage: pageRef,
      mode: "guided",
      firstName: formData.firstName,
      lastName: formData.lastName,
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      zip: formData.zip,
      serviceType: formData.serviceType || defaultServiceType || "alarm",
      propertyType: formData.propertyType,
      currentSystem: formData.currentSystem,
      timeline: formData.timeline || guidedAnswers.bestTime,
      notes: formData.notes,
      agreeToContact: formData.agreeToContact,
      subscribeNewsletter: formData.subscribeNewsletter,
      guidedAnswers,
      areaName,
      areaSlug,
      areaZip,
      formContext,
      formTitle: title,
    });

    const body = new URLSearchParams({
      "form-name": "lead-form",
      "bot-field": "",
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      zip: formData.zip,
      serviceType: formData.serviceType || "alarm",
      propertyType: formData.propertyType,
      currentSystem: formData.currentSystem,
      timeline: formData.timeline || guidedAnswers.bestTime,
      notes: `${formData.notes}\n\nGuided goal: ${guidedAnswers.goal}\nCurrent issue: ${guidedAnswers.currentIssue}\nExisting provider: ${guidedAnswers.existingProvider}\nBest time: ${guidedAnswers.bestTime}`.trim(),
      referringPage: pageRef,
      areaName: areaName || "",
      areaSlug: areaSlug || "",
      areaZip: areaZip || "",
      formContext: formContext || "",
      formTitle: title,
      agreeToContact: formData.agreeToContact ? "yes" : "no",
      subscribeNewsletter: formData.subscribeNewsletter ? "yes" : "no",
    });

    if (!import.meta.env.DEV) {
      try {
        await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: body.toString(),
        });
      } catch (_) {
        // Submission failed silently — still show success to user
      }
    }

    setIsSubmitting(false);
    setGuidedOpen(false);
    setSubmitted(true);
  };

  // Get file icon
  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image': return Image;
      case 'video': return Video;
      case 'document': return FileText;
      default: return File;
    }
  };

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card-static p-10 sm:p-12 text-center"
      >
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
          className="w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <CheckCircle className="w-10 h-10 text-accent" />
          </motion.div>
        </motion.div>
        
        <motion.h3 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-display font-bold text-2xl mb-3 text-foreground"
        >
          Request Received!
        </motion.h3>
        
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-muted-foreground text-base leading-relaxed mb-6"
        >
          Thank you for your interest! A security specialist will contact you within 2 hours.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-3 gap-4 text-center"
        >
          <div className="p-4 rounded-xl bg-accent/5">
            <Phone className="w-5 h-5 text-accent mx-auto mb-2" />
            <p className="text-sm font-medium">(713) 387-9937</p>
          </div>
          <div className="p-4 rounded-xl bg-accent/5">
            <Mail className="w-5 h-5 text-accent mx-auto mb-2" />
            <p className="text-sm font-medium">24 hrs</p>
          </div>
          <div className="p-4 rounded-xl bg-accent/5">
            <Shield className="w-5 h-5 text-accent mx-auto mb-2" />
            <p className="text-sm font-medium">Free</p>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  if (compact) {
    const activeService = formData.serviceType || defaultServiceType;
    const guidedConfigs = {
      cameras: {
        title: "Quick camera system assessment",
        intro: "Answer a few camera-specific prompts. We will package the coverage details cleanly for the admin dashboard.",
        consent: "Yes, Texas Total Security can contact me about my security camera system request. *",
        steps: [
          { label: "Project", title: "What type of camera project is this?", field: "goal" as const, options: ["New camera system for a property", "Upgrade or replace an existing camera system", "Gate, parking, or license plate camera coverage", "Remote viewing or video monitoring setup"] },
          { label: "Coverage", title: "Which areas need coverage first?", field: "currentIssue" as const, options: ["Entrances, exits, or gate lanes", "Parking lots, drive aisles, or vehicle activity", "Common areas, amenities, dumpsters, or mailboxes", "I need a full site coverage plan"] },
          { label: "Current System", title: "What camera infrastructure do you have now?", field: "existingProvider" as const, options: ["No existing camera system", "Existing cameras but coverage is poor", "Existing NVR or CCTV system needs service", "Not sure what equipment is currently installed"] },
          { label: "Timing", title: "How soon should we reach out?", field: "bestTime" as const, options: ["Today", "This week", "Within 2 weeks", "Just researching"] },
        ],
      },
      residential: {
        title: "Quick home security assessment",
        intro: "Answer a few home-focused prompts so we can understand your property, concerns, and best next step.",
        consent: "Yes, Texas Total Security can contact me about my home security request. *",
        steps: [
          { label: "Home", title: "What best describes your home security need?", field: "goal" as const, options: ["New alarm and camera system", "Upgrade an existing home system", "Take over monitoring from another company", "Add cameras, doorbell, or driveway coverage"] },
          { label: "Concern", title: "What are you most concerned about?", field: "currentIssue" as const, options: ["Break-ins or entry-point protection", "Driveway, vehicles, or package theft", "Old equipment or unreliable alerts", "I want a professional full-home plan"] },
          { label: "Current Setup", title: "What do you currently have installed?", field: "existingProvider" as const, options: ["No current security system", "Alarm system only", "Cameras only", "Alarm and cameras", "Not sure / inherited system"] },
          { label: "Timing", title: "How soon should we reach out?", field: "bestTime" as const, options: ["Today", "This week", "Within 2 weeks", "Just researching"] },
        ],
      },
      commercial: {
        title: "Quick commercial security assessment",
        intro: "Answer a few business-focused prompts so we can understand your facility, operations, and security priorities.",
        consent: "Yes, Texas Total Security can contact me about my commercial security request. *",
        steps: [
          { label: "Facility", title: "What kind of commercial property is this?", field: "goal" as const, options: ["Office, retail, or small business", "Warehouse or industrial facility", "Apartment, multifamily, or mixed-use property", "Multi-location business or portfolio"] },
          { label: "Priority", title: "What needs attention first?", field: "currentIssue" as const, options: ["Commercial alarm system or takeover", "Security cameras or CCTV coverage", "After-hours trespassing or deterrence", "Full facility assessment"] },
          { label: "Current Setup", title: "What systems are already installed?", field: "existingProvider" as const, options: ["No current system", "Existing alarm system", "Existing camera system", "Alarm and cameras", "Not sure what is usable"] },
          { label: "Timing", title: "How soon should we reach out?", field: "bestTime" as const, options: ["Today", "This week", "Within 2 weeks", "Just researching"] },
        ],
      },
      hoa: {
        title: "Quick HOA property assessment",
        intro: "Answer a few community-focused prompts for gates, common areas, board needs, and property management priorities.",
        consent: "Yes, Texas Total Security can contact me about my HOA or property management security request. *",
        steps: [
          { label: "Community", title: "What type of property are we assessing?", field: "goal" as const, options: ["HOA neighborhood or gated community", "Apartment or multifamily property", "Condo or townhome community", "Mixed-use or managed property portfolio"] },
          { label: "Coverage", title: "Which areas are the highest priority?", field: "currentIssue" as const, options: ["Gates, entrances, or LPR", "Parking, mailboxes, dumpsters, or amenities", "Pool, playground, or common areas", "Full community coverage plan"] },
          { label: "Decision Process", title: "Who needs to review the recommendation?", field: "existingProvider" as const, options: ["HOA board", "Property manager", "Owner or investor", "Board and property manager together", "Not sure yet"] },
          { label: "Timing", title: "How soon should we reach out?", field: "bestTime" as const, options: ["Today", "This week", "Before our next board meeting", "Just researching"] },
        ],
      },
      monitoring: {
        title: "Quick monitoring assessment",
        intro: "Answer a few monitoring-focused prompts so we can understand your current provider, equipment, and switching timeline.",
        consent: "Yes, Texas Total Security can contact me about monitoring service. *",
        steps: [
          { label: "Need", title: "What monitoring help do you need?", field: "goal" as const, options: ["Switch monitoring from another provider", "Activate monitoring on an existing alarm", "Set up monitoring for a new system", "Fix unreliable monitoring communication"] },
          { label: "System", title: "What is your system doing today?", field: "currentIssue" as const, options: ["Working, but I want better service", "Communication trouble or failed signals", "High monthly bill or poor support", "Not sure if the system is monitored"] },
          { label: "Provider", title: "Who monitors it now?", field: "existingProvider" as const, options: ["ADT", "Vivint", "Brinks", "Alarm.com dealer", "Other / not sure", "No current provider"] },
          { label: "Timing", title: "How soon should we reach out?", field: "bestTime" as const, options: ["Today", "This week", "Within 2 weeks", "Just researching"] },
        ],
      },
      maintenance: {
        title: "Quick service request",
        intro: "Answer a few service prompts so we can route the issue to the right technician and understand urgency.",
        consent: "Yes, Texas Total Security can contact me about service or maintenance. *",
        steps: [
          { label: "Issue", title: "What needs service?", field: "goal" as const, options: ["Alarm system issue", "Camera system issue", "Monitoring or communication issue", "Preventive maintenance or inspection"] },
          { label: "Symptoms", title: "What is happening right now?", field: "currentIssue" as const, options: ["Device offline or not responding", "False alarms, beeping, or trouble alerts", "Poor camera image or recording issue", "I need a technician to inspect the system"] },
          { label: "System", title: "Who installed or manages the system?", field: "existingProvider" as const, options: ["Texas Total Security", "Another security company", "Inherited with property", "Not sure"] },
          { label: "Urgency", title: "How urgent is the service request?", field: "bestTime" as const, options: ["Today if possible", "This week", "Routine maintenance", "Just requesting information"] },
        ],
      },
      analysis: {
        title: "Quick security analysis",
        intro: "Answer a few prompts so we can prepare for the site visit and understand what matters most.",
        consent: "Yes, Texas Total Security can contact me about my free security analysis. *",
        steps: [
          { label: "Property", title: "What type of property should we assess?", field: "goal" as const, options: ["Residential home", "Commercial business", "HOA or managed community", "Multiple properties or portfolio"] },
          { label: "Priority", title: "What are you most interested in?", field: "currentIssue" as const, options: ["Alarm system or monitoring", "Security cameras or CCTV", "Both alarms and cameras", "Not sure, I need recommendations"] },
          { label: "Current Setup", title: "What do you have installed today?", field: "existingProvider" as const, options: ["No current system", "Existing alarm system", "Existing camera system", "Alarm and cameras", "Not sure"] },
          { label: "Timing", title: "How soon should we reach out?", field: "bestTime" as const, options: ["Today", "This week", "Within 2 weeks", "Just researching"] },
        ],
      },
      alarm: {
        title: "Quick alarm assessment",
        intro: "Answer a few prompts. We will package it cleanly for the admin dashboard.",
        consent: "Yes, Texas Total Security can contact me about my alarm system request. *",
        steps: [
          { label: "Need", title: "What do you need help with?", field: "goal" as const, options: ["Install a new hardwired alarm system", "Take over my existing alarm system", "Fix sensors, zones, or keypad issues", "Lower my monthly monitoring bill"] },
          { label: "System", title: "What is happening right now?", field: "currentIssue" as const, options: ["Everything works, I just want better monitoring", "I have zones bypassed or sensors not working", "My equipment is old or unreliable", "I am not sure what condition it is in"] },
          { label: "Provider", title: "Who handles your system today?", field: "existingProvider" as const, options: ["ADT", "Vivint", "Brinks", "Alarm.com dealer", "Other / not sure", "No current provider"] },
          { label: "Timing", title: "How soon should we reach out?", field: "bestTime" as const, options: ["Today", "This week", "Within 2 weeks", "Just researching"] },
        ],
      },
    };
    const guidedConfig =
      formContext === "neighborhood" && areaName ? {
        title: `Guided ${areaName} security assessment`,
        intro: `Answer a few ${areaName}-specific prompts so we can route your request with the right area, property type, and service needs already attached.`,
        consent: `Yes, Texas Total Security can contact me about security service in ${areaName}. *`,
        steps: [
          { label: "Service", title: `What service do you need in ${areaName}?`, field: "goal" as const, options: ["Alarm system installation or takeover", "Security cameras, CCTV, or LPR", "Monitoring, service, or system repair", "Full property assessment across alarms and cameras"] },
          { label: "Property", title: "What type of property are we protecting?", field: "currentIssue" as const, options: ["Residential home or estate", "Townhome, condo, or multifamily", "Commercial office, retail, or medical property", "HOA, gate, community, or managed property"] },
          { label: "Current Setup", title: "What is installed today?", field: "existingProvider" as const, options: ["No current system", "Existing alarm system", "Existing camera system", "Alarm and cameras", "Not sure / inherited with the property"] },
          { label: "Timing", title: "How soon should we reach out?", field: "bestTime" as const, options: ["Today", "This week", "Within 2 weeks", "Just researching"] },
        ],
      } :
      activeService === "property-management" ? guidedConfigs.hoa :
      activeService === "maintenance" ? guidedConfigs.maintenance :
      activeService === "monitoring" ? guidedConfigs.monitoring :
      activeService === "commercial" ? guidedConfigs.commercial :
      activeService === "residential" ? guidedConfigs.residential :
      activeService === "hoa" ? guidedConfigs.hoa :
      activeService === "cameras" ? guidedConfigs.cameras :
      activeService === "alarm" || activeService === "takeover" ? guidedConfigs.alarm :
      guidedConfigs.analysis;
    const guidedTitle = guidedConfig.title;
    const guidedIntro = guidedConfig.intro;
    const consentLabel = guidedConfig.consent;
    const guidedSteps = guidedConfig.steps;
    const activeGuidedStep = guidedSteps[guidedStep];
    const guidedCanContinue = Boolean(guidedAnswers[activeGuidedStep.field]);
    const guidedReadyToSubmit = guidedStep === guidedSteps.length - 1 && formData.firstName && formData.phone && formData.agreeToContact && formData.propertyType && guidedCanContinue;

    const guidedModal = (
      <AnimatePresence>
        {guidedOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] flex items-start justify-center overflow-y-auto bg-black/70 px-4 py-6 backdrop-blur-sm sm:items-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              className="my-auto w-full max-w-xl bg-white shadow-2xl max-h-[calc(100vh-3rem)] overflow-y-auto"
            >
              <form onSubmit={handleGuidedSubmit} className="p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4 border-b border-gray-100 pb-4">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-red-700">
                      <Sparkles className="w-3.5 h-3.5" />
                      Guided Form
                    </div>
                    <h3 className="mt-3 text-2xl font-display font-bold text-gray-950">{guidedTitle}</h3>
                    <p className="mt-1 text-sm text-gray-500">{guidedIntro}</p>
                  </div>
                  <button type="button" onClick={() => setGuidedOpen(false)} className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="mt-5 flex gap-2">
                  {guidedSteps.map((step, index) => (
                    <div key={step.label} className={`h-1.5 flex-1 rounded-full ${index <= guidedStep ? "bg-accent" : "bg-gray-200"}`} />
                  ))}
                </div>

                <div className="mt-5">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-gray-400">
                    Step {guidedStep + 1} of {guidedSteps.length} · {activeGuidedStep.label}
                  </p>
                  <h4 className="mt-2 text-xl font-display font-bold text-gray-950">{activeGuidedStep.title}</h4>
                  <div className="mt-4 grid gap-2">
                    {activeGuidedStep.options.map((option) => (
                      <button
                        type="button"
                        key={option}
                        onClick={() => setGuidedAnswers(prev => ({ ...prev, [activeGuidedStep.field]: option }))}
                        className={`flex items-center justify-between border px-4 py-3 text-left text-sm font-medium transition-colors ${
                          guidedAnswers[activeGuidedStep.field] === option
                            ? "border-accent bg-red-50 text-gray-950"
                            : "border-gray-200 bg-white text-gray-700 hover:border-red-200 hover:bg-red-50"
                        }`}
                      >
                        {option}
                        {guidedAnswers[activeGuidedStep.field] === option && <Check className="w-4 h-4 text-accent" />}
                      </button>
                    ))}
                  </div>
                </div>

                {guidedStep === guidedSteps.length - 1 && (
                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="First Name *"
                      required
                      className="input-premium"
                    />
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Phone *"
                      required
                      className="input-premium"
                    />
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email"
                      className="input-premium"
                    />
                    <select
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={handleInputChange}
                      required
                      className="input-premium"
                    >
                      <option value="">Property Type *</option>
                      {propertyTypes.slice(0, 5).map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                    <label className="sm:col-span-2 flex items-start gap-3 cursor-pointer rounded-xl border border-gray-100 bg-gray-50 p-3">
                      <input
                        type="checkbox"
                        name="agreeToContact"
                        checked={formData.agreeToContact}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                      <span className="text-sm text-gray-600">Yes, Texas Total Security can contact me about this request. *</span>
                    </label>
                  </div>
                )}

                <div className="mt-6 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setGuidedStep(step => Math.max(0, step - 1))}
                    disabled={guidedStep === 0}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-gray-600 disabled:opacity-35"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                  {guidedStep < guidedSteps.length - 1 ? (
                    <button
                      type="button"
                      disabled={!guidedCanContinue}
                      onClick={() => setGuidedStep(step => Math.min(guidedSteps.length - 1, step + 1))}
                      className="btn-primary-gradient inline-flex items-center gap-2 px-5 py-2.5 text-sm disabled:opacity-50"
                    >
                      Continue <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!guidedReadyToSubmit || isSubmitting}
                      className="btn-primary-gradient inline-flex items-center gap-2 px-5 py-2.5 text-sm disabled:opacity-50"
                    >
                      {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                      Submit Guided Request
                    </button>
                  )}
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );

    return (
      <>
        <div className={`glass-card-static p-5 sm:p-6 ${className}`}>
          <div className="mb-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-foreground">{title}</h3>
                <p className="text-xs text-muted-foreground">Quick request or guided help</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>

          <form
            onSubmit={handleSubmit}
            name="lead-form"
            data-netlify="true"
            netlify-honeypot="bot-field"
            className="space-y-4"
          >
            <input type="hidden" name="form-name" value="lead-form" />
            <input type="hidden" name="bot-field" className="hidden" />
            <input type="hidden" name="serviceType" value={formData.serviceType || defaultServiceType || "alarm"} />
            <input type="hidden" name="referringPage" value={referringPage || ""} />
            <input type="hidden" name="areaName" value={areaName || ""} />
            <input type="hidden" name="areaSlug" value={areaSlug || ""} />
            <input type="hidden" name="areaZip" value={areaZip || ""} />
            <input type="hidden" name="formContext" value={formContext || ""} />
            <input type="hidden" name="formTitle" value={title} />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="relative">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="First Name *"
                  required
                  className="input-premium pl-10"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Users className="w-4 h-4" />
                </div>
              </div>
              <div className="relative">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone *"
                  required
                  className="input-premium pl-10"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Phone className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="input-premium pl-10"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Mail className="w-4 h-4" />
                </div>
              </div>
              <div className="relative">
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleInputChange}
                  required
                  className="input-premium pl-10 appearance-none"
                >
                  <option value="">Property Type *</option>
                  {propertyTypes.slice(0, 5).map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <Home className="w-4 h-4" />
                </div>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>

            <label className="flex items-start gap-3 cursor-pointer group rounded-xl border border-gray-100 bg-gray-50 p-3">
              <div className="relative mt-0.5">
                <input
                  type="checkbox"
                  name="agreeToContact"
                  checked={formData.agreeToContact}
                  onChange={handleInputChange}
                  required
                  className="sr-only"
                />
                <div className={`w-5 h-5 rounded-md border-2 transition-all duration-200 flex items-center justify-center ${
                  formData.agreeToContact ? 'bg-accent border-accent' : 'bg-white border-gray-300 group-hover:border-accent/50'
                }`}>
                  {formData.agreeToContact && <Check className="w-3 h-3 text-white" />}
                </div>
              </div>
              <span className="text-sm text-gray-600">
                {consentLabel}
              </span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary-gradient flex items-center justify-center gap-2 text-sm py-3.5 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                Get My Free Assessment
              </button>
              <button
                type="button"
                onClick={() => setGuidedOpen(true)}
                className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm font-semibold text-gray-900 hover:border-accent/30 hover:bg-red-50 transition-colors"
              >
                <Sparkles className="w-4 h-4 text-accent" />
                Guided Form
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
              <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                <Star className="w-3.5 h-3.5 text-accent" />
                <span>Rated 5 Stars on Google</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                <Clock className="w-3.5 h-3.5 text-accent" />
                <span>Fast response</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                <CheckCircle className="w-3.5 h-3.5 text-accent" />
                <span>No obligation</span>
              </div>
            </div>
          </form>
        </div>

        {typeof document !== "undefined" ? createPortal(guidedModal, document.body) : guidedModal}
      </>
    );
  }

  return (
    <div className={`glass-card-static ${compact ? "p-5 sm:p-6" : "p-6 sm:p-8"} ${className}`}>
      {/* Header */}
      <div className={compact ? "mb-4" : "mb-6"}>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
            <Shield className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg text-foreground">{title}</h3>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>

      <form
        onSubmit={handleSubmit}
        name="lead-form"
        data-netlify="true"
        netlify-honeypot="bot-field"
        className={compact ? "space-y-4" : "space-y-5"}
      >
        <input type="hidden" name="form-name" value="lead-form" />
        <input type="hidden" name="bot-field" className="hidden" />
        <input type="hidden" name="referringPage" value={referringPage || ""} />
        <input type="hidden" name="areaName" value={areaName || ""} />
        <input type="hidden" name="areaSlug" value={areaSlug || ""} />
        <input type="hidden" name="areaZip" value={areaZip || ""} />
        <input type="hidden" name="formContext" value={formContext || ""} />
        <input type="hidden" name="formTitle" value={title} />
        {/* Personal Information Section */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="First Name *"
                required
                className="input-premium pl-10"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
            <div className="relative">
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Last Name *"
                required
                className="input-premium pl-10"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email Address *"
                required
                className="input-premium pl-10"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Mail className="w-4 h-4" />
              </div>
            </div>
            <div className="relative">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone Number *"
                required
                className="input-premium pl-10"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Phone className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Service & Property Type */}
        {showServiceType && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative">
              <select
                name="serviceType"
                value={formData.serviceType}
                onChange={handleInputChange}
                required
                className="input-premium pl-10 appearance-none"
              >
                <option value="">Select Service *</option>
                {serviceTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <Shield className="w-4 h-4" />
              </div>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
            <div className="relative">
              <select
                name="propertyType"
                value={formData.propertyType}
                onChange={handleInputChange}
                required
                className="input-premium pl-10 appearance-none"
              >
                <option value="">Property Type *</option>
                {propertyTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <Home className="w-4 h-4" />
              </div>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>
        )}

        {/* Address Section - Expandable */}
        <motion.div className="border border-gray-100 rounded-xl overflow-hidden">
          <button
            type="button"
            onClick={() => setExpandedSection(expandedSection === 'address' ? null : 'address')}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-foreground">Property Address</span>
            </div>
            <motion.div
              animate={{ rotate: expandedSection === 'address' ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </motion.div>
          </button>
          
          <AnimatePresence>
            {expandedSection === 'address' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="px-4 pb-4"
              >
                <div className="space-y-3">
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Street Address"
                    className="input-premium"
                  />
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="City"
                      className="input-premium col-span-2"
                    />
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="input-premium"
                    >
                      <option value="TX">TX</option>
                      <option value="LA">LA</option>
                      <option value="OK">OK</option>
                    </select>
                    <input
                      type="text"
                      name="zip"
                      value={formData.zip}
                      onChange={handleInputChange}
                      placeholder="ZIP"
                      className="input-premium"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* File Upload Section - Drag & Drop */}
        <motion.div className="border border-gray-100 rounded-xl overflow-hidden">
          <button
            type="button"
            onClick={() => setExpandedSection(expandedSection === 'files' ? null : 'files')}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Cloud className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-foreground">Upload Files (Images, Videos, Documents)</span>
              {uploadedFiles.length > 0 && (
                <span className="px-2 py-0.5 text-xs font-medium bg-accent/10 text-accent rounded-full">
                  {uploadedFiles.length} files
                </span>
              )}
            </div>
            <motion.div
              animate={{ rotate: expandedSection === 'files' ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </motion.div>
          </button>
          
          <AnimatePresence>
            {expandedSection === 'files' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="px-4 pb-4"
              >
                {/* Drag & Drop Zone */}
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`
                    relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200
                    ${dragActive 
                      ? 'border-accent bg-accent/5 scale-[1.01]' 
                      : 'border-gray-200 hover:border-accent/50 hover:bg-gray-50'
                    }
                  `}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*,video/*,.pdf,.doc,.docx,.txt"
                    onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
                    className="hidden"
                  />
                  
                  <motion.div
                    animate={{ y: dragActive ? -5 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Upload className={`w-8 h-8 mx-auto mb-3 ${dragActive ? 'text-accent' : 'text-gray-400'}`} />
                    <p className="text-sm font-medium text-foreground mb-1">
                      {dragActive ? 'Drop files here' : 'Drag & drop files here'}
                    </p>
                    <p className="text-xs text-gray-400">
                      or click to browse • Max 10 files • Up to 50MB each
                    </p>
                  </motion.div>
                </div>

                {/* Uploaded Files List */}
                {uploadedFiles.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {uploadedFiles.map((fileData, index) => {
                      const Icon = getFileIcon(fileData.type);
                      return (
                        <motion.div
                          key={fileData.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg group"
                        >
                          {/* Preview */}
                          {fileData.preview ? (
                            <img 
                              src={fileData.preview} 
                              alt={fileData.file.name}
                              className="w-10 h-10 rounded-lg object-cover"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                              <Icon className="w-5 h-5 text-accent" />
                            </div>
                          )}
                          
                          {/* File Info */}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">
                              {fileData.file.name}
                            </p>
                            <p className="text-xs text-gray-400">
                              {formatFileSize(fileData.file.size)}
                            </p>
                          </div>

                          {/* Remove Button */}
                          <button
                            type="button"
                            onClick={() => removeFile(fileData.id)}
                            className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Additional Options - Expandable */}
        <motion.div className="border border-gray-100 rounded-xl overflow-hidden">
          <button
            type="button"
            onClick={() => setExpandedSection(expandedSection === 'additional' ? null : 'additional')}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Plus className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-foreground">Additional Details (Optional)</span>
            </div>
            <motion.div
              animate={{ rotate: expandedSection === 'additional' ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </motion.div>
          </button>
          
          <AnimatePresence>
            {expandedSection === 'additional' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="px-4 pb-4 space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <select
                      name="propertySize"
                      value={formData.propertySize}
                      onChange={handleInputChange}
                      className="input-premium pl-10 appearance-none"
                    >
                      <option value="">Property Size</option>
                      <option value="small">Small - Under 2000 sqft</option>
                      <option value="medium">Medium - 2000-4000 sqft</option>
                      <option value="large">Large - 4000-6000 sqft</option>
                      <option value="xlarge">Extra Large - 6000+ sqft</option>
                    </select>
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="relative">
                    <select
                      name="currentSystem"
                      value={formData.currentSystem}
                      onChange={handleInputChange}
                      className="input-premium pl-10 appearance-none"
                    >
                      <option value="">Current System</option>
                      <option value="none">No System</option>
                      <option value="adt">ADT</option>
                      <option value="vivint">Vivint</option>
                      <option value="simplisafe">SimpliSafe</option>
                      <option value="ring">Ring</option>
                      <option value="other">Other</option>
                      <option value="takeover">Want to Takeover</option>
                    </select>
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                      <Shield className="w-4 h-4" />
                    </div>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      className="input-premium pl-10 appearance-none"
                    >
                      <option value="">Timeline</option>
                      <option value="immediate">Immediately</option>
                      <option value="week">Within 1 Week</option>
                      <option value="month">Within 1 Month</option>
                      <option value="exploring">Just Exploring</option>
                    </select>
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="relative">
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="input-premium pl-10 appearance-none"
                    >
                      <option value="">Budget Range</option>
                      <option value="under1000">Under $1,000</option>
                      <option value="1000-3000">$1,000 - $3,000</option>
                      <option value="3000-5000">$3,000 - $5,000</option>
                      <option value="5000plus">$5,000+</option>
                      <option value="flexible">Flexible</option>
                    </select>
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Tell us more about your security needs, concerns, or specific requirements..."
                  rows={3}
                  className="input-premium resize-none"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Checkboxes */}
        <div className="space-y-3">
          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative mt-0.5">
              <input
                type="checkbox"
                name="agreeToContact"
                checked={formData.agreeToContact}
                onChange={handleInputChange}
                required
                className="sr-only"
              />
              <div className={`
                w-5 h-5 rounded-md border-2 transition-all duration-200 flex items-center justify-center
                ${formData.agreeToContact 
                  ? 'bg-accent border-accent' 
                  : 'border-gray-300 group-hover:border-accent/50'
                }
              `}>
                {formData.agreeToContact && <Check className="w-3 h-3 text-white" />}
              </div>
            </div>
            <span className="text-sm text-gray-600">
              I agree to be contacted by Texas Total Security regarding my security needs *
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative mt-0.5">
              <input
                type="checkbox"
                name="subscribeNewsletter"
                checked={formData.subscribeNewsletter}
                onChange={handleInputChange}
                className="sr-only"
              />
              <div className={`
                w-5 h-5 rounded-md border-2 transition-all duration-200 flex items-center justify-center
                ${formData.subscribeNewsletter 
                  ? 'bg-accent border-accent' 
                  : 'border-gray-300 group-hover:border-accent/50'
                }
              `}>
                {formData.subscribeNewsletter && <Check className="w-3 h-3 text-white" />}
              </div>
            </div>
            <span className="text-sm text-gray-600">
              Subscribe to security tips and special offers
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full btn-primary-gradient flex items-center justify-center gap-2 text-base py-4 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Submit Request
            </>
          )}
        </button>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Shield className="w-4 h-4 text-accent" />
            <span>Licensed & Insured</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Clock className="w-4 h-4 text-accent" />
            <span>Response within 2 hours</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <CheckCircle className="w-4 h-4 text-accent" />
            <span>No obligation</span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LeadForm;
