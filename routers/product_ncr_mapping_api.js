const express = require("express");
const router = express.Router();
const fs = require("fs");
const ProductNCRMappingClass = require('../my_modules/ProductNCRMapping')

let systemConfig = JSON.parse(fs.readFileSync("SystemConfig.json", "utf-8"));
let connDetail = systemConfig.database[0]

router.route("/product_ncr_mapping_api")

    .get(async (req, res) => {
        // Get, Search
        try {
            let ProductNCRMapping = new ProductNCRMappingClass.ProductNCRMappingVO();
            let ProductNCRMappingEXE = new ProductNCRMappingClass.ProductNCRMappingEXE(connDetail);
            res.status(200)
            if (req.rawHeaders.includes('application/json') && Object.keys(req.body).length > 0) {
                ProductNCRMapping.jsonAssignToAttr(req.body)
            }
            else {
                ProductNCRMapping.jsonAssignToAttr(req.query)

            }
            if (ProductNCRMapping.ID == 0 || ProductNCRMapping.ID === null) {
                await ProductNCRMappingEXE.search(ProductNCRMapping)
                res.json(ProductNCRMappingEXE.dataSet)

            }
            else {

                if (await ProductNCRMappingEXE.get(ProductNCRMapping.ID) != null) {
                    ProductNCRMappingEXE.result.assignTo(ProductNCRMapping)
                }
                res.json(ProductNCRMapping.toJson())
            }
        } catch (error) {
            res.status(404)
            res.json({})
            throw error
        }

    })
    .post(async (req, res) => {
        // Add
        let dataSet = []
        try {
            let ProductNCRMapping = new ProductNCRMappingClass.ProductNCRMappingVO();
            let ProductNCRMappingEXE = new ProductNCRMappingClass.ProductNCRMappingEXE(connDetail);
            let ID_NCRAutoTopic_List = []
            res.status(201)
            if (req.rawHeaders.includes('application/json') && Object.keys(req.body).length > 0) {
                ProductNCRMapping.jsonAssignToAttr(req.body)
                ID_NCRAutoTopic_List = req.body.ID_NCRAutoTopic_List
            }
            else {
                ProductNCRMapping.jsonAssignToAttr(req.query)
                ID_NCRAutoTopic_List = req.query.ID_NCRAutoTopic_List
            }

            let DataVoSet = []
            try {
                if (await ProductNCRMappingEXE.clearby_product(ProductNCRMapping.ID_Product,ProductNCRMapping.IsDry)){
                    ID_NCRAutoTopic_List.forEach(async (ID_NCRAutoTopic) => {
                        ProductNCRMapping.ID_NCRAutoTopic = ID_NCRAutoTopic
                        DataVoSet.push(ProductNCRMapping.toJson())
                       
                    });
                    await ProductNCRMappingEXE.addAll(DataVoSet)
                    res.json(dataSet)
                }
            } catch (error) {
                res.status(404)
                res.json({})
                throw error
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
            let ProductNCRMapping = new ProductNCRMappingClass.ProductNCRMappingVO();
            let ProductNCRMappingEXE = new ProductNCRMappingClass.ProductNCRMappingEXE(connDetail);
            res.status(201)
            if (req.rawHeaders.includes('application/json') && Object.keys(req.body).length > 0) {
                ProductNCRMapping.jsonAssignToAttr(req.body)
            }
            else {
                ProductNCRMapping.jsonAssignToAttr(req.query)
            }
            if (await ProductNCRMappingEXE.edit(ProductNCRMapping) !== null) {
                ProductNCRMappingEXE.result.assignTo(ProductNCRMapping)
                res.json(ProductNCRMapping.toJson())
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
            let ProductNCRMapping = new ProductNCRMappingClass.ProductNCRMappingVO();
            let ProductNCRMappingEXE = new ProductNCRMappingClass.ProductNCRMappingEXE(connDetail);
            res.status(200)
            if (req.rawHeaders.includes('application/json') && Object.keys(req.body).length > 0) {
                ProductNCRMapping.jsonAssignToAttr(req.body)
            }
            else {
                ProductNCRMapping.jsonAssignToAttr(req.query)
            }
            res.json({ deleted: await ProductNCRMappingEXE.delete(ProductNCRMapping.ID) })

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

router.route("/product_ncr_mapping_list_listof_product")
    .get(async (req, res) => {
        try {
            let ProductNCRMappingEXE = new ProductNCRMappingClass.ProductNCRMappingEXE(connDetail);
            let dataReq
            if (req.rawHeaders.includes('application/json') && Object.keys(req.body).length > 0) {
                dataReq = req.body
            }
            else {
                dataReq = req.query
            }

            await ProductNCRMappingEXE.listof_product()
            res.json(ProductNCRMappingEXE.dataSet)


        } catch (error) {
            res.status(404)
            res.json({})
            throw error
        }

    })
router.route("/product_ncr_mapping_ncr_list_listby_product")
    .get(async (req, res) => {
        try {
            let ProductNCRMappingEXE = new ProductNCRMappingClass.ProductNCRMappingEXE(connDetail);
            let dataReq
            if (req.rawHeaders.includes('application/json') && Object.keys(req.body).length > 0) {
                dataReq = req.body
            }
            else {
                dataReq = req.query
            }

            await ProductNCRMappingEXE.ncr_listby_product(dataReq.ID_Product,dataReq.IsDry)
            res.json(ProductNCRMappingEXE.dataSet)


        } catch (error) {
            res.status(404)
            res.json({})
            throw error
        }

    })

    

module.exports = router;
