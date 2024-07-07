// let dataSet = []
let objAdminParamFormulaMappingEntry = {
    "ID": 0,
    "ID_NCRAutoAdminTopic": 0,
    "ID_ParamFormulaMapping": 0,
    "ParamName": "",
    "ParamType": "",
    "IsConst": 0,
    "ConstVal": "",
    "Active": 0,
    "Detail": "",
    "AddBy": 0,
    "AddWhen": "",
    "UpdateBy": 0,
    "UpdateWhen": "",
    "DeleteBy": 0,
    "DeleteWhen": "",
}

let dataControlAdminParamFormulaMappingEntry = ''
function clearAdminParamFormulaMappingEntry() {
    objAdminParamFormulaMappingEntry.ParamName = ''
    objAdminParamFormulaMappingEntry.ParamType = 'Boolean'
    objAdminParamFormulaMappingEntry.IsConst = 0
    objAdminParamFormulaMappingEntry.ConstVal = ''
    objAdminParamFormulaMappingEntry.Detail = ''
    objAdminParamFormulaMappingEntry.Active = 1
}


function collectAdminParamFormulaMappingEntry() {
    objAdminParamFormulaMappingEntry.ParamName = document.getElementById('edtAdminParamName_Entry').value
    objAdminParamFormulaMappingEntry.ParamType = document.getElementById('selAdminParamType_Entry').value
    objAdminParamFormulaMappingEntry.IsConst = document.getElementById('chkAdminIsConst_Entry').checked ? 1 : 0
    objAdminParamFormulaMappingEntry.ConstVal = document.getElementById('edtAdminConstVal_Entry').value
    objAdminParamFormulaMappingEntry.Detail = document.getElementById('edtAdminDetail_Entry').value
    objAdminParamFormulaMappingEntry.Active = document.getElementById('chkAdminActive_Entry').checked ? 1 : 0


}

function displayAdminParamFormulaMappingEntry() {

    document.getElementById('edtAdminParamName_Entry').value = objAdminParamFormulaMappingEntry.ParamName
    document.getElementById('selAdminParamType_Entry').value = objAdminParamFormulaMappingEntry.ParamType
    document.getElementById('chkAdminIsConst_Entry').checked = objAdminParamFormulaMappingEntry.IsConst
    document.getElementById('edtAdminConstVal_Entry').value = objAdminParamFormulaMappingEntry.ConstVal
    document.getElementById('edtAdminDetail_Entry').value = objAdminParamFormulaMappingEntry.Detail
    document.getElementById('chkAdminActive_Entry').checked = objAdminParamFormulaMappingEntry.Active

}

async function dataEntry_AdminParamFormulaMapping() {
    // let url = `${myDomain}/ncr_auto_topic_api`
    let method = ''
    if (dataControlAdminParamFormulaMappingEntry === 'Add') {
        method = 'post'
    }
    else if (dataControlAdminParamFormulaMappingEntry === 'Edit') {
        method = 'put'
    }
    else if (dataControlAdminParamFormulaMappingEntry === 'Search' || dataControlAdminParamFormulaMappingEntry === 'Get') {
        method = 'get'
    }
    else if (dataControlAdminParamFormulaMappingEntry === 'Delete') {
        method = 'delete'
    }
    if (dataControlAdminParamFormulaMappingEntry !== '') {
        collectAdminParamFormulaMappingEntry()
        await reqAndRes(urlAdminParamFormulaMapping, method, objAdminParamFormulaMappingEntry, function (dataRes) {
            // console.log(dataRes)
            if (method !== 'delete') {

                document.getElementById('btnParamFormulaMappingClose').click()
            }
            document.getElementById('modal-title-label-control').innerHTML = 'NONE'
            showDataAdminParam(objAdminParamFormulaMappingEntry.ID_NCRAutoAdminTopic)
        })
    }
}
//     dataControlAdminParamFormulaMappingEntry = ''
// }
// async function displayNCRAutoTopic(){
//     reqAndRes(urlNCRAutoTopic,'GET',{ID:g_ID_NCRAutoAdminTopic},(dataRes)=>{
//         document.getElementById('edtTopic').value = `${dataRes.ProcessNo}.${dataRes.ProcessCaseNo}`
//         document.getElementById('edtConditionDetail').value = dataRes.ConditionDetial_TH
//         document.getElementById('edtFormula').value = dataRes.Formula
//         document.getElementById('edtFormula2').value = dataRes.Formula

//     })
// }
// async function showDataSearch() {
//     $("#ncr_param_table").DataTable().destroy()
//     let innerHTML = ''
//     let tbody = document.getElementById('ncr_param_body')
//     tbody.innerHTML = innerHTML

//     let rows = []
//     await reqAndRes(urlParamFormulaMapping_ListByTopic, 'GET', {ID_NCRAutoAdminTopic:g_ID_NCRAutoAdminTopic}, function (dataRes) {
//         dataSet = dataRes

