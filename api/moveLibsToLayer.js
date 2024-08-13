import fs from "fs-extra";

// moving the files into layers
const moveFilesToLayer = async (folderList) => {
  for (const eachItem of folderList) {
    fs.copySync(
      `functionStack/${eachItem}`,
      `lambdaLayerStack/node_modules/${eachItem}`,
      {
        overwrite: true,
      }
    );
  }
};

//  add the folderName path you have to add that data in layer;
const foldersData = ["libs"];

moveFilesToLayer(foldersData).catch(console.error);
