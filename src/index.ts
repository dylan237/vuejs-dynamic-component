import { VueType, PluginObject, Component, ComponentConfig, EventType } from './interface'

class VueDynamicComponent implements PluginObject<Component, any> {
  private static instance: PluginObject<Component, any>

  private V: VueType

  components: Component

  constructor(components: Component) {
    this.V = null
    this.components = components
  }

  public static init(components: Component): PluginObject<Component, any> {
    if (!VueDynamicComponent.instance) {
      VueDynamicComponent.instance = new VueDynamicComponent(components)
    }
    return VueDynamicComponent.instance
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
        V.prototype.$bus.$on(EventType.APPEND, (componentConstructor: VueType, config: ComponentConfig) => {
          this.childComp.push({
            componentConstructor,
            ...config,
          })
        })
        V.prototype.$bus.$on(EventType.REMOVE, (componentConstructor: VueType) => {
          this.childComp = this.childComp.filter(child => child.componentConstructor !== componentConstructor)
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
          this.childComp.map(({ componentConstructor, attrs, callbacks, slot, unmount, ...args }) => {
            const customEvents = Object.keys(callbacks).reduce(
              (acc, key) => ({
                ...acc,
                [key]: data => {
                  callbacks[key]({ unmount, data })
                },
              }),
              {}
            )
            return h(componentConstructor, {
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
    const componentConstructor: VueType = this.V.extend(componentData)

    const unmount = () => this.deleteDynamicComp(componentConstructor)
    this.V.prototype.$bus.$emit(EventType.APPEND, componentConstructor, {
      ...config,
      unmount,
    })
  }

  private deleteDynamicComp(componentConstructor: VueType): void {
    this.V.prototype.$bus.$emit(EventType.REMOVE, componentConstructor)
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
