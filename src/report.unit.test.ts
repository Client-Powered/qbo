import { ReportQuery } from "./reports";
import { createReportOpts } from "./report";
import { format } from "date-fns";
import "ts-err-as-value/globals";
import { UTCDate } from "@date-fns/utc";


describe("createReportOpts", () => {
  it("should handle the commas separated value queries correctly", () => {
    const opts: ReportQuery<"transaction_list"> = {
      term: [
        "hello",
        "world"
      ],
      department: "some-department"
    };
    const result = createReportOpts({
      opts
    });
    expect(result).toStrictEqual({
      term: "hello,world",
      department: "some-department"
    });
  });

  it("should convert date properties correctly", () => {
    const now = format(new Date("2023-09-20"), "yyyy-MM-dd", {
      in: arg => {
        return new UTCDate(arg);
      }
    });
    const opts: ReportQuery<"transaction_list"> = {
      end_date: "2023-09-20"
    };
    const result = createReportOpts({
      opts
    });
    expect(result).toEqual({
      end_date: now
    });
  });

  it("should leave other property types unchanged", () => {
    const opts: ReportQuery<"transaction_list"> = {
      source_account_type: "Bank",
      transaction_type: "Check"
    };
    const result = createReportOpts({
      opts
    });
    expect(result).toStrictEqual({
      source_account_type: "Bank",
      transaction_type: "Check"
    });
  });
});
