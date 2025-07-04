console.log("login.js")
document.getElementById("loginForm").addEventListener("submit", async function (e) {

    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    await reqAndRes(urlNCRAutoAdminLogin, 'post', { username, password }, async function (dataRes) {
        console.log('data add plie apply : ', dataRes)
        if(dataRes.userInfo.status == 1){
            window.open(`${myDomain}/link`,'_self')
        }

    })





});
