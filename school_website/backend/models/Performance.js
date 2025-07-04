const PerformanceSchema = new mongoose.Schema({
    studentId: mongoose.Schema.Types.ObjectId,
    class: String,
    subject: String,
    marks: Number
  });
  module.exports = mongoose.model('Performance', PerformanceSchema);