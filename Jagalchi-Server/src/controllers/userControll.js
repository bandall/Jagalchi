import User from "../models/User";
import bycript from "bcrypt";
export const getJoin = (req, res) => {
    //res.sendFile(process.env.ASSET_PATH + "/index.html");
}

export const postJoin = async (req, res) => {
    const { username, email, id, password, password_confirm } = req.body;
    console.log(username, email, id, password, password_confirm);
    const exist = await User.exists({$or: [{id}, {email}]});
    if(exist) {
        return res.status(409).send({ isCreated: false, errMsg: "중복된 아이디 또는 이메일입니다." });
    }
    if(password != password_confirm) {
        return res.status(409).send({ isCreated: false, errMsg: "비밀번호를 확인하여 주십시오." });
    }
    try {
        await User.create({
            username: username,
            userID: id,
            email: email,
            password: password
        });
    } catch(error) {
        console.log(error);
        return res.status(409).send({ isCreated: false, errMsg: "계정 생성중 오류가 발생했습니다." });
    }
    
    return res.status(200).send({ isCreated: true });
}

export const getEdit = (req, res) => {
    res.send("Get Edit");
} 

export const logout = (req, res) => {
    req.session.destroy();
    console.log(req.session);
    return res.sendStatus(200);
}

export const getLogin = (req, res) => {
    //res.send("Get Login");
    //res.sendFile(process.env.ASSET_PATH + "/index.html");
} 

export const postLogin = async (req, res) => {
    const { id, password } = req.body;
    console.log(id + " " + password);
    const user = await User.findOne({ userID: id });
    if(!user) {
        return res.status(400).send({ errMsg: "존재하지 않는 아이디입니다." });
    }
    const check = await bycript.compare(password, user.password);
    if(!check) {
        return res.status(400).send({ errMsg: "비밀번호를 잘못입력했습니다." });
    }
    req.session.loggedIn = true;
    req.session.user = user;
    const body = {
        username: user.username,
        userID: id,
        point: user.points
    }
    return res.status(200).send(body);
} 

export const postEdit = (req, res) => {
    res.send("Post Edit");
} 

export const getChangePassword = (req, res) => {
    res.send("Get ChagePassword");
} 

export const postChangePassword = (req, res) => {
    res.send("Post ChagePassword");
} 

export const userInfo = (req, res) => {
    const { id } = req.params;
    res.send("User : " + id);
}