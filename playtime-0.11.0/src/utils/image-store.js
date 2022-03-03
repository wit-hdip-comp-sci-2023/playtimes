import * as cloudinary from "cloudinary";
import { writeFileSync } from "fs";

export const imageStore = {
  configure: function () {
    const credentials = {
      cloud_name: process.env.name,
      api_key: process.env.key,
      api_secret: process.env.secret,
    };
    cloudinary.config(credentials);
  },

  getAllImages: async function () {
    const result = await cloudinary.v2.api.resources();
    return result.resources;
  },

  uploadImage: async function (imagefile) {
    await writeFileSync("./public/temp.img", imagefile);
    const response = await cloudinary.v2.uploader.upload("./public/temp.img");
    return response.url;
  },

  deleteImage: async function (id) {
    await cloudinary.v2.uploader.destroy(id, {});
  },
};

function uploadToCloudinary(image) {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(image, (err, url) => {
      if (err) return reject(err);
      return resolve(url);
    })
  });
}
