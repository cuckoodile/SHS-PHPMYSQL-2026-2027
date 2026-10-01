# Packages Required
1. Install tailwindcss

    Install tailwind using the command (terminal)
    ``` bash
    npm i tailwindcss @tailwindcss/vite
    ```
    > Using pnpm:

    ``` bash
    pnpm i tailwindcss @tailwindcss/vite
    ```

2. Set up tailwind
    1. Configure `index.css`
    > Delete all the default content of `index.css`.
    ``` css
    @import 'tailwindcss';
    ```

    2. Configure `vite.config.js`
        1. Import tailwind
        ``` javascript
        import tailwindcss from "@tailwindcss/vite"
        ```

        2. Configure `plugins`
        ``` js
        import react from "@vitejs/plugin-react";
        import { defineConfig } from "vite";
        import tailwindcss from "@tailwindcss/vite";

        // https://vite.dev/config/
        export default defineConfig({
            plugins: [react(), tailwindcss()],
        });
        ```