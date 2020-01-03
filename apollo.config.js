module.exports = {
    client: {
        includes: ['./packages/**/*.graphql'],
        service: {
            name: 'text-me-maybe',
            localSchemaFile: './packages/backend/schema.graphql'
        }
    },
    service: {
        localSchemaFile: './packages/backend/schema.graphql'
    }
};
