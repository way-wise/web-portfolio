import mongoose from 'mongoose';

/**
 * Portfolio item schema for storing project information
 */
const portfolioSchema = new mongoose.Schema({
  id: {
    type: String,
    required: false,
    unique: true,
    trim: true,
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters'],
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true,
    enum: {
      values: ['wordpress', 'shopify', 'wix', 'webflow', 'backend', 'mobile', 'frontend', 'nocode', 'api', 'email-templates'],
      message: 'Category must be one of: wordpress, shopify, wix, webflow, backend, mobile, frontend, nocode, api, email-templates'
    }
  },
  highlightKeyword: {
    type: String,
    required: false,
    trim: true,
    maxlength: [100, 'Highlight keyword cannot exceed 100 characters'],
  },
  image: {
    type: String,
    required: [true, 'Image URL is required'],
    trim: true,
    validate: {
      validator: function(v: string) {
        return v.startsWith('/') || v.startsWith('http');
      },
      message: 'Image must be a valid URL or path'
    }
  },
  technologies: [{
    type: String,
    trim: true,
    maxlength: [50, 'Technology name cannot exceed 50 characters'],
  }],
  demoUrl: {
    type: String,
    required: false,
    trim: true,
    validate: {
      validator: function(v: string) {
        if (!v || v.trim() === '') return true; // Allow empty strings
        return v.startsWith('http://') || v.startsWith('https://');
      },
      message: 'Demo URL must be a valid HTTP/HTTPS URL or empty'
    }
  },
  githubUrl: {
    type: String,
    required: false,
    trim: true,
    validate: {
      validator: function(v: string) {
        if (!v || v.trim() === '') return true; // Allow empty strings
        return v.startsWith('http://') || v.startsWith('https://');
      },
      message: 'GitHub URL must be a valid HTTP/HTTPS URL or empty'
    }
  },
  completionDate: {
    type: String,
    required: false,
    trim: true,
    maxlength: [50, 'Completion date cannot exceed 50 characters'],
  },
  longDescription: {
    type: String,
    required: false,
    trim: true,
    maxlength: [2000, 'Long description cannot exceed 2000 characters'],
  },
  features: [{
    type: String,
    trim: true,
    maxlength: [200, 'Feature description cannot exceed 200 characters'],
  }],
  process: {
    type: String,
    required: false,
    trim: true,
    maxlength: [1000, 'Process description cannot exceed 1000 characters'],
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

/**
 * Pre-save middleware to generate unique ID if not provided
 */
portfolioSchema.pre('save', function(next) {
  if (!this.id) {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    this.id = `${this.category}-${timestamp}-${random}`;
  }
  next();
});

/**
 * Index for better query performance
 */
portfolioSchema.index({ category: 1, createdAt: -1 });

export default mongoose.models.Portfolio || mongoose.model('Portfolio', portfolioSchema); 