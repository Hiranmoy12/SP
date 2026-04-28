require('dotenv').config();
const express = require('express');
const path = require('path');
const ngrok = require('ngrok');

const app = express();
const PORT = process.env.PORT || 5001;

// Serve static files
app.use('/static', express.static(path.join(__dirname, 'static')));

// API endpoint
app.get('/api/message', (req, res) => {
    res.json({
        "greeting": "Hey IK you wont see this but still.....",
        "message": "I just wanna say Goodbye to you . As you will be leaving the city by 30th April. So not at least *Am sorry for eveything if I have hurted you then forgive me.I didn't mean to hurt you ever. Ik am not the boy of your choice and I hope you will find a better boy then me . Be happy be enjoyable and I hope you will find your next patner soon .*",
        "wishes": "I wish you all the best for your future and I hope you achieve all your dreams. Have a safe trip!🌸✨",
        "signOff": "❤️"
    });
});

// Serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'index.html'));
});

app.listen(PORT, async () => {
    console.log(`Server running on http://localhost:${PORT}`);

    if (process.env.NGROK_AUTH_TOKEN) {
        try {
            await ngrok.authtoken(process.env.NGROK_AUTH_TOKEN);
            const url = await ngrok.connect(PORT);
            console.log('\n' + '='.repeat(50));
            console.log(` * LOCAL NGROK URL: ${url}`);
            console.log('='.repeat(50) + '\n');
        } catch (err) {
            console.log('Ngrok auto-connect failed or token invalid. Skipping ngrok initialization.');
        }
    } else {
        console.log('No NGROK_AUTH_TOKEN found in .env. Running without ngrok.');
    }
});
