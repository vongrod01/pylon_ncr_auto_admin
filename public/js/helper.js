let root_css = document.querySelector(':root');
let global_token = 'AUTH_DEV'
// let global_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYXNfdXNlcnNfaWQiOiIxMTAwIiwibG9naW5uYW1lIjoiYWRpc29ybi52byIsImNtX3VzZXJpZCI6IjQ2MyIsImNtX2VtcGlkIjoiMTk2MCIsInRrX2RhdGUiOiIxMC84LzIwMjQgMToxMDo1MiBQTSIsIm5iZiI6MTcyODM2Nzg1MiwiZXhwIjoxNzU5OTAzODUyLCJpYXQiOjE3MjgzNjc4NTIsImlzcyI6IlB5bG9uIiwiYXVkIjoiUHlsb24ifQ.58QTKSGHrQy5iLzZkmaMko2tLV3mqgTtoI52Ex-ZdUI'
async function imgToBase64(file) {
    let data;
    await getBase64(file).then(
        d => data = d
    );
    data = data.replace('data:image/png;base64,', '')
    data = data.replace('data:image/png;base64', '')
    data = data.replace('data:image/jpeg;base64,', '')
    data = data.replace('data:image/jpeg;base64', '')

    return data
}
async function pdfToBase64(file) {
    let data;
    await getBase64(file).then(
        d => data = d
    );
    data = data.replace('data:application/pdf;base64,', '')
    data = data.replace('data:application/pdf;base64', '')
    return data
}

async function docToBase64(file) {
    let data;
    await getBase64(file).then(
        d => data = d
    );
    // console.log('data : ',data)
    data = data.replace('data:application/doc;base64,', '')
    data = data.replace('data:application/doc;base64', '')
    data = data.replace('data:application/docx;base64,', '')
    data = data.replace('data:application/docx;base64', '')
    return data
}

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}


function imgSrc(imgType, imgContent) {
    let typeStr = ''
    if (imgType === '.png') {
        typeStr = 'png'
    } else if (imgType === '.jpg' || imgType === '.jpeg') {
        typeStr = 'jpeg'
    } else {
        typeStr = ''
    }
    return imgContent !== null ? `data:image/${typeStr};base64,${imgContent}` : ''
}

function getDatesInRange(startDate, endDate) {
    let dateFrom = new Date(startDate);
    let dateTo = new Date(endDate);

    let dates = [];

    while (dateFrom <= dateTo) {
        dates.push(new Date(dateFrom));
        dateFrom.setDate(dateFrom.getDate() + 1);
    }

    return dates;
}

function runTooltipBootstrap() {
    let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    let tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl, {
            container: 'body',
            trigger: 'hover'
        })
    })
}


async function reqAndRes(url, reqMethod, reqData, callBackSuccess, callBackError = null) {
    const startTime = performance.now(); // หรือใช้ Date.now() ก็ได้
    let option
    let urlNew = ''
    if (reqMethod === 'GET' || reqMethod === 'get') {
        option = {
            method: "GET",
            headers: {
                'Authorization': global_token, // ส่ง Authorization token
                'Content-Type': 'application/json',
            },
        }
        let queryString = $.param(reqData)
        // urlNew = `${url}?req_json=${encodeURIComponent(JSON.stringify(reqData))}`
        urlNew = `${url}?${queryString}`

        // console.log(urlNew)
    }
    else {
        urlNew = url
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify(reqData);

        option = {
            method: reqMethod,
            headers: {
                'Authorization': global_token, // ส่ง Authorization token
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reqData)
        }
        // option = {
        //     method: reqMethod,
        //     headers: myHeaders,
        //     body: raw,
        //     redirect: "follow"
        // };
    }

    await fetch(urlNew, option)

        .then((response) => {
            // ตรวจสอบว่า response มีสถานะเป็น error หรือไม่
            if (!response.ok) {
                // ถ้า response ไม่ใช่สถานะ 200 (หมายถึงเกิด error)
                // ดึงข้อมูล error ออกมา
                return response.json().then(error => {
                    // แสดงข้อความ error ที่ได้รับจากหลังบ้าน
                    throw new Error(error.error || 'Something went wrong');
                });
            }
            // ถ้า response OK ให้แปลงเป็น JSON
            return response.json();
        })
        .then(async (response) => {
            await callBackSuccess(response)
        })
        .catch(async (err) => {

            console.error('Error:', err.message);
            if (callBackError === null) {

                Swal.fire(err.statusText, url, 'error');
            }
            else {
                await callBackError(err)
            }
        })
        .finally(() => {
            // const endTime = performance.now(); // หรือใช้ Date.now() ก็ได้
            // let duration = endTime - startTime;

            // const minutes = Math.floor(duration / 60000);
            // duration %= 60000;
            // const seconds = Math.floor(duration / 1000);
            // const milliseconds = duration % 1000;

            // console.log(`ใช้เวลา: ${minutes} นาที ${seconds} วินาที ${milliseconds} มิลลิวินาที`);
        })
        ;
}

async function activeNavMenu(menuIndex) {
    ActiveMenuStatus(menuIndex, null)
    await animationNav()

    let lsTabMenu = document.querySelectorAll('.tab-menu')
    for (let index = 0; index < lsTabMenu.length; index++) {
        if (menuIndex === index) {
            lsTabMenu[index].classList.remove('d-none')
        } else {
            if (!lsTabMenu[index].classList.contains('d-none')) {
                lsTabMenu[index].classList.add('d-none')

            }

        }
    }

}

function animationNav() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                let tabsNewAnim = $('#navbar-animmenu');
                let selectorNewAnim = $('#navbar-animmenu').find('li').length;
                // let selectorNewAnim = $(".tabs").find(".selector");
                let activeItemNewAnim = tabsNewAnim.find('.active');
                let activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
                let itemPosNewAnimLeft = activeItemNewAnim.position();
                $(".hori-selector").css({
                    "left": (itemPosNewAnimLeft.left) + "px",
                    "width": activeWidthNewAnimWidth + "px",

                });
                $("#navbar-animmenu").on("click", "li", function (e) {
                    $('#navbar-animmenu ul li').removeClass("active");
                    $(this).addClass('active');
                    let activeWidthNewAnimWidth = $(this).innerWidth();
                    let itemPosNewAnimLeft = $(this).position();
                    $(".hori-selector").css({
                        "left": itemPosNewAnimLeft.left + "px",
                        "width": activeWidthNewAnimWidth + "px",

                    });
                });
                resolve('')
            } catch (error) {
                resolve(error)
            }

        }, 500);

    })

}


function bytesToSize(bytes, decimals = 2) {
    if (!Number(bytes)) {
        return '0 Bytes';
    }

    const kbToBytes = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = [
        'Bytes',
        'KB.',
        'MB.',
        'GB.',
        'TB.',
        'PB.',
        'EB.',
        'ZB.',
        'YB.',
    ];

    const index = Math.floor(
        Math.log(bytes) / Math.log(kbToBytes),
    );

    return `${parseFloat(
        (bytes / Math.pow(kbToBytes, index)).toFixed(dm),
    )} ${sizes[index]}`;
}

function helperSetValueCheckBox(el, value) {
    if (el.checked) {
        el.value = value
    } else {
        el.value = ''
    }
}

const contentTypePDF = 'application/pdf'
const contentTypeJPEG = 'image/jpeg'
const contentTypePNG = 'image/png'
const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
}

function blobtoURL(b64Data, contentType) {
    return URL.createObjectURL(b64toBlob(b64Data, contentType))
}