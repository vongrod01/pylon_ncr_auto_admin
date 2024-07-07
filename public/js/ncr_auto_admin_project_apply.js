

let objNCRAutoAdminProjectApplyEntry = {
    "ID": 0,
    "ID_Project": 0,
    "ID_NCRAutoAdminTopic": 0,
    "ID_Product": 0,
    "IsDry": 2,
    "StartTime": "",
    "EndTime": "",
    "ID_EmployeeRequest": 0,
    "Reason": "",
    "Detail": "",
    "Remark": "",
    "AddBy": 0,
    "AddWhen": "",
    "UpdateBy": 0,
    "UpdateWhen": "",
    "DeleteBy": 0,
    "DeleteWhen": "",
}
let objNCRAutoAdminProjectApplySearch = {
    "ID": 0,
    "ID_Project": 0,
    "ID_NCRAutoAdminTopic": 0,
    "ID_Product": "",
    "IsDry": 2,
    "StartTime": "",
    "EndTime": "",
    "ID_EmployeeRequest": 0,
    "Reason":"",
    "Detail": "",
    "Remark": "",
    "AddBy": 0,
    "AddWhen": "",
    "UpdateBy": 0,
    "UpdateWhen": "",
    "DeleteBy": 0,
    "DeleteWhen": "",
}
let dataControlNCRAutoAdminProjectApplyEntry = ''
function clearNCRAutoAdminProjectApplyEntry() {
    // objNCRAutoAdminProjectApplyEntry.ID_Project = 0
    // objNCRAutoAdminProjectApplyEntry.ID_NCRAutoAdminTopic = 0
    // objNCRAutoAdminProjectApplyEntry.ID_Product = 0
    // objNCRAutoAdminProjectApplyEntry.IsDry = ''
    // objNCRAutoAdminProjectApplyEntry.StartTime = ''
    // objNCRAutoAdminProjectApplyEntry.ID_EmployeeRequest = 1
    // objNCRAutoAdminProjectApplyEntry.Detail = ''
    // objNCRAutoAdminProjectApplyEntry.EndTime = ''
}


function collectNCRAutoAdminProjectApplyEntry() {
    // objNCRAutoAdminProjectApplyEntry.ID_Project = document.getElementById('selNCRAutoTopic_Entry').value
    // objNCRAutoAdminProjectApplyEntry.ID_NCRAutoAdminTopic = document.getElementById('edtID_NCRAutoAdminTopic_Entry').value

    // objNCRAutoAdminProjectApplyEntry.ID_Product = document.getElementById('edtID_Product_Entry').value
    // objNCRAutoAdminProjectApplyEntry.IsDry = document.getElementById('edtIsDry_Entry').value
    // objNCRAutoAdminProjectApplyEntry.StartTime = document.getElementById('edtStartTime_Entry').value
    // objNCRAutoAdminProjectApplyEntry.Detail = document.getElementById('edtDetail_Entry').value
    // objNCRAutoAdminProjectApplyEntry.EndTime = document.getElementById('edtEndTime_Entry').value
    // objNCRAutoAdminProjectApplyEntry.ID_EmployeeRequest = document.getElementById('chkID_EmployeeRequest_Entry').checked ? 1 : 0
}
function collectNCRAutoTopicSearch() {
    // objNCRAutoAdminProjectApplySearch.RxNo = document.getElementById('edtRxNo_Search').value
    // objNCRAutoAdminProjectApplySearch.ID_Project = document.getElementById('edtPrcessNo_Search').value
    // objNCRAutoAdminProjectApplySearch.ID_Project = document.getElementById('edtPrcessCaseNo_Search').value
    // objNCRAutoAdminProjectApplySearch.Model = document.getElementById('edtModel_Search').value
    // objNCRAutoAdminProjectApplySearch.Production = document.getElementById('edtProduction_Search').value
    // objNCRAutoAdminProjectApplySearch.SectionCode = document.getElementById('edtSectionCode_Search').value
    // objNCRAutoAdminProjectApplySearch.InspectedQTY = document.getElementById('edtInspectedQTY_Search').value
    // objNCRAutoAdminProjectApplySearch.Detail = document.getElementById('edtDetail_Search').value
    // objNCRAutoAdminProjectApplySearch.Detail2 = document.getElementById('edtDetail2_Search').value
    // objNCRAutoAdminProjectApplySearch.ID_EmployeeRequest = document.getElementById('chkID_EmployeeRequest_Search').checked ? 1 : 0
    // objNCRAutoAdminProjectApplySearch.AddWhen = ''
    // objNCRAutoAdminProjectApplySearch.UpdateWhen = ''
    // objNCRAutoAdminProjectApplySearch.AddBy = ''
    // objNCRAutoAdminProjectApplySearch.UpdateBy = ''
}

async function displayNCRAutoAdminProjectApplyEntry() {
    await setSelectNCRAutoTopic()
    document.getElementById('selNCRAutoTopic_Entry').value = objNCRAutoAdminProjectApplyEntry.ID_Project
    document.getElementById('edtID_NCRAutoAdminTopic_Entry').value = objNCRAutoAdminProjectApplyEntry.ID_NCRAutoAdminTopic
    document.getElementById('edtID_Product_Entry').value = objNCRAutoAdminProjectApplyEntry.ID_Product
    document.getElementById('edtIsDry_Entry').value = objNCRAutoAdminProjectApplyEntry.IsDry
    document.getElementById('edtStartTime_Entry').value = objNCRAutoAdminProjectApplyEntry.StartTime
    document.getElementById('edtDetail_Entry').value = objNCRAutoAdminProjectApplyEntry.Detail
    document.getElementById('edtEndTime_Entry').value = objNCRAutoAdminProjectApplyEntry.EndTime
    document.getElementById('chkID_EmployeeRequest_Entry').checked = objNCRAutoAdminProjectApplyEntry.ID_EmployeeRequest

}

