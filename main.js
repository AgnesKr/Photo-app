let page = 1,
    nextPage = null,
    isWaiting = false

axios({
    method: "GET",
    url: "https://api.unsplash.com/photos?page=1&client_id=01b0f4bc8fd2366b73face2e6e307f3fa3e51f23bc492ce26448155cc3d54602"
}).then((response) => {
    //res -> obiekt odpowiedzi
    for (let i = 0; i < response.data.length; i++) {
        let imgElement = document.createElement("img")
        imgElement.setAttribute("src", response.data[i].urls.regular)
        imgElement.addEventListener("click", function () {
            openImage(response.data[i].urls.regular)
        })
        if (i % 2 == 0) {
            document.querySelector(".column-1").append(imgElement)
        } else {
            document.querySelector(".column-2").append(imgElement)
        }
    }
    nextPage = document.querySelector(".photos").getBoundingClientRect().height + document.querySelector(".photos").getBoundingClientRect(".photos").top - 100
})

document.querySelector("input").addEventListener("input", function () {
    isWaiting = true
    axios({
        url: `https://api.unsplash.com/search/photos?page=1&query=${this.value}&client_id=01b0f4bc8fd2366b73face2e6e307f3fa3e51f23bc492ce26448155cc3d54602`
    }).then((response) => {
        document.querySelector(".column-1").innerHTML = ""
        document.querySelector(".column-2").innerHTML = ""
        for (let i = 0; i < response.data.results.length; i++) {
            let imgElement = document.createElement("img")
            imgElement.setAttribute("src", response.data.results[i].urls.regular)
            imgElement.addEventListener("click", function () {
                openImage(response.data.results[i].urls.regular)
            })
            if (i % 2 == 0) {
                document.querySelector(".column-1").append(imgElement)
            } else {
                document.querySelector(".column-2").append(imgElement)
            }
        }
        page = 1
        nextPage = document.querySelector(".photos").getBoundingClientRect().height + document.querySelector(".photos").getBoundingClientRect(".photos").top - 100
        isWaiting = false
    })
})


function openImage(url) {
    document.querySelector(".window").style.visibility = "visible"
    document.querySelector(".image-container").innerHTML = `<img src=${url}>`
    document.querySelector(".btn-download").setAttribute("href", url)
}

function closeImage() {
    document.querySelector(".window").style.visibility = "hidden"
}

document.querySelector(".cancel").addEventListener("click", closeImage)

window.addEventListener("scroll", function () {
    if (nextPage < window.pageYOffset + window.innerHeight && !isWaiting) {
        isWaiting = true
        page++
        if(document.querySelector("input").value === "") {
            axios({
                method: "GET",
                url: `https://api.unsplash.com/photos?page=${page}&client_id=01b0f4bc8fd2366b73face2e6e307f3fa3e51f23bc492ce26448155cc3d54602`
            }).then((response) => {
                for (let i = 0; i < response.data.length; i++) {
                    let imgElement = document.createElement("img")
                    imgElement.setAttribute("src", response.data[i].urls.regular)
                    imgElement.addEventListener("click", function () {
                        openImage(response.data[i].urls.regular)
                    })
                    if (i % 2 == 0) {
                        document.querySelector(".column-1").append(imgElement)
                    } else {
                        document.querySelector(".column-2").append(imgElement)
                    }
                }
                nextPage = document.querySelector(".photos").getBoundingClientRect().height + document.querySelector(".photos").getBoundingClientRect(".photos").top - 100
                isWaiting = false
            })
        } else {
            console.log("stronka")
            axios({
                url: `https://api.unsplash.com/search/photos?page=${page}&query=${document.querySelector("input").value}&client_id=01b0f4bc8fd2366b73face2e6e307f3fa3e51f23bc492ce26448155cc3d54602`
            }).then((response) => {
                for (let i = 0; i < response.data.results.length; i++) {
                    let imgElement = document.createElement("img")
                    imgElement.setAttribute("src", response.data.results[i].urls.regular)
                    imgElement.addEventListener("click", function () {
                        openImage(response.data.results[i].urls.regular)
                    })
                    if (i % 2 == 0) {
                        document.querySelector(".column-1").append(imgElement)
                    } else {
                        document.querySelector(".column-2").append(imgElement)
                    }
                }
                nextPage = document.querySelector(".photos").getBoundingClientRect().height + document.querySelector(".photos").getBoundingClientRect(".photos").top - 100
                isWaiting = false
            })
        }
       
    }
})