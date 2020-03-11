# gridsome-plugin-typed

Adds TypeScript and TSX support for Gridsome.

## Install

`yarn add typescript ts-loader fork-ts-checker-webpack-plugin gridsome-plugin-typed @vue/babel-preset-jsx @babel/plugin-proposal-export-default-form babel-preset-vca-jsx`

## Usage

In your `.vue` files, set the `script lang="ts"` or `script lang="tsx"`

Set up your `babel.config.js`. This is to let you return JSX and TSX straight from `setup()` functions using the Vue Composition API as well.

```javascript
module.exports = {
  presets: [
    "vca-jsx",
    [
      "@vue/babel-preset-jsx",
      {
        "injectH": false
      }
    ]
  ],
  plugins: [
    "@babel/plugin-proposal-export-default-from"
  ]
}
```

You'll need to include some type declarations too.

```typescript
// src/types/jsx.d.ts
import Vue, { VNode } from 'vue'
import { ComponentRenderProxy } from '@vue/composition-api'

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    type Element = VNode;
    // tslint:disable no-empty-interface
    type ElementClass = ComponentRenderProxy;
    interface ElementAttributesProperty {
      $props: any; // specify the property name to use
    }
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}

// src/types/vue-shims.d.ts
declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}
```

## Future

I submitted a PR for Gridsome to allow you to use `.jsx` and `.js` files as page files. I got the same thing working with `.ts` and `.tsx` files, but I'm not sure if the Gridsome team has any interest in supporting that feature. For the meantime, you can use TypeScript in `.vue` files!
