import {
  createDynamicComp,
  deleteDynamicComp
} from "vuejs-dynamic-component";
import Popup from "@/components/Popup";

function createPopup({ attrs, ...args }) {
  return new Promise((resolve) => {
    const unmount = () => {
      deleteDynamicComp(popupInstance);
    };
    const popupInstance = createDynamicComp(Popup, {
      attrs,
      on: {
        "on-confirm": function (data) {
          resolve({
            confirm: true,
            data: data,
            unmount
          });
        },
        "on-cancel": function () {
          resolve({
            cancel: true,
            unmount
          });
        }
      },
      // scopedSlots 寫成函數，因為需將 renderElement 當作 callback 傳進來
      scopedSlots(h) {
        return {
          default(popupProp) {
            const hasSlot = args.contentSlot[0]
            return hasSlot
              ? h(args.contentSlot[0], {
                  attrs: popupProp,
                  on: {
                    "slot-event": function (data) {
                      console.log(data);
                      resolve({
                        slotEvent: true,
                        unmount
                      });
                    }
                  }
                })
              : null;
          }
        };
      },
      ...args
    });
  });
}

export { createPopup };
