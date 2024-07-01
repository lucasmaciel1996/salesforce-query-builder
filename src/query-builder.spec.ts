import { SFQuery } from "./query-builder"
import { encodeQueryUrl } from "./encode-quey-url"

describe("SFQuery", () => {
    it.each([
        {
            query: new SFQuery("Contact").select(["Id"]).build(),
            expected: "SELECT Id FROM Contact",
        },
        {
            query: new SFQuery("Contact").select(["Id", "Name"]).build(),
            expected: "SELECT Id,Name FROM Contact",
        },
        {
            query: new SFQuery("Contact").select(["Id", "Name"]).limit(1).build(),
            expected: "SELECT Id,Name FROM Contact LIMIT 1",
        },
        {
            query: new SFQuery("Contact").select(["Id", "Name"]).offset(10).build(),
            expected: "SELECT Id,Name FROM Contact OFFSET 10",
        },
        {
            query: new SFQuery("Contact")
                .select(["Id", "Name"])
                .offset(10)
                .limit(20)
                .build(),
            expected: "SELECT Id,Name FROM Contact LIMIT 20 OFFSET 10",
        },
        {
            query: new SFQuery("Contact")
                .select(["Id", "Name"])
                .orderBy("Name", "DESC")
                .limit(3)
                .build(),
            expected: "SELECT Id,Name FROM Contact ORDER BY Name DESC LIMIT 3",
        },
        {
            query: new SFQuery("Contact")
                .select(["Id", "Name"])
                .where("Name = 'Maria'")
                .orderBy("Name", "DESC")
                .limit(3)
                .build(),
            expected:
                "SELECT Id,Name FROM Contact WHERE Name = 'Maria' ORDER BY Name DESC LIMIT 3",
        },
        {
            query: new SFQuery("Contact")
                .select(["Id", "Name"])
                .orderBy("Name", "DESC")
                .where("Name != null")
                .whereIn("Name", ["Maria", "Ana"])
                .limit(3)
                .build(),
            expected:
                "SELECT Id,Name FROM Contact WHERE Name != null AND Name IN ('Maria','Ana') ORDER BY Name DESC LIMIT 3",
        },
        {
            query: new SFQuery("Contact")
                .select(["Type"])
                .where("Name != null")
                .whereIn("Name", ["Maria", "Ana"])
                .orderBy("Type", "DESC")
                .groupBy("Type")
                .limit(3)
                .build(),
            expected:
                "SELECT Type FROM Contact WHERE Name != null AND Name IN ('Maria','Ana') GROUP BY Type ORDER BY Type DESC LIMIT 3",
        },
        {
            query: encodeQueryUrl(
                new SFQuery("Product2").select(["Id"]).limit(1).build(),
            ),
            expected: "query/?q=SELECT+Id+FROM+Product2+LIMIT+1",
        },
        {
            query: encodeQueryUrl(
                new SFQuery("Contact")
                    .select(["Id", "Name"])
                    .where("Name != null")
                    .whereIn("Name", ["Maria", "Ana"])
                    .orderBy("Name", "DESC")
                    .limit(3)
                    .build(),
            ),
            expected:
                "query/?q=SELECT+Id,Name+FROM+Contact+WHERE+Name+!=+null+AND+Name+IN+('Maria','Ana')+ORDER+BY+Name+DESC+LIMIT+3",
        },
    ])("SFQuery $query", ({ query, expected }) => {
        expect(query).toBe(expected);
    });
});
