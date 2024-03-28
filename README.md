## SalesForce Query Builder

## Installation
```bash 
    npm i salesforce-query-builder
```


### Simple example of QueryBuilder:
```typescript
    new SFQuery('Contact')
        .select(['Id', 'Name'])
        .where("Name != null")
        .whereIn('Name', ['Maria', 'Ana'])
        .orderBy('Name', 'DESC')
        .limit(3)
        .build()

    SELECT 
        Id,
        Name 
    FROM Contact 
        WHERE Name != null AND Name IN ('Maria','Ana') 
    ORDER BY Name DESC 
    LIMIT 3    
```


### Relationship example of QueryBuilder:
```typescript
    new SFQuery('Contact')
        .select(['Id', 'Name','Account__r.Name'])
        .where("Name != null")
        .whereIn('Name', ['Maria', 'Ana'])
        .orderBy('Name', 'DESC')
        .limit(3)
        .build()

    SELECT 
        Id,
        Name,
        Account__r.Name
    FROM Contact 
        WHERE Name != null AND Name IN ('Maria','Ana') 
    ORDER BY Name DESC 
    LIMIT 3
```

### EncodeQueryUrl example of QueryBuilder:
```typescript
encodeQueryUrl(
    new SFQuery('Contact').select(['Id', 'Name'])
        .where("Name != null")
        .limit(3)
        .build()
)

'query/?q=SELECT+Id,Name+FROM+Contact+WHERE+Name+!=+null+LIMIT+3'
```
### References
- [SOQL and SOSL Reference on Salesforce Developer](https://developer.salesforce.com/docs/atlas.en-us.soql_sosl.meta/soql_sosl/sforce_api_calls_soql_sosl_intro.htm)