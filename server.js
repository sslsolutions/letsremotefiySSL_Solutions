const express = require('express')
const app = express()
const mongoose=require('mongoose')
const passport = require('passport')
const dotenv = require('dotenv')
dotenv.config();
const session = require('express-session')
const ejs = require('ejs')
const bodyParser = require('body-parser')

app.set("view engine", "ejs")
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
    secret: "thisismysecretekey",
    resave: true,
    saveUninitialized: true
}))

app.use(express.urlencoded({extended : true}));
app.use(bodyParser.json());

var router=require('./Controllers/contact_controller.js')
const signup=require('./Controllers/signup_controller.js')

/////////roles/////////////
// app.get('/', function (req, res) {
//     var skills = [
//         {
//             btnname: 'ASP.NET',
//             img: "https://letsremotify.com/wp-content/uploads/2023/05/net.svg",
//         },
//         {
//             btnname: 'Node / React',
//             img: "https://letsremotify.com/wp-content/uploads/2023/05/react-js.svg",
//         },
//         {
//             btnname: 'Laravel',
//             img: "https://letsremotify.com/wp-content/uploads/2023/05/laravel.svg",
//         },
//         {
//             btnname: 'MY SQL',
//             img: "https://letsremotify.com/wp-content/uploads/2023/05/sql.svg",
//         },
//         {
//             btnname: 'Java',
//             img: "https://letsremotify.com/wp-content/uploads/2023/05/java.svg",
//         },
//         {
//             btnname: 'iOS',
//             img: "https://letsremotify.com/wp-content/uploads/2023/05/ios.svg",
//         },
//         {
//             btnname: 'React Native',
//             img: "https://letsremotify.com/wp-content/uploads/2023/05/react-native.svg",
//         },
//         {
//             btnname: 'React.js',
//             img: "https://letsremotify.com/wp-content/uploads/2023/05/react-native.svg",
//         },
//         {
//             btnname: 'Node.js',
//             img: "https://letsremotify.com/wp-content/uploads/2023/05/react-js.svg",
//         },
//         {
//             btnname: 'Angular / Node',
//             img: "https://letsremotify.com/wp-content/uploads/2023/05/angular.svg",
//         },
//         {
//             btnname: 'PHP',
//             img: "https://letsremotify.com/wp-content/uploads/2023/05/php.svg",
//         }, {
//             btnname: 'Python / React',
//             img: "https://letsremotify.com/wp-content/uploads/2023/05/react-native.svg",
//         },
//         {
//             btnname: 'Ruby on Rails',
//             img: "https://letsremotify.com/wp-content/uploads/2023/05/ruby.svg",
//         },
//         {
//             btnname: 'AI / ML',
//             img: "https://letsremotify.com/wp-content/uploads/2023/05/ai-ml.svg",
//         },
//         {
//             btnname: 'Android',
//             img: "https://letsremotify.com/wp-content/uploads/2023/05/android.svg",
//         },
//         {
//             btnname: 'AWS',
//             img: "https://letsremotify.com/wp-content/uploads/2023/05/aws.svg",
//         },

