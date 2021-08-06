import { VueType, PluginObject, Component, ComponentConfig, EventType } from './interface'

class VueDynamicComponent implements PluginObject<Component, any> {
  private V: VueType

  components: Component

  constructor(components: Component) {
    this.V = null
    this.components = components
  }

  public install(Vue: VueType): void {
    this.V = Vue
    this.V.prototype.$bus = new Vue()
    this.containerInit(this.V)
    this.componentsRegister()
  }

  private containerInit(V: VueType): void {
    const container = {
      name: 'dynamic-container',
      data() {
        return {
          childComp: [],
        }
      },
      created() {
        V.prototype.$bus.$on(EventType.APPEND, (compInstance: VueType, config: ComponentConfig) => {
          this.childComp.push({
            compInstance,
            ...config,
          })
        })
        V.prototype.$bus.$on(EventType.REMOVE, (compInstance: VueType) => {
          this.childComp = this.childComp.filter(child => child.compInstance !== compInstance)
        })
      },
      render(h) {
        return h(
          'div',
          {
            attrs: {
              id: 'dynamic-container',
            },
          },
          this.childComp.map(({ compInstance, attrs, callbacks, slot, unmount, ...args }) => {
            const customEvents = Object.keys(callbacks).reduce(
              (acc, key) => ({
                ...acc,
                [key]: data => {
                  callbacks[key]({ unmount, data })
                },
              }),
              {}
            )
            return h(compInstance, {
              attrs,
              props: attrs,
              on: {
                'on-unmount': unmount,
                ...customEvents,
                ...this.$listeners,
              },
              scopedSlots: {
                default(props) {
                  return slot
                    ? h(slot, {
                        attrs: props,
                        on: {
                          'on-unmount': unmount,
                          ...customEvents,
                          ...this.$listeners,
                        },
                      })
                    : null
                },
              },
              ...args,
            })
          })
        )
      },
    }

    const ContainerComp = this.V.extend(container)
    const instance = new ContainerComp({ el: document.createElement('div') })
    document.body.appendChild(instance.$el)
  }

  private createDynamicComp(componentData: VueType, config: ComponentConfig): void {
    const compInstance: VueType = this.V.extend(componentData)

    const unmount = () => this.deleteDynamicComp(compInstance)
    this.V.prototype.$bus.$emit(EventType.APPEND, compInstance, {
      ...config,
      unmount,
    })
  }

  private deleteDynamicComp(compInstance: VueType): void {
    this.V.prototype.$bus.$emit(EventType.REMOVE, compInstance)
  }

  private componentsRegister(): void {
    Object.keys(this.components).forEach(key => {
      this.V.prototype[key] = (config: ComponentConfig) => {
        const componentData: VueType = this.components[key]
        this.createDynamicComp(componentData, config)
      }
    })
  }
}

export default VueDynamicComponent
