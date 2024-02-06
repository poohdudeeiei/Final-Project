import * as fs from "fs";
import * as path from "path";

export const clearImage = (filePath: string) => {
  const delete_image = path.resolve(process.cwd(), filePath);

  fs.unlink(delete_image, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`File ${delete_image} deleted successfully.`);
    }
  });
};
