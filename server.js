const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Set up EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Data storage
const DATA_FILE = path.join(__dirname, 'data', 'posts.json');

// Ensure data directory exists
function ensureDataDirectory() {
    const dataDir = path.join(__dirname, 'data');
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
        fs.writeFileSync(DATA_FILE, JSON.stringify([]));
    }
}

// Initialize data directory
ensureDataDirectory();

// Routes
app.get('/', (req, res) => {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        const posts = JSON.parse(data);
        res.render('layout', { posts, template: 'index' });
    } catch (error) {
        console.error('Error loading posts:', error);
        res.status(500).send('Error loading posts');
    }
});

app.get('/post/:id', (req, res) => {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        const posts = JSON.parse(data);
        const post = posts.find(p => p.id === req.params.id);
        if (!post) {
            return res.status(404).send('Post not found');
        }
        res.render('layout', { post, template: 'post' });
    } catch (error) {
        console.error('Error loading post:', error);
        res.status(500).send('Error loading post');
    }
});

app.get('/new', (req, res) => {
    res.render('layout', { template: 'new' });
});

app.post('/posts', (req, res) => {
    try {
        const { title, content } = req.body;
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        const posts = JSON.parse(data);
        
        const newPost = {
            id: uuidv4(),
            title,
            content,
            createdAt: new Date().toISOString()
        };
        
        posts.push(newPost);
        fs.writeFileSync(DATA_FILE, JSON.stringify(posts, null, 2));
        res.redirect('/');
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).send('Error creating post');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 