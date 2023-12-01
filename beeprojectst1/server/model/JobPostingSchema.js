const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: String,
  image:String,
  description: String,
  Experience: String,
  applicationInstructions: String,
  companyName: String,
  location: String,
  salaryRange: String,
  employmentType: String,
  industry: String,
  companyDescription: String,
  contactEmail: String,
  contactPhone: String,
  applicationDeadline: String,
});

const Job = mongoose.model('Jobpost', jobSchema);


module.exports = Job;
