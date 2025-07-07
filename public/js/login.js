console.log("login.js")
document.getElementById("loginForm").addEventListener("submit", async function (e) {

    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    await reqAndRes(urlNCRAutoAdminLogin, 'post', { username, password }, async function (dataRes) {
        console.log('data add plie apply : ', dataRes)
        if (dataRes.userInfo.status == 1) {
            const origin = window.location.origin       // https://mydomain.com
            const pathname = window.location.pathname  // /ncr-auto-admin/login        
            const basePath = pathname.split('/')[0]    // "ncr-auto-admin"
            const baseURL = `${origin}/${basePath}`    // https://mydomain.com/ncr-auto-admin

            // ใช้กับ fetch ได้เลย
            console.log(`url : ${baseURL}set_session`)
            fetch(`${baseURL}set_session`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(dataRes.userInfo.detail)
            })
                .then(res => res.json())
                .then(data => {
                    console.log('Session set:', data)
                    if(data.session.userDetail.Token){
                         window.open(`${baseURL}link`,'_self')
                    }
                })
                .catch(err => {
                    console.error('Error setting session:', err)
                })

            // window.open(`${myDomain}/link`,'_self')
        }

    })





});
