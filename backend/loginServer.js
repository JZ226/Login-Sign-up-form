const  express = require('express');
const  sql = require('mysql2/promise');
const  cors = require('cors');
const bcrypt = require("bcryptjs");
const multer = require("multer")


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

const storage = multer.diskStorage({
            destination: function (req,file,cb){
                return cb(null,"./upload")
            },    // The specific folder in which you store a file    "cb is callBack"


            filename : function(req,file,cb){
              return  cb(null, `${Date.now()}-${file.originalname}`);
            }  //   Here you write at which name you want to store a file
});
   const upload = multer({ storage })


const db = sql.createPool({
  host: 'localhost',    
  user:'root',
  password: '',   
  database: 'JZ_signup'
})

app.post('/signup',async (req, res)=>{
   try{
    const mysql = "INSERT INTO Jz_login (username, password, email , Profile_pic) VALUES (?, ?, ?, ?)";
    // Hash Password
    const Hash_pass = await bcrypt.hash(req.body.password, 10);
    const values = [req.body.username, Hash_pass,req.body.email];
      await db.query(mysql, values );
      res.status(200).json({message:'Data inserted successfully'});
   }
   catch(err){
        console.log(err);
    res.status(500).json({ message: 'Error inserting data' });
   }
});

app.post('/',async (req, res) => {
    try{
         const { username, password } = req.body;
   const [rows] = await db.query("Select * From Jz_login where username = ?",[username])
        if (rows.length===0) {
            res.status(401).json({message:'Error Wrong data'});
        } 
    const securePassword = rows[0];
        const hashedPassword = securePassword.password;
        console.log(hashedPassword);
        const PasswordValid = await bcrypt.compare(password, hashedPassword);
        if (!PasswordValid) {
            return res.status(401).json({message:'Wrong Password'});
        }
        else{
        return res.status(200).json({message:'Login Successful' , user: rows[0] });
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json({message:'Error fetching data'});
    }
});


app.post('/upload', upload.single('image'), (req, res) => {
          console.log(req.file)
          res.send('File Upload successfully!!')
    })


app.listen(3000, () =>{
    console.log('Server is Runing in port 3000')
})