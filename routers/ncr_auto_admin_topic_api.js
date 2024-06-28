const express = require("express");
const router = express.Router();
const fs = require("fs");
const NCRAutoAdminTopicClass = require('../my_modules/NCRAutoAdminTopic')

let systemConfig = JSON.parse(fs.readFileSync("SystemConfig.json", "utf-8"));
let connDetail = systemConfig.database[0]

router.route("/ncr_auto_admin_topic_api")

    .get(async (req, res) => {
        // Get, Search
        try {
            let NCRAutoAdminTopic = new NCRAutoAdminTopicClass.NCRAutoAdminTopicVO();
            let NCRAutoAdminTopicEXE = new NCRAutoAdminTopicClass.NCRAutoAdminTopicEXE(connDetail);
            res.status(200)
            if (req.rawHeaders.includes('application/json') && Object.keys(req.body).length > 0) {
                NCRAutoAdminTopic.jsonAssignToAttr(req.body)
            }
            else {
                NCRAutoAdminTopic.jsonAssignToAttr(req.query)

            }
            if (NCRAutoAdminTopic.ID == 0 || NCRAutoAdminTopic.ID === null) {
                await NCRAutoAdminTopicEXE.search(NCRAutoAdminTopic)
                res.json(NCRAutoAdminTopicEXE.dataSet)

            }
            else {

                if (await NCRAutoAdminTopicEXE.get(NCRAutoAdminTopic.ID) != null) {
                    NCRAutoAdminTopicEXE.result.assignTo(NCRAutoAdminTopic)
                }
                res.json(NCRAutoAdminTopic.toJson())
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
            let NCRAutoAdminTopic = new NCRAutoAdminTopicClass.NCRAutoAdminTopicVO();
            let NCRAutoAdminTopicEXE = new NCRAutoAdminTopicClass.NCRAutoAdminTopicEXE(connDetail);
            res.status(201)
            if (req.rawHeaders.includes('application/json') && Object.keys(req.body).length > 0) {
                NCRAutoAdminTopic.jsonAssignToAttr(req.body)
            }
            else {
                NCRAutoAdminTopic.jsonAssignToAttr(req.query)
            }
            // console.table([NCRAutoAdminTopic.toJson(),NCRAutoAdminTopic.toJson()])
            if (await NCRAutoAdminTopicEXE.clone_ncr_master(NCRAutoAdminTopic) !== null) {
                NCRAutoAdminTopicEXE.result.assignTo(NCRAutoAdminTopic)
                res.json(NCRAutoAdminTopic.toJson())

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
            let NCRAutoAdminTopic = new NCRAutoAdminTopicClass.NCRAutoAdminTopicVO();
            let NCRAutoAdminTopicEXE = new NCRAutoAdminTopicClass.NCRAutoAdminTopicEXE(connDetail);
            res.status(201)
            if (req.rawHeaders.includes('application/json') && Object.keys(req.body).length > 0) {
                NCRAutoAdminTopic.jsonAssignToAttr(req.body)
            }
            else {
                NCRAutoAdminTopic.jsonAssignToAttr(req.query)
            }
            if (await NCRAutoAdminTopicEXE.edit(NCRAutoAdminTopic) !== null) {
                NCRAutoAdminTopicEXE.result.assignTo(NCRAutoAdminTopic)
                res.json(NCRAutoAdminTopic.toJson())
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
            let NCRAutoAdminTopic = new NCRAutoAdminTopicClass.NCRAutoAdminTopicVO();
            let NCRAutoAdminTopicEXE = new NCRAutoAdminTopicClass.NCRAutoAdminTopicEXE(connDetail);
            res.status(200)
            if (req.rawHeaders.includes('application/json') && Object.keys(req.body).length > 0) {
                NCRAutoAdminTopic.jsonAssignToAttr(req.body)
            }
            else {
                NCRAutoAdminTopic.jsonAssignToAttr(req.query)
            }
            res.json({ deleted: await NCRAutoAdminTopicEXE.delete(NCRAutoAdminTopic.ID) })

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

router.route("/ncr_auto_admin_topic_clone_ncr_master")
    .get(async (req, res) => {
        try {
            let NCRAutoAdminTopicEXE = new NCRAutoAdminTopicClass.NCRAutoAdminTopicEXE(connDetail);
            let dataReq
            if (req.rawHeaders.includes('application/json') && Object.keys(req.body).length > 0) {
                dataReq = req.body
            }
            else {
                dataReq = req.query
            }

            await NCRAutoAdminTopicEXE.clone_ncr_master()
            res.json(NCRAutoAdminTopicEXE.dataSet)


        } catch (error) {
            res.status(404)
            res.json({})
            throw error
        }

    })
router.route("/ncr_auto_admin_topic_ncr_list_listby_product")
    .post(async (req, res) => {
        try {
            let NCRAutoAdminTopic = new NCRAutoAdminTopicClass.NCRAutoAdminTopicVO();
            let NCRAutoAdminTopicEXE = new NCRAutoAdminTopicClass.NCRAutoAdminTopicEXE(connDetail);

            if (req.rawHeaders.includes('application/json') && Object.keys(req.body).length > 0) {
                NCRAutoAdminTopic.jsonAssignToAttr(req.body)
            }
            else {
                NCRAutoAdminTopic.jsonAssignToAttr(req.query)
            }
          
            if (await NCRAutoAdminTopicEXE.clone_ncr_master(NCRAutoAdminTopic) !== null){

                NCRAutoAdminTopicEXE.result.assignTo(NCRAutoAdminTopic)
                res.json(NCRAutoAdminTopic.toJson())

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

    

module.exports = router;
