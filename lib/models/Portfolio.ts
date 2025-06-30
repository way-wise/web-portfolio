import mongoose from 'mongoose';

const portfolioSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  highlightKeyword: {
    type: String,
  },
  image: {
    type: String,
    required: true,
  },
  technologies: [{
    type: String,
  }],
  demoUrl: {
    type: String,
  },
  githubUrl: {
    type: String,
  },
  completionDate: {
    type: String,
  },
  longDescription: {
    type: String,
  },
  features: [{
    type: String,
  }],
  process: {
    type: String,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Portfolio || mongoose.model('Portfolio', portfolioSchema); 