const express = require('express');
const router = express.Router();
const PDFDocument = require('pdfkit');
const Performance = require('../models/Performance');

router.get('/student/:id', async (req, res) => {
  const studentData = await Performance.find({ studentId: req.params.id });
  const doc = new PDFDocument();
  res.setHeader('Content-Type', 'application/pdf');
  doc.pipe(res);
  doc.fontSize(16).text('Report Card', { align: 'center' });
  studentData.forEach((item) => {
    doc.moveDown().text(`${item.subject}: ${item.marks}`);
  });
  doc.end();
});

module.exports = router;