let dataSet = []
let objProductNCRMappingEntry = {
    "ID": 0,
    "ID_Product": 0,
    "ID_NCRAutoTopic_List": [],
    "IsDry": 0,
    "Active": 0,
    "Detail": "",
    "AddBy": 0,
    "AddWhen": "",
    "UpdateBy": 0,
    "UpdateWhen": "",
    "DeleteBy": 0,
    "DeleteWhen": "",
}

let dataControlProductNCRMappingEntry = ''
async function clearProductNCRMappingEntry() {
    document.getElementById('chkSelectAll_NCR').checked = false
    objProductNCRMappingEntry.ID_NCRAutoTopic_List = []
    objProductNCRMappingEntry.ID_Product = 0
    objProductNCRMappingEntry.IsDry = 0
    objProductNCRMappingEntry.Detail = ''
    objProductNCRMappingEntry.Active = 1


}


function collectProductNCRMappingEntry() {
    objProductNCRMappingEntry.ID_NCRAutoTopic_List = [...document.querySelectorAll(`#ncr_seclect_body * input[type=checkbox]:checked`)].map(function (e) {
        return parseInt(e.value)
    })

    objProductNCRMappingEntry.IsDry = document.getElementById('rdoDry').checked ? 1 : 0

    objProductNCRMappingEntry.ID_Product = document.getElementById('selProduct_Entry').value


}

async function displayProductNCRMappingEntry() {
    await setSelectNCRTopic()
    await setSelectProduct()
    if (objProductNCRMappingEntry.IsDry == 1) {
        document.getElementById('rdoDry').checked = true
        document.getElementById('rdoWet').checked = false
    }
    else {
        document.getElementById('rdoDry').checked = false
        document.getElementById('rdoWet').checked = true
    }

    document.getElementById('selProduct_Entry').value = objProductNCRMappingEntry.ID_Product

    objProductNCRMappingEntry.ID_NCRAutoTopic_List.forEach(ID_NCRAutoTopic => {
        let e = document.getElementById(`chkNCRTopic_${ID_NCRAutoTopic}`)
        e.checked = true

    });

}

async function dataEntry_ProductNCRMapping() {
    // let url = `${myDomain}/ncr_auto_topic_api`
    let method = ''
    if (dataControlProductNCRMappingEntry === 'Add') {
        method = 'post'
    }
    else if (dataControlProductNCRMappingEntry === 'Edit') {
        method = 'put'
    }
    else if (dataControlProductNCRMappingEntry === 'Search' || dataControlProductNCRMappingEntry === 'Get') {
        method = 'get'
    }
    else if (dataControlProductNCRMappingEntry === 'Delete') {
        method = 'delete'
    }

    if (dataControlProductNCRMappingEntry !== '') {
        collectProductNCRMappingEntry()
        await reqAndRes(urlProductNCRMapping, method, objProductNCRMappingEntry, function (dataRes) {
            console.table(dataRes)
            if (method !== 'delete') {

                document.getElementById('btnProductNCRMappingClose').click()
            }
            document.getElementById('modal-title-label-control').innerHTML = 'NONE'
            showDataProduct()
        })
    }

    dataControlProductNCRMappingEntry = ''
}
// async function displayProductNCRMapping(){
//     reqAndRes(urlProductNCRMapping,'GET',{ID:g_ID_Product},(dataRes)=>{
//         document.getElementById('edtTopic').value = `${dataRes.ProcessNo}.${dataRes.ProcessCaseNo}`
//         document.getElementById('edtConditionDetail').value = dataRes.ConditionDetial_TH
//         document.getElementById('edtFormula').value = dataRes.Formula
//         document.getElementById('edtFormula2').value = dataRes.Formula

