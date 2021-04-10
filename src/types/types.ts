export type LoginUser = {
  id: number;
  username: string;
  profileText: string;
}

export type Users = [
  {
    id: number;
    username: string;
    profile_text: string;
  }
];


export type ParsedComments = [
  {
    fields: {
      comment: string;
      comment_user: number;
      created_at: string;
      idea: number;
    };
  }
];

export type Ideas = [
  {
    id: number;
    title: string;
    contents: string;
    is_published: boolean;
    createuser: number;
    comments: string;
    created_at: string;
    updated_at: string;
  }
];

export type Idea = {
  id: number,
  title: string,
  contents: string,
  createuser: number,
  created_at: string,
  updated_at: string,
}

export type Comments = [
  {
    id: number;
    idea: number;
    comment: string;
    comment_user: number;
    created_at: string;
  }
];


export type LayoutActivePage = 'HOME' | 'AUTH' | 'PROFILE' | 'CREATE' | 'TEST' | 'OTHERS';