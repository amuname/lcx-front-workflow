import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { Quasar, QInput, QCheckbox } from "quasar";
import { BlitzListForm } from "blitzar";
// import { FormKit } from "@formkit/vue";

import { plugin, defaultConfig } from "@formkit/vue";
// import NumberField from "@/components/fields/NumberField.vue";

import "@formkit/themes/genesis";
// import "@formkit/themes/dist/genesis/theme.css";

import "@quasar/extras/material-icons/material-icons.css";
import "quasar/src/css/index.sass";
import "./assets/css/app.scss";

createApp(App)
  .use(router)
  .use(createPinia())
  .use(Quasar, {})
  .use(plugin, defaultConfig)
  // .component("FormKit", FormKit)
  // .component("NumberField", NumberField)
  .component("InputField", QInput)
  .component("BooleanField", QCheckbox)
  .component("ListField", BlitzListForm)
  .mount("#app");
