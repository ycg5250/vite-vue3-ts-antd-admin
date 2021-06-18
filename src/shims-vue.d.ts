declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
  interface ComponentCustomProperties {
    $global: any;
  }
}
