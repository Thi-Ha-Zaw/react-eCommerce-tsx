# Improving the Categories component responsiveness over different screens.

## How I tackled the problem ?

I added the custom class with name of **no-scrollbar** that hides the nasty ugly scrollbar while scrolling.

```
@layer utilities {
  /* Hide scrollbar for Chrome, Safari and Opera */
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE, Edge and Firefox */
  .no-scrollbar {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
}
```

Here's the result:
https://github.com/shahil-yadav/react-eCommerce-tsx/assets/144932369/21c91abe-26e1-431e-997b-2bd8a6919c5c

## Personal preferences :

I added in a dependency of prettier to automatically sort your tailwind classes while you are in dev environment for the fact there's a structure maintained all throughout your code. I have already setup the **.prettierrc** file so you don't have to.
