const express = require('express')
const app = express()
const passport = require('passport')
const dotenv = require('dotenv')
dotenv.config();
const session = require('express-session')
const path = require('path')
const bodyParser = require('body-parser')
const flash=require('express-flash')
const cookieParser = require('cookie-parser')
const user_profile_seller = require('./Models/user_profile_seller_models.js')

const cors=require('cors')

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
app.use(flash());


app.use(cors({
    origin: 'http://localhost:8080/',
    credentials: true
}))

var router = require('./Controllers/contact_controller.js')
const signup = require('./Controllers/signup_controller.js')
const login = require('./Controllers/login_controller.js')
// const { verifyToken, restricted } = require('./Controllers/middleware/auth.js')
const userProfileSeller = require('./Controllers/user_profile_seller.js')
const logout = require('./Controllers/logout.js')
const forgetPassword = require('./Controllers/forgetPassword.js')
const profileView=require('./Controllers/profileView.js')
const empHistory=require('./Controllers/employmentHistory.js')
const empEducationHistory=require('./Controllers/userEducationHistory.js')
const CertificateHistory=require("./Controllers/Certification.js")
const overviewProfile=require('./Controllers/talen_overview.js')
const skillTest=require('./Controllers/skill_test.js')
const hireTalent=require('./Controllers/hire_talent.js')
/////////roles///////////// 
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
        img: "images/business-analysis-01.png",
        width: 34,


    },
    {
        btnname: 'Frontend',
        img: "https://letsremotify.com/wp-content/uploads/2023/05/front-end.svg",
    }, {
        btnname: 'DevOps',
        img: "https://letsremotify.com/wp-content/uploads/2023/05/devops.svg",
    },
];
var trajectory = [
    {
        btnname: 'Software Engineer',
        img: "images/Senior Engineer.png",
        width: 38,
    },
    {
        btnname: 'Senior Architect',
        img: "images/Software Architect-01.png",
        width: 38,
    },
    {
        btnname: 'Senior Engineer',
        img: "images/Senior Engineer.png",
        width: 38,
    },
    {
        btnname: 'Marketer',
        img: "images/Marketer-01.png",
        width: 38,
    },
    {
        btnname: 'Software Developer',
        img: "/images/Software Developer.png",
        width: 38,
    },
    {
        btnname: 'Project Manager ',
        img: "/images/Project Manager-01.png",
        width: 38,
    },
    {
        btnname: 'Software Architect',
        img: "/images/Software Architect-01.png",
        width: 38,

    },
    {
        btnname: 'Tech Lead Manager',
        img: "/images/Tech-Lead-Manager-01.png",
        width: 38,

    }

]


app.get('/', async  (req, res) =>{

    try {
        const allUserProfiles = await user_profile_seller.findAll();
      
        // Render your EJS template and pass the 'profiles' data
        res.render('index.ejs', {
            technologies: technologies,
            skills: skills,
            trajectory: trajectory,
            profiles: allUserProfiles,
       
        });

    } catch (error) {
        console.error(error);
        res.render('505pg.ejs')
    }
});
//////skills

app.use('/', router);
app.use('/', signup)
app.use('/', login)
app.use('/', logout)
app.use('/', forgetPassword)
app.use('/', userProfileSeller)
app.use('/', profileView)
app.use('/talent/profile', empHistory)
app.use('/talent/profile', empEducationHistory)
app.use('/talent/profile', CertificateHistory)
app.use('/', overviewProfile)
app.use('/', skillTest)
app.use('/client',hireTalent)

// app.get('*', function(req, res, next){
// 	if(req.cookies['token'] == null){
// 		res.redirect('/');
// 	}else{
// 		next();
// 	}
// });


app.get('/verify', (req, res) => {
    res.render('verify-page.ejs')
})


app.get('/pricing', (req, res) => {
    res.render('pricing.ejs', {
        technologies: technologies,
        skills: skills,
        trajectory: trajectory
    })
})
// ZAHEER DONT REMOVE THE SLUGS THEY ARE FOR TEMPORARY USAGE
app.get('/testing', (req, res) => {
    res.render('testing.ejs')
})
app.get('/event', (req, res) => {
    res.render('event.ejs')
})
app.get('/career', (req, res) => {
    res.render('career.ejs')
})
app.get('/apply-as', (req, res) => {
    res.render('apply-as-talent.ejs')
})
app.get('/news', (req, res) => {
    res.render('newsletter.ejs')
})
app.get('/internship', (req, res) => {
    res.render('internship.ejs')
})



app.get('/overview',(req, res)=>{
    res.render('skill-test.ejs')
})



// -------------------------------------
app.get('/software_engineer', (req, res) => {
    res.render('hire_software_engineer.ejs',{
        technologies: technologies,
        skills: skills,
        trajectory: trajectory
    })
})
app.get('/hire-designer', (req, res) => {
    res.render('hire_a_designer.ejs',{
        technologies: technologies,
        skills: skills,
        trajectory: trajectory
    })
})
app.get('/hire-project-manager', (req, res) => {
    res.render('hire_a_project_manager.ejs',{
        technologies: technologies,
        skills: skills,
        trajectory: trajectory
    })
})
app.get('/hire_talents', (req, res) => {
    res.render('hire_talents.ejs')
})

app.get('/client/step_one', (req, res) => {
    res.render('step_one.ejs')
})
app.get('/step_two', (req, res) => {
    res.render('step_two.ejs')
})
app.get('/step_two-p2', (req, res) => {
    res.render('step_two_part2.ejs')
})
app.get('/meeting', (req, res) => {
    res.render('meeting_schedule.ejs')
})
app.get('/about', (req, res) => {
    res.render('About.ejs')
})
app.get('/jobs', (req, res) => {
    res.render('Jobs.ejs')
})

app.get('/blogs', function (req, res) {
    res.render('Blog-test.ejs')
})


app.get('/404',(req, res)=>{
    res.render('404pg.ejs')
})

app.get('/505',(req, res)=>{
    res.render('505pg.ejs')
})
app.get('/under', (req, res)=>{
    res.render('underReview.ejs')
})


app.listen(process.env.PORT, (req, res) => {
    console.log(`Listening to localhost ${process.env.PORT}`);
})
// mongoose.connect(process.env.MONGODB_URI).then(() => {
    
// }).catch((err) => {
//     console.log(err);
// })
