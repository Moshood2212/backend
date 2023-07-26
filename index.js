const express = require("express");
const app = express();
const port = 5000;
const meals = require("./data/meals");
// get, post, patch, put, delete

// app.get app.delete, app.patch app.put app.set app.listen,
// status code 200
// setting the view engine

app.set("view engine", "ejs");
// middlewear
app.use(express.json());
app.get("/api/meals", (req, res) => {
    res.status(200).json({ numOfMeals: meals.length, meals });
});
// 
app.get("/api/meals/:mealId", (req, res) => {
    // res.params
    // console.log(req.params.mealId);
    const { mealId } = req.params;
    const meal = meals.find((meal) => meal.id === parseInt(mealId));
    if (!meal) {
        return res.status(404).json({
            message: `Meal with the id${mealId} not found`,
            success: false,
        });
    }
    res.status(200).json({ success: true, meal });
});
// create a meal 
app.post("/api/meals", (req, res) => {
    const { name } = req.body
    if (!name) {
        return res.status(400).json({ message: "please provide a meal name" })
    }
    const newMeal = { id: 7, name };
    res.status(201).json({ success: true, meals: [...meals, newMeal] });
});

// update a meal
// find what we want to update-get sth  undefined
// provide what

app.patch("/api/meals/:mealId", (req, res) => {
    const { mealId } = req.params;
    const { name } = req.body;

    const meal = meals.find((meal) => meal.id === Number(mealId));
    if (!meal) {
        return res.status(404).json({ message: `meal with the id${mealId} not found` })
    }
    if (!name) {
        return res.status(400).json({ message: "please provide a new meal name" });
    }
    const mealToBeUodated = meals.map((meal) => {
        if (meal.id === Number(mealId)) {
            meal.name = name
        }
        return meal;
    });
    return res.status(200).json({ success: true, meals: mealToBeUodated });
});

app.delete("/api/meals/:mealId", (req, res) => {
    const { mealId } = req.params;
    const meal = meals.find((meal) => meal.id === Number(mealId));
    if (!meal) {
        return res.status(404).json({ message: `meal with the id${mealId} not found` });

    }
     const remainingMeals = meals.filter((meal) => meal.id !== parseInt(mealId));
        res.status(200).json({ success: true, meals: remainingMeals });
})
























// middlewear
app.use((req, res, next) => {
    const requestInfo = {
        url: req.url,
        method: req.method,
        time: new Date().getDate()
    };
    console.log(requestInfo);
    next();
});

const auth = (req, resnext) => {
    const authorized = false;
    if (authorized) {
        next();
    } else {
        res.send("you are not authorized");
    }
};



app.get("/", (req, res) => {
    const user = "john Doe";
    const role = "Fullstack engineer";
    res.status(200).render("index", {user, role});
});
app.get("/about", (req, res) => {
     res.status(200).render("about");
});

// error route
app.all("*", (req, res) => {
    res.status(404).render("error");
});

// redirecting
app.get("/about-us", (req, res) => {
    res.redirect("/about");
})



app.listen(port, () => {
    console.log(`server running on port ${port}...`);
});