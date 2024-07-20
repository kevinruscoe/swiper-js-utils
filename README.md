# Swiper JS Utils

The small package contains 2 Swiper.js modules to make working with Tailwind a little easier.

## CssVariableBreakpoints

Provides a way to use css variable names in Swiper.js breakpoints API.

```css
:root {
    --my-css-variable: 500px;
}
```


```js
{
    // ...
    breakpoints: {
        '--my-css-variable': {
            // ...
        }
    }
}
```

The module will find the variable named `---my-css-variable` and convert it to a number, in this case 500.

## BreakpointDestroy

This modules provides a way to use the key/value "destroy" inside a breakpoint, which will 'destroy' the swiper when it hits that breakpoint. It will keep the swiper registered so it will reactivate once it hits a breakpoint which doesnt have the "destroy" key/value. When the swiper is "destoryed" it will remove most classes and reenable them once it becomes reactived.

```js
{
    breakpoints: {
        500: {
            // ...
            destory: true
        }
    }
}
```