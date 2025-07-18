export function FadeAnimation(type : "in" | "out", element : HTMLElement ,duration : number){
    const start = performance.now();

    const AnimCallback = (time : number) => {
        const calcTime = time - start;
        const progress = Math.min(calcTime / duration, 1)

        const resultValue = type === "in" ? `${progress}` : `${1 - progress}`;
        
        element.style.opacity = resultValue;
        element.style.transform = `scale(${resultValue})`;

        if(progress < 1) {
            requestAnimationFrame(AnimCallback)
        }
    }
    requestAnimationFrame(AnimCallback)
}