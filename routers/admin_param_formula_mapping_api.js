const express = require("express");
const router = express.Router();
const fs = require("fs");
const AdminParamFormulaMappingClass = require('../my_modules/AdminParamFormulaMapping')

let systemConfig = JSON.parse(fs.readFileSync("SystemConfig.json", "utf-8"));
let connDetail = systemConfig.database[0]

router.route("/admin_param_formula_mapping_api")

    .get(async (req, res) => {
        // Get, Search
        try {
            let AdminParamFormulaMapping = new AdminParamFormulaMappingClass.AdminParamFormulaMappingVO();
            let AdminParamFormulaMappingEXE = new AdminParamFormulaMappingClass.AdminParamFormulaMappingEXE(connDetail);
            res.status(200)
            if (req.rawHeaders.includes('application/json') && Object.keys(req.body).length > 0) {
                AdminParamFormulaMapping.jsonAssignToAttr(req.body)
            }
            else {
                AdminParamFormulaMapping.jsonAssignToAttr(req.query)

            }
            if (AdminParamFormulaMapping.ID == 0 || AdminParamFormulaMapping.ID === null) {
                await AdminParamFormulaMappingEXE.search(AdminParamFormulaMapping)
                res.json(AdminParamFormulaMappingEXE.dataSet)

            }
            else {

                if (await AdminParamFormulaMappingEXE.get(AdminParamFormulaMapping.ID) != null) {
                    AdminParamFormulaMappingEXE.result.assignTo(AdminParamFormulaMapping)
                }
                res.json(AdminParamFormulaMapping.toJson())
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
            let AdminParamFormulaMapping = new AdminParamFormulaMappingClass.AdminParamFormulaMappingVO();
            let AdminParamFormulaMappingEXE = new AdminParamFormulaMappingClass.AdminParamFormulaMappingEXE(connDetail);
            res.status(201)
            if (req.rawHeaders.includes('application/json') && Object.keys(req.body).length > 0) {
                AdminParamFormulaMapping.jsonAssignToAttr(req.body)
            }
            else {
                AdminParamFormulaMapping.jsonAssignToAttr(req.query)
            }
            // console.table([AdminParamFormulaMapping.toJson(),AdminParamFormulaMapping.toJson()])
            if (await AdminParamFormulaMappingEXE.add(AdminParamFormulaMapping) !== null) {
                AdminParamFormulaMappingEXE.result.assignTo(AdminParamFormulaMapping)
                res.json(AdminParamFormulaMapping.toJson())

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
            let AdminParamFormulaMapping = new AdminParamFormulaMappingClass.AdminParamFormulaMappingVO();
            let AdminParamFormulaMappingEXE = new AdminParamFormulaMappingClass.AdminParamFormulaMappingEXE(connDetail);
            res.status(201)
            if (req.rawHeaders.includes('application/json') && Object.keys(req.body).length > 0) {
                AdminParamFormulaMapping.jsonAssignToAttr(req.body)
            }
            else {
                AdminParamFormulaMapping.jsonAssignToAttr(req.query)
            }
            if (await AdminParamFormulaMappingEXE.edit(AdminParamFormulaMapping) !== null) {
                AdminParamFormulaMappingEXE.result.assignTo(AdminParamFormulaMapping)
                res.json(AdminParamFormulaMapping.toJson())
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
            let AdminParamFormulaMapping = new AdminParamFormulaMappingClass.AdminParamFormulaMappingVO();
            let AdminParamFormulaMappingEXE = new AdminParamFormulaMappingClass.AdminParamFormulaMappingEXE(connDetail);
            res.status(200)
            if (req.rawHeaders.includes('application/json') && Object.keys(req.body).length > 0) {
                AdminParamFormulaMapping.jsonAssignToAttr(req.body)
            }
            else {
                AdminParamFormulaMapping.jsonAssignToAttr(req.query)
            }
            res.json({ deleted: await AdminParamFormulaMappingEXE.delete(AdminParamFormulaMapping.ID) })

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

router.route("/admin_param_formula_mapping_listby_topic_api")
    .get(async (req, res) => {
        try {
            let AdminParamFormulaMappingEXE = new AdminParamFormulaMappingClass.AdminParamFormulaMappingEXE(connDetail);
            let dataReq
            if (req.rawHeaders.includes('application/json') && Object.keys(req.body).length > 0) {
                dataReq = req.body
            }
            else {
                dataReq = req.query
            }

            await AdminParamFormulaMappingEXE.listby_topic(dataReq.ID_NCRAutoTopic)
            res.json(AdminParamFormulaMappingEXE.dataSet)


        } catch (error) {
            res.status(404)
            res.json({})
            throw error
        }

    })

module.exports = router;
