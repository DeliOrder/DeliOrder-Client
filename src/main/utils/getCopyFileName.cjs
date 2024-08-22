const getCopyFileName = (baseName) => {
  const baseNameArray = baseName.split(".");
  const extension = baseNameArray.pop();
  const fileName = baseNameArray.join(".");
  const lastParenIndex = fileName.lastIndexOf("(");

  const lastNumber = Number(
    fileName.slice(lastParenIndex + 1, fileName.lastIndexOf(")")),
  );

  if (Number.isNaN(lastNumber) || fileName[fileName.length - 1] !== ")") {
    return `${fileName}(1).${extension}`;
  }

  const nextCopyNumber = lastNumber + 1;
  const copyFileName = `${fileName.slice(0, lastParenIndex)}(${nextCopyNumber}).${extension}`;

  return copyFileName;
};

module.exports = { getCopyFileName };
