import { Bubble, Comment, Label, Like, User, ChampionsOnBubbles} from "@prisma/client";


type Block = {
  id: string,
  html: string,
  tag: string, // 'h1' | 'h2' | 'h3' | 'p'
  placeholder: string
}

type FilledComment = Comment  & {
  author: {
    avatarUrl: string;
    name: string;
  };
};

type FilledLike = Like & {
  author: {
    email: string;
  };
};

type FilledChampion = {
  champion: User;
  selected: boolean;
};

type FilledLabels = Label & {
  selected: boolean;
};

type FilledBubble = Bubble & {
  labels: Label[];
  champions: FilledChampion[];
  likes: FilledLike[];
  comments: FilledComment[];
  author: {
      avatarUrl: string;
  };
};

export type {
  FilledBubble,
  FilledComment,
  FilledLike,
  FilledChampion,
  FilledLabels,
  Block
}