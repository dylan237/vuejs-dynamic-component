import _Vue from 'vue'

export type VueType = typeof _Vue
export type PluginFunction<U> = (Vue: VueType, options?: U) => void
export interface ComponentConfig {
  attrs: any
  on: any
  [key: string]: any
}
export interface PluginObject<T, U> {
  // V: VueType
  components: T
  install: PluginFunction<U>
  // containerInit: (V: VueType) => void
  // createDynamicComp: (component: VueType, config: ComponentConfig) => VueType
  // deleteDynamicComp: (compInstance: VueType) => void
  // childComponentsRegister: () => void
}

export interface Component {
  [key: string]: VueType
}

export enum EventType {
  APPEND = 'append-child',
  REMOVE = 'remove-child',
}

declare module 'vue/types/vue' {
  interface Vue {
    prototype: any
    extend: any
  }
}
