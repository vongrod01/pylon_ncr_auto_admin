

let objNCRAutoAdminJobApplyEntry = {
    "ID": 0,
    "ID_Job": 0,
    "ID_NCRAutoAdminTopic": 0,
    "ID_Product_List": [0],
    "IsDry": 2,
    "ID_Diameter_List": [0],
    "ID_Zone_List": [0],
    "ID_Type_List": [0],
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
    objNCRAutoAdminJobApplyEntry.ID_Product_List = [],
        objNCRAutoAdminJobApplyEntry.IsDry = 2
    objNCRAutoAdminJobApplyEntry.ID_Diameter_List = [],
        objNCRAutoAdminJobApplyEntry.ID_Zone_List = [],
        objNCRAutoAdminJobApplyEntry.ID_Type_List = [],
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


function collectNCRAutoAdminJobApplyEntry() {
    // objNCRAutoAdminJobApplyEntry.ID = 0
    // [...document.querySelectorAll(`#selProductList_Entry * input[type=checkbox]:checked`)].map(function (e) {
    //     return parseInt(e.value)
    objNCRAutoAdminJobApplyEntry.ID_Job = document.getElementById('selJob_Entry').value
    objNCRAutoAdminJobApplyEntry.ID_NCRAutoAdminTopic = document.getElementById('selNCRAutoAdminTopicJob_Entry').value
    objNCRAutoAdminJobApplyEntry.ID_Product_List = [...document.querySelectorAll(`#selProductList_Entry * input[type=checkbox]:checked`)].map(function (e) {
        return parseInt(e.value)
    })
    objNCRAutoAdminJobApplyEntry.IsDry = document.getElementById('selDry_Entry').value
    objNCRAutoAdminJobApplyEntry.ID_Diameter_List = [...document.querySelectorAll(`#selDiameterList_Entry * input[type=checkbox]:checked`)].map(function (e) {
        return parseInt(e.value)
    })
    objNCRAutoAdminJobApplyEntry.ID_Zone_List = [...document.querySelectorAll(`#selZoneList_Entry * input[type=checkbox]:checked`)].map(function (e) {
        return parseInt(e.value)
    })
    objNCRAutoAdminJobApplyEntry.ID_Type_List = [...document.querySelectorAll(`#selTypeList_Entry * input[type=checkbox]:checked`)].map(function (e) {
        return parseInt(e.value)
    })
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
    document.getElementById('selDry_Entry').value = objNCRAutoAdminJobApplyEntry.IsDry
    
    objNCRAutoAdminJobApplyEntry.ID_Product_List.forEach(ID => {
        document.querySelector(`#selProductList_Entry * input[type="checkbox"][value="${ID}"]`).click();
    });
    await setSelectDiameter()
    objNCRAutoAdminJobApplyEntry.ID_Diameter_List.forEach(ID => {
        document.querySelector(`#selDiameterList_Entry * input[type="checkbox"][value="${ID}"]`).click();
    });
    objNCRAutoAdminJobApplyEntry.ID_Zone_List.forEach(ID => {
        document.querySelector(`#selZoneList_Entry * input[type="checkbox"][value="${ID}"]`).click();
    });
    objNCRAutoAdminJobApplyEntry.ID_Type_List.forEach(ID => {
        document.querySelector(`#selTypeList_Entry * input[type="checkbox"][value="${ID}"]`).click();
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
        collectNCRAutoAdminJobApplyEntry()
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
            let isDryDisplay = ''
            if (data.IsDry == 0) {
                isDryDisplay = 'เปียก'
            }
            else if (data.IsDry == 0) {
                isDryDisplay = 'แห้ง'
            }
            else {
                isDryDisplay = 'ทั้งหมด'
            }
            rows.push(
                [
                    data.ID,
                    data.NCRAdminName,
                    `${data.JobNo} : ${data.JobName}`,
                    isDryDisplay,
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
async function selectALLItem(el){
    console.log(el)
    let parentElement = el.parentElement.parentElement
    let checkboxes = parentElement.querySelectorAll('input[type="checkbox"]');

    checkboxes.forEach(checkbox => {
        checkbox.checked = el.checked;
    });

    if(el.id == 'selAllProduct'){
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
            <div class="form-check me-4" style="width:200px">
                <input class="form-check-input" type="checkbox" value="${product.ID_Product}" onclick="setSelectDiameter()">
                <label class="form-check-label" for="flexCheckChecked">
                    ${product.ProductName}
                </label>
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
            <div class="form-check me-4" style="width:200px">
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
            <div class="form-check me-4" style="width:200px">
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
async function showJobCondition(ID_NCRAutoAdminJobApply,el){
    console.log("ID_NCRAutoAdminJobApply : ",ID_NCRAutoAdminJobApply )
    // console.log(el)
    reqAndRes(urlNCRConditionJobApplyListByNCRAutoAdminJobApply,'GET',{ID_NCRAutoAdminJobApply : ID_NCRAutoAdminJobApply}, (dataRes)=>{
        console.table(dataRes)
        let innerHTML = ''
        let product = ''
        let diameter =''
        let type =''
        let zone = ''
        dataRes.forEach(module => {
            if(module.ConditionModule == 'PRODUCT'){
                product+=`<li>${module.ModuleData}</li>`
            }
            else if(module.ConditionModule == 'DIAMETER'){
                diameter+=`<li>${module.ModuleData}</li>`
            }
            else if(module.ConditionModule == 'ZONE'){
                zone+=`<li>${module.ModuleData}</li>`
            }
            else if(module.ConditionModule == 'TYPE'){
                type+=`<li>${module.ModuleData}</li>`
            }
        });
        innerHTML = `
        ${product != ''?`<ul><b>Product</b><br>${product}</ul>`:``}
        ${diameter != ''?`<ul><b>Diameter</b><br>${diameter}</ul>`:``}
        ${zone != ''?`<ul><b>Zone</b><br>${zone}</ul>`:``}
        ${type != ''?`<ul><b>Type</b><br>${type}</ul>`:``}
        
        
        `
        el.querySelector('*.condition-content').innerHTML = innerHTML
        // console.log(innerHTML)
    })

}

document.getElementById('btnNCRAutoAdminJobApplytAdd').onclick = function () {
    dataControlNCRAutoAdminJobApplyEntry = 'Add'
    document.getElementById('modal-title-label-control').innerHTML = 'ADD'
    clearNCRAutoAdminJobApplyEntry()
    displayNCRAutoAdminJobApplyEntry()
}
document.getElementById('btnNCRAutoAdminJobApplytEdit').onclick = function () {

    let rowData = new DataTable('#job_apply_table').rows({ selected: true }).data();
    let id = rowData[0][0]
    clearNCRAutoAdminJobApplyEntry()
    reqAndRes(urlNCRAutoAdminJobApply, 'GET', { ID: id },async function (dataResJobApply) {
        objNCRAutoAdminJobApplyEntry = { ...dataResJobApply }
        await reqAndRes(urlNCRConditionJobApplyListByNCRAutoAdminJobApply,'GET',{ID_NCRAutoAdminJobApply : id}, (dataResCondition)=>{
            // console.table("ข้อมูลเตรียม EDIT : ",dataResCondition)
            objNCRAutoAdminJobApplyEntry.ID_Product_List = []
            objNCRAutoAdminJobApplyEntry.ID_Diameter_List = []
            objNCRAutoAdminJobApplyEntry.ID_Type_List = []
            objNCRAutoAdminJobApplyEntry.ID_Zone_List = []
            dataResCondition.forEach(Condition => {
                if(Condition.ConditionModule == 'PRODUCT'){
                    objNCRAutoAdminJobApplyEntry.ID_Product_List.push(Condition.ID_ConditionModule)
                }
                else if(Condition.ConditionModule == 'DIAMETER'){
                    objNCRAutoAdminJobApplyEntry.ID_Diameter_List.push(Condition.ID_ConditionModule)
                }
                else if(Condition.ConditionModule == 'TYPE'){
                    objNCRAutoAdminJobApplyEntry.ID_Type_List.push(Condition.ID_ConditionModule)
                }
                else if(Condition.ConditionModule == 'ZONE'){
                    objNCRAutoAdminJobApplyEntry.ID_Zone_List.push(Condition.ID_ConditionModule)
                }
            });

        
        })
        
        console.log(objNCRAutoAdminJobApplyEntry)
        dataControlNCRAutoAdminJobApplyEntry = 'Edit'
        document.getElementById('modal-title-label-control').innerHTML = 'EDIT'
        displayNCRAutoAdminJobApplyEntry()

    })
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