let dataSet = []
let listNCRAUtoTopic = []
let objNCRAutoAdminTopicEntry = {
    "ID": 0,
    "ID_NCRAutoTopic": 0,
    "Name": "",
    "NCR_Message_TH": "",
    "NCR_Message_EN": "",
    "Formula": "",
    "Cancel": 0,
    "Remark": "",
    "Detail": "",
    "AddBy": 0,
    "AddWhen": "",
    "UpdateBy": 0,
    "UpdateWhen": "",
    "DeleteBy": 0,
    "DeleteWhen": "",
}
let objNCRAutoAdminTopicSearch = {
    "ID": 0,
    "ID_NCRAutoTopic": 0,
    "Name": '',
    "NCR_Message_TH": "",
    "NCR_Message_EN": "",
    "Formula": "",
    "Cancel": 2,
    "Remark": "",
    "Detail": "",
    "AddBy": 0,
    "AddWhen": "",
    "UpdateBy": 0,
    "UpdateWhen": "",
    "DeleteBy": 0,
    "DeleteWhen": "",
}
let dataControlNCRAutoAdminTopicEntry = ''
function clearNCRAutoAdminTopicEntry() {
    objNCRAutoAdminTopicEntry.ID_NCRAutoTopic = 0
    objNCRAutoAdminTopicEntry.Name = ''
    objNCRAutoAdminTopicEntry.NCR_Message_TH = ''
    objNCRAutoAdminTopicEntry.NCR_Message_EN = ''
    objNCRAutoAdminTopicEntry.Formula = ''
    objNCRAutoAdminTopicEntry.Cancel = 1
    objNCRAutoAdminTopicEntry.Detail = ''
    objNCRAutoAdminTopicEntry.Remark = ''
}


function collectNCRAutoAdminTopicEntry() {
    objNCRAutoAdminTopicEntry.ID_NCRAutoTopic = document.getElementById('selNCRAutoTopic_Entry').value
    objNCRAutoAdminTopicEntry.Name = document.getElementById('edtName_Entry').value

    objNCRAutoAdminTopicEntry.NCR_Message_TH = document.getElementById('edtNCR_Message_TH_Entry').value
    objNCRAutoAdminTopicEntry.NCR_Message_EN = document.getElementById('edtNCR_Message_EN_Entry').value
    objNCRAutoAdminTopicEntry.Formula = document.getElementById('edtFormula_Entry').value
    objNCRAutoAdminTopicEntry.Detail = document.getElementById('edtDetail_Entry').value
    objNCRAutoAdminTopicEntry.Remark = document.getElementById('edtRemark_Entry').value
    objNCRAutoAdminTopicEntry.Cancel = document.getElementById('chkCancel_Entry').checked ? 1 : 0
}
function collectNCRAutoTopicSearch() {
    // objNCRAutoAdminTopicSearch.RxNo = document.getElementById('edtRxNo_Search').value
    objNCRAutoAdminTopicSearch.ID_NCRAutoTopic = document.getElementById('edtPrcessNo_Search').value
    objNCRAutoAdminTopicSearch.ID_NCRAutoTopic = document.getElementById('edtPrcessCaseNo_Search').value
    // objNCRAutoAdminTopicSearch.Model = document.getElementById('edtModel_Search').value
    // objNCRAutoAdminTopicSearch.Production = document.getElementById('edtProduction_Search').value
    // objNCRAutoAdminTopicSearch.SectionCode = document.getElementById('edtSectionCode_Search').value
    // objNCRAutoAdminTopicSearch.InspectedQTY = document.getElementById('edtInspectedQTY_Search').value
    // objNCRAutoAdminTopicSearch.Detail = document.getElementById('edtDetail_Search').value
    // objNCRAutoAdminTopicSearch.Detail2 = document.getElementById('edtDetail2_Search').value
    // objNCRAutoAdminTopicSearch.Cancel = document.getElementById('chkCancel_Search').checked ? 1 : 0
    // objNCRAutoAdminTopicSearch.AddWhen = ''
    // objNCRAutoAdminTopicSearch.UpdateWhen = ''
    // objNCRAutoAdminTopicSearch.AddBy = ''
    // objNCRAutoAdminTopicSearch.UpdateBy = ''
}

