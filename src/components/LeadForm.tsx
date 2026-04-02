import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, CheckCircle, Upload, X, File, Image, Video, 
  FileText, Plus, Trash2, Cloud, Shield, Phone, Mail,
  MapPin, Clock, AlertCircle, Check, ChevronDown, Loader2,
  Camera, Home, Building2, Users, Wifi, Wrench
} from "lucide-react";

interface LeadFormProps {
  title?: string;
  subtitle?: string;
  showServiceType?: boolean;
}

interface UploadedFile {
  id: string;
  file: File;
  preview?: string;
  type: 'image' | 'video' | 'document' | 'other';
}

const serviceTypes = [
  { value: "alarm", label: "Alarm System Installation", icon: Shield },
  { value: "cameras", label: "Security Camera Installation", icon: Camera },
  { value: "monitoring", label: "24/7 Alarm Monitoring", icon: Wifi },
  { value: "takeover", label: "System Takeover / Switch Provider", icon: Wrench },
  { value: "hoa", label: "HOA / Gate Cameras", icon: Users },
  { value: "commercial", label: "Commercial Security", icon: Building2 },
  { value: "residential", label: "Residential Security", icon: Home },
  { value: "other", label: "Other", icon: Plus },
];

const propertyTypes = [
  { value: "residential", label: "Residential Home", icon: Home },
  { value: "condo", label: "Condo / Townhome", icon: Building2 },
  { value: "commercial", label: "Commercial Business", icon: Building2 },
  { value: "hoa", label: "HOA / Community", icon: Users },
  { value: "industrial", label: "Industrial / Warehouse", icon: Building2 },
  { value: "other", label: "Other", icon: Plus },
];

const LeadForm = ({
  title = "Request Your Free Security Analysis",
  subtitle = "Fill out the form below and a security specialist will contact you within 24 hours.",
  showServiceType = true,
}: LeadFormProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "TX",
    zip: "",
    serviceType: "",
    propertyType: "",
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

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
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

  return (
    <div className="glass-card-static p-6 sm:p-8">
      {/* Header */}
      <div className="mb-6">
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

      <form onSubmit={handleSubmit} className="space-y-5">
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