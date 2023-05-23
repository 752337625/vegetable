// .vuepress/client.ts
import { defineClientConfig } from "@vuepress/client";
import "element-plus/dist/index.css";
import webrtcportrait from "../components/webrtcportrait.vue";
import webrtcclient from "../components/webrtcclient.vue";
import { install } from "../greenSock/components/index.ts";
import { svgInstall } from "../svg/components/index.ts";
export default defineClientConfig({
  enhance: ({ app }) => {
    app.component("webrtc-portrait", webrtcportrait);
    app.component("webrtc-client", webrtcclient);
    install(app);
    svgInstall(app);
  },
});
