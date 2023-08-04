import { defineComponent, PropType, reactive } from "vue";
import s from "./SignInPage.module.scss";
import { MainLayout } from "../layouts/MainLayout";
import { Icon } from "../shared/Icon";
import { Form, FormItem } from "../shared/Form";
import { Button } from "../shared/Button";
import { validate } from "../shared/validate";
export const SignInPage = defineComponent({
  setup: (props, context) => {
    const formData = reactive({
      email: "",
      code: "",
    });
    const errors = reactive({
      email: [],
      code: [],
    });
    const onsubmit = (e: Event) => {
      e.preventDefault();
      Object.assign(errors, {
        email: [],
        code: [],
      });

      Object.assign(
        errors,
        validate(formData, [
          { key: "email", type: "required", message: "必填" },
          {
            key: "email",
            type: "pattern",
            regex: /.+@.+/,
            message: "必须是邮箱地址",
          },
          { key: "code", type: "required", message: "必填" },
        ])
      );
    };
    return () => (
      <MainLayout>
        {{
          title: () => "登录",
          icon: () => <Icon name="left" />,
          default: () => (
            <div class={s.wrapper}>
              <div class={s.logo}>
                <Icon class={s.icon} name="mangosteen"></Icon>
                <h1 class={s.title}>山竹记账</h1>
              </div>
              <Form onSubmit={onsubmit}>
                <FormItem
                  label="邮箱地址"
                  type="text"
                  v-model={formData.email}
                  error={errors.email?.[0]}
                  placeholder="请输入邮箱地址"
                />
                <FormItem
                  label="验证码"
                  type="validationCode"
                  v-model={formData.code}
                  error={errors.code?.[0]}
                  placeholder="请输入验证码"
                />
                <FormItem class={s.login}>
                  <Button>登录</Button>
                </FormItem>
              </Form>
            </div>
          ),
        }}
      </MainLayout>
    );
  },
});