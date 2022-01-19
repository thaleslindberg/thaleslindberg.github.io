setInterval(showTime, 1000)
        
function showTime() {
    const time = new Date()
    document.getElementById("clock").innerHTML = time.toLocaleDateString()
}