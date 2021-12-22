export default {
  list(params) {
    return new Promise((resolve) => {
      let list = []
      if (params.pageIndex == 1) {
        list = [
          {
            name: "张三",
            account: "ttt",
            phone: "13555555555",
            email: "admin@admin.com",
            role: 1,
            status: 1,
            desc: "无父无母的两个孩子，就这样顽强生活在长城之畔的镇子上。少年带着弟弟，以作零工为生。关市开启是人们最快活的日子，四面八方的商人和货物汇集着。少年穿梭其中，眼明手快，笑脸迎人，商人们也乐意关照",
          },
          {
            name: "张三1",
            role: 2,
            status: 2,
          },
          {
            name: "张三1",
            role: 2,
            status: 2,
          },
          {
            name: "张三1",
            role: 2,
            status: 2,
          },
          {
            name: "张三1",
            role: 2,
            status: 2,
          },
          {
            name: "张三1",
            role: 2,
            status: 2,
          },
          {
            name: "张三1",
            role: 2,
            status: 2,
          },
          {
            name: "张三1",
            role: 2,
            status: 2,
          },
          {
            name: "张三1",
            role: 2,
            status: 2,
          },
          {
            name: "张三1",
            role: 2,
            status: 2,
          },
        ]
      } else {
        list = [
          {
            name: "李四",
            account: "ttt",
            phone: "13555555555",
            email: "admin@admin.com",
            role: 1,
            status: 1,
          },
          {
            name: "李四",
            role: 2,
            status: 2,
          },
        ]
      }
      setTimeout(() => {
        resolve({
          data: list,
          total: 12,
        })
      }, 1000)
    })
  },
  types() {
    return new Promise((resolve) => {
      let list = [
        { id: 1, name: "分类1" },
        { id: 2, name: "分类2" },
        { id: 3, name: "分类3" },
      ]
      setTimeout(() => {
        resolve({
          data: list,
          total: 12,
        })
      }, 1000)
    })
  },
}
