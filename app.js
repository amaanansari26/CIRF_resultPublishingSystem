const express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  session = require('express-session'),
  User=require('./models/user'),
MongoDBStore = require('connect-mongodb-session')(session);
flash = require('connect-flash'),
  multer = require('multer'),
  fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      if(file.mimetype !== 'text/csv'){
        return cb(null, 'images');
      }
      cb(null, 'csv');
    },
    filename: (req, file, cb) => {
      cb(null, new Date().toISOString() + '-' + file.originalname);
    }
  }),
  fileFilter = (req, file, cb) => {
    if (file.mimetype === 'text/csv'||file.mimetype === 'image/png' ||file.mimetype === 'image/jpg' ||file.mimetype === 'image/jpeg') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
const facultiesRoutes = require('./routes/faculties'),
  studentRoutes = require('./routes/students'),
  subjectRoutes=require('./routes/subjects'),
  rootRoutes = require('./routes/root'),
  hodRoutes = require('./routes/hod'),
  MONGODB_URI = 'mongodb+srv://amaan:pass@result.xfszh.mongodb.net/CIRFrps?retryWrites=true&w=majority',
  app = express(),
  
  store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
  });

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images',express.static(path.join(__dirname, 'images')));
app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);
app.use(flash());
app.use(
  multer({
    storage: fileStorage,
    fileFilter: fileFilter
  }).fields([{ name: 'csv', maxCount: 1 }, { name: 'image', maxCount: 1}])
);


//routes

app.use((req,res,next)=>{
  if(req.session.user){
    User.findById(req.session.user._id).then(user=>{
      req.user=user
      return next()
    }).catch(err=>{console.log(err)})
    
  }else{next()}
  
})
app.use('/', rootRoutes);
app.use('/hod', hodRoutes);
app.use('/faculties', facultiesRoutes);
app.use('/students', studentRoutes);
app.use('/subjects', subjectRoutes);

////

mongoose.connect(MONGODB_URI)
  .then(result => {
    app.listen(80, () => {
      console.log('80isUP!')
    });
  })
  .catch(err => {
    console.log(err);
  });