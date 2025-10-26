const API_PREFIX = process.env.EXPO_PUBLIC_API_PREFIX || ''

export const createEndpoints = (resource: string) => {
     return {
          all: `${API_PREFIX}/${resource}`,
          byId: (id: string | number) => `${API_PREFIX}/${resource}/${id}`,
          like: (id: string | number) => `${API_PREFIX}/${resource}/${id}/like`,
          comments: (id: string | number) => `${API_PREFIX}/${resource}/${id}/comments`,
     }
}

export const endpoints = {
     post: createEndpoints('posts'),
     marketplace: createEndpoints('marketplace'),
     user: createEndpoints('users'),
}
