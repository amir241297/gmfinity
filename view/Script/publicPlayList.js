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

            div.append(img, h3, p)
            parent_div.append(div)
        })
    ) :
        (
            parent_div.innerHTML = "404"
        )



}
appendData()
const fetchData = async (queries) => {
    let url = `http://localhost:3500/fetchallpublicPlayListData`
    try {
        let res = await fetch(url)
        res = await res.json()
        // console.log("res",res.response)
        appendData(res.response)

    } catch (err) {
        console.log("ERROR", err)
    }
}
fetchData()