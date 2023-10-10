const express = require('express')
const app = express()
const mongoose=require('mongoose')
const passport = require('passport')
const dotenv = require('dotenv')
dotenv.config();
const session = require('express-session')
const path =require('path')
const bodyParser = require('body-parser')
const flash=require('connect-flash')
const cookieParser = require('cookie-parser')


app.set("view engine", "ejs")
app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'views'));
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
    secret: "thisismysecretekey",
    resave: true,
    saveUninitialized: true,
    
}))

app.use(express.urlencoded({extended : true}));
app.use(bodyParser.json());

app.use(flash());
app.use(function (req, res, next) {
    res.locals.success = req.flash('success');
    res.locals.info = req.flash('info');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
  });

var router=require('./Controllers/contact_controller.js')
const signup=require('./Controllers/signup_controller.js')
const login=require('./Controllers/login_controller.js')
const {verifyToken, restricted} = require('./Controllers/middleware/auth.js')
const userProfileSeller=require('./Controllers/user_profile_seller.js')
const logout=require('./Controllers/logout.js')
const resetPassword=require('./Controllers/forgetPassword.js')

/////////roles/////////////
app.get('/', function (req, res) {
    var skills = [
        {
            btnname: 'ASP.NET',
            img: "https://letsremotify.com/wp-content/uploads/2023/05/net.svg",

           
        },
        {
            btnname: 'Node / React',
            img: "https://letsremotify.com/wp-content/uploads/2023/05/react-js.svg",
        },
        {
            btnname: 'Laravel',
            img: "https://letsremotify.com/wp-content/uploads/2023/05/laravel.svg",
        },
        {
            btnname: 'MY SQL',
            img: "https://letsremotify.com/wp-content/uploads/2023/05/sql.svg",
        },
        {
            btnname: 'Java',
            img: "https://letsremotify.com/wp-content/uploads/2023/05/java.svg",
        },
        {
            btnname: 'iOS',
            img: "https://letsremotify.com/wp-content/uploads/2023/05/ios.svg",
        },
        {
            btnname: 'React Native',
            img: "https://letsremotify.com/wp-content/uploads/2023/05/react-native.svg",
        },
        {
            btnname: 'React.js',
            img: "https://letsremotify.com/wp-content/uploads/2023/05/react-native.svg",
        },
        {
            btnname: 'Node.js',
            img: "https://letsremotify.com/wp-content/uploads/2023/05/react-js.svg",
        },
        {
            btnname: 'Angular / Node',
            img: "https://letsremotify.com/wp-content/uploads/2023/05/angular.svg",
        },
        {
            btnname: 'PHP',
            img: "https://letsremotify.com/wp-content/uploads/2023/05/php.svg",
        }, {
            btnname: 'Python / React',
            img: "https://letsremotify.com/wp-content/uploads/2023/05/react-native.svg",
        },
        {
            btnname: 'Ruby on Rails',
            img: "https://letsremotify.com/wp-content/uploads/2023/05/ruby.svg",
        },
        {
            btnname: 'AI / ML',
            img: "https://letsremotify.com/wp-content/uploads/2023/05/ai-ml.svg",
        },
        {
            btnname: 'Android',
            img: "https://letsremotify.com/wp-content/uploads/2023/05/android.svg",
        },
        {
            btnname: 'AWS',
            img: "https://letsremotify.com/wp-content/uploads/2023/05/aws.svg",
        },

        {
            btnname: 'JavaScript',
            img: "https://letsremotify.com/wp-content/uploads/2023/05/javascriptt.svg",
        },
        {
            btnname: 'TypeScript',
            img: "https://letsremotify.com/wp-content/uploads/2023/05/typescript.svg",
        },
        {
            btnname: 'Postgre SQL',
            img: "https://letsremotify.com/wp-content/uploads/2023/05/postgre.svg",
        },
        {
            btnname: 'Python',
            img: "https://letsremotify.com/wp-content/uploads/2023/05/python.svg",
        },
    ];
    var technologies = [
        {
            btnname: 'Full-Stack',
            img: "https://letsremotify.com/wp-content/uploads/2023/05/full-stack.svg",
        },
        {
            btnname: 'Data Scientist',
            img: "https://letsremotify.com/wp-content/uploads/2023/05/data.svg",
        },
        {
            btnname: 'Mobile',
            img: "https://letsremotify.com/wp-content/uploads/2023/05/react.svg",
        },
        {
            btnname: 'ML Scientist',
            img: "https://letsremotify.com/wp-content/uploads/2023/05/ml-cv.svg",
        },
        {
            btnname: 'Golang Developer',
            img: "https://letsremotify.com/wp-content/uploads/2023/05/golang.svg",
        },
        {
            btnname: 'NLP',
            img: "https://letsremotify.com/wp-content/uploads/2023/05/nlp.svg",
        },
        {
            btnname: 'HTML',
            img: "https://letsremotify.com/wp-content/uploads/2023/05/html.svg",
        },
        {
            btnname: 'Backend',
            img: "https://letsremotify.com/wp-content/uploads/2023/05/backend.svg",
        },
        {
            btnname: 'Data Engineer',
            img: "https://letsremotify.com/wp-content/uploads/2023/05/hadoop.svg",
        },
        {
            btnname: 'Business Analyst',
            img: "https://letsremotify.com/wp-content/uploads/2023/05/js.svg",
            width:28,
           
           
        },
        {
            btnname: 'Frontend',
            img: "https://letsremotify.com/wp-content/uploads/2023/05/front-end.svg",
        }, {
            btnname: 'DevOps',
            img: "https://letsremotify.com/wp-content/uploads/2023/05/devops.svg",
        },
    ];
  var trajectory=[
    {
        btnname: 'Software Engineer',
        img: "https://letsremotify.com/wp-content/uploads/2023/05/js.svg",
        width:28,
    },
    {
        btnname: 'Senior Architect',
        img: "https://letsremotify.com/wp-content/uploads/2023/05/js.svg",
        width:28,
    },
    {
        btnname: 'Senior Engineer',
        img: "https://letsremotify.com/wp-content/uploads/2023/05/js.svg",
        width:28
    },
    {
        btnname: 'Marketer',
        img: "https://letsremotify.com/wp-content/uploads/2023/05/js.svg",
        width:28
    },
    {
        btnname: 'Software Developer',
        img: "/images/Software Developer.png",
        width:28
    },
    {
        btnname: 'Project Manager ',
        img: "https://letsremotify.com/wp-content/uploads/2023/05/js.svg",
        width:28
    },
    {
        btnname: 'Software Architect',
        img: "https://letsremotify.com/wp-content/uploads/2023/05/js.svg",
        width:28,
      
    },
    {
        btnname: 'Tech Lead Manager',
        img: "/images/Tech-Lead-Manager-01.png",
        width:28,
       
    }

  ]
    res.render('index.ejs', {
        technologies: technologies,
        skills:skills,
        trajectory:trajectory
    });
});
//////skills

app.use('/', router);
app.use('/', signup)
app.use('/', login)
app.use('/', logout)
app.use('/', resetPassword)
app.use('/', userProfileSeller)

app.get('/', (req, res) => {
    res.render('index.ejs')
})
app.get('/blogs', (req, res)=>{
    res.render('blog.ejs')
})



app.get('/hire_talents' ,verifyToken ,(req, res) => {
    res.render('hire_talents.ejs')
})
app.get('/about',(req, res)=>{
    res.render('About.ejs')
})
app.get('/jobs',(req, res)=>{
    res.render('Jobs.ejs')
})

app.get('/seller/dashboard',(req, res)=>{
    res.render('userDashboard.ejs')
})


mongoose.connect(process.env.MONGODB_URI).then(() => {
    app.listen(process.env.PORT, (req, res) => {
        console.log(`Database is connected! Listening to localhost ${process.env.PORT}`);
    })
}).catch((err) => {
    console.log(err);
})