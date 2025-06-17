const express = require("express");
const Router = express.Router();
const db = require("../Db");

Router.post("/create", async (req, res) => {

    const { name, date, time, location, description } = req.body;

    const combined = new Date(date + "T" + time).getTime();

    for (let i = 0; i < 15; i++) {
        const event = new db({ name, date: combined, location, description });
        await event.save();
    }

    res.redirect("/view");
});

Router.post("/edit/id", async (req, res) => {
    const { id } = req.params;
    const event = await db.findOne({ id });
    res.render("edit", { event, title: "edit" });
});

Router.put("/edit/:id", async (req, res) => {

    const id = req.params.id;
    const { name, date, time, location, description } = req.body;

    const combined = new Date(date + "T" + time).getTime();

    await db.findByIdAndUpdate(id, { name, date: combined, location, description });

    res.redirect("/view");
});

Router.delete("/edit/:id", async (req, res) => {

    const id = req.params.id;

    await db.findByIdAndDelete(id);

    res.redirect("/view");
});

Router.use((req, res) => {
    res.status(404).render("404", { title: "404" });
});

module.exports = Router;