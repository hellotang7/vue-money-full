import { defineComponent, ref } from "vue";
import { Button } from "../shared/Button";
import s from "./StartPage.module.scss";
import { FloartButton } from "../shared/FloartButton";
import { Center } from "../shared/Center";
import { Icon } from "../shared/Icon";
import { Overlay } from "../shared/Overlay";
import { RouterLink } from "vue-router";
import { MainLayout } from "../layouts/MainLayout";

export const StartPage = defineComponent({
  setup: (props, context) => {
    const overlayVisble = ref(false);
    const onClickMenu = () => {
      overlayVisble.value = !overlayVisble.value;
    };
    return () => (

      <MainLayout>
        {{
          title: () => "山竹记账",
          icon: () => (
            <Icon name="menu" class={s.navIcon} onClick={onClickMenu} />
          ),
          default: () => (
            <>
              <Center class={s.pig_wrapper}>
                <Icon name="pig" class={s.pig} />
              </Center>


              <div class={s.button_wrapper}>
                <RouterLink to="/items/create">
                  <Button class={s.button}>开始记账</Button>
                </RouterLink>
              </div>
              <RouterLink to="/items/create">
                <FloartButton iconName="add"></FloartButton>
              </RouterLink>
              {overlayVisble.value && (
                <Overlay onClose={() => (overlayVisble.value = false)} />
              )}
            </>
          ),
        }}
      </MainLayout>
    );
  },
});
