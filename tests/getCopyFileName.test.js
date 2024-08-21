/* eslint-disable */
const { getCopyFileName } = require("../src/main/utils/getCopyFileName.cjs");

it("파일이름 끝에 번호가 없을경우 (1)번이 붙어서 만들어져야 합니다.", () => {
  const testFileName = "테스트 파일이름.app";

  expect(getCopyFileName(testFileName)).toBe("테스트 파일이름(1).app");
});

it("파일이름 끝에 ()번호가 붙어있을 경우 해당번호에 1추가 돼서 새로 만들어져야 합니다.", () => {
  const testFileName = "테스트 파일이름(1).app";

  expect(getCopyFileName(testFileName)).toBe("테스트 파일이름(2).app");
});

it("파일이름 중간에 ()가 있을 경우 마지막에 (1)번이 붙어서 만들어져야 합니다.", () => {
  const testFileName = "테스트(1)번째 테스트.app";

  expect(getCopyFileName(testFileName)).toBe("테스트(1)번째 테스트(1).app");
});

it("파일이름 중간과 마지막에 () 있을 경우도 잘 구분해서 만들어져야 합니다.", () => {
  const testFileName = "테스트(1)번째 테스트(3).app";

  expect(getCopyFileName(testFileName)).toBe("테스트(1)번째 테스트(4).app");
});

it("파일이름 중간에 . 있을 경우도 확장자와 잘 구분해서 만들어져야 합니다.", () => {
  const testFileName = "테스트. 파일이름.app";

  expect(getCopyFileName(testFileName)).toBe("테스트. 파일이름(1).app");
});

it("복합적으로 이름 중간에 나와도 잘 구분해서 만들어져야 합니다.", () => {
  const testFileName = "(1)(5)번째. 테스트(10).app";

  expect(getCopyFileName(testFileName)).toBe("(1)(5)번째. 테스트(11).app");
});
/* eslint-enable */
