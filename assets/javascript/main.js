let
    sliderFrameFirst = document.querySelector('.slider-frame.first'),
    sliderFrameSecond = document.querySelector('.slider-frame.second'),
    sliderRightArrowButton = document.querySelector('.arrowContainer.right'),
    sliderLeftArrowButton = document.querySelector('.arrowContainer.left'),
    allProcessItem = document.querySelectorAll('.processChange-item'),
    process = document.querySelector('.processChange'),
    bigFrameE = document.querySelector('.bigFrame'),
    rightButtonSaling = document.querySelector('.body-salingItems-box .arrowContainer.right'),
    leftButtonSaling = document.querySelector('.body-salingItems-box .arrowContainer.left'),
    allItemImgSaling = document.querySelectorAll('.item-img'),
    allItemWraplink = document.querySelectorAll('.anItem-wrap-link')
//slider init
let imgSrc = [
    'url(./assets/imgs/ip13pm.png)',
    'url(./assets/imgs/ss.png)',
    'url(./assets/imgs/sontuong.png)',
    'url(./assets/imgs/sameSoobin.png)',
    'url(./assets/imgs/dongho.png)',
    'url(./assets/imgs/laptop.png)',
    'url(./assets/imgs/nammuoipt.png)',
    'url(./assets/imgs/loa.png)'
],
    currentImg = 0,
    dubiImg = 0,
    totalPrevious = 0,
    agree = 1,
    totalNext = 0,
    runPhase = '',
    enableAuto = true,
    //Saling box init
    totalNextBF = 0,
    leftBF = 0
bigFrameE.style.left = '0px'
let classNameProcessItem = allProcessItem[0].className
let totalProcessItem = allProcessItem.length
let sliderDisplayOnProcess = function (data = dubiImg) {
    for (let i = 0; i < totalProcessItem; i++)
        allProcessItem[i].className = classNameProcessItem
    allProcessItem[data].className += ' processChange-item-active'
}
let sliderHandleProcess = function (data = dubiImg) {
    if (data === 5 && runPhase === 'next')
        process.style.animation = 'goNextProcess 0.3s linear'
    if (data === imgSrc.length && runPhase === 'next')
        process.style.animation = 'goBackProcess 0.3s linear'
    if (data === 2 && runPhase === 'previous')
        process.style.animation = 'goBackProcess 0.3s linear'
    if (data === -1 && runPhase === 'previous')
        process.style.animation = 'goNextProcess 0.3s linear'
}
process.onanimationend = function () {
    if (process.style.animationName === 'goNextProcess') {
        process.style.right = '-0.2px'
    }
    if (process.style.animationName === 'goBackProcess') {
        process.style.right = '-500px'
    }
    process.style.animation = 'none'
}
var clearAutochangeImg = setInterval(function () {
    if (enableAuto) {
        ++totalNext
    }
}, 4000)
let resetAutochangeImg = function () {
    clearInterval(clearAutochangeImg);
    clearAutochangeImg = setInterval(function () {
        if (enableAuto) {
            ++totalNext
        }
    }, 4000)
}
document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === 'hidden') {
        enableAuto = false
    }
});
document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === 'visible') {
        resetAutochangeImg()
        enableAuto = true
    }
});
sliderFrameFirst.style.backgroundImage = imgSrc[currentImg]
sliderDisplayOnProcess()
for (let key = 0; key < totalProcessItem; key++) {
    allProcessItem[key].onclick = function () {
        resetAutochangeImg()
        currentImg = key
        sliderFrameFirst.style.backgroundImage = imgSrc[currentImg]
        sliderFrameSecond.style.backgroundImage = imgSrc[currentImg]
        sliderDisplayOnProcess(currentImg)
    }
}
sliderRightArrowButton.onmousedown = function () {
    resetAutochangeImg()
    ++totalNext
}
sliderLeftArrowButton.onmousedown = function () {
    resetAutochangeImg()
    ++totalPrevious
}
let sliderHandleChangeImg = function () {
    if (agree === 1 && totalPrevious > 0) {
        runPhase = 'previous'
        agree = 0
        dubiImg = currentImg - 1
        sliderHandleProcess()
        if (dubiImg < 0)
            dubiImg = imgSrc.length - 1
        sliderFrameSecond.style.backgroundImage = imgSrc[dubiImg]
        sliderFrameFirst.style.animation = 'gotoPrevious 0.2s linear'
        sliderDisplayOnProcess()
        sliderFrameSecond.style.animation = 'gotoDisplay_Previous 0.2s linear'
    }
    if (agree === 1 && totalNext > 0 && totalPrevious === 0) {
        runPhase = 'next'
        agree = 0
        dubiImg = currentImg + 1
        sliderHandleProcess()
        if (dubiImg >= imgSrc.length)
            dubiImg = 0
        sliderFrameSecond.style.backgroundImage = imgSrc[dubiImg]
        sliderFrameFirst.style.animation = 'gotoNext 0.2s linear'
        sliderDisplayOnProcess()
        sliderFrameSecond.style.animation = 'gotoDisplay_Next 0.2s linear'
    }
}
sliderFrameFirst.onanimationend = function () {
    sliderFrameFirst.style.animation = 'none'
    if (runPhase === 'previous') {
        sliderFrameFirst.style.right = '-100%'
    }
    if (runPhase === 'next') {
        sliderFrameFirst.style.right = '100%'
    }
    
}
sliderFrameSecond.onanimationend = function () {
    sliderFrameSecond.style.animation = 'none'
    sliderFrameSecond.style.right = '0px'
    if (runPhase === 'previous') {
        currentImg--
        if (currentImg < 0)
        currentImg = imgSrc.length - 1
        --totalPrevious
    }
    if (runPhase === 'next') {
        currentImg++
        if (currentImg >= imgSrc.length)
        currentImg = 0
        --totalNext
    }
    sliderFrameFirst.style.backgroundImage = imgSrc[dubiImg]
    agree = 1
}
let currentLeft=0, totalNextClickSaling = 0,agreeBF=1, totalPreviousClickSaling =0
rightButtonSaling.onmousedown = function () {
    ++totalNextClickSaling
}
leftButtonSaling.onmousedown = function () {
    ++totalPreviousClickSaling
}
let salingHandler = function () {
    if (totalNextClickSaling>0&&agreeBF===1) {
        currentLeft-=1180
        if(currentLeft<-3540)
        currentLeft=0
        bigFrameE.style.left = `${currentLeft}px`
        setTimeout(() => {
            agreeBF=1
        }, 500);
        totalNextClickSaling--
    }
    if (totalPreviousClickSaling>0&&agreeBF===1) {
        currentLeft+=1180
        if(currentLeft>0)
        currentLeft=-3540
        bigFrameE.style.left = `${currentLeft}px`
        setTimeout(() => {
            agreeBF=1
        }, 500);
        totalPreviousClickSaling--
    }
}
// console.log(currentLeft);
// rightButtonSaling.onmousedown = function () {
//     bigFrameE.style.animation= 'goNextBigFrame1 0.5s linear'
// }

setInterval(function () {
    sliderHandleChangeImg()
    salingHandler()
}, 10)

