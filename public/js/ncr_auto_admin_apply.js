let productItemIDSelectedList = []
let objNCRAutoAdminApplyEntry = {
    "ID": 0,
    "ID_ProductItem_List": [],
    "ID_ProductItem": 0,
    "ID_NCRAutoAdminTopic": 0,
    "ID_NCRAutoAdminProjectApply": 0,
    "StartTime": "",
    "EndTime": "",
    "ID_EmployeeRequest": 0,
    "Reason": "",
    "attachFile_List": [],
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
    objNCRAutoAdminApplyEntry.ID_NCRAutoAdminTopic = parseInt(document.getElementById('selNCRAutoAdminTopicPile_Entry').value)

    // objNCRAutoAdminApplyEntry.ID_NCRAutoAdminProjectApply = 0

    objNCRAutoAdminApplyEntry.StartTime = document.getElementById('dtpStartDate').value.replace('T', ' ')
    objNCRAutoAdminApplyEntry.EndTime = document.getElementById('dtpEndDate').value.replace('T', ' ')
    objNCRAutoAdminApplyEntry.ID_EmployeeRequest = 0
    objNCRAutoAdminApplyEntry.Reason = document.getElementById('edtReason').value
}
function clearNCRAutoAdminApplyEntry() {
    objNCRAutoAdminApplyEntry.ID_ProductItem_List = []
    objNCRAutoAdminApplyEntry.ID_ProductItem = 0
    objNCRAutoAdminApplyEntry.ID_NCRAutoAdminTopic = 0
    objNCRAutoAdminApplyEntry.StartTime = ''
    objNCRAutoAdminApplyEntry.EndTime = ''
    objNCRAutoAdminApplyEntry.ID_EmployeeRequest = 0
    objNCRAutoAdminApplyEntry.attachFile_List = []
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

function displayNCRAutoAdminApplyEntry() {

    if (objNCRAutoAdminApplyEntry.attachFile_List.length > 0) {
        let innerHTML = ''
        objNCRAutoAdminApplyEntry.attachFile_List.forEach(fileDetail => {
            innerHTML += `
                <tr>
                    <td class="text-center align-middle">
                        <button class="btn btn-danger" onclick="deleteFileJob(this)"><i class="fas fa-minus"></i></button>
                        
                    </td>
                    <td class="text-center align-middle"><input class="form-control" type="file" onchange="showFileDetail(event)"></td>
                    <td class="text-center align-middle id-master-file is-master">${fileDetail.ID_MasterFile}</td>
                    <td class="text-center align-middle">${fileDetail.fileName}</td>
                    <td class="text-center align-middle">${fileDetail.fileType}</td>
                    <td class="text-center align-middle">${fileDetail.fileSize} bytes</td>
                     <td class="text-center align-middle">
                        <a class="btn btn-secondary" href="http://${fileDetail.fileAddress}" target="_blank">
                            <i class="fas fa-download"></i>
                        </a>
                    </td>
                
                </tr>
            `
        });

        innerHTML += `
            <tr>
                    <td class="text-center align-middle">
                        <button class="btn btn-primary" onclick="addFileJob(this)"><i class="fas fa-plus"></i></button>
                        
                    </td>
                    <td class="text-center align-middle"><input class="form-control d-none" type="file" onchange="showFileDetail(event)"></td>
                    <td class="text-center align-middle id-master-file is-not-master">0</td>
                    <td class="text-center align-middle"></td>
                    <td class="text-center align-middle"></td>
                    <td class="text-center align-middle"></td>
                     <td class="text-center align-middle">
                        <a class="btn btn-secondary" href="#" onclick="viewFile(this,null)">
                            <i class="fas fa-download"></i>
                        </a>
                    </td>
                
                </tr>`

        document.getElementById('attach_file_pile_body').innerHTML = innerHTML
    }
    else {

        document.getElementById('attach_file_pile_body').innerHTML = `
                <tr>
                    <td class="text-center align-middle">
                        <button class="btn btn-primary" onclick="addFileJob(this)"><i class="fas fa-plus"></i></button>
                        
                    </td>
                    <td class="text-center align-middle"><input class="form-control d-none" type="file" onchange="showFileDetail(event)"></td>
                    <td class="text-center align-middle id-master-file is-not-master">0</td>
                    <td class="text-center align-middle"></td>
                    <td class="text-center align-middle"></td>
                    <td class="text-center align-middle"></td>
                     <td class="text-center align-middle">
                        <a class="btn btn-secondary" href="#" onclick="viewFile(this,null)">
                            <i class="fas fa-download"></i>
                        </a>
                    </td>
                
                </tr>
        `
    }


    let selNCRAutoAdminTopicPile_Entry = $('#selNCRAutoAdminTopicPile_Entry').selectize();
    selNCRAutoAdminTopicPile_Entry[0].selectize.setValue(objNCRAutoAdminApplyEntry.ID_NCRAutoAdminTopic); // สำหรับค่าเดียว

    // document.getElementById('selNCRAutoAdminTopicPile_Entry').value = objNCRAutoAdminApplyEntry.ID_NCRAutoAdminTopic
    document.getElementById('dtpStartDate').value = objNCRAutoAdminApplyEntry.StartTime
    document.getElementById('dtpEndDate').value = objNCRAutoAdminApplyEntry.EndTime
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
        await reqAndRes(urlNCRAutoAdminApply, method, objNCRAutoAdminApplyEntry, async function (dataRes) {
            console.log('data add plie apply : ', dataRes)
           
            if (method == 'post' || method == 'put') {
                const formData = new FormData();
                // formData.append('ID_NCRAutoAdminApply_List', ID_NCRAutoAdminApply_List)
                if(Array.isArray(dataRes)){

                    dataRes.forEach(obj => {
                        formData.append('ID_NCRAutoAdminApply_List[]', obj.ID)
                    });
                }
                else{
                    formData.append('ID_NCRAutoAdminApply_List[]', dataRes.ID)
                }

                document.querySelectorAll(`#attach_file_pile_body * td.id-master-file`).forEach(td => {
                    if (parseInt(td.innerHTML) > 0) {
                        // ID_MasterFile_List.push(parseInt(td.innerHTML))
                        formData.append('ID_MasterFile_List[]', parseInt(td.innerHTML))

                    }
                });
                // กรองเฉพาะ input ที่มีไฟล์เลือกแล้ว
                const fileInputs = [...document.querySelectorAll(`#attach_file_pile_body * input[type=file]`)]
                    .filter(elInputFile => elInputFile.files.length > 0);

                fileInputs.forEach(input => {
                    const file = input.files[0];
                    formData.append('files[]', file); // ส่งไฟล์ในชื่อ 'files[]'
                });


                formData.forEach((value, key) => {
                    console.log(`${key}:`, value); // ตรวจสอบค่าในแต่ละ key
                });
                await fetch(urlNCRAutoAdminApply_AttachFile, {
                    method: 'post',
                    body: formData
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });


                document.getElementById('btnConfirmApplyClose').click()
                document.getElementById('btnNCRAutoAdminApplyClose').click()
            }
            

            // document.getElementById('btnConfirmApplyClose').click()
            // document.getElementById('btnNCRAutoAdminApplyClose').click()
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
                    data.EndTime == null ? '' : data.EndTime,
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
    // selNCRAutoAdminTopicPile_Entry
    let dataReq = {
        Cancel: 2,
    }
    reqAndRes(urlNCRAutoAdminTopic, 'GET', dataReq, function (dataRes) {
        // console.table(dataRes)
        let innerHTML = ''
        dataRes.forEach(ncrAdmin => {
            innerHTML += `<option value=${ncrAdmin.ID}>[${ncrAdmin.ProcessNo}.${ncrAdmin.ProcessCaseNo}] ${ncrAdmin.Name}</option>`
        });
        document.getElementById('selNCRAutoAdminTopicPile_Entry').innerHTML = innerHTML
        $('#selNCRAutoAdminTopicPile_Entry').selectize({ normalize: true });
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

function modalConfirm(level) {

    if (level === 'PRODUCT') {
        if (document.querySelectorAll(`#selected_apply_body tr`).length > 0) {

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

    reqAndRes(urlNCRAutoAdminApply, 'GET', { ID: objNCRAutoAdminApplyEntry.ID }, async function (dataRes) {
        clearNCRAutoAdminApplyEntry()
        console.log(dataRes)
        objNCRAutoAdminApplyEntry = dataRes

        await reqAndRes(urlMasterFileListByPlieApply, 'GET', { ID_NCRAutoAdminApply: objNCRAutoAdminApplyEntry.ID }, async function (dataRes) {
            let attachFile_List = []
            dataRes.forEach(masterFile => {
                attachFile_List.push({
                    ID_MasterFile: masterFile.ID,
                    fileAddress: masterFile.Address,
                    fileName: masterFile.FileName,
                    fileType: masterFile.FileType,
                    fileSize: masterFile.FileSize,
                    fileContent: ''
                })
            });
            objNCRAutoAdminApplyEntry.attachFile_List = attachFile_List
        })
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





startPageApply()