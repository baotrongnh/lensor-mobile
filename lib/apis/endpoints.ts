const API_PREFIX = '' // Empty vì baseURL đã có trong client.ts

export const createEndpoints = (resource: string) => {
     return {
          all: `${API_PREFIX}/${resource}`,
          byId: (id: string | number) => `${API_PREFIX}/${resource}/${id}`
     }
}

export const endpoints = {
     post: createEndpoints('posts'),
     marketplace: createEndpoints('marketplaces'),
     product: createEndpoints('products'),
     forum: createEndpoints('forums')
}