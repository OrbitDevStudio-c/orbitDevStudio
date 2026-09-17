const multer = require('multer');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Allowed file extensions
const fileFilter = (req, file, cb) => {
  const allowedExtensions = ['.pdf', '.doc', '.docx'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Only .pdf, .doc, and .docx formats are allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
  fileFilter: fileFilter
}).single('resume');

// Middleware to handle upload
exports.uploadResume = (req, res, next) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ success: false, message: `Multer Error: ${err.message}` });
    } else if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    next();
  });
};

exports.submitApplication = async (req, res) => {
  const { name, email, phone, currentPosition, ctc, experience, portfolio, coverLetter, positionApplied } = req.body;
  const resume = req.file;

  if (!name || !email || !phone || !experience || !resume) {
    if (resume && fs.existsSync(resume.path)) fs.unlinkSync(resume.path);
    return res.status(400).json({ success: false, message: 'Please provide all required fields.' });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT || 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: 'orbitdevstudios@gmail.com',
      subject: `New Job Application: ${positionApplied} - ${name}`,
      text: `You have received a new application for the ${positionApplied} position.

--- Applicant Details ---
Name: ${name}
Email: ${email}
Phone: ${phone}
Current Position: ${currentPosition || 'N/A'}
Current/Expected CTC: ${ctc || 'N/A'}
Experience: ${experience}
Portfolio/LinkedIn: ${portfolio || 'N/A'}

--- Cover Letter ---
${coverLetter || 'No cover letter provided.'}`,
      attachments: [
        {
          filename: resume.originalname,
          path: resume.path
        }
      ]
    };

    await transporter.sendMail(mailOptions);

    // Confirmation email to the applicant
    const confirmationMailOptions = {
      from: `"OrbitDevStudio Careers" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Application Received: ${positionApplied}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h2 style="color: #4F8CFF;">Application Received</h2>
          <p>Hi ${name},</p>
          <p>Thank you for applying for the <strong>${positionApplied}</strong> position at OrbitDevStudio.</p>
          <p>We have successfully received your application and resume. Our hiring team will review your profile to see if it matches our current requirements.</p>
          <p>If your qualifications meet our needs, we will be in touch shortly to schedule an interview.</p>
          <br/>
          <p>Best regards,</p>
          <p><strong>The OrbitDevStudio Team</strong></p>
        </div>
      `
    };

    await transporter.sendMail(confirmationMailOptions);

    // Clean up temporary file
    if (fs.existsSync(resume.path)) {
      fs.unlinkSync(resume.path);
    }

    return res.status(200).json({ success: true, message: 'Application submitted successfully.' });
  } catch (error) {
    console.error('Error sending email:', error);
    // Clean up temporary file on failure too
    if (resume && fs.existsSync(resume.path)) {
      fs.unlinkSync(resume.path);
    }
    return res.status(500).json({ success: false, message: 'Failed to submit application. Please try again later.' });
  }
};
