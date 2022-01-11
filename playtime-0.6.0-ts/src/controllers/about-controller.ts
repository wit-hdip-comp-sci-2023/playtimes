import { Request, ResponseToolkit } from "@hapi/hapi";

export const aboutController = {
  index: {
    handler: function (request:Request, h:ResponseToolkit) {
      const viewData = {
        title: "About Playtime",
      };
      return h.view("about-view", viewData);
    },
  },
};
