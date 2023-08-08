import { defineComponent, onMounted, PropType, reactive, ref } from "vue";
import s from "./ItemCreate.module.scss";
import { MainLayout } from "../../layouts/MainLayout";
import { Icon } from "../../shared/Icon";
import { Tab, Tabs } from "../../shared/Tabs";
import { InputPad } from "./InputPad";
import {RouterLink, useRouter} from 'vue-router';
import { http } from "../../shared/Http";
import { Button } from "../../shared/Button";
import { useTags } from "../../shared/useTags";
import { Tags } from "./Tags";
import {Dialog} from 'vant';
import {AxiosError} from 'axios';

export const ItemCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    const formData = reactive({
      kind: "支出",
      tag_id: [],
      amount: 0,
      happen_at: new Date().toISOString(),
    });
const router = useRouter()
    const onError = (error:AxiosError<ResourceError>)=>{
        if (error.response?.status === 422) {
            Dialog.alert({
                title: '出错',
                message: Object.values(error.response.data.errors).join('\n')
            })
        }
        throw error
    }
      const onSubmit = async () => {
          await http.post<Resource<Item>>('/items', formData,
              {params: {_mock: 'itemCreate'}}
          ).catch(onError);
          Dialog.alert({
              title: '成功',
              message: '添加成功'
          });
          router.push('/items');
      };

    return () => (
      <MainLayout class={s.layout}>
        {{
          title: () => "记一笔",
          icon: () => (
            <RouterLink to="/items">
              <Icon name="left" class={s.navIcon} />
            </RouterLink>
          ),
          default: () => (
            <>
              <div class={s.wrapper}>

                <Tabs v-model:selected={formData.kind} class={s.tabs}>
                  <Tab name="支出" class={s.tags_wrapper}>
                    <Tags
                      kind="expenses"
                      v-model:selected={formData.tag_id[0]}
                    />
                  </Tab>
                  <Tab name="收入" class={s.tags_wrapper}>
                    <Tags kind="income" v-model:selected={formData.tag_id[0]} />
                  </Tab>
                </Tabs>
                <div class={s.inputPad_wrapper}>
                  <InputPad
                    v-model:happenAt={formData.heppen_at}
                    v-model:amount={formData.amount}
                    onSubmit={onSubmit}
                  />
                </div>
              </div>
            </>
          ),
        }}
      </MainLayout>
    );
  },
});