async function dataEntry_NCRAutoAdminProjectApply() {
    // let url = `${myDomain}/ncr_auto_topic_api`
    let method = ''
    if (dataControlNCRAutoAdminProjectApplyEntry === 'Add') {
        method = 'post'
    }
    else if (dataControlNCRAutoAdminProjectApplyEntry === 'Edit') {
        method = 'put'
    }
    else if (dataControlNCRAutoAdminProjectApplyEntry === 'Search' || dataControlNCRAutoAdminProjectApplyEntry === 'Get') {
        method = 'get'
    }
    else if (dataControlNCRAutoAdminProjectApplyEntry === 'Delete') {
        method = 'delete'
    }
    if (dataControlNCRAutoAdminProjectApplyEntry !== '') {
        collectNCRAutoAdminProjectApplyEntry()
        await reqAndRes(urlNCRAutoAdminProjectApply, method, objNCRAutoAdminProjectApplyEntry, function (dataRes) {
            console.log(dataRes)
            if (method !== 'delete') {

                document.getElementById('btnNCRAutoAdminProjectApplyClose').click()
            }
            document.getElementById('modal-title-label-control').innerHTML = 'NONE'
            showDataProjectApply()
        })
    }

    dataControlNCRAutoAdminProjectApplyEntry = ''
}

async function showDataProjectApply() {
    $("#project_apply_table").DataTable().destroy()
    let innerHTML = ''
    let tbody = document.getElementById('project_apply_body')
    tbody.innerHTML = innerHTML
    // collectNCRAutoTopicSearch()

    let rows = []
    await reqAndRes(urlNCRAutoAdminProjectApply, 'GET', objNCRAutoAdminProjectApplySearch, function (dataRes) {
        dataSet = dataRes
        console.table(dataRes)
        dataSet.forEach(data => {
            rows.push(
                [
                    
                ]
            )
        });
    })

    $("#project_apply_table").dataTable({
        data: rows,
        createdRow: function (row, data, dataIndex) {
            row.onclick = function () { 
                objNCRAutoAdminProjectApplyEntry.ID = data[0]
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


    // $("#project_apply_table").dataTable({
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
    document.getElementById('project_apply_table_wrapper').classList.add('p-2')
    // let thead = document.querySelector('#tbTableTroubleAndActionHistory thead')
    let row = document.querySelectorAll('#project_apply_table_wrapper .row')

    row[1].classList.add('mb-2', 'mt-2')
    row[1].querySelector('div').id = 'boxApplyProjectTable'
    row[1].classList.remove('row')

    document.querySelectorAll('#project_apply_table_wrapper thead tr th.sorting_asc').forEach(th => {
        th.classList.remove('sorting_asc')
    });

    document.querySelectorAll('#project_apply_body tr td')[0].click()
}


function startPageProjectApply() {
    showDataProjectApply()
}

// document.getElementById('btnNCRAutoAdminProjectApplyAdd').onclick = function () {
//     dataControlNCRAutoAdminProjectApplyEntry = 'Add'
//     document.getElementById('modal-title-label-control').innerHTML = 'ADD'
//     clearNCRAutoAdminProjectApplyEntry()
//     displayNCRAutoAdminProjectApplyEntry()
// }

// document.getElementById('selNCRAutoTopic_Entry').onchange = function (){
//     let ncr = listNCRAUtoTopic.find((o)=> o.ID == parseInt(document.getElementById('selNCRAutoTopic_Entry').value))
//     document.getElementById('edtID_Product_Entry').value = ncr.ID_Product
//     document.getElementById('edtIsDry_Entry').value = ncr.IsDry
//     document.getElementById('edtStartTime_Entry').value = ncr.StartTime
//     document.getElementById('edtDetail_Entry').value = ncr.Detail
//     document.getElementById('edtEndTime_Entry').value = ncr.EndTime

// }

// document.getElementById('btnNCRAutoAdminProjectApplyEdit').onclick = function () {

//     reqAndRes(urlNCRAutoAdminProjectApply, 'GET', objNCRAutoAdminProjectApplyEntry, function (dataRes) {
//         clearNCRAutoAdminProjectApplyEntry()
//         console.log(dataRes)
//         objNCRAutoAdminProjectApplyEntry = dataRes
//         displayNCRAutoAdminProjectApplyEntry()
//         dataControlNCRAutoAdminProjectApplyEntry = 'Edit'
//         document.getElementById('modal-title-label-control').innerHTML = 'EDIT'
//     })
// }

// document.getElementById('btnSearchNCRAutoTopic').onclick = function () {
//     showDataProjectApply()
// }
// document.getElementById('btnResetNCRAutoTopic').onclick = function () {
//     clearNCRAutoTopicSearch()
//     showDataProjectApply()
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
//         objNCRAutoAdminProjectApplyEntry.ID = id
//         dataControlNCRAutoAdminProjectApplyEntry = 'Delete'
//         dataEntry_NCRAutoTopic()
//     } catch (error) {

//     }
// }
// async function setSelectNCRAutoTopic() {
//     await reqAndRes(urlNCRAutoTopic, 'GET', {Active:1}, function (dataRes) {
//         listNCRAUtoTopic = dataRes
//         let innerHTML = ''
//         listNCRAUtoTopic.forEach(ncr => {
//             innerHTML += `<option value=${ncr.ID}>[${ncr.ProcessNo}.${ncr.ProcessCaseNo}] ${ncr.ConditionDetial_TH} | EndTime : ${ncr.EndTime}</option>`
//         });
//         document.getElementById('selNCRAutoTopic_Entry').innerHTML = innerHTML
//     })
// }







startPageProjectApply()