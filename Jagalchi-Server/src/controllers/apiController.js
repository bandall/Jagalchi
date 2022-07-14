export const getUserInfo = (req, res) => {
    let body;
    return res.send({
        loggedIn: true,
       
    });
    if(!req.session.loggedIn) {
        body = {
            loggedIn: false,
        }
    } else {
        const user = req.session.loggedIn;
        body = {
            loggedIn: true,
            username: user.username,
            birthDate: user.birthDate,
            points: user.points
        }
    }
    return res.send(body);
}
