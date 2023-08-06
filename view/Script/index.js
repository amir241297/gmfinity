// import {isAuth} from "./login.js"
// console.log("isAuth",isAuth)

// Enter Key
let input_tag = document.getElementById("queries")
input_tag.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault()
        getData()

    }
})

// Debouncing 
let id
const debounce = (fetchData, delay) => {
    if (id) clearInterval(id)
    id = setTimeout(() => {
        getData()
    }, delay)
}

// Add Playlist Data
const add_public_playlist_Data = async (data) => {
    fetch('http://localhost:3500/addPublicPlaylistData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then((response) => {
            console.log(JSON.stringify("public data",response))
            alert("Data Added Successfull in Public Playlist")
        })

}

const add_private_playlist_Data=(data)=>{
    // console.log(data)
    fetch('http://localhost:3500/addPrivatePlaylistData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then((response) => {
            console.log(JSON.stringify("Private Data",response))
            alert("Data Added Successfull in Private Playlist")
        })

}


// Show Data into UI
const appendData = (data = 0) => {

    let parent_div = document.getElementById("movies_data")
    parent_div.innerHTML = null
    data.length > 1 ? (
        data.map((ele) => {
            let div = document.createElement("div")
            let img = document.createElement("img")
            img.src = ele.Poster
            let h3 = document.createElement("h3")
            h3.innerHTML = ele.Title
            let p = document.createElement("p")
            p.innerHTML = ele.Year

            let btn_div=document.createElement("div")
            btn_div.setAttribute("class","button_div")

            let add_public = document.createElement("button")
            add_public.innerHTML = "Public"
            add_public.addEventListener("click", () => {
                add_public_playlist_Data(ele)
            })
            
            let add_private = document.createElement("button")
            add_private.innerHTML = "Private"
            add_private.addEventListener("click", () => {
                add_private_playlist_Data(ele)
            })

            btn_div.append(add_public,add_private)
            div.append(img, h3, p,btn_div)
            parent_div.append(div)
        })
    ) :
        (
            parent_div.innerHTML = "404"
        )



}
// fetch Data
const fetchData = async (queries) => {
    let url = `https://www.omdbapi.com/?apikey=c6c349ef&s=${queries}`
    try {
        let res = await fetch(url)
        res = await res.json()
        // console.log(res.Search)
        appendData(res.Search)

    } catch (err) {
        console.log("ERROR", err)
    }
}
const getData = () => {

    let res = document.getElementById("queries").value
    fetchData(res)

}
fetchData("movies")