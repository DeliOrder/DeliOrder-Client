const getCopyFileName = (baseName: string): string => {
  const baseNameArray = baseName.split(".");
  const extension = baseNameArray.length >= 2 ? baseNameArray.pop() : "";
  const fileName = baseNameArray.join(".");
  const lastParenIndex = fileName.lastIndexOf("(");

  const lastNumber = Number(
    fileName.slice(lastParenIndex + 1, fileName.lastIndexOf(")")),
  );

  if (Number.isNaN(lastNumber) || fileName[fileName.length - 1] !== ")") {
    return extension ? `${fileName}(1).${extension}` : `${fileName}(1)`;
  }

  const nextCopyNumber = lastNumber + 1;
  const copyFileName = extension
    ? `${fileName.slice(0, lastParenIndex)}(${nextCopyNumber}).${extension}`
    : `${fileName.slice(0, lastParenIndex)}(${nextCopyNumber})`;

  return copyFileName;
};

module.exports = { getCopyFileName };
