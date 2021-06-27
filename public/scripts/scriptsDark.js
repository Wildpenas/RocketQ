const html = document.querySelector("html")
const header = document.querySelector("header a")

const checkbox = document.querySelector("input[name=theme]")

const getStyle = (element, style) => 
    window
        .getComputedStyle(element)
        .getPropertyValue(style);

const initialColors = {
    background: getStyle(html, "--background"),
    blue: getStyle(html, "--blue"),
    white: getStyle(html, "--white"),
    black: getStyle(html, "--black"),
    greyBlue: getStyle(html, "--grey-blue"),
    
    
}

const darkMode = {
    background: "#121213",
    blue: "#e83f5b",
    white: " #4d5e77",
    black: "#FFF",
    greyBlue:"#e83f5b"
   
    
    
}

const transformKey = key => 
    "--" + key.replace(/([A-Z])/, "-$1").toLowerCase()


const changeColors = (colors) => {
    Object.keys(colors).map(key => 
        html.style.setProperty(transformKey(key), colors[key]) 
    )
}


checkbox.addEventListener("change", ({target}) => {
    target.checked ? changeColors(darkMode) : changeColors(initialColors)
    
    
   
    
})