const firebaseAdmin = require("../firebase/config");
const userModel = require("../models/User");

const authenticate =  async (req, res, next) => {
    try {
        let firebaseToken = req.headers?.authorization?.split(" ")[1];
        if (firebaseToken === undefined) {
            firebaseToken = req.body.headers?.authorization?.split(" ")[1];
        }

        let firebaseUser;
        if (firebaseToken) {
            await firebaseAdmin.auth()
                .verifyIdToken(firebaseToken)
                .then((decodedToken) => {
                    firebaseUser = decodedToken;
                });
        }
        if (!firebaseUser) {
            // Unauthorized
            console.log("Unauthorized - no firebase user FOUND");
            return res.sendStatus(401);
        }
        const user = await userModel.findOne({
            uid: firebaseUser.user_id,
        });
        
        if (!user) {
            // Unauthorized
            return res.sendStatus(401);
        }

        req.user = user;
        // console.log("user authorized");

        next();
    } catch (err) {
        //Unauthorized
        console.log("Catch worked", err);
        res.sendStatus(401);
    }
}

module.exports = authenticate;
