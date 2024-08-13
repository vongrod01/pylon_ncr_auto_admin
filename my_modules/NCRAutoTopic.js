/*
###############################################################################
#                                                                             #
#    Generate By Genarate Model : Ver 1.0.0 (Developed by Adisorn Vongrod)    #
#                                                                             #
###############################################################################
*/
const BaseClass = require('./BaseClass')
const mssql = require("mssql");
class NCRAutoTopicVO extends BaseClass.BaseVO {
    constructor() {
        super()
        this._ID = 0
        this._ProcessNo = 0
        this._ProcessCaseNo = 0
        this._ConditionDetial_TH = ''
        this._ConditionDetial_EN = ''
        this._NCR_Message_TH = ''
        this._NCR_Message_EN = ''
        this._Formula = ''
        this._Active = 0
        this._Ready = 0
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

    get ProcessNo() {
        return parseInt(this._ProcessNo);
    }
    set ProcessNo(value) {
        this._ProcessNo = parseInt(value)
    }

    get ProcessCaseNo() {
        return parseInt(this._ProcessCaseNo);
    }
    set ProcessCaseNo(value) {
        this._ProcessCaseNo = parseInt(value)
    }

    get ConditionDetial_TH() {
        return this._ConditionDetial_TH;
    }
    set ConditionDetial_TH(value) {
        this._ConditionDetial_TH = value
    }

    get ConditionDetial_EN() {
        return this._ConditionDetial_EN;
    }
    set ConditionDetial_EN(value) {
        this._ConditionDetial_EN = value
    }

    get NCR_Message_TH() {
        return this._NCR_Message_TH;
    }
    set NCR_Message_TH(value) {
        this._NCR_Message_TH = value
    }

    get NCR_Message_EN() {
        return this._NCR_Message_EN;
    }
    set NCR_Message_EN(value) {
        this._NCR_Message_EN = value
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

    get Formula() {
        return this._Formula;
    }
    set Formula(value) {
        this._Formula = value
    }

    get Active() {
        return parseInt(this._Active);
    }
    set Active(value) {
        this._Active = parseInt(value)
    }

    get Ready() {
        return parseInt(this._Ready);
    }
    set Ready(value) {
        this._Ready = parseInt(value)
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


class NCRAutoTopicEXE extends BaseClass.BaseEXE {
    constructor(connDetail) {
        super(connDetail)
        this.result = new NCRAutoTopicVO()
    }

    async get(ID) {
        try {
            let pool = await this.db.connect(this.connDetail);
            let request = await pool.request()
                .input('ID', ID)
                .execute('ncr_auto_topic_get');
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
            this.logErrorExec('****** Error ncr_auto_topic_get : ' + error + '******')
            this.dataSet = []
            return null
        }
        // try {

        //     await this.callSp('ncr_auto_topic_get', [ID])
        //     if (this.dataSet.length > 0) {
        //         this.result.jsonAssignToAttr(this.dataSet[0])
        //         return this.result
        //     }
        //     else {
        //         return null
        //     }
        // } catch (error) {
        //     this.logErrorExec('****** Error ncr_auto_topic_get : ' + error + '******')
        //     this.dataSet = []
        //     return null
        // }
    }

    async add(DataVO) {

        try {
            let pool = await this.db.connect(this.connDetail);
            let request = await pool.request()
                .input('ProcessNo', DataVO.ProcessNo)
                .input('ProcessCaseNo', DataVO.ProcessCaseNo)
                .input('ConditionDetial_TH', DataVO.ConditionDetial_TH)
                .input('ConditionDetial_EN', DataVO.ConditionDetial_EN)
                .input('NCR_Message_TH', DataVO.NCR_Message_TH)
                .input('NCR_Message_EN', DataVO.NCR_Message_EN)
                .input('Formula', DataVO.Formula)
                .input('Active', DataVO.Active)
                .input('Remark', DataVO.Remark)
                .input('Detail', DataVO.Detail)
                .input('AddBy', DataVO.AddBy)
                .execute('ncr_auto_topic_add');
            this.dataSet = request.recordsets[0];
            let ID = request.recordsets[0][0].ID
            return this.get(ID)
        }
        catch (error) {
            this.logErrorExec('****** Error ncr_auto_topic_add : ' + error + '******')
            this.dataSet = []
        }

    }

    async edit(DataVO) {
        try {
            let pool = await this.db.connect(this.connDetail);
            let request = await pool.request()
                .input('ID', DataVO.ID)
                .input('ProcessNo', DataVO.ProcessNo)
                .input('ProcessCaseNo', DataVO.ProcessCaseNo)
                .input('ConditionDetial_TH', DataVO.ConditionDetial_TH)
                .input('ConditionDetial_EN', DataVO.ConditionDetial_EN)
                .input('NCR_Message_TH', DataVO.NCR_Message_TH)
                .input('NCR_Message_EN', DataVO.NCR_Message_EN)
                .input('Formula', DataVO.Formula)
                .input('Active', DataVO.Active)
                .input('Remark', DataVO.Remark)
                .input('Detail', DataVO.Detail)
                .input('UpdateBy', DataVO.UpdateBy)
                .execute('ncr_auto_topic_edit');

            return this.get(DataVO.ID)
        }
        catch (error) {
            this.logErrorExec('****** Error ncr_auto_topic_edit : ' + error + '******')
            this.dataSet = []
            return null
        }
        // try {
        //     let params = [
        //         DataVO.ID,
        //         DataVO.ProcessNo,
        //         DataVO.ProcessCaseNo,
        //         DataVO.ConditionDetial_TH,
        //         DataVO.ConditionDetial_EN,
        //         DataVO.NCR_Message_TH,
        //         DataVO.InspectedQTY,
        //         DataVO.Detail,
        //         DataVO.Formula,
        //         DataVO.Active,
        //         // DataVO.AddWhen,
        //         // DataVO.UpdateWhen,
        //         DataVO.AddBy,
        //         DataVO.UpdateBy,

        //     ]
        //     await this.callSp('ncr_auto_topic_edit', params)
        //     let ID = this.paramsOut.Param1
        //     return this.get(ID)

        // } catch (error) {
        //     this.logErrorExec('****** Error ncr_auto_topic_edit : ' + error + '******')
        //     this.dataSet = []
        //     return null
        // }
    }

    async delete(ID) {
        try {
            let pool = await this.db.connect(this.connDetail);
            let request = await pool.request()
                .input('ID', ID)
                
                .execute('ncr_auto_topic_delete');

            return true

        } catch (error) {
            this.logErrorExec('****** Error ncr_auto_topic_delete : ' + error + '******')
            return false
        }
    }

    async search(DataVO) {
        try {
            let pool = await this.db.connect(this.connDetail);
            let request = await pool.request()
                .input('ProcessNo', DataVO.ProcessNo)
                .input('ProcessCaseNo', DataVO.ProcessCaseNo)
                .input('ConditionDetial_TH', DataVO.ConditionDetial_TH)
                .input('ConditionDetial_EN', DataVO.ConditionDetial_EN)
                .input('NCR_Message_TH', DataVO.NCR_Message_TH)
                .input('NCR_Message_EN', DataVO.NCR_Message_EN)
                .input('Formula', DataVO.Formula)
                .input('Active', DataVO.Active)
                .execute('ncr_auto_topic_search');
            this.dataSet = request.recordsets[0];
        }
        catch (error) {
            this.logErrorExec('****** Error ncr_auto_topic_search : ' + error + '******')
            this.dataSet = []
        }
        return this.dataSet
    }


}

module.exports.NCRAutoTopicVO = NCRAutoTopicVO
module.exports.NCRAutoTopicEXE = NCRAutoTopicEXE
