import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useCounterStore = defineStore("main", () => {
  const name = ref("Lucas");
  const counter = ref(0);

  const doubleCounter = computed(() => counter.value * 2);

  function increment() {
    return counter.value++;
  }

  function $reset() {
    counter.value = 0;
  }

  return { name, counter, doubleCounter, increment, $reset };
});
