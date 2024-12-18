import express from "express";
import axios from "axios";
import * as fs from "fs";
const app = express();

const DATA = JSON.parse(fs.readFileSync('bibliothèque.json', 'utf8'));
let apiResponse = {
    "status": "200",
    "data": {},
    "message": "Everything is ok"
};

app.get("/", (req, res) => {
    apiResponse.data = DATA;
    res.json(apiResponse);
});

// route de trie des data
app.get("/order/by/:key", async (req, res) => {
    try
    {
        const { key } = req.params;
        //console.log(data);
        DATA.sort((a, b) => a[key].localeCompare(b[key]));
        apiResponse.data = DATA;
        //console.log("after sort =>",data)
    }
    catch (error)
    {
        console.error(error);
        apiResponse.message = "Unrecognized error";
    }

    res.json(apiResponse);
});

// route de filtrage par une clé donnée
app.get("/get/by/:param/:value", async (req, res) => {
    try
    {
        const { param, value } = req.params;
        let results = [];
        DATA.forEach( item => {
            if( "undefined" !== typeof item[param] && item[param] == value )
            {
                results.push(item);
            }
        } )
        apiResponse.data = results;
    }
    catch (error)
    {
        console.error(error);
        apiResponse.message = "Unrecognized error";
    }

    res.json(apiResponse);
});

// pour les routes non gérées
app.get('*',async (req, res, next) => {
    apiResponse = {
        "status": "404",
        "data": {},
        "message": "Error 404 NOT FOUND"
    }
    res.json(apiResponse);
});

app.listen(4000, () => console.log("Server running on http://localhost:3000"));