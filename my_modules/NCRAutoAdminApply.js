/*
###############################################################################
#                                                                             #
#    Generate By Genarate Model : Ver 1.0.0 (Developed by Adisorn Vongrod)    #
#                                                                             #
###############################################################################
*/
const BaseClass = require('./BaseClass')
const mssql = require("mssql");
class NCRAutoAdminApplyVO extends BaseClass.BaseVO {
    constructor() {
        super()
        this._ID = 0
        this._ID_ProductItem = 0
        this._ID_NCRAutoAdminTopic = 0
        this._ID_NCRAutoAdminProjectApply = 0
        this._StartTime = new Date()
        this._EndTime = new Date()
        this._ID_EmployeeRequest = 0
        this._Reason = ''
        this._Remark = ''
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

    get ID_ProductItem() {
        return parseInt(this._ID_ProductItem);
    }
    set ID_ProductItem(value) {
        this._ID_ProductItem = parseInt(value)
    }

    get ID_NCRAutoAdminTopic() {
        return parseInt(this._ID_NCRAutoAdminTopic);
    }
    set ID_NCRAutoAdminTopic(value) {
        this._ID_NCRAutoAdminTopic = parseInt(value)
    }

    get ID_NCRAutoAdminProjectApply() {
        return parseInt(this._ID_NCRAutoAdminProjectApply);
    }
    set ID_NCRAutoAdminProjectApply(value) {
        this._ID_NCRAutoAdminProjectApply = parseInt(value)
    }


    get StartTime() {
        return this._StartTime;
    }
    set StartTime(value) {
        this._StartTime = value
    }

    get EndTime() {
        return this._EndTime;
    }
    set EndTime(value) {
        this._EndTime = value
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

    get Reason() {
        return this._Reason;
    }
    set Reason(value) {
        this._Reason = value
    }

    get ID_EmployeeRequest() {
        return parseInt(this._ID_EmployeeRequest);
    }
    set ID_EmployeeRequest(value) {
        this._ID_EmployeeRequest = parseInt(value)
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


class NCRAutoAdminApplyEXE extends BaseClass.BaseEXE {
    constructor(connDetail) {
        super(connDetail)
        this.result = new NCRAutoAdminApplyVO()
    }

    async get(ID) {
        try {
            let pool = await this.db.connect(this.connDetail);
            let request = await pool.request()
                .input('ID', ID)
                .execute('ncr_auto_admin_apply_get');
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
            this.logErrorExec('****** Error ncr_auto_admin_apply_get : ' + error + '******')
            this.dataSet = []
            return null
        }

    }

    async add(DataVO) {

        try {
            let pool = await this.db.connect(this.connDetail);
            let request = await pool.request()
                .input('ProcessNo', DataVO.ProcessNo)
                .input('ProcessCaseNo', DataVO.ProcessCaseNo)
                .input('IsDry', DataVO.IsDry)
                .input('ConditionDetial_EN', DataVO.ConditionDetial_EN)
                .input('StartTime', DataVO.StartTime)
                .input('EndTime', DataVO.EndTime)
                .input('Reason', DataVO.Reason)
                .input('ID_EmployeeRequest', DataVO.ID_EmployeeRequest)
                .input('Remark', DataVO.Remark)
                .input('Detail', DataVO.Detail)
                .input('AddBy', DataVO.AddBy)
                .execute('ncr_auto_admin_apply_project_add');
            this.dataSet = request.recordsets[0];
            let ID = request.recordsets[0][0].ID
            return this.get(ID)
        }
        catch (error) {
            this.logErrorExec('****** Error ncr_auto_admin_apply_project_add : ' + error + '******')
            this.dataSet = []
        }

    }

    async addAll(DataVOList) {
        return new Promise(async (resolve, reject) => {
            try {
                DataVOList.forEach(async (DataVO) => {
                    // console.table([DataVO])
                    let pool = await this.db.connect(this.connDetail);
                    let request = await pool.request()
                        .input('ID_ProductItem', DataVO.ID_ProductItem)
                        .input('ID_NCRAutoAdminTopic', DataVO.ID_NCRAutoAdminTopic)
                        .input('ID_NCRAutoAdminProjectApply', DataVO.ID_NCRAutoAdminProjectApply)
                        .input('StartTime', DataVO.StartTime)
                        .input('EndTime', DataVO.EndTime)
                        // .input('ID_EmployeeRequest', DataVO.ID_EmployeeRequest)
                        .input('ID_EmployeeRequest', 0)
                        .input('Reason', DataVO.Reason)
                        .input('Remark', DataVO.Remark)
                        .input('Detail', DataVO.Detail)
                        .input('AddBy', DataVO.AddBy)
                        .execute('ncr_auto_admin_apply_add');
                    // this.dataSet = request.recordsets[0];
                    // let ID = request.recordsets[0][0].ID
                });
                // console.log(`ID Add : ${ID}`)
                // return this.get(ID)
                resolve(true)

            }
            catch (error) {
                this.logErrorExec('****** Error ncr_auto_admin_apply_add : ' + error + '******')
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
                .input('StartTime', DataVO.StartTime)
                .input('EndTime', DataVO.EndTime)
                .input('ID_EmployeeRequest', DataVO.ID_EmployeeRequest)
                .input('Reason', DataVO.Reason)
                .input('Remark', DataVO.Remark)
                .input('Detail', DataVO.Detail)
                .input('UpdateBy', DataVO.UpdateBy)
                .execute('ncr_auto_admin_apply_edit');

            return this.get(DataVO.ID)
        }
        catch (error) {
            this.logErrorExec('****** Error ncr_auto_admin_apply_edit : ' + error + '******')
            this.dataSet = []
            return null
        }
     
    }

    async delete(ID) {
        try {
            let pool = await this.db.connect(this.connDetail);
            let request = await pool.request()
                .input('ID', ID)
                
                .execute('ncr_auto_admin_apply_delete');

            return true

        } catch (error) {
            this.logErrorExec('****** Error ncr_auto_admin_apply_delete : ' + error + '******')
            return false
        }
    }

    async search(DataVO) {
        try {
            console.log(DataVO.toJson())
            let pool = await this.db.connect(this.connDetail);
            let request = await pool.request()
                .input('ID_ProductItem', DataVO.ID_ProductItem)
                .input('ID_NCRAutoAdminTopic', DataVO.ID_NCRAutoAdminTopic)
                .input('ID_NCRAutoAdminProjectApply', DataVO.ID_NCRAutoAdminProjectApply)
                .input('StartTime', DataVO.StartTime)
                .input('EndTime', DataVO.EndTime)
                .input('ID_EmployeeRequest', DataVO.ID_EmployeeRequest)
                .input('Reason', DataVO.Reason)
                .input('ID_Admin', DataVO.AddBy)
                
                .execute('ncr_auto_admin_apply_search');
            this.dataSet = request.recordsets[0];
        }
        catch (error) {
            this.logErrorExec('****** Error ncr_auto_admin_apply_search : ' + error + '******')
            this.dataSet = []
        }
        return this.dataSet
    }

    async product_item_list(Project,ProductItemNo,ProductType) {
        try {
            let pool = await this.db.connect(this.connDetail);
            let request = await pool.request()
                .input('Project', Project)
                .input('ProductItemNo', ProductItemNo)
                .input('ProductType', ProductType)
                .execute('product_item_list');
            this.dataSet = request.recordsets[0];
        }
        catch (error) {
            this.logErrorExec('****** Error product_item_list : ' + error + '******')
            this.dataSet = []
        }
        return this.dataSet
    }


}

module.exports.NCRAutoAdminApplyVO = NCRAutoAdminApplyVO
module.exports.NCRAutoAdminApplyEXE = NCRAutoAdminApplyEXE
