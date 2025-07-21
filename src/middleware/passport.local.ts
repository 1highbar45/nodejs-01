import { prisma } from "config/client";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { getUserSumCart, getUserWithRoleById } from "services/client/auth.service";
import { comparePassword } from "services/user.service";

const configPassportLocal = () => {
    passport.use(new LocalStrategy({
        passReqToCallback: true
    }, async function verify(req, username, password, callback) {
        const { session } = req as any;
        if (session?.messages?.length) {
            session.messages = [];
        }
        console.log(">>> check username/password: ", username, password);
        //check user exist in database
        const user = await prisma.user.findUnique({
            where: { username }
        })

        if (!user) {
            //throw error 
            // throw new Error(`Username: ${username} not found`);
            return callback(null, false, { message: `Username/password invalid` });
        }

        //compare password
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            // throw new Error(`Invalid password`);
            return callback(null, false, { message: 'Username/password invalid' });
        }

        return callback(null, user as any)
    }));

    //store data in session
    passport.serializeUser(function (user: any, callback) {
        callback(null, { id: user.id, username: user.username });
    });

    //attach data to req.user
    passport.deserializeUser(async function (user: any, callback) {
        const { id, username } = user;
        //query to database
        const userInDB: any = await getUserWithRoleById(id)
        const sumCart = await getUserSumCart(id);
        console.log(">>> check sumCart: ", sumCart);

        return callback(null, { ...userInDB, sumCart: sumCart });
    });
}

export default configPassportLocal;