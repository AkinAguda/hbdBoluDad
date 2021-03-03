var mutes = true;
var song = new Audio("audio/song.mpeg");
var iconHolder = document.getElementById("media-icon-button");
var muteSvg = `<svg width="55" height="40" viewBox="0 0 25 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.18515 15.9438H5.74798L10.8046 19.756C11.5947 20.3486 12.7011 19.7956 12.7011 18.8079V1.18869C12.7011 0.22082 11.575 -0.352003 10.8046 0.240572L5.74798 4.0528H1.18515C0.533318 4.0528 0 4.58612 0 5.23796V14.7786C0 15.4105 0.533318 15.9438 1.18515 15.9438Z" fill="white" fill-opacity="0.8"/>
<path d="M24.177 5.712C23.6437 5.17868 22.7548 5.17868 22.2215 5.712L19.8907 8.0428L17.5599 5.712C17.0266 5.17868 16.1377 5.17868 15.6044 5.712C15.0713 6.24532 15.0713 7.13418 15.6044 7.6675L17.9354 9.99829L15.6044 12.3291C15.0713 12.8624 15.0713 13.7513 15.6044 14.2846C15.881 14.5609 16.2365 14.6994 16.5921 14.6994C16.9478 14.6994 17.3031 14.5611 17.5797 14.2846L19.9107 11.9536L22.2413 14.2846C22.5178 14.5609 22.8735 14.6994 23.2289 14.6994C23.5846 14.6994 23.9402 14.5611 24.2165 14.2846C24.75 13.7513 24.75 12.8624 24.2165 12.3291L21.8462 9.99829L24.1772 7.6675C24.7103 7.13418 24.7103 6.24532 24.177 5.712Z" fill="white" fill-opacity="0.8"/>
</svg>
`
var playSvg = `<svg width="55" height="40" viewBox="0 0 58 90" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.33318 71.7472H25.8659L48.6208 88.9022C52.1762 91.5688 57.1548 89.08 57.1548 84.6357V5.34912C57.1548 0.993689 52.0874 -1.58401 48.6208 1.08258L25.8659 18.2376H5.33318C2.39993 18.2376 0 20.6376 0 23.5708V66.5038C0 69.3472 2.39993 71.7472 5.33318 71.7472Z" fill="#FFDB43"/>
</svg>
`



const renderCakes = () => {
    const averageHeight = 400;
    const cakes = ["/images/cake.png", "/images/cake2.png"];
    let currIndex = 0;
    const rightDiv = document.getElementById("right");
    const leftDiv = document.getElementById("left");
    const leftDivHeight = leftDiv.offsetHeight;
    const iter = Math.floor(leftDivHeight / averageHeight);
    for (let i = 0; i < iter; i++) {
        const img = document.createElement("img");
        img.setAttribute("src", cakes[currIndex]);
        img.setAttribute("class", `cake-${currIndex}`);
        rightDiv.appendChild(img)
        if (currIndex === cakes.length - 1){
            currIndex = 0
        } else {
            currIndex ++
        };
    }
}

const appendWish = (wish, from, arrow = false) => {
    const container = document.getElementById("left");
    const wishContainer = document.createElement("div");
    wishContainer.classList.add("wish");
    const template = `
                    <div class="wish-upper">
                        <div class="ball"></div>
                        <div class="text-container">
                            <div class="wish-text">${wish}</div>
                            <div class="wish-sender">- ${from}</div>
                        </div>
                        <div class="line">
                        </div>
                    </div>
                    <div class="wish-lower${arrow ? ' allowOverflow' : ''}">
                        <div class="lines-box">
                            <div class="lines-square${arrow ? ' arrow' : ''}"></div>
                        </div>
                    </div>`
    
    wishContainer.innerHTML = template;
    
    container.appendChild(wishContainer)
}

iconHolder.addEventListener('click', function () {
    if (!song.paused) {
        song.pause();
        iconHolder.innerHTML = muteSvg;
    } else {
        song.play();
        iconHolder.innerHTML = playSvg;
    }
})

iconHolder.innerHTML = muteSvg;

fetch("https://hbddaddy.herokuapp.com/api/wishes")
.then(res => res.json())
.then(data => {
    data.forEach((item, index) => appendWish(item["birthday_wish"], item.name, index === data.length - 1))
    renderCakes()
})
