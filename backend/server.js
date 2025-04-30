const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const studentRoutes = require('./routes/studentRoutes');
const driveRoutes = require('./routes/driveRoutes');

const app = express();

// ✅ Proper CORS setup
app.use(cors({
  origin: 'http://localhost:3000',  // Allow requests from this origin (your React app)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed HTTP methods
  credentials: true,  // If you need to send cookies or authorization headers
}));

app.use(express.json());

// ✅ Routes
app.use('/api/students', studentRoutes);
app.use('/api/drives', driveRoutes);

// ✅ Optional: test endpoint
app.get('/api/ping', (req, res) => {
  res.json({ message: 'Server is up and running' });
});

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected');
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});





// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config();

// // const Student = require('./models/Student');
// // const Drive = require('./models/Drive');
// const studentRoutes = require('./routes/studentRoutes');
// // const studentRoutes = require('./routes/studentRoutes');
// const driveRoutes = require('./routes/driveRoutes');

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use('/api/students', studentRoutes);
// app.use('/api/drives', driveRoutes);

// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => {
//   console.log('MongoDB connected');

//   // ➡️ ONLY AFTER MONGO CONNECTS, INSERT SAMPLE DATA
//   // insertSampleData();

//   const PORT = process.env.PORT || 5000;
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });
// })
// .catch((err) => {
//   console.error('MongoDB connection error:', err);
// });


// // Insert Sample Data
// // const insertSampleData = async () => {
// //   await Student.deleteMany();
// //   await Drive.deleteMany();

// //   await Student.insertMany([
// //     { name: 'Alice', className: 'Grade 5', studentId: 'S001', isVaccinated: true },
// //     { name: 'Bob', className: 'Grade 6', studentId: 'S002', isVaccinated: false },
// //     { name: 'Charlie', className: 'Grade 7', studentId: 'S003', isVaccinated: true }
// //   ]);

// //   await Drive.insertMany([
// //     { vaccineName: 'MMR', driveDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), availableDoses: 100, applicableClasses: ['Grade 5', 'Grade 6'] },
// //     { vaccineName: 'Polio', driveDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000), availableDoses: 80, applicableClasses: ['Grade 1', 'Grade 2'] }
// //   ]);

// //   console.log('Sample Data Inserted');
// // };

// // // Call only once (or conditionally)
// // insertSampleData();
