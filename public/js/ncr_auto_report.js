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
            innerHTML += `
                    <tr onclick="showNcrReport(this,'${productItem.ID_ProductItem}')">
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
function resetProductItem() {
    document.getElementById('edtProject_Search').value = ''
    document.getElementById('edtProductItemNo_Search').value = ''
    document.getElementById('edtProductType_Search').value = ''
    showDataProductItemList()
}

function showNcrReport(e,ID_ProductItem) {
    
    document.querySelectorAll('#selecting_apply_body tr').forEach(tr => {
        tr.classList.remove('selected')
    });
    e.classList.add('selected')

    let dataReq = {
        ID_ProductItem: ID_ProductItem
    }
    let tbodyParam = document.getElementById('param_detail_body')
    let tbodyReport = document.getElementById('report_body')
    tbodyParam.innerHTML = ''
    tbodyReport.innerHTML = ''
    reqAndRes(urlNCRAutoReportParam, 'GET', dataReq, function (dataRes) {
        let innerHTML = ''
        dataRes.forEach(param => {
            innerHTML += `
                <tr>
                    <td class="text-center"><input class="form-check-input" type="checkbox" ${param.ID_NCRAutoAdminApply == null ? '' : 'checked'} disabled></td>
                    <td> ${param.NCRAdminName==null?'':param.NCRAdminName}</td>
                    <td> ${param.ProcessNo}.${param.ProcessCaseNo}</td>
                    <td> ${param.ParamName}</td>
                    <td> ${param.ParamType}</td>
                    <td> ${param.Detail}</td>
                    <td class="text-center"><input class="form-check-input" type="checkbox" ${param.IsConst == 0 ? '' : 'checked'} disabled></td>
                    <td> ${param.ValueAssign}</td>
                </tr>
            `
        });
        tbodyParam.innerHTML = innerHTML
    })

    reqAndRes(urlNCRAutoReport, 'GET', dataReq, function (dataRes) {
        let innerHTML = ''
        // console.table(dataRes)
        dataRes.forEach(report => {
            innerHTML += `
                <tr>
                    <td> ${report.ProcessNo}.${report.ProcessCaseNo}</td>
                    <td> ${report.ConditionDetial_TH}</td>
                    <td> ${report.Formula}</td>
                    <td> ${report.AssignValueToFormula}</td>
                    <td class="${report.NCR_Result == 0?'is-not-ncr':'is-ncr'}"> ${report.NCR_Result == 0?'':'NCR'}</td>
                </tr>
            `
        });
        tbodyReport.innerHTML = innerHTML
    })
}


showDataProductItemList()