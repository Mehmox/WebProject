const express = require("express");
const Router = express.Router();
const db = require("../Db");
const ENV = process.env.ENV;

Router.get("/", (req, res) => {
    res.redirect("/view");
});

Router.get("/view", async (req, res) => {
    const events = await db.find({});

    const orderedEvents = events.sort((a, b) => (+a.date) - (+b.date));

    const results = orderedEvents.map((event) => {
        const date = +event.date;
        event.date = new Date(date).toLocaleDateString();
        event.time = new Date(date).toLocaleTimeString();
        return event;
    });

    res.render("read", { events: results, title: "views" });
});

if (ENV !== "production") {
    
    Router.get("/drop", async (req, res) => {
        console.log("db clear!")
        await db.deleteMany({});
        res.redirect("/view");
    });

}

Router.get("/create", (req, res) => {
    res.render("create", { title: "create" });
});

Router.get("/edit/:id", async (req, res) => {
    const { id } = req.params;
    const event = await db.findOne({ _id: id });

    const date = +event.date;
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');

    const formatted = `${year}-${month}-${day}`;

    event.date = formatted;
    event.time = new Date(date).toLocaleTimeString();

    res.render("edit", { event, title: "edit" });
});

module.exports = Router;