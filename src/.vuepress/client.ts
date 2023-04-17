// .vuepress/client.ts
import { defineClientConfig } from "@vuepress/client";
import "element-plus/dist/index.css";
import portrait from "../components/portrait.vue";
import client from "../components/client.vue";
import { install } from "../plugins/components/index.js";
export default defineClientConfig({
  enhance: ({ app }) => {
    app.component("Portrait", portrait);
    app.component("Client", client);
    install(app);
  },
});
