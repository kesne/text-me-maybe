module.exports = {
    client: {
        includes: ['./packages/**/*.graphql'],
        service: {
            name: 'text-me-maybe',
            localSchemaFile: './schema.graphql'
        }
    },
    service: {
        localSchemaFile: './schema.graphql'
    }
};
