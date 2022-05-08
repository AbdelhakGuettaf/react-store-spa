# :wave: Hello there!

## What is this ? :thinking:

An eCommerce SPA app using router dom, with fully dynamic routing.

This app was created with CRA TypeScript template.

## Data fetch

endpoint url is in src/App.tsx line 33 ! :rocket:

Data is fetched using OPUS (:muscle: Awesome little tool). However, for simplicity, data is fetched in one go due to the design of the end-point. For scalablity, We can use RTK Query API if data gets too big or even limit the fetch and lazy load them at users' request.

## Data flow

This app uses Redux/Toolkit since it is heavy on global state usage (currency, cart items...)

## Features not included in the original design

> User can change attributes from the MiniCart and Cart page to improve UX. (:lock: disabled in this build, see line 111 in components/attributes/AttribueItem.tsx)

> Attributes of products in cart have a seperate state and should not interfere with products in PDP and PLP.

> Responive layout and some media breaks, mobile view not provided but should work well on most devices.

## Functionality:

> Any item added to cart will be processed, meaning a user cannot duplicate an item with the same attributes or an item that hasn't any. (logic is in ./utils/functions.ts and in components/cart/cart.slice.ts)

> User cannot add an out of stock item to cart but they can visit its PDP.

Made with :heart: by Guettaf Abdelhak!
