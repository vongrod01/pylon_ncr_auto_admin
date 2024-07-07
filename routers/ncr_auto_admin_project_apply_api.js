const express = require("express");
const router = express.Router();
const fs = require("fs");
const NCRAutoAdminProjectApplyClass = require('../my_modules/NCRAutoAdminProjectApply')

let systemConfig = JSON.parse(fs.readFileSync("SystemConfig.json", "utf-8"));
let connDetail = systemConfig.database[0]

router.route("/ncr_auto_admin_project_apply_api")

    .get(async (req, res) => {
        // Get, Search
        try {
            let NCRAutoAdminProjectApply = new NCRAutoAdminProjectApplyClass.NCRAutoAdminProjectApplyVO();
            let NCRAutoAdminProjectApplyEXE = new NCRAutoAdminProjectApplyClass.NCRAutoAdminProjectApplyEXE(connDetail);
            res.status(200)
            if (req.rawHeaders.includes('application/json') && Object.keys(req.body).length > 0) {
                NCRAutoAdminProjectApply.jsonAssignToAttr(req.body)
            }
            else {
                NCRAutoAdminProjectApply.jsonAssignToAttr(req.query)

            }
            if (NCRAutoAdminProjectApply.ID == 0 || NCRAutoAdminProjectApply.ID === null) {
                await NCRAutoAdminProjectApplyEXE.search(NCRAutoAdminProjectApply)
                res.json(NCRAutoAdminProjectApplyEXE.dataSet)

            }
            else {

                if (await NCRAutoAdminProjectApplyEXE.get(NCRAutoAdminProjectApply.ID) != null) {
                    NCRAutoAdminProjectApplyEXE.result.assignTo(NCRAutoAdminProjectApply)
                }
                res.json(NCRAutoAdminProjectApply.toJson())
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
            let NCRAutoAdminProjectApply = new NCRAutoAdminProjectApplyClass.NCRAutoAdminProjectApplyVO();
            let NCRAutoAdminProjectApplyEXE = new NCRAutoAdminProjectApplyClass.NCRAutoAdminProjectApplyEXE(connDetail);
            res.status(201)
            if (req.rawHeaders.includes('application/json') && Object.keys(req.body).length > 0) {
                NCRAutoAdminProjectApply.jsonAssignToAttr(req.body)
            }
            else {
                NCRAutoAdminProjectApply.jsonAssignToAttr(req.query)
            }
            // console.table([NCRAutoAdminProjectApply.toJson(),NCRAutoAdminProjectApply.toJson()])
            if (await NCRAutoAdminProjectApplyEXE.clone_ncr_master(NCRAutoAdminProjectApply) !== null) {
                NCRAutoAdminProjectApplyEXE.result.assignTo(NCRAutoAdminProjectApply)
                res.json(NCRAutoAdminProjectApply.toJson())

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
            let NCRAutoAdminProjectApply = new NCRAutoAdminProjectApplyClass.NCRAutoAdminProjectApplyVO();
            let NCRAutoAdminProjectApplyEXE = new NCRAutoAdminProjectApplyClass.NCRAutoAdminProjectApplyEXE(connDetail);
            res.status(201)
            if (req.rawHeaders.includes('application/json') && Object.keys(req.body).length > 0) {
                NCRAutoAdminProjectApply.jsonAssignToAttr(req.body)
            }
            else {
                NCRAutoAdminProjectApply.jsonAssignToAttr(req.query)
            }
            if (await NCRAutoAdminProjectApplyEXE.edit(NCRAutoAdminProjectApply) !== null) {
                NCRAutoAdminProjectApplyEXE.result.assignTo(NCRAutoAdminProjectApply)
                res.json(NCRAutoAdminProjectApply.toJson())
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
            let NCRAutoAdminProjectApply = new NCRAutoAdminProjectApplyClass.NCRAutoAdminProjectApplyVO();
            let NCRAutoAdminProjectApplyEXE = new NCRAutoAdminProjectApplyClass.NCRAutoAdminProjectApplyEXE(connDetail);
            res.status(200)
            if (req.rawHeaders.includes('application/json') && Object.keys(req.body).length > 0) {
                NCRAutoAdminProjectApply.jsonAssignToAttr(req.body)
            }
            else {
                NCRAutoAdminProjectApply.jsonAssignToAttr(req.query)
            }
            res.json({ deleted: await NCRAutoAdminProjectApplyEXE.delete(NCRAutoAdminProjectApply.ID) })

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

router.route("/ncr_auto_admin_apply_project_clone_ncr_master")
    .get(async (req, res) => {
        try {
            let NCRAutoAdminProjectApplyEXE = new NCRAutoAdminProjectApplyClass.NCRAutoAdminProjectApplyEXE(connDetail);
            let dataReq
            if (req.rawHeaders.includes('application/json') && Object.keys(req.body).length > 0) {
                dataReq = req.body
            }
            else {
                dataReq = req.query
            }

            await NCRAutoAdminProjectApplyEXE.clone_ncr_master()
            res.json(NCRAutoAdminProjectApplyEXE.dataSet)


        } catch (error) {
            res.status(404)
            res.json({})
            throw error
        }

    })
router.route("/ncr_auto_admin_apply_project_ncr_list_listby_product")
    .post(async (req, res) => {
        try {
            let NCRAutoAdminProjectApply = new NCRAutoAdminProjectApplyClass.NCRAutoAdminProjectApplyVO();
            let NCRAutoAdminProjectApplyEXE = new NCRAutoAdminProjectApplyClass.NCRAutoAdminProjectApplyEXE(connDetail);

            if (req.rawHeaders.includes('application/json') && Object.keys(req.body).length > 0) {
                NCRAutoAdminProjectApply.jsonAssignToAttr(req.body)
            }
            else {
                NCRAutoAdminProjectApply.jsonAssignToAttr(req.query)
            }
          
            if (await NCRAutoAdminProjectApplyEXE.clone_ncr_master(NCRAutoAdminProjectApply) !== null){

                NCRAutoAdminProjectApplyEXE.result.assignTo(NCRAutoAdminProjectApply)
                res.json(NCRAutoAdminProjectApply.toJson())

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
