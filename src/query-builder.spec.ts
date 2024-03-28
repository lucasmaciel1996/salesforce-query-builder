import { SFQuery } from "./query-builder"
import { encodeQueryUrl } from "./encode-quey-url"

describe('SFQuery Unit Test', () => {
    it.each([
        {
            query: new SFQuery('Contact').build(),
            expected: 'SELECT Id FROM Contact'
        },
        {
            query: new SFQuery('Contact').select(['Id', 'Name']).build(),
            expected: 'SELECT Id,Name FROM Contact'
        },
        {
            query: new SFQuery('Contact').select(['Id', 'Name']).limit(1).build(),
            expected: 'SELECT Id,Name FROM Contact LIMIT 1'
        },
        {
            query: new SFQuery('Contact').select(['Id', 'Name']).orderBy('Name', 'DESC').limit(3).build(),
            expected: 'SELECT Id,Name FROM Contact ORDER BY Name DESC LIMIT 3'
        },
        {
            query: new SFQuery('Contact')
                .select(['Id', 'Name'])
                .where("Name = 'Maria'")
                .orderBy('Name', 'DESC')
                .limit(3)
                .build(),
            expected: "SELECT Id,Name FROM Contact WHERE Name = 'Maria' ORDER BY Name DESC LIMIT 3"
        },
        {
            query: new SFQuery('Contact').select(['Id', 'Name'])
                .orderBy('Name', 'DESC')
                .where("Name != null")
                .where("Name = 'Maria'")
                .limit(3)
                .build(),
            expected: "SELECT Id,Name FROM Contact WHERE Name != null AND Name = 'Maria' ORDER BY Name DESC LIMIT 3"
        }
        ,
        {
            query: new SFQuery('Contact').select(['Id', 'Name'])
                .orderBy('Name', 'DESC')
                .where("Name != null")
                .whereIn('Name', ['Maria', 'Ana'])
                .limit(3)
                .build(),
            expected: "SELECT Id,Name FROM Contact WHERE Name != null AND Name IN ('Maria','Ana') ORDER BY Name DESC LIMIT 3"
        }
        ,
        {
            query: encodeQueryUrl(new SFQuery('Contact').select(['Id', 'Name'])
                .orderBy('Name', 'DESC')
                .where("Name != null")
                .whereIn('Name', ['Maria', 'Ana'])
                .limit(3)
                .build()),
            expected: "query/?q=SELECT+Id,Name+FROM+Contact+WHERE+Name+!=+null+AND+Name+IN+('Maria','Ana')+ORDER+BY+Name+DESC+LIMIT+3"
        }
    ])('%# $query', ({ expected, query }) => {
        expect(query).toBe(expected)
    })
})