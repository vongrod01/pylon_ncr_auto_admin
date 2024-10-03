
// let attachFile_List = []
let objNCRAutoAdminJobApplyEntry = {
    "ID": 0,
    "ID_Job": 0,
    "ID_NCRAutoAdminTopic": 0,
    "ID_Product_List": {
        dry: [0],
        wet: [0]
    },
    "ID_Diameter_List": [0],
    "ID_Zone_List": [0],
    "ID_Type_List": [0],
    "StartTime": "",
    "EndTime": "",
    "ID_EmployeeRequest": 0,
    "Reason": "",
    "attachFile_List":[],
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
    "NCRAdminName": "",
    "JobName": "",
    "IsDry": 2,
    "Reason": "",

}
let dataControlNCRAutoAdminJobApplyEntry = ''
function clearNCRAutoAdminJobApplyEntry() {

    

    objNCRAutoAdminJobApplyEntry.ID = 0
    objNCRAutoAdminJobApplyEntry.ID_Job = 0
    objNCRAutoAdminJobApplyEntry.ID_NCRAutoAdminTopic = 0
    objNCRAutoAdminJobApplyEntry.ID_Product_List.dry = [],
        objNCRAutoAdminJobApplyEntry.ID_Product_List.wet = [],

        objNCRAutoAdminJobApplyEntry.ID_Diameter_List = [],
        objNCRAutoAdminJobApplyEntry.ID_Zone_List = [],
        objNCRAutoAdminJobApplyEntry.ID_Type_List = [],

        objNCRAutoAdminJobApplyEntry.attachFile_List = []
        objNCRAutoAdminJobApplyEntry.StartTime = ""
    objNCRAutoAdminJobApplyEntry.EndTime = ""
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


async function collectNCRAutoAdminJobApplyEntry() {
    // objNCRAutoAdminJobApplyEntry.ID = 0
    // [...document.querySelectorAll(`#selProductList_Entry * input[type=checkbox]:checked`)].map(function (e) {
    //     return parseInt(e.value)
    objNCRAutoAdminJobApplyEntry.ID_Job = document.getElementById('selJob_Entry').value
    objNCRAutoAdminJobApplyEntry.ID_NCRAutoAdminTopic = document.getElementById('selNCRAutoAdminTopicJob_Entry').value
    objNCRAutoAdminJobApplyEntry.ID_Product_List.dry = [...document.querySelectorAll(`#selProductList_Entry * input[type=checkbox]:checked.is-dry`)].map(function (e) {
        return parseInt(e.value)
    })
    objNCRAutoAdminJobApplyEntry.ID_Product_List.wet = [...document.querySelectorAll(`#selProductList_Entry * input[type=checkbox]:checked.is-wet`)].map(function (e) {
        return parseInt(e.value)
    })
    objNCRAutoAdminJobApplyEntry.ID_Diameter_List = [...document.querySelectorAll(`#selDiameterList_Entry * input[type=checkbox]:checked`)].map(function (e) {
        return parseInt(e.value)
    })
    objNCRAutoAdminJobApplyEntry.ID_Zone_List = [...document.querySelectorAll(`#selZoneList_Entry * input[type=checkbox]:checked`)].map(function (e) {
        return parseInt(e.value)
    })
    objNCRAutoAdminJobApplyEntry.ID_Type_List = [...document.querySelectorAll(`#selTypeList_Entry * input[type=checkbox]:checked`)].map(function (e) {
        return parseInt(e.value)
    })

    let attachFile_List = []
   

     // กรองเฉพาะ input ที่มีไฟล์เลือกแล้ว
     const fileInputs = [...document.querySelectorAll(`#attach_file_job_body * input[type=file]`)]
     .filter(elInputFile => elInputFile.files.length > 0);

     // ใช้ Promise.all เพื่อรอให้ทุกการอ่านไฟล์เสร็จสิ้น
     const filePromises = fileInputs.map(async (elInputFile) => {
        try {
            const fileDetail = await getFileDetail(elInputFile);
            attachFile_List.push(fileDetail);
        } catch (error) {
            console.error('Error reading file:', error);
        }
    });


    // รอให้ทุกไฟล์ถูกอ่าน
    await Promise.all(filePromises);

    // id-master-file
    document.querySelectorAll(`#attach_file_job_body * td.id-master-file`).forEach(td => {
        if(parseInt(td.innerHTML) > 0){
            attachFile_List.push({
                ID_MasterFile:parseInt(td.innerHTML),
                fileAddress:'',
                fileName: '',
                fileType: '',
                fileSize: 0,
                fileContent: ''
            })
        }
    });
    objNCRAutoAdminJobApplyEntry.attachFile_List = attachFile_List
    objNCRAutoAdminJobApplyEntry.StartTime = document.getElementById('dtpStartDateJob_Entry').value.replace('T', ' ')
    objNCRAutoAdminJobApplyEntry.EndTime = document.getElementById('dtpEndDateJob_Entry').value.replace('T', ' ')
    objNCRAutoAdminJobApplyEntry.ID_EmployeeRequest = 0
    objNCRAutoAdminJobApplyEntry.Reason = document.getElementById('edtReasonJob_Entry').value
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

    if(objNCRAutoAdminJobApplyEntry.attachFile_List.length > 0){
        let innerHTML = ''
        objNCRAutoAdminJobApplyEntry.attachFile_List.forEach(fileDetail => {
            innerHTML += `
                <tr>
                    <td class="text-center align-middle">
                        <button class="btn btn-danger" onclick="deleteFileJob(this)"><i class="fas fa-minus"></i></button>
                        
                    </td>
                    <td class="text-center align-middle"><input class="form-control" type="file" onchange="showFileDetail(event)"></td>
                    <td class="text-center align-middle id-master-file">${fileDetail.ID_MasterFile}</td>
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

        innerHTML+= `
            <tr>
                    <td class="text-center align-middle">
                        <button class="btn btn-primary" onclick="addFileJob(this)"><i class="fas fa-plus"></i></button>
                        
                    </td>
                    <td class="text-center align-middle"><input class="form-control d-none" type="file" onchange="showFileDetail(event)"></td>
                    <td class="text-center align-middle id-master-file">0</td>
                    <td class="text-center align-middle"></td>
                    <td class="text-center align-middle"></td>
                    <td class="text-center align-middle"></td>
                     <td class="text-center align-middle">
                        <a class="btn btn-secondary" href="#" onclick="viewFile(this,null)">
                            <i class="fas fa-download"></i>
                        </a>
                    </td>
                
                </tr>`

            document.getElementById('attach_file_job_body').innerHTML =innerHTML
    }
    else{

        document.getElementById('attach_file_job_body').innerHTML = `
                <tr>
                    <td class="text-center align-middle">
                        <button class="btn btn-primary" onclick="addFileJob(this)"><i class="fas fa-plus"></i></button>
                        
                    </td>
                    <td class="text-center align-middle"><input class="form-control d-none" type="file" onchange="showFileDetail(event)"></td>
                    <td class="text-center align-middle id-master-file">0</td>
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


    const checkboxes = document.querySelectorAll('#ModalNCRAutoAdminJobApplyt * input[type="checkbox"]');

    // วนลูปผ่าน checkboxes และตั้งค่า checked เป็น false
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    let selJob_Entry = $('#selJob_Entry').selectize();
    selJob_Entry[0].selectize.setValue(objNCRAutoAdminJobApplyEntry.ID_Job); // สำหรับค่าเดียว

    let selNCRAutoAdminTopicJob_Entry = $('#selNCRAutoAdminTopicJob_Entry').selectize();
    selNCRAutoAdminTopicJob_Entry[0].selectize.setValue(objNCRAutoAdminJobApplyEntry.ID_NCRAutoAdminTopic); // สำหรับค่าเดียว



    // await setSelectType()
    // await setSelectZone()
    // document.getElementById('selProduct_Entry').value = objNCRAutoAdminJobApplyEntry.ID_Product_List 


    objNCRAutoAdminJobApplyEntry.ID_Product_List.dry.forEach(ID => {
        document.querySelector(`#selProductList_Entry * input[type="checkbox"][value="${ID}"].is-dry`).checked = true;
    });
    objNCRAutoAdminJobApplyEntry.ID_Product_List.wet.forEach(ID => {
        document.querySelector(`#selProductList_Entry * input[type="checkbox"][value="${ID}"].is-wet`).checked = true;
    });
    // objNCRAutoAdminJobApplyEntry.ID_Product_List.forEach(ID => {
    //     document.querySelector(`#selProductList_Entry * input[type="checkbox"][value="${ID}"]`).click();
    // });
    await setSelectDiameter()
    objNCRAutoAdminJobApplyEntry.ID_Diameter_List.forEach(ID => {
        document.querySelector(`#selDiameterList_Entry * input[type="checkbox"][value="${ID}"]`).checked = true;
    });
    objNCRAutoAdminJobApplyEntry.ID_Zone_List.forEach(ID => {
        document.querySelector(`#selZoneList_Entry * input[type="checkbox"][value="${ID}"]`).checked = true;
    });
    objNCRAutoAdminJobApplyEntry.ID_Type_List.forEach(ID => {
        document.querySelector(`#selTypeList_Entry * input[type="checkbox"][value="${ID}"]`).checked = true;
    });

    document.getElementById('dtpStartDateJob_Entry').value = objNCRAutoAdminJobApplyEntry.StartTime
    document.getElementById('dtpEndDateJob_Entry').value = objNCRAutoAdminJobApplyEntry.EndTime
    document.getElementById('edtReasonJob_Entry').value = objNCRAutoAdminJobApplyEntry.Reason
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
        await collectNCRAutoAdminJobApplyEntry()
        console.log("objNCRAutoAdminJobApplyEntry", objNCRAutoAdminJobApplyEntry)
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
    $("#job_apply_table").DataTable().destroy()
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
                    data.ID,
                    data.NCRAdminName,
                    `${data.JobNo} : ${data.JobName}`,
                    `
                    
                    <details onclick="showJobCondition(${data.ID},this)">
                        <summary class="fw-bold">Click Show Detail</summary>
                        <div class="sel-condition condition-content">
                           
                        </div>
                    </details>
                    `,
                    data.Reason,
                    data.StartTime,
                    data.EndTime
                ]
            )
        });
    })

    $("#job_apply_table").dataTable({
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


    // $("#job_apply_table").dataTable({
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
    document.getElementById('job_apply_table_wrapper').classList.add('p-2')
    // let thead = document.querySelector('#tbTableTroubleAndActionHistory thead')
    let row = document.querySelectorAll('#job_apply_table_wrapper .row')

    row[1].classList.add('mb-2', 'mt-2')
    row[1].querySelector('div').id = 'boxJobApplytTable'
    row[1].classList.remove('row')

    document.querySelectorAll('#job_apply_table_wrapper thead tr th.sorting_asc').forEach(th => {
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
async function selectALLItem(el) {
    console.log(el)
    let parentElement = el.parentElement.parentElement
    let checkboxes = parentElement.querySelectorAll('input[type="checkbox"]');

    checkboxes.forEach(checkbox => {
        checkbox.checked = el.checked;
    });

    if (el.id == 'selAllProduct') {
        setSelectDiameter()
    }
}
async function setSelectNCRAutoAdminTopic() {
    // selNCRAutoAdminTopicProduct_Entry
    let dataReq = {
        Cancel: 2,
    }
    await reqAndRes(urlNCRAutoAdminTopic, 'GET', dataReq, function (dataRes) {
        // console.table(dataRes)
        let innerHTML = ''
        dataRes.forEach(ncrAdmin => {
            innerHTML += `<option value=${ncrAdmin.ID}>[${ncrAdmin.ProcessNo}.${ncrAdmin.ProcessCaseNo}] ${ncrAdmin.Name}</option>`
        });
        document.getElementById('selNCRAutoAdminTopicJob_Entry').innerHTML = innerHTML
        $('#selNCRAutoAdminTopicJob_Entry').selectize({ normalize: true });
    })
}

async function setSelectJob() {


    await reqAndRes(urlJobListForNCRApply, 'GET', {}, function (dataRes) {
        // console.table(dataRes)
        let innerHTML = ''
        dataRes.forEach(job => {
            innerHTML += `<option value=${job.ID_Job}>${job.JobNo} : ${job.ProjectName}</option>`
        });
        document.getElementById('selJob_Entry').innerHTML = innerHTML
        $('#selJob_Entry').selectize({ normalize: true });
        setSelectType()
        setSelectZone()
    })

}

async function setSelectProduct() {
    await await reqAndRes(urlProductListForNCRApply, 'GET', {}, async function (dataRes) {
        let innerHTML = ''

        dataRes.forEach(product => {
            innerHTML += `
            <div class="mb-2 me-2 border border-2 rounded border-secondary " style="width:220px;">
                <div class="w-100 mb-1 fw-bold text-center bg-secondary" style="color:#fff">

                    ${product.ProductName}
                </div>
                <div class="d-flex justify-content-center">
                    <span class="form-check me-2" >
                        <input class="form-check-input is-dry" type="checkbox" value="${product.ID_Product}" onclick="setSelectDiameter()" id="${product.ProductName}_${product.ID_Product}_1">
                        <label class="form-check-label" for="${product.ProductName}_${product.ID_Product}_1">
                            
                            แห้ง
                        </label>
                
                    </span>
                    <div class="form-check me-2">
                    
                        <input class="form-check-input is-wet" type="checkbox" value="${product.ID_Product}" onclick="setSelectDiameter()" id="${product.ProductName}_${product.ID_Product}_0">
                        <label class="form-check-label" for="${product.ProductName}_${product.ID_Product}_0">
                    
                            เปียก
                        </label>
                    </div>
                </div>
            </div>
            `
        });
        document.getElementById('selProductList_Entry').innerHTML = innerHTML
    })
}
async function setSelectDiameter() {

    let dataReq = {
        ID_Product_List: [...document.querySelectorAll(`#selProductList_Entry * input[type=checkbox]:checked`)].map(function (e) {
            return parseInt(e.value)
        })
    }

    await reqAndRes(urlProductDiameterList, 'GET', dataReq, async function (dataRes) {
        let innerHTML = ''

        dataRes.forEach(productSize => {


            innerHTML += `
            <div class="form-check me-4" style="width:220px">
                <input class="form-check-input" type="checkbox" value="${productSize.ID_ProductSize}">
                <label class="form-check-label" for="flexCheckChecked">
                    ${productSize.Diameter_Display}
                </label>
            </div>
            `
        });

        document.getElementById('selDiameterList_Entry').innerHTML = innerHTML

    })
}
async function setSelectZone() {
    let dataReq = {
        ID_Job: document.getElementById("selJob_Entry").value
    }
    await reqAndRes(urlJobZoneList, 'GET', dataReq, async function (dataRes) {
        let innerHTML = ''
        dataRes.forEach(zone => {

            innerHTML += `
            <div class="form-check me-4" style="width:220px">
                <input class="form-check-input" type="checkbox" value="${zone.ID_Zone}">
                <label class="form-check-label" for="flexCheckChecked">
                ${zone.ZoneName}
                </label>
            </div>
            `

        });
        document.getElementById('selZoneList_Entry').innerHTML = innerHTML

    })
}
async function setSelectType() {
    let dataReq = {
        ID_Job: document.getElementById("selJob_Entry").value
    }
    await reqAndRes(urlJobTypeList, 'GET', dataReq, async function (dataRes) {
        let innerHTML = ''
        dataRes.forEach(type => {

            innerHTML += `
            <div class="form-check me-4" style="width:200px">
                <input class="form-check-input" type="checkbox" value="${type.ID_Type}">
                <label class="form-check-label" for="flexCheckChecked">
                ${type.TypeName}
                </label>
            </div>
            `
        });
        document.getElementById('selTypeList_Entry').innerHTML = innerHTML

    })
}
async function showJobCondition(ID_NCRAutoAdminJobApply, el) {
    console.log("ID_NCRAutoAdminJobApply : ", ID_NCRAutoAdminJobApply)
    // console.log(el)
    reqAndRes(urlNCRConditionJobApplyListByNCRAutoAdminJobApply, 'GET', { ID_NCRAutoAdminJobApply: ID_NCRAutoAdminJobApply }, (dataRes) => {
        console.table(dataRes)
        let innerHTML = ''
        let product = ''
        let diameter = ''
        let type = ''
        let zone = ''
        dataRes.forEach(module => {
            if (module.ConditionModule == 'PRODUCT') {
                product += `<li>${module.ModuleData}</li>`
            }
            else if (module.ConditionModule == 'DIAMETER') {
                diameter += `<li>${module.ModuleData}</li>`
            }
            else if (module.ConditionModule == 'ZONE') {
                zone += `<li>${module.ModuleData}</li>`
            }
            else if (module.ConditionModule == 'TYPE') {
                type += `<li>${module.ModuleData}</li>`
            }
        });
        innerHTML = `
        ${product != '' ? `<ul><b>Product</b><br>${product}</ul>` : ``}
        ${diameter != '' ? `<ul><b>Diameter</b><br>${diameter}</ul>` : ``}
        ${zone != '' ? `<ul><b>Zone</b><br>${zone}</ul>` : ``}
        ${type != '' ? `<ul><b>Type</b><br>${type}</ul>` : ``}
        
        
        `
        el.querySelector('*.condition-content').innerHTML = innerHTML
        // console.log(innerHTML)
    })

}

async function addFileJob(el) {
    let tbody = el.parentElement.parentElement.parentElement
    let tdControl = el.parentElement
    let tdAttachFile = el.parentElement.parentElement.querySelectorAll('td')[1]
    let tr = document.createElement('tr');
    tr.innerHTML = `<td class="text-center align-middle">
            <button class="btn btn-primary" onclick="addFileJob(this)"><i class="fas fa-plus"></i></button>
            
        </td>
        <td class="text-center align-middle"><input class="form-control d-none" type="file" onchange="showFileDetail(event)"></td>
        <td class="text-center align-middle id-master-file">0</td>
        <td class="text-center align-middle"></td>
        <td class="text-center align-middle"></td>
        <td class="text-center align-middle"></td>
        <td class="text-center align-middle">
            <a class="btn btn-secondary" href="#" onclick="viewFile(this,null)">
                <i class="fas fa-download"></i>
            </a>
        </td>
    `
    tdAttachFile.querySelector('input').classList.remove('d-none')
    tdControl.innerHTML = `<button class="btn btn-danger" onclick="deleteFileJob(this)"><i class="fas fa-minus"></i></button>`
    tbody.appendChild(tr)
}

async function deleteFileJob(el) {
    let tr = el.parentElement.parentElement
    tr.remove()
}

async function showFileDetail(event) {
    const file = event.target.files[0];
    getFileDetail(event.target).then((data)=>{
        // console.table([data])
        let tr = event.target.parentElement.parentElement
        tr.querySelectorAll('td')[2].innerHTML = 0
        tr.querySelectorAll('td')[3].innerHTML = data.fileName
        tr.querySelectorAll('td')[4].innerHTML = data.fileType
        tr.querySelectorAll('td')[5].innerHTML = `${data.fileSize} bytes`
        tr.querySelectorAll('td')[6].innerHTML = ` <a class="btn btn-secondary" href="#" onclick="viewFile(this,null)">
            <i class="fas fa-download"></i>
        </a>`
        // if(file){

        // }
    }).catch((data)=>{
        
    })
   
    // attachFile_List = []
    //  document.querySelectorAll(`#attach_file_job_body * input[type=file]`).forEach( async (elInputFile) => {
    //     try {
            
    //         attachFile_List.push(await getFileDetail(elInputFile))
    //     } catch (error) {
            
    //     }
    //     // await getFileDetail(elInputFile).then((data)=>{
    //     // })
    // });

    
}

async function getFileDetail(elFIle) {
    return new Promise(async (resolve, reject) => {
        
        const file = elFIle.files[0];
        let ID_MasterFile = elFIle.parentElement.parentElement.querySelectorAll('td')[2].innerHTML
        let result = {
            ID_MasterFile:0,
            fileAddress:'',
            fileName: '',
            fileType: '',
            fileSize: 0,
            fileContent: ''
        }
        if (file) {
            // ดึงชื่อไฟล์พร้อมนามสกุล
            const fullFileName = file.name;
    
            // ตัดนามสกุลไฟล์ออก (เอาเฉพาะชื่อไฟล์)
            const fileName = fullFileName.substring(0, fullFileName.lastIndexOf('.'));
    
            // ดึงชนิดของไฟล์ (file extension)
            const fileType = fullFileName.split('.').pop();
    
            // ดึงขนาดของไฟล์ (เป็น byte)
            const fileSize = file.size;
    
            // สร้าง FileReader เพื่ออ่าน content ของไฟล์
            const reader = new FileReader();
    
            reader.onload = function (e) {
                // ดึง content ของไฟล์ในรูปแบบ base64
                const fileContent = e.target.result;
    

                result.fileName = fileName
                result.fileType = fileType
                result.fileSize = fileSize
                result.fileContent = fileContent
                resolve(result)
            };
    
            // อ่านไฟล์เป็น base64
             reader.readAsDataURL(file);
          
        }
        else{
            
            reject({
                ID_MasterFile:0,
                fileAddress:'',
                fileName: '',
                fileType: '',
                fileSize: 0,
                fileContent: ''
            })
        }
    })
}

async function viewFile(el, address = null){
    if(address == null){
        let inputFile = el.parentElement.parentElement.querySelector('* input')
        const file = inputFile.files[0]; // ดึงไฟล์แรกที่ถูกเลือก
        if (file) {
            // สร้าง blob URL จากไฟล์
            const fileURL = URL.createObjectURL(file);

            // เปิดไฟล์ในแท็บใหม่
            window.open(fileURL, '_blank');

            // ปล่อย URL เมื่อใช้งานเสร็จ เพื่อประหยัดหน่วยความจำ
            URL.revokeObjectURL(fileURL);
        }
    }
}


document.getElementById('btnNCRAutoAdminJobApplytAdd').onclick = function () {
    dataControlNCRAutoAdminJobApplyEntry = 'Add'
    document.getElementById('modal-title-label-control').innerHTML = 'ADD'
    
    clearNCRAutoAdminJobApplyEntry()
    displayNCRAutoAdminJobApplyEntry()
}
document.getElementById('btnNCRAutoAdminJobApplytEdit').onclick = function () {

    try {

        let rowData = new DataTable('#job_apply_table').rows({ selected: true }).data();
        let id = rowData[0][0]
        clearNCRAutoAdminJobApplyEntry()
        reqAndRes(urlNCRAutoAdminJobApply, 'GET', { ID: id }, async function (dataResJobApply) {
            objNCRAutoAdminJobApplyEntry = { ...dataResJobApply }
            await reqAndRes(urlNCRConditionJobApplyListByNCRAutoAdminJobApply, 'GET', { ID_NCRAutoAdminJobApply: id }, (dataResCondition) => {
                console.table("ข้อมูลเตรียม EDIT : ", dataResCondition)
                // objNCRAutoAdminJobApplyEntry.ID_Product_List.dry = []
                // objNCRAutoAdminJobApplyEntry.ID_Product_List.wet = []
                objNCRAutoAdminJobApplyEntry.ID_Product_List = {
                    dry: [],
                    wet: [],
                }
                objNCRAutoAdminJobApplyEntry.ID_Diameter_List = []
                objNCRAutoAdminJobApplyEntry.ID_Type_List = []
                objNCRAutoAdminJobApplyEntry.ID_Zone_List = []
                dataResCondition.forEach(Condition => {
                    if (Condition.ConditionModule == 'PRODUCT' && Condition.ConditionExtend_1 == '1') {
                        objNCRAutoAdminJobApplyEntry.ID_Product_List.dry.push(Condition.ID_ConditionModule)
                    }
                    if (Condition.ConditionModule == 'PRODUCT' && Condition.ConditionExtend_1 == '0') {
                        objNCRAutoAdminJobApplyEntry.ID_Product_List.wet.push(Condition.ID_ConditionModule)
                    }
                    else if (Condition.ConditionModule == 'DIAMETER') {
                        objNCRAutoAdminJobApplyEntry.ID_Diameter_List.push(Condition.ID_ConditionModule)
                    }
                    else if (Condition.ConditionModule == 'TYPE') {
                        objNCRAutoAdminJobApplyEntry.ID_Type_List.push(Condition.ID_ConditionModule)
                    }
                    else if (Condition.ConditionModule == 'ZONE') {
                        objNCRAutoAdminJobApplyEntry.ID_Zone_List.push(Condition.ID_ConditionModule)
                    }
                });


            })
            await reqAndRes(urlModuleJobApplyListByJobApply,'GET',{ID_NCRAutoAdminApplyJob:id}, async function(dataRes){
                let attachFile_List = []
                dataRes.forEach(masterFile => {
                    attachFile_List.push({
                        ID_MasterFile:masterFile.ID,
                        fileAddress:masterFile.Address,
                        fileName: masterFile.FileName,
                        fileType: masterFile.FileType,
                        fileSize: masterFile.FileSize,
                        fileContent: ''
                    })
                });
                objNCRAutoAdminJobApplyEntry.attachFile_List = attachFile_List
            })

            console.log(objNCRAutoAdminJobApplyEntry)
            dataControlNCRAutoAdminJobApplyEntry = 'Edit'
            document.getElementById('modal-title-label-control').innerHTML = 'EDIT'
            displayNCRAutoAdminJobApplyEntry()

        })
    } catch (error) {
        setTimeout(() => {

            document.getElementById('btnNCRAutoAdminJobApplyClose').click()
        }, 500);
    }
}
document.getElementById('btnNCRAutoAdminJobApplytDelete').onclick = function () {

    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            let rowData = new DataTable('#job_apply_table').rows({ selected: true }).data();
            try {
                let id = rowData[0][0]
                objNCRAutoAdminJobApplyEntry.ID = id
                dataControlNCRAutoAdminJobApplyEntry = 'Delete'
                dataEntry_NCRAutoAdminJobApply()
            } catch (error) {

            }
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        }
    });

}


// document.getElementById("selProduct_Entry").onchange = async function(){
//    await setSelectDiameter()
// }
document.getElementById("selJob_Entry").onchange = async function () {
    setSelectType()
    setSelectZone()
}







startPageProjectApply()