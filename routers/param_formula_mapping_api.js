const express = require("express");
const router = express.Router();
const fs = require("fs");
const ParamFormulaMappingClass = require('../my_modules/ParamFormulaMapping')

let systemConfig = JSON.parse(fs.readFileSync("SystemConfig.json", "utf-8"));
let connDetail = systemConfig.database[0]

router.route("/param_formula_mapping_api")

    .get(async (req, res) => {
        // Get, Search
        try {
            let ParamFormulaMapping = new ParamFormulaMappingClass.ParamFormulaMappingVO();
            let ParamFormulaMappingEXE = new ParamFormulaMappingClass.ParamFormulaMappingEXE(connDetail);
            res.status(200)
            if (req.rawHeaders.includes('application/json') && Object.keys(req.body).length > 0) {
                ParamFormulaMapping.jsonAssignToAttr(req.body)
            }
            else {
                ParamFormulaMapping.jsonAssignToAttr(req.query)

            }
            if (ParamFormulaMapping.ID == 0 || ParamFormulaMapping.ID === null) {
                await ParamFormulaMappingEXE.search(ParamFormulaMapping)
                res.json(ParamFormulaMappingEXE.dataSet)

            }
            else {

                if (await ParamFormulaMappingEXE.get(ParamFormulaMapping.ID) != null) {
                    ParamFormulaMappingEXE.result.assignTo(ParamFormulaMapping)
                }
                res.json(ParamFormulaMapping.toJson())
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
            let ParamFormulaMapping = new ParamFormulaMappingClass.ParamFormulaMappingVO();
            let ParamFormulaMappingEXE = new ParamFormulaMappingClass.ParamFormulaMappingEXE(connDetail);
            res.status(201)
            if (req.rawHeaders.includes('application/json') && Object.keys(req.body).length > 0) {
                ParamFormulaMapping.jsonAssignToAttr(req.body)
            }
            else {
                ParamFormulaMapping.jsonAssignToAttr(req.query)
            }
            // console.table([ParamFormulaMapping.toJson(),ParamFormulaMapping.toJson()])
            if (await ParamFormulaMappingEXE.add(ParamFormulaMapping) !== null) {
                ParamFormulaMappingEXE.result.assignTo(ParamFormulaMapping)
                res.json(ParamFormulaMapping.toJson())

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
            let ParamFormulaMapping = new ParamFormulaMappingClass.ParamFormulaMappingVO();
            let ParamFormulaMappingEXE = new ParamFormulaMappingClass.ParamFormulaMappingEXE(connDetail);
            res.status(201)
            if (req.rawHeaders.includes('application/json') && Object.keys(req.body).length > 0) {
                ParamFormulaMapping.jsonAssignToAttr(req.body)
            }
            else {
                ParamFormulaMapping.jsonAssignToAttr(req.query)
            }
            if (await ParamFormulaMappingEXE.edit(ParamFormulaMapping) !== null) {
                ParamFormulaMappingEXE.result.assignTo(ParamFormulaMapping)
                res.json(ParamFormulaMapping.toJson())
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
            let ParamFormulaMapping = new ParamFormulaMappingClass.ParamFormulaMappingVO();
            let ParamFormulaMappingEXE = new ParamFormulaMappingClass.ParamFormulaMappingEXE(connDetail);
            res.status(200)
            if (req.rawHeaders.includes('application/json') && Object.keys(req.body).length > 0) {
                ParamFormulaMapping.jsonAssignToAttr(req.body)
            }
            else {
                ParamFormulaMapping.jsonAssignToAttr(req.query)
            }
            res.json({ deleted: await ParamFormulaMappingEXE.delete(ParamFormulaMapping.ID) })

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

router.route("/param_formula_mapping_listby_topic_api")
    .get(async (req, res) => {
        try {
            let ParamFormulaMappingEXE = new ParamFormulaMappingClass.ParamFormulaMappingEXE(connDetail);
            let dataReq
            if (req.rawHeaders.includes('application/json') && Object.keys(req.body).length > 0) {
                dataReq = req.body
            }
            else {
                dataReq = req.query
            }

            await ParamFormulaMappingEXE.listby_topic(dataReq.ID_NCRAutoTopic)
            res.json(ParamFormulaMappingEXE.dataSet)


        } catch (error) {
            res.status(404)
            res.json({})
            throw error
        }

    })

module.exports = router;
