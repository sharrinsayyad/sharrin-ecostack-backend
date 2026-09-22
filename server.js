const express = require('express');
const cors = require('cors');
const app = express();

// Allowed Origins mein Netlify aur Vercel dono ki links add kar di hain
const allowedOrigins = [
    'https://silly-sunflower-08c875.netlify.app',
    'https://sharrin-frontend-opal.vercel.app'
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Blocked by CORS policy'));
        }
    }
}));

app.use(express.json());

// Token verification middleware
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ error: "Access Denied! No token provided." });
    }
    const token = authHeader.split(' ')[1];
    if (!token || token !== "ecostack_secure_auth_token_active") {
        return res.status(403).json({ error: "Invalid or expired token." });
    }
    next();
};

app.post('/api/optimize', verifyToken, (req, res) => {
    const { code } = req.body;
    if (!code) {
        return res.status(400).json({ error: "Code payload is missing." });
    }

    const lines = code.split('\n').length;
    const worstBill = lines * 180;
    const optimisedBill = lines * 42;
    const totalSavings = worstBill - optimisedBill;
    const ceoFee = totalSavings * 0.35;

    res.json({
        uniqueId: "ECO-" + Math.floor(100000 + Math.random() * 900000),
        timestamp: new Date().toLocaleString(),
        worstBill,
        optimisedBill,
        totalSavings,
        ceoFee,
        optimizedCode: "// Optimized Code Structure\n" + code
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});