// .vuepress/client.ts
import { defineClientConfig } from "@vuepress/client";
import "element-plus/dist/index.css";
import portrait from "../components/portrait.vue";
import client from "../components/client.vue";
// import { install } from "../greenSock/components/index.ts";
import { svgInstall } from "../svg/components/index.ts";
export default defineClientConfig({
  enhance: ({ app }) => {
    app.component("Portrait", portrait);
    app.component("Client", client);
    // install(app);
    svgInstall(app);
  },
});
