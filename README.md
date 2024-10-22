# DataManager

**DataManager** is a simple web application that enables users to upload Excel files, store the data in a database, and manage it through a user-friendly interface. Users can easily view, edit, update, and delete the data directly from the frontend.

## Features

- **Excel Upload**: Upload Excel files to store data in the database.
- **Data Management**: View, edit, update, and delete records from the uploaded data.
- **User-Friendly Interface**: Intuitive design for seamless data management.

## Technologies Used

- **Frontend**: ReactJS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **File Handling**: Multer (for handling Excel uploads)
- **Excel Parsing**: `xlsx` package (to parse Excel data)

## Installation

Follow these steps to set up the application locally:

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/DataManager.git
cd DataManager
``` 

### 2. Install Dependencies

backend:npm i
frontEnd:cd frontEnd --> npm i


### 3. Set Up Environment Variables

```bash
MONGO_URI=your_mongodb_uri
PORT=3000

```

### 4. Run the Application

backend:npm run dev (dev env)
frontEnd:cd frontEnd --> npm run dev (dev env)

## API Endpoints

### Excel Data Management
router.post("/upload", upload.single("file"), uploadSheet);
router.get("/", getProducts);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
- **Fetch Data**: `GET /api/v1/sheet/`
- **Upload Sheet**: `POST /api/v1/sheet/upload`
- **Edit Data**: `PUT /api/v1/sheet/:id`
- **Delete Data**: `DELETE /api/v1/sheet/:id`
  
## Usage
3. **Upload sheet**: 
   - upload excel sheet that include data.
5. **Edit Data**: Edit the Data from the Excel.
6. **Delete Data**: Delete the Data from the Excel.

## Contact

For any inquiries or support, feel free to reach out via email:

**Email**: [afnadca2@gmail.com](mailto:afnadca2@gmail.com)