//     })
// }
async function showDataProduct() {
    $("#product_table").DataTable().destroy()
    let innerHTML = ''
    let tbody = document.getElementById('product_body')
    tbody.innerHTML = innerHTML

    let rows = []
    await reqAndRes(urlProductNCRMapping_ListOfProduct, 'GET', {}, function (dataRes) {
        console.table(dataRes)
        dataSet = dataRes

        dataSet.forEach(data => {
            rows.push(
                [
                    data.id_product,
                    data.product_no,
                    data.product_name,
                    data.product_group_name,
                    data.shape,
                    data.isDry,
                    data.isDry==1?'แห้ง':'เปียก',


                ]
            )
        });
    })

    $("#product_table").dataTable({
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


    // $("#product_table").dataTable({
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
    document.getElementById('product_table_wrapper').classList.add('p-2')
    // let thead = document.querySelector('#tbTableTroubleAndActionHistory thead')
    let row = document.querySelectorAll('#product_table_wrapper .row')

    row[1].classList.add('mb-2', 'mt-2')
    row[1].querySelector('div').id = 'boxProductNCRMappingTable'
    row[1].classList.remove('row')

    document.querySelectorAll('#product_table_wrapper thead tr th.sorting_asc').forEach(th => {
        th.classList.remove('sorting_asc')
    });

    document.querySelectorAll('#product_body tr td')[0].click()

    // $('#product_table').on( 'click', 'tbody td', function () {
    //     // console.log(this)
    //     showDataNCR()
    // } );
    document.querySelectorAll(`#product_table tbody tr`).forEach(element => {
        element.onclick = function(){
            console.log(element)
            showDataNCR(element)
        }
    });
    showDataNCR(document.querySelector(`#product_table tbody tr`))
}
async function showDataNCR(e) {
    let ID_Product = e.querySelectorAll('td')[0].innerHTML
    let IsDry = e.querySelectorAll('td')[5].innerHTML
    
    // let rowData = new DataTable('#product_table').rows({ selected: true }).data();
    // console.log(rowData)
    // let ID_Product = rowData[0][0]
    // let IsDry = rowData[0][5]
    $("#ncr_table").DataTable().destroy()
    let innerHTML = ''
    let tbody = document.getElementById('ncr_body')
    tbody.innerHTML = innerHTML

    let rows = []
    await reqAndRes(urlProductNCRMapping_NCRListByProduct, 'GET', {ID_Product:ID_Product,IsDry:IsDry}, function (dataRes) {
        // console.table(dataRes)
        dataSet = dataRes

        dataSet.forEach(data => {
            rows.push(
                [
                    `${data.ProcessNo}.${data.ProcessCaseNo}`,
                    data.ConditionDetial_TH,
                    data.Formula,
                    data.Remark,
                  

                ]
            )
        });
    })

    $("#ncr_table").dataTable({
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

    
    // #tbTableTroubleAndActionHistory_wrapper <---- datatable genarate ขึ้นมา
    document.getElementById('ncr_table_wrapper').classList.add('p-2')
    // let thead = document.querySelector('#tbTableTroubleAndActionHistory thead')
    let row = document.querySelectorAll('#ncr_table_wrapper .row')

    row[1].classList.add('mb-2', 'mt-2')
    row[1].querySelector('div').id = 'boxNCRTable'
    row[1].classList.remove('row')

    document.querySelectorAll('#ncr_table_wrapper thead tr th.sorting_asc').forEach(th => {
        th.classList.remove('sorting_asc')
    });
}


function startPage() {
    // clearProductNCRMappingSearch()
    // displayProductNCRMapping()
    showDataProduct()
}

async function setSelectProduct() {
    reqAndRes(urlProductNCR_List, 'GET', {}, async function (dataRes) {
        let innerHTML = ''
        dataRes.forEach(product => {
            innerHTML += `<option value=${product.id_product}>${product.product_name} (${product.product_no})</option>`
        });
        document.getElementById('selProduct_Entry').innerHTML = innerHTML

    })


}
async function setSelectNCRTopic() {
    await reqAndRes(urlNCRAutoTopic, 'GET', { Active: 1 }, async function (dataRes) {
        // console.table(dataRes)

        let innerHTML = ''
        dataRes.forEach(ncr => {
            innerHTML += `
                <tr>
                    <td class="text-center"><input class="form-check-input" type="checkbox" value=${ncr.ID} id="chkNCRTopic_${ncr.ID}"></td>
                    <td>${ncr.ProcessNo}.${ncr.ProcessCaseNo}</td>
                    <td>${ncr.ConditionDetial_TH}</td>
                    <td>${ncr.Formula}</td>
                    <td>${ncr.Remark}</td>
                </tr>
            `
        });
        document.getElementById('ncr_seclect_body').innerHTML = innerHTML

    })


}

document.getElementById('chkSelectAll_NCR').onchange = function () {
    if (document.getElementById('chkSelectAll_NCR').checked) {
        document.querySelectorAll(`#ncr_seclect_body * input[type=checkbox]`).forEach(chk => {
            chk.checked = true
        });
    }
    else {
        document.querySelectorAll(`#ncr_seclect_body * input[type=checkbox]`).forEach(chk => {
            chk.checked = false
        });
    }

}

document.getElementById('btnProductNCRMappingAdd').onclick = function () {
    dataControlProductNCRMappingEntry = 'Add'
    document.getElementById('modal-title-label-control').innerHTML = 'ADD'
    clearProductNCRMappingEntry()
    displayProductNCRMappingEntry()
}
document.getElementById('btnProductNCRMappingEdit').onclick = function () {
    // let table = new DataTable('#product_table');
    document.getElementById('modal-title-label-control').innerHTML = 'EDIT'
    let rowData = new DataTable('#product_table').rows({ selected: true }).data();
    try {

        let id = rowData[0][0]
        reqAndRes(urlProductNCRMapping, 'GET', { ID: id }, function (dataRes) {
            clearProductNCRMappingEntry()
            objProductNCRMappingEntry = dataRes
            displayProductNCRMappingEntry()
            dataControlProductNCRMappingEntry = 'Edit'
            document.getElementById('modal-title-label-control').innerHTML = 'EDIT'
        })
    } catch (error) {

    }
}

// document.getElementById('btnSearchPart').onclick = function () {
//     showDataProduct()
// }
document.getElementById('btnResetProductNCRMapping').onclick = function () {
    showDataProduct()
}
document.getElementById('btnProductNCRMappingDelete').onclick = function () {
    let rowData = new DataTable('#product_table').rows({ selected: true }).data();

    try {

        let id = rowData[0][0]
        objProductNCRMappingEntry.ID = id
        dataControlProductNCRMappingEntry = 'Delete'
        Swal.fire({
            title: "Do you want to delete?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Yes",

        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                dataEntry_ProductNCRMapping()
                displayProductNCRMappingEntry()
                Swal.fire("Delete!", "", "success");
            } else if (result.isDenied) {
                //   Swal.fire("Changes are not saved", "", "info");
            }
        });
    } catch (error) {

    }
}




startPage()