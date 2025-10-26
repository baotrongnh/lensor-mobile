export interface User {
     id: string
     name: string
     email: string
     avatar: string
}

export const SUGGESTED_USERS: User[] = [
     {
          id: '1',
          name: 'Sarah Johnsonasa',
          email: 'sarah.johnson@gmail.com',
          avatar: 'https://i.pravatar.cc/150?img=45',
     },
     {
          id: '2',
          name: 'Michael Chen',
          email: 'michael.chen@hotmail.com',
          avatar: 'https://i.pravatar.cc/150?img=13',
     },
     {
          id: '3',
          name: 'Emily Rodriguez',
          email: 'emily.rod@yahoo.com',
          avatar: 'https://i.pravatar.cc/150?img=47',
     },
     {
          id: '4',
          name: 'David Kim',
          email: 'david.kim@outlook.com',
          avatar: 'https://i.pravatar.cc/150?img=52',
     },
]
