export default function directiveFocus(app) {
  app.directive('globalFocus', {
    mounted(el) {
      el?.focus()
    },
  })
}