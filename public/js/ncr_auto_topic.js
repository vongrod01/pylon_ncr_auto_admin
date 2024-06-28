let dataSet = []
let objNCRAutoTopicEntry = {
    "ID": 0,
    "ProcessNo": "",
    "ProcessCaseNo": "",
    "ConditionDetial_TH": "",
    "ConditionDetial_EN": "",
    "NCR_Message_TH": "",
    "NCR_Message_EN": "",
    "Formula": "",
    "Active": 0,
    "Remark": "",
    "Detail": "",
    "AddBy": 0,
    "AddDate": "",
    "UpdateBy": 0,
    "UpdateDate": "",
    "DeleteBy": 0,
    "DeleteDate": "",
}
let objNCRAutoTopicSearch = {
    "ID": 0,
    "ProcessNo": 0,
    "ProcessCaseNo": 0,
    "ConditionDetial_TH": "",
    "ConditionDetial_EN": "",
    "NCR_Message_TH": "",
    "NCR_Message_EN": "",
    "Formula": "",
    "Active": 2,
    "Remark": "",
    "Detail": "",
    "AddBy": 0,
    "AddDate": "",
    "UpdateBy": 0,
    "UpdateDate": "",
    "DeleteBy": 0,
    "DeleteDate": "",
}
let dataControlNCRAutoTopicEntry = ''
function clearNCRAutoTopicEntry() {
    objNCRAutoTopicEntry.ProcessNo = 0
    objNCRAutoTopicEntry.ProcessCaseNo = 0
    objNCRAutoTopicEntry.ConditionDetial_TH = ''
    objNCRAutoTopicEntry.ConditionDetial_EN = ''
    objNCRAutoTopicEntry.NCR_Message_TH = ''
    objNCRAutoTopicEntry.NCR_Message_EN = ''
    objNCRAutoTopicEntry.Formula = ''
    objNCRAutoTopicEntry.Detail = ''
    objNCRAutoTopicEntry.Remark = ''
    objNCRAutoTopicEntry.Active = 1
}
function clearNCRAutoTopicSearch() {
    document.getElementById('edtPrcessNo_Search').value = 0
    document.getElementById('edtPrcessCaseNo_Search').value = 0
}

function collectNCRAutoTopicEntry() {
    objNCRAutoTopicEntry.ProcessNo = document.getElementById('edtProcessNo_Entry').value
    objNCRAutoTopicEntry.ProcessCaseNo = document.getElementById('edtProcessCaseNo_Entry').value
    objNCRAutoTopicEntry.ConditionDetial_TH = document.getElementById('edtConditionDetial_TH_Entry').value
    objNCRAutoTopicEntry.ConditionDetial_EN = document.getElementById('edtConditionDetial_EN_Entry').value
    objNCRAutoTopicEntry.NCR_Message_TH = document.getElementById('edtNCR_Message_TH_Entry').value
    objNCRAutoTopicEntry.NCR_Message_EN = document.getElementById('edtNCR_Message_EN_Entry').value
    objNCRAutoTopicEntry.Formula = document.getElementById('edtFormula_Entry').value
    objNCRAutoTopicEntry.Detail = document.getElementById('edtDetail_Entry').value
    objNCRAutoTopicEntry.Remark = document.getElementById('edtRemark_Entry').value
    objNCRAutoTopicEntry.Active = document.getElementById('chkActive_Entry').checked ? 1 : 0
}
function collectNCRAutoTopicSearch() {
    // objNCRAutoTopicSearch.RxNo = document.getElementById('edtRxNo_Search').value
    objNCRAutoTopicSearch.ProcessNo = document.getElementById('edtPrcessNo_Search').value
    objNCRAutoTopicSearch.ProcessNo = document.getElementById('edtPrcessCaseNo_Search').value
    // objNCRAutoTopicSearch.Model = document.getElementById('edtModel_Search').value
    // objNCRAutoTopicSearch.Production = document.getElementById('edtProduction_Search').value
    // objNCRAutoTopicSearch.SectionCode = document.getElementById('edtSectionCode_Search').value
    // objNCRAutoTopicSearch.InspectedQTY = document.getElementById('edtInspectedQTY_Search').value
    // objNCRAutoTopicSearch.Detail = document.getElementById('edtDetail_Search').value
    // objNCRAutoTopicSearch.Detail2 = document.getElementById('edtDetail2_Search').value
    // objNCRAutoTopicSearch.Active = document.getElementById('chkActive_Search').checked ? 1 : 0
    // objNCRAutoTopicSearch.AddDate = ''
    // objNCRAutoTopicSearch.UpdateDate = ''
    // objNCRAutoTopicSearch.AddBy = ''
    // objNCRAutoTopicSearch.UpdateBy = ''
}

function displayNCRAutoTopicEntry() {
    document.getElementById('edtProcessNo_Entry').value = objNCRAutoTopicEntry.ProcessNo
    document.getElementById('edtProcessCaseNo_Entry').value = objNCRAutoTopicEntry.ProcessCaseNo
    document.getElementById('edtConditionDetial_TH_Entry').value = objNCRAutoTopicEntry.ConditionDetial_TH
    document.getElementById('edtConditionDetial_EN_Entry').value = objNCRAutoTopicEntry.ConditionDetial_EN
    document.getElementById('edtNCR_Message_TH_Entry').value = objNCRAutoTopicEntry.NCR_Message_TH
    document.getElementById('edtNCR_Message_EN_Entry').value = objNCRAutoTopicEntry.NCR_Message_EN
    document.getElementById('edtFormula_Entry').value = objNCRAutoTopicEntry.Formula
    document.getElementById('edtDetail_Entry').value = objNCRAutoTopicEntry.Detail
    document.getElementById('edtRemark_Entry').value = objNCRAutoTopicEntry.Remark
    document.getElementById('chkActive_Entry').checked = objNCRAutoTopicEntry.Active

}

