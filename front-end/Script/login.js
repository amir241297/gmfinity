// let isAuth = false
// export {isAuth}

// const authentication=()=>{
//     console.log(isAuth)

// }
let inputParam=new URLSearchParams()

const add_login_Data = async (data) => {
    fetch('http://localhost:3500/login', {
        method: 'POST',
        headers: {
            // 'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then((response) => {
            console.log(JSON.stringify(response.token))
            isAuth = true
            inputParam.append("isAuth",true)
// authentication()
        })

}

document.querySelector("form").addEventListener("submit", () => {
    event.preventDefault()
    let user_login_name = document.getElementById("user_name").value
    let user_login_password = document.getElementById("user_password").value
    let obj = {
        "email": user_login_name,
        "password": user_login_password
    }
    add_login_Data(obj)
})
// export {isAuth}