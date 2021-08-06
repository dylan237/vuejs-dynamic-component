import _Vue from 'vue'

export type VueType = typeof _Vue
export type PluginFunction<U> = (Vue: VueType, options?: U) => void
export interface ComponentConfig {
  attrs: any
  callbacks: any
  slot: VueType
  [key: string]: any
}
export interface PluginObject<T, U> {
  components: T
  install: PluginFunction<U>
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
