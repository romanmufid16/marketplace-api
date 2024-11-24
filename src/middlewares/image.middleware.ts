import multer from "multer";
import path from "path";
import fs from "fs";

// Pastikan folder 'public/img' ada, jika tidak buat
const uploadDir = path.join(__dirname, '../public/img');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);  // Menyimpan gambar di folder public/img
  },
  filename: (req, file, cb) => {
    // Menambahkan timestamp pada nama file agar tidak terjadi duplikasi
    cb(null, Date.now() + path.extname(file.originalname));  // Menyimpan dengan nama unik
  }
});

export const upload = multer({ storage: storage });
