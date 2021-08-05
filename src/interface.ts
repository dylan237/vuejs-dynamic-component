import _Vue from 'vue'

export default _Vue

type PluginFunction<T> = (Vue: typeof _Vue, components?: T) => void

export interface PluginObject<T> {
  install: PluginFunction<T>
  [key: string]: any
}

export interface Component {
  [key: string]: typeof _Vue
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
