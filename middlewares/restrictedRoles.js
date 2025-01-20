 function restrictedRole(role = []) {

    return (req, res , next) => {

        if(!req.user || !req.user.role)
        {
            console.log("Failed to fetch user token")
        }

        next();
    }
}

const restrictionForUser = restrictedRole(["user"])
const restrictionForAdmin = restrictedRole(["admin" , "user"])

 module.exports = {restrictionForUser, restrictionForAdmin};
