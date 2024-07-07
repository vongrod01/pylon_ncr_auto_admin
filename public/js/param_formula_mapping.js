let dataSet = []
let objParamFormulaMappingEntry = {
    "ID": 0,
    "ID_NCRAutoTopic" : "",
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

let dataControlParamFormulaMappingEntry = ''
function clearParamFormulaMappingEntry() {
    objParamFormulaMappingEntry.ParamName = ''
    objParamFormulaMappingEntry.ParamType = 'Boolean'
    objParamFormulaMappingEntry.IsConst = 0
    objParamFormulaMappingEntry.ConstVal = ''
    objParamFormulaMappingEntry.Detail = ''
    objParamFormulaMappingEntry.Active = 1
}


function collectParamFormulaMappingEntry() {
    objParamFormulaMappingEntry.ParamName = document.getElementById('edtParamName_Entry').value
    objParamFormulaMappingEntry.ParamType = document.getElementById('selParamType_Entry').value
    objParamFormulaMappingEntry.IsConst = document.getElementById('chkIsConst_Entry').checked ? 1 : 0
    objParamFormulaMappingEntry.ConstVal = document.getElementById('edtConstVal_Entry').value
    objParamFormulaMappingEntry.Detail = document.getElementById('edtDetail_Entry').value
    objParamFormulaMappingEntry.Active = document.getElementById('chkActive_Entry').checked ? 1 : 0
    objParamFormulaMappingEntry.ID_NCRAutoTopic = g_ID_NCRAutoTopic
    
}

function displayParamFormulaMappingEntry() {
    document.getElementById('edtParamName_Entry').value = objParamFormulaMappingEntry.ParamName
    document.getElementById('selParamType_Entry').value = objParamFormulaMappingEntry.ParamType
    document.getElementById('chkIsConst_Entry').checked = objParamFormulaMappingEntry.IsConst
    document.getElementById('edtConstVal_Entry').value = objParamFormulaMappingEntry.ConstVal
    document.getElementById('edtDetail_Entry').value = objParamFormulaMappingEntry.Detail
    document.getElementById('chkActive_Entry').checked = objParamFormulaMappingEntry.Active

}

async function dataEntry_ParamFormulaMapping() {
    // let url = `${myDomain}/ncr_auto_topic_api`
    let method = ''
    if (dataControlParamFormulaMappingEntry === 'Add') {
        method = 'post'
    }
    else if (dataControlParamFormulaMappingEntry === 'Edit') {
        method = 'put'
    }
    else if (dataControlParamFormulaMappingEntry === 'Search' || dataControlParamFormulaMappingEntry === 'Get') {
        method = 'get'
    }
    else if (dataControlParamFormulaMappingEntry === 'Delete') {
        method = 'delete'
    }
    if (dataControlParamFormulaMappingEntry !== '') {
        collectParamFormulaMappingEntry()
        await reqAndRes(urlParamFormulaMapping, method, objParamFormulaMappingEntry, function (dataRes) {
            // console.log(dataRes)
            if(method!=='delete'){

                document.getElementById('btnParamFormulaMappingClose').click()
            }
            document.getElementById('modal-title-label-control').innerHTML = 'NONE'
            showDataSearch()
        })
    }

    dataControlParamFormulaMappingEntry = ''
}
async function displayNCRAutoTopic(){
    reqAndRes(urlNCRAutoTopic,'GET',{ID:g_ID_NCRAutoTopic},(dataRes)=>{
        document.getElementById('edtTopic').value = `${dataRes.ProcessNo}.${dataRes.ProcessCaseNo}`
        document.getElementById('edtConditionDetail').value = dataRes.ConditionDetial_TH
        document.getElementById('edtFormula').value = dataRes.Formula
        document.getElementById('edtFormula2').value = dataRes.Formula

    })
}
async function showDataSearch() {
    $("#ncr_param_table").DataTable().destroy()
    let innerHTML = ''
    let tbody = document.getElementById('ncr_param_body')
    tbody.innerHTML = innerHTML

    let rows = []
    await reqAndRes(urlParamFormulaMapping_ListByTopic, 'GET', {ID_NCRAutoTopic:g_ID_NCRAutoTopic}, function (dataRes) {
        dataSet = dataRes
       
        dataSet.forEach(data => {
            rows.push(
                [
                    data.ID,
                    data.ParamName,
                    data.ParamType,
                    data.IsConst,
                    data.ConstVal,
                    data.Active,
                    data.Detail,
                    data.UpdateWhen,
                    
                    
                ]
            )
        });
    })

    $("#ncr_param_table").dataTable({
        data: rows,
        // createdRow: function (row, data, dataIndex) {
        //     // หลังจากสร้าง table เสร็จ
        // },
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

    // tbody.innerHTML = innerHTML


    // $("#ncr_param_table").dataTable({
    //     ordering: false,
    //     "lengthMenu": [
    //         [25, 50, 100, -1],
    //         [25, 50, 100, "All"]
    //     ],
    //     "pageLength": 25,
    //     select: {
    //         items: 'row',

    //     },

    // })

    // #tbTableTroubleAndActionHistory_wrapper <---- datatable genarate ขึ้นมา
    document.getElementById('ncr_param_table_wrapper').classList.add('p-2')
    // let thead = document.querySelector('#tbTableTroubleAndActionHistory thead')
    let row = document.querySelectorAll('#ncr_param_table_wrapper .row')

    row[1].classList.add('mb-2', 'mt-2')
    row[1].querySelector('div').id = 'boxParamFormulaMappingTable'
    row[1].classList.remove('row')

    document.querySelectorAll('#ncr_param_table_wrapper thead tr th.sorting_asc').forEach(th => {
        th.classList.remove('sorting_asc')
    });

    document.querySelectorAll('#ncr_param_body tr td')[0].click()
}


function startPage() {
    // clearParamFormulaMappingSearch()
    displayNCRAutoTopic()
    showDataSearch()
}

document.getElementById('btnParamFormulaMappingAdd').onclick = function () {
    dataControlParamFormulaMappingEntry = 'Add'
    document.getElementById('modal-title-label-control').innerHTML = 'ADD'
    clearParamFormulaMappingEntry()
    displayParamFormulaMappingEntry()
}
document.getElementById('btnParamFormulaMappingEdit').onclick = function () {
    // let table = new DataTable('#ncr_param_table');
    
    let rowData = new DataTable('#ncr_param_table').rows({ selected: true }).data();
    try {
        
        let id = rowData[0][0]
        reqAndRes(urlParamFormulaMapping, 'GET', { ID: id }, function (dataRes) {
            clearParamFormulaMappingEntry()
            objParamFormulaMappingEntry = dataRes
            displayParamFormulaMappingEntry()
            dataControlParamFormulaMappingEntry = 'Edit'
            document.getElementById('modal-title-label-control').innerHTML = 'EDIT'
        })
    } catch (error) {
        
    }
}

// document.getElementById('btnSearchPart').onclick = function () {
//     showDataSearch()
// }
document.getElementById('btnResetParamFormulaMapping').onclick = function () {
    showDataSearch()
}
document.getElementById('btnParamFormulaMappingDelete').onclick = function () {
    let rowData = new DataTable('#ncr_param_table').rows({ selected: true }).data();

    try {
        
        let id = rowData[0][0]
        objParamFormulaMappingEntry.ID = id
        dataControlParamFormulaMappingEntry = 'Delete'
        Swal.fire({
            title: "Do you want to delete?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Yes",
           
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                dataEntry_ParamFormulaMapping()
                displayParamFormulaMappingEntry()
              Swal.fire("Delete!", "", "success");
            } else if (result.isDenied) {
            //   Swal.fire("Changes are not saved", "", "info");
            }
          });
    } catch (error) {
        
    }
}




startPage()