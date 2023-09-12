import { Ref } from "vue";

export function filterFnConstructor(
  options: Ref<{ value: string; label: string }[]>,
  original_value: Ref<{ value: string; label: string }[]>
) {
  return function filterFn(val: string, update: any) {
    if (val === "") {
      const fn = () => (options.value = original_value.value);
      update(fn);
      return;
    }

    const fn = () => {
      const needle = val.toLowerCase();
      options.value = original_value.value.filter(
        (v: { label: string; value: string }) => {
          return v.value.toLowerCase().indexOf(needle) > -1;
        }
      );
    };
    update(fn);
  };
}
