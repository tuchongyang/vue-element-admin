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
          type: "Input",
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
      form: {
        component: {
          name: "Input",
        },
        formItem: {
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
    },
    {
      label: "邮箱",
      prop: "email",
      width: 200,
      form: {
        component: {
          name: "Input",
        },
        formItem: {
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
        component: {
          name: "Select",
        },
        formItem: {
          rules: [
            {
              required: true,
              trigger: "change",
              message: "请选择用户角色",
            },
          ],
        },
      },
      addForm: {
        component: {
          value: "ROLE_USER",
        },
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
      type: "Radio",
      addForm: {
        component: {
          value: "3",
        },
      },
      dict: {
        url: "/api/icrud/gender",
      },
    },
    {
      label: "状态",
      prop: "status",
      align: "center",
      options: [
        { label: "启用", value: 1 },
        { label: "禁用", value: 2 },
      ],
      componentName: "Radio",
      component: {
        formatBadge: true,
      },
      form: {
        component: {
          name: "Radio",
        },
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
      sortable: "custom",
      sortType: "desc",
      componentName: "DatePicker",
      component: {
        type: "datetime",
      },
      form: {
        component: {
          name: "DatePicker",
          type: "datetime",
          format: "yyyy-MM-dd HH:mm:ss",
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
        component: {
          name: "Input",
          disabled: true,
        },
      },
      addForm: {
        show: false,
      },
    },
    {
      label: "个人介绍",
      prop: "desc",
      width: 140,
      show: false,
      tooltip: true,
      formatData: false,
      form: {
        component: {
          name: "Input",
          type: "textarea",
          autosize: {
            minRows: 3,
          },
        },
        grid: {
          span: 24,
        },
      },
    },
  ]
}
