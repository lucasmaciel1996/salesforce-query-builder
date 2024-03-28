export class SFQuery {
    private object: string
    private conditions: string[]
    private fieldList: Set<string>;
    private numberOfRows: number | undefined;
    private order: string | undefined;
    private queryParts: string[];
    private query: string;

    constructor(object: string) {
        this.object = object
        this.fieldList = new Set()
        this.conditions = [];
        this.queryParts = []
        this.query = ''
    }

    public select(fields: string[]) {
        this.fieldList = new Set([...this.fieldList, ...fields]);
        return this
    }
    public where(condition: string) {
        this.conditions.push(condition);
        return this
    }

    public limit(limit: number) {
        this.numberOfRows = limit
        return this
    }
    public orderBy(filed: string, sort: 'ASC' | 'DESC') {
        this.order = `${filed} ${sort}`
        return this
    }

    public whereIn(filed: string, values: string[]) {
        this.conditions.push(`${filed} IN ('${values.join("','")}')`)
        return this
    }

    private buildSelect() {
        if (this.fieldList.size !== 0) {
            return 'SELECT ' + Array.from(this.fieldList).join(',');
        }
        return 'SELECT Id';
    };

    private buildConditions() {
        if (this.conditions.length !== 0) {
            return `WHERE ${this.conditions.join(' AND ')}`;
        }
        return ''
    };


    public build() {
        this.queryParts = []
        this.query = ''

        this.queryParts.push(this.buildSelect())
        this.queryParts.push(`FROM ${this.object}`)

        this.conditions.length && this.queryParts.push(this.buildConditions())

        this.order && this.queryParts.push(`ORDER BY ${this.order}`)

        this.numberOfRows && this.queryParts.push(`LIMIT ${this.numberOfRows}`)

        this.query = this.queryParts.join(' ')

        return this.query
    }
}

