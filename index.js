import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt, { hash } from "bcrypt";
import session from "express-session";
import axios from "axios";
import dotenv from "dotenv";
import postgres from 'postgres'

const connectionString = process.env.DATABASE_URL
const sql = postgres(connectionString)





const port = process.env.PORT;
const saltRounds = 10;
const app = express();
dotenv.config();



const db = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
});

db.connect();

let posts = [];
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


const users = [];
let isAuthenticated = false;

function requireAuth(req, res, next) {
    if (isAuthenticated) {
     next()
    //  User is authenticated, continue
    } else {
      // Store the original URL they wanted to visit
      res.redirect('/or-admin/login');
    }
}


app.post("/subscribe", async (req, res) => {
    const  email = req.body.email;
    const url = `https://${process.env.MAILCHIMP_DC}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}/members`;    
  
    try {
      await axios.post(
        url,
        {
          email_address: email,
          status: "subscribed",
        },
        {
          auth: {
            username: "anystring", // Mailchimp requires any string as username
            password: `${process.env.MAILCHIMP_API_KEY}`,
          },
        }
      );
      res.redirect('back')
      console.log(res.status, { message: "Subscribed successfully!" });
    } catch (err) {
      console.log(res.status, { error: "Subscription failed", detail: err.message });
      res.redirect('back')
    }
  });


app.get('/or-admin/login', (req, res) => {
    // If already logged in, redirect to CMS
    res.render('login.ejs')
});

app.get("/or-admin/register", (req, res) => {
    res.render("register.ejs");
});
  
app.post("/or-admin/register", requireAuth, async (req, res) => {
    const username = req.body["username"];
    const password = req.body.password;
    const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
    const response = result.rows;

    if (response.length > 0) {
        res.render('register.ejs', {
            error: "User already exists"
        });
    } else {

        bcrypt.hash(password, saltRounds,  async (err, hash)=>{
           if (err) {
            console.log('Problem hashing', err);
           } else {
            const details = await db.query('INSERT INTO users (username, password) VALUES($1, $2)', [
                username,
                hash
            ])
           }
        })
        
        res.redirect('/or-admin/login')
    }
    
});


app.post('/or-admin/login', async (req, res) => {
    const username = req.body["username"];
    const loginPassword = req.body.password;
    const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
    const storedDBpassword = result.rows[0].password;

    if (result.rows.length > 0) {
        bcrypt.compare(loginPassword, storedDBpassword, (err, passwordCheck) =>{
            if (passwordCheck) {
                res.redirect('/or-admin')
                isAuthenticated = true;
            } else {
                res.render('login.ejs', {
                    error: "Incorrect password"
                })
            }
        });
    } else {
        res.render('login.ejs', {
            error: 'User not found'
        })
    }
    
  
});



app.get("/",  async (req, res)=>{
    const result = await db.query("SELECT *, TO_CHAR(date, 'DD Month YYYY') FROM posts ORDER BY id DESC;");
    posts = result.rows;
    const postsub1 = posts[1];
    const postsub2 = posts[2];
    res.render('index.ejs',  {
        posts: posts,
        postsub1: postsub1,
        postsub2: postsub2
    })
})

app.get('/thoughts', async(req, res)=>{
    const result = await db.query("SELECT *, TO_CHAR(date, 'DD Month YYYY') FROM posts ORDER BY id DESC;");
    posts = result.rows
    res.render('thoughts.ejs', {
        posts: posts,
        
    })
})

app.get("/thoughts/:id", async (req, res)=>{
    const id = parseInt(req.params.id);
    const result = await db.query("SELECT *, TO_CHAR(date, 'DD Month YYYY') FROM posts WHERE id = $1", [id]);
    posts = result.rows;
    const findStory = posts.find(post => post.id === id);
    const findIndex = posts.findIndex(post => post.id === id);
    const prev = posts[findIndex - 1];
    const next = posts[findIndex + 1];


    res.render('thought.ejs', {
       post: findStory,
       posts: posts,
       prev: prev,
       next: next
    });
})

app.get('/about', (req, res)=>{
    res.render('about.ejs')
});

app.get('/or-admin', requireAuth, async (req, res)=>{
    const result = await db.query("SELECT * FROM posts");
    posts = result.rows;
    res.render('dashboard.ejs', {
        posts: posts
    })
});

app.post('/or-admin/createPost', requireAuth, async (req, res)=>{
    const newThought = req.body;
    const result = await db.query("INSERT INTO posts(title, content, quotation, imageURL, imageAlt, author) VALUES($1, $2, $3, $4, $5, $6)", [
        newThought.title,
        newThought.content,
        newThought.quotation,
        newThought.imageURL,
        newThought.imageAlt,
        newThought.author
    ]);
    res.redirect('/or-admin')
})

app.get('/or-admin/editPost/:id', requireAuth, (req, res)=>{
    const id = req.params.id;
    const findPost = posts.findIndex(post => post.id == id);
    res.render("edit.ejs", {
        post: posts[findPost] 
    })
})

app.post('/or-admin/editPost/:id', requireAuth, async (req, res)=>{
    const id = req.params.id;
    const newThought = req.body;
const result = await db.query("UPDATE posts SET title = $1, content = $2, quotation=$3, imageURL = $4, imageAlt = $5, author = $6 WHERE id = $7", [
    newThought.title,
    newThought.content,
    newThought.quotation,
    newThought.imageURL,
    newThought.imageAlt,
    newThought.author,
    id
])

    res.redirect('/or-admin');
});


app.post("/or-admin/deletePost/:id", requireAuth, async (req, res)=>{
    const id = req.params.id;

    const result = await db.query("DELETE FROM posts WHERE id=$1", [id])
    res.redirect("/or-admin")
})







app.listen(port, ()=>{
    console.log(`App listening....`);
})