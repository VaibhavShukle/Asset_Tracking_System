const express = require('express');
const router = express.Router();


// const verifyUser = (req, res, next) => {

//     const token = req.headers.token;
//     console.log(token)
//     if (!token) {
//         return res.json({ Error: "You are no Authenticated" });
//     } else {
//         jwt.verify(token, "jwt-secret-key", (err, decoded) => {
//             if (err) return res.json({ Error: "Token wrong" });
//             req.role = decoded.role;
//             req.id = decoded.id;
//             next();
//         })
//     }
// }

router.get('/',  (req, res) => {
    return res.json({ Status: "Success", role: req.role, id: req.id })

})


module.exports = router