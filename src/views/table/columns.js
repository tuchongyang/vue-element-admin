import constant from "@/utils/constant"
export function getColumns() {
  return [
    {
      label: "用户",
      children: [
        {
          label: "姓名",
          prop: "name",
          width: 140,
          sortable: "custom",
          filter: {
            component: "input",
          },
          form: {
            formItem: {
              rules: [
                {
                  required: true,
                  trigger: "blur",
                  message: "请输入用户姓名",
                },
              ],
            },
          },
        },
        {
          label: "登录账号",
          prop: "account",
          width: 120,
          filter: {
            component: "input",
          },
          sortable: "custom",
          form: {
            formItem: {
              rules: [
                {
                  required: true,
                  trigger: "blur",
                  message: "请输入登录账号",
                },
              ],
            },
          },
        },
      ],
    },

    {
      label: "手机号",
      prop: "phone",
      width: 130,
      filter: {
        component: "input",
      },
      form: {
        component: "input",
        rules: [
          {
            required: true,
            trigger: "blur",
            message: "请输入手机号",
          },
          {
            len: 11,
            message: "请输入正确的手机号码",
            trigger: "blur",
          },
        ],
      },
    },
    {
      label: "邮箱",
      prop: "email",
      width: 200,
      form: {
        component: "input",
        rules: [
          {
            required: true,
            message: "请输入邮箱",
            trigger: "blur",
          },
          {
            type: "email",
            message: "请填写正确的邮箱",
            trigger: "blur",
          },
        ],
      },
    },
    {
      label: "角色",
      prop: "role",
      width: 120,
      align: "center",
      options: [
        { label: "超级管理员", value: 1 },
        { label: "普通管理员", value: 2 },
      ],
      form: {
        component: "select",
        rules: [
          {
            required: true,
            trigger: "change",
            message: "请选择用户角色",
          },
        ],
        value: 1,
      },
      dict: {
        url: "/api/icrud/role",
      },
    },
    {
      label: "性别",
      prop: "gender",
      width: 100,
      align: "center",
      options: [
        { label: "男", value: 1 },
        { label: "女", value: 2 },
      ],
      form: {
        component: "radio",
        value: 1,
      },
      dict: {
        url: "/api/icrud/gender",
      },
    },
    {
      label: "状态",
      prop: "status",
      align: "center",
      options: constant.CommonStatus,
      filter: {
        component: "select",
      },

      componentName: "Radio",
      component: {
        formatBadge: true,
      },
      form: {
        component: "radio",
        value: 1,
      },
      addForm: {
        component: {
          value: "1",
        },
      },
      dict: {
        url: "/api/icrud/status",
      },
    },
    {
      label: "创建时间",
      prop: "createTime",
      width: 170,
      form: {
        component: "date-picker",
        props: {
          format: "YYYY/MM/DD",
          valueFormat: "YYYY/MM/DD",
        },
      },
      addForm: {
        show: false,
      },
    },
    {
      label: "ID",
      prop: "id",
      width: 120,
      form: {
        component: "input",
        props: {
          disabled: true,
        },
        hidden: (form) => !form.id,
      },
    },
    {
      label: "个人介绍",
      prop: "desc",
      width: 140,
      show: false,
      showOverflowTooltip: true,
      form: {
        component: "input",
        props: {
          type: "textarea",
          rows: 6,
        },
        span: 24,
      },
    },
  ]
}
