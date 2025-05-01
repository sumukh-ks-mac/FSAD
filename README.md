# **School Vaccination Portal**

A web-based application for school coordinators to manage and monitor upcoming vaccination drives. Coordinators can create, view, and update vaccination events, while restricting edits on past drives.

---

## **Features**

* Add vaccination drives with vaccine name, date, and available doses.  
* View upcoming drives on dashboard (only next 30 days).  
* View all drives on Drives page.  
* Edit drives (only if not completed).  
* Persistent data storage using MongoDB.

---

## **Tech Stack**

| Layer | Technology |
| ----- | ----- |
| Frontend | React.js |
| Backend | Node.js \+ Express |
| Database | MongoDB |
| API Client | Axios |
| Styling | CSS (inline/basic) |

---

## 

## 

## 

## 

## **Folder Structure**

pgsql  
`vaccination-portal/`  
`│`  
`├── backend/`  
`│   ├── models/`  
`│   │   └── Drive.js`  
`│   ├── routes/`  
`│   │   └── driveRoutes.js`  
`│   └── server.js`  
`│`  
`├── frontend/`  
`│   ├── src/`  
`│   │   ├── components/`  
`│   │   │   ├── Dashboard.jsx`  
`│   │   │   └── Drives.jsx`  
`│   │   ├── App.js`  
`│   │   ├── index.js`  
`│   │   └── services/`  
`│   │       └── axios.js`

---

## **API Endpoints**

Base URL: `http://localhost:5000/api`

| Method | Endpoint | Description |
| ----- | ----- | ----- |
| GET | `/drives` | Fetch all vaccination drives |
| GET | `/drives/upcoming` | Fetch upcoming drives (next 30 days) |
| POST | `/drives` | Add a new drive |
| PUT | `/drives/:id` | Edit an existing drive |

---

## 

## **MongoDB Model**

`{`  
  `vaccineName: String,`  
  `driveDate: Date,`  
  `availableDoses: Number`  
`}`

---

## **Running the Application Locally**

### **1\. Clone the repository**

`git clone https://github.com/yourusername/vaccination-portal.git`  
`cd vaccination-portal`

### **2\. Start MongoDB**

Install MongoDB (if not already installed):

`brew tap mongodb/brew`  
`brew install mongodb-community`  
`brew services start mongodb/brew/mongodb-community`

### **3\. Run Backend**

`cd backend`  
`npm install`  
`npm start`

### 

### 

### **4\. Run Frontend**

`cd frontend`  
`npm install`  
`npm start`

Frontend will run on `http://localhost:3000`  
Backend will run on `http://localhost:5000`

---

### 

### **5\. Demo Video Link**

https://drive.google.com/drive/folders/194eG7pYJuwm5pRyvq25ZxiXHIUS42Ap6?usp=share_link



