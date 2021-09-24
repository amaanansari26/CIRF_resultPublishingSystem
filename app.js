const express =require('express'),
    path=require('path'),
    bodyParser=require('body-parser'),
    mongoose =require('mongoose'),
    session=require('express-session')
    MongoDBStore=require('connect-mongodb-session')(session);
    flash=require('connect-flash'),
    multer=require('multer'),
    facultiesRoutes=require('./routes/faculties'),
    studentRoutes=require('./routes/students'),
    rootRoutes=require('./routes/root'),
    MONGODB_URI = 'mongodb+srv://amaan:pass@result.xfszh.mongodb.net/CIRFrps?retryWrites=true&w=majority',
    app=express(),
    store= new MongoDBStore({
        uri:MONGODB_URI,
        collection:'sessions'
    });

    app.set('view engine', 'ejs');
    app.set('views', 'views');
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(
        session({
          secret: 'my secret',
          resave: false,
          saveUninitialized: false,
          store: store
        })
      );
    app.use(flash());

//routes


app.use('/', rootRoutes);
app.use('/faculties',facultiesRoutes);
app.use('/students',studentRoutes);

////

mongoose.connect(MONGODB_URI)
  .then(result => {
    app.listen(80,()=>{console.log('80isUP!')});
  })
  .catch(err => {
    console.log(err);
  });
