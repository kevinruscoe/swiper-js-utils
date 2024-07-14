/**
 * Adds CSS variable support for Swiper breakpoints
 * @param {Swiper} swiper
 * @param {Function} on
 */
export function CssVariableBreakpoints({ swiper, on }) {
    on("beforeInit", () => {
        if (swiper.params.breakpoints) {
            let cssVariables = [...document.styleSheets]
                .filter(
                    (a) => a.href === null || a.href.startsWith(window.location.origin)
                )
                .map((a) => [...a.rules])
                .reduce((a, v) => [...a, ...v], [])
                .map((a) =>
                    a.cssText.split(" ")[0] === ":root" ?
                    a.cssText.split("{")[1].split("}")[0].split(";") :
                    null
                )
                .filter((a) => a !== null)
                .flat()
                .map((a) => a.split(": "))
                .filter((a) => a[0] !== " ")
                .reduce((a, v) => ({
                    ...a,
                    [v[0].slice(1)]: v[1]
                }), {});

            for (const key in swiper.params.breakpoints) {
                if (cssVariables[key]) {
                    swiper.params.breakpoints[parseInt(cssVariables[key])] =
                    swiper.params.breakpoints[key];
                    delete swiper.params.breakpoints[key];
                }
            }
        }
    })
}

/**
 * Adds "destroy" support for Swiper breakpoints
 * @param {Function} on
 */
export function BreakpointDestroy({ on }) {
    on("breakpoint", (swiper, breakpointParams) => {
        swiper.wrapper = swiper.hostEl.querySelector('.swiper-wrapper')
        swiper.slides = Array.from(swiper.wrapper.children);
        if (breakpointParams.destroy) {
            swiper.hostEl.classList.remove('swiper');
            swiper.wrapper.removeAttribute('style');
            swiper.slides.forEach((slide) => {
                slide.classList.remove('swiper-slide');
                slide.removeAttribute('style');
            })
            swiper.disable();
        } else {
            swiper.hostEl.classList.add('swiper');
            swiper.slides.forEach((slide) => {
                slide.classList.add('swiper-slide');
            })
            swiper.enable();
        }
    });
}

