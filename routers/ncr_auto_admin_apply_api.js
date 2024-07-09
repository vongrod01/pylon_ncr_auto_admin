const express = require("express");
const router = express.Router();
const fs = require("fs");
const NCRAutoAdminApplyClass = require('../my_modules/NCRAutoAdminApply')

let systemConfig = JSON.parse(fs.readFileSync("SystemConfig.json", "utf-8"));
let connDetail = systemConfig.database[0]

router.route("/ncr_auto_admin_apply_api")

    .get(async (req, res) => {
        // Get, Search
        try {
            let NCRAutoAdminApply = new NCRAutoAdminApplyClass.NCRAutoAdminApplyVO();
            let NCRAutoAdminApplyEXE = new NCRAutoAdminApplyClass.NCRAutoAdminApplyEXE(connDetail);
            res.status(200)
            if (req.rawHeaders.includes('application/json') && Object.keys(req.body).length > 0) {
                NCRAutoAdminApply.jsonAssignToAttr(req.body)
            }
            else {
                NCRAutoAdminApply.jsonAssignToAttr(req.query)

            }
            if (NCRAutoAdminApply.ID == 0 || NCRAutoAdminApply.ID === null) {
                await NCRAutoAdminApplyEXE.search(NCRAutoAdminApply)
                res.json(NCRAutoAdminApplyEXE.dataSet)

            }
            else {

                if (await NCRAutoAdminApplyEXE.get(NCRAutoAdminApply.ID) != null) {
                    NCRAutoAdminApplyEXE.result.assignTo(NCRAutoAdminApply)
                }
                res.json(NCRAutoAdminApply.toJson())
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
            let NCRAutoAdminApply = new NCRAutoAdminApplyClass.NCRAutoAdminApplyVO();
            let NCRAutoAdminApplyEXE = new NCRAutoAdminApplyClass.NCRAutoAdminApplyEXE(connDetail);
            let ID_ProductItem_List = []
            res.status(201)
            if (req.rawHeaders.includes('application/json') && Object.keys(req.body).length > 0) {
                NCRAutoAdminApply.jsonAssignToAttr(req.body)
                ID_ProductItem_List = req.body.ID_ProductItem_List
            }
            else {
                NCRAutoAdminApply.jsonAssignToAttr(req.query)
                ID_ProductItem_List = req.query.ID_ProductItem_List
            }
            // console.log(req.body)
            let DataVoSet = []
            ID_ProductItem_List.forEach(ID_ProductItem => {
                NCRAutoAdminApply.ID_ProductItem = ID_ProductItem
                DataVoSet.push(NCRAutoAdminApply.toJson())
            });
            await NCRAutoAdminApplyEXE.addAll(DataVoSet)
            res.json({addAll:'Success'})
        } catch (error) {
            res.status(404)
            res.json({})
            throw error
        }
    })
    .put(async (req, res) => {
        // Edit
        try {
            let NCRAutoAdminApply = new NCRAutoAdminApplyClass.NCRAutoAdminApplyVO();
            let NCRAutoAdminApplyEXE = new NCRAutoAdminApplyClass.NCRAutoAdminApplyEXE(connDetail);
            res.status(201)
            if (req.rawHeaders.includes('application/json') && Object.keys(req.body).length > 0) {
                NCRAutoAdminApply.jsonAssignToAttr(req.body)
            }
            else {
                NCRAutoAdminApply.jsonAssignToAttr(req.query)
            }
            if (await NCRAutoAdminApplyEXE.edit(NCRAutoAdminApply) !== null) {
                NCRAutoAdminApplyEXE.result.assignTo(NCRAutoAdminApply)
                res.json(NCRAutoAdminApply.toJson())
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
            let NCRAutoAdminApply = new NCRAutoAdminApplyClass.NCRAutoAdminApplyVO();
            let NCRAutoAdminApplyEXE = new NCRAutoAdminApplyClass.NCRAutoAdminApplyEXE(connDetail);
            res.status(200)
            if (req.rawHeaders.includes('application/json') && Object.keys(req.body).length > 0) {
                NCRAutoAdminApply.jsonAssignToAttr(req.body)
            }
            else {
                NCRAutoAdminApply.jsonAssignToAttr(req.query)
            }
            res.json({ deleted: await NCRAutoAdminApplyEXE.delete(NCRAutoAdminApply.ID) })

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

router.route("/product_item_list_api")
.get(async (req, res) => {
    try {
        let Project = req.query.Project
        let ProductItemNo = req.query.ProductItemNo
        let ProductType = req.query.ProductType
        let NCRAutoAdminApplyEXE = new NCRAutoAdminApplyClass.NCRAutoAdminApplyEXE(connDetail);
        await NCRAutoAdminApplyEXE.product_item_list(Project,ProductItemNo,ProductType)
        res.json(NCRAutoAdminApplyEXE.dataSet)
    } catch (error) {
        res.status(404)
        res.json({})
        throw error
    }

})
module.exports = router;
