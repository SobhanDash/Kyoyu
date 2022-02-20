export const getComments = async () => {
  return [
    {
      id: "1",
      body: "First comment",
      username: "Jack",
      userId: "1",
      parentId: null,
      createdAt: "2021-08-16T23:00:33.010+02:00",
    },
    {
      id: "2",
      body: "Second comment",
      username: "John",
      userId: "2",
      parentId: null,
      createdAt: "2021-08-16T23:00:33.010+02:00",
    },
    {
      id: "3",
      body: "First comment first child",
      username: "John",
      userId: "2",
      parentId: "1",
      createdAt: "2021-08-16T23:00:33.010+02:00",
    },
    {
      id: "4",
      body: "Second comment second child",
      username: "John",
      userId: "2",
      parentId: "2",
      createdAt: "2021-08-16T23:00:33.010+02:00",
    },
    {
      id: "4",
      body: "Third comment",
      username: "Jacob",
      userId: "3",
      parentId: null,
      createdAt: "2021-08-16T23:00:33.010+02:00",
    },
  ];
};

export const createComment = async (text, parentId = null) => {
  return {
    id: Math.random().toString(36).substr(2, 9),
    body: text,
    parentId,
    userId: "2",
    username: "John",
    createdAt: new Date().toISOString(),
  };
};

export const updateComment = async (text) => {
  return { text };
};

export const deleteComment = async () => {
  return {};
};

export const profileApi = async () => {
  return [
    {
      username: "anderson_009",
      name: "Neo Anderson",
      email: "neoanderson@gmail.com",
      phone: 1802088391,
      followers: ["sobhan", "edward"],
      following: ["sobhan"],
      posts: [
        {
          image: "https://picsum.photos/id/237/200/300",
          caption: "My puppy",
          user: "1",
        },
        {
          image: "https://picsum.photos/id/1005/200/300",
          caption: "Peace",
          user: "1",
        },
      ],
      profilePic: "",
      bio: "",
    },
    {
      username: "sobhan007",
      name: "Sobhan Dash",
      email: "sobhan@gmail.com",
      phone: 1802088392,
      followers: ["neo", "edward"],
      following: ["neo", "edward"],
      posts: [
        {
          image: "https://picsum.photos/id/27/200/300",
          caption: "Beach",
          user: "2",
        },
        {
          image: "https://picsum.photos/id/1019/200/300",
          caption: "Clouds",
          user: "2",
        },
      ],
      profilePic: "",
      bio: "",
    },
    {
      username: "edward001",
      name: "Edward Xavier",
      email: "edward18@gmail.com",
      phone: 1802088393,
      followers: ["sobhan", "neo"],
      following: ["neo"],
      posts: [
        {
          image: "https://picsum.photos/id/1022/200/300",
          caption: "My puppy",
          user: "3",
        },
        {
          image: "https://picsum.photos/id/1008/200/300",
          caption: "Peace",
          user: "3",
        },
      ],
      profilePic: "",
      bio: "",
    },
  ];
};
export const userpostsApi = async () => {
  return [
    {
      image: "https://picsum.photos/id/237/200/300",
      caption: "My puppy",
      id: "1",
    },
    {
      image: "https://picsum.photos/id/1005/200/300",
      caption: "Peace",
      id: "2",
    },
    {
      image: "https://picsum.photos/id/27/200/300",
      caption: "Beach",
      id: "3",
    },
    {
      image: "https://picsum.photos/id/1019/200/300",
      caption: "Clouds",
      id: "4",
    },
    {
      image: "https://picsum.photos/id/1022/200/300",
      caption: "My puppy",
      id: "5",
    },
    {
      image: "https://picsum.photos/id/1008/200/300",
      caption: "Peace",
      id: "6",
    },
  ];
};
