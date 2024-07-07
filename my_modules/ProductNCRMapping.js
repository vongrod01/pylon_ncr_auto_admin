/*
###############################################################################
#                                                                             #
#    Generate By Genarate Model : Ver 1.0.0 (Developed by Adisorn Vongrod)    #
#                                                                             #
###############################################################################
*/
const BaseClass = require('./BaseClass')
const mssql = require("mssql");
class ProductNCRMappingVO extends BaseClass.BaseVO {
    constructor() {
        super()
        this._ID = 0
        this._ID_NCRAutoTopic = 0

        this._ID_Product = 0
        this._IsDry = 0
        this._Active = 0
        this._Detail = ''
        this._AddWhen = new Date()
        this._UpdateWhen = new Date()
        this._AddBy = 0
        this._UpdateBy = new Date()
        this._DeleteBy = 0
        this._DeleteWhen = new Date()
    }

    get ID() {
        return parseInt(this._ID);
    }
    set ID(value) {
        this._ID = parseInt(value)
    }

    get ID_NCRAutoTopic() {
        return parseInt(this._ID_NCRAutoTopic);
    }
    set ID_NCRAutoTopic(value) {
        this._ID_NCRAutoTopic = parseInt(value)
    }



    get ID_Product() {
        return parseInt(this._ID_Product);
    }
    set ID_Product(value) {
        this._ID_Product = parseInt(value)
    }

    get IsDry() {
        return parseInt(this._IsDry);
    }
    set IsDry(value) {
        this._IsDry = parseInt(value)
    }

    get Remark() {
        return this._Remark;
    }
    set Remark(value) {
        this._Remark = value
    }

    get Detail() {
        return this._Detail;
    }
    set Detail(value) {
        this._Detail = value
    }

    get Active() {
        return parseInt(this._Active);
    }
    set Active(value) {
        this._Active = parseInt(value)
    }

    get AddWhen() {
        return this._AddWhen;
    }
    set AddWhen(value) {
        this._AddWhen = value
    }

    get UpdateWhen() {
        return this._UpdateWhen;
    }
    set UpdateWhen(value) {
        this._UpdateWhen = value
    }

    get AddBy() {
        return this._AddBy;
    }
    set AddBy(value) {
        this._AddBy = value
    }

    get UpdateBy() {
        return this._UpdateBy;
    }
    set UpdateBy(value) {
        this._UpdateBy = value
    }

    get DeleteBy() {
        return this._DeleteBy;
    }
    set DeleteBy(value) {
        this._DeleteBy = value
    }

    get DeleteWhen() {
        return this._DeleteWhen;
    }
    set DeleteWhen(value) {
        this._DeleteWhen = value
    }

}


class ProductNCRMappingEXE extends BaseClass.BaseEXE {
    constructor(connDetail) {
        super(connDetail)
        this.result = new ProductNCRMappingVO()
    }

    async get(ID) {
        try {
            let pool = await this.db.connect(this.connDetail);
            let request = await pool.request()
                .input('ID', ID)
                .execute('product_ncr_mapping_get');
            this.dataSet = request.recordsets[0];

            if (this.dataSet.length > 0) {
                this.result.jsonAssignToAttr(this.dataSet[0])
                return this.result
            }
            else {
                return null
            }
        }
        catch (error) {
            this.logErrorExec('****** Error param_formula_mapping_get : ' + error + '******')
            this.dataSet = []
            return null
        }
    }

    async add(DataVO) {
        return new Promise(async (resolve, reject) => {
            try {
                let pool = await this.db.connect(this.connDetail);
                let request = await pool.request()
                    .input('ID_Product', DataVO.ID_Product)
                    .input('ID_NCRAutoTopic', DataVO.ID_NCRAutoTopic)
                    .input('IsDry', DataVO.IsDry)
                    .input('Active', DataVO.Active)
                    .input('Detail', DataVO.Detail)
                    .input('AddBy', DataVO.AddBy)
                    .execute('product_ncr_mapping_add');
                this.dataSet = request.recordsets[0];
                let ID = request.recordsets[0][0].ID
                resolve(this.get(ID))

            }
            catch (error) {
                this.logErrorExec('****** Error product_ncr_mapping_add : ' + error + '******')
                this.dataSet = []
                reject(error)
            }
        })


    }
    async addAll(DataVOList) {
        return new Promise(async (resolve, reject) => {
            try {
                DataVOList.forEach(async (DataVO) => {
                    // console.table([DataVO])

                    let pool = await this.db.connect(this.connDetail);
                    let request = await pool.request()
                        .input('ID_Product', DataVO.ID_Product)
                        .input('ID_NCRAutoTopic', DataVO.ID_NCRAutoTopic)
                        .input('IsDry', DataVO.IsDry)
                        .input('Active', DataVO.Active)
                        .input('Detail', DataVO.Detail)
                        .input('AddBy', DataVO.AddBy)
                        .execute('product_ncr_mapping_add');
                    // this.dataSet = request.recordsets[0];
                    // let ID = request.recordsets[0][0].ID
                });
                // console.log(`ID Add : ${ID}`)
                // return this.get(ID)
                resolve(true)

            }
            catch (error) {
                this.logErrorExec('****** Error product_ncr_mapping_add : ' + error + '******')
                this.dataSet = []
                reject(error)
            }
        })


    }

