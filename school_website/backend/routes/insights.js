const express = require('express');
const router = express.Router();
const Performance = require('../models/Performance');

router.get('/principal', async (req, res) => {
  const data = await Performance.aggregate([
    {
      $group: {
        _id: '$subject',
        average: { $avg: '$marks' },
        top: { $max: '$marks' },
        low: { $min: '$marks' },
      }
    }
  ]);
  res.json(data);
});

router.get('/teacher/:class/:subject', async (req, res) => {
  const { subject, class: className } = req.params;
  const data = await Performance.find({ subject, class: className });
  res.json(data);
});

router.get('/student/:id', async (req, res) => {
  const studentData = await Performance.find({ studentId: req.params.id });
  res.json(studentData);
});

module.exports = router;