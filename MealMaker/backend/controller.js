const db = require("./db");
const bcrypt = require("bcrypt");
const fileUpload = require("express-fileupload");
const jwt = require("jsonwebtoken");

exports.getUsers = async (req, res) => {
    await db.query("SELECT * FROM users", (err, resault) => {
        if (err) throw err;
        res.send(resault);
    })
}

exports.addUser = async (req, res) => {
    const { nom, prenom, email, password, telephone, role} = req.body;
    const img = req.files.img;
    
    img.mv(`./files/Users/${img.name}`, (err) => {
        if (err) return res.status(500).send(err);
    });
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const SQL = "INSERT INTO users (nom, prenom, email, password, telephone, role, img) VALUES (?,?,?,?,?,?,?)";
    
    await db.query(SQL,[nom, prenom, email, hashedPassword, telephone, role, img.name], (err, resault) => {
        if (err) throw err;
        console.log(" USER INSERTED CORRECTLY (: ");
        res.send(nom);
    })
}

exports.search = (req, res) => {
    const search = req.body.search;
    const sql = " SELECT * FROM recipes WHERE nom LIKE ? ";
    
    db.query(sql, `%${search}%`, (err, result) => {
        if (err) throw err;
        const recipes = result.map(recipe => {
            recipe.steps = JSON.parse(recipe.steps);
            recipe.ingredient = JSON.parse(recipe.ingredient);
            return recipe;
        });

        res.send(recipes);
    })
} 

exports.deleteUser = (req, res) => {
    const code = req.body.id;
    const sql = "DELETE FROM users WHERE code = ?";
    db.query(sql, code, (err, data) => {
        if (err) throw err;
        res.send(data);
    })
}

exports.singleUser = (req, res) => {
    const code = req.body.code;
    const sql = "SELECT * FROM users WHERE code = ?";
    console.log(code)
    db.query(sql, code, (err,data) => {
        if (err) throw err;
        res.send(data);
        console.log(data);
    })
}

exports.updateUser = (req, res) => {
    const code = req.body.code;
    const nom = req.body.nom;
    const email = req.body.email;
    const telephone = req.body.telephone;
    
    const sql = "UPDATE users SET nom = ? , email = ? , telephone = ? WHERE code = ?";
    db.query(sql, [nom, email, telephone, code], (err, resault) => {
        if (err) throw err;
        res.send(resault);
    })
}

exports.Login = (req, res) => {
    const SQL = "SELECT * FROM users WHERE email = ?";
    const { email, password } = req.body;

    db.query(SQL, [email] , async (err, data) => {
        if (err) throw err;
        if (data.length > 0) {
            const user = data[0];
            const userID = user.code;
            const hashed = user.password;
            const compare = await bcrypt.compare(password, hashed);
            if(compare) {
                const token = jwt.sign({ userID }, "0c5370779281048935f9",   { expiresIn : "1h"});
                res.send({state:true, iduser:userID,role:user.role ,token:token});
            } else{
                res.send(false);
            }
        } else {
            res.send(false);
        }
    })
}


exports.AddRecipe = (req, res) => {
    const SQL = 'INSERT INTO recipes (nom, steps, cookingTime, ingredient, img, userID) VALUES (?,?,?,?,?,?)';

    const { nom, steps, time, ing, user } = req.body;
    const img = req.files.img;

    img.mv(`./files/recipes/${img.name}`, (err) => {
        if (err) return res.status(500).send(err);

        db.query(SQL, [nom, JSON.stringify(steps), time, JSON.stringify(ing), img.name, user], (dbErr, data) => {
            if (dbErr) {
                console.error(dbErr);
                return res.status(500).json('Internal Server Error');
            }
            res.json('Recette ajoutée');
            console.log(steps);
        });
    });
};

exports.GetRecipe = (req, res) => {
    const SQL = 'SELECT * FROM recipes';

    db.query(SQL, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json('Internal Server Error');
        }
        const recipes = result.map(recipe => {
            recipe.steps = JSON.parse(recipe.steps);
            recipe.ingredient = JSON.parse(recipe.ingredient);
            return recipe;
        });

        res.send(recipes);
    });
}


exports.singleRecipe = (req, res) => {
    const SQL = "SELECT * FROM recipes WHERE recipeID = ?";
    db.query(SQL, [req.body.code], (err, result) => {
        if (err) throw err;
        const recipes = result.map(recipe => {
            recipe.steps = JSON.parse(recipe.steps);
            recipe.ingredient = JSON.parse(recipe.ingredient);
            return recipe;
        });
        res.send(recipes);
    })
}


exports.AddComment = (req, res) => {
    const { body, user, recipe } = req.body;
    const SQL ="INSERT INTO comments (body, idRecipe, idUser) VALUES(?,?,?)";
    db.query(SQL, [body, recipe, user], (err, result) => {
        if (err) throw err;
        console.log("Commnet Added");
    });
}


exports.getComments = (req, res) => {
    const { recipe } = req.body;
    const SQL = "SELECT users.nom AS userName, users.img AS userImg, comments.body FROM comments JOIN users ON comments.idUser = users.code WHERE comments.idRecipe = ?";
    db.query(SQL, [recipe], (err, result) => {
        if (err) throw err;
        res.send(result);
    })
}



exports.filterMeal = (req, res) => {
    const allRecipesSQL = 'SELECT * FROM recipes';
    db.query(allRecipesSQL, (err, allRecipes) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Internal Server Error");
        }

        const ingredientsArray = Object.values(req.body);

        const filteredRecipes = allRecipes.filter(recipe => {
            const recipeIngredients = JSON.parse(recipe.ingredient);
            return ingredientsArray.every(ingredient => recipeIngredients.includes(ingredient));
        });

        if (filteredRecipes.length > 0) {
            const recipes = filteredRecipes.map(recipe => {
                recipe.steps = JSON.parse(recipe.steps);
                recipe.ingredient = JSON.parse(recipe.ingredient);
                return recipe;
            });

            res.send({state:true, meals : recipes});
            console.log("Found:", recipes);
        } else {
            res.send({ state: false });
            console.log("Not Found");
        }
    });
};


exports.getUserRecipes = (req, res) => {
    const SQL = "SELECT * FROM recipes WHERE userID = ?";
    const { id } = req.body;
    db.query(SQL, [id],  (err, data) => {
        if (err) throw err;
        res.send(data);
        console.log(data);
    })
}



exports.AddRate = (req, res) => {
    const SQL = "INSERT INTO rate (value, idUser, idRecipe)  VALUES(?,?,?)";
    const { value, user, recipe } = req.body;
    db.query(SQL, [value, user, recipe], (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    })
}


exports.getAvgRate = (req, res) => {
    const SQL = "SELECT AVG(value) AS avg FROM rate WHERE idRecipe = ?";
    const  { code } = req.body;
    db.query(SQL, [code], (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    })
}