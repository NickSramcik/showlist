const deleteBtn = document.querySelectorAll('.del')
const showItem = document.querySelectorAll('span.not')
const showWatched = document.querySelectorAll('span.watched')

Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteShow)
})

Array.from(showlistItem).forEach((el)=>{
    el.addEventListener('click', markWatched)
})

Array.from(showWatched).forEach((el)=>{
    el.addEventListener('click', markUnwatched)
})

async function deleteShow(){
    const showId = this.parentNode.dataset.id
    try{
        const response = await fetch('showlist/deleteShow', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'showIdFromJSFile': showId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markWatched(){
    const showId = this.parentNode.dataset.id
    try{
        const response = await fetch('showlist/markWatched', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'showIdFromJSFile': showId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markUnwatched(){
    const showId = this.parentNode.dataset.id
    try{
        const response = await fetch('showlist/markUnwatched', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'showIdFromJSFile': showId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}