//         dataSet.forEach(data => {
//             rows.push(
//                 [
//                     data.ID,
//                     data.ParamName,
//                     data.ParamType,
//                     data.IsConst,
//                     data.ConstVal,
//                     data.Active,
//                     data.Detail,
//                     data.UpdateWhen,


//                 ]
//             )
//         });
//     })

//     $("#ncr_param_table").dataTable({
//         data: rows,
//         // createdRow: function (row, data, dataIndex) {
//         //     // หลังจากสร้าง table เสร็จ
//         // },
//         ordering: false,
//         "lengthMenu": [
//             [25, 50, 100, -1],
//             [25, 50, 100, "All"]
//         ],
//         "pageLength": 25,
//         select: {
//             items: 'row',

//         },
//     })

//     // tbody.innerHTML = innerHTML


//     // $("#ncr_param_table").dataTable({
//     //     ordering: false,
//     //     "lengthMenu": [
//     //         [25, 50, 100, -1],
//     //         [25, 50, 100, "All"]
//     //     ],
//     //     "pageLength": 25,
//     //     select: {
//     //         items: 'row',

//     //     },

//     // })

//     // #tbTableTroubleAndActionHistory_wrapper <---- datatable genarate ขึ้นมา
//     document.getElementById('ncr_param_table_wrapper').classList.add('p-2')
//     // let thead = document.querySelector('#tbTableTroubleAndActionHistory thead')
//     let row = document.querySelectorAll('#ncr_param_table_wrapper .row')

//     row[1].classList.add('mb-2', 'mt-2')
//     row[1].querySelector('div').id = 'boxParamFormulaMappingTable'
//     row[1].classList.remove('row')

//     document.querySelectorAll('#ncr_param_table_wrapper thead tr th.sorting_asc').forEach(th => {
//         th.classList.remove('sorting_asc')
//     });

//     document.querySelectorAll('#ncr_param_body tr td')[0].click()
// }


// function startPage() {
//     // clearParamFormulaMappingSearch()
//     displayNCRAutoTopic()
//     showDataSearch()
// }

// document.getElementById('btnParamFormulaMappingAdd').onclick = function () {
//     dataControlAdminParamFormulaMappingEntry = 'Add'
//     document.getElementById('modal-title-label-control').innerHTML = 'ADD'
//     clearParamFormulaMappingEntry()
//     displayParamFormulaMappingEntry()
// }
document.getElementById('btnAdminParamFormulaMappingEdit').onclick = function () {
    try {

        reqAndRes(urlAdminParamFormulaMapping, 'GET', objAdminParamFormulaMappingEntry, function (dataRes) {
            console.table([dataRes])
            clearAdminParamFormulaMappingEntry()
            objAdminParamFormulaMappingEntry = dataRes
            displayAdminParamFormulaMappingEntry()
            dataControlAdminParamFormulaMappingEntry = 'Edit'
            document.getElementById('modal-title-label-control').innerHTML = 'EDIT'
        })
    } catch (error) {

    }
}



async function showDataAdminParam(ID_NCRAutoAdminTopic) {

    let dataReq = {
        ID_NCRAutoAdminTopic: ID_NCRAutoAdminTopic,
        IsConst: 2,
        Active: 2
    }
    $("#param_table").DataTable().destroy()
    let innerHTML = ''
    let tbody = document.getElementById('param_body')
    tbody.innerHTML = innerHTML
    // collectNCRAutoTopicSearch()

    let rows = []
    await reqAndRes(urlAdminParamFormulaMapping, 'GET', dataReq, function (dataRes) {
        dataSet = dataRes
        dataSet.forEach(data => {
            rows.push(
                [
                    data.ID,
                    data.ParamName,
                    data.ParamType,
                    data.IsConst,
                    data.ConstVal,
                ]
            )
        });
    })

    $("#param_table").dataTable({
        data: rows,
        createdRow: function (row, data, dataIndex) {
            row.onclick = function () {
                objAdminParamFormulaMappingEntry.ID = data[0]

            }
        },
        ordering: false,
        "lengthMenu": [
            [25, 50, 100, -1],
            [25, 50, 100, "All"]
        ],
        "pageLength": 25,
        select: {
            items: 'row',

        },
    })

    document.getElementById('param_table_wrapper').classList.add('p-2')
    // let thead = document.querySelector('#tbTableTroubleAndActionHistory thead')
    let row = document.querySelectorAll('#param_table_wrapper .row')

    row[1].classList.add('mb-2', 'mt-2')
    row[1].querySelector('div').id = 'boxAdminParamFormulaMapping'
    row[1].classList.remove('row')

    document.querySelectorAll('#param_table_wrapper thead tr th.sorting_asc').forEach(th => {
        th.classList.remove('sorting_asc')
    });

    document.querySelectorAll('#param_body tr td')[0].click()


}




// startPage()