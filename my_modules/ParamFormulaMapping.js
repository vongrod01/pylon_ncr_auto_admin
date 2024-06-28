/*
###############################################################################
#                                                                             #
#    Generate By Genarate Model : Ver 1.0.0 (Developed by Adisorn Vongrod)    #
#                                                                             #
###############################################################################
*/
const BaseClass = require('./BaseClass')
const mssql = require("mssql");
class ParamFormulaMappingVO extends BaseClass.BaseVO {
    constructor() {
        super()
        this._ID = 0
        this._ID_NCRAutoTopic = 0
        this._ParamName = ''
        this._ParamType = ''
        this._IsConst = 0
        this._ConstVal = ''
        this._Active = 0
        this._Detail = ''
        this._AddDate = new Date()
        this._UpdateDate = new Date()
        this._AddBy = 0
        this._UpdateBy = new Date()
        this._DeleteBy = 0
        this._DeleteDate = new Date()
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

    get ParamName() {
        return this._ParamName;
    }
    set ParamName(value) {
        this._ParamName = value
    }

    get ParamType() {
        return this._ParamType;
    }
    set ParamType(value) {
        this._ParamType = value
    }

    get IsConst() {
        return parseInt(this._IsConst);
    }
    set IsConst(value) {
        this._IsConst = parseInt(value)
    }

    get ConstVal() {
        return this._ConstVal;
    }
    set ConstVal(value) {
        this._ConstVal = value
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

    get AddDate() {
        return this._AddDate;
    }
    set AddDate(value) {
        this._AddDate = value
    }

    get UpdateDate() {
        return this._UpdateDate;
    }
    set UpdateDate(value) {
        this._UpdateDate = value
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

    get DeleteDate() {
        return this._DeleteDate;
    }
    set DeleteDate(value) {
        this._DeleteDate = value
    }

}


class ParamFormulaMappingEXE extends BaseClass.BaseEXE {
    constructor(connDetail) {
        super(connDetail)
        this.result = new ParamFormulaMappingVO()
    }

    async get(ID) {
        try {
            let pool = await this.db.connect(this.connDetail);
            let request = await pool.request()
                .input('ID', ID)
                .execute('param_formula_mapping_get');
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

        try {
            let pool = await this.db.connect(this.connDetail);
            let request = await pool.request()
                .input('ID_NCRAutoTopic', DataVO.ID_NCRAutoTopic)
                .input('ParamName', DataVO.ParamName)
                .input('ParamType', DataVO.ParamType)
                .input('IsConst', DataVO.IsConst)
                .input('ConstVal', DataVO.ConstVal)
                .input('Active', DataVO.Active)
                .input('Detail', DataVO.Detail)
                .input('AddBy', DataVO.AddBy)
                .execute('param_formula_mapping_add');
            this.dataSet = request.recordsets[0];
            let ID = request.recordsets[0][0].ID
            console.log('ID = ' + ID)
            return this.get(ID)
        }
        catch (error) {
            this.logErrorExec('****** Error param_formula_mapping_add : ' + error + '******')
            this.dataSet = []
        }

    }

    async edit(DataVO) {
        try {
            let pool = await this.db.connect(this.connDetail);
            let request = await pool.request()
                .input('ID', DataVO.ID)
                .input('ParamName', DataVO.ParamName)
                .input('ParamType', DataVO.ParamType)
                .input('IsConst', DataVO.IsConst)
                .input('ConstVal', DataVO.ConstVal)
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
        //         DataVO.IsConst,
        //         DataVO.ConstVal,
        //         DataVO.InspectedQTY,
        //         DataVO.Detail,
        //         DataVO.Formula,
        //         DataVO.Active,
        //         // DataVO.AddDate,
        //         // DataVO.UpdateDate,
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

    async search(DataVO) {
        try {
            let pool = await this.db.connect(this.connDetail);
            let request = await pool.request()
                .input('ID_NCRAutoTopic', DataVO.ID_NCRAutoTopic)
                .input('ParamName', DataVO.ParamName)
                .input('ParamType', DataVO.ParamType)
                .input('IsConst', DataVO.IsConst)
                .input('ConstVal', DataVO.ConstVal)
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

    async listby_topic(ID_NCRAutoTopic) {
        try {
            let pool = await this.db.connect(this.connDetail);
            let request = await pool.request()
                .input('ID_NCRAutoTopic', ID_NCRAutoTopic)
               
                .execute('param_formula_mapping_listby_topic');
            this.dataSet = request.recordsets[0];
            // console.log('dataset---------------> ', this.dataSet)
        }
        catch (error) {
            this.logErrorExec('****** Error param_formula_mapping_listby_topic : ' + error + '******')
            this.dataSet = []
        }
        
        return this.dataSet
    }


}

module.exports.ParamFormulaMappingVO = ParamFormulaMappingVO
module.exports.ParamFormulaMappingEXE = ParamFormulaMappingEXE
