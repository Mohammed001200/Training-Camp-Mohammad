const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();

// Multer setup (lokal lagring, byt till S3 i produktion)
const upload = multer({ dest: path.join(__dirname, '../../uploads/') });

router.post('/', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Ingen fil uppladdad.' });
  // Returnera filväg (eller ladda upp till S3 och returnera URL)
  res.json({ filePath: req.file.path, originalName: req.file.originalname });
});

module.exports = router;
