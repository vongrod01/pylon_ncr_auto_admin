let productItemIDSelectedList = []
let objNCRAutoAdminApplyEntry = {
    "ID": 0,
    "ID_ProductItem_List": [],
    "ID_ProductItem":0,
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
    "ID_ProductItem_List": [],
    "ID_ProductItem":0,
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
let dataControlNCRAutoAdminApplyEntry = ''
function resetProductItem() {
    document.getElementById('edtProject_Search').value = ''
    document.getElementById('edtProductItemNo_Search').value = ''
    document.getElementById('edtProductType_Search').value = ''
    document.getElementById('selected_apply_body').innerHTML = ''
    showDataProductItemList()
}

function showDataProductItemList() {
    let dataReq = {
        Project: document.getElementById('edtProject_Search').value,
        ProductItemNo: document.getElementById('edtProductItemNo_Search').value,
        ProductType: document.getElementById('edtProductType_Search').value,
    }

    let tbody = document.getElementById('selecting_apply_body')
    tbody.innerHTML = ''
    reqAndRes(urlProductItemList, 'GET', dataReq, async function (dataRes) {
        let innerHTML = ''
        dataRes.forEach(productItem => {
            if (!productItemIDSelectedList.includes(productItem.ID_ProductItem)) {

                innerHTML += `
                    <tr>
                        <td class="text-center"><input class="form-check-input" type="checkbox" value=${productItem.ID_ProductItem} id="chkProductItem_${productItem.ID_ProductItem_List}"></td>
                        <td>${productItem.ID_ProductItem}</td>
                        <td>${productItem.ProductItemNo}</td>
                        <td>${productItem.JobNo} ${productItem.ProjectName}</td>
                        <td>${productItem.product_name} (${productItem.product_no})</td>
                    </tr>
                `
            }
        });
        tbody.innerHTML = innerHTML
    })
}


function collectNCRAutoAdminApplyEntry() {
objNCRAutoAdminApplyEntry.ID_ProductItem_List = productItemIDSelectedList
objNCRAutoAdminApplyEntry.ID_NCRAutoAdminTopic = parseInt(document.getElementById('selNCRAutoAdminTopicProduct_Entry').value)

// objNCRAutoAdminApplyEntry.ID_NCRAutoAdminProjectApply = 0

objNCRAutoAdminApplyEntry.StartTime = document.getElementById('dtpStartDate').value.replace('T',' ')
objNCRAutoAdminApplyEntry.EndTime = document.getElementById('dtpEndDate').value.replace('T',' ')
objNCRAutoAdminApplyEntry.ID_EmployeeRequest = 0
objNCRAutoAdminApplyEntry.Reason = document.getElementById('edtReason').value
}
function clearNCRAutoAdminApplyEntry() {
    objNCRAutoAdminApplyEntry.ID_ProductItem_List = []
    objNCRAutoAdminApplyEntry.ID_ProductItem = 0
    objNCRAutoAdminApplyEntry.ID_NCRAutoAdminTopic = 0
    objNCRAutoAdminApplyEntry.ID_NCRAutoAdminProjectApply = 0
    objNCRAutoAdminApplyEntry.StartTime = ''
    objNCRAutoAdminApplyEntry.EndTime = ''
    objNCRAutoAdminApplyEntry.ID_EmployeeRequest = 0
    objNCRAutoAdminApplyEntry.Reason = ''
    objNCRAutoAdminApplyEntry.Detail = ''
    objNCRAutoAdminApplyEntry.Remark = ''
    objNCRAutoAdminApplyEntry.AddBy = 0
    objNCRAutoAdminApplyEntry.AddWhen = ''
    objNCRAutoAdminApplyEntry.UpdateBy = 0
    objNCRAutoAdminApplyEntry.UpdateWhen = ''
    objNCRAutoAdminApplyEntry.DeleteBy = 0
    objNCRAutoAdminApplyEntry.DeleteWhen = '' 
}

function displayNCRAutoAdminApplyEntry(){
    document.getElementById('dtpStartDate').value = ''
    document.getElementById('dtpEndDate').value = ''
    document.getElementById('edtEmployeeRequest').value = objNCRAutoAdminApplyEntry.ID_EmployeeRequest
    document.getElementById('edtReason').value = objNCRAutoAdminApplyEntry.Reason
}


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

                document.getElementById('btnConfirmApplyClose').click()
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
        // console.table(dataRes)
        dataSet.forEach(data => {
            rows.push(
                [
                    data.ID,
                    data.ID_ProductItem,
                    data.ProductItemNo,
                    data.NCRAutoAdminName,
                    data.Reason,
                    data.StartTime,
                    data.EndTime == null?'':data.EndTime,
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
        document.getElementById('selNCRAutoAdminTopicProduct_Entry').innerHTML = innerHTML
        $('#selNCRAutoAdminTopicProduct_Entry').selectize({normalize:true});
    })
}

function selectedProductItem() {
    let tbodySelected = document.getElementById('selected_apply_body');
    document.querySelectorAll(`#selecting_apply_body * input[type=checkbox]:checked`).forEach(e => {
        let tr = e.parentElement.parentElement
        tbodySelected.appendChild(tr);
        e.checked = false
        productItemIDSelectedList.push(parseInt(e.value))
    });
}

function deselectedProductItem() {
    let tbodySelecting = document.getElementById('selecting_apply_body');
    document.querySelectorAll(`#selected_apply_body * input[type=checkbox]:checked`).forEach(e => {
        let tr = e.parentElement.parentElement
        tbodySelecting.appendChild(tr);
        e.checked = false
        // productItemIDSelectedList.push(parseInt(e.value))

        let index = productItemIDSelectedList.indexOf(parseInt(e.value));
        if (index > -1) { // only splice array when item is found
            productItemIDSelectedList.splice(index, 1); // 2nd parameter means remove one item only
        }
    });

}

function modalConfirm(level){

    if(level==='PRODUCT'){
        if(document.querySelectorAll(`#selected_apply_body tr`).length > 0){

            let myModal = new bootstrap.Modal(document.getElementById('modalConfirmApply'), { 
                keyboard: false 
              }) 
              myModal.show() 
        }
    }

}

document.getElementById('btnNCRAutoAdminApplyAdd').onclick = function () {
    dataControlNCRAutoAdminApplyEntry = 'Add'
    document.getElementById('modal-title-label-control-product').innerHTML = 'ADD'
    clearNCRAutoAdminApplyEntry()
    displayNCRAutoAdminApplyEntry()
    productItemIDSelectedList = []
    resetProductItem()
    // displayNCRAutoAdminApplyEntry()
}
document.getElementById('btnNCRAutoAdminApplyEdit').onclick = function () {
    // document.getElementById('modal-title-label-control-product').innerHTML = 'ADD'
    // productItemIDSelectedList = []
    
    reqAndRes(urlNCRAutoAdminApply, 'GET', {ID:objNCRAutoAdminApplyEntry.ID}, function (dataRes) {
        clearNCRAutoAdminApplyEntry()
        console.log(dataRes)
        objNCRAutoAdminApplyEntry = dataRes
        displayNCRAutoAdminApplyEntry()
        dataControlNCRAutoAdminApplyEntry = 'Edit'
        // document.getElementById('modal-title-label-control').innerHTML = 'EDIT'
    })
    clearNCRAutoAdminApplyEntry()
    // resetProductItem()
    displayNCRAutoAdminApplyEntry()
}

document.getElementById('btnNCRAutoAdminApplyDelete').onclick = function () {
    try {
        dataControlNCRAutoAdminApplyEntry = 'Delete'
        dataEntry_NCRAutoAdminApply()
    } catch (error) {
        
    }
}

document.getElementById('chkSelectAll_ProductItem').onchange = function () {
    if (document.getElementById('chkSelectAll_ProductItem').checked) {
        document.querySelectorAll(`#selecting_apply_body * input[type=checkbox]`).forEach(chk => {
            chk.checked = true
        });
    }
    else {
        document.querySelectorAll(`#selecting_apply_body * input[type=checkbox]`).forEach(chk => {
            chk.checked = false
        });
    }

}
document.getElementById('chkDeselectAll_ProductItem').onchange = function () {
    if (document.getElementById('chkDeselectAll_ProductItem').checked) {
        document.querySelectorAll(`#selected_apply_body * input[type=checkbox]`).forEach(chk => {
            chk.checked = true
        });
    }
    else {
        document.querySelectorAll(`#selected_apply_body * input[type=checkbox]`).forEach(chk => {
            chk.checked = false
        });
    }

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