    async edit(DataVO) {
        try {
            let pool = await this.db.connect(this.connDetail);

            let request = await pool.request()
                .input('ID', DataVO.ID)
                .input('ParamName', DataVO.ParamName)
                .input('ParamType', DataVO.ParamType)
                .input('ID_Product', DataVO.ID_Product)
                .input('IsDry', DataVO.IsDry)
                .input('Active', DataVO.Active)
                .input('Detail', DataVO.Detail)
                .input('UpdateBy', DataVO.UpdateBy)
                .execute('param_formula_mapping_edit');

            return this.get(DataVO.ID)
        }
        catch (error) {
            this.logErrorExec('****** Error param_formula_mapping_edit : ' + error + '******')
            this.dataSet = []
            return null
        }
        // try {
        //     let params = [
        //         DataVO.ID,
        //         DataVO.ID_NCRAutoTopic,
        //         DataVO.ParamName,
        //         DataVO.ParamType,
        //         DataVO.ID_Product,
        //         DataVO.IsDry,
        //         DataVO.InspectedQTY,
        //         DataVO.Detail,
        //         DataVO.Formula,
        //         DataVO.Active,
        //         // DataVO.AddWhen,
        //         // DataVO.UpdateWhen,
        //         DataVO.AddBy,
        //         DataVO.UpdateBy,

        //     ]
        //     await this.callSp('param_formula_mapping_edit', params)
        //     let ID = this.paramsOut.Param1
        //     return this.get(ID)

        // } catch (error) {
        //     this.logErrorExec('****** Error param_formula_mapping_edit : ' + error + '******')
        //     this.dataSet = []
        //     return null
        // }
    }

    async delete(ID) {
        try {
            let pool = await this.db.connect(this.connDetail);
            let request = await pool.request()
                .input('ID', ID)

                .execute('param_formula_mapping_delete');

            return true

        } catch (error) {
            this.logErrorExec('****** Error param_formula_mapping_delete : ' + error + '******')
            return false
        }
    }
    async clearby_product(ID_Product,IsDry) {
        try {
            let pool = await this.db.connect(this.connDetail);
            let request = await pool.request()
                .input('ID_Product', ID_Product)
                .input('IsDry', IsDry)

                .execute('product_ncr_mapping_clearby_product');

            return true

        } catch (error) {
            this.logErrorExec('****** Error product_ncr_mapping_clearby_product : ' + error + '******')
            return false
        }
    }

    async search(DataVO) {
        try {
            let pool = await this.db.connect(this.connDetail);
            let request = await pool.request()
                .input('ID_NCRAutoTopic', DataVO.ID_NCRAutoTopic)
                .input('ParamName', DataVO.ParamName)
                .input('ParamType', DataVO.ParamType)
                .input('ID_Product', DataVO.ID_Product)
                .input('IsDry', DataVO.IsDry)
                .input('Formula', DataVO.Formula)
                .input('Active', DataVO.Active)
                .execute('param_formula_mapping_search');
            this.dataSet = request.recordsets[0];
            // console.log('dataset---------------> ', this.dataSet)
        }
        catch (error) {
            this.logErrorExec('****** Error param_formula_mapping_search : ' + error + '******')
            this.dataSet = []
        }

        return this.dataSet
    }

    async listof_product() {
        try {
            let pool = await this.db.connect(this.connDetail);
            let request = await pool.request()


                .execute('product_ncr_mapping_listof_product');
            this.dataSet = request.recordsets[0];
            // console.log('dataset---------------> ', this.dataSet)
        }
        catch (error) {
            this.logErrorExec('****** Error product_ncr_mapping_listof_product : ' + error + '******')
            this.dataSet = []
        }

        return this.dataSet
    }
    async ncr_listby_product(ID_Product,IsDry) {
        try {
            let pool = await this.db.connect(this.connDetail);
            let request = await pool.request()
                .input('ID_Product', ID_Product)
                .input('IsDry', IsDry)

                .execute('product_ncr_mapping_ncr_listby_product');
            this.dataSet = request.recordsets[0];
            // console.log('dataset---------------> ', this.dataSet)
        }
        catch (error) {
            this.logErrorExec('****** Error product_ncr_mapping_ncr_listby_product : ' + error + '******')
            this.dataSet = []
        }

        return this.dataSet
    }


}

module.exports.ProductNCRMappingVO = ProductNCRMappingVO
module.exports.ProductNCRMappingEXE = ProductNCRMappingEXE
