const express = require("express");
const router = express.Router();
const fs = require("fs");
const NCRAutoTopicClass = require('../my_modules/NCRAutoTopic.js')

let systemConfig = JSON.parse(fs.readFileSync("SystemConfig.json", "utf-8"));
let connDetail = systemConfig.database[0]

router.route("/ncr_auto_topic_api")

    .get(async (req, res) => {
        // Get, Search
        try {
            let NCRAutoTopic = new NCRAutoTopicClass.NCRAutoTopicVO();
            let NCRAutoTopicEXE = new NCRAutoTopicClass.NCRAutoTopicEXE(connDetail);
            res.status(200)
            if (req.rawHeaders.includes('application/json') && Object.keys(req.body).length > 0) {
                NCRAutoTopic.jsonAssignToAttr(req.body)
            }
            else {
                NCRAutoTopic.jsonAssignToAttr(req.query)

            }
            if (NCRAutoTopic.ID == 0 || NCRAutoTopic.ID === null) {
                await NCRAutoTopicEXE.search(NCRAutoTopic)
                res.json(NCRAutoTopicEXE.dataSet)

            }
            else {

                if (await NCRAutoTopicEXE.get(NCRAutoTopic.ID) != null) {
                    NCRAutoTopicEXE.result.assignTo(NCRAutoTopic)
                }
                res.json(NCRAutoTopic.toJson())
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
            let NCRAutoTopic = new NCRAutoTopicClass.NCRAutoTopicVO();
            let NCRAutoTopicEXE = new NCRAutoTopicClass.NCRAutoTopicEXE(connDetail);
            res.status(201)
            if (req.rawHeaders.includes('application/json') && Object.keys(req.body).length > 0) {
                NCRAutoTopic.jsonAssignToAttr(req.body)
            }
            else {
                NCRAutoTopic.jsonAssignToAttr(req.query)
            }
            // console.table([NCRAutoTopic.toJson(),NCRAutoTopic.toJson()])
            if (await NCRAutoTopicEXE.add(NCRAutoTopic) !== null) {
                NCRAutoTopicEXE.result.assignTo(NCRAutoTopic)
                res.json(NCRAutoTopic.toJson())

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
            let NCRAutoTopic = new NCRAutoTopicClass.NCRAutoTopicVO();
            let NCRAutoTopicEXE = new NCRAutoTopicClass.NCRAutoTopicEXE(connDetail);
            res.status(201)
            if (req.rawHeaders.includes('application/json') && Object.keys(req.body).length > 0) {
                NCRAutoTopic.jsonAssignToAttr(req.body)
            }
            else {
                NCRAutoTopic.jsonAssignToAttr(req.query)
            }
            if (await NCRAutoTopicEXE.edit(NCRAutoTopic) !== null) {
                NCRAutoTopicEXE.result.assignTo(NCRAutoTopic)
                res.json(NCRAutoTopic.toJson())
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
            let NCRAutoTopic = new NCRAutoTopicClass.NCRAutoTopicVO();
            let NCRAutoTopicEXE = new NCRAutoTopicClass.NCRAutoTopicEXE(connDetail);
            res.status(200)
            if (req.rawHeaders.includes('application/json') && Object.keys(req.body).length > 0) {
                NCRAutoTopic.jsonAssignToAttr(req.body)
            }
            else {
                NCRAutoTopic.jsonAssignToAttr(req.query)
            }
            res.json({ deleted: await NCRAutoTopicEXE.delete(NCRAutoTopic.ID) })

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
