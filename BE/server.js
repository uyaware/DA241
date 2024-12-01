const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 18000;

app.use(cors());

app.use(express.json());

const user_auth = {};

// Define the route
app.get('/std_sign_in', (req, res) => {
    const usn = req.query.user_name; // Dynamic user input
    const pwd = req.query.password; // Dynamic password input
    const authFilePath = path.join(__dirname,'JS_DATABASE', 'authentication.json');

    fs.readFile(authFilePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading authentication file');
            return;
        }

        try {
            const users = JSON.parse(data); // Parse JSON
            const user = users.find(u => u.user_name === usn && u.password === pwd && u.role === 'student');

            if (user) {
                user_auth = user;

                res.send(`Welcome ${user.Name}! `);
            } else {
                res.status(401).send('Invalid username or password');
            }
        } catch (parseErr) {
            console.error(parseErr);
            res.status(500).send('Error parsing authentication file');
        }
    });
});

app.get('/ad_sign_in', (req, res) => {
    const usn = req.query.user_name; // Dynamic user input
    const pwd = req.query.password; // Dynamic password input
    const authFilePath = path.join(__dirname,'JS_DATABASE', 'authentication.json');

    fs.readFile(authFilePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading authentication file');
            return;
        }

        try {
            const users = JSON.parse(data); // Parse JSON
            const user = users.find(u => u.user_name === usn && u.password === pwd && u.role === 'admin');

            if (user) {
                res.send(`Welcome ${user.Name}! `);
            } else {
                res.status(401).send('Invalid username or password');
            }
        } catch (parseErr) {
            console.error(parseErr);
            res.status(500).send('Error parsing authentication file');
        }
    });
});


app.get('/admin_load_printer', (req, res) => {
    const printerFilePath = path.join(__dirname,'JS_DATABASE', 'printer.json');

    fs.readFile(printerFilePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading printer file');
            return;
        }

        try {
            const printers = JSON.parse(data); // Parse JSON
            res.send(printers);
        } catch (parseErr) {
            console.error(parseErr);
            res.status(500).send('Error parsing printer file');
        }
    });
});


app.post('/delete_printer', (req, res) => {
    const id = req.body.id;  // Lấy id từ body thay vì query string
    const printerFilePath = path.join(__dirname, 'JS_DATABASE', 'printer.json');

    fs.readFile(printerFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading printer file');
        }

        try {
            const printers = JSON.parse(data); // Parse JSON
            const newPrinters = printers.filter(p => p.id !== id);

            if (printers.length === newPrinters.length) {
                return res.status(404).send('Printer not found');
            }

            fs.writeFile(printerFilePath, JSON.stringify(newPrinters), (err) => {
                if (err) {
                    return res.status(500).send('Error writing to printer file');
                }
                res.send('Printer deleted successfully');
            });
        } catch (parseErr) {
            console.error(parseErr);
            return res.status(500).send('Error parsing printer file');
        }
    });
});

app.get('/num_of_paper', (req, res) => {
    const paperFilePath = path.join(__dirname,'JS_DATABASE', 'printer.json');

    var num_paper = 0;

    fs.readFile(paperFilePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading paper file');
            return;
        }

        try {
            const papers = JSON.parse(data); // Parse JSON
            
            papers.forEach(p => {
                num_paper += parseInt(p.num_paper);
            });

            res.send({num_paper: num_paper});

        } catch (parseErr) {
            console.error(parseErr);
            res.status(500).send('Error parsing paper file');
        }
    });
});


app.post('/add_new_printer', (req, res) => {

    const printerFilePath = path.join(__dirname, 'JS_DATABASE', 'printer.json');
    const newPrinter = req.body;

    fs.readFile(printerFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading printer file');
        }

        try {
            const printers = JSON.parse(data); // Parse JSON
            const existingPrinter = printers.find(p => p.id === newPrinter.id);

            if (existingPrinter) {
                return res.status(409).send('Printer already exists');
            }
            else {
                printers.push(newPrinter);
            }

            fs.writeFile(printerFilePath, JSON.stringify(printers), (err) => {
                if (err) {
                    return res.status(500).send('Error writing to printer file');
                }
                res.send('Printer added successfully');
            });
        } catch (parseErr) {
            console.error(parseErr);
            return res.status(500).send('Error parsing printer file');
        }
    });

});

app.get('/get_all_user_printing_log', (req, res) => {
    const logFilePath = path.join(__dirname,'JS_DATABASE', 'authentication.json');

    fs.readFile(logFilePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading printing log file');
            return;
        }

        try {
            const logs = JSON.parse(data); // Parse JSON
            res.send(logs);
        } catch (parseErr) {
            console.error(parseErr);
            res.status(500).send('Error parsing printing log file');
        }
    });
});


app.get('/get_user_printing_log', (req, res) => {
    if(user_auth.user_name === undefined) {
        return res.status(401).send('Please sign in first');
    }

    const logFilePath = path.join(__dirname,'JS_DATABASE', 'authentication.json');
    
    fs.readFile(logFilePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading printing log file');
            return;
        }

        try {
            const logs = JSON.parse(data); // Parse JSON
            const user_logs = logs.find(l => l.user_name === user_auth.user_name && l.password === user_auth.password  && l.role === 'student');
            res.send(user_logs);
        } catch (parseErr) {
            console.error(parseErr);
            res.status(500).send('Error parsing printing log file');
        }
    });

});


// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});