async function displayNCRAutoAdminTopicEntry() {
    await setSelectNCRAutoTopic()
    document.getElementById('selNCRAutoTopic_Entry').value = objNCRAutoAdminTopicEntry.ID_NCRAutoTopic
    document.getElementById('edtName_Entry').value = objNCRAutoAdminTopicEntry.Name
    document.getElementById('edtNCR_Message_TH_Entry').value = objNCRAutoAdminTopicEntry.NCR_Message_TH
    document.getElementById('edtNCR_Message_EN_Entry').value = objNCRAutoAdminTopicEntry.NCR_Message_EN
    document.getElementById('edtFormula_Entry').value = objNCRAutoAdminTopicEntry.Formula
    document.getElementById('edtDetail_Entry').value = objNCRAutoAdminTopicEntry.Detail
    document.getElementById('edtRemark_Entry').value = objNCRAutoAdminTopicEntry.Remark
    document.getElementById('chkCancel_Entry').checked = objNCRAutoAdminTopicEntry.Cancel

}

async function dataEntry_NCRAutoAdminTopic() {
    // let url = `${myDomain}/ncr_auto_topic_api`
    let method = ''
    if (dataControlNCRAutoAdminTopicEntry === 'Add') {
        method = 'post'
    }
    else if (dataControlNCRAutoAdminTopicEntry === 'Edit') {
        method = 'put'
    }
    else if (dataControlNCRAutoAdminTopicEntry === 'Search' || dataControlNCRAutoAdminTopicEntry === 'Get') {
        method = 'get'
    }
    else if (dataControlNCRAutoAdminTopicEntry === 'Delete') {
        method = 'delete'
    }
    if (dataControlNCRAutoAdminTopicEntry !== '') {
        collectNCRAutoAdminTopicEntry()
        await reqAndRes(urlNCRAutoAdminTopic, method, objNCRAutoAdminTopicEntry, function (dataRes) {
            console.log(dataRes)
            if (method !== 'delete') {

                document.getElementById('btnNCRAutoAdminTopicClose').click()
            }
            document.getElementById('modal-title-label-control').innerHTML = 'NONE'
            showDataTopic()
        })
    }

    dataControlNCRAutoAdminTopicEntry = ''
}

