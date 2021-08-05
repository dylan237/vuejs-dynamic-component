import _Vue, { PluginObject, Component, EventType } from './interface'

class VueDynamicComponent implements PluginObject<Component> {
  private V: _Vue

  private components: Component

  constructor() {
    this.V = null
    this.components = {}
  }

  public install(Vue, components) {
    this.V = Vue
    this.components = components
    this.V.prototype.$bus = new Vue()
    this.containerInit(this.V)
    this.childComponentsRegister()
  }

  private containerInit(V) {
    const container = {
      name: 'dynamic-container',
      data() {
        return {
          childComp: [],
        }
      },
      created() {
        V.prototype.$bus.$on(EventType.APPEND, (compInstance, { attrs, on, ...args }) => {
          this.childComp.push({
            compInstance,
            attrs,
            on,
            ...args,
          })
        })
        V.prototype.$bus.$on(EventType.REMOVE, compInstance => {
          this.childComp = this.childComp.filter(child => child.compInstance !== compInstance)
        })
      },
      render(h) {
        return h(
          'div',
          {
            attrs: {
              class: 'dynamic-container',
            },
          },
          this.childComp.map(({ compInstance, attrs, on, scopedSlots, ...args }) => {
            return h(compInstance, {
              attrs,
              props: attrs,
              on,
              scopedSlots: scopedSlots(h),
              ...args,
            })
          })
        )
      },
    }

    const ContainerComp = this.V.extend(container)
    const instance = new ContainerComp({
      el: document.createElement('div'),
    })
    document.body.appendChild(instance.$el)
  }

  private createDynamicComp(component, { attrs, on, ...args }) {
    const compInstance = this.V.extend(component)
    this.V.prototype.$bus.$emit(EventType.APPEND, compInstance, {
      attrs,
      on,
      ...args,
    })
    return compInstance
  }

  private deleteDynamicComp(compInstance) {
    this.V.prototype.$bus.$emit(EventType.REMOVE, compInstance)
  }

  private childComponentsRegister() {
    Object.keys(this.components).forEach(key => {
      this.V.prototype[key] = ({ attrs, contentSlot, ...args }) => {
        return new Promise(resolve => {
          const unmount = () => {
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            this.deleteDynamicComp(componentInstance)
          }
          const componentInstance = this.createDynamicComp(this.components[key], {
            attrs,
            on: {
              'on-confirm': data => {
                resolve({
                  confirm: true,
                  data,
                  unmount,
                })
              },
              'on-cancel': () => {
                resolve({
                  cancel: true,
                  unmount,
                })
              },
            },
            // scopedSlots 寫成函數，因為需將 renderElement 當作 callback 傳進來
            scopedSlots(h) {
              return {
                default(props) {
                  const hasSlot = contentSlot?.[0]
                  return hasSlot
                    ? h(contentSlot[0], {
                        attrs: props,
                        on: {
                          'slot-event': data => {
                            console.log(data)
                            resolve({
                              slotEvent: true,
                              unmount,
                            })
                          },
                        },
                      })
                    : null
                },
              }
            },
            ...args,
          })
        })
      }
    })
  }
}

export default VueDynamicComponent
