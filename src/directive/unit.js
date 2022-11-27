export default function directiveUnit(app) {
  app.directive('unit', {
    mounted(el, bindings) {
      let oldText = el.textContent;
      let unit = bindings.value ? bindings.value : '¥';
      el.textContent = unit + oldText;
    },
  })
}