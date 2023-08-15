const express = require('express');
const app = express();
const z = require("zod")

app.post("/travelPackages", (req, res) => {
    const travelPackagesSchema =z.object({
        key: z.string().number().int().positive(),
        src : z.string().url().endsWith(".jpg"),
        text:  z.string(),
        label:   z.string(),
        path:     z.string(),
        price:      z.number().int().positive(),
        location: z.string(),
    })
})

function validatetravelPackages (input) {
    return travelPackagesSchema.safeParse(input)
}

function validateParcialtravelPackages (input) {
    return travelPackagesSchema.partial().safeParse(input)
}

module.exports = {
    validatetravelPackages,
    validateParcialtravelPackages
}