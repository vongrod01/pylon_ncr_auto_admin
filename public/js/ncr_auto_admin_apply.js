let productItemIDSelectedList =[]
let objNCRAutoAdminApplyEntry = {
    "ID": 0,
    "ID_ProductItem": 0,
    "ID_NCRAutoAdminTopic": 0,
    "ID_NCRAutoAdminProjectApply": 0,
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
let objNCRAutoAdminApplySearch = {
    "ID": 0,
    "ID_ProductItem": 0,
    "ID_NCRAutoAdminTopic": 0,
    "ID_NCRAutoAdminProjectApply": "",
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
let dataControlNCRAutoAdminApplyEntry = ''
function resetProductItem() {
    document.getElementById('edtProject_Search').value = ''
    document.getElementById('edtProductItemNo_Search').value = ''
    document.getElementById('edtProductType_Search').value = ''
    showDataProductItemList()
}

function showDataProductItemList(){
    let dataReq = {
        Project : document.getElementById('edtProject_Search').value,
        ProductItemNo : document.getElementById('edtProductItemNo_Search').value,
        ProductType : document.getElementById('edtProductType_Search').value,
    }

    let tbody = document.getElementById('select_apply_body')
    tbody.innerHTML = ''
    reqAndRes(urlProductItemList,'GET',dataReq,async function(dataRes){
        let innerHTML = ''
        dataRes.forEach(productItem => {
            innerHTML += `
                <tr>
                    <td class="text-center"><input class="form-check-input" type="checkbox" value=${productItem.ID} id="chkNCRTopic_${productItem.ID}"></td>
                    <td>${productItem.ID_ProductItem}</td>
                    <td>${productItem.ProductItemNo}</td>
                    <td>${productItem.JobNo} ${productItem.ProjectName}</td>
                    <td>${productItem.product_name} (${productItem.product_no})</td>
                </tr>
            `
        });
        tbody.innerHTML = innerHTML
    })
}


// function collectNCRAutoAdminApplyEntry() {
// objNCRAutoAdminApplyEntry.ID_ProductItem = document.getElementById('selNCRAutoTopic_Entry').value
// objNCRAutoAdminApplyEntry.ID_NCRAutoAdminTopic = document.getElementById('edtID_NCRAutoAdminTopic_Entry').value

// objNCRAutoAdminApplyEntry.ID_NCRAutoAdminProjectApply = document.getElementById('edtID_NCRAutoAdminProjectApply_Entry').value
// objNCRAutoAdminApplyEntry.IsDry = document.getElementById('edtIsDry_Entry').value
// objNCRAutoAdminApplyEntry.StartTime = document.getElementById('edtStartTime_Entry').value
// objNCRAutoAdminApplyEntry.Detail = document.getElementById('edtDetail_Entry').value
// objNCRAutoAdminApplyEntry.EndTime = document.getElementById('edtEndTime_Entry').value
// objNCRAutoAdminApplyEntry.ID_EmployeeRequest = document.getElementById('chkID_EmployeeRequest_Entry').checked ? 1 : 0
// }
// function collectNCRAutoTopicSearch() {
// objNCRAutoAdminApplySearch.RxNo = document.getElementById('edtRxNo_Search').value
// objNCRAutoAdminApplySearch.ID_ProductItem = document.getElementById('edtPrcessNo_Search').value
// objNCRAutoAdminApplySearch.ID_ProductItem = document.getElementById('edtPrcessCaseNo_Search').value
// objNCRAutoAdminApplySearch.Model = document.getElementById('edtModel_Search').value
// objNCRAutoAdminApplySearch.Production = document.getElementById('edtProduction_Search').value
// objNCRAutoAdminApplySearch.SectionCode = document.getElementById('edtSectionCode_Search').value
// objNCRAutoAdminApplySearch.InspectedQTY = document.getElementById('edtInspectedQTY_Search').value
// objNCRAutoAdminApplySearch.Detail = document.getElementById('edtDetail_Search').value
// objNCRAutoAdminApplySearch.Detail2 = document.getElementById('edtDetail2_Search').value
// objNCRAutoAdminApplySearch.ID_EmployeeRequest = document.getElementById('chkID_EmployeeRequest_Search').checked ? 1 : 0
// objNCRAutoAdminApplySearch.AddWhen = ''
// objNCRAutoAdminApplySearch.UpdateWhen = ''
// objNCRAutoAdminApplySearch.AddBy = ''
// objNCRAutoAdminApplySearch.UpdateBy = ''
// }

// async function displayNCRAutoAdminApplyEntry() {
//     await setSelectNCRAutoTopic()
//     document.getElementById('selNCRAutoTopic_Entry').value = objNCRAutoAdminApplyEntry.ID_ProductItem
//     document.getElementById('edtID_NCRAutoAdminTopic_Entry').value = objNCRAutoAdminApplyEntry.ID_NCRAutoAdminTopic
//     document.getElementById('edtID_NCRAutoAdminProjectApply_Entry').value = objNCRAutoAdminApplyEntry.ID_NCRAutoAdminProjectApply
//     document.getElementById('edtIsDry_Entry').value = objNCRAutoAdminApplyEntry.IsDry
//     document.getElementById('edtStartTime_Entry').value = objNCRAutoAdminApplyEntry.StartTime
//     document.getElementById('edtDetail_Entry').value = objNCRAutoAdminApplyEntry.Detail
//     document.getElementById('edtEndTime_Entry').value = objNCRAutoAdminApplyEntry.EndTime
//     document.getElementById('chkID_EmployeeRequest_Entry').checked = objNCRAutoAdminApplyEntry.ID_EmployeeRequest

// }

async function dataEntry_NCRAutoAdminApply() {
    // let url = `${myDomain}/ncr_auto_topic_api`
    let method = ''
    if (dataControlNCRAutoAdminApplyEntry === 'Add') {
        method = 'post'
    }
    else if (dataControlNCRAutoAdminApplyEntry === 'Edit') {
        method = 'put'
    }
    else if (dataControlNCRAutoAdminApplyEntry === 'Search' || dataControlNCRAutoAdminApplyEntry === 'Get') {
        method = 'get'
    }
    else if (dataControlNCRAutoAdminApplyEntry === 'Delete') {
        method = 'delete'
    }
    if (dataControlNCRAutoAdminApplyEntry !== '') {
        collectNCRAutoAdminApplyEntry()
        await reqAndRes(urlNCRAutoAdminApply, method, objNCRAutoAdminApplyEntry, function (dataRes) {
            console.log(dataRes)
            if (method !== 'delete') {

                document.getElementById('btnNCRAutoAdminApplyClose').click()
            }
            document.getElementById('modal-title-label-control').innerHTML = 'NONE'
            showDataApply()
        })
    }

    dataControlNCRAutoAdminApplyEntry = ''
}

async function showDataApply() {
    $("#apply_table").DataTable().destroy()
    let innerHTML = ''
    let tbody = document.getElementById('apply_body')
    tbody.innerHTML = innerHTML
    // collectNCRAutoTopicSearch()

    let rows = []
    await reqAndRes(urlNCRAutoAdminApply, 'GET', objNCRAutoAdminApplySearch, function (dataRes) {
        dataSet = dataRes
        console.table(dataRes)
        dataSet.forEach(data => {
            rows.push(
                [

                ]
            )
        });
    })

    $("#apply_table").dataTable({
        data: rows,
        createdRow: function (row, data, dataIndex) {
            row.onclick = function () {
                objNCRAutoAdminApplyEntry.ID = data[0]
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


    // $("#apply_table").dataTable({
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
    document.getElementById('apply_table_wrapper').classList.add('p-2')
    // let thead = document.querySelector('#tbTableTroubleAndActionHistory thead')
    let row = document.querySelectorAll('#apply_table_wrapper .row')

    row[1].classList.add('mb-2', 'mt-2')
    row[1].querySelector('div').id = 'boxApplyTable'
    row[1].classList.remove('row')

    document.querySelectorAll('#apply_table_wrapper thead tr th.sorting_asc').forEach(th => {
        th.classList.remove('sorting_asc')
    });

    document.querySelectorAll('#apply_body tr td')[0].click()
}


function startPageApply() {
    showDataApply()
    setSelectNCRAutoAdminTopic()
}

function setSelectNCRAutoAdminTopic(){
    // selNCRAutoAdminTopicProduct_Entry
    reqAndRes(urlNCRAutoAdminTopic,'GET',{},function(dataRes){
        // console.table(dataRes)
        let innerHTML =''
        dataRes.forEach(ncrAdmin => {
            innerHTML += `<option value=${ncrAdmin.ID}>[${ncrAdmin.ProcessNo}.${ncrAdmin.ProcessCaseNo}] ${ncrAdmin.Name}</option>`
        });
        document.getElementById('selNCRAutoAdminTopicProduct_Entry').innerHTML = innerHTML
    })
}

document.getElementById('btnNCRAutoAdminApplyAdd').onclick = function () {
    dataControlNCRAutoAdminApplyEntry = 'Add'
    document.getElementById('modal-title-label-control-product').innerHTML = 'ADD'
    productItemIDSelectedList = []
    resetProductItem()
    // displayNCRAutoAdminApplyEntry()
}

// document.getElementById('selNCRAutoTopic_Entry').onchange = function (){
//     let ncr = listNCRAUtoTopic.find((o)=> o.ID == parseInt(document.getElementById('selNCRAutoTopic_Entry').value))
//     document.getElementById('edtID_NCRAutoAdminProjectApply_Entry').value = ncr.ID_NCRAutoAdminProjectApply
//     document.getElementById('edtIsDry_Entry').value = ncr.IsDry
//     document.getElementById('edtStartTime_Entry').value = ncr.StartTime
//     document.getElementById('edtDetail_Entry').value = ncr.Detail
//     document.getElementById('edtEndTime_Entry').value = ncr.EndTime

// }

// document.getElementById('btnNCRAutoAdminApplyEdit').onclick = function () {

//     reqAndRes(urlNCRAutoAdminApply, 'GET', objNCRAutoAdminApplyEntry, function (dataRes) {
//         resetProductItem()
//         console.log(dataRes)
//         objNCRAutoAdminApplyEntry = dataRes
//         displayNCRAutoAdminApplyEntry()
//         dataControlNCRAutoAdminApplyEntry = 'Edit'
//         document.getElementById('modal-title-label-control').innerHTML = 'EDIT'
//     })
// }

// document.getElementById('btnSearchNCRAutoTopic').onclick = function () {
//     showDataApply()
// }
// document.getElementById('btnResetNCRAutoTopic').onclick = function () {
//     clearNCRAutoTopicSearch()
//     showDataApply()
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
//         objNCRAutoAdminApplyEntry.ID = id
//         dataControlNCRAutoAdminApplyEntry = 'Delete'
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




startPageApply()