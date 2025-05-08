export type EmbedItem = {
  url: string;
  type?: string;
  username?: string;
  id?: string;
};

export type TCreateEmbedBody = {
  embed: string;
};

export type TCreateTimelineToken = {
  name: string;
  description: string;
  category: string;
  file: any;
  embedId: any;
};
