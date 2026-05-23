import { test as baseTest } from "../fixtures/pom-fixtures";
import CommonUtil from "../utils/CommonUtil";

type CommonFixturesType = {
  commonUtil: CommonUtil;
};
export const test = baseTest.extend<CommonFixturesType>({
  commonUtil: async ({}, use) => {
    use(new CommonUtil());
  },
});
