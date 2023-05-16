import { createSSRApp } from "vue";
import RootComponent from "/shared/Root.vue";
import "/source/index.css";

window.app = createSSRApp(RootComponent);
window.app.mount("#page");