async function showDataTopic() {
    $("#topic_table").DataTable().destroy()
    let innerHTML = ''
    let tbody = document.getElementById('topic_body')
    tbody.innerHTML = innerHTML
    // collectNCRAutoTopicSearch()

    let rows = []
    await reqAndRes(urlNCRAutoAdminTopic, 'GET', objNCRAutoAdminTopicSearch, function (dataRes) {
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
        //         <td>${data.Cancel}</td>
        //         <td>${data.AddWhen}</td>
        //         <td>${data.UpdateWhen}</td>
        //         <td>${data.AddBy}</td>
        //         <td>${data.UpdateBy}</td>
        //       </tr>
        //   `

        //     });
        dataSet.forEach(data => {
            rows.push(
                [
                    data.ID,
                    data.Cancel,
                    data.ID_NCRAutoTopic,
                    `${data.ProcessNo}.${data.ProcessCaseNo}`,
                    data.Name,
                    // data.ConditionDetial_TH,
                    // data.ConditionDetial_EN,
                    // data.NCR_Message_TH,
                    // data.NCR_Message_EN,
                    data.Formula,
                    // data.Remark,
                    // data.UpdateWhen,
                ]
            )
        });
    })

    $("#topic_table").dataTable({
        data: rows,
        createdRow: function (row, data, dataIndex) {
            row.onclick = function () { 
                objNCRAutoAdminTopicEntry.ID = data[0]
                // console.table([objNCRAutoAdminTopicEntry])
                document.getElementById('edtAdminFormula').value = data[5]
                showDataAdminParam(objNCRAutoAdminTopicEntry.ID) 
            }

            // หลังจากสร้าง table เสร็จ
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

    // tbody.innerHTML = innerHTML


    // $("#topic_table").dataTable({
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
    document.getElementById('topic_table_wrapper').classList.add('p-2')
    // let thead = document.querySelector('#tbTableTroubleAndActionHistory thead')
    let row = document.querySelectorAll('#topic_table_wrapper .row')

    row[1].classList.add('mb-2', 'mt-2')
    row[1].querySelector('div').id = 'boxNCRAutoAdminTopicTable'
    row[1].classList.remove('row')

    document.querySelectorAll('#topic_table_wrapper thead tr th.sorting_asc').forEach(th => {
        th.classList.remove('sorting_asc')
    });

    document.querySelectorAll('#topic_body tr td')[0].click()
}


function startPage() {
    showDataTopic()
}

document.getElementById('btnNCRAutoAdminTopicAdd').onclick = function () {
    dataControlNCRAutoAdminTopicEntry = 'Add'
    document.getElementById('modal-title-label-control').innerHTML = 'ADD'
    clearNCRAutoAdminTopicEntry()
    displayNCRAutoAdminTopicEntry()
}

document.getElementById('selNCRAutoTopic_Entry').onchange = function (){
    let ncr = listNCRAUtoTopic.find((o)=> o.ID == parseInt(document.getElementById('selNCRAutoTopic_Entry').value))
    document.getElementById('edtNCR_Message_TH_Entry').value = ncr.NCR_Message_TH
    document.getElementById('edtNCR_Message_EN_Entry').value = ncr.NCR_Message_EN
    document.getElementById('edtFormula_Entry').value = ncr.Formula
    document.getElementById('edtDetail_Entry').value = ncr.Detail
    document.getElementById('edtRemark_Entry').value = ncr.Remark

}
document.getElementById('btnNCRAutoAdminTopicEdit').onclick = function () {

    reqAndRes(urlNCRAutoAdminTopic, 'GET', objNCRAutoAdminTopicEntry, function (dataRes) {
        clearNCRAutoAdminTopicEntry()
        console.log(dataRes)
        objNCRAutoAdminTopicEntry = dataRes
        displayNCRAutoAdminTopicEntry()
        dataControlNCRAutoAdminTopicEntry = 'Edit'
        document.getElementById('modal-title-label-control').innerHTML = 'EDIT'
    })
}

// document.getElementById('btnSearchNCRAutoTopic').onclick = function () {
//     showDataTopic()
// }
// document.getElementById('btnResetNCRAutoTopic').onclick = function () {
//     clearNCRAutoTopicSearch()
//     showDataTopic()
// }

// document.getElementById('btnParam').onclick = function (){
//     let rowData = new DataTable('#topic_table').rows({ selected: true }).data();
//     let id = rowData[0][0]
//     window.open(`${urlNCRParam}?ID=${id}`);
// }

// document.getElementById('btnNCRAutoTopicDelete').onclick = function () {
//     let rowData = new DataTable('#topic_table').rows({ selected: true }).data();

//     try {

//         let id = rowData[0][0]
//         objNCRAutoAdminTopicEntry.ID = id
//         dataControlNCRAutoAdminTopicEntry = 'Delete'
//         dataEntry_NCRAutoTopic()
//     } catch (error) {

//     }
// }
async function setSelectNCRAutoTopic() {
    await reqAndRes(urlNCRAutoTopic, 'GET', {Active:1}, function (dataRes) {
        listNCRAUtoTopic = dataRes
        let innerHTML = ''
        listNCRAUtoTopic.forEach(ncr => {
            innerHTML += `<option value=${ncr.ID}>[${ncr.ProcessNo}.${ncr.ProcessCaseNo}] ${ncr.ConditionDetial_TH} | Remark : ${ncr.Remark}</option>`
        });
        document.getElementById('selNCRAutoTopic_Entry').innerHTML = innerHTML
    })
}







startPage()