async function dataEntry_NCRAutoTopic() {
    // let url = `${myDomain}/ncr_auto_topic_api`
    let method = ''
    if (dataControlNCRAutoTopicEntry === 'Add') {
        method = 'post'
    }
    else if (dataControlNCRAutoTopicEntry === 'Edit') {
        method = 'put'
    }
    else if (dataControlNCRAutoTopicEntry === 'Search' || dataControlNCRAutoTopicEntry === 'Get') {
        method = 'get'
    }
    else if (dataControlNCRAutoTopicEntry === 'Delete') {
        method = 'delete'
    }
    if (dataControlNCRAutoTopicEntry !== '') {
        collectNCRAutoTopicEntry()
        await reqAndRes(urlNCRAutoTopic, method, objNCRAutoTopicEntry, function (dataRes) {
            console.log(dataRes)
            if(method !== 'delete'){

                document.getElementById('btnNCRAutoTopicClose').click()
            }
            document.getElementById('modal-title-label-control').innerHTML = 'NONE'
            clearNCRAutoTopicSearch()
            showDataSearch()
        })
    }

    dataControlNCRAutoTopicEntry = ''
}

async function showDataSearch() {
    $("#ncr_auto_topic_table").DataTable().destroy()
    let innerHTML = ''
    let tbody = document.getElementById('ncr_auto_topic_body')
    tbody.innerHTML = innerHTML
    collectNCRAutoTopicSearch()

    let rows = []
    await reqAndRes(urlNCRAutoTopic, 'GET', objNCRAutoTopicSearch, function (dataRes) {
        dataSet = dataRes
        //     dataSet.forEach(data => {
        //         innerHTML += `
        //       <tr>
        //         <td>${data.RxNo}</td>
        //         <td>${data.PartNo}</td>
        //         <td>${data.PartName}</td>
        //         <td>${data.Model}</td>
        //         <td>${data.Production}</td>
        //         <td>${data.SectionCode}</td>
        //         <td></td>
        //         <td>${data.Detail}</td>
        //         <td>${data.Detail2}</td>
        //         <td>${data.Active}</td>
        //         <td>${data.AddDate}</td>
        //         <td>${data.UpdateDate}</td>
        //         <td>${data.AddBy}</td>
        //         <td>${data.UpdateBy}</td>
        //       </tr>
        //   `

        //     });
        dataSet.forEach(data => {
            rows.push(
                [
                    data.ID,
                    data.Active,
                    data.ProcessNo,
                    data.ProcessCaseNo,
                    data.ConditionDetial_TH,
                    data.ConditionDetial_EN,
                    data.NCR_Message_TH,
                    data.NCR_Message_EN,
                    data.Formula,
                    data.Remark,
                    data.UpdateDate,
                ]
            )
        });
    })

    $("#ncr_auto_topic_table").dataTable({
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


    // $("#ncr_auto_topic_table").dataTable({
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
    document.getElementById('ncr_auto_topic_table_wrapper').classList.add('p-2')
    // let thead = document.querySelector('#tbTableTroubleAndActionHistory thead')
    let row = document.querySelectorAll('#ncr_auto_topic_table_wrapper .row')

    row[1].classList.add('mb-2', 'mt-2')
    row[1].querySelector('div').id = 'boxNCRAutoTopicTable'
    row[1].classList.remove('row')

    document.querySelectorAll('#ncr_auto_topic_table_wrapper thead tr th.sorting_asc').forEach(th => {
        th.classList.remove('sorting_asc')
    });

    document.querySelectorAll('#ncr_auto_topic_body tr td')[0].click()
}


function startPage() {
    clearNCRAutoTopicSearch()
    showDataSearch()
}

document.getElementById('btnNCRAutoTopicAdd').onclick = function () {
    dataControlNCRAutoTopicEntry = 'Add'
    document.getElementById('modal-title-label-control').innerHTML = 'ADD'
    clearNCRAutoTopicEntry()
    displayNCRAutoTopicEntry()
}
document.getElementById('btnNCRAutoTopicEdit').onclick = function () {
    // let table = new DataTable('#ncr_auto_topic_table');
    let rowData = new DataTable('#ncr_auto_topic_table').rows({ selected: true }).data();
    let id = rowData[0][0]
    reqAndRes(urlNCRAutoTopic, 'GET', { ID: id }, function (dataRes) {
        clearNCRAutoTopicEntry()
        console.log(dataRes)
        objNCRAutoTopicEntry = dataRes
        displayNCRAutoTopicEntry()
        dataControlNCRAutoTopicEntry = 'Edit'
        document.getElementById('modal-title-label-control').innerHTML = 'EDIT'
    })
}

document.getElementById('btnSearchNCRAutoTopic').onclick = function () {
    showDataSearch()
}
document.getElementById('btnResetNCRAutoTopic').onclick = function () {
    clearNCRAutoTopicSearch()
    showDataSearch()
}

document.getElementById('btnParam').onclick = function (){
    let rowData = new DataTable('#ncr_auto_topic_table').rows({ selected: true }).data();
    let id = rowData[0][0]
    window.open(`${urlNCRParam}?ID=${id}`);
}

document.getElementById('btnNCRAutoTopicDelete').onclick = function () {
    let rowData = new DataTable('#ncr_auto_topic_table').rows({ selected: true }).data();

    try {
        
        let id = rowData[0][0]
        objNCRAutoTopicEntry.ID = id
        dataControlNCRAutoTopicEntry = 'Delete'
        dataEntry_NCRAutoTopic()
    } catch (error) {
        
    }
}


startPage()