//         {
//             btnname: 'JavaScript',
//             img: "https://letsremotify.com/wp-content/uploads/2023/05/javascriptt.svg",
//         },
//         {
//             btnname: 'TypeScript',
//             img: "https://letsremotify.com/wp-content/uploads/2023/05/typescript.svg",
//         },
//         {
//             btnname: 'Postgre SQL',
//             img: "https://letsremotify.com/wp-content/uploads/2023/05/postgre.svg",
//         },
//         {
//             btnname: 'Python',
//             img: "https://letsremotify.com/wp-content/uploads/2023/05/python.svg",
//         },
//     ];
//     var technologies = [
//         {
//             btnname: 'Full-Stack',
//             img: "https://letsremotify.com/wp-content/uploads/2023/05/full-stack.svg",
//         },
//         {
//             btnname: 'Data Scientist',
//             img: "https://letsremotify.com/wp-content/uploads/2023/05/data.svg",
//         },
//         {
//             btnname: 'Mobile',
//             img: "https://letsremotify.com/wp-content/uploads/2023/05/react.svg",
//         },
//         {
//             btnname: 'ML Scientist',
//             img: "https://letsremotify.com/wp-content/uploads/2023/05/ml-cv.svg",
//         },
//         {
//             btnname: 'Golang Developer',
//             img: "https://letsremotify.com/wp-content/uploads/2023/05/golang.svg",
//         },
//         {
//             btnname: 'NLP',
//             img: "https://letsremotify.com/wp-content/uploads/2023/05/nlp.svg",
//         },
//         {
//             btnname: 'HTML',
//             img: "https://letsremotify.com/wp-content/uploads/2023/05/html.svg",
//         },
//         {
//             btnname: 'Backend',
//             img: "https://letsremotify.com/wp-content/uploads/2023/05/backend.svg",
//         },
//         {
//             btnname: 'Data Engineer',
//             img: "https://letsremotify.com/wp-content/uploads/2023/05/hadoop.svg",
//         },
//         {
//             btnname: 'Business Analyst',
//             img: "https://letsremotify.com/wp-content/uploads/2023/05/js.svg",
//             width:28,
           
           
//         },
//         {
//             btnname: 'Frontend',
//             img: "https://letsremotify.com/wp-content/uploads/2023/05/front-end.svg",
//         }, {
//             btnname: 'DevOps',
//             img: "https://letsremotify.com/wp-content/uploads/2023/05/devops.svg",
//         },
//     ];
//   var trajectory=[
//     {
//         btnname: 'Software Engineer',
//         img: "https://letsremotify.com/wp-content/uploads/2023/05/js.svg",
//         width:28,
//     },
//     {
//         btnname: 'Senior Architect',
//         img: "https://letsremotify.com/wp-content/uploads/2023/05/js.svg",
//         width:28,
//     },
//     {
//         btnname: 'Senior Engineer',
//         img: "https://letsremotify.com/wp-content/uploads/2023/05/js.svg",
//         width:28
//     },
//     {
//         btnname: 'Marketer',
//         img: "https://letsremotify.com/wp-content/uploads/2023/05/js.svg",
//         width:28
//     },
//     {
//         btnname: 'Software Developer',
//         img: "https://letsremotify.com/wp-content/uploads/2023/05/js.svg",
//         width:28
//     },
//     {
//         btnname: 'Project Manager ',
//         img: "https://letsremotify.com/wp-content/uploads/2023/05/js.svg",
//         width:28
//     },
//     {
//         btnname: 'Software Architect',
//         img: "https://letsremotify.com/wp-content/uploads/2023/05/js.svg",
//         width:28,
      
//     },
//     {
//         btnname: 'Tech Lead Manager',
//         img: "https://letsremotify.com/wp-content/uploads/2023/05/js.svg",
//         width:28,
       
//     }

//   ]

//     res.render('index.ejs', {
//         technologies: technologies,
//         skills:skills,
//         trajectory:trajectory
//     });
// });
////////skills

app.use('/', router);
app.use('/', signup)

app.get('/', (req, res) => {
    res.render('index.ejs')
})
app.get('/about',(req, res)=>{
    res.render('about.ejs')
})
app.get('/login',(req, res)=>{
    res.render('login.ejs')
})
app.get('/signup',(req, res)=>{
    res.render('signup.ejs')
})


app.get('/contact-us',(req, res)=>{
    res.render('contact-us.ejs')
})

app.get('/jobs',(req, res)=>{
    res.render('jobs.ejs')
})

mongoose.connect(process.env.MONGODB_URI).then(() => {
    app.listen(process.env.PORT, (req, res) => {
        console.log(`Database is connected! Listening to localhost ${process.env.PORT}`);
    })
}).catch((err) => {
    console.log(err);
})