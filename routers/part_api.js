const express = require("express");
const router = express.Router();
const fs = require("fs");
const PartClass = require('../my_modules/Part.js')

let systemConfig = JSON.parse(fs.readFileSync("SystemConfig.json", "utf-8"));
let connDetail = systemConfig.database[0]

router.route("/part_api")
    .get(async (req, res) => {
        // Get, Search
        try {
            let Part = new PartClass.PartVO();
            let PartEXE = new PartClass.PartEXE(connDetail);
            res.status(200)
            if (req.rawHeaders.includes('application/json') && Object.keys(req.body).length > 0) {
                Part.jsonAssignToAttr(req.body)
            }
            else {
                Part.jsonAssignToAttr(req.query)
            }
            if (Part.RxNo === '' || Part.RxNo === null) {
                await PartEXE.search(Part)
                res.json(PartEXE.dataSet)
            }
            else {
                if (await PartEXE.get(Part.RxNo) != null) {
                    PartEXE.result.assignTo(Part)
                }
                res.json(Part.toJson())
            }
        } catch (error) {
            res.status(404)
            res.json({})
            throw error
        }

    })
    .post(async (req, res) => {
        // Add
        try {
            let Part = new PartClass.PartVO();
            let PartEXE = new PartClass.PartEXE(connDetail);
            res.status(201)
            if (req.rawHeaders.includes('application/json') && Object.keys(req.body).length > 0) {
                Part.jsonAssignToAttr(req.body)
            }
            else {
                Part.jsonAssignToAttr(req.query)
            }
            if (await PartEXE.add(Part) !== null) {
                PartEXE.result.assignTo(Part)
                res.json(Part.toJson())
            }
            else {
                res.status(404)
                res.json({})
            }
        } catch (error) {
            res.status(404)
            res.json({})
            throw error
        }
    })
    .put(async (req, res) => {
        // Edit
        try {
            let Part = new PartClass.PartVO();
            let PartEXE = new PartClass.PartEXE(connDetail);
            res.status(201)
            if (req.rawHeaders.includes('application/json') && Object.keys(req.body).length > 0) {
                Part.jsonAssignToAttr(req.body)
            }
            else {
                Part.jsonAssignToAttr(req.query)
            }
            if (await PartEXE.edit(Part) !== null) {
                PartEXE.result.assignTo(Part)
                res.json(Part.toJson())
            }
            else {
                res.status(404)
                res.json({})
            }
        } catch (error) {
            res.status(404)
            res.json({})
            throw error
        }
    })
    .delete(async (req, res) => {
        // Delete
        try {
            let Part = new PartClass.PartVO();
            let PartEXE = new PartClass.PartEXE(connDetail);
            res.status(200)
            if (req.rawHeaders.includes('application/json') && Object.keys(req.body).length > 0) {
                Part.jsonAssignToAttr(req.body)
            }
            else {
                Part.jsonAssignToAttr(req.query)
            }
            res.json({ deleted: await PartEXE.delete(Part.RxNo) })

        } catch (error) {
            res.status(404)
            res.json({ deleted: false })
            throw error
        }
    })
    .patch(async (req, res) => {
        res.status(405)
        res.json('Method Not Allowed')
    })
    .head(async (req, res) => {
        res.status(405)
    })
    .options(async (req, res) => {
        res.status(405)
    })
  


module.exports = router;
