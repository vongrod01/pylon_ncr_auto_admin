

let objNCRAutoAdminJobApplyEntry = {
    "ID": 0,
    "ID_Job": 0,
    "ID_NCRAutoAdminTopic": 0,
    "ID_Product": 0,
    "IsDry": 2,
    "ID_Diameter":0,
    "ID_Zone":0,
    "ID_Type":0,
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
let objNCRAutoAdminJobApplySearch = {
    "ID": 0,
    "ID_Job": 0,
    "ID_NCRAutoAdminTopic": 0,
    "ID_Product": "",
    "IsDry": 2,
    "ID_Diameter":0,
    "ID_Zone":0,
    "ID_Type":0,
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
let dataControlNCRAutoAdminJobApplyEntry = ''
function clearNCRAutoAdminJobApplyEntry() {
  
    objNCRAutoAdminJobApplyEntry.ID = 0
    objNCRAutoAdminJobApplyEntry.ID_Job = 0
    objNCRAutoAdminJobApplyEntry.ID_NCRAutoAdminTopic = 0
    objNCRAutoAdminJobApplyEntry.ID_Product = 0
    objNCRAutoAdminJobApplyEntry.IsDry = 2
    objNCRAutoAdminJobApplyEntry.ID_Diameter = 0
    objNCRAutoAdminJobApplyEntry.ID_Zone = 0
    objNCRAutoAdminJobApplyEntry.ID_Type = 0
    objNCRAutoAdminJobApplyEntry.StartTime = ""
    objNCRAutoAdminJobApplyEntry.EndTime =""
    objNCRAutoAdminJobApplyEntry.ID_EmployeeRequest = 0
    objNCRAutoAdminJobApplyEntry.Reason = ""
    objNCRAutoAdminJobApplyEntry.Detail = ""
    objNCRAutoAdminJobApplyEntry.Remark = ""
    objNCRAutoAdminJobApplyEntry.AddBy = 0
    objNCRAutoAdminJobApplyEntry.AddWhen = ""
    objNCRAutoAdminJobApplyEntry.UpdateBy = 0
    objNCRAutoAdminJobApplyEntry.UpdateWhen = ""
    objNCRAutoAdminJobApplyEntry.DeleteBy = 0
    objNCRAutoAdminJobApplyEntry.DeleteWhen = ""
  
}


function collectNCRAutoAdminJobApplyEntry() {
    objNCRAutoAdminJobApplyEntry.ID = 0
    objNCRAutoAdminJobApplyEntry.ID_Job = document.getElementById('selJob_Entry').value
    objNCRAutoAdminJobApplyEntry.ID_NCRAutoAdminTopic = document.getElementById('selNCRAutoAdminTopicJob_Entry').value
    objNCRAutoAdminJobApplyEntry.ID_Product = document.getElementById('selProduct_Entry').value 
    objNCRAutoAdminJobApplyEntry.IsDry = document.getElementById('selDry_Entry').value 
    objNCRAutoAdminJobApplyEntry.ID_Diameter = document.getElementById('selDiameter_Entry').value  
    objNCRAutoAdminJobApplyEntry.ID_Zone = document.getElementById('selZone_Entry').value  
    objNCRAutoAdminJobApplyEntry.ID_Type = document.getElementById('selType_Entry').value  
    objNCRAutoAdminJobApplyEntry.StartTime = document.getElementById('dtpStartDateJob_Entry').value.replace('T',' ')
    objNCRAutoAdminJobApplyEntry.EndTime =document.getElementById('dtpEndDateJob_Entry').value.replace('T',' ')
    objNCRAutoAdminJobApplyEntry.ID_EmployeeRequest = 0
    objNCRAutoAdminJobApplyEntry.Reason =  document.getElementById('edtReasonJob_Entry').value.replace('T',' ')
    objNCRAutoAdminJobApplyEntry.Detail = "" 
    objNCRAutoAdminJobApplyEntry.Remark = ""
    objNCRAutoAdminJobApplyEntry.AddBy = 0
    objNCRAutoAdminJobApplyEntry.AddWhen = ""
    objNCRAutoAdminJobApplyEntry.UpdateBy = 0
    objNCRAutoAdminJobApplyEntry.UpdateWhen = ""
}
function collectNCRAutoTopicSearch() {
    // objNCRAutoAdminJobApplySearch.RxNo = document.getElementById('edtRxNo_Search').value
    // objNCRAutoAdminJobApplySearch.ID_Job = document.getElementById('edtPrcessNo_Search').value
    // objNCRAutoAdminJobApplySearch.ID_Job = document.getElementById('edtPrcessCaseNo_Search').value
    // objNCRAutoAdminJobApplySearch.Model = document.getElementById('edtModel_Search').value
    // objNCRAutoAdminJobApplySearch.Production = document.getElementById('edtProduction_Search').value
    // objNCRAutoAdminJobApplySearch.SectionCode = document.getElementById('edtSectionCode_Search').value
    // objNCRAutoAdminJobApplySearch.InspectedQTY = document.getElementById('edtInspectedQTY_Search').value
    // objNCRAutoAdminJobApplySearch.Detail = document.getElementById('edtDetail_Search').value
    // objNCRAutoAdminJobApplySearch.Detail2 = document.getElementById('edtDetail2_Search').value
    // objNCRAutoAdminJobApplySearch.ID_EmployeeRequest = document.getElementById('chkID_EmployeeRequest_Search').checked ? 1 : 0
    // objNCRAutoAdminJobApplySearch.AddWhen = ''
    // objNCRAutoAdminJobApplySearch.UpdateWhen = ''
    // objNCRAutoAdminJobApplySearch.AddBy = ''
    // objNCRAutoAdminJobApplySearch.UpdateBy = ''
}

async function displayNCRAutoAdminJobApplyEntry() {
    // await setSelectNCRAutoTopic()
    // document.getElementById('selNCRAutoTopic_Entry').value = objNCRAutoAdminJobApplyEntry.ID_Job
    // document.getElementById('edtID_NCRAutoAdminTopic_Entry').value = objNCRAutoAdminJobApplyEntry.ID_NCRAutoAdminTopic
    // document.getElementById('edtID_Product_Entry').value = objNCRAutoAdminJobApplyEntry.ID_Product
    // document.getElementById('edtIsDry_Entry').value = objNCRAutoAdminJobApplyEntry.IsDry
    // document.getElementById('edtStartTime_Entry').value = objNCRAutoAdminJobApplyEntry.StartTime
    // document.getElementById('edtDetail_Entry').value = objNCRAutoAdminJobApplyEntry.Detail
    // document.getElementById('edtEndTime_Entry').value = objNCRAutoAdminJobApplyEntry.EndTime
    // document.getElementById('chkID_EmployeeRequest_Entry').checked = objNCRAutoAdminJobApplyEntry.ID_EmployeeRequest

}

async function dataEntry_NCRAutoAdminJobApply() {
    // let url = `${myDomain}/ncr_auto_topic_api`
    let method = ''
    if (dataControlNCRAutoAdminJobApplyEntry === 'Add') {
        method = 'post'
    }
    else if (dataControlNCRAutoAdminJobApplyEntry === 'Edit') {
        method = 'put'
    }
    else if (dataControlNCRAutoAdminJobApplyEntry === 'Search' || dataControlNCRAutoAdminJobApplyEntry === 'Get') {
        method = 'get'
    }
    else if (dataControlNCRAutoAdminJobApplyEntry === 'Delete') {
        method = 'delete'
    }
    if (dataControlNCRAutoAdminJobApplyEntry !== '') {
        collectNCRAutoAdminJobApplyEntry()
        console.log(objNCRAutoAdminJobApplyEntry)
        await reqAndRes(urlNCRAutoAdminJobApply, method, objNCRAutoAdminJobApplyEntry, function (dataRes) {
            console.log(dataRes)
            if (method !== 'delete') {

                document.getElementById('btnNCRAutoAdminJobApplyClose').click()
            }
            document.getElementById('modal-title-label-control').innerHTML = 'NONE'
            showDataJobApply()
        })
    }

    dataControlNCRAutoAdminJobApplyEntry = ''
}

async function showDataJobApply() {
    $("#project_apply_table").DataTable().destroy()
    let innerHTML = ''
    let tbody = document.getElementById('project_apply_body')
    tbody.innerHTML = innerHTML
    // collectNCRAutoTopicSearch()

    let rows = []
    await reqAndRes(urlNCRAutoAdminJobApply, 'GET', objNCRAutoAdminJobApplySearch, function (dataRes) {
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
                objNCRAutoAdminJobApplyEntry.ID = data[0]
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
    row[1].querySelector('div').id = 'boxJobApplytTable'
    row[1].classList.remove('row')

    document.querySelectorAll('#project_apply_table_wrapper thead tr th.sorting_asc').forEach(th => {
        th.classList.remove('sorting_asc')
    });

    document.querySelectorAll('#project_apply_body tr td')[0].click()
}


function startPageProjectApply() {
    showDataJobApply()
    setSelectNCRAutoAdminTopic()
    setSelectJob()
    setSelectProduct()
}

function setSelectNCRAutoAdminTopic() {
    // selNCRAutoAdminTopicProduct_Entry
    let dataReq = {
        Cancel : 2,
    }
    reqAndRes(urlNCRAutoAdminTopic, 'GET', dataReq, function (dataRes) {
        // console.table(dataRes)
        let innerHTML = ''
        dataRes.forEach(ncrAdmin => {
            innerHTML += `<option value=${ncrAdmin.ID}>[${ncrAdmin.ProcessNo}.${ncrAdmin.ProcessCaseNo}] ${ncrAdmin.Name}</option>`
        });
        document.getElementById('selNCRAutoAdminTopicJob_Entry').innerHTML = innerHTML
        $('#selNCRAutoAdminTopicJob_Entry').selectize({normalize:true});
    })
}

function setSelectJob() {


    reqAndRes(urlJobListForNCRApply, 'GET', {}, function (dataRes) {
        // console.table(dataRes)
        let innerHTML = ''
        dataRes.forEach(job => {
            innerHTML += `<option value=${job.ID_Job}>${job.JobNo} : ${job.ProjectName}</option>`
        });
        document.getElementById('selJob_Entry').innerHTML = innerHTML
        $('#selJob_Entry').selectize({normalize:true});
        setSelectType()
        setSelectZone()
    })

}
function setSelectDiameter() {


    reqAndRes(urlDiameterList, 'GET', {}, function (dataRes) {
        // console.table(dataRes)
        let innerHTML = ''
        dataRes.forEach(job => {
            innerHTML += `<option value=${job.ID_Job}>${job.JobNo} : ${job.ProjectName}</option>`
        });
        document.getElementById('selJob_Entry').innerHTML = innerHTML
        $('#selJob_Entry').selectize({normalize:true});
    })
}
async function setSelectProduct() {
    await reqAndRes(urlProductNCR_List, 'GET', {}, async function (dataRes) {
        let innerHTML = ''
        dataRes.forEach(product => {
            innerHTML += `<option value=${product.id_product}>${product.product_name} (${product.product_no})</option>`
        });
        document.getElementById('selProduct_Entry').innerHTML = innerHTML
        await setSelectDiameter()
    })
}
async function setSelectDiameter() {
    let dataReq = {
        ID_Product: document.getElementById("selProduct_Entry").value
    }
    await reqAndRes(urlProductDiameterList, 'GET', dataReq, async function (dataRes) {
        let innerHTML = ''
        dataRes.forEach(productSize => {
            innerHTML += `<option value=${productSize.ID_ProductSize}>${productSize.Diameter_Display}</option>`
        });
        document.getElementById('selDiameter_Entry').innerHTML = innerHTML

    })
}
async function setSelectZone() {
    let dataReq = {
        ID_Job: document.getElementById("selJob_Entry").value
    }
    await reqAndRes(urlJobZoneList, 'GET', dataReq, async function (dataRes) {
        let innerHTML = ''
        dataRes.forEach(zone => {
            innerHTML += `<option value=${zone.ID_Zone}>${zone.ZoneName}</option>`
        });
        document.getElementById('selZone_Entry').innerHTML = innerHTML

    })
}
async function setSelectType() {
    let dataReq = {
        ID_Job: document.getElementById("selJob_Entry").value
    }
    await reqAndRes(urlJobTypeList, 'GET', dataReq, async function (dataRes) {
        let innerHTML = ''
        dataRes.forEach(type => {
            innerHTML += `<option value=${type.ID_Type}>${type.TypeName}</option>`
        });
        document.getElementById('selType_Entry').innerHTML = innerHTML

    })
}

document.getElementById('btnNCRAutoAdminJobApplytAdd').onclick = function () {
    dataControlNCRAutoAdminJobApplyEntry = 'Add'
    document.getElementById('modal-title-label-control').innerHTML = 'ADD'
    clearNCRAutoAdminJobApplyEntry()
    displayNCRAutoAdminJobApplyEntry()
}

// document.getElementById('selNCRAutoTopic_Entry').onchange = function (){
//     let ncr = listNCRAUtoTopic.find((o)=> o.ID == parseInt(document.getElementById('selNCRAutoTopic_Entry').value))
//     document.getElementById('edtID_Product_Entry').value = ncr.ID_Product
//     document.getElementById('edtIsDry_Entry').value = ncr.IsDry
//     document.getElementById('edtStartTime_Entry').value = ncr.StartTime
//     document.getElementById('edtDetail_Entry').value = ncr.Detail
//     document.getElementById('edtEndTime_Entry').value = ncr.EndTime

// }

// document.getElementById('btnNCRAutoAdminJobApplyEdit').onclick = function () {

//     reqAndRes(urlNCRAutoAdminJobApply, 'GET', objNCRAutoAdminJobApplyEntry, function (dataRes) {
//         clearNCRAutoAdminJobApplyEntry()
//         console.log(dataRes)
//         objNCRAutoAdminJobApplyEntry = dataRes
//         displayNCRAutoAdminJobApplyEntry()
//         dataControlNCRAutoAdminJobApplyEntry = 'Edit'
//         document.getElementById('modal-title-label-control').innerHTML = 'EDIT'
//     })
// }

// document.getElementById('btnSearchNCRAutoTopic').onclick = function () {
//     showDataJobApply()
// }
// document.getElementById('btnResetNCRAutoTopic').onclick = function () {
//     clearNCRAutoTopicSearch()
//     showDataJobApply()
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
//         objNCRAutoAdminJobApplyEntry.ID = id
//         dataControlNCRAutoAdminJobApplyEntry = 'Delete'
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

document.getElementById("selProduct_Entry").onchange = async function(){
   await setSelectDiameter()
}
document.getElementById("selJob_Entry").onchange = async function(){
    setSelectType()
    setSelectZone()
}







startPageProjectApply()