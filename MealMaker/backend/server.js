const express = require("express");
const App = express();
const cors = require("cors")
const controller = require("./controller");
const fileUpload = require("express-fileupload");
const jwt  = require("jsonwebtoken");

App.use(express.json())
App.use(cors())
App.use(fileUpload());

App.use('/files', express.static('files'));
App.use(express.static('files'));


App.get("/", controller.getUsers);
App.post("/adduser", controller.addUser);
App.post("/delete", controller.deleteUser);
App.post("/single", controller.singleUser)
App.post("/update", controller.updateUser);
App.post("/search", controller.search);
App.post("/login", controller.Login);
App.post("/addrecipe", controller.AddRecipe);
App.get("/getrecipe", controller.GetRecipe);
App.post("/singleRecipe", controller.singleRecipe);
App.post("/addcomment", controller.AddComment);
App.post("/getcomments", controller.getComments);
App.post("/filterMeal", controller.filterMeal);
App.post("/AddRate", controller.AddRate);
App.post("/getUserRecipes", controller.getUserRecipes);
App.post("/getRateAvg", controller.getAvgRate);






const verify = (req, res, next) => {
    const token = req.headers["access"];
    if(!token) {
        console.log("No Token")
        res.send({state : false});
    } else {
        jwt.verify(token, "0c5370779281048935f9", (err, decoded) => {
            if(err){
                res.send({state : false});
                console.log("Not Auth");
            } else {
                req.userId = decoded.iduser;
                next();
            }
        })
    }

}



App.post("/checkauth", verify  ,(req, res) => {
    res.send({state : true}); 
    console.log("AUTH")
});






App.listen(8000, () => console.log("Server running on port 8000"));