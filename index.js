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
          a.cssText.split(" ")[0] === ":root"
            ? a.cssText.split("{")[1].split("}")[0].split(";")
            : null
        )
        .filter((a) => a !== null)
        .flat()
        .map((a) => a.split(": "))
        .filter((a) => a[0] !== " ")
        .reduce(
          (a, v) => ({
            ...a,
            [v[0].slice(1)]: v[1],
          }),
          {}
        );

      for (const key in swiper.params.breakpoints) {
        if (cssVariables[key]) {
          swiper.params.breakpoints[parseInt(cssVariables[key])] =
            swiper.params.breakpoints[key];
          delete swiper.params.breakpoints[key];
        }
      }
    }
  });
}

/**
 * Adds "destroy" support for Swiper breakpoints
 * @param {Function} on
 */
export function BreakpointDestroy({ on }) {
  on("breakpoint", (swiperInstance, breakpointParams) => {
    let swiper, wrapper, slides;

    if (!swiperInstance.elements) {
      swiper = swiperInstance.hostEl;
      wrapper = swiper.querySelector(".swiper-wrapper");
      slides = Array.from(swiper.querySelectorAll(".swiper-slide"));

      swiperInstance.elements = {
        swiper: swiper,
        wrapper: wrapper,
        slides: slides,
      };
    } else {
      swiper = swiperInstance.elements.swiper;
      wrapper = swiperInstance.elements.wrapper;
      slides = swiperInstance.elements.slides;
    }

    if (breakpointParams.destroy) {
      Array.from(swiper.classList).map((className) => {
        if (className.includes("swiper")) {
          swiper.classList.remove(className);
        }
      });
      swiper.classList.add("swiper-destroyed");

      wrapper.removeAttribute("style");
      wrapper.classList.remove("swiper-wrapper");

      slides.forEach((slide) => {
        Array.from(slide.classList).map((className) => {
          if (className.includes("swiper")) {
            slide.classList.remove(className);
          }
        });

        slide.classList.remove("swiper-slide");
        slide.removeAttribute("style");
      });

      swiperInstance.disable();
    } else {
      swiper.classList.add("swiper");
      swiper.classList.remove("swiper-destroyed");

      wrapper.classList.add("swiper-wrapper");

      slides.forEach((slide) => {
        slide.classList.add("swiper-slide");
      });

      swiperInstance.enable();
    }
  });
}
