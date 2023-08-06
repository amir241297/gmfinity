const add_login_Data = async (data) => {
    fetch('http://localhost:3500/createAccount', {
        method: 'POST',
        headers: {
            // 'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(response => console.log(JSON.stringify(response)))
}

document.querySelector("form").addEventListener("submit", () => {
    event.preventDefault()
    let user_create_name = document.getElementById("name").value
    let user_create_password1 = document.getElementById("password1").value
    let user_create_email = document.getElementById("email").value
        let obj = {
            "name": user_create_name,
            "password": user_create_password1,
            "email": user_create_email

        }
        // console.log(obj)
    
    add_login_Data(obj)
})